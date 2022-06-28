<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\SessionRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=SessionRepository::class)
 * @ApiResource(
 * normalizationContext={"groups"={"session:read"}},
 * denormalizationContext={"groups"={"session:write"}},
 * )
 */
#[ApiResource]
class Session
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="sessions")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"session:read", "session:write"})
     */
    private $user;

    /**
     * @ORM\Column(type="json")
     * @Groups({"session:read", "session:write"})
     */
    private $parameters = [];

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }

    public function getParameters(): ?array
    {
        return $this->parameters;
    }

    public function setParameters(array $parameters): self
    {
        $this->parameters = $parameters;

        return $this;
    }
}
