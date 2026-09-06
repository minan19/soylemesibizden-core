import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Enerji Kimlik Belgesi (EKB) Rehberi | A-G Sınıfı | Söylemesi Bizden',
  description:
    'Enerji Kimlik Belgesi (EKB) nedir, nasıl alınır, A-G enerji sınıfları, yasal zorunluluklar ve EKB olmadan satış/kiralama riski.',
};

const EKB_SINIFLARI = [
  { sinif: 'A+', renk: 'bg-emerald-600', aciklama: 'Çok Yüksek Verimli', kwh: '< 25 kWh/m²/yıl', ornek: 'Pasif ev standardı' },
  { sinif: 'A', renk: 'bg-emerald-500', aciklama: 'Yüksek Verimli', kwh: '25–50 kWh/m²/yıl', ornek: 'Yeni inşaat minimum' },
  { sinif: 'B', renk: 'bg-lime-500', aciklama: 'İyi', kwh: '51–100 kWh/m²/yıl', ornek: '2010 sonrası bina' },
  { sinif: 'C', renk: 'bg-yellow-400', aciklama: 'Orta', kwh: '101–150 kWh/m²/yıl', ornek: '2000–2010 dönemi bina' },
  { sinif: 'D', renk: 'bg-orange-400', aciklama: 'Düşük Verimli', kwh: '151–200 kWh/m²/yıl', ornek: '1990–2000 dönemi bina' },
  { sinif: 'E', renk: 'bg-orange-500', aciklama: 'Verimsiz', kwh: '201–250 kWh/m²/yıl', ornek: '1980 öncesi eski bina' },
  { sinif: 'F', renk: 'bg-red-400', aciklama: 'Çok Verimsiz', kwh: '251–350 kWh/m²/yıl', ornek: 'Yalıtımsız eski yapı' },
  { sinif: 'G', renk: 'bg-red-600', aciklama: 'En Verimsiz', kwh: '> 350 kWh/m²/yıl', ornek: 'Yıkılması önerilen yapı' },
];

const NASIL_ALINIR = [
  { adim: 1, baslik: 'Yetkili Enerji Uzmanı Bulun', aciklama: 'Çevre, Şehircilik ve İklim Değişikliği Bakanlığı lisanslı enerji uzmanlarından randevu alın.' },
  { adim: 2, baslik: 'Bina Bilgilerini Hazırlayın', aciklama: 'Mimari proje, yapı ruhsatı, ısı yalıtım projesi, kullanılan yapı malzemeleri bilgileri gereklidir.' },
  { adim: 3, baslik: 'Yerinde İnceleme', aciklama: 'Uzman binanın yalıtım kalitesini, ısıtma/soğutma sistemini ve pencere tipini yerinde değerlendirir.' },
  { adim: 4, baslik: 'BEP-TR Yazılımı ile Hesaplama', aciklama: 'Standart enerji tüketimi hesabı resmi BEP-TR yazılımıyla yapılır.' },
  { adim: 5, baslik: 'EKB Düzenlenir', aciklama: 'Belge 10 yıl geçerlidir; bakanlık sistemine kayıt yapılır ve karekodlu basılı belge teslim edilir.' },
];

const YASAL_ZORUNLULUK = [
  { baslik: 'Satışta Zorunlu', aciklama: '2023 yılı itibarıyla 500 m² üzeri veya 4+ bağımsız bölümlü binalarda satış için EKB zorunludur.' },
  { baslik: 'Kiralamada Zorunlu', aciklama: 'Konut ve işyeri kiralamaları için EKB sunulması gereklidir; olmadan kira sözleşmesi geçerliliği tartışmalı olabilir.' },
  { baslik: 'Yeni İnşaatlarda Zorunlu', aciklama: 'Ruhsat başvurularında enerji verimliliği projesi sunulması şarttır; C sınıfının altında ruhsat verilmez.' },
  { baslik: 'İdari Para Cezası', aciklama: 'EKB olmadan satış veya kiralama yapanlara 5.000 ₺ ile 50.000 ₺ arasında idari para cezası uygulanabilir.' },
];

const VERIMLILIK_ARTIRMA = [
  { onlem: 'Dış Cephe Yalıtımı', tasarruf: '%20–35', maliyet: 'Orta-Yüksek', getiri: '5–8 yıl' },
  { onlem: 'Çift Camlı PVC Pencere', tasarruf: '%15–25', maliyet: 'Orta', getiri: '4–6 yıl' },
  { onlem: 'Kombi / Isı Pompası Yenileme', tasarruf: '%15–30', maliyet: 'Orta', getiri: '5–7 yıl' },
  { onlem: 'Çatı ve Tavan Yalıtımı', tasarruf: '%10–20', maliyet: 'Düşük-Orta', getiri: '3–5 yıl' },
  { onlem: 'LED Aydınlatmaya Geçiş', tasarruf: '%5–10', maliyet: 'Düşük', getiri: '1–2 yıl' },
  { onlem: 'Güneş Enerjisi (PV Panel)', tasarruf: '%25–60', maliyet: 'Yüksek', getiri: '7–12 yıl' },
];

export default function EnerjiKimlikBelgesiPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-14">
          <p className="text-[#00C49F] text-xs font-bold mb-3 uppercase tracking-widest">Yasal Rehber</p>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">Enerji Kimlik Belgesi (EKB)</h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed">
            EKB nedir, nasıl alınır, A-G sınıfları ne anlama gelir ve satış/kiralamada nasıl zorunluluk oluşturur?
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-10 space-y-10">

        {/* EKB Sınıfları */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-base font-black text-gray-900 mb-1">Enerji Sınıfları (A–G)</h2>
          <p className="text-xs text-gray-400 mb-5">Her sınıf yıllık birim enerji tüketimine (kWh/m²) göre belirlenir.</p>
          <div className="space-y-2">
            {EKB_SINIFLARI.map((s) => (
              <div key={s.sinif} className="flex items-center gap-3">
                <span className={`${s.renk} text-white font-black text-xs w-8 h-8 flex items-center justify-center rounded-lg shrink-0`}>{s.sinif}</span>
                <div className="flex-1">
                  <p className="text-xs font-black text-gray-900">{s.aciklama}</p>
                  <p className="text-[10px] text-gray-400">{s.kwh} — {s.ornek}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Nasıl Alınır */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-base font-black text-gray-900 mb-1">EKB Nasıl Alınır?</h2>
          <p className="text-xs text-gray-400 mb-5">5 adımda EKB başvuru ve düzenleme süreci.</p>
          <div className="space-y-4">
            {NASIL_ALINIR.map((a) => (
              <div key={a.adim} className="flex gap-3">
                <span className="w-6 h-6 rounded-full bg-[#00C49F] text-white text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5">{a.adim}</span>
                <div>
                  <p className="text-xs font-black text-gray-900 mb-0.5">{a.baslik}</p>
                  <p className="text-[11px] text-gray-500 leading-relaxed">{a.aciklama}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Yasal Zorunluluk */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-base font-black text-gray-900 mb-1">Yasal Zorunluluklar</h2>
          <p className="text-xs text-gray-400 mb-5">EKB olmadan satış veya kiralama yapmanın riskleri.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {YASAL_ZORUNLULUK.map((z, i) => (
              <div key={i} className="border border-gray-100 rounded-xl p-4">
                <p className="text-xs font-black text-gray-900 mb-1">{z.baslik}</p>
                <p className="text-[11px] text-gray-500 leading-relaxed">{z.aciklama}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Enerji Verimliliği Önlemleri */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm overflow-x-auto">
          <h2 className="text-base font-black text-gray-900 mb-1">Enerji Verimliliği Önlemleri</h2>
          <p className="text-xs text-gray-400 mb-5">Daha iyi EKB sınıfı için uygulanabilir önlemler ve tahmini geri dönüş süreleri.</p>
          <table className="w-full text-[10px] min-w-[420px]">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-2 font-black text-gray-500">Önlem</th>
                <th className="text-center py-2 font-black text-gray-500">Enerji Tasarrufu</th>
                <th className="text-center py-2 font-black text-gray-500">Maliyet</th>
                <th className="text-right py-2 font-black text-[#00C49F]">Geri Dönüş</th>
              </tr>
            </thead>
            <tbody>
              {VERIMLILIK_ARTIRMA.map((v, i) => (
                <tr key={i} className="border-b border-gray-50 last:border-0">
                  <td className="py-2 font-black text-gray-900">{v.onlem}</td>
                  <td className="py-2 text-center font-bold text-emerald-600">{v.tasarruf}</td>
                  <td className="py-2 text-center font-bold text-gray-600">{v.maliyet}</td>
                  <td className="py-2 text-right font-black text-[#00C49F]">{v.getiri}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Info box */}
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5">
          <p className="text-xs font-black text-blue-700 mb-1">📋 EKB Maliyeti</p>
          <p className="text-[11px] text-blue-600 leading-relaxed">
            Konutlarda EKB düzenleme ücreti bağımsız bölüm başına ortalama <strong>3.000–8.000 ₺</strong> arasındadır. Ticari yapılarda alan ve karmaşıklığa göre değişir. Bakanlık lisanslı uzman listesine Çevre, Şehircilik ve İklim Değişikliği Bakanlığı web sitesinden ulaşabilirsiniz.
          </p>
        </div>

      </div>
    </main>
  );
}
