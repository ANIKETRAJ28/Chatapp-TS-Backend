/*
  Warnings:

  - Made the column `isAdmin` on table `UserCommunity` required. This step will fail if there are existing NULL values in that column.
  - Made the column `isSuperAdmin` on table `UserCommunity` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "UserCommunity" ALTER COLUMN "isAdmin" SET NOT NULL,
ALTER COLUMN "isSuperAdmin" SET NOT NULL;
