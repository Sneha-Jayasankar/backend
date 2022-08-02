import {MigrationInterface, QueryRunner} from "typeorm";

export class addresstableedit1659429236684 implements MigrationInterface {
    name = 'addresstableedit1659429236684'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" ADD "address_line2" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "address_line2"`);
    }

}
