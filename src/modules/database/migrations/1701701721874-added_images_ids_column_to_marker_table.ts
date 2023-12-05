import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddedImagesIdsColumnToMarkerTable1701701721874
  implements MigrationInterface
{
  name = 'AddedImagesIdsColumnToMarkerTable1701701721874';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "markers" ADD "images_ids" integer array NOT NULL DEFAULT '{}'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "markers" DROP COLUMN "images_ids"`);
  }
}
