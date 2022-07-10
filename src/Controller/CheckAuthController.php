<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class CheckAuthController extends AbstractController
{
    /**
    * @Route("/api/checkPermission", name="check_eligibility", methods={"GET", "POST"})
    */
    public function checkEligibility(): Response
    {
        return $this->json([
            'result' => true
            ]);
    }

    /**
    * @Route("/api/getUserInfos", name="user_infos", methods={"GET", "POST"})
    */
    public function getUserInfos(): Response
    {
        $user = $this->getUser();
        return $this->json([
            'user' => $user
            ]);
    }
}