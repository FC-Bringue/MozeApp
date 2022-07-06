<?php

namespace App\Entity;

use App\Repository\ActiveSessionRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;

/**
 * @ORM\Entity(repositoryClass=ActiveSessionRepository::class)
 * @UniqueEntity(fields={"url"}, message="There is already an url registered for session")
 */
class ActiveSession
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\OneToOne(targetEntity=Session::class, inversedBy="activeSession", cascade={"persist", "remove"})
     * @ORM\JoinColumn(nullable=false)
     */
    private $session;

    /**
     * @ORM\Column(type="integer")
     */
    private $nbrOfMusicPlayedBeforeEvent;

    /**
     * @ORM\Column(type="boolean")
     */
    private $isEvent;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $EventName;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $EventId;

    /**
     * @ORM\OneToOne(targetEntity=Rpc::class, mappedBy="activeSession", cascade={"persist", "remove"})
     */
    private $rpc;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $url;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getSession(): ?Session
    {
        return $this->session;
    }

    public function setSession(Session $session): self
    {
        $this->session = $session;

        return $this;
    }

    public function getNbrOfMusicPlayedBeforeEvent(): ?int
    {
        return $this->nbrOfMusicPlayedBeforeEvent;
    }

    public function setNbrOfMusicPlayedBeforeEvent(int $nbrOfMusicPlayedBeforeEvent): self
    {
        $this->nbrOfMusicPlayedBeforeEvent = $nbrOfMusicPlayedBeforeEvent;

        return $this;
    }

    public function isIsEvent(): ?bool
    {
        return $this->isEvent;
    }

    public function setIsEvent(bool $isEvent): self
    {
        $this->isEvent = $isEvent;

        return $this;
    }

    public function getEventName(): ?string
    {
        return $this->EventName;
    }

    public function setEventName(?string $EventName): self
    {
        $this->EventName = $EventName;

        return $this;
    }

    public function getEventId(): ?int
    {
        return $this->EventId;
    }

    public function setEventId(?int $EventId): self
    {
        $this->EventId = $EventId;

        return $this;
    }

    public function getRpc(): ?Rpc
    {
        return $this->rpc;
    }

    public function setRpc(Rpc $rpc): self
    {
        // set the owning side of the relation if necessary
        if ($rpc->getActiveSession() !== $this) {
            $rpc->setActiveSession($this);
        }

        $this->rpc = $rpc;

        return $this;
    }

    public function getUrl(): ?string
    {
        return $this->url;
    }

    public function setUrl(string $url): self
    {
        $this->url = $url;

        return $this;
    }
}
