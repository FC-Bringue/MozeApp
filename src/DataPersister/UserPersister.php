<?php

namespace App\DataPersister;

use ApiPlatform\Core\DataPersister\DataPersisterInterface;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use App\Repository\UserRepository;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use App\Entity\Spotify;




class UserPersister implements DataPersisterInterface
{
    protected $em;
    protected $userRepository;
    public function __construct(UserRepository $userRepository, EntityManagerInterface $em, UserPasswordHasherInterface $passwordHasherInterface, ValidatorInterface $validator)
    {
        $this->userRepository = $userRepository;
        $this->em = $em;
        $this->passwordHasher = $passwordHasherInterface;
        $this->validator = $validator;
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
}
