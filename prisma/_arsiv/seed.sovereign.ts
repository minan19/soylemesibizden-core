import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const LISTINGS = [
  // BEŞIKTAŞ
  { id: 'b1', title: 'Bebek Signature Yalısı', type: 'RESIDENTIAL', price: 45_000_000, area: 800, location: 'İstanbul, Beşiktaş, Bebek', desc: 'Boğaza nazır lüks yalı, özel rıhtım erişimi' },
  { id: 'b2', title: 'Ortaköy Meydanı Penthouse', type: 'RESIDENTIAL', price: 28_500_000, area: 650, location: 'İstanbul, Beşiktaş, Ortaköy', desc: 'Camii manzarası, 3 seviye, akıllı ev' },
  { id: 'b3', title: 'Akatlar Vadi Villaları', type: 'RESIDENTIAL', price: 18_900_000, area: 700, location: 'İstanbul, Beşiktaş, Akatlar', desc: '5 yatak, kapalı havuz, bahçe' },

  // ETİLER
  { id: 'e1', title: 'Etiler Diplomat Rezidans', type: 'RESIDENTIAL', price: 22_000_000, area: 550, location: 'İstanbul, Beşiktaş, Etiler', desc: 'Diplomat mahallesi, 4 yatak, lobi hizmeti' },
  { id: 'e2', title: 'Etiler Ticari Ofis', type: 'COMMERCIAL', price: 8_500_000, area: 400, location: 'İstanbul, Beşiktaş, Etiler', desc: 'A+ sınıfı ofis, 2 kata dağılı' },

  // TAKSIM
  { id: 't1', title: 'Taksim Meydanı Mağaza', type: 'COMMERCIAL', price: 5_200_000, area: 150, location: 'İstanbul, Beyoğlu, Taksim', desc: 'Yer kat, yüksek ciro potansiyeli' },
  { id: 't2', title: 'Nişantaşı Boutique Apart', type: 'RESIDENTIAL', price: 16_800_000, area: 420, location: 'İstanbul, Beyoğlu, Nişantaşı', desc: '2 yatak, tasarımcı apartmanı' },

  // ŞİŞLİ
  { id: 's1', title: 'Maçka Asker Selek Tepesi', type: 'RESIDENTIAL', price: 24_500_000, area: 600, location: 'İstanbul, Şişli, Maçka', desc: 'Tepede villa, panorama manzara' },
  { id: 's2', title: 'Osmanbey Ticari Bina', type: 'COMMERCIAL', price: 18_000_000, area: 2000, location: 'İstanbul, Şişli, Osmanbey', desc: '5 katlı, peyzaj bahçeli' },
  { id: 's3', title: 'Cihangir Pansiyari Apart', type: 'RESIDENTIAL', price: 12_300_000, area: 380, location: 'İstanbul, Şişli, Cihangir', desc: 'Genç profesyoneller için' },

  // KAKÖY
  { id: 'k1', title: 'Kaköy Boşnakiye Sokak', type: 'RESIDENTIAL', price: 14_200_000, area: 360, location: 'İstanbul, Beyoğlu, Kaköy', desc: 'Sıra ev, ahşap cephe' },

  // ULUS / TEŞVİKİYE
  { id: 'u1', title: 'Ulus İhsan Kaya Cad', type: 'RESIDENTIAL', price: 32_100_000, area: 720, location: 'İstanbul, Beşiktaş, Ulus', desc: 'Eser arkitekti tasarım villa' },
  { id: 'u2', title: 'Teşvikiye Mansion', type: 'RESIDENTIAL', price: 38_500_000, area: 850, location: 'İstanbul, Beşiktaş, Teşvikiye', desc: '6 yatak, sauna, jimnastik salonı' },

  // YENIKOY / SARIYER
  { id: 'y1', title: 'Yeniköy Köşk Evi', type: 'RESIDENTIAL', price: 52_000_000, area: 950, location: 'İstanbul, Sarıyer, Yeniköy', desc: 'Bir zamanlar Dışişleri Bakanlığı misafirhanesi' },
  { id: 'y2', title: 'Rumelihisarı Boş Arsa', type: 'LAND', price: 28_000_000, area: 3000, location: 'İstanbul, Sarıyer, Rumelihisarı', desc: 'Şantiye, inşaat potansiyeli' },

  // ACIBADEM / KADIKOY
  { id: 'a1', title: 'Acıbadem Ferah Sitesi', type: 'RESIDENTIAL', price: 9_800_000, area: 320, location: 'İstanbul, Kadıköy, Acıbadem', desc: 'Aile sitesi, kapalı park' },
  { id: 'a2', title: 'Moda Caddesi Daire', type: 'RESIDENTIAL', price: 11_500_000, area: 380, location: 'İstanbul, Kadıköy, Moda', desc: 'Caddede cephe, cafe potansiyeli' },

  // BAĞDAT CADDESİ
  { id: 'ba1', title: 'Bağdat Cad Luxury Apt', type: 'RESIDENTIAL', price: 13_200_000, area: 420, location: 'İstanbul, Kadıköy, Bağdat', desc: 'Modern tasarım, ticari yer alt kattan' },

  // BAHÇELIEVLER / FLORYA
  { id: 'fl1', title: 'Florya Sahil Villaları', type: 'RESIDENTIAL', price: 19_500_000, area: 650, location: 'İstanbul, Bakırköy, Florya', desc: 'Plaj erişimi, özel kokteyl barı' },
  { id: 'fl2', title: 'Bahçelievler Semetler', type: 'RESIDENTIAL', price: 8_900_000, area: 300, location: 'İstanbul, Bahçelievler', desc: 'Aile sitesi, okul yakını' },

  // ZEYTİNBURNU
  { id: 'z1', title: 'Zeytinburnu Lojman', type: 'RESIDENTIAL', price: 4_200_000, area: 200, location: 'İstanbul, Zeytinburnu', desc: 'Yatırım amaçlı, kira getirisi yüksek' },

  // ATAKÖY
  { id: 'at1', title: 'Ataköy Villaları 1. Kısım', type: 'RESIDENTIAL', price: 16_800_000, area: 550, location: 'İstanbul, Bakırköy, Ataköy', desc: 'Kapalı sitesi, private beach' },

  // ANKARA - ÇANKAYA
  { id: 'ank1', title: 'Ankara Çankaya Diplomat', type: 'RESIDENTIAL', price: 8_900_000, area: 450, location: 'Ankara, Çankaya', desc: 'Diplomat mahallesi, şef evi' },
  { id: 'ank2', title: 'Ankara Tunalı Hilmi', type: 'COMMERCIAL', price: 6_500_000, area: 280, location: 'Ankara, Çankaya, Tunalı', desc: 'A+ ofis, bankamatik hattı' },

  // İZMİR - ALSANCAK
  { id: 'izm1', title: 'İzmir Alsancak Meydanı', type: 'COMMERCIAL', price: 4_800_000, area: 200, location: 'İzmir, Konak, Alsancak', desc: 'Turist bölgesi, otel türevseli' },
  { id: 'izm2', title: 'İzmir Göztepe Villaları', type: 'RESIDENTIAL', price: 7_200_000, area: 380, location: 'İzmir, Konak, Göztepe', desc: 'Deniz manzarası, golf arkası' },

  // ANTALYA - KEMER
  { id: 'ant1', title: 'Antalya Kemer Otel Kompleksi', type: 'COMMERCIAL', price: 22_000_000, area: 5000, location: 'Antalya, Kemer', desc: '5 yıldızlı otel, 150 oda' },
  { id: 'ant2', title: 'Antalya Alanya Villa', type: 'RESIDENTIAL', price: 5_800_000, area: 420, location: 'Antalya, Alanya', desc: 'Camlı yapı, sürekli bahar' },

  // BODRUM
  { id: 'bod1', title: 'Bodrum Yalikavak Marina', type: 'RESIDENTIAL', price: 24_500_000, area: 600, location: 'Muğla, Bodrum, Yalikavak', desc: 'Marina apartmanı, lüks yacht üssü' },
  { id: 'bod2', title: 'Bodrum Türkbükü Plaj', type: 'RESIDENTIAL', price: 18_900_000, area: 500, location: 'Muğla, Bodrum, Türkbükü', desc: 'Özel plaj erişimi, sezonluk kiralık' },

  // MARMARIS
  { id: 'mar1', title: 'Marmaris İçmeler Penthouse', type: 'RESIDENTIAL', price: 12_500_000, area: 450, location: 'Muğla, Marmaris', desc: 'Pire manzarası, kaide kiralık' },

  // FETHIYE
  { id: 'fet1', title: 'Fethiye Ölüdeniz Villa', type: 'RESIDENTIAL', price: 8_200_000, area: 380, location: 'Muğla, Fethiye', desc: 'Ölüdeniz denizi, paragliding manzarası' },

  // ÇEŞMEKÖŞKü - İZMİR
  { id: 'ces1', title: 'Çeşme Alacati Pansiyonu', type: 'COMMERCIAL', price: 3_500_000, area: 180, location: 'İzmir, Çeşme, Alacati', desc: 'Tarihi taş bina, turist yoğunluğu' },

  // CAPPADOCIA - NEVŞEHİR
  { id: 'cap1', title: 'Kapadokya Göreme Balonculuk', type: 'COMMERCIAL', price: 6_200_000, area: 800, location: 'Nevşehir, Göreme', desc: 'Balon turizmi, uçak apron' },

  // GALATA - İSTANBUL
  { id: 'gal1', title: 'Galata Kulesi Resepsiyon', type: 'COMMERCIAL', price: 7_500_000, area: 320, location: 'İstanbul, Beyoğlu, Galata', desc: 'Tarihi yapı, turist tarafından ceviz' },

  // SULTANAHMET - BLUEMOSQUEt
  { id: 'sul1', title: 'Sultanahmet Arasta Pasajı', type: 'COMMERCIAL', price: 5_900_000, area: 240, location: 'İstanbul, Fatih, Sultanahmet', desc: 'Cami arkası, mağaza seti' },

  // TOPKAPI PALACEt
  { id: 'top1', title: 'Topkapi Uzun Kapıcı Yolu', type: 'LAND', price: 42_000_000, area: 12000, location: 'İstanbul, Fatih, Topkapi', desc: 'Arkeolojik çalışma alanı, potansiyel' },

  // Extralar
  { id: 'x1', title: 'İstanbul Ticari Kompleks', type: 'COMMERCIAL', price: 85_000_000, area: 15000, location: 'İstanbul, Maslak', desc: 'A++ Ofis Parkı, 4 gök gökle gökkubbe' },
  { id: 'x2', title: 'Ankara Boşnakiye Arsası', type: 'LAND', price: 12_000_000, area: 5000, location: 'Ankara, Çankaya', desc: 'Yaşam merkezli GYO potansiyeli' },
];

async function main() {
  // Admin user with password
  const hashedPassword = await bcrypt.hash('SovereignAdmin123!', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@soylemesibizden.com' },
    update: { password: hashedPassword },
    create: {
      email: 'admin@soylemesibizden.com',
      name: 'Sovereign Admin',
      role: 'ADMIN',
      password: hashedPassword,
    },
  });

  // Tüm listings'leri ekle
  let count = 0;
  for (const listing of LISTINGS) {
    await prisma.listing.upsert({
      where: { id: listing.id },
      update: {},
      create: {
        id: listing.id,
        title: listing.title,
        propertyType: listing.type,
        priceAmount: listing.price,
        area: listing.area,
        status: 'ACTIVE',
        location: listing.location,
        description: listing.desc,
        ownerId: admin.id,
      },
    });
    count++;
  }

  console.log(`✔ Seed tamamlandı: ${count} listing + Admin user`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
