import { MigrationInterface, QueryRunner } from 'typeorm';

export class Mig1713033578201 implements MigrationInterface {
  name = 'Mig1713033578201';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."user_role_enum" AS ENUM('ADMIN', 'COMMON')`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "firstName" character varying(20) NOT NULL, "lastName" character varying(20) NOT NULL, "email" character varying(100) NOT NULL, "role" "public"."user_role_enum" NOT NULL DEFAULT 'COMMON', "passwordHash" character varying(64), "deleted_at" TIMESTAMP, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."meal_status_enum" AS ENUM('PENDING', 'PROCESSED', 'ERROR')`,
    );
    await queryRunner.query(
      `CREATE TABLE "meal" ("id" SERIAL NOT NULL, "description" character varying(400) NOT NULL, "date" TIMESTAMP NOT NULL, "calories" integer, "proteins" integer, "carbs" integer, "fats" integer, "status" "public"."meal_status_enum" NOT NULL DEFAULT 'PENDING', "userId" integer, CONSTRAINT "PK_ada510a5aba19e6bb500f8f7817" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "meal" ADD CONSTRAINT "FK_419ad998c5e3b37a7cce0f872f5" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "meal" DROP CONSTRAINT "FK_419ad998c5e3b37a7cce0f872f5"`,
    );
    await queryRunner.query(`DROP TABLE "meal"`);
    await queryRunner.query(`DROP TYPE "public"."meal_status_enum"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
  }
}
