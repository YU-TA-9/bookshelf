import {MigrationInterface, QueryRunner} from "typeorm";

export class createUsersTable1644321385731 implements MigrationInterface {
    name = 'createUsersTable1644321385731'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`lastName\` varchar(255) NOT NULL, \`firstName\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NULL, \`iconUrl\` varchar(255) NULL, \`google_id\` varchar(255) NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_0bd5012aeb82628e07f6a1be53\` (\`google_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_0bd5012aeb82628e07f6a1be53\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
    }

}
