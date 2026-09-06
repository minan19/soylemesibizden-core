import { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle, AlertTriangle, ArrowRight, Wrench } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Ev Tadilat Rehberi | Maliyet, Müteahhit, İzin | Söylemesi Bizden',
  description:
    'Ev tadilat rehberi: tadilat maliyetleri, müteahhit seçimi, bağımsız bölüm izinleri, ruhsat gereklilikleri ve tadilat bütçesi hazırlama ipuçları.',
};

const TADILAT_MALIYETLERI = [
  { is: 'Badana / Boya (100 m²)', minTutar: 15000, maxTutar: 35000, sure: '3–5 Gün', not: 'Kaliteli boya ve işçilik birlikte; katta 3 kat boya' },
  { is: 'Zemin Kaplama (Laminant)', minTutar: 25000, maxTutar: 60000, sure: '2–4 Gün', not: 'Malzeme + montaj; 100 m² için' },
  { is: 'Seramik Döşeme (50 m²)', minTutar: 20000, maxTutar: 50000, sure: '3–5 Gün', not: 'Banyo + mutfak seramik; orta kalite' },
  { is: 'Mutfak Tadilatı', minTutar: 60000, maxTutar: 200000, sure: '1–2 Hafta', not: 'Dolaplar + tezgah + armatür; komple yenileme' },
  { is: 'Banyo Tadilatı', minTutar: 40000, maxTutar: 120000, sure: '1–2 Hafta', not: 'Komple yenileme; küvet veya duş kabini dahil' },
  { is: 'Elektrik Tesisatı', minTutar: 30000, maxTutar: 80000, sure: '3–7 Gün', not: 'Komple yenileme; 100 m² daire' },
  { is: 'Su Tesisatı', minTutar: 20000, maxTutar: 60000, sure: '2–4 Gün', not: 'Boru değişimi + armatür; komple yenileme' },
  { is: 'Pencere Değişimi (5 adet)', minTutar: 25000, maxTutar: 70000, sure: '1–2 Gün', not: 'PVC veya alüminyum doğrama; montaj dahil' },
];

const MUTEAHHIT_SECIM = [
  { kriter: 'Referans Kontrol', aciklama: 'En az 3 tamamlanmış iş referansı isteyin; müşterileri arayarak memnuniyet ve zamanında teslim bilgilerini alın.' },
  { kriter: 'Yazılı Sözleşme', aciklama: 'Tüm işlerin kapsamını, malzeme listesini, toplam bedeli, ödeme takvimini ve teslim tarihini içeren yazılı sözleşme imzalayın.' },
  { kriter: 'Malzeme Belirtimi', aciklama: 'Kullanılacak malzemelerin marka, model ve teknik özelliklerini sözleşmede belirtin; belirsizlik ileride anlaşmazlığa yol açar.' },
  { kriter: 'Ödeme Takvimi', aciklama: 'Toplam bedelin en fazla %20–30\'unu başlangıçta, geri kalanını iş aşamalarına göre ödeyin; tamamını peşin vermeyin.' },
  { kriter: 'Sigorta ve SGK', aciklama: 'Müteahhitin işçileri için sigortalı çalışma zorunludur; işçi kazasında mal sahibi sorumlu tutulabilir.' },
];

const IZIN_GEREKTIREN_ISLER = [
  { is: 'Taşıyıcı Duvar Yıkımı', izin: 'Zorunlu', aciklama: 'Taşıyıcı duvar, kolon veya kiriş değişikliği için belediyeden yazılı izin ve statik proje onayı gerekir.' },
  { is: 'Kat Planı Değişikliği', izin: 'Zorunlu', aciklama: 'Bağımsız bölümün iç planını değiştirmek (kapı yeri, oda sayısı) belediye onayı gerektirebilir.' },
  { is: 'Cephe Değişikliği', izin: 'Zorunlu', aciklama: 'Pencere boyutu, balkon kapatma veya cephe rengi gibi değişiklikler site yönetimi ve belediye onayına tabidir.' },
  { is: 'Komşu Duvarına Müdahale', izin: 'Zorunlu', aciklama: 'Ortak duvar veya komşu mülküne sınırda yapılan işler için komşunun onayı gerekir.' },
  { is: 'Boya / Döşeme / Armatür', izin: 'Gereksiz', aciklama: 'Yalnızca estetik değişiklikler (boya, laminant, seramik, armatür) için izin gerekmez.' },
];

const BUTCE_IPUCLARI = [
  { ipucu: 'Gizli Maliyetleri Hesaplayın', aciklama: 'Tadilat sırasında çıkan sürpriz hasarlar (eski boru, çürük ahşap, nemli sıva) bütçenizi %20–30 aşırabilir; baştan tampon koyun.' },
  { ipucu: 'Önce Tasarım Yapın', aciklama: 'Tadilata başlamadan iç mimar veya tasarımcıyla çalışmak; sık yön değiştirme ve ekstra maliyet riskini azaltır.' },
  { ipucu: 'Malzemeyi Siz Alın', aciklama: 'Mümkünse malzemeleri kendiniz temin edip montajı müteahhide bırakmak; hem kalite kontrolü sağlar hem de maliyet avantajı yaratabilir.' },
  { ipucu: 'Sezon Planlaması', aciklama: 'Usta ve malzeme fiyatları yaz sezonunda yükselir; kış aylarında tadilat yaptırmak %10–20 tasarruf sağlayabilir.' },
];

export default function EvTadilatRehberiPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-2 bg-[#00C49F]/20 border border-[#00C49F]/30 text-[#00C49F] text-xs font-bold px-4 py-1.5 rounded-full mb-5">
            <Wrench size={13} /> Ev Tadilat
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
            Ev Tadilat Rehberi
          </h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed mb-8">
            Tadilat maliyetleri, müteahhit seçim kriterleri, izin gerektiren işler ve bütçe hazırlama ipuçları.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-[#00C49F]">8 İş</p>
              <p className="text-xs text-gray-400">Fiyat tablosu</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-white">%20–30</p>
              <p className="text-xs text-gray-400">Tampon bütçe önerisi</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-amber-400">Yazılı</p>
              <p className="text-xs text-gray-400">Sözleşme zorunluluğu</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">

        {/* Maliyet Tablosu */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm overflow-x-auto">
          <h2 className="text-sm font-black text-gray-900 mb-4">2025 Tadilat Maliyet Tablosu</h2>
          <table className="w-full text-[10px] min-w-[500px]">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-2 font-black text-gray-500">Tadilat İşi</th>
                <th className="text-right py-2 font-black text-gray-500">Min. Tutar</th>
                <th className="text-right py-2 font-black text-[#00C49F]">Maks. Tutar</th>
                <th className="text-right py-2 font-black text-amber-500">Süre</th>
              </tr>
            </thead>
            <tbody>
              {TADILAT_MALIYETLERI.map((t, i) => (
                <tr key={i} className="border-b border-gray-50 last:border-0">
                  <td className="py-2 font-black text-gray-900 pr-2">{t.is}</td>
                  <td className="py-2 text-right font-bold text-gray-600">{t.minTutar.toLocaleString('tr-TR')} ₺</td>
                  <td className="py-2 text-right font-black text-[#00C49F]">{t.maxTutar.toLocaleString('tr-TR')} ₺</td>
                  <td className="py-2 text-right font-bold text-amber-500">{t.sure}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-[9px] text-gray-400 mt-2">*Fiyatlar 2025 itibarıyla tahmini olup bölge, malzeme kalitesi ve işçilik koşullarına göre değişir.</p>
        </section>

        {/* Müteahhit Seçimi */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Müteahhit Seçim Kriterleri</h2>
          <div className="space-y-3">
            {MUTEAHHIT_SECIM.map((k, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
                <div className="flex items-start gap-2 mb-1">
                  <div className="w-5 h-5 rounded-full bg-[#00C49F] text-white text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5">{i + 1}</div>
                  <p className="text-xs font-black text-gray-900">{k.kriter}</p>
                </div>
                <p className="text-[10px] text-gray-600 leading-relaxed ml-7">{k.aciklama}</p>
              </div>
            ))}
          </div>
        </section>

        {/* İzin Gerektiren İşler */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm overflow-x-auto">
          <h2 className="text-sm font-black text-gray-900 mb-4">İzin Gerektiren İşler</h2>
          <table className="w-full text-[10px] min-w-[380px]">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-2 font-black text-gray-500">İş Türü</th>
                <th className="text-center py-2 font-black text-gray-500">İzin</th>
                <th className="text-left py-2 font-black text-gray-500">Açıklama</th>
              </tr>
            </thead>
            <tbody>
              {IZIN_GEREKTIREN_ISLER.map((iz, i) => (
                <tr key={i} className="border-b border-gray-50 last:border-0">
                  <td className="py-2 font-black text-gray-900">{iz.is}</td>
                  <td className="py-2 text-center">
                    <span className={`text-[9px] font-black px-2 py-0.5 rounded ${iz.izin === 'Zorunlu' ? 'bg-rose-50 text-rose-600' : 'bg-emerald-50 text-emerald-600'}`}>{iz.izin}</span>
                  </td>
                  <td className="py-2 text-gray-600">{iz.aciklama}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Bütçe İpuçları */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4 flex items-center gap-2">
            <CheckCircle size={14} className="text-[#00C49F]" /> Bütçe ve Planlama İpuçları
          </h2>
          <div className="space-y-3">
            {BUTCE_IPUCLARI.map((b, i) => (
              <div key={i} className="grid grid-cols-3 gap-2 py-2 border-b border-gray-50 last:border-0">
                <p className="text-xs font-black text-[#00C49F]">{b.ipucu}</p>
                <p className="text-[10px] text-gray-600 leading-relaxed col-span-2">{b.aciklama}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Uyarı */}
        <section className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
          <AlertTriangle size={14} className="text-amber-600 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-800 leading-relaxed">
            <span className="font-black">Uyarı:</span> Taşıyıcı elemanlara müdahale eden tadilatlar için mutlaka inşaat mühendisi onaylı proje alın. İzinsiz yapılan değişiklikler hem güvenlik riski oluşturur hem de binayı sigorta dışı bırakabilir.
          </p>
        </section>

        {/* Related */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-4">İlgili Araçlar</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { href: '/insaat-maliyeti', label: 'İnşaat Maliyeti Hesaplayıcı' },
              { href: '/tadilat-maliyet-hesaplayici', label: 'Tadilat Maliyet Hesaplayıcı' },
              { href: '/konut-sigortasi-rehberi', label: 'Konut Sigortası Rehberi' },
              { href: '/yeni-konut-projeleri', label: 'Yeni Konut Projeleri' },
              { href: '/ev-satisa-hazirlama', label: 'Evinizi Satışa Hazırlama' },
              { href: '/rehber', label: 'Konut Rehberi' },
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
