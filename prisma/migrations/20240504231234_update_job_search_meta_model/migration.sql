/*
  Warnings:

  - You are about to drop the column `searchType` on the `JobSearchMeta` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[jobSearchPlatform]` on the table `JobSearchMeta` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `jobSearchPlatform` to the `JobSearchMeta` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "JobSearchPlatform" AS ENUM ('Indeed', 'Linkedin');

-- DropIndex
DROP INDEX "JobSearchMeta_searchType_key";

-- AlterTable
ALTER TABLE "JobSearchMeta" DROP COLUMN "searchType",
ADD COLUMN     "jobSearchPlatform" "JobSearchPlatform" NOT NULL;

-- DropEnum
DROP TYPE "SearchType";

-- CreateIndex
CREATE UNIQUE INDEX "JobSearchMeta_jobSearchPlatform_key" ON "JobSearchMeta"("jobSearchPlatform");
