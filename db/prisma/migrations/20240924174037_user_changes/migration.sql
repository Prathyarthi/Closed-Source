/*
  Warnings:

  - You are about to drop the column `firstName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `userName` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "User_userName_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "firstName",
DROP COLUMN "lastName",
DROP COLUMN "userName",
ADD COLUMN     "image" TEXT,
ADD COLUMN     "name" TEXT;
