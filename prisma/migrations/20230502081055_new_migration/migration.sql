/*
  Warnings:

  - You are about to drop the `Faculty` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "group" DROP CONSTRAINT "group_facultyId_fkey";

-- DropTable
DROP TABLE "Faculty";

-- CreateTable
CREATE TABLE "faculty" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "shortName" VARCHAR(125) NOT NULL,

    CONSTRAINT "faculty_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "group" ADD CONSTRAINT "group_facultyId_fkey" FOREIGN KEY ("facultyId") REFERENCES "faculty"("id") ON DELETE SET NULL ON UPDATE CASCADE;
