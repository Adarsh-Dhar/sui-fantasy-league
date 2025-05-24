-- AlterTable
ALTER TABLE "Match" ADD COLUMN     "loserShareClaimed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "winnerShareClaimed" BOOLEAN NOT NULL DEFAULT false;
