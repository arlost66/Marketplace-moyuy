-- DropForeignKey
ALTER TABLE `carts` DROP FOREIGN KEY `carts_userId_fkey`;

-- AddForeignKey
ALTER TABLE `carts` ADD CONSTRAINT `carts_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
