/*
  Warnings:

  - You are about to alter the column `status` on the `carts` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `Enum("carts_status")`.

*/
-- AlterTable
ALTER TABLE `carts` MODIFY `status` ENUM('DELIVERED', 'PREPARING', 'ORDER') NOT NULL DEFAULT 'ORDER';
