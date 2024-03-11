/*
  Warnings:

  - Changed the type of `createDate` on the `IndeedJob` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "IndeedJob" DROP COLUMN "createDate",
ADD COLUMN     "createDate" BIGINT NOT NULL;
