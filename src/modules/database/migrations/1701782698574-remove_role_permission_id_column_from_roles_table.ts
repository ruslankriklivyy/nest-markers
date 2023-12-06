import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveRolePermissionIdColumnFromRolesTable1701782698574 implements MigrationInterface {
    name = 'RemoveRolePermissionIdColumnFromRolesTable1701782698574'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "roles" DROP COLUMN "role_permission_id"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "roles" ADD "role_permission_id" integer`);
    }

}
