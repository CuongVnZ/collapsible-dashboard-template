-- CreateEnum
CREATE TYPE "ClassType" AS ENUM ('VILLAGER', 'WARRIOR', 'MAGE', 'ROGUE');

-- CreateEnum
CREATE TYPE "Rank" AS ENUM ('MEMBER', 'MODERATOR', 'ADMIN');

-- CreateEnum
CREATE TYPE "Gamemode" AS ENUM ('ADVENTURE', 'SURVIVAL', 'CREATIVE');

-- CreateEnum
CREATE TYPE "item_type" AS ENUM ('EQUIPMENT', 'CONSUMABLE', 'MATERIAL', 'DEFAULT');

-- CreateEnum
CREATE TYPE "HorseArmor" AS ENUM ('LEATHER', 'IRON', 'GOLD');

-- CreateEnum
CREATE TYPE "marketItemType" AS ENUM ('DEFAULT', 'HORSE');

-- CreateEnum
CREATE TYPE "marketItemStatus" AS ENUM ('LISTING', 'EXPIRED', 'SOLD', 'CANCELLED');

-- CreateEnum
CREATE TYPE "NPCType" AS ENUM ('BLACKSMITH', 'SHOP_KEEPER', 'HORSE_KEEPER', 'CITIZEN');

-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdById" TEXT NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    "refresh_token_expires_in" INTEGER,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "player" (
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "classType" "ClassType" NOT NULL DEFAULT 'VILLAGER',
    "level" INTEGER NOT NULL DEFAULT 1,
    "exp" INTEGER NOT NULL DEFAULT 0,
    "rank" "Rank" NOT NULL DEFAULT 'MEMBER',
    "hp" INTEGER NOT NULL DEFAULT 100,
    "mana" INTEGER NOT NULL DEFAULT 20,
    "locationX" DOUBLE PRECISION NOT NULL,
    "locationY" DOUBLE PRECISION NOT NULL,
    "locationZ" DOUBLE PRECISION NOT NULL,
    "world" TEXT NOT NULL,
    "pearls" INTEGER NOT NULL DEFAULT 0,
    "rewardPoints" INTEGER NOT NULL DEFAULT 0,
    "gamemode" "Gamemode" NOT NULL DEFAULT 'ADVENTURE',
    "lastShardCount" INTEGER NOT NULL DEFAULT 0,
    "lastSeen" TIMESTAMP(3) NOT NULL,
    "guildId" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "player_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "player_inventory_item" (
    "playerId" TEXT NOT NULL,
    "slot" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "itemId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "item_storage" (
    "id" TEXT NOT NULL,
    "playerId" TEXT,
    "guildId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "item_storage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "item" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "itemType" "item_type" NOT NULL,

    CONSTRAINT "item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "skill" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "level" INTEGER NOT NULL DEFAULT 1,
    "exp" INTEGER NOT NULL DEFAULT 0,
    "playerId" TEXT NOT NULL,

    CONSTRAINT "skill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quest" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "progress" INTEGER NOT NULL DEFAULT 0,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "player_id" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "quest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "statistics" (
    "id" TEXT NOT NULL,
    "player_id" TEXT NOT NULL,
    "mob_kills" INTEGER NOT NULL DEFAULT 0,
    "player_kills" INTEGER NOT NULL DEFAULT 0,
    "deaths" INTEGER NOT NULL DEFAULT 0,
    "boss_kills" INTEGER NOT NULL DEFAULT 0,
    "time_played" INTEGER NOT NULL DEFAULT 0,
    "travel_distance" DOUBLE PRECISION NOT NULL DEFAULT 0,

    CONSTRAINT "statistics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "horse" (
    "id" TEXT NOT NULL,
    "playerId" TEXT NOT NULL,
    "speed" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "jump" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "isBaby" BOOLEAN NOT NULL DEFAULT false,
    "style" TEXT,
    "color" TEXT,
    "variant" TEXT,
    "armor" "HorseArmor",
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "marketPlaceId" TEXT,

    CONSTRAINT "horse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "guild" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "alias" TEXT,
    "level" INTEGER NOT NULL DEFAULT 1,
    "exp" INTEGER NOT NULL DEFAULT 0,
    "inventory" INTEGER NOT NULL DEFAULT 0,
    "leaderId" TEXT NOT NULL,
    "lastRenewTime" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "guild_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "punishment" (
    "id" TEXT NOT NULL,
    "playerId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "reason" TEXT,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "giver" TEXT NOT NULL,
    "cancelled" BOOLEAN NOT NULL DEFAULT false,
    "canceller" TEXT,
    "cancelTime" TIMESTAMP(3),

    CONSTRAINT "punishment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "marketPlace" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "itemId" TEXT,
    "horseId" TEXT,
    "status" "marketItemStatus" NOT NULL DEFAULT 'LISTING',
    "type" "marketItemType" NOT NULL DEFAULT 'DEFAULT',
    "sellerId" TEXT NOT NULL,
    "buyerId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "playerUuid" TEXT,

    CONSTRAINT "marketPlace_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "npc" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "locationX" DOUBLE PRECISION NOT NULL,
    "locationY" DOUBLE PRECISION NOT NULL,
    "locationZ" DOUBLE PRECISION NOT NULL,
    "world" TEXT NOT NULL,
    "type" "NPCType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "npc_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "spawn_point" (
    "id" TEXT NOT NULL,
    "locationX" DOUBLE PRECISION NOT NULL,
    "locationY" DOUBLE PRECISION NOT NULL,
    "locationZ" DOUBLE PRECISION NOT NULL,
    "world" TEXT NOT NULL,

    CONSTRAINT "spawn_point_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_itemToitem_storage" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE INDEX "Post_name_idx" ON "Post"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "player_name_key" ON "player"("name");

-- CreateIndex
CREATE INDEX "player_rank_idx" ON "player"("rank");

-- CreateIndex
CREATE UNIQUE INDEX "player_inventory_item_playerId_slot_key" ON "player_inventory_item"("playerId", "slot");

-- CreateIndex
CREATE UNIQUE INDEX "item_storage_playerId_key" ON "item_storage"("playerId");

-- CreateIndex
CREATE UNIQUE INDEX "item_storage_guildId_key" ON "item_storage"("guildId");

-- CreateIndex
CREATE UNIQUE INDEX "skill_playerId_name_key" ON "skill"("playerId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "quest_player_id_name_key" ON "quest"("player_id", "name");

-- CreateIndex
CREATE UNIQUE INDEX "statistics_player_id_key" ON "statistics"("player_id");

-- CreateIndex
CREATE UNIQUE INDEX "guild_name_key" ON "guild"("name");

-- CreateIndex
CREATE INDEX "punishment_playerId_type_idx" ON "punishment"("playerId", "type");

-- CreateIndex
CREATE UNIQUE INDEX "marketPlace_description_key" ON "marketPlace"("description");

-- CreateIndex
CREATE UNIQUE INDEX "marketPlace_itemId_key" ON "marketPlace"("itemId");

-- CreateIndex
CREATE UNIQUE INDEX "marketPlace_horseId_key" ON "marketPlace"("horseId");

-- CreateIndex
CREATE INDEX "marketPlace_sellerId_idx" ON "marketPlace"("sellerId");

-- CreateIndex
CREATE INDEX "marketPlace_buyerId_idx" ON "marketPlace"("buyerId");

-- CreateIndex
CREATE INDEX "marketPlace_itemId_idx" ON "marketPlace"("itemId");

-- CreateIndex
CREATE INDEX "marketPlace_horseId_idx" ON "marketPlace"("horseId");

-- CreateIndex
CREATE UNIQUE INDEX "_itemToitem_storage_AB_unique" ON "_itemToitem_storage"("A", "B");

-- CreateIndex
CREATE INDEX "_itemToitem_storage_B_index" ON "_itemToitem_storage"("B");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "player" ADD CONSTRAINT "player_guildId_fkey" FOREIGN KEY ("guildId") REFERENCES "guild"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "player_inventory_item" ADD CONSTRAINT "player_inventory_item_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "player"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "player_inventory_item" ADD CONSTRAINT "player_inventory_item_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_storage" ADD CONSTRAINT "item_storage_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "player"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_storage" ADD CONSTRAINT "item_storage_guildId_fkey" FOREIGN KEY ("guildId") REFERENCES "guild"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "skill" ADD CONSTRAINT "skill_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "player"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quest" ADD CONSTRAINT "quest_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "player"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "statistics" ADD CONSTRAINT "statistics_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "player"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "horse" ADD CONSTRAINT "horse_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "player"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "punishment" ADD CONSTRAINT "punishment_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "player"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "marketPlace" ADD CONSTRAINT "marketPlace_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "player"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "marketPlace" ADD CONSTRAINT "marketPlace_buyerId_fkey" FOREIGN KEY ("buyerId") REFERENCES "player"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "marketPlace" ADD CONSTRAINT "marketPlace_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "item"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "marketPlace" ADD CONSTRAINT "marketPlace_horseId_fkey" FOREIGN KEY ("horseId") REFERENCES "horse"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "marketPlace" ADD CONSTRAINT "marketPlace_playerUuid_fkey" FOREIGN KEY ("playerUuid") REFERENCES "player"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_itemToitem_storage" ADD CONSTRAINT "_itemToitem_storage_A_fkey" FOREIGN KEY ("A") REFERENCES "item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_itemToitem_storage" ADD CONSTRAINT "_itemToitem_storage_B_fkey" FOREIGN KEY ("B") REFERENCES "item_storage"("id") ON DELETE CASCADE ON UPDATE CASCADE;
