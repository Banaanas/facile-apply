/*
  Warnings:

  - A unique constraint covering the columns `[domain,query,location,remoteFilter]` on the table `IndeedJobSearchMeta` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "IndeedJobSearchMeta" ADD COLUMN     "location" TEXT,
ADD COLUMN     "remoteFilter" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "IndeedJobSearchMeta_domain_query_location_remoteFilter_key" ON "IndeedJobSearchMeta"("domain", "query", "location", "remoteFilter");
