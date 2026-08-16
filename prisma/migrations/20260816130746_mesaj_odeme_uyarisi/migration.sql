-- AlterEnum
ALTER TYPE "SikayetTuru" ADD VALUE 'TAPU_ONCESI_ODEME_TALEBI';

-- AlterTable
ALTER TABLE "mesaj" ADD COLUMN     "denetimOzeti" TEXT,
ADD COLUMN     "odemeUyarisiGosterildi" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "tespitEdilenIsaretler" TEXT[] DEFAULT ARRAY[]::TEXT[];
