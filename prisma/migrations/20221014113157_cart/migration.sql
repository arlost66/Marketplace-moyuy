/*
  Warnings:

  - You are about to drop the column `ordersId` on the `products` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `carts` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[cartsId]` on the table `products` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `products` DROP FOREIGN KEY `products_ordersId_fkey`;

-- AlterTable
ALTER TABLE `products` DROP COLUMN `ordersId`,
    ADD COLUMN `cartsId` INTEGER NULL;

-- CreateIndex
CREATE UNIQUE INDEX `carts_userId_key` ON `carts`(`userId`);

-- CreateIndex
CREATE UNIQUE INDEX `products_cartsId_key` ON `products`(`cartsId`);

-- AddForeignKey
ALTER TABLE `products` ADD CONSTRAINT `products_cartsId_fkey` FOREIGN KEY (`cartsId`) REFERENCES `carts`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
