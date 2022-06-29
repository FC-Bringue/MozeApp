<?php

namespace App\Entity;

use App\Repository\RpcRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=RpcRepository::class)
 */
class Rpc
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\OneToOne(targetEntity=ActiveSession::class, inversedBy="rpc", cascade={"persist", "remove"})
     * @ORM\JoinColumn(nullable=false)
     */
    private $activeSession;

    /**
     * @ORM\OneToOne(targetEntity=Guest::class, cascade={"persist", "remove"})
     */
    private $J1;

    /**
     * @ORM\OneToOne(targetEntity=Guest::class, cascade={"persist", "remove"})
     */
    private $J2;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $J1Action;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $J2Action;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $J1Points;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $J2Points;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getActiveSession(): ?ActiveSession
    {
        return $this->activeSession;
    }

    public function setActiveSession(ActiveSession $activeSession): self
    {
        $this->activeSession = $activeSession;

        return $this;
    }

    public function getJ1(): ?Guest
    {
        return $this->J1;
    }

    public function setJ1(?Guest $J1): self
    {
        $this->J1 = $J1;

        return $this;
    }

    public function getJ2(): ?Guest
    {
        return $this->J2;
    }

    public function setJ2(?Guest $J2): self
    {
        $this->J2 = $J2;

        return $this;
    }

    public function getJ1Action(): ?string
    {
        return $this->J1Action;
    }

    public function setJ1Action(?string $J1Action): self
    {
        $this->J1Action = $J1Action;

        return $this;
    }

    public function getJ2Action(): ?string
    {
        return $this->J2Action;
    }

    public function setJ2Action(?string $J2Action): self
    {
        $this->J2Action = $J2Action;

        return $this;
    }

    public function getJ1Points(): ?int
    {
        return $this->J1Points;
    }

    public function setJ1Points(?int $J1Points): self
    {
        $this->J1Points = $J1Points;

        return $this;
    }

    public function getJ2Points(): ?int
    {
        return $this->J2Points;
    }

    public function setJ2Points(?int $J2Points): self
    {
        $this->J2Points = $J2Points;

        return $this;
    }
}
