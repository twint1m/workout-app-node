/*
  Warnings:

  - The `weight` column on the `Exercise_time` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `repeat` column on the `Exercise_time` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Exercise_time" DROP COLUMN "weight",
ADD COLUMN     "weight" INTEGER NOT NULL DEFAULT 0,
DROP COLUMN "repeat",
ADD COLUMN     "repeat" INTEGER NOT NULL DEFAULT 0;
