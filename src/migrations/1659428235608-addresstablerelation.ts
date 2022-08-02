import {MigrationInterface, QueryRunner} from "typeorm";

export class addresstablerelation1659428235608 implements MigrationInterface {
    name = 'addresstablerelation1659428235608'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "address_line2"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" ADD "address_line2" character varying`);
    }

}
