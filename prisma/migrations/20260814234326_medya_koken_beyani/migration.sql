-- AlterTable
ALTER TABLE "medya" ADD COLUMN     "cekimTarihi" TEXT,
ADD COLUMN     "kameraMarka" TEXT,
ADD COLUMN     "kokenAraci" TEXT,
ADD COLUMN     "kokenIsaretleri" TEXT[] DEFAULT ARRAY[]::TEXT[];
