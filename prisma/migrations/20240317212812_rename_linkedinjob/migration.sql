/*
  Warnings:

  - You are about to drop the `LinkedInJob` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "LinkedInJob";

-- CreateTable
CREATE TABLE "LinkedinJob" (
    "id" SERIAL NOT NULL,
    "company" TEXT NOT NULL,
    "createDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "easyApply" BOOLEAN NOT NULL,
    "jobUrn" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "status" "JobStatus" NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "LinkedinJob_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LinkedinJob_jobUrn_key" ON "LinkedinJob"("jobUrn");
