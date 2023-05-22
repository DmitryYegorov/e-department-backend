-- AlterTable
ALTER TABLE "group-statistics" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "title" VARCHAR(255) NOT NULL DEFAULT 'Новая статистика';
