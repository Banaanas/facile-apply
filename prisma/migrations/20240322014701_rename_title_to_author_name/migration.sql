/*
  Warnings:

  - You are about to drop the column `title` on the `LinkedinPost` table. All the data in the column will be lost.
  - Added the required column `authorName` to the `LinkedinPost` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "LinkedinPost" RENAME COLUMN "title" TO "authorName";

