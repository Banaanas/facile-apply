-- CreateTable
CREATE TABLE "IndeedJob" (
    "id" SERIAL NOT NULL,
    "createDate" INTEGER NOT NULL,
    "company" TEXT NOT NULL,
    "indeedApplyEnabled" BOOLEAN NOT NULL,
    "jobkey" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "viewJobLink" TEXT NOT NULL,

    CONSTRAINT "IndeedJob_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "IndeedJob_jobkey_key" ON "IndeedJob"("jobkey");
