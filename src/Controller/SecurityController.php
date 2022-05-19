<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;


class SecurityController extends AbstractController
{
    /**
     * @Route("/api/login_checkk", name="api_login_checkk", methods={"POST"})
     */
    public function index(): JsonResponse
    {
        //check path for jwt lexik_jwt_authentication.jwt_token_authenticator
        return $this->json(['message' => 'Hello World'], Response::HTTP_OK);
    }
}
