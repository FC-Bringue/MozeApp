<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\User;
use App\Entity\Spotify;

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
    public function index(Request $request): Response
    {
        $this->user = $this->getUser();
        // {
        //     "SessionName":"Samedi Soir",
        //     "game":{
        //         "frequency": "5", // nombre de musique avant de lancer un event random. Si 0 alors uniquement possibilité de lancé manuellement.
        //         "listGame":["Quizz","RPC"]// Liste des jeux à lancer
        //     },
        //     "Lights":{
        //         "color":"green"
        //     },
        //     "idPlaylist":46545642,// id donné par spotify
        // }
        $spotify = $this->user->getSpotify();
        $refreshToken = $spotify->getRefreshToken();
        // get the bearer token from the header
        $bearerToken = $request->headers->get('Authorization');

        return $this->json([
            'message' => 'Welcome,' . $this->user->getEmail(),
            'spotify' => $spotify,
            'path' => 'src/Controller/SessionController.php',
            'uri' => $request->getUri(),
        ]);
    }
}
