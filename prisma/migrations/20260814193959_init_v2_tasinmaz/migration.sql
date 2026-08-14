-- CreateEnum
CREATE TYPE "KullaniciRol" AS ENUM ('BIREYSEL', 'OFIS_YETKILISI', 'OFIS_PERSONELI', 'MODERATOR', 'ADMIN');

-- CreateEnum
CREATE TYPE "TasinmazTipi" AS ENUM ('KONUT', 'ISYERI', 'ARSA', 'BINA', 'DEVREMULK');

-- CreateEnum
CREATE TYPE "YetkiTuru" AS ENUM ('MALIK', 'HISIM', 'YETKILI_ISLETME');

-- CreateEnum
CREATE TYPE "YetkiDurumu" AS ENUM ('BEKLIYOR', 'GECERLI', 'SURESI_DOLDU', 'IPTAL');

-- CreateEnum
CREATE TYPE "YetkiKaynagi" AS ENUM ('GERCEK', 'MOCK');

-- CreateEnum
CREATE TYPE "IlanDurumu" AS ENUM ('TASLAK', 'YETKI_BEKLIYOR', 'MODERASYONDA', 'YAYINDA', 'TEYIT_BEKLIYOR', 'PASIF', 'ARSIVLENDI', 'REDDEDILDI');

-- CreateEnum
CREATE TYPE "IlanTuru" AS ENUM ('SATILIK', 'KIRALIK');

-- CreateEnum
CREATE TYPE "RandevuDurumu" AS ENUM ('TALEP', 'ONAYLANDI', 'GERCEKLESTI', 'IPTAL', 'GELMEDI');

-- CreateEnum
CREATE TYPE "SikayetTuru" AS ENUM ('SATILDI_HALA_YAYINDA', 'YANLIS_FIYAT', 'YANLIS_KONUM', 'YEM_ILAN', 'SAHTE_GORSEL', 'YETKISIZ_ILAN', 'DIGER');

-- CreateTable
CREATE TABLE "kullanici" (
    "id" TEXT NOT NULL,
    "eposta" TEXT NOT NULL,
    "parolaHash" TEXT,
    "adSoyad" TEXT,
    "telefon" TEXT,
    "rol" "KullaniciRol" NOT NULL DEFAULT 'BIREYSEL',
    "eidsKullaniciKodu" TEXT,
    "kimlikDogrulandi" BOOLEAN NOT NULL DEFAULT false,
    "kimlikDogrulamaTs" TIMESTAMP(3),
    "ofisId" TEXT,
    "eklendi" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "guncellendi" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "kullanici_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "emlak_ofisi" (
    "id" TEXT NOT NULL,
    "unvan" TEXT NOT NULL,
    "mersisNo" TEXT NOT NULL,
    "vergiNo" TEXT NOT NULL,
    "yetkiBelgeNo" TEXT NOT NULL,
    "yetkiBelgeBitis" TIMESTAMP(3) NOT NULL,
    "yetkiBelgeGecerli" BOOLEAN NOT NULL DEFAULT false,
    "ilTrafikKodu" INTEGER NOT NULL,
    "adres" TEXT,
    "telefon" TEXT,
    "eklendi" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "guncellendi" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "emlak_ofisi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mahalle" (
    "id" TEXT NOT NULL,
    "ilKodu" INTEGER NOT NULL,
    "ilAd" TEXT NOT NULL,
    "ilceAd" TEXT NOT NULL,
    "mahalleAd" TEXT NOT NULL,
    "ortalamaM2Kurus" BIGINT,
    "endeksGuncelTs" TIMESTAMP(3),

    CONSTRAINT "mahalle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tasinmaz" (
    "id" TEXT NOT NULL,
    "tasinmazNo" TEXT NOT NULL,
    "tipi" "TasinmazTipi" NOT NULL,
    "ada" TEXT,
    "parsel" TEXT,
    "bagimsizBolumNo" TEXT,
    "mahalleId" TEXT NOT NULL,
    "enlem" DECIMAL(10,7),
    "boylam" DECIMAL(10,7),
    "brutM2" INTEGER,
    "netM2" INTEGER,
    "eklendi" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "guncellendi" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tasinmaz_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "eids_yetki" (
    "id" TEXT NOT NULL,
    "tasinmazId" TEXT NOT NULL,
    "turu" "YetkiTuru" NOT NULL,
    "durumu" "YetkiDurumu" NOT NULL DEFAULT 'BEKLIYOR',
    "eidsKullaniciKodu" TEXT NOT NULL,
    "eidsReferansNo" TEXT,
    "baslangic" TIMESTAMP(3) NOT NULL,
    "bitis" TIMESTAMP(3) NOT NULL,
    "kaynak" "YetkiKaynagi" NOT NULL DEFAULT 'MOCK',
    "eklendi" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "guncellendi" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "eids_yetki_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ilan" (
    "id" TEXT NOT NULL,
    "tasinmazId" TEXT NOT NULL,
    "yetkiId" TEXT NOT NULL,
    "sahibiId" TEXT NOT NULL,
    "ofisId" TEXT,
    "turu" "IlanTuru" NOT NULL,
    "durumu" "IlanDurumu" NOT NULL DEFAULT 'TASLAK',
    "baslik" TEXT NOT NULL,
    "aciklama" TEXT,
    "fiyatKurus" BIGINT NOT NULL,
    "paraBirimi" TEXT NOT NULL DEFAULT 'TRY',
    "odaSayisi" TEXT,
    "binaYasi" INTEGER,
    "kat" INTEGER,
    "isitmaTipi" TEXT,
    "esyali" BOOLEAN NOT NULL DEFAULT false,
    "aidatKurus" BIGINT,
    "sonTeyitTs" TIMESTAMP(3),
    "teyitSonTarih" TIMESTAMP(3),
    "otomatikPasifTs" TIMESTAMP(3),
    "yayinTs" TIMESTAMP(3),
    "goruntulenme" INTEGER NOT NULL DEFAULT 0,
    "eklendi" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "guncellendi" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ilan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fiyat_gecmisi" (
    "id" TEXT NOT NULL,
    "ilanId" TEXT NOT NULL,
    "eskiFiyatKurus" BIGINT,
    "yeniFiyatKurus" BIGINT NOT NULL,
    "degisimTs" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "fiyat_gecmisi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "medya" (
    "id" TEXT NOT NULL,
    "ilanId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "sira" INTEGER NOT NULL DEFAULT 0,
    "algiHash" TEXT,
    "yapayZekaSuphe" INTEGER,
    "eklendi" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "medya_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "favori" (
    "id" TEXT NOT NULL,
    "kullaniciId" TEXT NOT NULL,
    "ilanId" TEXT NOT NULL,
    "eklendi" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "favori_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "kayitli_arama" (
    "id" TEXT NOT NULL,
    "kullaniciId" TEXT NOT NULL,
    "ad" TEXT NOT NULL,
    "kriterler" JSONB NOT NULL,
    "bildirimAcik" BOOLEAN NOT NULL DEFAULT true,
    "sonBildirimTs" TIMESTAMP(3),
    "eklendi" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "kayitli_arama_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mesaj" (
    "id" TEXT NOT NULL,
    "ilanId" TEXT NOT NULL,
    "gonderenId" TEXT NOT NULL,
    "aliciId" TEXT NOT NULL,
    "icerik" TEXT NOT NULL,
    "okundu" BOOLEAN NOT NULL DEFAULT false,
    "eklendi" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "mesaj_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "randevu" (
    "id" TEXT NOT NULL,
    "ilanId" TEXT NOT NULL,
    "talepEdenId" TEXT NOT NULL,
    "durumu" "RandevuDurumu" NOT NULL DEFAULT 'TALEP',
    "tarih" TIMESTAMP(3) NOT NULL,
    "ilanGercekMi" BOOLEAN,
    "notlar" TEXT,
    "eklendi" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "randevu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sikayet" (
    "id" TEXT NOT NULL,
    "ilanId" TEXT NOT NULL,
    "bildirenId" TEXT NOT NULL,
    "turu" "SikayetTuru" NOT NULL,
    "aciklama" TEXT,
    "acilisTs" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "kapanisTs" TIMESTAMP(3),
    "sonuc" TEXT,

    CONSTRAINT "sikayet_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "kullanici_eposta_key" ON "kullanici"("eposta");

-- CreateIndex
CREATE UNIQUE INDEX "kullanici_eidsKullaniciKodu_key" ON "kullanici"("eidsKullaniciKodu");

-- CreateIndex
CREATE INDEX "kullanici_ofisId_idx" ON "kullanici"("ofisId");

-- CreateIndex
CREATE UNIQUE INDEX "emlak_ofisi_mersisNo_key" ON "emlak_ofisi"("mersisNo");

-- CreateIndex
CREATE UNIQUE INDEX "emlak_ofisi_yetkiBelgeNo_key" ON "emlak_ofisi"("yetkiBelgeNo");

-- CreateIndex
CREATE INDEX "emlak_ofisi_yetkiBelgeGecerli_idx" ON "emlak_ofisi"("yetkiBelgeGecerli");

-- CreateIndex
CREATE INDEX "mahalle_ilKodu_idx" ON "mahalle"("ilKodu");

-- CreateIndex
CREATE UNIQUE INDEX "mahalle_ilKodu_ilceAd_mahalleAd_key" ON "mahalle"("ilKodu", "ilceAd", "mahalleAd");

-- CreateIndex
CREATE UNIQUE INDEX "tasinmaz_tasinmazNo_key" ON "tasinmaz"("tasinmazNo");

-- CreateIndex
CREATE INDEX "tasinmaz_mahalleId_idx" ON "tasinmaz"("mahalleId");

-- CreateIndex
CREATE INDEX "tasinmaz_tipi_idx" ON "tasinmaz"("tipi");

-- CreateIndex
CREATE UNIQUE INDEX "eids_yetki_eidsReferansNo_key" ON "eids_yetki"("eidsReferansNo");

-- CreateIndex
CREATE INDEX "eids_yetki_tasinmazId_durumu_idx" ON "eids_yetki"("tasinmazId", "durumu");

-- CreateIndex
CREATE INDEX "eids_yetki_bitis_idx" ON "eids_yetki"("bitis");

-- CreateIndex
CREATE INDEX "ilan_durumu_yayinTs_idx" ON "ilan"("durumu", "yayinTs");

-- CreateIndex
CREATE INDEX "ilan_tasinmazId_idx" ON "ilan"("tasinmazId");

-- CreateIndex
CREATE INDEX "ilan_sahibiId_idx" ON "ilan"("sahibiId");

-- CreateIndex
CREATE INDEX "ilan_teyitSonTarih_idx" ON "ilan"("teyitSonTarih");

-- CreateIndex
CREATE INDEX "fiyat_gecmisi_ilanId_degisimTs_idx" ON "fiyat_gecmisi"("ilanId", "degisimTs");

-- CreateIndex
CREATE INDEX "medya_ilanId_sira_idx" ON "medya"("ilanId", "sira");

-- CreateIndex
CREATE INDEX "medya_algiHash_idx" ON "medya"("algiHash");

-- CreateIndex
CREATE UNIQUE INDEX "favori_kullaniciId_ilanId_key" ON "favori"("kullaniciId", "ilanId");

-- CreateIndex
CREATE INDEX "kayitli_arama_kullaniciId_idx" ON "kayitli_arama"("kullaniciId");

-- CreateIndex
CREATE INDEX "mesaj_ilanId_idx" ON "mesaj"("ilanId");

-- CreateIndex
CREATE INDEX "mesaj_aliciId_okundu_idx" ON "mesaj"("aliciId", "okundu");

-- CreateIndex
CREATE INDEX "randevu_ilanId_tarih_idx" ON "randevu"("ilanId", "tarih");

-- CreateIndex
CREATE INDEX "sikayet_ilanId_idx" ON "sikayet"("ilanId");

-- CreateIndex
CREATE INDEX "sikayet_kapanisTs_idx" ON "sikayet"("kapanisTs");

-- AddForeignKey
ALTER TABLE "kullanici" ADD CONSTRAINT "kullanici_ofisId_fkey" FOREIGN KEY ("ofisId") REFERENCES "emlak_ofisi"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasinmaz" ADD CONSTRAINT "tasinmaz_mahalleId_fkey" FOREIGN KEY ("mahalleId") REFERENCES "mahalle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "eids_yetki" ADD CONSTRAINT "eids_yetki_tasinmazId_fkey" FOREIGN KEY ("tasinmazId") REFERENCES "tasinmaz"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ilan" ADD CONSTRAINT "ilan_tasinmazId_fkey" FOREIGN KEY ("tasinmazId") REFERENCES "tasinmaz"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ilan" ADD CONSTRAINT "ilan_yetkiId_fkey" FOREIGN KEY ("yetkiId") REFERENCES "eids_yetki"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ilan" ADD CONSTRAINT "ilan_sahibiId_fkey" FOREIGN KEY ("sahibiId") REFERENCES "kullanici"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ilan" ADD CONSTRAINT "ilan_ofisId_fkey" FOREIGN KEY ("ofisId") REFERENCES "emlak_ofisi"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fiyat_gecmisi" ADD CONSTRAINT "fiyat_gecmisi_ilanId_fkey" FOREIGN KEY ("ilanId") REFERENCES "ilan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medya" ADD CONSTRAINT "medya_ilanId_fkey" FOREIGN KEY ("ilanId") REFERENCES "ilan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favori" ADD CONSTRAINT "favori_kullaniciId_fkey" FOREIGN KEY ("kullaniciId") REFERENCES "kullanici"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favori" ADD CONSTRAINT "favori_ilanId_fkey" FOREIGN KEY ("ilanId") REFERENCES "ilan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "kayitli_arama" ADD CONSTRAINT "kayitli_arama_kullaniciId_fkey" FOREIGN KEY ("kullaniciId") REFERENCES "kullanici"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mesaj" ADD CONSTRAINT "mesaj_ilanId_fkey" FOREIGN KEY ("ilanId") REFERENCES "ilan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mesaj" ADD CONSTRAINT "mesaj_gonderenId_fkey" FOREIGN KEY ("gonderenId") REFERENCES "kullanici"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mesaj" ADD CONSTRAINT "mesaj_aliciId_fkey" FOREIGN KEY ("aliciId") REFERENCES "kullanici"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "randevu" ADD CONSTRAINT "randevu_ilanId_fkey" FOREIGN KEY ("ilanId") REFERENCES "ilan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "randevu" ADD CONSTRAINT "randevu_talepEdenId_fkey" FOREIGN KEY ("talepEdenId") REFERENCES "kullanici"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sikayet" ADD CONSTRAINT "sikayet_ilanId_fkey" FOREIGN KEY ("ilanId") REFERENCES "ilan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sikayet" ADD CONSTRAINT "sikayet_bildirenId_fkey" FOREIGN KEY ("bildirenId") REFERENCES "kullanici"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
