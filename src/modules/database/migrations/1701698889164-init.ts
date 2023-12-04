import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1701698889164 implements MigrationInterface {
    name = 'Init1701698889164'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "markers" ("id" SERIAL NOT NULL, "color" character varying(10) NOT NULL, "title" character varying(80) NOT NULL, "description" character varying NOT NULL, "latitude" double precision NOT NULL, "longitude" double precision NOT NULL, "layer_id" integer NOT NULL, "user_id" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, CONSTRAINT "PK_05eb83870b9b88db9d4e949965c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "files" ("id" SERIAL NOT NULL, "filename" character varying(80) NOT NULL, "url" character varying NOT NULL, "type" character varying NOT NULL, "size" double precision NOT NULL, "user_id" integer, "marker_id" integer, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, CONSTRAINT "REL_a7435dbb7583938d5e7d137604" UNIQUE ("user_id"), CONSTRAINT "PK_6c16b9093a142e0e7613b04a3d9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "full_name" character varying(120) NOT NULL, "email" character varying(80) NOT NULL, "password" character varying(80) NOT NULL, "is_activated" boolean NOT NULL DEFAULT false, "avatar_id" integer, "marker_ids" integer array NOT NULL DEFAULT '{}', "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, CONSTRAINT "REL_c3401836efedec3bec459c8f81" UNIQUE ("avatar_id"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."layers_type_enum" AS ENUM('public', 'private')`);
        await queryRunner.query(`CREATE TABLE "layers" ("id" SERIAL NOT NULL, "name" character varying(80) NOT NULL, "type" "public"."layers_type_enum" NOT NULL DEFAULT 'public', "marker_ids" integer array NOT NULL DEFAULT '{}', "custom_fields_ids" integer array NOT NULL DEFAULT '{}', "author_id" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, CONSTRAINT "PK_611c9a60a779f18c5e55e1f31b5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "custom_fields" ("id" SERIAL NOT NULL, "name" character varying(80) NOT NULL, "is_important" boolean NOT NULL DEFAULT false, "custom_field_type_id" integer NOT NULL, "layer_id" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, CONSTRAINT "PK_35ab958a0baec2e0b2b2b875fdb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "custom-field-types" ("id" SERIAL NOT NULL, "name" character varying(80) NOT NULL, "slug" character varying(80) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, CONSTRAINT "PK_3a2520ca09ef4ab97f35f55e6c6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tokens" ("id" SERIAL NOT NULL, "refresh_token" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "user_id" integer, CONSTRAINT "REL_8769073e38c365f315426554ca" UNIQUE ("user_id"), CONSTRAINT "PK_3001e89ada36263dabf1fb6210a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "markers" ADD CONSTRAINT "FK_81087b8a98d05f869361a49d064" FOREIGN KEY ("layer_id") REFERENCES "layers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "markers" ADD CONSTRAINT "FK_2730e0accf69e845190b1a5c4b9" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "files" ADD CONSTRAINT "FK_a7435dbb7583938d5e7d1376041" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "files" ADD CONSTRAINT "FK_649234c6c162907c602cc9c7688" FOREIGN KEY ("marker_id") REFERENCES "markers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_c3401836efedec3bec459c8f818" FOREIGN KEY ("avatar_id") REFERENCES "files"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "layers" ADD CONSTRAINT "FK_b8956cacf5e112e8bed30577571" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "custom_fields" ADD CONSTRAINT "FK_501e6ae781937c7e6f294c62e97" FOREIGN KEY ("custom_field_type_id") REFERENCES "custom-field-types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "custom_fields" ADD CONSTRAINT "FK_c0a5a1c99283d051a12b75b4026" FOREIGN KEY ("layer_id") REFERENCES "layers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tokens" ADD CONSTRAINT "FK_8769073e38c365f315426554ca5" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tokens" DROP CONSTRAINT "FK_8769073e38c365f315426554ca5"`);
        await queryRunner.query(`ALTER TABLE "custom_fields" DROP CONSTRAINT "FK_c0a5a1c99283d051a12b75b4026"`);
        await queryRunner.query(`ALTER TABLE "custom_fields" DROP CONSTRAINT "FK_501e6ae781937c7e6f294c62e97"`);
        await queryRunner.query(`ALTER TABLE "layers" DROP CONSTRAINT "FK_b8956cacf5e112e8bed30577571"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_c3401836efedec3bec459c8f818"`);
        await queryRunner.query(`ALTER TABLE "files" DROP CONSTRAINT "FK_649234c6c162907c602cc9c7688"`);
        await queryRunner.query(`ALTER TABLE "files" DROP CONSTRAINT "FK_a7435dbb7583938d5e7d1376041"`);
        await queryRunner.query(`ALTER TABLE "markers" DROP CONSTRAINT "FK_2730e0accf69e845190b1a5c4b9"`);
        await queryRunner.query(`ALTER TABLE "markers" DROP CONSTRAINT "FK_81087b8a98d05f869361a49d064"`);
        await queryRunner.query(`DROP TABLE "tokens"`);
        await queryRunner.query(`DROP TABLE "custom-field-types"`);
        await queryRunner.query(`DROP TABLE "custom_fields"`);
        await queryRunner.query(`DROP TABLE "layers"`);
        await queryRunner.query(`DROP TYPE "public"."layers_type_enum"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "files"`);
        await queryRunner.query(`DROP TABLE "markers"`);
    }

}
