import {MigrationInterface, QueryRunner} from "typeorm";

export class AddColumnUpdateStatusAtToBooks1647475710468 implements MigrationInterface {
    name = 'AddColumnUpdateStatusAtToBooks1647475710468'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`books\` ADD \`updated_status_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`books\` DROP COLUMN \`updated_status_at\``);
    }

}
