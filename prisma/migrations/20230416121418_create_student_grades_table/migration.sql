-- CreateTable
CREATE TABLE "student-grades" (
    "id" UUID NOT NULL,
    "studentId" UUID NOT NULL,
    "criteriaEvalutationId" UUID NOT NULL,
    "value" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "createdBy" UUID NOT NULL,

    CONSTRAINT "student-grades_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "student-grades" ADD CONSTRAINT "student-grades_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student-grades" ADD CONSTRAINT "student-grades_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student-grades" ADD CONSTRAINT "student-grades_criteriaEvalutationId_fkey" FOREIGN KEY ("criteriaEvalutationId") REFERENCES "criteria-evaluation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
