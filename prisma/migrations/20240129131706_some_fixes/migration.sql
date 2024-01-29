/*
  Warnings:

  - You are about to drop the column `exercise_log_id` on the `Exercise_log` table. All the data in the column will be lost.
  - You are about to drop the column `exercise_log_id` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Exercise_log" DROP CONSTRAINT "Exercise_log_exercise_log_id_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_exercise_log_id_fkey";

-- AlterTable
ALTER TABLE "Exercise_log" DROP COLUMN "exercise_log_id",
ADD COLUMN     "user_id" INTEGER,
ADD COLUMN     "workout_log_id" INTEGER;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "exercise_log_id";

-- AddForeignKey
ALTER TABLE "Exercise_log" ADD CONSTRAINT "Exercise_log_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exercise_log" ADD CONSTRAINT "Exercise_log_workout_log_id_fkey" FOREIGN KEY ("workout_log_id") REFERENCES "Workout_log"("id") ON DELETE SET NULL ON UPDATE CASCADE;
