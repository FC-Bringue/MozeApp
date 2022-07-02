<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220701205941 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE instagram ADD user_id INT NOT NULL');
        $this->addSql('ALTER TABLE instagram ADD CONSTRAINT FK_84A87EC3A76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_84A87EC3A76ED395 ON instagram (user_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE instagram DROP FOREIGN KEY FK_84A87EC3A76ED395');
        $this->addSql('DROP INDEX UNIQ_84A87EC3A76ED395 ON instagram');
        $this->addSql('ALTER TABLE instagram DROP user_id');
    }
}
