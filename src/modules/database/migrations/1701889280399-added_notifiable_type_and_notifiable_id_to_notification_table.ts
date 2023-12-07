import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedNotifiableTypeAndNotifiableIdToNotificationTable1701889280399 implements MigrationInterface {
    name = 'AddedNotifiableTypeAndNotifiableIdToNotificationTable1701889280399'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notifications" DROP CONSTRAINT "FK_61c6110f98efec4ab71c6348023"`);
        await queryRunner.query(`ALTER TABLE "notifications" DROP COLUMN "marker_id"`);
        await queryRunner.query(`ALTER TABLE "notifications" ADD "notifiable_id" integer`);
        await queryRunner.query(`CREATE TYPE "public"."notifiable_entity" AS ENUM('marker')`);
        await queryRunner.query(`ALTER TABLE "notifications" ADD "notifiable_entity" "public"."notifiable_entity"`);
        await queryRunner.query(`ALTER TYPE "public"."notification-type" RENAME TO "notification-type_old"`);
        await queryRunner.query(`CREATE TYPE "public"."notification_type" AS ENUM('create-marker', 'update-marker', 'delete-marker')`);
        await queryRunner.query(`ALTER TABLE "notifications" ALTER COLUMN "notification_type" TYPE "public"."notification_type" USING "notification_type"::"text"::"public"."notification_type"`);
        await queryRunner.query(`DROP TYPE "public"."notification-type_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."notification-type_old" AS ENUM('create-marker', 'update-marker', 'delete-marker')`);
        await queryRunner.query(`ALTER TABLE "notifications" ALTER COLUMN "notification_type" TYPE "public"."notification-type_old" USING "notification_type"::"text"::"public"."notification-type_old"`);
        await queryRunner.query(`DROP TYPE "public"."notification_type"`);
        await queryRunner.query(`ALTER TYPE "public"."notification-type_old" RENAME TO "notification-type"`);
        await queryRunner.query(`ALTER TABLE "notifications" DROP COLUMN "notifiable_entity"`);
        await queryRunner.query(`DROP TYPE "public"."notifiable_entity"`);
        await queryRunner.query(`ALTER TABLE "notifications" DROP COLUMN "notifiable_id"`);
        await queryRunner.query(`ALTER TABLE "notifications" ADD "marker_id" integer`);
        await queryRunner.query(`ALTER TABLE "notifications" ADD CONSTRAINT "FK_61c6110f98efec4ab71c6348023" FOREIGN KEY ("marker_id") REFERENCES "markers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
