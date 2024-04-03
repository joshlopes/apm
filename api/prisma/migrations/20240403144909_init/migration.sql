-- CreateTable
CREATE TABLE `contestant` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `video_url` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `vote` (
    `id` VARCHAR(191) NOT NULL,
    `contestant_id` VARCHAR(191) NOT NULL,
    `ip` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `vote` ADD CONSTRAINT `vote_contestant_id_fkey` FOREIGN KEY (`contestant_id`) REFERENCES `contestant`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
