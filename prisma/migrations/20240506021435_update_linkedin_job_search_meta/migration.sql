/*
  Warnings:

  - You are about to drop the column `domain` on the `LinkedinJobSearchMeta` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[geoId,query]` on the table `LinkedinJobSearchMeta` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `geoId` to the `LinkedinJobSearchMeta` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "LinkedinJobSearchMeta_domain_query_key";

-- AlterTable
ALTER TABLE "LinkedinJobSearchMeta" DROP COLUMN "domain",
ADD COLUMN     "geoId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "LinkedinJobSearchMeta_geoId_query_key" ON "LinkedinJobSearchMeta"("geoId", "query");
