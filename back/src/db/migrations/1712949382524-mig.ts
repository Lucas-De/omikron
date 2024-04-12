import { MigrationInterface, QueryRunner } from 'typeorm';

export class Mig1712949382524 implements MigrationInterface {
  name = 'Mig1712949382524';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."meal_status_enum" AS ENUM('PENDING', 'PROCESSED', 'ERROR')`,
    );
    await queryRunner.query(
      `ALTER TABLE "meal" ADD "status" "public"."meal_status_enum" NOT NULL DEFAULT 'PENDING'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "meal" DROP COLUMN "status"`);
    await queryRunner.query(`DROP TYPE "public"."meal_status_enum"`);
  }
}
