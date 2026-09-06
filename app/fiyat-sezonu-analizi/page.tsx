import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Konut Fiyat Sezon Analizi | Alım ve Kirada Doğru Zamanlama | Söylemesi Bizden',
  description:
    'Türkiye konut piyasasında sezona göre fiyat değişimi: alım için en uygun dönem, kira yenileme zamanlaması ve yıl içi fiyat dinamikleri.',
};

const AYLIK_ANALIZ = [
  { ay: 'Ocak', alim: 'İyi', kiralama: 'Orta', talep: 'Düşük', not: 'Düşük talep, pazarlık imkânı yüksek' },
  { ay: 'Şubat', alim: 'İyi', kiralama: 'Orta', talep: 'Düşük', not: 'Yılın en sakin ayı, fiyatlar geriliyor' },
  { ay: 'Mart', alim: 'Orta', kiralama: 'Yüksek', talep: 'Orta', not: 'Piyasa canlanması başlıyor' },
  { ay: 'Nisan', alim: 'Orta', kiralama: 'Yüksek', talep: 'Orta', not: 'Kira sözleşme yenilemeleri yoğun' },
  { ay: 'Mayıs', alim: 'Kötü', kiralama: 'Çok Yüksek', talep: 'Yüksek', not: 'Yaz için kira arayışı başlıyor' },
  { ay: 'Haziran', alim: 'Kötü', kiralama: 'Çok Yüksek', talep: 'Yüksek', not: 'Pikde fiyatlar, stok azalıyor' },
  { ay: 'Temmuz', alim: 'Orta', kiralama: 'Yüksek', talep: 'Orta', not: 'Tatil sezonu, satıcılar az aktif' },
  { ay: 'Ağustos', alim: 'Orta', kiralama: 'Yüksek', talep: 'Orta', not: 'Ağustos ortasından sonra fırsat çıkabilir' },
  { ay: 'Eylül', alim: 'Kötü', kiralama: 'Çok Yüksek', talep: 'Çok Yüksek', not: 'Okul dönemi, yıl en yüksek kiralama talebi' },
  { ay: 'Ekim', alim: 'İyi', kiralama: 'Orta', talep: 'Orta', not: 'Talep azalmaya başlıyor, alıcı için avantajlı' },
  { ay: 'Kasım', alim: 'Çok İyi', kiralama: 'Düşük', talep: 'Düşük', not: 'Piyasa soğuyor, fiyatlar baskılıyor' },
  { ay: 'Aralık', alim: 'Çok İyi', kiralama: 'Düşük', talep: 'Düşük', not: 'Yılsonunda satıcılar indirime gidebilir' },
];

const STRATEJI_ALICI = [
  { baslik: 'Kasım – Şubat Arası', ikon: '🎯', aciklama: 'Talebin en düşük olduğu bu dönemde fiyatlar %5–15 daha uygun olabilir. Satıcının aciliyeti artar, pazarlık oranı yüksektir.' },
  { baslik: 'Yılbaşı Kapanışı', ikon: '📅', aciklama: 'Aralık son iki haftasında satış hedefine ulaşmak isteyen satıcılar indirim yapabilir. Bu dönem gözden kaçırılmamalıdır.' },
  { baslik: 'Ağustos Sonu', ikon: '☀️', aciklama: 'Tatil dönüşü ile Eylül\'ün kalabalığından önce; stok yüksek, alıcı azdır. İyi müzakere imkânı.' },
];

const STRATEJI_KIRACI = [
  { baslik: 'Ekim – Kasım', ikon: '🏠', aciklama: 'Yaz dönemi kapandıktan sonra boş kalan mülk sahipleri kirayı indirmeye yatkındır. En uygun kira dönemi.' },
  { baslik: 'Ocak – Şubat', ikon: '❄️', aciklama: 'Yıl içinde en az kiralama talebinin olduğu dönem; ev sahipleri dolu tutmak için esneklik gösterebilir.' },
  { baslik: 'Uzun Sözleşme Avantajı', ikon: '📋', aciklama: '2 yıllık sözleşme teklif edin; ev sahipleri boşluk riskini sevmez ve buna karşılık kira indirimi yapabilir.' },
];

const FAKTÖRLER = [
  { faktor: 'Okul Açılışı (Eylül)', etki: 'Kira +%15–25', aciklama: 'Aile göçü ve öğrenci talebinin birleşimi en güçlü mevsimsel dinamiği oluşturur.' },
  { faktor: 'Yılbaşı (Aralık–Ocak)', etki: 'Satışta -%5–10', aciklama: 'İnsanlar tatil döneminde taşınmak istemez; piyasa yavaşlar, fiyatlar geriler.' },
  { faktor: 'Bahar Canlanması (Mart–Nisan)', etki: 'Kira +%10–15', aciklama: 'Kira sözleşmeleri genellikle Nisan–Mayıs\'ta yenilenir; rekabet artar.' },
  { faktor: 'Yaz Tatili (Temmuz–Ağustos)', etki: 'Satışta nötr', aciklama: 'Satıcılar ve alıcılar tatilde olduğundan hacim düşer ama fiyatlar stabil kalır.' },
];

export default function FiyatSezونAnaliziPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-14">
          <p className="text-[#00C49F] text-xs font-bold mb-3 uppercase tracking-widest">Piyasa Analizi</p>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">Konut Fiyat Sezon Analizi</h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed">
            Türkiye konut piyasasında hangi ay alım yapmak, hangi ay kiralamak daha avantajlıdır?
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-10 space-y-10">

        {/* Aylık Tablo */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm overflow-x-auto">
          <h2 className="text-base font-black text-gray-900 mb-1">Ay Bazlı Alım ve Kiralama Analizi</h2>
          <p className="text-xs text-gray-400 mb-5">Her ay için konut alımı ve kiralama açısından piyasa koşulları.</p>
          <table className="w-full text-[10px] min-w-[480px]">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-2 font-black text-gray-500">Ay</th>
                <th className="text-center py-2 font-black text-gray-500">Alım</th>
                <th className="text-center py-2 font-black text-gray-500">Kiralama</th>
                <th className="text-center py-2 font-black text-gray-500">Talep</th>
                <th className="text-right py-2 font-black text-[#00C49F]">Not</th>
              </tr>
            </thead>
            <tbody>
              {AYLIK_ANALIZ.map((a, i) => {
                const alimRenk = a.alim === 'Çok İyi' ? 'text-emerald-600' : a.alim === 'İyi' ? 'text-[#00C49F]' : a.alim === 'Kötü' ? 'text-rose-500' : 'text-amber-500';
                const kiraRenk = a.kiralama === 'Çok Yüksek' ? 'text-rose-500' : a.kiralama === 'Yüksek' ? 'text-amber-500' : a.kiralama === 'Düşük' ? 'text-emerald-600' : 'text-gray-500';
                return (
                  <tr key={i} className="border-b border-gray-50 last:border-0">
                    <td className="py-2 font-black text-gray-900">{a.ay}</td>
                    <td className={`py-2 text-center font-black ${alimRenk}`}>{a.alim}</td>
                    <td className={`py-2 text-center font-black ${kiraRenk}`}>{a.kiralama}</td>
                    <td className="py-2 text-center font-bold text-gray-600">{a.talep}</td>
                    <td className="py-2 text-right font-bold text-gray-400">{a.not}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Alıcı Stratejileri */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-base font-black text-gray-900 mb-4">Alıcı İçin Zamanlama Stratejisi</h2>
          <div className="space-y-4">
            {STRATEJI_ALICI.map((s, i) => (
              <div key={i} className="border border-emerald-100 bg-emerald-50 rounded-xl p-4 flex gap-3">
                <span className="text-2xl shrink-0">{s.ikon}</span>
                <div>
                  <p className="text-xs font-black text-emerald-700 mb-1">{s.baslik}</p>
                  <p className="text-[11px] text-emerald-600 leading-relaxed">{s.aciklama}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Kiracı Stratejileri */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-base font-black text-gray-900 mb-4">Kiracı İçin Zamanlama Stratejisi</h2>
          <div className="space-y-4">
            {STRATEJI_KIRACI.map((s, i) => (
              <div key={i} className="border border-blue-100 bg-blue-50 rounded-xl p-4 flex gap-3">
                <span className="text-2xl shrink-0">{s.ikon}</span>
                <div>
                  <p className="text-xs font-black text-blue-700 mb-1">{s.baslik}</p>
                  <p className="text-[11px] text-blue-600 leading-relaxed">{s.aciklama}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mevsimsel Faktörler */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-base font-black text-gray-900 mb-1">Temel Mevsimsel Faktörler</h2>
          <p className="text-xs text-gray-400 mb-5">Piyasayı en çok etkileyen dönemsel dinamikler.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {FAKTÖRLER.map((f, i) => (
              <div key={i} className="border border-gray-100 rounded-xl p-4">
                <div className="flex justify-between items-start mb-2">
                  <p className="text-xs font-black text-gray-900">{f.faktor}</p>
                  <span className={`text-[10px] font-black ml-2 shrink-0 ${f.etki.includes('+') ? 'text-rose-500' : 'text-emerald-600'}`}>{f.etki}</span>
                </div>
                <p className="text-[11px] text-gray-500 leading-relaxed">{f.aciklama}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}
