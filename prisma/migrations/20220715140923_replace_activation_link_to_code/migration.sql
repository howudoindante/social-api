/*
  Warnings:

  - You are about to drop the column `activationLink` on the `credentials` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `credentials` DROP COLUMN `activationLink`,
    ADD COLUMN `activationCode` INTEGER NULL;
