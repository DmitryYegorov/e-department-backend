-- AlterTable
ALTER TABLE "group" ADD COLUMN     "facultyId" UUID;

-- CreateTable
CREATE TABLE "Faculty" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "shortName" VARCHAR(125) NOT NULL,

    CONSTRAINT "Faculty_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "group" ADD CONSTRAINT "group_facultyId_fkey" FOREIGN KEY ("facultyId") REFERENCES "Faculty"("id") ON DELETE SET NULL ON UPDATE CASCADE;
