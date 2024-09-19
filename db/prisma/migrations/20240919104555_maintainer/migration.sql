/*
  Warnings:

  - You are about to drop the column `maintainer` on the `ProjectGroup` table. All the data in the column will be lost.
  - Added the required column `maintainerId` to the `ProjectGroup` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProjectGroup" DROP COLUMN "maintainer",
ADD COLUMN     "maintainerId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "ProjectGroup" ADD CONSTRAINT "ProjectGroup_maintainerId_fkey" FOREIGN KEY ("maintainerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
