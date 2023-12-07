import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedNotificationTable1701868952179 implements MigrationInterface {
    name = 'AddedNotificationTable1701868952179'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."notification-type" AS ENUM('create-marker', 'update-marker')`);
        await queryRunner.query(`CREATE TABLE "notifications" ("id" SERIAL NOT NULL, "is_viewed" boolean NOT NULL DEFAULT false, "notification_type" "public"."notification-type" NOT NULL, "marker_id" integer, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, CONSTRAINT "PK_6a72c3c0f683f6462415e653c3a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "notifications" ADD CONSTRAINT "FK_61c6110f98efec4ab71c6348023" FOREIGN KEY ("marker_id") REFERENCES "markers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notifications" DROP CONSTRAINT "FK_61c6110f98efec4ab71c6348023"`);
        await queryRunner.query(`DROP TABLE "notifications"`);
        await queryRunner.query(`DROP TYPE "public"."notification-type"`);
    }

}
