-- AddForeignKey
ALTER TABLE "StudyPlanGroupStatistics" ADD CONSTRAINT "StudyPlanGroupStatistics_studyPlanId_fkey" FOREIGN KEY ("studyPlanId") REFERENCES "study-plan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
