<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

use App\Entity\Spotify;
use App\Entity\User;
use App\Controller\Request ;
use Doctrine\ORM\EntityManagerInterface;
use App\Repository\UserRepository;
use SpotifyWebAPI\Session;
use SpotifyWebAPI\SpotifyWebAPI;

class SpotifyController extends AbstractController
{
    /**
    * @Route("/api/getSpotifyToken", name="app_spotify", methods={"GET", "POST"})
    */

    public function index(UserRepository $userRepository, EntityManagerInterface $entityManager, Request $request): JsonResponse
    {
        $client_id = $_ENV["SPOTIFY_CLIENT_ID"];
        $client_secret = $_ENV["SPOTIFY_CLIENT_SECRET"];
        $redirect_uri = $request->getUri() .  $_ENV["SPOTIFY_REDIRECT_URI"];

        $session = new Session($client_id, $client_secret, $redirect_uri);
        $api = new SpotifyWebAPI();
        if (isset($_GET['code'])) {
            $session->requestAccessToken($_GET['code']);
            $api->setAccessToken($session->getAccessToken());
        }else {
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
            ];
            header('Location: ' . $session->getAuthorizeUrl($options));
            die();
        }
        return $this->json([
            'message' => 'Test controller',
            'path' => 'src/Controller/SpotifyController.php',
            'result' =>$session
        ]);
    }
}