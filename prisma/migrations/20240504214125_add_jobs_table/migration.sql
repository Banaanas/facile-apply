-- CreateEnum
CREATE TYPE "SearchType" AS ENUM ('Indeed', 'LinkedIn');

-- CreateTable
CREATE TABLE "JobSearchMeta" (
    "id" SERIAL NOT NULL,
    "searchType" "SearchType" NOT NULL,
    "lastSearchAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "JobSearchMeta_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "JobSearchMeta_searchType_key" ON "JobSearchMeta"("searchType");
