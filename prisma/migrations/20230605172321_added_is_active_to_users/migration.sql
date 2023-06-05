-- DropForeignKey
ALTER TABLE "criteria-evaluation" DROP CONSTRAINT "criteria-evaluation_createdBy_fkey";

-- DropForeignKey
ALTER TABLE "study-plan" DROP CONSTRAINT "study-plan_createdBy_fkey";

-- DropForeignKey
ALTER TABLE "study-plan" DROP CONSTRAINT "study-plan_subjectId_fkey";

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;

-- AddForeignKey
ALTER TABLE "study-plan" ADD CONSTRAINT "study-plan_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "study-plan" ADD CONSTRAINT "study-plan_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "criteria-evaluation" ADD CONSTRAINT "criteria-evaluation_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
