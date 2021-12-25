import {MigrationInterface, QueryRunner} from "typeorm";

export class createBookTable1640417198791 implements MigrationInterface {
    name = 'createBookTable1640417198791'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "book" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "author" varchar NOT NULL, "publisher" varchar NOT NULL, "status" varchar CHECK( status IN ('1','2','3','4') ) NOT NULL, "category" integer NOT NULL, "image_path" varchar NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "book"`);
    }

}
