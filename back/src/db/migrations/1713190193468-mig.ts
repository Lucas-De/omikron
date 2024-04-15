import { MigrationInterface, QueryRunner } from 'typeorm';

export class Mig1713190193468 implements MigrationInterface {
  name = 'Mig1713190193468';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "meal" ALTER COLUMN "description" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "meal" ALTER COLUMN "description" SET NOT NULL`,
    );
  }
}
