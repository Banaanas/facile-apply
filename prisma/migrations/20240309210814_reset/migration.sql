/*
  Warnings:

  - You are about to drop the column `viewJobLink` on the `IndeedJob` table. All the data in the column will be lost.
  - Added the required column `link` to the `IndeedJob` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "IndeedJob" DROP COLUMN "viewJobLink",
ADD COLUMN     "link" TEXT NOT NULL;
