/*
  Warnings:

  - You are about to drop the column `relatedProfileId` on the `credentials` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[relatedCredId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `credentials` DROP FOREIGN KEY `Credentials_relatedProfileId_fkey`;

-- AlterTable
ALTER TABLE `credentials` DROP COLUMN `relatedProfileId`;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `relatedCredId` INTEGER NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_relatedCredId_key` ON `User`(`relatedCredId`);

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_relatedCredId_fkey` FOREIGN KEY (`relatedCredId`) REFERENCES `Credentials`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
