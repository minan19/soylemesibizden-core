import { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle, AlertTriangle, ArrowRight, Hammer } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Ev Tadilat Rehberi 2024 | İzin, Maliyet, Müteahhit Seçimi | Söylemesi Bizden',
  description:
    'Ev tadilatı nasıl yapılır? Ruhsat gerektiren işler, maliyet tahmini, güvenilir müteahhit bulma ve tadilat sürecinde dikkat edilecekler.',
};

const RUHSAT_BILGISI = [
  { islem: 'İç boya, kapı/zemin değişimi', ruhsat: 'Gerekmez', not: 'Mimari değişiklik yok; kiracı bile yapabilir (izinle)' },
  { islem: 'Duvar kaldırma/ekleme (taşıyıcı olmayan)', ruhsat: 'Gerekmez', not: 'Komşu birimleri etkilemiyorsa muaf; yönetim bilgilendirmesi önerilir' },
  { islem: 'Taşıyıcı duvar değişikliği', ruhsat: 'Zorunlu', not: 'Statik proje ve belediye onayı şart; yapılmazsa kaçak yapı sayılır' },
  { islem: 'Balkon kapatma/genişletme', ruhsat: 'Zorunlu', not: 'İmar mevzuatına aykırılık olabilir; yönetim ve belediye onayı gerekir' },
  { islem: 'Çatı tadilat/ek kat', ruhsat: 'Zorunlu', not: 'Kat ilavesi imara göre değişir; çatı izolasyonu muaf olabilir' },
  { islem: 'Elektrik/tesisat değişimi', ruhsat: 'Gerekmez', not: 'Lisanslı elektrikçi/tesisatçı kullanılmalı; belgelendirme önerilir' },
];

const MALIYET_TAHMINI = [
  { islem: 'Boya (tüm ev)', birim: 'm²', asgariFiyat: 80, maxFiyat: 200, not: '100m² ~8.000–20.000 ₺' },
  { islem: 'Zemin Döşeme (parke)', birim: 'm²', asgariFiyat: 300, maxFiyat: 800, not: 'Malzeme dahil' },
  { islem: 'Seramik (banyo/mutfak)', birim: 'm²', asgariFiyat: 400, maxFiyat: 1200, not: 'Malzeme dahil' },
  { islem: 'Mutfak Dolabı Yenileme', birim: 'komple', asgariFiyat: 40000, maxFiyat: 150000, not: 'Kaliteye göre değişir' },
  { islem: 'Banyo Tadilatı', birim: 'komple', asgariFiyat: 30000, maxFiyat: 120000, not: 'Ekipman + işçilik' },
  { islem: 'Elektrik Yenileme', birim: 'daire', asgariFiyat: 25000, maxFiyat: 80000, not: 'Sigorta panosu dahil' },
  { islem: 'Isı Yalıtımı (cephe)', birim: 'm²', asgariFiyat: 500, maxFiyat: 1500, not: 'EPS levha + işçilik' },
  { islem: 'Pencere Değişimi', birim: 'adet', asgariFiyat: 5000, maxFiyat: 15000, not: 'PVC çift cam' },
];

const MUTTEAHHIT_SECIM = [
  { kriter: 'Referans Kontrolü', aciklama: 'En az 3 tamamlanmış proje görün; önceki müşterilerle konuşun.' },
  { kriter: 'Yazılı Sözleşme', aciklama: 'Teslim tarihi, malzeme listesi, ödeme planı ve cezai şart net yazılsın.' },
  { kriter: 'KDV Dahil Fiyat', aciklama: 'KDV hariç fiyat teklif eden müteahhit %20 daha pahalı olabilir; karşılaştırın.' },
  { kriter: 'Malzeme Sorumluluğu', aciklama: 'Malzemeyi kimin temin edeceğini açıkça belirleyin; garanti belgelerini isteyin.' },
  { kriter: 'Sigorta/İzin Durumu', aciklama: 'İşçi sigortası var mı? İzinli müteahhit olduğunu belgeleyin.' },
  { kriter: 'Ödeme Planı', aciklama: 'Avans %20–30 ile başlayın; %30 teslimde, %30 bitiş onayında, %10 garanti döneminde.' },
];

const SIKLANAN_HATALAR = [
  'Sözleşmesiz çalışmak — tahminler tutmadığında ispat edilemez',
  'Tüm avansı peşin ödemek — iş bırakma riski',
  'Fiyat almadan malzeme satın almak — israf ve uyumsuzluk',
  'Yönetim kurulunu bilgilendirmemek — idari ceza riski',
  'Eski borular/kablolar kontrol etmemek — gizli maliyet',
  'Tadilat sırasında evde oturmak — sağlık ve güvenlik riski',
  'Kaçak tadilat (ruhsatsız) — tapu işlemlerinde sorun çıkarır',
];

const ZAMAN_PLANLAMASI = [
  { sure: '1–3 gün', isler: 'Boya, kapı değişimi, küçük onarımlar' },
  { sure: '1–2 hafta', isler: 'Zemin döşeme, banyo seramiği' },
  { sure: '2–4 hafta', isler: 'Mutfak veya banyo komple renovasyonu' },
  { sure: '1–3 ay', isler: 'Tüm evi kapsayan komple tadilat' },
  { sure: '3–6 ay', isler: 'Yapısal değişiklik, ısı yalıtımı + tüm iç tadilat' },
];

export default function EvTadilatRehberiPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-2 bg-[#00C49F]/20 border border-[#00C49F]/30 text-[#00C49F] text-xs font-bold px-4 py-1.5 rounded-full mb-5">
            <Hammer size={13} /> Tadilat Rehberi
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
            Ev Tadilat Rehberi 2024
          </h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed mb-8">
            Ruhsat gerektiren işler, maliyet tablosu, güvenilir müteahhit seçimi ve sık yapılan hatalar.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-[#00C49F]">6 İşlem</p>
              <p className="text-xs text-gray-400">Ruhsat sınıfı</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-white">8 Kalem</p>
              <p className="text-xs text-gray-400">Maliyet tablosu</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-amber-400">%30</p>
              <p className="text-xs text-gray-400">Maks. avans</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">

        {/* Ruhsat Bilgisi */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm overflow-x-auto">
          <h2 className="text-sm font-black text-gray-900 mb-4">Ruhsat Gerektiren İşler</h2>
          <table className="w-full text-[10px] min-w-[400px]">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-2 font-black text-gray-500">İşlem</th>
                <th className="text-center py-2 font-black text-gray-500">Ruhsat</th>
                <th className="text-left py-2 font-black text-gray-500 pl-3">Not</th>
              </tr>
            </thead>
            <tbody>
              {RUHSAT_BILGISI.map((r, i) => (
                <tr key={i} className="border-b border-gray-50">
                  <td className="py-2 text-gray-800 font-medium">{r.islem}</td>
                  <td className="py-2 text-center">
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded ${r.ruhsat === 'Zorunlu' ? 'bg-rose-50 text-rose-600' : 'bg-[#F0FDF8] text-[#00C49F]'}`}>
                      {r.ruhsat}
                    </span>
                  </td>
                  <td className="py-2 text-gray-500 pl-3">{r.not}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Maliyet Tablosu */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm overflow-x-auto">
          <h2 className="text-sm font-black text-gray-900 mb-4">2024 Tadilat Maliyet Tablosu</h2>
          <table className="w-full text-[10px] min-w-[400px]">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-2 font-black text-gray-500">İşlem</th>
                <th className="text-center py-2 font-black text-gray-500">Birim</th>
                <th className="text-right py-2 font-black text-gray-500">Min</th>
                <th className="text-right py-2 font-black text-gray-500">Max</th>
              </tr>
            </thead>
            <tbody>
              {MALIYET_TAHMINI.map((m, i) => (
                <tr key={i} className="border-b border-gray-50">
                  <td className="py-2 font-medium text-gray-800">{m.islem}</td>
                  <td className="py-2 text-center text-gray-500">{m.birim}</td>
                  <td className="py-2 text-right text-[#00C49F] font-bold">{m.asgariFiyat.toLocaleString('tr-TR')} ₺</td>
                  <td className="py-2 text-right text-gray-700 font-bold">{m.maxFiyat.toLocaleString('tr-TR')} ₺</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-[10px] text-gray-400 mt-2">* Fiyatlar 2024 Eylül itibarıyla tahminidir; bölge ve malzeme kalitesine göre değişir.</p>
        </section>

        {/* Müteahhit Seçimi */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4 flex items-center gap-2">
            <CheckCircle size={14} className="text-[#00C49F]" /> Güvenilir Müteahhit Seçimi
          </h2>
          <div className="space-y-2">
            {MUTTEAHHIT_SECIM.map((k, i) => (
              <div key={i} className="flex items-start gap-3 py-2 border-b border-gray-50 last:border-0">
                <CheckCircle size={12} className="text-[#00C49F] shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-black text-gray-900">{k.kriter}</p>
                  <p className="text-[10px] text-gray-500 mt-0.5">{k.aciklama}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Zaman Planlaması */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4">Süre Tahmini</h2>
          <div className="space-y-2">
            {ZAMAN_PLANLAMASI.map((z, i) => (
              <div key={i} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
                <span className="text-xs font-black text-[#00C49F] w-16 shrink-0">{z.sure}</span>
                <p className="text-xs text-gray-600">{z.isler}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Sık Yapılan Hatalar */}
        <section className="bg-rose-50 rounded-2xl border border-rose-100 p-6">
          <h2 className="text-sm font-black text-rose-800 mb-4 flex items-center gap-2">
            <AlertTriangle size={14} className="text-rose-600" /> Sık Yapılan Hatalar
          </h2>
          <div className="space-y-2">
            {SIKLANAN_HATALAR.map((h, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="text-rose-500 shrink-0 text-xs font-black">✕</span>
                <p className="text-xs text-rose-700 leading-relaxed">{h}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Related */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-4">İlgili Araçlar</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { href: '/tadilat-maliyet-hesaplayici', label: 'Tadilat Maliyet Hesaplayıcı' },
              { href: '/konut-deger-tahmini', label: 'Konut Değer Tahmini' },
              { href: '/ev-satisa-hazirlama', label: 'Evi Satışa Hazırlama' },
              { href: '/enerji-kimlik-belgesi', label: 'Enerji Kimlik Belgesi' },
              { href: '/konut-sigortasi-rehberi', label: 'Konut Sigortası Rehberi' },
              { href: '/insaat-maliyeti', label: 'İnşaat Maliyet Hesaplayıcı' },
            ].map(l => (
              <Link key={l.href} href={l.href}
                className="flex items-center gap-2 p-3 rounded-xl bg-gray-50 hover:bg-[#F0FDF8] border border-transparent hover:border-[#00C49F]/20 transition-all group"
              >
                <ArrowRight size={12} className="text-gray-300 group-hover:text-[#00C49F] transition-colors shrink-0" />
                <span className="text-xs text-gray-700 group-hover:text-[#00C49F] font-medium transition-colors">{l.label}</span>
              </Link>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}
