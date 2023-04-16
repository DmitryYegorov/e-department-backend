-- CreateTable
CREATE TABLE "study-plan" (
    "id" UUID NOT NULL,
    "subjectId" UUID NOT NULL,
    "topic" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255),
    "order" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" UUID NOT NULL,

    CONSTRAINT "study-plan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "criteria-evaluation" (
    "id" UUID NOT NULL,
    "studyPlanItem" UUID,
    "name" VARCHAR(255) NOT NULL,
    "coefficient" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" UUID NOT NULL,

    CONSTRAINT "criteria-evaluation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "study-plan" ADD CONSTRAINT "study-plan_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "study-plan" ADD CONSTRAINT "study-plan_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "criteria-evaluation" ADD CONSTRAINT "criteria-evaluation_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
