/*
  Warnings:

  - Added the required column `repoUrl` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `setupInstructions` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `technologies` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "repoUrl" TEXT NOT NULL,
ADD COLUMN     "setupInstructions" TEXT NOT NULL,
ADD COLUMN     "technologies" TEXT NOT NULL;
