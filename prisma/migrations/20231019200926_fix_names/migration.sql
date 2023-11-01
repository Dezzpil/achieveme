/*
  Warnings:

  - You are about to drop the `Achivement` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AchivementCondition` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Achivement" DROP CONSTRAINT "Achivement_projectId_fkey";

-- DropForeignKey
ALTER TABLE "AchivementCondition" DROP CONSTRAINT "AchivementCondition_achivementId_fkey";

-- DropForeignKey
ALTER TABLE "AchivementCondition" DROP CONSTRAINT "AchivementCondition_projectSchemaId_fkey";

-- DropForeignKey
ALTER TABLE "Stats" DROP CONSTRAINT "Stats_achivementId_fkey";

-- DropTable
DROP TABLE "Achivement";

-- DropTable
DROP TABLE "AchivementCondition";

-- CreateTable
CREATE TABLE "Achievement" (
    "id" SERIAL NOT NULL,
    "projectId" INTEGER NOT NULL,
    "title" VARCHAR(64) NOT NULL,
    "desc" VARCHAR(255),
    "imgPath" TEXT,
    "imgSize" INTEGER,

    CONSTRAINT "Achievement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AchievementCondition" (
    "id" SERIAL NOT NULL,
    "achivementId" INTEGER NOT NULL,
    "condition" JSONB NOT NULL,
    "projectSchemaId" INTEGER NOT NULL,

    CONSTRAINT "AchievementCondition_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Achievement_projectId_key" ON "Achievement"("projectId");

-- CreateIndex
CREATE UNIQUE INDEX "Achievement_title_key" ON "Achievement"("title");

-- AddForeignKey
ALTER TABLE "Achievement" ADD CONSTRAINT "Achievement_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AchievementCondition" ADD CONSTRAINT "AchievementCondition_achivementId_fkey" FOREIGN KEY ("achivementId") REFERENCES "Achievement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AchievementCondition" ADD CONSTRAINT "AchievementCondition_projectSchemaId_fkey" FOREIGN KEY ("projectSchemaId") REFERENCES "ProjectSchema"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stats" ADD CONSTRAINT "Stats_achivementId_fkey" FOREIGN KEY ("achivementId") REFERENCES "Achievement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
