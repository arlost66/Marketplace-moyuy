-- DropForeignKey
ALTER TABLE `productsOnCart` DROP FOREIGN KEY `productsOnCart_productsId_fkey`;

-- AddForeignKey
ALTER TABLE `productsOnCart` ADD CONSTRAINT `productsOnCart_productsId_fkey` FOREIGN KEY (`productsId`) REFERENCES `products`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
