import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedNullableRolePermissionIdForRolesTable1701771402838 implements MigrationInterface {
    name = 'AddedNullableRolePermissionIdForRolesTable1701771402838'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "roles" DROP CONSTRAINT "FK_0febb26328691f5aebb9b8a8fe3"`);
        await queryRunner.query(`ALTER TABLE "roles" ALTER COLUMN "role_permission_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "roles" ADD CONSTRAINT "FK_0febb26328691f5aebb9b8a8fe3" FOREIGN KEY ("role_permission_id") REFERENCES "role_permissions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "roles" DROP CONSTRAINT "FK_0febb26328691f5aebb9b8a8fe3"`);
        await queryRunner.query(`ALTER TABLE "roles" ALTER COLUMN "role_permission_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "roles" ADD CONSTRAINT "FK_0febb26328691f5aebb9b8a8fe3" FOREIGN KEY ("role_permission_id") REFERENCES "role_permissions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
