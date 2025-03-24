-- CreateEnum
CREATE TYPE "UserAccessLevel" AS ENUM ('USER', 'ADMIN', 'STUDENT', 'THERAPIST');

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "userAccessLevel" "UserAccessLevel" NOT NULL DEFAULT 'USER';
