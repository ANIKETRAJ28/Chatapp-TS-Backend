/*
  Warnings:

  - Made the column `description` on table `Community` required. This step will fail if there are existing NULL values in that column.
  - Made the column `avatar` on table `Community` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `isDeleted` on table `UserCommunity` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Community" ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "avatar" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "name" SET NOT NULL;

-- AlterTable
ALTER TABLE "UserCommunity" ALTER COLUMN "isDeleted" SET NOT NULL;
