import {MigrationInterface, QueryRunner} from "typeorm";

export class addTables1659459473064 implements MigrationInterface {
    name = 'addTables1659459473064'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "employeeaddress_id"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" ADD "employeeaddress_id" character varying`);
    }

}
