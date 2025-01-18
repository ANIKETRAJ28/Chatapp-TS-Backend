/*
  Warnings:

  - You are about to drop the `CommunityMessage` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CommunityMessage" DROP CONSTRAINT "CommunityMessage_communityId_fkey";

-- DropForeignKey
ALTER TABLE "CommunityMessage" DROP CONSTRAINT "CommunityMessage_messageId_fkey";

-- DropTable
DROP TABLE "CommunityMessage";
