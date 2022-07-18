/*
  Warnings:

  - You are about to drop the column `activationCode` on the `credentials` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `credentials` DROP COLUMN `activationCode`,
    ADD COLUMN `verificationCode` INTEGER NULL;
