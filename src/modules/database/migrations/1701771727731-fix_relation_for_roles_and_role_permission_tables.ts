import { MigrationInterface, QueryRunner } from "typeorm";

export class FixRelationForRolesAndRolePermissionTables1701771727731 implements MigrationInterface {
    name = 'FixRelationForRolesAndRolePermissionTables1701771727731'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "roles" DROP CONSTRAINT "FK_0febb26328691f5aebb9b8a8fe3"`);
        await queryRunner.query(`ALTER TABLE "role_permissions" DROP CONSTRAINT "FK_178199805b901ccd220ab7740ec"`);
        await queryRunner.query(`ALTER TABLE "role_permissions" DROP CONSTRAINT "REL_178199805b901ccd220ab7740e"`);
        await queryRunner.query(`ALTER TABLE "roles" DROP CONSTRAINT "REL_0febb26328691f5aebb9b8a8fe"`);
        await queryRunner.query(`ALTER TABLE "role_permissions" ADD CONSTRAINT "FK_178199805b901ccd220ab7740ec" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "role_permissions" DROP CONSTRAINT "FK_178199805b901ccd220ab7740ec"`);
        await queryRunner.query(`ALTER TABLE "roles" ADD CONSTRAINT "REL_0febb26328691f5aebb9b8a8fe" UNIQUE ("role_permission_id")`);
        await queryRunner.query(`ALTER TABLE "role_permissions" ADD CONSTRAINT "REL_178199805b901ccd220ab7740e" UNIQUE ("role_id")`);
        await queryRunner.query(`ALTER TABLE "role_permissions" ADD CONSTRAINT "FK_178199805b901ccd220ab7740ec" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "roles" ADD CONSTRAINT "FK_0febb26328691f5aebb9b8a8fe3" FOREIGN KEY ("role_permission_id") REFERENCES "role_permissions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
