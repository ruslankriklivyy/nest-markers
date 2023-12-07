import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedSoftDeleteForMarkersTable1701936969398 implements MigrationInterface {
    name = 'AddedSoftDeleteForMarkersTable1701936969398'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "markers" ADD "deletedAt" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "markers" DROP COLUMN "deletedAt"`);
    }

}
