-- CreateTable
CREATE TABLE "group-statistics" (
    "id" UUID NOT NULL,
    "classId" UUID NOT NULL,
    "comment" VARCHAR(512),
    "createdBy" UUID NOT NULL,

    CONSTRAINT "group-statistics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "student-grades-group_statistics" (
    "id" UUID NOT NULL,
    "groupStatisticsId" UUID NOT NULL,
    "studentId" UUID NOT NULL,
    "summaryGrade" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "student-grades-group_statistics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudyPlanGroupStatistics" (
    "id" UUID NOT NULL,
    "groupStatisticsId" UUID NOT NULL,
    "studyPlanId" UUID NOT NULL,

    CONSTRAINT "StudyPlanGroupStatistics_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "group-statistics" ADD CONSTRAINT "group-statistics_classId_fkey" FOREIGN KEY ("classId") REFERENCES "classes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "group-statistics" ADD CONSTRAINT "group-statistics_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student-grades-group_statistics" ADD CONSTRAINT "student-grades-group_statistics_groupStatisticsId_fkey" FOREIGN KEY ("groupStatisticsId") REFERENCES "group-statistics"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudyPlanGroupStatistics" ADD CONSTRAINT "StudyPlanGroupStatistics_groupStatisticsId_fkey" FOREIGN KEY ("groupStatisticsId") REFERENCES "group-statistics"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
