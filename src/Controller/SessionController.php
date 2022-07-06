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
     * @Route("/api/create/session", name="app_session", methods={"GET", "POST"})
     */
    public function index(Request $request, EntityManagerInterface $entityManager): Response
    {
        $this->user = $this->getUser();
        $jsonParams = [
            "SessionName" => "Samedi Soir",
            "idPlaylist" => "7cEAQguXJ81suQgQO5aplx"
        ];
        $spotify = $this->user->getSpotify();
        $session = new Session();
        $session->setUser($this->user);
        $session->setParameters($jsonParams);

        $entityManager->persist($session);
        $entityManager->flush();

        return $this->json([
            'message' => 'Welcome,' . $this->user->getEmail(),
        ]);
    }


    /**
     * @Route("/api/set/session/active/{idSession}", name="app_set_session_active", methods={"GET", "POST"})
     */
    public function setSessionActive(HttpClientInterface $client, Request $request, EntityManagerInterface $entityManager, $idSession): Response
    {
        $request = new Request();
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
        $ActiveSession->setSession($Session);
        $ActiveSession->setNbrOfMusicPlayedBeforeEvent(0);
        $ActiveSession->setIsEvent(0);

        // generate a unique url 
        $urlUuid = Uuid::v4()->toBase58();
        // on verifie si l'url n'existe pas déjà 
        while ($entityManager->getRepository(ActiveSession::class)->findOneBy(['url' => $urlUuid])) {
            $urlUuid = Uuid::v4()->toBase58();
        }
        $ActiveSession->setUrl($urlUuid);
        $ActiveSession->setMusicQueue($json);
        $entityManager->persist($ActiveSession);
        $entityManager->flush();
        return $this->json([
            'message' => 'done',
        ]);
    }
}
