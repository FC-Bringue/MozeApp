<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

use App\Entity\Spotify;
use App\Entity\User;
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
        $client_id = 'ee7443a8ac544def92e43ecb34e0e0a3';
        $client_secret = '9a78f64e60cd4f04948613c4306f6677';
        $redirect_uri = 'https://localhost/api/getSpotifyToken';

        $session = new Session($client_id, $client_secret, $redirect_uri);
        $api = new SpotifyWebAPI();
        if (isset($_GET['code'])) {
            $session->requestAccessToken($_GET['code']);
            $api->setAccessToken($session->getAccessToken());
            // $user = $this->getUser();
            // find user by 'email' => $request->get('state')
            $user = $userRepository->findOneBy(['email' => $request->get('state')]);
            $spotify = $user->getSpotify();
            // dd($session->getAccessToken(), $session->getRefreshToken());
            $spotify->setToken($session->getAccessToken());
            $spotify->setRefreshToken($session->getRefreshToken());
            $entityManager->persist($spotify);
            $entityManager->flush();
        } else {
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

            $uri = $session->getAuthorizeUrl($options) . '&state=adrialb95@gmail.com';
            return $this->json([
                'uri' => $uri,
            ]);
        }
        return $this->json([
            'message' => 'Test controller',
            'path' => 'src/Controller/SpotifyController.php',
            'result' => $session,
            'user' => $user,
            'spotify' => $spotify,
        ]);
    }

    /** 
     * @Route("/api/refreshSpotifyToken", name="app_set_spotify", methods={"GET", "POST"})
     */
    public function setSpotifyToken(UserRepository $userRepository, EntityManagerInterface $entityManager, Request $request): JsonResponse
    {
        $client_id = 'ee7443a8ac544def92e43ecb34e0e0a3';
        $client_secret = '9a78f64e60cd4f04948613c4306f6677';
        // $redirect_uri = 'https://localhost/api/setSpotifyToken';

        $session = new Session($client_id, $client_secret);
        $api = new SpotifyWebAPI();
        $user = $this->getUser();
        $refreshToken = $user->getSpotify()->getRefreshToken();
        $session->refreshAccessToken($refreshToken);
        $accessToken = $session->getAccessToken();
        $refreshToken = $session->getRefreshToken();
        $spotify = $user->getSpotify();
        $spotify->setToken($accessToken);
        $spotify->setRefreshToken($refreshToken);
        $entityManager->persist($spotify);
        $entityManager->flush();
        $api->setAccessToken($accessToken);
        return $this->json([
            'message' => 'Test controller',
            'path' => 'src/Controller/SpotifyController.php',
            'refreshToken' => $refreshToken,
            'accessToken' => $accessToken,
        ]);
    }
}
