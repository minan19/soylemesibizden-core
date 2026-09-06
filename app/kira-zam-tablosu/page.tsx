import { Metadata } from 'next';
import Link from 'next/link';
import { AlertTriangle, ArrowRight, TrendingUp } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Kira Zam Tablosu 2024 | TÜİK TÜFE Kira Artış Oranları | Söylemesi Bizden',
  description:
    'TÜİK TÜFE verilerine göre yasal kira artış oranları, %25 tavan uygulaması, konut ve işyeri için aylık kira zam tablosu ve hesaplama yöntemi.',
};

// 2024 yılı aylık TÜFE 12 aylık ortalamaları (TÜİK verileri baz alındı)
const KIRA_ARTIS_TABLOSU = [
  { ay: 'Ocak 2024', tufe12Ay: 64.77, tavan: 25.00, uygulanacak: 25.00 },
  { ay: 'Şubat 2024', tufe12Ay: 67.07, tavan: 25.00, uygulanacak: 25.00 },
  { ay: 'Mart 2024', tufe12Ay: 68.50, tavan: 25.00, uygulanacak: 25.00 },
  { ay: 'Nisan 2024', tufe12Ay: 69.80, tavan: 25.00, uygulanacak: 25.00 },
  { ay: 'Mayıs 2024', tufe12Ay: 71.60, tavan: 25.00, uygulanacak: 25.00 },
  { ay: 'Haziran 2024', tufe12Ay: 71.59, tavan: 25.00, uygulanacak: 25.00 },
  { ay: 'Temmuz 2024', tufe12Ay: 69.80, tavan: 25.00, uygulanacak: 25.00 },
  { ay: 'Ağustos 2024', tufe12Ay: 62.30, tavan: 25.00, uygulanacak: 25.00 },
  { ay: 'Eylül 2024', tufe12Ay: 49.38, tavan: 25.00, uygulanacak: 25.00 },
  { ay: 'Ekim 2024', tufe12Ay: 40.56, tavan: 25.00, uygulanacak: 25.00 },
  { ay: 'Kasım 2024', tufe12Ay: 36.12, tavan: 25.00, uygulanacak: 25.00 },
  { ay: 'Aralık 2024', tufe12Ay: 44.38, tavan: 25.00, uygulanacak: 25.00 },
];

// 2025 verileri (tahmini/resmi açıklanmış oranlar)
const ARTIS_2025 = [
  { ay: 'Ocak 2025', tufe12Ay: 42.12, tavan: 25.00, uygulanacak: 25.00 },
  { ay: 'Şubat 2025', tufe12Ay: 39.05, tavan: 25.00, uygulanacak: 25.00 },
  { ay: 'Mart 2025', tufe12Ay: 38.10, tavan: 25.00, uygulanacak: 25.00 },
];

const HESAPLAMA_ORNEKLERI = [
  { kiraTuru: 'Konut Kirası', mevcutKira: 15000, zamOrani: 25, yeniKira: 18750, aciklama: '%25 yasal tavan uygulaması ile 3.750 ₺ artış' },
  { kiraTuru: 'Konut Kirası', mevcutKira: 30000, zamOrani: 25, yeniKira: 37500, aciklama: '%25 yasal tavan ile 7.500 ₺ artış' },
  { kiraTuru: 'İşyeri Kirası', mevcutKira: 25000, zamOrani: 44.38, yeniKira: 36095, aciklama: 'Aralık 2024 TÜFE 12 aylık ortalaması ile artış' },
];

const YASAL_CERCEVE = [
  { konu: 'Konut İçin %25 Tavan', aciklama: '7409 sayılı Kanun ile getirilen tavan düzenlemesi: Konut kira sözleşmelerinde kira artışı TÜFE 12 aylık ortalamasını aşamaz; TÜFE %25\'ten yüksekse tavan %25 uygulanır. Bu düzenleme uzatılarak devam etmektedir.' },
  { konu: 'İşyeri Kirası', aciklama: 'İşyeri kira sözleşmelerinde tavan düzenlemesi uygulanmaz; artış oranı taraflarca serbestçe kararlaştırılır veya TÜFE\'ye endekslenir.' },
  { konu: 'Artış Dönemi', aciklama: 'Kira artışı yalnızca sözleşmenin yıl dönümünde yapılabilir; ara dönem artışı hukuken geçersizdir (kiracı kabul etmediği sürece).' },
  { konu: 'Tespit Davası', aciklama: 'Taraflar kira artışında anlaşamazsa sulh hukuk mahkemesine kira tespit davası açılabilir; mahkeme TÜFE\'yi baz alarak karar verir.' },
];

export default function KiraZamTablosuPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-2 bg-[#00C49F]/20 border border-[#00C49F]/30 text-[#00C49F] text-xs font-bold px-4 py-1.5 rounded-full mb-5">
            <TrendingUp size={13} /> Kira Zam Tablosu
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
            Kira Zam Tablosu 2024–2025
          </h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed mb-8">
            TÜİK TÜFE 12 aylık ortalamasına göre aylık yasal kira artış oranları, %25 konut tavan uygulaması ve hesaplama örnekleri.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-[#00C49F]">%25</p>
              <p className="text-xs text-gray-400">Konut kira tavanı</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-white">TÜFE</p>
              <p className="text-xs text-gray-400">12 aylık ortalama baz</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-amber-400">7409</p>
              <p className="text-xs text-gray-400">Kanun numarası</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">

        {/* 2024 Tablo */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm overflow-x-auto">
          <h2 className="text-sm font-black text-gray-900 mb-4">2024 Kira Artış Oranları</h2>
          <table className="w-full text-[10px] min-w-[400px]">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-2 font-black text-gray-500">Ay</th>
                <th className="text-right py-2 font-black text-gray-500">TÜFE 12 Ay Ort.</th>
                <th className="text-right py-2 font-black text-amber-600">Konut Tavan</th>
                <th className="text-right py-2 font-black text-[#00C49F]">Konut Kira Artışı</th>
              </tr>
            </thead>
            <tbody>
              {KIRA_ARTIS_TABLOSU.map((r, i) => (
                <tr key={i} className="border-b border-gray-50 last:border-0">
                  <td className="py-2 font-black text-gray-900">{r.ay}</td>
                  <td className="py-2 text-right font-bold text-gray-600">%{r.tufe12Ay.toFixed(2)}</td>
                  <td className="py-2 text-right font-bold text-amber-500">%{r.tavan.toFixed(2)}</td>
                  <td className="py-2 text-right font-black text-[#00C49F]">%{r.uygulanacak.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* 2025 Tablo */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm overflow-x-auto">
          <h2 className="text-sm font-black text-gray-900 mb-4">2025 Kira Artış Oranları (Güncel)</h2>
          <table className="w-full text-[10px] min-w-[400px]">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-2 font-black text-gray-500">Ay</th>
                <th className="text-right py-2 font-black text-gray-500">TÜFE 12 Ay Ort.</th>
                <th className="text-right py-2 font-black text-amber-600">Konut Tavan</th>
                <th className="text-right py-2 font-black text-[#00C49F]">Konut Kira Artışı</th>
              </tr>
            </thead>
            <tbody>
              {ARTIS_2025.map((r, i) => (
                <tr key={i} className="border-b border-gray-50 last:border-0">
                  <td className="py-2 font-black text-gray-900">{r.ay}</td>
                  <td className="py-2 text-right font-bold text-gray-600">%{r.tufe12Ay.toFixed(2)}</td>
                  <td className="py-2 text-right font-bold text-amber-500">%{r.tavan.toFixed(2)}</td>
                  <td className="py-2 text-right font-black text-[#00C49F]">%{r.uygulanacak.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Hesaplama Örnekleri */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm overflow-x-auto">
          <h2 className="text-sm font-black text-gray-900 mb-4">Hesaplama Örnekleri</h2>
          <table className="w-full text-[10px] min-w-[480px]">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-2 font-black text-gray-500">Kira Türü</th>
                <th className="text-right py-2 font-black text-gray-500">Mevcut Kira</th>
                <th className="text-right py-2 font-black text-amber-600">Zam %</th>
                <th className="text-right py-2 font-black text-[#00C49F]">Yeni Kira</th>
              </tr>
            </thead>
            <tbody>
              {HESAPLAMA_ORNEKLERI.map((h, i) => (
                <tr key={i} className="border-b border-gray-50 last:border-0">
                  <td className="py-2 font-black text-gray-900">{h.kiraTuru}</td>
                  <td className="py-2 text-right font-bold text-gray-600">{h.mevcutKira.toLocaleString('tr-TR')} ₺</td>
                  <td className="py-2 text-right font-bold text-amber-500">%{h.zamOrani}</td>
                  <td className="py-2 text-right font-black text-[#00C49F]">{h.yeniKira.toLocaleString('tr-TR')} ₺</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Yasal Çerçeve */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Yasal Çerçeve</h2>
          <div className="space-y-3">
            {YASAL_CERCEVE.map((y, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
                <p className="text-xs font-black text-[#00C49F] mb-1">{y.konu}</p>
                <p className="text-[10px] text-gray-600 leading-relaxed">{y.aciklama}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Uyarı */}
        <section className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
          <AlertTriangle size={14} className="text-amber-600 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-800 leading-relaxed">
            <span className="font-black">Önemli:</span> TÜFE oranları TÜİK tarafından her ay güncellenir. %25 konut tavan düzenlemesi yürürlükte olduğu sürece aylık artış %25 ile sınırlıdır. Düzenleme kaldırılırsa TÜFE oranları geçerli olacaktır. Güncel verileri TÜİK ve Hazine & Maliye Bakanlığı sitelerinden takip ediniz.
          </p>
        </section>

        {/* Related */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-4">İlgili Araçlar</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { href: '/kira-artis-hesaplama', label: 'Kira Artış Hesaplayıcı' },
              { href: '/kira-simulatoru', label: 'Kira Simülatörü' },
              { href: '/kiraci-haklari', label: 'Kiracı Hakları Rehberi' },
              { href: '/mal-sahibi-haklari', label: 'Mal Sahibi Hakları Rehberi' },
              { href: '/kira-sozlesmesi-hazirlama', label: 'Kira Sözleşmesi Hazırlama' },
              { href: '/kira-geliri-vergisi', label: 'Kira Geliri Vergisi Hesaplayıcı' },
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
