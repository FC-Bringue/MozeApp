<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\User;
use App\Entity\Spotify;
use App\Entity\Session;
use App\Entity\ActiveSession;
use App\Entity\Guest;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Contracts\HttpClient\HttpClientInterface;
use Symfony\Component\Uid\Uuid;
use Symfony\Component\Uid\UuidV4;

class SessionController extends AbstractController
{
    private User $user;

    // public function __construct()
    // {
    //     $this->user = $this->getUser();
    // }


    /**
     * @Route("/api/me", name="app_me", methods={"GET", "POST"})
     */
    public function me(Request $request): Response
    {
        return $this->json([
            'user' => $this->getUser(),
        ]);
    }

    /**
     * @Route("/api/create/session", name="app_session", methods={"GET", "POST"})
     */
    public function index(Request $request, EntityManagerInterface $entityManager): Response
    {
        $this->user = $this->getUser();
        //Get data from the post request
        $data = json_decode($request->getContent(), true);

        $jsonParams = [
            "SessionName" => $data["SessionName"],
            "idPlaylist" => $data['idPlaylist'],
            "urlPlaylist" => $data['urlPlaylist'],
            "PlaylistName" => $data['PlaylistName'],
            "hashtag" => $data['hashtag'],
            "lights" => $data['lights'],
            "events" => $data['events']
        ];
        $spotify = $this->user->getSpotify();
        $session = new Session();
        $session->setUser($this->user);
        $session->setParameters($jsonParams);

        $entityManager->persist($session);
        $entityManager->flush();


        $session->setParameters(array_merge($session->getParameters(), ["sessionID" => $session->getId()]));
        $entityManager->persist($session);
        $entityManager->flush();


        $sessionId = $session->getId();

        return $this->json([
            "sessionId" => $sessionId,
        ]);
    }


    /**
     * @Route("/api/set/session/active/{idSession}", name="app_set_session_active", methods={"GET", "POST"})
     */
    public function setSessionActive(HttpClientInterface $client, Request $request, EntityManagerInterface $entityManager, $idSession): Response
    {
        ///get Bearer Token in header
        $auth = getallheaders()['Authorization'];
        $response = $client->request('GET', 'http://caddy/api/get/spotify/playlist/' . $idSession, [
            'headers' => [
                'Authorization' => $auth
            ]
        ]);
        $content = $response->getContent();
        $json = json_decode($content, true);
        $json = $json['playlist'];
        $ActiveSession = new ActiveSession();
        $Session = $entityManager->getRepository(Session::class)->find($idSession);
        $user = $Session->getUser();

        $auth = getallheaders()['Authorization'];
        $response = $client->request('GET', 'http://caddy/api/have/session/active/' . $user->getId(), [
            'headers' => [
                'Authorization' => $auth
            ]
        ]);
        $content2 = $response->getContent();
        $content2 = json_decode($content2, true);
        $content2 = $content2['message'];
        if ($content2 == "true") {
            return $this->json([
                'message' => 'Une session est d??j?? en cours',
            ]);
        }


        $ActiveSession->setSession($Session);
        $ActiveSession->setNbrOfMusicPlayedBeforeEvent(0);
        $ActiveSession->setIsEvent(0);
        $ActiveSession->setCurrentIndex(1);

        // generate a unique url
        $urlUuid = Uuid::v4()->toBase58();
        // on verifie si l'url n'existe pas d??j??
        while ($entityManager->getRepository(ActiveSession::class)->findOneBy(['url' => $urlUuid])) {
            $urlUuid = Uuid::v4()->toBase58();
        }
        $ActiveSession->setUrl($urlUuid);
        $ActiveSession->setMusicQueue($json);
        $entityManager->persist($ActiveSession);
        $entityManager->flush();
        return $this->json([
            'message' => 'Session activ??',
            'session' => $ActiveSession,
        ]);
    }

    //Create a route to unset the active session
    /**
     * @Route("/api/unset/session/active/{idSession}", name="app_unset_session_active", methods={"GET", "POST"})
     */
    public function unsetSessionActive(HttpClientInterface $client, Request $request, EntityManagerInterface $entityManager, $idSession): Response
    {
        $ActiveSession = $entityManager->getRepository(ActiveSession::class)->findOneBy(['session' => $idSession]);
        $entityManager->remove($ActiveSession);
        $entityManager->flush();
        return $this->json([
            'message' => 'Session d??sactiv??',
        ]);
    }


    /**
     * @Route("/api/have/session/active/{idUser}", name="app_have_session_active", methods={"GET", "POST"})
     */
    public function haveSessionActive(HttpClientInterface $client, Request $request, EntityManagerInterface $entityManager, $idUser): Response
    {
        $user = $entityManager->getRepository(User::class)->findOneBy(['id' => $idUser]);
        $ActiveSession = $user->getSessions()[0];
        if ($ActiveSession == null) {
            return $this->json([
                'message' => 'false',
            ]);
        }
        $ActiveSession = $ActiveSession->getActiveSession();
        if ($ActiveSession) {
            return $this->json([
                'message' => 'true',
                'sessionActive' => $ActiveSession,
            ]);
        } else {
            return $this->json([
                'message' => 'false',
            ]);
        }
    }

    /**
     * @Route("/api/set/guest/{url}", name="app_set_guest", methods={"GET", "POST"})
     */
    public function createGuest(HttpClientInterface $client, Request $request, EntityManagerInterface $entityManager, $url): Response
    {
        $ActiveSession = $entityManager->getRepository(ActiveSession::class)->findOneBy(['url' => $url]);

        if (!$ActiveSession) {
            return $this->json([
                'message' => 'Cette session n\'existe pas',
            ]);
        } else {
            $guests = $entityManager->getRepository(Guest::class)->findBy(['active_session' => $ActiveSession]);
            foreach ($guests as $guest) {
                if ($guest->getNavigatorToken() == $_POST['token']) {
                    return $this->json([
                        'message' => 'L\'utilisateur est d??j?? connect??',
                        'guest' => $guest
                    ]);
                    break;
                }
            }
        }
        $guest = new Guest();
        $guest->setNavigatorToken($_POST['token']);
        $guest->setActiveSession($ActiveSession);
        $guest->setName($_POST['name']);

        $entityManager->persist($guest);
        $entityManager->flush();

        return $this->json([
            'message' => 'L\'utilisateur a ??t?? cr????'
        ]);
    }

    /**
     * @Route("/api/get/isAlreadyCreated", name="app_get_isAlreadyCreated", methods={"GET", "POST"})
     */
    public function getIsAlreadyCreated(HttpClientInterface $client, Request $request, EntityManagerInterface $entityManager): Response
    {

        $token = $_POST['token'];

        $guest = $entityManager->getRepository(Guest::class)->findOneBy(['navigatorToken' => $token]);
        if ($guest) {
            return $this->json([
                'message' => true,
            ]);
        }
        return $this->json([
            'message' => false,
        ]);
    }


    /**
     * @Route("/api/patch/guest/{token}", name="app_patch_guest", methods={"GET", "POST"})
     */
    public function patchGuest(HttpClientInterface $client, Request $request, EntityManagerInterface $entityManager, $token): Response
    {
        $guest = $entityManager->getRepository(Guest::class)->findOneBy(['navigatorToken' => $token]);
        if (!$guest) {
            return $this->json([
                'message' => 'Cet utilisateur n\'existe pas',
            ]);
        }
        $guest->setName($_POST['name']);
        $entityManager->persist($guest);
        $entityManager->flush();
        return $this->json([
            'message' => 'L\'utilisateur a ??t?? mis ?? jour',
            'token' => $token,
            'name' => $_POST['name']
        ]);
    }

    /**
     * @Route("/api/isUrlActive", name="app_isUrlActive", methods={"GET", "POST"})
     */
    public function isUrlActive(HttpClientInterface $client, Request $request, EntityManagerInterface $entityManager): Response
    {
        $url = $_POST['url'];
        $ActiveSession = $entityManager->getRepository(ActiveSession::class)->findOneBy(['url' => $url]);
        if ($ActiveSession) {
            return $this->json([
                'message' => true,
            ]);
        }
        return $this->json([
            'message' => false,
        ]);
    }

    /**
     * @Route("/api/get/sessionList", name="get_session_from_user", methods={"GET", "POST"})
     */
    public function getSessionFromUser(Request $request, EntityManagerInterface $entityManager): Response
    {
        $this->user = $this->getUser();
        //Get all session
        $sessions = $entityManager->getRepository(Session::class)->findBy(['user' => $this->user]);
        return $this->json([
            'sessions' => $sessions,
        ]);
    }

    //Create a route to delete a session who belong to the user and the session is not active
    /**
     * @Route("/api/delete/session/{idSession}", name="app_delete_session", methods={"GET", "POST"})
     */
    public function deleteSession(HttpClientInterface $client, Request $request, EntityManagerInterface $entityManager, $idSession): Response
    {
        //check if the session belong to the user
        $session = $entityManager->getRepository(Session::class)->findOneBy(['id' => $idSession]);

        //Get the userID of the session
        $userID = $session->getUser()->getId();
        //Get the userID of the user that request the call
        $user = $this->getUser();

        //Check if the user is the owner of the session
        if ($userID == $user->getId()) {
            //Check if the session is active
            if ($session->getActiveSession() == null) {
                //Delete the session
                $entityManager->remove($session);
                $entityManager->flush();
                return $this->json([
                    'isDeleted' => true,
                    'message' => 'La session a ??t?? supprim??e',
                ]);
            } else {
                return $this->json([
                    'isDeleted' => false,
                    'message' => 'La session est active',
                ]);
            }
        } else {
            return $this->json([
                'isDeleted' => false,
                'message' => 'Vous n\'??tes pas le propri??taire de cette session',
            ]);
        }
    }

    /**
     * @Route("/api/get/session/queue/{url}", name="app_get_queue", methods={"GET", "POST"})
     */
    public function getQueue(HttpClientInterface $client, Request $request, EntityManagerInterface $entityManager, $url): Response
    {
        return $this->json([
            'queue' => $entityManager->getRepository(ActiveSession::class)->findOneBy(['url' => $url])->getMusicQueue(),
        ]);
    }

    /**
     * @Route("/api/get/current/song/{url}", name="app_get_current_song", methods={"GET", "POST"})
     */
    public function getCurrentSong(HttpClientInterface $client, Request $request, EntityManagerInterface $entityManager, $url): Response
    {
        $ActiveSession = $entityManager->getRepository(ActiveSession::class)->findOneBy(['url' => $url]);
        $currentIndex = $ActiveSession->getCurrentIndex();
        $music_queue = $ActiveSession->getMusicQueue();
        $currentSong = $music_queue[$currentIndex - 1];

        return $this->json([
            'index' => $currentIndex,
            'song' => $currentSong,
        ]);
    }


    /**
     * @Route("/api/udpate/user", name="app_update_user_params", methods={"GET", "POST"})
     */
    public function updateUserParams(HttpClientInterface $client, Request $request, EntityManagerInterface $entityManager): Response
    {
        $user = $this->getUser();
        if (isset($_POST['name'])) {
            $user->setName($_POST['name']);
        }
        if (isset($_POST['email'])) {
            $user->setEmail($_POST['email']);
        }
        if (isset($_POST['password'])) {
            $user->setPassword($_POST['password']);
        }
        $entityManager->persist($user);
        $entityManager->flush();
        return $this->json([
            'message' => 'Les param??tres ont ??t?? mis ?? jour',
        ]);
    }

    /**
     * @Route("/api/get/url/session/{idSession}", name="app_get_url_session", methods={"GET", "POST"})
     */
    public function getUrlSession(HttpClientInterface $client, Request $request, EntityManagerInterface $entityManager, $idSession): Response
    {
        $session = $entityManager->getRepository(Session::class)->findOneBy(['id' => $idSession])->getActiveSession();
        return $this->json([
            'url' => $session->getUrl(),
        ]);
    }
}
