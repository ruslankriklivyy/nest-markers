import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedRelationMarkerToNotificationsTable1701935989694 implements MigrationInterface {
    name = 'AddedRelationMarkerToNotificationsTable1701935989694'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notifications" ADD CONSTRAINT "FK_24feb38d65542374f572db25484" FOREIGN KEY ("notifiable_id") REFERENCES "markers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notifications" DROP CONSTRAINT "FK_24feb38d65542374f572db25484"`);
    }

}
