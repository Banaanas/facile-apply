/*
  Warnings:

  - Added the required column `status` to the `LinkedinPost` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PostStatus" AS ENUM ('Applied', 'Ignored', 'NotReviewed');

-- AlterTable
ALTER TABLE "LinkedinPost" ADD COLUMN "status" "PostStatus" NOT NULL DEFAULT 'NotReviewed';
