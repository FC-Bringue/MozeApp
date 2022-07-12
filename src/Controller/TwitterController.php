<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Noweh\TwitterApi\Client;

class TwitterController extends AbstractController
{

    public function __construct()
    {
        $settings = [
            'account_id' => $_ENV['TWI_ACCOUNTID'],
            'consumer_key' => $_ENV['TWI_APIKEY'],
            'consumer_secret' => $_ENV['TWI_APIKEYSECRET'],
            'bearer_token' => $_ENV['TWI_BEARERTOKEN'],
            'access_token' => $_ENV['TWI_ACCESSTOKEN'],
            'access_token_secret' => $_ENV['TWI_ACCESSTOKENSECRET']
        ];

        $client = new Client($settings);
        $this->client = $client;
    }

    /**
    * @Route("/api/twitter/getHashtag", name="app_twitter", methods={"GET", "POST"})
    */
    public function index(): Response
    {

        $hashtag = $_GET['hashtag'];

        $return = $this->client->tweetSearch()
        ->addFilterOnKeywordOrPhrase([
            $hashtag
        ])
        ->showUserDetails()
        ->performRequest();
        ;

        return $this->json([
            'message' => 'Test controller',
            'result' => $return
        ]);
    }
}