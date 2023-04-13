-- AlterTable
ALTER TABLE "group" ADD COLUMN     "description" VARCHAR(255),
ADD COLUMN     "subGroup" INTEGER NOT NULL DEFAULT 1;
