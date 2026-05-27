/*
  Warnings:

  - You are about to drop the column `imagem` on the `eventos` table. All the data in the column will be lost.
  - The values [CANCELADO] on the enum `Inscricoes_status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `eventos` DROP COLUMN `imagem`;

-- AlterTable
ALTER TABLE `inscricoes` MODIFY `status` ENUM('CANCELADA', 'CONFIRMADA', 'LISTA_ESPERA') NOT NULL DEFAULT 'CONFIRMADA';

-- AlterTable
ALTER TABLE `usuarios` MODIFY `data_cadastro` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- CreateTable
CREATE TABLE `Imagens` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nomeOriginal` VARCHAR(191) NOT NULL,
    `nomeArquivo` VARCHAR(191) NOT NULL,
    `mimeType` VARCHAR(191) NOT NULL,
    `path` VARCHAR(191) NOT NULL,
    `eventosId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Imagens` ADD CONSTRAINT `Imagens_eventosId_fkey` FOREIGN KEY (`eventosId`) REFERENCES `Eventos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
