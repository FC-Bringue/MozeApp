<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\SpotifyRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ApiResource(normalizationContext={"groups"={"spotify:read"}},denormalizationContext={"groups"={"spotify:write"}})
 * @ORM\Entity(repositoryClass=SpotifyRepository::class)
 */
class Spotify
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"spotify:read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"spotify:read", "spotify:write"})
     */
    private $token;

    /**
     * @ORM\OneToOne(targetEntity=User::class, inversedBy="spotify", cascade={"persist", "remove"})
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"spotify:read"})
     */
    private $id_user;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getToken(): ?string
    {
        return $this->token;
    }

    public function setToken(?string $token): self
    {
        $this->token = $token;

        return $this;
    }

    public function getIdUser(): ?User
    {
        return $this->id_user;
    }

    public function setIdUser(User $id_user): self
    {
        $this->id_user = $id_user;

        return $this;
    }
}
