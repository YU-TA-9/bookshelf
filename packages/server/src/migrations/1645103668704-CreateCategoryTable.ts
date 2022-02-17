import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateCategoryTable1645103668704 implements MigrationInterface {
    name = 'CreateCategoryTable1645103668704'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`categories\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`user_id\` bigint NULL, \`name\` varchar(255) NOT NULL, \`color\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`categories\` ADD CONSTRAINT \`FK_2296b7fe012d95646fa41921c8b\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`categories\` DROP FOREIGN KEY \`FK_2296b7fe012d95646fa41921c8b\``);
        await queryRunner.query(`DROP TABLE \`categories\``);
    }

}
