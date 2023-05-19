import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterColumnSchedules1683926989895 implements MigrationInterface {
    name = 'AlterColumnSchedules1683926989895'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "schedules" RENAME COLUMN "hours" TO "hour"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "schedules" RENAME COLUMN "hour" TO "hours"`);
    }

}
