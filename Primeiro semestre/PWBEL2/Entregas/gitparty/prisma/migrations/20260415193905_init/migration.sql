/*
  Warnings:

  - You are about to drop the column `capacidade_maxima` on the `eventos` table. All the data in the column will be lost.
  - You are about to drop the `imagens` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[email]` on the table `Usuarios` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `capacidade_max` to the `Eventos` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `imagens` DROP FOREIGN KEY `Imagens_eventosId_fkey`;

-- AlterTable
ALTER TABLE `eventos` DROP COLUMN `capacidade_maxima`,
    ADD COLUMN `capacidade_max` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `inscricoes` MODIFY `status` ENUM('CONFIRMADA', 'LISTA_ESPERA', 'CANCELADA') NOT NULL DEFAULT 'CONFIRMADA';

-- DropTable
DROP TABLE `imagens`;

-- CreateTable
CREATE TABLE `Imagem` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nomeoriginal` VARCHAR(191) NOT NULL,
    `nomearquivo` VARCHAR(191) NOT NULL,
    `mimetype` VARCHAR(191) NOT NULL,
    `path` VARCHAR(191) NOT NULL,
    `data` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `eventosId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Usuarios_email_key` ON `Usuarios`(`email`);

-- AddForeignKey
ALTER TABLE `Imagem` ADD CONSTRAINT `Imagem_eventosId_fkey` FOREIGN KEY (`eventosId`) REFERENCES `Eventos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
