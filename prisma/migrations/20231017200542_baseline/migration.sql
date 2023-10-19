-- CreateEnum
CREATE TYPE "SchemaElementType" AS ENUM ('STR', 'INT', 'FLOAT', 'BOOL');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(64) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" SERIAL NOT NULL,
    "key" VARCHAR(64) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "userId" INTEGER NOT NULL,
    "css" JSONB NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectSchema" (
    "id" SERIAL NOT NULL,
    "projectId" INTEGER NOT NULL,

    CONSTRAINT "ProjectSchema_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectSchemaElements" (
    "id" SERIAL NOT NULL,
    "schemaId" INTEGER NOT NULL,
    "elemKey" VARCHAR(64) NOT NULL,
    "elemType" "SchemaElementType" NOT NULL,
    "default" TEXT NOT NULL,
    "comment" VARCHAR(255) NOT NULL,

    CONSTRAINT "ProjectSchemaElements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Achivement" (
    "id" SERIAL NOT NULL,
    "projectId" INTEGER NOT NULL,
    "title" VARCHAR(64) NOT NULL,
    "desc" VARCHAR(255),
    "imgPath" TEXT,
    "imgSize" INTEGER,

    CONSTRAINT "Achivement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AchivementCondition" (
    "id" SERIAL NOT NULL,
    "achivementId" INTEGER NOT NULL,
    "condition" JSONB NOT NULL,
    "projectSchemaId" INTEGER NOT NULL,

    CONSTRAINT "AchivementCondition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Stats" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "projectId" INTEGER NOT NULL,
    "foreignId" INTEGER NOT NULL,
    "achivementId" INTEGER NOT NULL,

    CONSTRAINT "Stats_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Project_title_key" ON "Project"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Achivement_projectId_key" ON "Achivement"("projectId");

-- CreateIndex
CREATE UNIQUE INDEX "Achivement_title_key" ON "Achivement"("title");

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectSchema" ADD CONSTRAINT "ProjectSchema_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectSchemaElements" ADD CONSTRAINT "ProjectSchemaElements_schemaId_fkey" FOREIGN KEY ("schemaId") REFERENCES "ProjectSchema"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Achivement" ADD CONSTRAINT "Achivement_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AchivementCondition" ADD CONSTRAINT "AchivementCondition_achivementId_fkey" FOREIGN KEY ("achivementId") REFERENCES "Achivement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AchivementCondition" ADD CONSTRAINT "AchivementCondition_projectSchemaId_fkey" FOREIGN KEY ("projectSchemaId") REFERENCES "ProjectSchema"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stats" ADD CONSTRAINT "Stats_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stats" ADD CONSTRAINT "Stats_achivementId_fkey" FOREIGN KEY ("achivementId") REFERENCES "Achivement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
