/*
  Warnings:

  - You are about to drop the column `item` on the `mob_drop` table. All the data in the column will be lost.
  - The primary key for the `npc` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `npc` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `_itemToitem_storage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `item` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `rpg_itemId` to the `mob_drop` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "MarketItemType" ADD VALUE 'PET';

-- DropForeignKey
ALTER TABLE "_itemToitem_storage" DROP CONSTRAINT "_itemToitem_storage_A_fkey";

-- DropForeignKey
ALTER TABLE "_itemToitem_storage" DROP CONSTRAINT "_itemToitem_storage_B_fkey";

-- DropForeignKey
ALTER TABLE "marketplace" DROP CONSTRAINT "marketplace_itemId_fkey";

-- DropForeignKey
ALTER TABLE "player_inventory_item" DROP CONSTRAINT "player_inventory_item_itemId_fkey";

-- AlterTable
ALTER TABLE "mob" ADD COLUMN     "drops" JSONB NOT NULL DEFAULT '[]',
ADD COLUMN     "equips" JSONB NOT NULL DEFAULT '[]';

-- AlterTable
ALTER TABLE "mob_drop" DROP COLUMN "item",
ADD COLUMN     "rpg_itemId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "npc" DROP CONSTRAINT "npc_pkey",
ADD COLUMN     "pitch" DOUBLE PRECISION DEFAULT 0,
ADD COLUMN     "yaw" DOUBLE PRECISION DEFAULT 0,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "description" SET DEFAULT 'Nothing',
ADD CONSTRAINT "npc_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "spawn_point" ADD COLUMN     "pitch" DOUBLE PRECISION DEFAULT 0,
ADD COLUMN     "yaw" DOUBLE PRECISION DEFAULT 0;

-- DropTable
DROP TABLE "_itemToitem_storage";

-- DropTable
DROP TABLE "item";

-- CreateTable
CREATE TABLE "rpg_item" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "itemType" "ItemType" NOT NULL,
    "itemStats" JSONB NOT NULL,

    CONSTRAINT "rpg_item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_item_storageTorpg_item" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_item_storageTorpg_item_AB_unique" ON "_item_storageTorpg_item"("A", "B");

-- CreateIndex
CREATE INDEX "_item_storageTorpg_item_B_index" ON "_item_storageTorpg_item"("B");

-- AddForeignKey
ALTER TABLE "player_inventory_item" ADD CONSTRAINT "player_inventory_item_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "rpg_item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "marketplace" ADD CONSTRAINT "marketplace_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "rpg_item"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mob_drop" ADD CONSTRAINT "mob_drop_rpg_itemId_fkey" FOREIGN KEY ("rpg_itemId") REFERENCES "rpg_item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_item_storageTorpg_item" ADD CONSTRAINT "_item_storageTorpg_item_A_fkey" FOREIGN KEY ("A") REFERENCES "item_storage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_item_storageTorpg_item" ADD CONSTRAINT "_item_storageTorpg_item_B_fkey" FOREIGN KEY ("B") REFERENCES "rpg_item"("id") ON DELETE CASCADE ON UPDATE CASCADE;
