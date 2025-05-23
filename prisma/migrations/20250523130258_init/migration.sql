-- CreateEnum
CREATE TYPE "MatchStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "MatchType" AS ENUM ('RANDOM', 'FRIEND');

-- CreateEnum
CREATE TYPE "MatchResult" AS ENUM ('PLAYER_ONE_WIN', 'PLAYER_TWO_WIN', 'DRAW');

-- CreateTable
CREATE TABLE "Player" (
    "id" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "wins" INTEGER NOT NULL DEFAULT 0,
    "losses" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Team" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "tokens" TEXT[],
    "playerId" TEXT NOT NULL,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Match" (
    "id" TEXT NOT NULL,
    "status" "MatchStatus" NOT NULL DEFAULT 'PENDING',
    "type" "MatchType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "playerOneId" TEXT NOT NULL,
    "playerTwoId" TEXT,
    "teamOneId" TEXT NOT NULL,
    "teamTwoId" TEXT,
    "teamOneScore" DOUBLE PRECISION,
    "teamTwoScore" DOUBLE PRECISION,
    "teamOneGain" DOUBLE PRECISION,
    "teamTwoGain" DOUBLE PRECISION,
    "winnerShare" DOUBLE PRECISION,
    "loserShare" DOUBLE PRECISION,
    "winnerId" TEXT,
    "result" "MatchResult",
    "duration" INTEGER NOT NULL DEFAULT 60,
    "price" INTEGER NOT NULL DEFAULT 1,
    "vaultId" TEXT,
    "vaultOwnerCap" TEXT,
    "startTime" TIMESTAMP(3),
    "endTime" TIMESTAMP(3),

    CONSTRAINT "Match_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Player_address_key" ON "Player"("address");

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_playerOneId_fkey" FOREIGN KEY ("playerOneId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_playerTwoId_fkey" FOREIGN KEY ("playerTwoId") REFERENCES "Player"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_teamOneId_fkey" FOREIGN KEY ("teamOneId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_teamTwoId_fkey" FOREIGN KEY ("teamTwoId") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;
