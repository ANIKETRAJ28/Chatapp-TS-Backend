-- DropIndex
DROP INDEX "Community_name_key";

-- AlterTable
ALTER TABLE "Community" ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "avatar" DROP NOT NULL;

-- AlterTable
ALTER TABLE "UserCommunity" ALTER COLUMN "isAdmin" DROP NOT NULL,
ALTER COLUMN "isAdmin" DROP DEFAULT,
ALTER COLUMN "isSuperAdmin" DROP NOT NULL,
ALTER COLUMN "isSuperAdmin" DROP DEFAULT;
