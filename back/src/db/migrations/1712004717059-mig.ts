import { MigrationInterface, QueryRunner } from 'typeorm';

export class Mig1712004717059 implements MigrationInterface {
  name = 'Mig1712004717059';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "meal" ("id" SERIAL NOT NULL, "description" character varying(400) NOT NULL, "date" date NOT NULL, "calories" integer, "proteins" integer, "carbs" integer, "fats" integer, "userId" integer, CONSTRAINT "PK_ada510a5aba19e6bb500f8f7817" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."user_role_enum" AS ENUM('ADMIN', 'COMMON')`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "role" "public"."user_role_enum" NOT NULL DEFAULT 'COMMON', "passwordHash" character varying(64) NOT NULL, "deleted_at" TIMESTAMP, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "meal" ADD CONSTRAINT "FK_419ad998c5e3b37a7cce0f872f5" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "meal" DROP CONSTRAINT "FK_419ad998c5e3b37a7cce0f872f5"`,
    );
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
    await queryRunner.query(`DROP TABLE "meal"`);
  }
}
