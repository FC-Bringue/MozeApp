<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

use App\Entity\Spotify;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use App\Repository\UserRepository;

class SpotifyController extends AbstractController
{
    /**
     * @Route("/api/getSpotifyToken", name="app_spotify")
     */

    public function index(UserRepository $userRepository, EntityManagerInterface $entityManager): JsonResponse
    {
        // $user = $this->getUser();
        // $spotify = $user->getSpotify();
        // $spotifyToken = null;
        // $spotifyToken = $spotify->getSpotifyToken();
        // $spotify->setToken($spotifyToken);

        $client_id = 'ee7443a8ac544def92e43ecb34e0e0a3'; 
        $client_secret = '9a78f64e60cd4f04948613c4306f6677';

        $ch = curl_init();
        url_setopt($ch, CURLOPT_URL, 'https://accounts.spotify.com/api/token' );
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1 );
        curl_setopt($ch, CURLOPT_POST, 1 );
        curl_setopt($ch, CURLOPT_POSTFIELDS, 'grant_type=client_credentials' ); 
        curl_setopt($ch, CURLOPT_HTTPHEADER, array('Authorization: Basic '.base64_encode($client_id.':'.$client_secret))); 

        // addScope(
        // 'ugc-image-upload',
        // 'user-modify-playback-state',
        // 'user-read-playback-state',
        // 'user-read-currently-playing',
        // 'user-follow-modify',
        // 'user-follow-read',
        // 'user-read-recently-played',
        // 'user-read-playback-position',
        // 'user-top-read',
        // 'playlist-read-collaborative',
        // 'playlist-modify-public',
        // 'playlist-read-private',
        // 'playlist-modify-private',
        // 'app-remote-control',
        // 'streaming',
        // 'user-read-email',
        // 'user-read-private',
        // 'user-library-modify',
        // 'user-library-read',
        //         );
        
        $result=curl_exec($ch);
        echo $result;

        

        // return $this->json([
        //     'message' => 'Test controller',
        //     'path' => 'src/Controller/SpotifyController.php',
        //     'user' => $user,
        //     'spotify' => $spotify,
        //     "spotifyToken" => $spotifyToken,
        // ]);
    }
}