/*
  Warnings:

  - You are about to drop the column `teacherId` on the `group` table. All the data in the column will be lost.
  - Added the required column `teacherId` to the `classes` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `subjectId` on the `classes` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `createdBy` to the `group` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "group" DROP CONSTRAINT "group_teacherId_fkey";

-- AlterTable
ALTER TABLE "classes" ADD COLUMN     "teacherId" UUID NOT NULL,
DROP COLUMN "subjectId",
ADD COLUMN     "subjectId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "group" DROP COLUMN "teacherId",
ADD COLUMN     "course" INTEGER,
ADD COLUMN     "createdBy" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "group" ADD CONSTRAINT "group_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "classes" ADD CONSTRAINT "classes_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "classes" ADD CONSTRAINT "classes_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "classes" ADD CONSTRAINT "classes_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
