<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Contracts\HttpClient\HttpClientInterface;
use Symfony\Component\Mercure\HubInterface;
use Symfony\Component\Mercure\Update;

use App\Entity\Spotify;
use App\Entity\User;
use App\Entity\Session;
use App\Entity\ActiveSession as ActiveSessionEntity;

use Doctrine\ORM\EntityManagerInterface;
use App\Repository\UserRepository;
use App\Repository\SessionRepository;
// use App\Repository\SessionActiveRepository as ASRepo;
use SpotifyWebAPI\Session as SpotifySession;
use SpotifyWebAPI\SpotifyWebAPI;
use SpotifyWebAPI\SpotifyWebAPIException;

use Symfony\Component\HttpFoundation\Cookie;

class SpotifyController extends AbstractController
{
    /**
     * @Route("/api/get/spotify/TokenUrl", name="app_spotify", methods={"GET", "POST"})
     */

    public function index(UserRepository $userRepository, EntityManagerInterface $entityManager, Request $request): JsonResponse
    {
        $client_id = 'cbca15d571cc47e9818eb3558233bd97';
        $client_secret = '48e424fe8f4b4bb6b6eb4da248f4534e';
        $redirect_uri = 'https://localhost/api/set/spotifyToken';
        $session = new SpotifySession($client_id, $client_secret, $redirect_uri);
        $state = $session->generateState();
        $api = new SpotifyWebAPI();
        $options = [
            'scope' => [
                'user-read-email',
                'ugc-image-upload',
                'user-modify-playback-state',
                'user-read-playback-state',
                'user-read-currently-playing',
                'user-follow-modify',
                'user-follow-read',
                'user-read-recently-played',
                'user-read-playback-position',
                'user-top-read',
                'playlist-read-collaborative',
                'playlist-modify-public',
                'playlist-read-private',
                'playlist-modify-private',
                'app-remote-control',
                'streaming',
                'user-read-email',
                'user-read-private',
                'user-library-modify',
                'user-library-read'
            ],
            'state' => $state,
            'show_dialog' => true
        ];
        // set a cookie l'id de l'utilisateur
        setcookie('user_id', $this->getUser()->getId(), time() + (86400 * 30), "/");
        return $this->json([
            'url' => $session->getAuthorizeUrl($options)
        ]);
    }
    /**
     * @Route("/api/set/spotifyToken", name="app_set_spotify", methods={"GET", "POST"})
     */
    public function setSpotifyToken(UserRepository $userRepository, EntityManagerInterface $entityManager, Request $request): Response
    {
        $client_id = 'cbca15d571cc47e9818eb3558233bd97';
        $client_secret = '48e424fe8f4b4bb6b6eb4da248f4534e';
        $redirect_uri = 'https://localhost/api/set/spotifyToken';
        $session = new SpotifySession($client_id, $client_secret, $redirect_uri);
        $api = new SpotifyWebAPI();
        $id = $request->cookies->get('user_id');
        setcookie('user_id', '', time() - 3600, "/");
        $user = $userRepository->findOneBy(['id' => $id]);

        $session->requestAccessToken($_GET['code']);

        $accessToken = $session->getAccessToken();
        $refreshToken = $session->getRefreshToken();
        $spotify = $user->getSpotify();

        $spotify->setToken($accessToken);
        $spotify->setRefreshToken($refreshToken);

        $entityManager->persist($spotify);
        $entityManager->flush();
        return $this->redirect('https://localhost/dashboard/settings');
    }


    /**
     * @Route("/api/get/spotify/playlist/{idSession}", name="app_get_spotify_playlist", methods={"GET", "POST"})
     */
    public function getSpotifyPlaylistForSession(SessionRepository $sessionRepository, UserRepository $userRepository, EntityManagerInterface $entityManager, Request $request, $idSession): JsonResponse
    {
        $client_id = 'cbca15d571cc47e9818eb3558233bd97';
        $client_secret = '48e424fe8f4b4bb6b6eb4da248f4534e';
        $session = new SpotifySession($client_id, $client_secret);

        $api = new SpotifyWebAPI();

        $user = $this->getUser();
        $spotify = $user->getSpotify();
        $accessToken = $spotify->getToken();


        $api->setAccessToken($accessToken);


        $userSession = $sessionRepository->findOneBy(['id' => $idSession]);
        $parameters = $userSession->getParameters();
        $idPlaylist = $parameters['idPlaylist'];
        $session->setAccessToken($spotify->getToken());
        $session->setRefreshToken($spotify->getRefreshToken());
        $api->setAccessToken($session->getAccessToken());
        $tracks = [];
        try {
            $playlist = $api->getPlaylistTracks($idPlaylist);
            // on parcours toutes les pages de la playlist
            $offset = 0;
            $limit = 100;
            $total = $playlist->total;
            while ($offset < $total) {
                $playlist = $api->getPlaylistTracks($idPlaylist, [
                    'offset' => $offset,
                    'limit' => $limit
                ]);
                $tracks = array_merge($tracks, $playlist->items);
                $offset += $limit;
            }
        } catch (SpotifyWebAPIException $e) {
            $session->refreshAccessToken($session->getRefreshToken());
            $api->setAccessToken($session->getAccessToken());
            $spotify->setToken($session->getAccessToken());
            $entityManager->persist($spotify);
            $entityManager->flush();
            $playlist = $api->getPlaylistTracks($idPlaylist);
            $offset = 0;
            $limit = 100;
            $total = $playlist->total;
            while ($offset < $total) {
                $playlist = $api->getPlaylistTracks($idPlaylist, [
                    'offset' => $offset,
                    'limit' => $limit
                ]);
                $tracks = array_merge($tracks, $playlist->items);
                $offset += $limit;
            }
        }
        // on filtre $tracks pour ne garder que les id des musiques
        // on transforme $tracks de cette forme => {"id": "5c9d9f9f4f8f9f0f8f8f8f8f8f8f8f8f","nbrLike": 0} pour chaque id

        $tracks = array_map(function ($track, $key) {
            return [
                'id' => $track->track->id,
                'nbrLike' => 0,
                'key' => $key + 1,
                'name' => $track->track->name,
                'artist' => $track->track->artists[0]->name,
                'cover' => $track->track->album->images[0]->url,
            ];
        }, $tracks, array_keys($tracks));

        return $this->json([
            'playlist' =>  $tracks
        ]);
    }


    /**
     * @Route("/api/get/spotify/playlist/current/url/{urlSession}", name="app_get_spotify_current_url_playlist", methods={"GET", "POST"})
     */
    public function getSpotifyCurrentPlaylist(Request $request, SessionRepository $sessionRepository, EntityManagerInterface $entityManager, $urlSession): Response
    {
        $sessionActiveRepository = $entityManager->getRepository(ActiveSessionEntity::class);
        $activeSession = $sessionActiveRepository->findOneBy(['url' => $urlSession]);
        $currentSession = $activeSession->getSession();
        // is defined $currentSession->getParameters()['hashtag']
        if (isset($currentSession->getParameters()['hashtag'])) {
            $hastag = $currentSession->getParameters()['hashtag'];
        } else {
            $hastag = "";
        }
        $sessionName = $currentSession->getParameters()['SessionName'];

        // $activeSession = $currentSession->getActiveSession();
        $parameters = $currentSession->getParameters();
        $currentIndex = $activeSession->getCurrentIndex();
        $musicQueue = $activeSession->getMusicQueue();


        $currentMusic = $musicQueue[$currentIndex];
        $nextMusic = [];
        for ($i =  1; $i < 11; $i++) {
            if (isset($musicQueue[$currentIndex + $i])) {
                $nextMusic[] = $musicQueue[$currentIndex + $i];
            } else {
                break;
            }
        }

        $previousMusic = [];
        if ($currentIndex - 1 >= 0) {
            array_push($previousMusic, $musicQueue[$currentIndex - 1]);
            if ($currentIndex - 2 >= 0) {
                array_push($previousMusic, $musicQueue[$currentIndex - 2]);
            }
        } else {
            $previousMusic = [];
        }

        $client_id = 'cbca15d571cc47e9818eb3558233bd97';
        $client_secret = '48e424fe8f4b4bb6b6eb4da248f4534e';
        $session = new SpotifySession($client_id, $client_secret);
        $api = new SpotifyWebAPI();
        $user = $currentSession->getUser();
        $spotify = $user->getSpotify();
        $accessToken = $spotify->getToken();
        $api->setAccessToken($accessToken);
        $session->setAccessToken($spotify->getToken());
        $session->setRefreshToken($spotify->getRefreshToken());
        $nextMusicsInfo = [];
        while (true) {
            if (count($nextMusic) == 0) {
                break;
            }
            try {
                $nextMusicId = [];
                foreach ($nextMusic as $music) {
                    $nextMusicId[] = $music['id'];
                }
                // get thumbnails of current music
                $temp = $api->getTracks($nextMusicId);
                foreach ($temp->tracks as $key => $value) {
                    $nextMusicsInfo[] = [
                        'id' => $value->id,
                        'name' => $value->name,
                        'artists' => $value->artists,
                        'album' => $value->album,
                        'thumbnail' => $value->album->images
                    ];
                }
                break;
            } catch (SpotifyWebAPIException $e) {
                $session->refreshAccessToken($session->getRefreshToken());
                $api->setAccessToken($session->getAccessToken());
                $spotify->setToken($session->getAccessToken());
                $entityManager->persist($spotify);
                $entityManager->flush();
            }
        }
        $previousMusicsInfo = [];
        while (true) {
            if (count($previousMusic) == 0) {
                break;
            }
            try {
                $previousMusicId = [];
                foreach ($previousMusic as $music) {
                    $previousMusicId[] = $music['id'];
                }
                // get thumbnails of current music
                $temp = $api->getTracks($previousMusicId);
                foreach ($temp->tracks as $key => $value) {
                    $previousMusicsInfo[] = [
                        'id' => $value->id,
                        'name' => $value->name,
                        'artists' => $value->artists,
                        'album' => $value->album,
                        'thumbnail' => $value->album->images
                    ];
                }
                break;
            } catch (SpotifyWebAPIException $e) {
                $session->refreshAccessToken($session->getRefreshToken());
                $api->setAccessToken($session->getAccessToken());
                $spotify->setToken($session->getAccessToken());
                $entityManager->persist($spotify);
                $entityManager->flush();
            }
        }

        $currentMusicInfo = [];
        while (true) {
            try {
                $currentMusicId = [$currentMusic['id']];
                // get thumbnails of current music
                $temp = $api->getTracks($currentMusicId);
                $currentMusicInfo = [
                    'id' => $temp->tracks[0]->id,
                    'name' => $temp->tracks[0]->name,
                    'artists' => $temp->tracks[0]->artists,
                    'album' => $temp->tracks[0]->album,
                    'thumbnail' => $temp->tracks[0]->album->images
                ];
                break;
            } catch (SpotifyWebAPIException $e) {
                $session->refreshAccessToken($session->getRefreshToken());
                $api->setAccessToken($session->getAccessToken());
                $spotify->setToken($session->getAccessToken());
                $entityManager->persist($spotify);
                $entityManager->flush();
            }
        }
        while (true) {
            try {
                $playlistName = $api->getPlaylist($currentSession->getParameters()['idPlaylist'])->name;
                break;
            } catch (SpotifyWebAPIException $e) {
                $session->refreshAccessToken($session->getRefreshToken());
                $api->setAccessToken($session->getAccessToken());
                $spotify->setToken($session->getAccessToken());
                $entityManager->persist($spotify);
                $entityManager->flush();
            }
        }

        return $this->json([
            'current index' => $currentIndex,
            'current music' => $currentMusic,
            'next music' => $nextMusic,
            'previous music' => $previousMusic,
            'current music info' => $currentMusicInfo,
            'next musics info' => $nextMusicsInfo,
            'previous musics info' => $previousMusicsInfo,
            'playlist name' => $playlistName,
            'session name' => $sessionName,
            'hashtag' => $hastag,
        ]);
    }
    /**
     * @Route("/api/get/spotify/playlist/current/{idSession}", name="app_get_spotify_current_playlist", methods={"GET", "POST"})
     */
    public function getSpotifyCurrentPlaylist2(Request $request, SessionRepository $sessionRepository, EntityManagerInterface $entityManager, $idSession): Response
    {

        $currentSession = $sessionRepository->findOneBy(['id' => $idSession]);
        $activeSession = $currentSession->getActiveSession();
        $parameters = $currentSession->getParameters();
        $currentIndex = $activeSession->getCurrentIndex();
        $musicQueue = $activeSession->getMusicQueue();
        $currentMusic = $musicQueue[$currentIndex];
        $nextMusic = [];
        for ($i =  1; $i < 6; $i++) {
            if (isset($musicQueue[$currentIndex + $i])) {
                $nextMusic[] = $musicQueue[$currentIndex + $i];
            } else {
                break;
            }
        }

        $previousMusic = [];
        if ($currentIndex - 1 >= 0) {
            array_push($previousMusic, $musicQueue[$currentIndex - 1]);
            if ($currentIndex - 2 >= 0) {
                array_push($previousMusic, $musicQueue[$currentIndex - 2]);
            }
        } else {
            $previousMusic = [];
        }

        $client_id = 'cbca15d571cc47e9818eb3558233bd97';
        $client_secret = '48e424fe8f4b4bb6b6eb4da248f4534e';
        $session = new SpotifySession($client_id, $client_secret);
        $api = new SpotifyWebAPI();
        $user = $this->getUser();
        $spotify = $user->getSpotify();
        $accessToken = $spotify->getToken();
        $api->setAccessToken($accessToken);
        $session->setAccessToken($spotify->getToken());
        $session->setRefreshToken($spotify->getRefreshToken());
        $nextMusicsInfo = [];
        while (true) {
            if (count($nextMusic) == 0) {
                break;
            }
            try {
                $nextMusicId = [];
                foreach ($nextMusic as $music) {
                    $nextMusicId[] = $music['id'];
                }
                // get thumbnails of current music
                $temp = $api->getTracks($nextMusicId);
                foreach ($temp->tracks as $key => $value) {
                    $nextMusicsInfo[] = [
                        'id' => $value->id,
                        'name' => $value->name,
                        'artists' => $value->artists,
                        'album' => $value->album,
                        'thumbnail' => $value->album->images
                    ];
                }
                break;
            } catch (SpotifyWebAPIException $e) {
                $session->refreshAccessToken($session->getRefreshToken());
                $api->setAccessToken($session->getAccessToken());
                $spotify->setToken($session->getAccessToken());
                $entityManager->persist($spotify);
                $entityManager->flush();
            }
        }
        $previousMusicsInfo = [];
        while (true) {
            if (count($previousMusic) == 0) {
                break;
            }
            try {
                $previousMusicId = [];
                foreach ($previousMusic as $music) {
                    $previousMusicId[] = $music['id'];
                }
                // get thumbnails of current music
                $temp = $api->getTracks($previousMusicId);
                foreach ($temp->tracks as $key => $value) {
                    $previousMusicsInfo[] = [
                        'id' => $value->id,
                        'name' => $value->name,
                        'artists' => $value->artists,
                        'album' => $value->album,
                        'thumbnail' => $value->album->images
                    ];
                }
                break;
            } catch (SpotifyWebAPIException $e) {
                $session->refreshAccessToken($session->getRefreshToken());
                $api->setAccessToken($session->getAccessToken());
                $spotify->setToken($session->getAccessToken());
                $entityManager->persist($spotify);
                $entityManager->flush();
            }
        }

        $currentMusicInfo = [];
        while (true) {
            try {
                $currentMusicId = [$currentMusic['id']];
                // get thumbnails of current music
                $temp = $api->getTracks($currentMusicId);
                $currentMusicInfo = [
                    'id' => $temp->tracks[0]->id,
                    'name' => $temp->tracks[0]->name,
                    'artists' => $temp->tracks[0]->artists,
                    'album' => $temp->tracks[0]->album,
                    'thumbnail' => $temp->tracks[0]->album->images
                ];
                break;
            } catch (SpotifyWebAPIException $e) {
                $session->refreshAccessToken($session->getRefreshToken());
                $api->setAccessToken($session->getAccessToken());
                $spotify->setToken($session->getAccessToken());
                $entityManager->persist($spotify);
                $entityManager->flush();
            }
        }
        while (true) {
            try {
                $playlistName = $api->getPlaylist($currentSession->getParameters()['idPlaylist'])->name;
                break;
            } catch (SpotifyWebAPIException $e) {
                $session->refreshAccessToken($session->getRefreshToken());
                $api->setAccessToken($session->getAccessToken());
                $spotify->setToken($session->getAccessToken());
                $entityManager->persist($spotify);
                $entityManager->flush();
            }
        }

        return $this->json([
            'current index' => $currentIndex,
            'current music' => $currentMusic,
            'next music' => $nextMusic,
            'previous music' => $previousMusic,
            'current music info' => $currentMusicInfo,
            'next musics info' => $nextMusicsInfo,
            'previous musics info' => $previousMusicsInfo,
            'playlist name' => $playlistName,

        ]);
    }

    /**
     * @Route("/api/set/spotify/playlist/next/{urlSession}", name="app_set_spotify_next_playlist", methods={"GET", "POST"})
     */
    public function setSpotifyNextPlaylist(HubInterface $hub, HttpClientInterface $client, Request $request, SessionRepository $sessionRepository, EntityManagerInterface $entityManager, $urlSession): Response
    {
        $activeSession = $entityManager->getRepository(ActiveSessionEntity::class)->findOneBy(['url' => $urlSession]);
        $session = $activeSession->getSession();
        $user = $session->getUser();
        $max = count($activeSession->getMusicQueue());
        $auth = getallheaders()['Authorization'];
        $response = $client->request('GET', 'http://caddy/api/have/session/active/' . $user->getId(), [
            'headers' => [
                'Authorization' => $auth
            ]
        ]);
        $content = $response->getContent();
        $content = json_decode($content, true);
        $content = $content['message'];
        if ($content == "false") {
            return $this->json([
                'message' => 'Aucune session n\'est en cours',
            ]);
        }
        $currentIndex = $activeSession->getCurrentIndex();
        if ($max > $currentIndex) {
            $currentIndex++;
        }
        $activeSession->setCurrentIndex($currentIndex);
        /// spotify conf
        $client_id = 'cbca15d571cc47e9818eb3558233bd97';
        $client_secret = '48e424fe8f4b4bb6b6eb4da248f4534e';
        $sessionSpotify = new SpotifySession($client_id, $client_secret);

        $spotify = $user->getSpotify();
        $sessionSpotify->setAccessToken($spotify->getToken());
        $sessionSpotify->setRefreshToken($spotify->getRefreshToken());
        $api = new SpotifyWebAPI();

        $accessToken = $spotify->getToken();


        $api->setAccessToken($accessToken);
        //////

        while (true) {
            try {
                $devices = $api->getMyDevices();
                foreach ($devices->devices as $key => $value) {
                    if ($value->is_active) {
                        if ($max >= $currentIndex) {
                            $api->next();
                        }
                        break;
                    }
                }
                break;
            } catch (SpotifyWebAPIException $e) {
                $sessionSpotify->refreshAccessToken($sessionSpotify->getRefreshToken());
                $api->setAccessToken($sessionSpotify->getAccessToken());
                $spotify->setToken($sessionSpotify->getAccessToken());
                $entityManager->persist($spotify);
                $entityManager->flush();
            }
        }

        $entityManager->persist($activeSession);
        $entityManager->flush();

        $update = new Update(
            'http://localhost/spotify',
            json_encode(['status' => 'next'])
        );
        $hub->publish($update);
        return $this->json([
            'message' => 'Music correctly changed',
            'current index' => $currentIndex,
        ]);
    }

    /**
     * @Route("/api/set/spotify/playlist/previous/{urlSession}", name="app_set_spotify_previous_playlist", methods={"GET", "POST"})
     */
    public function setSpotifyPreviousPlaylist(HubInterface $hub, HttpClientInterface $client, Request $request, SessionRepository $sessionRepository, EntityManagerInterface $entityManager, $urlSession): Response
    {
        $activeSession = $entityManager->getRepository(ActiveSessionEntity::class)->findOneBy(['url' => $urlSession]);
        $session = $activeSession->getSession();
        $user = $session->getUser();
        $min = 1;
        $auth = getallheaders()['Authorization'];
        $response = $client->request('GET', 'http://caddy/api/have/session/active/' . $user->getId(), [
            'headers' => [
                'Authorization' => $auth
            ]
        ]);
        $content = $response->getContent();
        $content = json_decode($content, true);
        $content = $content['message'];
        if ($content == "false") {
            return $this->json([
                'message' => 'Aucune session n\'est en cours',
            ]);
        }
        $currentIndex = $activeSession->getCurrentIndex();
        if ($min <= $currentIndex) {
            $currentIndex--;
        }
        $activeSession->setCurrentIndex($currentIndex);

        /// spotify conf
        $client_id = 'cbca15d571cc47e9818eb3558233bd97';
        $client_secret = '48e424fe8f4b4bb6b6eb4da248f4534e';
        $sessionSpotify = new SpotifySession($client_id, $client_secret);

        $spotify = $user->getSpotify();
        $sessionSpotify->setAccessToken($spotify->getToken());
        $sessionSpotify->setRefreshToken($spotify->getRefreshToken());
        $api = new SpotifyWebAPI();

        $accessToken = $spotify->getToken();


        $api->setAccessToken($accessToken);
        //////

        while (true) {
            try {
                $devices = $api->getMyDevices();
                foreach ($devices->devices as $key => $value) {
                    if ($value->is_active) {
                        if ($min <= $currentIndex) {
                            $api->previous();
                        }
                        break;
                    }
                }
                break;
            } catch (SpotifyWebAPIException $e) {
                $sessionSpotify->refreshAccessToken($sessionSpotify->getRefreshToken());
                $api->setAccessToken($sessionSpotify->getAccessToken());
                $spotify->setToken($sessionSpotify->getAccessToken());
                $entityManager->persist($spotify);
                $entityManager->flush();
            }
        }

        $entityManager->persist($activeSession);
        $entityManager->flush();

        $update = new Update(
            'http://localhost/spotify',
            json_encode(['status' => 'previous'])
        );
        $hub->publish($update);


        return $this->json([
            'message' => 'Music correctly changed',
            'current index' => $currentIndex,
        ]);
    }

    /**
     * @Route("/api/get/spotify/userplaylist", name="app_get_spotify_playlists", methods={"GET", "POST"})
     */
    public function getSpotifyPlaylists(HttpClientInterface $client, Request $request, SessionRepository $sessionRepository, EntityManagerInterface $entityManager): Response
    {
        $client_id = 'cbca15d571cc47e9818eb3558233bd97';
        $client_secret = '48e424fe8f4b4bb6b6eb4da248f4534e';
        $session = new SpotifySession($client_id, $client_secret);
        $api = new SpotifyWebAPI();
        $user = $this->getUser();
        $spotify = $user->getSpotify();
        $accessToken = $spotify->getToken();
        $session->setAccessToken($spotify->getToken());
        $session->setRefreshToken($spotify->getRefreshToken());
        $api->setAccessToken($session->getAccessToken());
        while (true) {
            try {
                $userID = $api->me()->id;
                $playlists = $api->getUserPlaylists($userID, [
                    'limit' => 25
                ]);
                break;
            } catch (SpotifyWebAPIException $e) {
                $session->refreshAccessToken($session->getRefreshToken());
                $api->setAccessToken($session->getAccessToken());
                $spotify->setToken($session->getAccessToken());
                $entityManager->persist($spotify);
                $entityManager->flush();
            }
        }
        return $this->json([
            'message' => 'All playlists',
            'playlists' => $playlists->items,
        ]);
    }

    /**
     * @Route("/api/get/isConnected", name="app_get_spotify_isConnected", methods={"GET", "POST"})
     */
    public function isConnected(HttpClientInterface $client, Request $request, SessionRepository $sessionRepository, EntityManagerInterface $entityManager): Response
    {
        $user = $this->getUser();
        $spotify = $user->getSpotify();
        if ($spotify->getToken()) {
            return $this->json([
                'message' => 'Connected',
            ]);
        }
        return $this->json([
            'message' => 'Not Connected',
        ]);
    }

    /**
     * @Route("/api/send/spotify/token", name="app_send_spotify_token", methods={"GET", "POST"})
     */
    public function sendSpotifyToken(HttpClientInterface $client, Request $request, EntityManagerInterface $entityManager): Response
    {
        $user = $this->getUser();
        if ($user == null) {
            return $this->json([
                'message' => 'Not connected',
            ]);
        }
        $spotify = $user->getSpotify();
        $token = $spotify->getToken();
        if ($token == null) {
            return $this->json([
                'message' => 'Not connected to spotify',
            ]);
        }



        return $this->json([
            'message' => 'Token sent',
            'token' => $token,
        ]);
    }

    /**
     * @Route("/api/search/spotify", name="app_search_spotify", methods={"GET", "POST"})
     */
    public function searchSpotify(HttpClientInterface $client, Request $request, SessionRepository $sessionRepository, EntityManagerInterface $entityManager): Response
    {
        $url = $_POST['url'];
        $song = $_POST['song'];
        $client_id = 'cbca15d571cc47e9818eb3558233bd97';
        $client_secret = '48e424fe8f4b4bb6b6eb4da248f4534e';
        $session = new SpotifySession($client_id, $client_secret);

        $spotify = $entityManager->getRepository(ActiveSessionEntity::class)->findOneBy(['url' => $url])->getSession()->getUser()->getSpotify();
        $session->setAccessToken($spotify->getToken());
        $session->setRefreshToken($spotify->getRefreshToken());
        $api = new SpotifyWebAPI();

        $accessToken = $spotify->getToken();


        $api->setAccessToken($accessToken);

        while (true) {
            try {
                $results = $api->search($song, 'track', [
                    'limit' => 10
                ]);
                break;
            } catch (SpotifyWebAPIException $e) {
                $session->refreshAccessToken($session->getRefreshToken());
                $api->setAccessToken($session->getAccessToken());
                $spotify->setToken($session->getAccessToken());
                $entityManager->persist($spotify);
                $entityManager->flush();
            }
        }
        return $this->json([
            'results' => $results->tracks->items,
        ]);
    }

    /**
     * @Route("/api/add/song/spotify", name="app_add_song_spotify", methods={"GET", "POST"})
     */
    public function addSongSpotify(HttpClientInterface $client, Request $request, SessionRepository $sessionRepository, EntityManagerInterface $entityManager): Response
    {

        $url = $_POST['url'];
        // $song = $_POST['song'];
        $activeSession = $entityManager->getRepository(ActiveSessionEntity::class)->findOneBy(['url' => $url]);
        $musicQueue = $activeSession->getMusicQueue();
        $currentIndex = $activeSession->getCurrentIndex();
        // à partir de la position courante, on ajoute +1 à key
        foreach ($musicQueue as $key => $music) {
            $i = $key + 1;
            if ($key > $currentIndex + 3) {
                $musicQueue[$key]['key'] = $i;
            }
        }
        // on coupe musicQueue en deux à la postiion currentIndex
        $musicQueuepart1 = array_slice($musicQueue, 0, $currentIndex + 3);
        // on ajoute la musique à la position currentIndex

        $musicQueuepart1[$currentIndex + 3] = [
            "id" => $_POST['songId'],
            "nbrLike" => 0,
            "key" => $currentIndex + 4,
            "name" => $_POST['songName'],
            "artist" => $_POST['songArtist'],
            "cover" => $_POST['songImage'],
        ];
        $musicQueuepart2 = array_slice($musicQueue, $currentIndex + 4);
        $musicQueue = array_merge($musicQueuepart1, $musicQueuepart2);

        $activeSession->setMusicQueue($musicQueue);

        $entityManager->persist($activeSession);
        $entityManager->flush();

        return $this->json([
            'musicQueue' => $musicQueue,
        ]);
    }

    /**
     * @Route("/api/like/song/spotify", name="app_like_song_spotify", methods={"GET", "POST"})
     */
    public function likeSongSpotify(HttpClientInterface $client, Request $request, SessionRepository $sessionRepository, EntityManagerInterface $entityManager): Response
    {
        $url = $_POST['url'];
        $songId = $_POST['songId'];
        $activeSession = $entityManager->getRepository(ActiveSessionEntity::class)->findOneBy(['url' => $url]);
        $musicQueue = $activeSession->getMusicQueue();
        $currentIndex = $activeSession->getCurrentIndex();
        foreach ($musicQueue as $key => $music) {
            if ($music['id'] == $songId) {
                $musicQueue[$key]['nbrLike'] = $music['nbrLike'] + 1;
                $musicLiked = $musicQueue[$key];
                // on le supprime de la liste
                unset($musicQueue[$key]);
            }
        }
        foreach ($musicQueue as $key => $music) {

            $musicQueue[$key]['key'] = $key + 1;
        }



        $musicQueuepart1 = array_slice($musicQueue, 0, $currentIndex);
        $musicQueuepart1[$currentIndex + 1] = $musicLiked;
        $musicQueuepart2 = array_slice($musicQueue, $currentIndex);
        $musicQueue = array_merge($musicQueuepart1, $musicQueuepart2);
        $musicPosition = $currentIndex;

        // on parcourt la liste et on vérifie si la musicPosition a plus de like que la prochaine music
        // si la prochaine à plus ou égale de like on les échange de place
        // sinon on break
        for ($i = $musicPosition; $i < count($musicQueue); $i++) {
            if ($musicQueue[$i + 1]['nbrLike'] >= $musicQueue[$musicPosition]['nbrLike']) {
                // dd('There is a song with more like than the current song', $musicQueue[$i + 1], $musicQueue[$musicPosition]);
                // on échange les deux musiques
                $temp = $musicQueue[$i + 1];
                $musicQueue[$i + 1] = $musicQueue[$musicPosition];
                $musicQueue[$musicPosition] = $temp;
                // on change la position de la musique
                $musicPosition = $i + 1;
            } else {
                break;
            }
        }

        // on parcourt pour renvoyer false si 0 like on été trouvé
        // if (!$found) {
        //     $partOne = array_slice($musicQueue, 0, $currentIndex);
        //     $partTwo = array_slice($musicQueue, $currentIndex);
        //     // on ajoute à la fin de partOne $musicLiked
        //     $partOne[$currentIndex + 1] = $musicLiked;
        //     dd($partOne, 'partOne');
        // }

        $activeSession->setMusicQueue($musicQueue);
        $entityManager->persist($activeSession);
        $entityManager->flush();
        return $this->json([
            'musicQueue' => $musicQueue,
        ]);
    }


    /**
     * @Route("/api/set/spotify/playlist/pause/{urlSession}", name="app_set_spotify_pause_playlist", methods={"GET", "POST"})
     */
    public function setSpotifyPausePlaylist(HubInterface $hub, HttpClientInterface $client, Request $request, SessionRepository $sessionRepository, EntityManagerInterface $entityManager, $urlSession): Response
    {
        $activeSession = $entityManager->getRepository(ActiveSessionEntity::class)->findOneBy(['url' => $urlSession]);
        $session = $activeSession->getSession();
        $user = $session->getUser();
        $auth = getallheaders()['Authorization'];
        $response = $client->request('GET', 'http://caddy/api/have/session/active/' . $user->getId(), [
            'headers' => [
                'Authorization' => $auth
            ]
        ]);
        $content = $response->getContent();
        $content = json_decode($content, true);
        $content = $content['message'];
        if ($content == "false") {
            return $this->json([
                'message' => 'Aucune session n\'est en cours',
            ]);
        }

        /// spotify conf
        $client_id = 'cbca15d571cc47e9818eb3558233bd97';
        $client_secret = '48e424fe8f4b4bb6b6eb4da248f4534e';
        $sessionSpotify = new SpotifySession($client_id, $client_secret);

        $spotify = $user->getSpotify();
        $sessionSpotify->setAccessToken($spotify->getToken());
        $sessionSpotify->setRefreshToken($spotify->getRefreshToken());
        $api = new SpotifyWebAPI();

        $accessToken = $spotify->getToken();


        $api->setAccessToken($accessToken);
        //////

        while (true) {
            try {
                $devices = $api->getMyDevices();
                foreach ($devices->devices as $key => $value) {
                    if ($value->is_active) {
                        $api->pause();
                        break;
                    }
                }
                break;
            } catch (SpotifyWebAPIException $e) {
                $sessionSpotify->refreshAccessToken($sessionSpotify->getRefreshToken());
                $api->setAccessToken($sessionSpotify->getAccessToken());
                $spotify->setToken($sessionSpotify->getAccessToken());
                $entityManager->persist($spotify);
                $entityManager->flush();
            }
        }

        $entityManager->persist($activeSession);
        $entityManager->flush();

        $update = new Update(
            'http://localhost/spotify',
            json_encode(['status' => 'pause'])
        );
        $hub->publish($update);
        return $this->json([
            'message' => 'Music correctly paused'
        ]);
    }


    /**
     * @Route("/api/set/spotify/playlist/play/{urlSession}", name="app_set_spotify_play_playlist", methods={"GET", "POST"})
     */
    public function setSpotifyPlayPlaylist(HubInterface $hub, HttpClientInterface $client, Request $request, SessionRepository $sessionRepository, EntityManagerInterface $entityManager, $urlSession): Response
    {
        $activeSession = $entityManager->getRepository(ActiveSessionEntity::class)->findOneBy(['url' => $urlSession]);
        $session = $activeSession->getSession();
        $user = $session->getUser();
        $auth = getallheaders()['Authorization'];
        $response = $client->request('GET', 'http://caddy/api/have/session/active/' . $user->getId(), [
            'headers' => [
                'Authorization' => $auth
            ]
        ]);
        $content = $response->getContent();
        $content = json_decode($content, true);
        $content = $content['message'];
        if ($content == "false") {
            return $this->json([
                'message' => 'Aucune session n\'est en cours',
            ]);
        }

        /// spotify conf
        $client_id = 'cbca15d571cc47e9818eb3558233bd97';
        $client_secret = '48e424fe8f4b4bb6b6eb4da248f4534e';
        $sessionSpotify = new SpotifySession($client_id, $client_secret);

        $spotify = $user->getSpotify();
        $sessionSpotify->setAccessToken($spotify->getToken());
        $sessionSpotify->setRefreshToken($spotify->getRefreshToken());
        $api = new SpotifyWebAPI();

        $accessToken = $spotify->getToken();


        $api->setAccessToken($accessToken);
        //////

        while (true) {
            try {
                $devices = $api->getMyDevices();
                foreach ($devices->devices as $key => $value) {
                    if ($value->is_active) {
                        $api->play();
                        break;
                    }
                }
                break;
            } catch (SpotifyWebAPIException $e) {
                $sessionSpotify->refreshAccessToken($sessionSpotify->getRefreshToken());
                $api->setAccessToken($sessionSpotify->getAccessToken());
                $spotify->setToken($sessionSpotify->getAccessToken());
                $entityManager->persist($spotify);
                $entityManager->flush();
            }
        }

        $entityManager->persist($activeSession);
        $entityManager->flush();

        $update = new Update(
            'http://localhost/spotify',
            json_encode(['status' => 'play'])
        );
        $hub->publish($update);
        return $this->json([
            'message' => 'Music correctly played'
        ]);
    }

    /**
     * @Route("/api/get/spotify/source/{urlSession}", name="app_get_spotify_source_music", methods={"GET", "POST"})
     */
    public function getSpotifySourceMusic(HubInterface $hub, HttpClientInterface $client, Request $request, SessionRepository $sessionRepository, EntityManagerInterface $entityManager, $urlSession): Response
    {
        $activeSession = $entityManager->getRepository(ActiveSessionEntity::class)->findOneBy(['url' => $urlSession]);
        $session = $activeSession->getSession();
        $user = $session->getUser();

        /// spotify conf
        $client_id = 'cbca15d571cc47e9818eb3558233bd97';
        $client_secret = '48e424fe8f4b4bb6b6eb4da248f4534e';
        $sessionSpotify = new SpotifySession($client_id, $client_secret);

        $spotify = $user->getSpotify();
        $sessionSpotify->setAccessToken($spotify->getToken());
        $sessionSpotify->setRefreshToken($spotify->getRefreshToken());
        $api = new SpotifyWebAPI();

        $accessToken = $spotify->getToken();


        $api->setAccessToken($accessToken);
        //////

        while (true) {
            try {
                $currentTrack = $api->getMyCurrentTrack();
            } catch (SpotifyWebAPIException $e) {
                $sessionSpotify->refreshAccessToken($sessionSpotify->getRefreshToken());
                $api->setAccessToken($sessionSpotify->getAccessToken());
                $spotify->setToken($sessionSpotify->getAccessToken());
                $entityManager->persist($spotify);
                $entityManager->flush();
            }
        }

        return $this->json([
            'message' => 'Music correctly paused',

        ]);
    }

    /**
     * @Route("/api/send/spotify/token/{urlToken}", name="app_send_spotify_token_url", methods={"GET", "POST"})
     */
    public function sendSpotifyTokenUrl(HubInterface $hub, HttpClientInterface $client, Request $request, SessionRepository $sessionRepository, EntityManagerInterface $entityManager, $urlToken): Response
    {
        $activeSession = $entityManager->getRepository(ActiveSessionEntity::class)->findOneBy(['url' => $urlToken]);
        $session = $activeSession->getSession();
        $user = $session->getUser();
        $spotify = $user->getSpotify();
        $token = $spotify->getToken();
        return $this->json([
            'token' => $token,
        ]);
    }
}
