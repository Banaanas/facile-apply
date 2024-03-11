/*
  Warnings:

  - Added the required column `status` to the `IndeedJob` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `createDate` on the `IndeedJob` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "JobStatus" AS ENUM ('NotReviewed', 'Applied', 'Ignored');

-- AlterTable
ALTER TABLE "IndeedJob" ADD COLUMN     "status" "JobStatus" NOT NULL,
DROP COLUMN "createDate",
ADD COLUMN     "createDate" TIMESTAMP(3) NOT NULL;
