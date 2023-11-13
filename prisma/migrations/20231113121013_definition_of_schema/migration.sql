/*
  Warnings:

  - You are about to drop the `ProjectSchemaElements` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `definition` to the `ProjectSchema` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ProjectSchemaElements" DROP CONSTRAINT "ProjectSchemaElements_schemaId_fkey";

-- AlterTable
ALTER TABLE "ProjectSchema" ADD COLUMN     "definition" JSONB NOT NULL;

-- DropTable
DROP TABLE "ProjectSchemaElements";

-- DropEnum
DROP TYPE "SchemaElementType";
