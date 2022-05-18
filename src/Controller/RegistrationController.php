<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use App\Entity\User;
use App\Repository\UserRepository;
use Symfony\Bundle\MakerBundle\Validator;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class RegistrationController extends AbstractController
{
    /**
     * @Route("/api/registration", name="app_registration", methods={"POST"})
     */
    public function index(SerializerInterface $serializer, UserRepository $userRepository, Request $request, ValidatorInterface $validatorInterface): JsonResponse
    {
        try {
            $data = $request->getContent();
            $user = $serializer->deserialize($data, User::class, 'json');
            $errors = $validatorInterface->validate($user);
            if (count($errors) > 0) {
                $errorsString = (string) $errors;
                return new JsonResponse($errorsString, Response::HTTP_BAD_REQUEST);
            }
            return $this->json($user, Response::HTTP_CREATED, [], ['groups' => 'user:write']);
        } catch (\Exception $e) {
            return $this->json(['message' => $e->getMessage(), 'status' => Response::HTTP_BAD_REQUEST], Response::HTTP_BAD_REQUEST);
        }
    }
}
