/*
  Warnings:

  - You are about to drop the column `institution` on the `user` table. All the data in the column will be lost.

*/
-- AlterEnum
ALTER TYPE "UserAccessLevel" ADD VALUE 'DOCTOR';

-- AlterTable
ALTER TABLE "user" DROP COLUMN "institution",
ADD COLUMN     "institutionId" TEXT;

-- CreateTable
CREATE TABLE "Institution" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT,
    "country" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Institution_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_institutionId_fkey" FOREIGN KEY ("institutionId") REFERENCES "Institution"("id") ON DELETE SET NULL ON UPDATE CASCADE;
