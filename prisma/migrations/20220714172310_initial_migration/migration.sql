-- CreateTable
CREATE TABLE `Credentials` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `passwordSalt` VARCHAR(191) NOT NULL,
    `activationLink` VARCHAR(191) NULL,
    `isActivated` BOOLEAN NOT NULL DEFAULT false,
    `relatedProfileId` INTEGER NOT NULL,

    UNIQUE INDEX `Credentials_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `firstName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `lastOnlineAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `bio` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Credentials` ADD CONSTRAINT `Credentials_relatedProfileId_fkey` FOREIGN KEY (`relatedProfileId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
