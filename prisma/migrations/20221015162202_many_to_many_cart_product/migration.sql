/*
  Warnings:

  - You are about to drop the column `cartsId` on the `products` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `products` DROP FOREIGN KEY `products_cartsId_fkey`;

-- AlterTable
ALTER TABLE `products` DROP COLUMN `cartsId`;

-- CreateTable
CREATE TABLE `productsOnCart` (
    `id` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL,
    `cost` FLOAT NOT NULL,
    `cartsId` INTEGER NOT NULL,
    `productsId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `productsOnCart` ADD CONSTRAINT `productsOnCart_cartsId_fkey` FOREIGN KEY (`cartsId`) REFERENCES `carts`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `productsOnCart` ADD CONSTRAINT `productsOnCart_productsId_fkey` FOREIGN KEY (`productsId`) REFERENCES `products`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
