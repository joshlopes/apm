/*
  Warnings:

  - Added the required column `sequence` to the `contestant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `contestant` ADD COLUMN `sequence` INTEGER NOT NULL;
