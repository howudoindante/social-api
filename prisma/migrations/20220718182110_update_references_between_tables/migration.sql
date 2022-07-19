/*
  Warnings:

  - You are about to drop the column `userId` on the `token` table. All the data in the column will be lost.
  - You are about to drop the column `roleId` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `useriplist` table. All the data in the column will be lost.
  - Added the required column `credentialsId` to the `Token` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `token` DROP FOREIGN KEY `Token_userId_fkey`;

-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `User_roleId_fkey`;

-- DropForeignKey
ALTER TABLE `useriplist` DROP FOREIGN KEY `UserIpList_userId_fkey`;

-- AlterTable
ALTER TABLE `credentials` ADD COLUMN `roleId` INTEGER NULL;

-- AlterTable
ALTER TABLE `token` DROP COLUMN `userId`,
    ADD COLUMN `credentialsId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `roleId`;

-- AlterTable
ALTER TABLE `useriplist` DROP COLUMN `userId`,
    ADD COLUMN `credentialsId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Credentials` ADD CONSTRAINT `Credentials_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `Role`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Token` ADD CONSTRAINT `Token_credentialsId_fkey` FOREIGN KEY (`credentialsId`) REFERENCES `Credentials`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserIpList` ADD CONSTRAINT `UserIpList_credentialsId_fkey` FOREIGN KEY (`credentialsId`) REFERENCES `Credentials`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
