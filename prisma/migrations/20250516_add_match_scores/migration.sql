-- Add team scores and match timing fields to the Match model
ALTER TABLE "Match" ADD COLUMN "teamOneScore" FLOAT;
ALTER TABLE "Match" ADD COLUMN "teamTwoScore" FLOAT;
ALTER TABLE "Match" ADD COLUMN "duration" INTEGER NOT NULL DEFAULT 60;
ALTER TABLE "Match" ADD COLUMN "startTime" TIMESTAMP(3);
ALTER TABLE "Match" ADD COLUMN "endTime" TIMESTAMP(3);
