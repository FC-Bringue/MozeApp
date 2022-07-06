<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

use App\Entity\Spotify;
use App\Entity\User;
use App\Entity\Session;
use Doctrine\ORM\EntityManagerInterface;
use App\Repository\UserRepository;
use App\Repository\SessionRepository;
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
    public function setSpotifyToken(UserRepository $userRepository, EntityManagerInterface $entityManager, Request $request): JsonResponse
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

        return $this->json([
            'token' => $accessToken,
            'refreshToken' => $refreshToken
        ]);
    }


    /** 
     * @Route("/api/get/spotify/playlist/{idSession}", name="app_get_spotify_playlist", methods={"GET", "POST"})
     */
    public function getSpotifyPlaylist(SessionRepository $sessionRepository, UserRepository $userRepository, EntityManagerInterface $entityManager, Request $request, $idSession): JsonResponse
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
            dd('end' . $e->getMessage());
        }
        // on filtre $tracks pour ne garder que les id des musiques
        // on transforme $tracks de cette forme => {"id": "5c9d9f9f4f8f9f0f8f8f8f8f8f8f8f8f","nbrLike": 0} pour chaque id

        $tracks = array_map(function ($track) {
            return [
                'id' => $track->track->id,
                'nbrLike' => 0
            ];
        }, $tracks);

        return $this->json([
            'playlist' =>  $tracks
        ]);
    }
}
