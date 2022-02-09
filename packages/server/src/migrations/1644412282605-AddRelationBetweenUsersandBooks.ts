import {MigrationInterface, QueryRunner} from "typeorm";

export class AddRelationBetweenUsersandBooks1644412282605 implements MigrationInterface {
    name = 'AddRelationBetweenUsersandBooks1644412282605'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`books\` ADD CONSTRAINT \`FK_d2211ba79c9312cdcda4d7d5860\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`books\` DROP FOREIGN KEY \`FK_d2211ba79c9312cdcda4d7d5860\``);
    }

}
