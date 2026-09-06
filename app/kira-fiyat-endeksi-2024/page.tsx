import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '2024 Kira Fiyat Endeksi | Türkiye Kira Artışı Analizi | Söylemesi Bizden',
  description:
    '2024 yılı Türkiye kira fiyat endeksi: şehir bazlı kira artış oranları, TÜFE karşılaştırması ve kira piyasasının yıl içi dinamikleri.',
};

const SEHIR_ARTIS_2024 = [
  { sehir: 'İstanbul', kiraArtis: 52, satilikArtis: 68, genelTufe: 47.1, yorum: 'Piyasa ortalaması üzerinde' },
  { sehir: 'İzmir', kiraArtis: 58, satilikArtis: 72, genelTufe: 47.1, yorum: 'Yüksek talep baskısı' },
  { sehir: 'Ankara', kiraArtis: 45, satilikArtis: 55, genelTufe: 47.1, yorum: 'Dengeli seyir' },
  { sehir: 'Antalya', kiraArtis: 62, satilikArtis: 78, genelTufe: 47.1, yorum: 'Turizm etkisi güçlü' },
  { sehir: 'Bursa', kiraArtis: 40, satilikArtis: 50, genelTufe: 47.1, yorum: 'TÜFE altında kaldı' },
  { sehir: 'Muğla (Bodrum)', kiraArtis: 70, satilikArtis: 90, genelTufe: 47.1, yorum: 'Lüks segmentte rekor' },
];

const AYLIK_ENDEKS_2024 = [
  { ay: 'Ocak', kiraTufe: 55, satilikTufe: 65 },
  { ay: 'Şubat', kiraTufe: 52, satilikTufe: 63 },
  { ay: 'Mart', kiraTufe: 58, satilikTufe: 70 },
  { ay: 'Nisan', kiraTufe: 60, satilikTufe: 72 },
  { ay: 'Mayıs', kiraTufe: 62, satilikTufe: 75 },
  { ay: 'Haziran', kiraTufe: 55, satilikTufe: 68 },
  { ay: 'Temmuz', kiraTufe: 50, satilikTufe: 65 },
  { ay: 'Ağustos', kiraTufe: 48, satilikTufe: 63 },
  { ay: 'Eylül', kiraTufe: 52, satilikTufe: 66 },
  { ay: 'Ekim', kiraTufe: 45, satilikTufe: 60 },
  { ay: 'Kasım', kiraTufe: 42, satilikTufe: 57 },
  { ay: 'Aralık', kiraTufe: 40, satilikTufe: 55 },
];

const ETKENLER = [
  {
    baslik: 'Göç ve Nüfus Hareketliliği',
    aciklama: '2024\'te İstanbul ve İzmir\'e iç göç devam etti; bu şehirlerde kira artışı TÜFE\'nin üzerine çıktı. Deprem riski algısı Karadeniz ve iç Anadolu\'dan kıyı şehirlerine göçü hızlandırdı.',
  },
  {
    baslik: 'Yabancı Talep',
    aciklama: 'Antalya, Muğla ve İstanbul\'da yabancı yatırımcı talebi sürdü. 400.000 USD vatandaşlık eşiği, bölge fiyatlarını dolaylı olarak destekledi.',
  },
  {
    baslik: '%25 Tavan Uygulaması',
    aciklama: 'Hükümetin 2022\'de getirdiği %25 kira artış tavanı 2024\'te gevşetildi; piyasa TÜFE doğrultusunda yeniden dengelenmeye başladı.',
  },
  {
    baslik: 'Konut Arzı Açığı',
    aciklama: '2024\'te yeni konut başlangıçları geçmiş yıllara kıyasla sınırlı kaldı. Yapı ruhsatı azlığı orta vadeli kira talebini canlı tutmaktadır.',
  },
];

const PRATIK_CIKTILAR = [
  { cikti: 'TÜFE\'yi Geçen Şehirler', deger: 'İstanbul, İzmir, Antalya, Muğla', not: '%47.1 genel TÜFE üzerinde' },
  { cikti: 'En Yüksek Kira Artışı', deger: 'Muğla (Bodrum) %70', not: 'Lüks tatil konutu segmenti' },
  { cikti: 'Denge Noktası', deger: 'Bursa %40', not: 'TÜFE altında, istikrarlı' },
  { cikti: '2024 Yılı Ortalaması', deger: 'Türkiye geneli ~%52 kira artışı', not: 'TÜİK ve TCMB verileri' },
];

export default function KiraFiyatEndeksi2024Page() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-14">
          <p className="text-[#00C49F] text-xs font-bold mb-3 uppercase tracking-widest">Piyasa Raporu</p>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">2024 Kira Fiyat Endeksi</h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed">
            2024 yılında Türkiye genelinde kira artış oranları, şehir bazlı karşılaştırma ve piyasayı şekillendiren etkenler.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-10 space-y-10">

        {/* Şehir Bazlı Tablo */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm overflow-x-auto">
          <h2 className="text-base font-black text-gray-900 mb-1">Şehir Bazlı Kira Artışı (2024)</h2>
          <p className="text-xs text-gray-400 mb-5">Yıllık kira ve satılık fiyat artış oranları — TÜFE (%47.1) ile karşılaştırmalı.</p>
          <table className="w-full text-[10px] min-w-[440px]">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-2 font-black text-gray-500">Şehir</th>
                <th className="text-center py-2 font-black text-gray-500">Kira Artışı</th>
                <th className="text-center py-2 font-black text-gray-500">Satılık Artışı</th>
                <th className="text-center py-2 font-black text-gray-500">TÜFE</th>
                <th className="text-right py-2 font-black text-[#00C49F]">Yorum</th>
              </tr>
            </thead>
            <tbody>
              {SEHIR_ARTIS_2024.map((s, i) => (
                <tr key={i} className="border-b border-gray-50 last:border-0">
                  <td className="py-2 font-black text-gray-900">{s.sehir}</td>
                  <td className={`py-2 text-center font-black ${s.kiraArtis > s.genelTufe ? 'text-rose-500' : 'text-emerald-600'}`}>%{s.kiraArtis}</td>
                  <td className="py-2 text-center font-bold text-blue-500">%{s.satilikArtis}</td>
                  <td className="py-2 text-center font-bold text-gray-400">%{s.genelTufe}</td>
                  <td className="py-2 text-right font-bold text-gray-400">{s.yorum}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Aylık Endeks Bar Chart */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-base font-black text-gray-900 mb-1">2024 Aylık Kira Endeksi (Yıllık Bazda)</h2>
          <p className="text-xs text-gray-400 mb-5">Her ayın yıllık kira ve satılık artış oranı karşılaştırması.</p>
          <div className="space-y-2">
            {AYLIK_ENDEKS_2024.map((a, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-[9px] text-gray-400 w-12 shrink-0">{a.ay}</span>
                <div className="flex-1 space-y-1">
                  <div className="bg-gray-100 rounded-full h-2">
                    <div className="bg-[#00C49F] h-2 rounded-full" style={{ width: `${a.kiraTufe}%` }} />
                  </div>
                  <div className="bg-gray-100 rounded-full h-1.5">
                    <div className="bg-blue-400 h-1.5 rounded-full" style={{ width: `${a.satilikTufe}%` }} />
                  </div>
                </div>
                <span className="text-[9px] font-black text-[#00C49F] w-10 text-right shrink-0">%{a.kiraTufe}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 flex gap-4">
            <div className="flex items-center gap-1.5"><div className="w-3 h-2 rounded-full bg-[#00C49F]" /><span className="text-[10px] text-gray-400">Kira</span></div>
            <div className="flex items-center gap-1.5"><div className="w-3 h-1.5 rounded-full bg-blue-400" /><span className="text-[10px] text-gray-400">Satılık</span></div>
          </div>
        </div>

        {/* Temel Etkenler */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-base font-black text-gray-900 mb-4">2024 Kira Artışını Şekillendiren Etkenler</h2>
          <div className="space-y-4">
            {ETKENLER.map((e, i) => (
              <div key={i} className="border border-gray-100 rounded-xl p-4">
                <p className="text-xs font-black text-gray-900 mb-1">{e.baslik}</p>
                <p className="text-[11px] text-gray-500 leading-relaxed">{e.aciklama}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Özet Çıktılar */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-base font-black text-gray-900 mb-4">2024 Yılı Özet Çıktılar</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {PRATIK_CIKTILAR.map((c, i) => (
              <div key={i} className="bg-gray-50 rounded-xl p-4">
                <p className="text-[10px] text-gray-500 mb-1">{c.cikti}</p>
                <p className="text-xs font-black text-gray-900 mb-1">{c.deger}</p>
                <p className="text-[10px] text-gray-400 italic">{c.not}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}
