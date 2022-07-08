<?php

namespace App\Entity;

use App\Repository\GuestRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=GuestRepository::class)
 */
class Guest
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $name;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $navigatorToken;

    /**
     * @ORM\ManyToOne(targetEntity=ActiveSession::class, inversedBy="guests")
     * @ORM\JoinColumn(nullable=false)
     */
    private $active_session;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getNavigatorToken(): ?string
    {
        return $this->navigatorToken;
    }

    public function setNavigatorToken(string $navigatorToken): self
    {
        $this->navigatorToken = $navigatorToken;

        return $this;
    }

    public function getActiveSession(): ?ActiveSession
    {
        return $this->active_session;
    }

    public function setActiveSession(?ActiveSession $active_session): self
    {
        $this->active_session = $active_session;

        return $this;
    }
}
