/*
  Warnings:

  - You are about to drop the column `isShated` on the `group` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "group" DROP COLUMN "isShated",
ADD COLUMN     "isShared" BOOLEAN NOT NULL DEFAULT false;
