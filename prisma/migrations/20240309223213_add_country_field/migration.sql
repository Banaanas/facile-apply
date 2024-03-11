/*
  Warnings:

  - Added the required column `country` to the `IndeedJob` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "CountryCode" AS ENUM ('CA', 'CH', 'FR', 'US');

-- AlterTable
ALTER TABLE "IndeedJob" ADD COLUMN     "country" "CountryCode" NOT NULL;
