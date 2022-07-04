<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220629220108 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE rpc ADD j1_id INT DEFAULT NULL, ADD j2_id INT DEFAULT NULL, ADD j1_action VARCHAR(255) DEFAULT NULL, ADD j2_action VARCHAR(255) DEFAULT NULL, ADD j1_points INT DEFAULT NULL, ADD j2_points INT DEFAULT NULL');
        $this->addSql('ALTER TABLE rpc ADD CONSTRAINT FK_53B02C38C4371B17 FOREIGN KEY (j1_id) REFERENCES guest (id)');
        $this->addSql('ALTER TABLE rpc ADD CONSTRAINT FK_53B02C38D682B4F9 FOREIGN KEY (j2_id) REFERENCES guest (id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_53B02C38C4371B17 ON rpc (j1_id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_53B02C38D682B4F9 ON rpc (j2_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE rpc DROP FOREIGN KEY FK_53B02C38C4371B17');
        $this->addSql('ALTER TABLE rpc DROP FOREIGN KEY FK_53B02C38D682B4F9');
        $this->addSql('DROP INDEX UNIQ_53B02C38C4371B17 ON rpc');
        $this->addSql('DROP INDEX UNIQ_53B02C38D682B4F9 ON rpc');
        $this->addSql('ALTER TABLE rpc DROP j1_id, DROP j2_id, DROP j1_action, DROP j2_action, DROP j1_points, DROP j2_points');
    }
}
