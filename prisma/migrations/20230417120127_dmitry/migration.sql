/*
  Warnings:

  - You are about to drop the column `studyPlanItem` on the `criteria-evaluation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "criteria-evaluation" DROP COLUMN "studyPlanItem",
ADD COLUMN     "studyPlanItemId" UUID;

-- AddForeignKey
ALTER TABLE "criteria-evaluation" ADD CONSTRAINT "criteria-evaluation_studyPlanItemId_fkey" FOREIGN KEY ("studyPlanItemId") REFERENCES "study-plan"("id") ON DELETE SET NULL ON UPDATE CASCADE;
