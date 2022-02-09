import {MigrationInterface, QueryRunner} from "typeorm";

export class InitTables1644447014677 implements MigrationInterface {
    name = 'InitTables1644447014677'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`last_name\` varchar(255) NOT NULL, \`first_name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NULL, \`icon_url\` varchar(255) NULL, \`google_id\` varchar(255) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_0bd5012aeb82628e07f6a1be53\` (\`google_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`books\` (\`id\` int NOT NULL AUTO_INCREMENT, \`isbn\` varchar(255) NULL, \`name\` varchar(255) NOT NULL, \`author\` varchar(255) NOT NULL, \`publisher\` varchar(255) NOT NULL, \`status\` enum ('1', '2', '3', '4') NOT NULL, \`category\` int NOT NULL, \`image_path\` text NULL, \`memo\` text NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`user_id\` int NOT NULL, UNIQUE INDEX \`IDX_54337dc30d9bb2c3fadebc6909\` (\`isbn\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`books\` ADD CONSTRAINT \`FK_d2211ba79c9312cdcda4d7d5860\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`books\` DROP FOREIGN KEY \`FK_d2211ba79c9312cdcda4d7d5860\``);
        await queryRunner.query(`DROP INDEX \`IDX_54337dc30d9bb2c3fadebc6909\` ON \`books\``);
        await queryRunner.query(`DROP TABLE \`books\``);
        await queryRunner.query(`DROP INDEX \`IDX_0bd5012aeb82628e07f6a1be53\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
    }

}
