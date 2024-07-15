-- CreateTable
CREATE TABLE `TaskDetails` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `task` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'not yet started',
    `timeSpend` INTEGER NOT NULL DEFAULT 0,
    `dueDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `priority` VARCHAR(191) NOT NULL DEFAULT 'medium',
    `remarks` VARCHAR(191) NULL,
    `accepted` BOOLEAN NOT NULL DEFAULT false,
    `userId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `TaskDetails` ADD CONSTRAINT `TaskDetails_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
