import {MigrationInterface, QueryRunner} from "typeorm";

export class AddColumnUpdateStatusAtToBooks1647471002559 implements MigrationInterface {
    name = 'AddColumnUpdateStatusAtToBooks1647471002559'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`books\` ADD \`updated_status_at\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`books\` DROP COLUMN \`updated_status_at\``);
    }

}
