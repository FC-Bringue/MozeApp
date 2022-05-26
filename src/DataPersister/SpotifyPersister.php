<?php

namespace App\DataPersister;

use ApiPlatform\Core\DataPersister\DataPersisterInterface;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use App\Repository\UserRepository;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use App\Entity\Spotify;
use App\Repository\SpotifyRepository;




class SpotifyPersister implements DataPersisterInterface
{
    protected $em;
    protected $userRepository;
    protected $spotifyRepository;
    public function __construct(UserRepository $userRepository, EntityManagerInterface $em, ValidatorInterface $validator, SpotifyRepository $spotifyRepository)
    {
        $this->userRepository = $userRepository;
        $this->em = $em;
        $this->validator = $validator;
        $this->spotifyRepository = $spotifyRepository;
    }

    public function supports($data): bool
    {
        return $data instanceof Spotify;
    }



    public function persist($data)
    {
    }


    public function remove($data)
    {
        $this->em->remove($data);
        $this->em->flush();
    }
}
