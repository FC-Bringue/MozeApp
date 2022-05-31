<?php

namespace App\DataPersister;

use ApiPlatform\Core\DataPersister\DataPersisterInterface;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use App\Repository\UserRepository;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use App\Entity\Spotify;

use App\Security\EmailVerifier;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Mime\Address;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Contracts\Translation\TranslatorInterface;
use SymfonyCasts\Bundle\VerifyEmail\Exception\VerifyEmailExceptionInterface;

class UserPersister implements DataPersisterInterface
{
    protected $em;
    protected $userRepository;
    private EmailVerifier $emailVerifier;
    public function __construct(EmailVerifier $emailVerifier, UserRepository $userRepository, EntityManagerInterface $em, UserPasswordHasherInterface $passwordHasherInterface, ValidatorInterface $validator)
    {
        $this->userRepository = $userRepository;
        $this->em = $em;
        $this->passwordHasher = $passwordHasherInterface;
        $this->validator = $validator;
        $this->emailVerifier = $emailVerifier;
    }

    public function supports($data): bool
    {
        return $data instanceof User;
    }



    public function persist($data)
    {
        $errors = $this->validator->validate($data);
        if (count($errors) > 0) {
            $errorsString = (string) $errors;
            throw new \Exception($errorsString);
        }
        try {
            $data->setPassword(
                $this->passwordHasher->hashPassword(
                    $data,
                    $data->getPassword()
                )
            );

            $spotify = new Spotify();
            $data->setSpotify($spotify);

            $this->em->persist($data);
            $this->em->flush();
            $this->sendWelcomeEmail($data);

            // erase the password
            $data->eraseCredentials();
        } catch (\Exception $e) {
            $data->eraseCredentials();
            throw new \Exception($e->getMessage());
        }
    }


    public function remove($data)
    {
        $this->em->remove($data);
        $this->em->flush();
    }
    private function sendWelcomeEmail(User $user)
    {
        $this->emailVerifier->sendEmailConfirmation(
            'app_verify_email',
            $user,
            (new TemplatedEmail())
                ->from(new Address('medijob@preprod-aileen.com', 'Moze Team'))
                ->to($user->getEmail())
                ->subject('Please Confirm your Email')
                ->htmlTemplate('registration/confirmation_email.html.twig')
        );
        //send via messenger
        
    }
}
