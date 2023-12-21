/*
  Warnings:

  - You are about to drop the `Achievement` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AchievementCondition` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProjectSchema` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Stats` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Achievement" DROP CONSTRAINT "Achievement_projectId_fkey";

-- DropForeignKey
ALTER TABLE "AchievementCondition" DROP CONSTRAINT "AchievementCondition_achivementId_fkey";

-- DropForeignKey
ALTER TABLE "AchievementCondition" DROP CONSTRAINT "AchievementCondition_projectSchemaId_fkey";

-- DropForeignKey
ALTER TABLE "ProjectSchema" DROP CONSTRAINT "ProjectSchema_projectId_fkey";

-- DropForeignKey
ALTER TABLE "Stats" DROP CONSTRAINT "Stats_achivementId_fkey";

-- DropForeignKey
ALTER TABLE "Stats" DROP CONSTRAINT "Stats_projectId_fkey";

-- DropIndex
DROP INDEX "Project_title_key";

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "schema" JSONB,
ADD COLUMN     "updatedAt" TIMESTAMP(3),
ALTER COLUMN "css" DROP NOT NULL;

-- DropTable
DROP TABLE "Achievement";

-- DropTable
DROP TABLE "AchievementCondition";

-- DropTable
DROP TABLE "ProjectSchema";

-- DropTable
DROP TABLE "Stats";
