/*
  Warnings:

  - The values [CITIZEN] on the enum `NPCType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `marketPlaceId` on the `horse` table. All the data in the column will be lost.
  - You are about to drop the column `lastShardCount` on the `player` table. All the data in the column will be lost.
  - You are about to drop the `marketPlace` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `statistics` table. If the table is not empty, all the data it contains will be lost.
  - Changed the type of `itemType` on the `item` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "ItemType" AS ENUM ('EQUIPMENT', 'CONSUMABLE', 'MATERIAL', 'DEFAULT');

-- CreateEnum
CREATE TYPE "MarketItemType" AS ENUM ('DEFAULT', 'HORSE');

-- CreateEnum
CREATE TYPE "MarketItemStatus" AS ENUM ('LISTING', 'EXPIRED', 'SOLD', 'CANCELLED');

-- AlterEnum
BEGIN;
CREATE TYPE "NPCType_new" AS ENUM ('BLACKSMITH', 'SHOP_KEEPER', 'HORSE_KEEPER', 'TRADER', 'GENERIC');
ALTER TABLE "npc" ALTER COLUMN "type" TYPE "NPCType_new" USING ("type"::text::"NPCType_new");
ALTER TYPE "NPCType" RENAME TO "NPCType_old";
ALTER TYPE "NPCType_new" RENAME TO "NPCType";
DROP TYPE "NPCType_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "marketPlace" DROP CONSTRAINT "marketPlace_buyerId_fkey";

-- DropForeignKey
ALTER TABLE "marketPlace" DROP CONSTRAINT "marketPlace_horseId_fkey";

-- DropForeignKey
ALTER TABLE "marketPlace" DROP CONSTRAINT "marketPlace_itemId_fkey";

-- DropForeignKey
ALTER TABLE "marketPlace" DROP CONSTRAINT "marketPlace_playerUuid_fkey";

-- DropForeignKey
ALTER TABLE "marketPlace" DROP CONSTRAINT "marketPlace_sellerId_fkey";

-- DropForeignKey
ALTER TABLE "statistics" DROP CONSTRAINT "statistics_player_id_fkey";

-- AlterTable
ALTER TABLE "horse" DROP COLUMN "marketPlaceId",
ADD COLUMN     "marketplaceId" TEXT;

-- AlterTable
ALTER TABLE "item" DROP COLUMN "itemType",
ADD COLUMN     "itemType" "ItemType" NOT NULL;

-- AlterTable
ALTER TABLE "player" DROP COLUMN "lastShardCount";

-- DropTable
DROP TABLE "marketPlace";

-- DropTable
DROP TABLE "statistics";

-- DropEnum
DROP TYPE "item_type";

-- DropEnum
DROP TYPE "marketItemStatus";

-- DropEnum
DROP TYPE "marketItemType";

-- CreateTable
CREATE TABLE "player_stats" (
    "id" TEXT NOT NULL,
    "player_id" TEXT NOT NULL,
    "mob_kills" INTEGER NOT NULL DEFAULT 0,
    "player_kills" INTEGER NOT NULL DEFAULT 0,
    "deaths" INTEGER NOT NULL DEFAULT 0,
    "boss_kills" INTEGER NOT NULL DEFAULT 0,
    "time_played" INTEGER NOT NULL DEFAULT 0,
    "travel_distance" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "lastShardCount" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "player_stats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "marketplace" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "itemId" TEXT,
    "horseId" TEXT,
    "status" "MarketItemStatus" NOT NULL DEFAULT 'LISTING',
    "type" "MarketItemType" NOT NULL DEFAULT 'DEFAULT',
    "sellerId" TEXT NOT NULL,
    "buyerId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "playerUuid" TEXT,

    CONSTRAINT "marketplace_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mob" (
    "id" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "entityClass" TEXT NOT NULL,
    "level" INTEGER NOT NULL,
    "prefixes" TEXT[],
    "suffixes" TEXT[],
    "exp" DOUBLE PRECISION NOT NULL,
    "maxHP" DOUBLE PRECISION NOT NULL,
    "damage" DOUBLE PRECISION NOT NULL,
    "damageRange" DOUBLE PRECISION NOT NULL,
    "attributes" TEXT[],
    "spells" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "mob_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mob_equip" (
    "id" TEXT NOT NULL,
    "mobId" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "enchant" BOOLEAN NOT NULL DEFAULT false,
    "owner" TEXT,

    CONSTRAINT "mob_equip_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mob_drop" (
    "id" TEXT NOT NULL,
    "mobId" TEXT NOT NULL,
    "item" TEXT NOT NULL,
    "amountMin" INTEGER NOT NULL,
    "amountMax" INTEGER NOT NULL,
    "chance" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "mob_drop_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "player_stats_player_id_key" ON "player_stats"("player_id");

-- CreateIndex
CREATE UNIQUE INDEX "marketplace_description_key" ON "marketplace"("description");

-- CreateIndex
CREATE UNIQUE INDEX "marketplace_itemId_key" ON "marketplace"("itemId");

-- CreateIndex
CREATE UNIQUE INDEX "marketplace_horseId_key" ON "marketplace"("horseId");

-- CreateIndex
CREATE INDEX "marketplace_sellerId_idx" ON "marketplace"("sellerId");

-- CreateIndex
CREATE INDEX "marketplace_buyerId_idx" ON "marketplace"("buyerId");

-- CreateIndex
CREATE INDEX "marketplace_itemId_idx" ON "marketplace"("itemId");

-- CreateIndex
CREATE INDEX "marketplace_horseId_idx" ON "marketplace"("horseId");

-- CreateIndex
CREATE UNIQUE INDEX "mob_identifier_key" ON "mob"("identifier");

-- CreateIndex
CREATE UNIQUE INDEX "mob_equip_mobId_key_key" ON "mob_equip"("mobId", "key");

-- AddForeignKey
ALTER TABLE "player_stats" ADD CONSTRAINT "player_stats_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "player"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "marketplace" ADD CONSTRAINT "marketplace_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "player"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "marketplace" ADD CONSTRAINT "marketplace_buyerId_fkey" FOREIGN KEY ("buyerId") REFERENCES "player"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "marketplace" ADD CONSTRAINT "marketplace_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "item"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "marketplace" ADD CONSTRAINT "marketplace_horseId_fkey" FOREIGN KEY ("horseId") REFERENCES "horse"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "marketplace" ADD CONSTRAINT "marketplace_playerUuid_fkey" FOREIGN KEY ("playerUuid") REFERENCES "player"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mob_equip" ADD CONSTRAINT "mob_equip_mobId_fkey" FOREIGN KEY ("mobId") REFERENCES "mob"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mob_drop" ADD CONSTRAINT "mob_drop_mobId_fkey" FOREIGN KEY ("mobId") REFERENCES "mob"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
