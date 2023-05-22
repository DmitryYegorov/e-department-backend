-- DropForeignKey
ALTER TABLE "StudyPlanGroupStatistics" DROP CONSTRAINT "StudyPlanGroupStatistics_groupStatisticsId_fkey";

-- DropForeignKey
ALTER TABLE "StudyPlanGroupStatistics" DROP CONSTRAINT "StudyPlanGroupStatistics_studyPlanId_fkey";

-- DropForeignKey
ALTER TABLE "criteria-evaluation" DROP CONSTRAINT "criteria-evaluation_studyPlanItemId_fkey";

-- DropForeignKey
ALTER TABLE "group-statistics" DROP CONSTRAINT "group-statistics_classId_fkey";

-- DropForeignKey
ALTER TABLE "group-statistics" DROP CONSTRAINT "group-statistics_createdBy_fkey";

-- DropForeignKey
ALTER TABLE "student-grades-group_statistics" DROP CONSTRAINT "student-grades-group_statistics_groupStatisticsId_fkey";

-- AddForeignKey
ALTER TABLE "criteria-evaluation" ADD CONSTRAINT "criteria-evaluation_studyPlanItemId_fkey" FOREIGN KEY ("studyPlanItemId") REFERENCES "study-plan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "group-statistics" ADD CONSTRAINT "group-statistics_classId_fkey" FOREIGN KEY ("classId") REFERENCES "classes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "group-statistics" ADD CONSTRAINT "group-statistics_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student-grades-group_statistics" ADD CONSTRAINT "student-grades-group_statistics_groupStatisticsId_fkey" FOREIGN KEY ("groupStatisticsId") REFERENCES "group-statistics"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudyPlanGroupStatistics" ADD CONSTRAINT "StudyPlanGroupStatistics_groupStatisticsId_fkey" FOREIGN KEY ("groupStatisticsId") REFERENCES "group-statistics"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudyPlanGroupStatistics" ADD CONSTRAINT "StudyPlanGroupStatistics_studyPlanId_fkey" FOREIGN KEY ("studyPlanId") REFERENCES "study-plan"("id") ON DELETE CASCADE ON UPDATE CASCADE;
