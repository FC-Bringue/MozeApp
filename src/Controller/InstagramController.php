<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class InstagramController extends AbstractController
{
    #[Route('/instagram', name: 'app_instagram')]
    public function index(): Response
    {
        return $this->render('instagram/index.html.twig', [
            'controller_name' => 'InstagramController',
        ]);
    }
}
