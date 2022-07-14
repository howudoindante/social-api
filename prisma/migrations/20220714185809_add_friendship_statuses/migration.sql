/*
  Warnings:

  - Added the required column `friendshipStatusId` to the `Friendship` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `friendship` ADD COLUMN `friendshipStatusId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Friendship` ADD CONSTRAINT `Friendship_friendshipStatusId_fkey` FOREIGN KEY (`friendshipStatusId`) REFERENCES `FriendshipStatuses`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
