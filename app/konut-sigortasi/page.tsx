import { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck, CheckCircle, AlertTriangle, ArrowRight, Scale,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Konut Sigortası Rehberi | DASK, Teminatlar, Hasar | Söylemesi Bizden',
  description:
    'DASK zorunlu deprem sigortası ve isteğe bağlı konut sigortası: teminatlar, prim hesabı, hasar bildirimi ve sigorta seçim rehberi.',
};

const SIGORTA_TURLERI = [
  {
    tip: 'DASK — Zorunlu Deprem Sigortası',
    zorunlu: true,
    aciklama: 'Tapuya kayıtlı konutlar için yasal zorunluluk. Deprem kaynaklı hasarları karşılar.',
    teminat: 'Yapı hasarı — maksimum 640.000 ₺ (2024)',
    karsilanmaz: 'Eşya, kira kaybı, can/yaralanma teminatı yok.',
    sure: 'Yıllık; tapu devri sırasında yenilenmesi gerekir.',
  },
  {
    tip: 'İsteğe Bağlı Konut Sigortası',
    zorunlu: false,
    aciklama: 'DASK\'ın kapsamadığı riskler ile eşya, sorumluluk ve kira geliri kayıplarını güvence altına alır.',
    teminat: 'Yangın, su baskını, hırsızlık, cam kırılması, eşya, sorumluluk.',
    karsilanmaz: 'Kasıtlı hasar, savaş, nükleer risk.',
    sure: 'Yıllık; online veya sigorta acente aracılığıyla.',
  },
  {
    tip: 'Ferdi Kaza / Can Sigortası',
    zorunlu: false,
    aciklama: 'Konut sigortasına ek veya ayrı; kaza sonucu ölüm veya sakatlık tazminatı.',
    teminat: 'Ölüm, kalıcı sakatlık, hastane gündeliği.',
    karsilanmaz: 'Mevcut hastalık, intihar, ehliyetsiz araç kullanımı.',
    sure: 'Yıllık veya kampanya dönemleri.',
  },
];

const TEMINAT_DETAY = [
  { teminat: 'Yangın', dask: false, konut: true, aciklama: 'Konut ve içeriği; eşya teminatı ayrıca belirlenir.' },
  { teminat: 'Deprem', dask: true, konut: true, aciklama: 'DASK yapı için zorunlu; eşya için konut sigortasına ek teminat.' },
  { teminat: 'Su Baskını', dask: false, konut: true, aciklama: 'Dışarıdan gelen su ve borulama hasarı.' },
  { teminat: 'Hırsızlık', dask: false, konut: true, aciklama: 'Kırma, zorla giriş sonucu eşya kaybı.' },
  { teminat: 'Cam Kırılması', dask: false, konut: true, aciklama: 'Pencere, cam bölme, çift cam.' },
  { teminat: 'Üçüncü Şahıs Sorumluluk', dask: false, konut: true, aciklama: 'Komşu veya misafire verilen zarar.' },
  { teminat: 'Kira Kaybı', dask: false, konut: true, aciklama: 'Hasar nedeniyle kullanılamayan konutta kira geliri kaybı.' },
  { teminat: 'Elektronik Cihaz', dask: false, konut: false, aciklama: 'Ek paket gerektirir; cep telefonu, laptop.' },
];

const HASAR_SURECI = [
  { adim: 'Hasarı Fotoğraflayın', detay: 'Müdahale öncesi mutlaka belgeleme. Ek hasar oluşmaması için gerekli tedbirleri alın.' },
  { adim: 'Sigorta Şirketi Bildirimi', detay: '24 saat içinde sigorta şirketine veya DASK için TCIP\'e telefonla başvuru.' },
  { adim: 'Eksper İnclemesi', detay: 'Hasar eksperi randevu alarak mahalline gelir; tespiti onaylatın.' },
  { adim: 'Belge Teslimi', detay: 'Poliçe, tapu, nüfus cüzdanı, hasar belgesi, fatura. Eksik belge süreyi uzatır.' },
  { adim: 'Tazminat Ödemesi', detay: 'Onaylanan hasar dosyası 15 iş günü içinde ödenir. İtiraz hakkı mevcuttur.' },
];

const PRIM_FAKTORU = [
  { faktör: 'Yapı Yaşı', etki: 'Eski yapı → yüksek prim. 20+ yaş %20–40 artış.' },
  { faktör: 'Konum / Deprem Bölgesi', etki: '1. derece deprem bölgesi %30–60 prim farkı.' },
  { faktör: 'Yapı Türü', etki: 'Betonarme en düşük prim; çelik ve ahşap daha yüksek.' },
  { faktör: 'Sigortalı Değer', etki: 'Eksik sigorta → hasar oransal karşılanır (hantaj kuralı).' },
  { faktör: 'Hasarsızlık İndirimi', etki: 'Her hasarsız yıl için %5–10 indirim imkânı.' },
  { faktör: 'Muafiyet Seçimi', etki: 'Yüksek muafiyet → düşük prim ama küçük hasarlar kapsam dışı.' },
];

const IPUCLARI = [
  'DASK poliçesi olmayan konuta isteğe bağlı sigorta yaptırılamaz — önce DASK.',
  'Beyan edilen inşaat m² değeri gerçek maliyetle örtüşmeli; düşük beyan tazminatı kısar.',
  'Kira ile oturuyorsanız, eşyalarınız için kiracı paketi (içerik sigortası) düşünün.',
  'Poliçe yenileme zamanında yapılmazsa 1 günlük boşlukta bile hasar kapsam dışı kalabilir.',
  'Sigorta şirketi seçiminde Sigorta Bilgi ve Gözetim Merkezi\'nin (SBM) ödeme gücü raporuna bakın.',
];

export default function KonutSigortasiPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-2 bg-[#00C49F]/20 border border-[#00C49F]/30 text-[#00C49F] text-xs font-bold px-4 py-1.5 rounded-full mb-5">
            <ShieldCheck size={13} /> Konut Sigortası Rehberi
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
            Konut Sigortası Rehberi
          </h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed mb-8">
            DASK zorunlu deprem sigortasından isteğe bağlı konut poliçesine — teminatlar, hasar süreci ve akıllı sigorta seçimi.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-[#00C49F]">640K₺</p>
              <p className="text-xs text-gray-400">Max DASK teminatı</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-white">24s</p>
              <p className="text-xs text-gray-400">Hasar bildirim süresi</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-amber-400">15 Gün</p>
              <p className="text-xs text-gray-400">Tazminat ödeme süresi</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">

        {/* Sigorta Türleri */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Sigorta Türleri</h2>
          <div className="space-y-4">
            {SIGORTA_TURLERI.map((s, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <p className="text-xs font-black text-gray-900">{s.tip}</p>
                  {s.zorunlu && (
                    <span className="text-[9px] bg-rose-100 text-rose-600 font-bold px-2 py-0.5 rounded-full">ZORUNLU</span>
                  )}
                </div>
                <p className="text-[10px] text-gray-600 mb-3 leading-relaxed">{s.aciklama}</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <div className="bg-[#F0FDF8] rounded-lg p-2">
                    <p className="text-[10px] text-[#00C49F] font-bold mb-0.5">Teminat</p>
                    <p className="text-[10px] text-gray-600">{s.teminat}</p>
                  </div>
                  <div className="bg-rose-50 rounded-lg p-2">
                    <p className="text-[10px] text-rose-600 font-bold mb-0.5">Karşılanmaz</p>
                    <p className="text-[10px] text-gray-600">{s.karsilanmaz}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-2">
                    <p className="text-[10px] text-gray-500 font-bold mb-0.5">Süre</p>
                    <p className="text-[10px] text-gray-600">{s.sure}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Teminat Karşılaştırma */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Teminat Karşılaştırması</h2>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <table className="w-full text-xs">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left px-4 py-3 font-black text-gray-700">Teminat</th>
                  <th className="text-center px-4 py-3 font-black text-gray-700">DASK</th>
                  <th className="text-center px-4 py-3 font-black text-gray-700">Konut</th>
                  <th className="text-left px-4 py-3 font-black text-gray-500">Not</th>
                </tr>
              </thead>
              <tbody>
                {TEMINAT_DETAY.map((t, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-4 py-3 font-bold text-gray-800">{t.teminat}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={t.dask ? 'text-[#00C49F]' : 'text-gray-300'}>{t.dask ? '✓' : '—'}</span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={t.konut ? 'text-[#00C49F]' : 'text-gray-300'}>{t.konut ? '✓' : '—'}</span>
                    </td>
                    <td className="px-4 py-3 text-gray-500 leading-relaxed">{t.aciklama}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Hasar Süreci */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Hasar Bildirim Süreci</h2>
          <div className="space-y-3">
            {HASAR_SURECI.map((s, i) => (
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

        {/* Prim Faktörleri */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4 flex items-center gap-2">
            <Scale size={14} className="text-[#00C49F]" /> Prim Etkileyen Faktörler
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {PRIM_FAKTORU.map((f, i) => (
              <div key={i} className="bg-[#F0FDF8] rounded-xl p-3">
                <p className="text-xs font-black text-gray-900 mb-0.5">{f.faktör}</p>
                <p className="text-[10px] text-gray-600 leading-relaxed">{f.etki}</p>
              </div>
            ))}
          </div>
        </section>

        {/* İpuçları */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4 flex items-center gap-2">
            <CheckCircle size={14} className="text-[#00C49F]" /> Önemli İpuçları
          </h2>
          <div className="space-y-2">
            {IPUCLARI.map((item, i) => (
              <div key={i} className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#00C49F] shrink-0 mt-1.5" />
                <p className="text-xs text-gray-700 leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Warning */}
        <section className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
          <AlertTriangle size={14} className="text-amber-600 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-800 leading-relaxed">
            <span className="font-black">Önemli:</span> DASK olmayan bir konuta konut sigortası yaptırılamaz. Tapu devri sırasında DASK poliçesi aktarılır veya yenilenir. Mutlaka yeni sahibe güncelleme yapılmasını sağlayın.
          </p>
        </section>

        {/* Related */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-4">İlgili Araçlar</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { href: '/dask-hesaplayici', label: 'DASK Prim Hesaplayıcı' },
              { href: '/deprem-riski', label: 'Deprem Riski Rehberi' },
              { href: '/tapu-devir-sureci', label: 'Tapu Devir Süreci' },
              { href: '/emlak-vergisi', label: 'Emlak Vergisi Hesaplayıcı' },
              { href: '/kentsel-donusum', label: 'Kentsel Dönüşüm Rehberi' },
              { href: '/enerji-kimlik-belgesi', label: 'Enerji Kimlik Belgesi' },
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
