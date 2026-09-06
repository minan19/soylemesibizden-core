import { Metadata } from 'next';
import Link from 'next/link';
import {
  Building2, CheckCircle, AlertTriangle, ArrowRight, Scale, FileText, Home,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Kentsel Dönüşüm Rehberi | Riskli Yapı, Hak Sahipliği, Süreç | Söylemesi Bizden',
  description:
    'Kentsel dönüşüm nedir, riskli yapı tespiti, kat mülkiyeti iptali, hak sahipliği, kira yardımı ve hukuki süreç.',
};

const DONUSUM_TURLERI = [
  {
    tip: 'Riskli Yapı Dönüşümü',
    aciklama: 'Deprem veya yapısal risk raporu alan binanın yıkılarak yeniden inşa edilmesi.',
    dayanak: '6306 sayılı Afet Riski Altındaki Alanların Dönüştürülmesi Hakkında Kanun',
    oran: '%2/3 çoğunluk yeter',
    sure: '18–36 ay',
  },
  {
    tip: 'Riskli Alan Dönüşümü',
    aciklama: 'Bakanlıkça riskli ilan edilen geniş bölgelerdeki tüm yapıların toplu dönüşümü.',
    dayanak: 'Bakanlar Kurulu kararnamesi ile riskli alan tescili',
    oran: 'Zorunlu (bireysel onay aranmaz)',
    sure: '24–60 ay',
  },
  {
    tip: 'Rezerv Yapı Alanı',
    aciklama: 'Riskli alan sakinlerinin geçici iskânı için ayrılan alan; yeni konut projeleri yapılır.',
    dayanak: 'Bakanlık onayı ile ilan',
    oran: 'Bakanlık kararı',
    sure: '12–24 ay',
  },
];

const SUREC_ADIMLARI = [
  {
    adim: 'Riskli Yapı Tespiti',
    detay: 'Lisanslı kuruluşa başvuru (ücretli). Rapor bakanlığa iletilir; itiraz süresi 15 gün.',
  },
  {
    adim: 'Tapu Kaydı',
    detay: 'Tapu müdürlüğü "riskli yapı" şerhi düşer; satış kısıtlaması başlar.',
  },
  {
    adim: 'Kat Malikleri Kararı',
    detay: 'Malikler toplantısı: 2/3 çoğunluk onayı aranır. Yüklenici veya kendi kendine yenileme seçimi.',
  },
  {
    adim: 'Yıkım Kararı',
    detay: 'Çoğunluk sağlanamazsa idare 60 günde re\'sen yıkım yapabilir.',
  },
  {
    adim: 'Kira / Taşınma Yardımı',
    detay: 'Boşaltma süresince aylık kira yardımı (Bakanlık tarifesi; 2024 için bölgeye göre 5.000–15.000 ₺/ay).',
  },
  {
    adim: 'İnşaat ve Teslim',
    detay: 'Yeniden inşa; hak sahiplerine yeni/renovasyon bağımsız bölüm tescil edilir.',
  },
];

const HAK_SAHIPLIGI = [
  { grup: 'Malik', hak: 'Yeni bağımsız bölüm hakkı — arsa payı oranında.' },
  { grup: 'Kiracı', hak: 'Kiracılar tahliyeye uymak zorunda; kira yardımı olmaz, tazminat kiracıdan değil malikten talep edilir.' },
  { grup: 'İpotek / Haciz', hak: 'Tapu şerhleri yeni yapıya geçer; alacaklı hakları korunur.' },
  { grup: 'Taşınmaz Vakfı', hak: 'Vakıf mallarında Vakıflar Genel Müdürlüğü onayı şarttır.' },
  { grup: '%1/3 Azınlık', hak: '2/3 kararı aldıktan sonra direnenler: payları bakanlık aracılığıyla pazarlık + bedel üzerinden alınır.' },
];

const YARDIMLAR = [
  { kalem: 'Kira Yardımı', miktar: 'Bölgeye göre 5.000–15.000 ₺/ay (en fazla 18 ay)', kosul: 'Yapıyı süresinde boşaltmak' },
  { kalem: 'Taşınma Yardımı', miktar: 'Tek seferlik yakl. 10.000–20.000 ₺', kosul: 'Malik veya kiracı; 60 gün içinde boşaltma' },
  { kalem: 'Faiz Desteği', miktar: 'Kentsel dönüşüm konut kredisine %3–5 faiz desteği', kosul: 'Bakanlıktan onaylı kredi kullanımı' },
  { kalem: 'KDV İstisnası', miktar: 'Teslimde %1 KDV (normal %4 yerine)', kosul: '150 m² altı konut, ilk 5 yıl satışı' },
];

const RISKLER = [
  { risk: 'Geçici Konut Sorunu', onlem: 'Kira yardımı başlamadan önce boşaltma notifi alınır; hemen alternatif kiralık aranmalı.' },
  { risk: 'Yüklenici Seçimi', onlem: 'Kat karşılığı sözleşme noter onaylı olmalı; teminat mektubu + iş bitirme belgesi şart.' },
  { risk: 'Arsa Payı Adaletsizliği', onlem: 'Eski tapularda arsa payı dağılımı bozuk olabilir; dönüşüm öncesi düzeltme davası.' },
  { risk: '2/3 Çoğunluk Sağlanamaz', onlem: 'Uzlaşı süreci + idari başvuru; bakanlık arabuluculuğu talep edilebilir.' },
  { risk: 'İnşaat Gecikmesi', onlem: 'Sözleşmeye gecikmede günlük ceza (kira bedeli) eklenmelidir.' },
];

const KONTROL_LISTESI = [
  'Lisanslı kuruluş raporu (bakanlık listesinden kontrol)',
  'Kat malikleri kurulu toplantı tutanağı',
  'Yüklenici referansları ve teminat mektubu',
  'Kat karşılığı sözleşme (noter + tapu şerhi)',
  'Kira yardımı başvurusu (bakanlık e-dönüşüm portalı)',
  'Arsa payı kontrolü (tapu kaydı + beyan)',
  'KDV istisnası uygulanacaksa boyut kontrolü (≤150 m²)',
];

export default function KentselDonusumPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-2 bg-[#00C49F]/20 border border-[#00C49F]/30 text-[#00C49F] text-xs font-bold px-4 py-1.5 rounded-full mb-5">
            <Building2 size={13} /> Kentsel Dönüşüm Rehberi
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
            Kentsel Dönüşüm Rehberi
          </h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed mb-8">
            Riskli yapı tespitinden yıkım, kira yardımı ve yeni bağımsız bölüm tesciline kadar tüm süreç.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-[#00C49F]">2/3</p>
              <p className="text-xs text-gray-400">Çoğunluk eşiği</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-white">6306</p>
              <p className="text-xs text-gray-400">Kanun numarası</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-amber-400">18 Ay</p>
              <p className="text-xs text-gray-400">Max kira yardımı</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">

        {/* Dönüşüm Türleri */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Dönüşüm Türleri</h2>
          <div className="space-y-4">
            {DONUSUM_TURLERI.map((d, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <p className="text-xs font-black text-gray-900">{d.tip}</p>
                  <div className="flex gap-2 shrink-0">
                    <span className="text-[10px] bg-[#F0FDF8] text-[#00C49F] font-bold px-2 py-0.5 rounded-full">{d.sure}</span>
                  </div>
                </div>
                <p className="text-[10px] text-gray-600 mb-3 leading-relaxed">{d.aciklama}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="bg-blue-50 rounded-lg p-2">
                    <p className="text-[10px] text-blue-600 font-bold mb-0.5">Yasal Dayanak</p>
                    <p className="text-[10px] text-gray-600">{d.dayanak}</p>
                  </div>
                  <div className="bg-amber-50 rounded-lg p-2">
                    <p className="text-[10px] text-amber-600 font-bold mb-0.5">Karar Eşiği</p>
                    <p className="text-[10px] text-gray-600">{d.oran}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Süreç */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Adım Adım Süreç</h2>
          <div className="space-y-3">
            {SUREC_ADIMLARI.map((s, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm flex items-start gap-3">
                <div className="bg-[#F0FDF8] text-[#00C49F] text-[10px] font-black px-2 py-1 rounded-lg shrink-0">{i + 1}</div>
                <div>
                  <p className="text-xs font-black text-gray-900 mb-0.5">{s.adim}</p>
                  <p className="text-[10px] text-gray-600 leading-relaxed">{s.detay}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Hak Sahipliği */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Hak Sahipliği</h2>
          <div className="space-y-3">
            {HAK_SAHIPLIGI.map((h, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm flex items-start gap-3">
                <Scale size={13} className="text-blue-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-black text-gray-900 mb-0.5">{h.grup}</p>
                  <p className="text-[10px] text-gray-600 leading-relaxed">{h.hak}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Yardımlar */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Devlet Yardımları ve Destekler</h2>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <table className="w-full text-xs">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left px-4 py-3 font-black text-gray-700">Kalem</th>
                  <th className="text-left px-4 py-3 font-black text-gray-700">Miktar</th>
                  <th className="text-left px-4 py-3 font-black text-gray-500">Koşul</th>
                </tr>
              </thead>
              <tbody>
                {YARDIMLAR.map((y, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-4 py-3 font-bold text-gray-800">{y.kalem}</td>
                    <td className="px-4 py-3 text-[#00C49F] font-bold">{y.miktar}</td>
                    <td className="px-4 py-3 text-gray-500 leading-relaxed">{y.kosul}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Riskler */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Riskler ve Önlemler</h2>
          <div className="space-y-3">
            {RISKLER.map((r, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                <div className="flex items-start gap-2 mb-1">
                  <AlertTriangle size={12} className="text-amber-500 shrink-0 mt-0.5" />
                  <p className="text-xs font-black text-gray-900">{r.risk}</p>
                </div>
                <p className="text-[10px] text-gray-600 leading-relaxed ml-5">{r.onlem}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Kontrol Listesi */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4 flex items-center gap-2">
            <CheckCircle size={14} className="text-[#00C49F]" /> Kontrol Listesi
          </h2>
          <div className="space-y-2">
            {KONTROL_LISTESI.map((item, i) => (
              <div key={i} className="flex items-start gap-2">
                <div className="w-4 h-4 rounded border-2 border-[#00C49F]/40 shrink-0 mt-0.5" />
                <p className="text-xs text-gray-700">{item}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Warning */}
        <section className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
          <AlertTriangle size={14} className="text-amber-600 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-800 leading-relaxed">
            <span className="font-black">Önemli:</span> Kentsel dönüşüm sürecinde yüklenici sözleşmesi ve arsa payı oranları kritik hukuki belgelerdir. İmzalamadan önce mutlaka bir gayrimenkul avukatından görüş alınız.
          </p>
        </section>

        {/* Related */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-4">İlgili Rehberler</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { href: '/deprem-riski', label: 'Deprem Riski Rehberi' },
              { href: '/kat-karsiligi', label: 'Kat Karşılığı Rehberi' },
              { href: '/kat-mulkiyeti', label: 'Kat Mülkiyeti Rehberi' },
              { href: '/tapu-devir-sureci', label: 'Tapu Devir Süreci' },
              { href: '/ortak-mulkiyet', label: 'Ortak Mülkiyet Rehberi' },
              { href: '/imar-durumu', label: 'İmar Durumu Rehberi' },
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
