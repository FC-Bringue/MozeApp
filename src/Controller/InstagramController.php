<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use MetzWeb\Instagram\Instagram;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\User;
use App\Entity\Instagram as entityInstagram;
use Phpfastcache\Helper\Psr16Adapter;

class InstagramController extends AbstractController
{
    public function __construct()
    {

        $this->instagramClient = new Instagram(array(
            'apiKey' => $_ENV['INST_APPKEY'],
            'apiSecret' => $_ENV['INST_APPSECRET'],
            'apiCallback' => $_ENV['INST_APPCALLBACK']
        )); 

        /* $this->instagramClient = new Instagram($_ENV['INST_APPKEY']); */
    }

    /** 
    * @Route("/api/instagram/getAccessToken", name="app_instagram_get_token", methods={"GET", "POST"})
    */
    public function getAccessToken(): Response
    {

        echo $this->instagramClient->getLoginUrl(array(
            'basic'
        ));;
        return $this->json([
            'message' => 'Test controller',
            'result' => $this->instagramClient->getLoginUrl(array(
                'basic',
                'likes',
                'relationships',
                'comments'
            ))
            ]);
    }

    /** 
    * @Route("/api/instagram/setAccessToken", name="app_instagram_set_token", methods={"GET", "POST"})
    */
    public function setAccessToken(EntityManagerInterface $em): Response
    {
        $user = $this->getUser();
        $instagram = $user->getInstagram();
        if(!$instagram) {
            $user->setInstagram(new entityInstagram());
            $em->persist($user);
            $em->flush();
        }

        //todo: faire appel a la libraire instagram pour récupérer le token
        $code = $_GET['code'];
        if (true === isset($code)) {
            // Receive OAuth token object
            $data = $this->instagramClient->getOAuthToken($code);

            // Store user access token
            /* $accesstoken = $this->instagramClient->getAccessToken($data); */

            $user->getInstagram()->setToken($data->access_token);
            $em->persist($user);
            $em->flush();

            return $this->json([
                'message' => 'Test controller',
                'result' => "success",
                'data' => $data
                ]);
        }else {
            return $this->json([
                'message' => 'Test controller',
                'result' => "error"
                ]);
        }
    }

    /** 
    * @Route("/api/instagram/getHashtag", name="app_instagram_get_hashtag", methods={"GET", "POST"})
    */
    public function getMediaListByHashtag(EntityManagerInterface $em): Response
    {
/* 
        $this->getUser();
        $instagram = $this->getUser()->getInstagram();
        $token = $instagram->getToken();

        $this->instagramClient->setAccessToken($token);
        $returnData = $this->instagramClient->getTagMedia('mozeapprealeasesoon'); 

        return $this->json([
            'message' => 'Test controller',
            'result' => $returnData,
            'token' => $token,
            'instagram' => $this->instagramClient->setAccessToken($token),
            "insta" => $this->instagramClient->getAccessToken($token)
            ]);
             */

        return $this->json([
            'message' => 'aaaaaaaaaaaaa',
            'result' => "medias"
            ]);
    }
    
   
}