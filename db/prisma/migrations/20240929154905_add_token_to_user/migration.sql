-- AlterTable
ALTER TABLE "User" ADD COLUMN     "token" TEXT,
ALTER COLUMN "email" DROP NOT NULL;
