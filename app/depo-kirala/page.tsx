import { Metadata } from 'next';
import Link from 'next/link';
import { Package, CheckCircle, AlertTriangle, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Depo Kiralama Rehberi | Depo Fiyatları, Sözleşme, Lojistik | Söylemesi Bizden',
  description:
    'Depo ve depolama alanı kiralama rehberi: depo tipleri, şehir bazlı fiyatlar, sözleşme koşulları ve lojistik uygunluk kriterleri.',
};

const DEPO_TIPLERI = [
  {
    tip: 'Soğuk Hava Deposu',
    aciklama: 'Gıda, ilaç ve kimyasal ürünler için ısı kontrollü (+2/+8°C veya −18°C). Enerji maliyeti yüksek.',
    uygun: 'Gıda, ilaç, kozmetik',
    fiyatAraligi: '180–400 ₺/m²/ay',
    lisans: 'Zorunlu (BGGM veya Tarım Bakanlığı)',
  },
  {
    tip: 'Genel Depo (Kuru)',
    aciklama: 'Standart ürünler için iklimlendirilmemiş veya hafif iklimlendirmeli depo. Yaygın ve erişilebilir.',
    uygun: 'Tekstil, mobilya, elektronik, ambalaj',
    fiyatAraligi: '60–150 ₺/m²/ay',
    lisans: 'Genel yapı ruhsatı',
  },
  {
    tip: 'Lojistik Merkez / Cross-Dock',
    aciklama: 'Yükleme rampası, forklift alanı ve TIR girişi olan büyük hacimli lojistik operasyon noktası.',
    uygun: 'E-ticaret, dağıtım şirketi',
    fiyatAraligi: '80–200 ₺/m²/ay',
    lisans: 'Lojistik tesis ruhsatı',
  },
  {
    tip: 'Bireysel Depolama (Mini Depo)',
    aciklama: 'Aylık kiralanan küçük bölmeler (5–50 m²). Bireysel ve küçük işletmeler için. Güvenli, 7/24 erişim.',
    uygun: 'Taşınma, sezonluk eşya, küçük stok',
    fiyatAraligi: '150–350 ₺/m²/ay',
    lisans: 'Genel yapı ruhsatı',
  },
];

const SEHIR_FIYATLARI = [
  { sehir: 'İstanbul — Tuzla/Pendik (Sanayi)', fiyat: '90–180', tip: 'Büyük depo' },
  { sehir: 'İstanbul — Avrupa (İkitelli)', fiyat: '100–200', tip: 'Lojistik merkez' },
  { sehir: 'Ankara — Ostim/Siteler', fiyat: '60–130', tip: 'Kuru depo' },
  { sehir: 'İzmir — Kemalpaşa/Çiğli', fiyat: '55–120', tip: 'Genel depo' },
  { sehir: 'Bursa / Kocaeli', fiyat: '50–110', tip: 'Sanayi deposu' },
  { sehir: 'İstanbul — Mini Depo', fiyat: '150–350', tip: 'Bireysel bölme' },
];

const SOZLESME_KRITERLERI = [
  { madde: 'Kira Süresi', aciklama: 'Kısa dönem (aylık) veya uzun dönem (1–3 yıl). Uzun dönem genellikle indirimlidir.' },
  { madde: 'Alan ve Ölçüm', aciklama: 'Brüt alan, yükleme rampa alanı dahil mi? Net kullanılabilir yükseklik (free-height) kritik.' },
  { madde: 'Erişim Saatleri', aciklama: '7/24 mı sadece mesai saatleri mi? Güvenlik kamerası ve kart girişi var mı?' },
  { madde: 'Ortak Giderler', aciklama: 'Elektrik, güvenlik, temizlik, sigorta paylaşımı sözleşmede açık olmalı.' },
  { madde: 'Yükleme Ekipmanları', aciklama: 'Forklift, palet taşıyıcı, yükleme rampası dahil mi? Ücretli mi, ücretsiz mi?' },
  { madde: 'Fire ve Hasar Sigortası', aciklama: 'Kiracının kendi ürün sigortasını yapması genellikle beklenir. Zorunluluk sözleşmede belirtilmeli.' },
  { madde: 'Alt Kiralama', aciklama: 'İzin verilmiyor ise deponun tamamını kullanma yükümlülüğü doğar.' },
  { madde: 'Erken Çıkış', aciklama: 'Erken fesih bildirimi süresi ve cezası (1–3 ay tazminat yaygın).' },
];

const KONTROL_LISTESI = [
  'Zemin yük kapasitesi (ton/m²) kontrol edildi',
  'Tavan yüksekliği (free-height) ürüne uygun',
  'Yangın söndürme sistemi (sprinkler/yağmurlama) mevcut',
  'TIR ve kamyon girişi test edildi (dönüş yarıçapı)',
  'Elektrik kapasitesi ve faz sayısı incelendi',
  'Güvenlik sistemi (CCTV, alarm, kapı sistemi) görüldü',
  'Sigorta kapsamı ve sorumluluk sınırı netleştirildi',
  'Komşu depolardaki ürün uyumluluğu kontrol edildi (yanıcı madde vb.)',
];

const VERIMLILIK_IPUCLARI = [
  { ipucu: 'Yüksek Raf Sistemi', tasarruf: '%40 daha fazla alan', aciklama: 'Dikey depolama ile m² başına verimlilik artar; tavan yüksekliği kritik.' },
  { ipucu: 'WMS Yazılımı', tasarruf: 'İnsan hatası −60%', aciklama: 'Depo yönetim sistemi stok doğruluğunu ve sevkiyat hızını artırır.' },
  { ipucu: 'Bölge Bazlı Yerleşim', tasarruf: 'Toplama süresi −30%', aciklama: 'A/B/C sınıfı hızlı hareket eden ürünleri kapıya yakın konumlandırın.' },
  { ipucu: 'Paylaşımlı Depo', tasarruf: 'Maliyet −35%', aciklama: 'Küçük operasyonlar için 3PL (üçüncü parti lojistik) maliyet avantajı sağlar.' },
];

export default function DepoKiralaPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-2 bg-[#00C49F]/20 border border-[#00C49F]/30 text-[#00C49F] text-xs font-bold px-4 py-1.5 rounded-full mb-5">
            <Package size={13} /> Depo Kiralama Rehberi
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
            Depo Kiralama Rehberi
          </h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed mb-8">
            Depo tipleri, şehir bazlı fiyatlar, sözleşme kriterleri ve verimlilik ipuçları.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-[#00C49F]">4 Tip</p>
              <p className="text-xs text-gray-400">Depo seçeneği</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-white">60–400</p>
              <p className="text-xs text-gray-400">₺/m²/ay fiyat aralığı</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-amber-400">3PL</p>
              <p className="text-xs text-gray-400">Paylaşımlı çözüm</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">

        {/* Depo Tipleri */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Depo Tipleri</h2>
          <div className="space-y-4">
            {DEPO_TIPLERI.map((d, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                <p className="text-xs font-black text-gray-900 mb-2">{d.tip}</p>
                <p className="text-[10px] text-gray-600 mb-3 leading-relaxed">{d.aciklama}</p>
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-gray-50 rounded-lg p-2">
                    <p className="text-[9px] text-gray-400 font-bold mb-0.5">Uygun Sektör</p>
                    <p className="text-[10px] text-gray-700">{d.uygun}</p>
                  </div>
                  <div className="bg-[#F0FDF8] rounded-lg p-2">
                    <p className="text-[9px] text-[#00C49F] font-bold mb-0.5">Fiyat Aralığı</p>
                    <p className="text-[10px] text-gray-700">{d.fiyatAraligi}</p>
                  </div>
                  <div className="bg-amber-50 rounded-lg p-2">
                    <p className="text-[9px] text-amber-600 font-bold mb-0.5">Lisans</p>
                    <p className="text-[10px] text-gray-700">{d.lisans}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Şehir Fiyatları */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4">Şehir Bazlı Depo Kira Fiyatları</h2>
          <div className="space-y-2">
            {SEHIR_FIYATLARI.map((s, i) => (
              <div key={i} className="grid grid-cols-3 gap-2 py-2 border-b border-gray-50 last:border-0">
                <p className="text-xs font-black text-gray-900 col-span-2">{s.sehir}</p>
                <div className="text-right">
                  <p className="text-xs font-black text-[#00C49F]">{s.fiyat} ₺/m²/ay</p>
                  <p className="text-[9px] text-gray-400">{s.tip}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Sözleşme Kriterleri */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Sözleşme Kritik Maddeleri</h2>
          <div className="space-y-3">
            {SOZLESME_KRITERLERI.map((s, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
                <p className="text-xs font-black text-gray-900 mb-1">{s.madde}</p>
                <p className="text-[10px] text-gray-600 leading-relaxed">{s.aciklama}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Verimlilik */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4">Depo Verimliliği Artırma</h2>
          <div className="space-y-3">
            {VERIMLILIK_IPUCLARI.map((v, i) => (
              <div key={i} className="py-2 border-b border-gray-50 last:border-0">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-xs font-black text-gray-900">{v.ipucu}</p>
                  <span className="text-[10px] bg-[#F0FDF8] text-[#00C49F] font-black px-2 py-0.5 rounded">{v.tasarruf}</span>
                </div>
                <p className="text-[10px] text-gray-600 leading-relaxed">{v.aciklama}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Kontrol Listesi */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4 flex items-center gap-2">
            <CheckCircle size={14} className="text-[#00C49F]" /> Depo Seçim Kontrol Listesi
          </h2>
          <div className="space-y-2">
            {KONTROL_LISTESI.map((k, i) => (
              <div key={i} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
                <div className="w-5 h-5 rounded border-2 border-[#00C49F]/40 shrink-0" />
                <p className="text-xs text-gray-700">{k}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Uyarı */}
        <section className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
          <AlertTriangle size={14} className="text-amber-600 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-800 leading-relaxed">
            <span className="font-black">Önemli:</span> Soğuk hava deposu, tehlikeli madde deposu veya gümrüklü antrepo gibi özel amaçlı depolar için sektörel lisanslar zorunludur. Ticari depo sözleşmeleri TBK kapsamında değerlendirilir; kira koşullarını imzalamadan önce lojistik danışman veya avukata danışın.
          </p>
        </section>

        {/* Related */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-4">İlgili Araçlar</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { href: '/ofis-kirala', label: 'Ofis Kiralama Rehberi' },
              { href: '/kira-sozlesmesi-ornegi', label: 'Kira Sözleşmesi Örneği' },
              { href: '/kira-getiri-hesaplayici', label: 'Kira Getiri Hesaplayıcı' },
              { href: '/yatirim-analizi', label: 'Yatırım Analizi' },
              { href: '/emlak-komisyonu', label: 'Emlak Komisyonu' },
              { href: '/vergi-planlama', label: 'Vergi Planlama' },
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
