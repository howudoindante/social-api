/*
  Warnings:

  - A unique constraint covering the columns `[relatedProfileId]` on the table `Credentials` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `credentials` DROP FOREIGN KEY `Credentials_relatedProfileId_fkey`;

-- AlterTable
ALTER TABLE `credentials` MODIFY `relatedProfileId` INTEGER NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Credentials_relatedProfileId_key` ON `Credentials`(`relatedProfileId`);

-- AddForeignKey
ALTER TABLE `Credentials` ADD CONSTRAINT `Credentials_relatedProfileId_fkey` FOREIGN KEY (`relatedProfileId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
