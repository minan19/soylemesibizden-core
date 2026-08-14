-- AlterTable
ALTER TABLE "medya" ADD COLUMN     "icerikHash" TEXT;

-- CreateIndex
CREATE INDEX "medya_icerikHash_idx" ON "medya"("icerikHash");
