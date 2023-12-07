import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedDeleteMarkerNotificationTypeForNotificationsTable1701888306860 implements MigrationInterface {
    name = 'AddedDeleteMarkerNotificationTypeForNotificationsTable1701888306860'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."notification-type" RENAME TO "notification-type_old"`);
        await queryRunner.query(`CREATE TYPE "public"."notification-type" AS ENUM('create-marker', 'update-marker', 'delete-marker')`);
        await queryRunner.query(`ALTER TABLE "notifications" ALTER COLUMN "notification_type" TYPE "public"."notification-type" USING "notification_type"::"text"::"public"."notification-type"`);
        await queryRunner.query(`DROP TYPE "public"."notification-type_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."notification-type_old" AS ENUM('create-marker', 'update-marker')`);
        await queryRunner.query(`ALTER TABLE "notifications" ALTER COLUMN "notification_type" TYPE "public"."notification-type_old" USING "notification_type"::"text"::"public"."notification-type_old"`);
        await queryRunner.query(`DROP TYPE "public"."notification-type"`);
        await queryRunner.query(`ALTER TYPE "public"."notification-type_old" RENAME TO "notification-type"`);
    }

}
