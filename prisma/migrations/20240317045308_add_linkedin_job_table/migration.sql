-- CreateTable
CREATE TABLE "LinkedInJob" (
    "id" SERIAL NOT NULL,
    "company" TEXT NOT NULL,
    "createDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "easyApply" BOOLEAN NOT NULL,
    "jobUrn" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "status" "JobStatus" NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "LinkedInJob_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LinkedInJob_jobUrn_key" ON "LinkedInJob"("jobUrn");
