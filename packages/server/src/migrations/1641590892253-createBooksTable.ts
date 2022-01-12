import {MigrationInterface, QueryRunner} from "typeorm";

export class createBooksTable1641590892253 implements MigrationInterface {
    name = 'createBooksTable1641590892253'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`books\` (\`id\` int NOT NULL AUTO_INCREMENT, \`isbn\` varchar(255) NULL, \`name\` varchar(255) NOT NULL, \`author\` varchar(255) NOT NULL, \`publisher\` varchar(255) NOT NULL, \`status\` enum ('1', '2', '3', '4') NOT NULL, \`category\` int NOT NULL, \`image_path\` text NULL, \`memo\` text NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_54337dc30d9bb2c3fadebc6909\` (\`isbn\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_54337dc30d9bb2c3fadebc6909\` ON \`books\``);
        await queryRunner.query(`DROP TABLE \`books\``);
    }

}
