/*
  Warnings:

  - You are about to drop the column `comminityId` on the `Message` table. All the data in the column will be lost.
  - Added the required column `communityId` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_comminityId_fkey";

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "comminityId",
ADD COLUMN     "communityId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_communityId_fkey" FOREIGN KEY ("communityId") REFERENCES "Community"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
