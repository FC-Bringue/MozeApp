<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220629214241 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE active_session (id INT AUTO_INCREMENT NOT NULL, session_id INT NOT NULL, nbr_of_music_played_before_event INT NOT NULL, is_event TINYINT(1) NOT NULL, event_name VARCHAR(255) DEFAULT NULL, event_id INT DEFAULT NULL, UNIQUE INDEX UNIQ_530869CA613FECDF (session_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE rpc (id INT AUTO_INCREMENT NOT NULL, active_session_id INT NOT NULL, UNIQUE INDEX UNIQ_53B02C38409D8E29 (active_session_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE active_session ADD CONSTRAINT FK_530869CA613FECDF FOREIGN KEY (session_id) REFERENCES session (id)');
        $this->addSql('ALTER TABLE rpc ADD CONSTRAINT FK_53B02C38409D8E29 FOREIGN KEY (active_session_id) REFERENCES active_session (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE rpc DROP FOREIGN KEY FK_53B02C38409D8E29');
        $this->addSql('DROP TABLE active_session');
        $this->addSql('DROP TABLE rpc');
    }
}
