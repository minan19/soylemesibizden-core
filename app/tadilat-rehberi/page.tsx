import { Metadata } from 'next';
import Link from 'next/link';
import {
  Building, CheckCircle, AlertTriangle, ArrowRight, FileText,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Tadilat Rehberi | Ruhsat, Maliyet, Kat Mülkiyeti Kuralları | Söylemesi Bizden',
  description:
    'Konut tadilatında ruhsat zorunluluğu, maliyet tahmini, komşu hakları, kat mülkiyeti kuralları ve taşeron seçimi.',
};

const TADILAT_TURLERI = [
  { tur: 'Boya ve Kaplama', ruhsat: 'Gerekmez', maliyet: '20.000–80.000 ₺', sure: '1–3 hafta', not: 'Ortak alanlar komite onayı gerektirebilir.' },
  { tur: 'Mutfak/Banyo Yenileme', ruhsat: 'Genellikle gerekmez', maliyet: '100.000–500.000 ₺', sure: '4–8 hafta', not: 'Taşıyıcı duvar değişikliği varsa proje şartı.' },
  { tur: 'Duvar Yıkımı (Bölme)', ruhsat: 'Taşıyıcı değilse gerekmez', maliyet: '15.000–60.000 ₺/duvar', sure: '1 hafta', not: 'Statik hesap gerekebilir; yönetici onayı tavsiye edilir.' },
  { tur: 'Taşıyıcı Sistem Değişimi', ruhsat: 'Belediye ruhsatı zorunlu', maliyet: '200.000 ₺+', sure: '8–16 hafta', not: 'İnşaat mühendisi projesi ve yapı denetimi şart.' },
  { tur: 'Tesisat (Elektrik/Su)', ruhsat: 'Bina yönetimi onayı', maliyet: '30.000–150.000 ₺', sure: '2–4 hafta', not: 'Lisanslı elektrik/su teknisyeni zorunludur.' },
  { tur: 'Isı Yalıtım (Mantolama)', ruhsat: 'Belediyeye göre değişir', maliyet: '500–800 ₺/m²', sure: '4–12 hafta', not: 'Dış cephe: bina yönetimi ve belediye onayı gerekebilir.' },
];

const RUHSAT_BILGI = [
  { konu: 'Ruhsat Gerektiren İşler', detay: 'Taşıyıcı duvar kaldırma veya ekleme, yeni pencere/kapı açma, kat ilavesi, bölümlere ayırma veya birleştirme.' },
  { konu: 'Ruhsat Gerektirmeyen', detay: 'Boya, kaplamalar, mutfak/banyo dolabı değişimi, zemin döşemesi, bölme duvar (taşıyıcı değil).' },
  { konu: 'Başvuru Yeri', detay: 'Bağlı bulunduğunuz belediyenin imar müdürlüğü; e-Devlet\'te bazı belediyelerde online başvuru mevcut.' },
  { konu: 'Belge', detay: 'Mimari proje (mimar onaylı), tapu fotokopisi, nüfus cüzdanı; büyük işlerde statik proje eklenir.' },
  { konu: 'Ceza', detay: 'Ruhsatsız tadilat tespitinde 3194 sayılı kanun kapsamında para cezası ve yıkım kararı verilebilir.' },
];

const KAT_MULKIYETI_KURALLARI = [
  { kural: 'Bağımsız Bölüm İçi', detay: 'Kendi bağımsız bölümünüzde diğer bölümleri etkilemeyen işler serbest; ancak iç tesisat ortak sistemle bağlantılıysa yönetici onayı alın.' },
  { kural: 'Ortak Alanlar', detay: 'Merdiven, asansör, çatı, dış cephe, bodrum — bunlarda değişiklik için kat malikleri kurulu kararı (4/5 çoğunluk veya oybirliği) gerekir.' },
  { kural: 'Gürültü Saatleri', detay: 'Çoğu apartman yönetmeliği tadilatı 08:00–20:00 arasıyla sınırlar; komşulara önceden bildirim iyi pratiktir.' },
  { kural: 'Zarar ve Sorumluluk', detay: 'Tadilatınızdan kaynaklanan su, nem veya yapısal hasar komşuyu etkilerse sorumluluk size aittir; sigorta poliçesi yapın.' },
  { kural: 'Merkezi Sistem', detay: 'Merkezi ısıtma veya sıhhî tesisat değişikliği için yönetim kurulu onayı şart; bireysel hareket yasaktır.' },
];

const BUTCE_PLANLAMA = [
  { kalem: 'Temel Tadilat', aralik: '50.000 – 150.000 ₺', aciklama: 'Boya, kaplama, armatür değişimi — 100 m² daire' },
  { kalem: 'Orta Kapsamlı', aralik: '150.000 – 400.000 ₺', aciklama: 'Mutfak/banyo + zemin + elektrik — 100 m² daire' },
  { kalem: 'Kapsamlı Tadilat', aralik: '400.000 – 1.000.000 ₺', aciklama: 'Komple yenileme, tesisat dahil — 100 m² daire' },
  { kalem: 'Lüks Tadilat', aralik: '1.000.000 ₺+', aciklama: 'Özel tasarım, yüksek malzeme kalitesi — 100 m² daire' },
];

const TASERON_SECIM = [
  'Referans ve tamamlanmış iş fotoğrafı mutlaka isteyin.',
  'Birden fazla firmadan teknik teklif ve metraj alın.',
  'Fiyatı düşük olan ile aradaki farkın nedenini sorun.',
  'Sözleşmede kullanılacak malzeme marka ve sınıfı yazılsın.',
  'Ödeme planını iş ilerlemesine göre yapılandırın; baştan yüksek avans vermeyin.',
  'Tamamlanma tarihi ve gecikme cezası sözleşmeye ekleyin.',
  'SGK ve vergi kayıtları aktif taşeron seçin (güvenceli çalışan).',
];

const IPUCLARI = [
  { ipucu: 'Malzeme Önce Al', detay: 'Fiyat artışından korunmak için seramik, parke, armatür gibi büyük kalemleri başlangıçta satın alın veya fiyatlatın.' },
  { ipucu: 'Sıralama Önemli', detay: 'Doğru sıra: sıhhi tesisat → elektrik → alçıpan/sıva → boya → zemin → mobilya. Ters sıra ekstra maliyet çıkarır.' },
  { ipucu: 'Bütçe Tamponu', detay: 'Toplam bütçenizin %15–20\'sini beklenmedik giderler için ayırın; tadilatlarda sürprizler normaldir.' },
  { ipucu: 'Fotoğraf Arşivi', detay: 'Her aşamada fotoğraflayın; anlaşmazlıkta delil ve satışta artı değer belgesi olur.' },
];

export default function TadilatRehberiPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-2 bg-[#00C49F]/20 border border-[#00C49F]/30 text-[#00C49F] text-xs font-bold px-4 py-1.5 rounded-full mb-5">
            <Building size={13} /> Tadilat Rehberi
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
            Konut Tadilat Rehberi
          </h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed mb-8">
            Ruhsat zorunluluğu, maliyet tahmini, kat mülkiyeti kuralları ve taşeron seçimi.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-[#00C49F]">%15–20</p>
              <p className="text-xs text-gray-400">Bütçe tamponu</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-white">3194</p>
              <p className="text-xs text-gray-400">İmar Kanunu</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-amber-400">4/5</p>
              <p className="text-xs text-gray-400">Ortak alan oy çoğunluğu</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">

        {/* Tadilat Türleri */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Tadilat Türleri ve Maliyet</h2>
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
            <div className="grid grid-cols-5 gap-0 bg-gray-50 p-3 text-[10px] font-black text-gray-500 uppercase tracking-wide">
              <div>Tür</div>
              <div>Ruhsat</div>
              <div>Maliyet</div>
              <div>Süre</div>
              <div>Not</div>
            </div>
            {TADILAT_TURLERI.map((t, i) => (
              <div key={i} className={`grid grid-cols-5 gap-0 p-3 border-t border-gray-50 ${i % 2 === 0 ? '' : 'bg-gray-50/40'}`}>
                <p className="text-[10px] font-bold text-gray-900">{t.tur}</p>
                <p className="text-[10px] text-gray-600">{t.ruhsat}</p>
                <p className="text-[10px] text-[#00C49F] font-bold">{t.maliyet}</p>
                <p className="text-[10px] text-gray-600">{t.sure}</p>
                <p className="text-[10px] text-gray-400">{t.not}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Ruhsat Bilgisi */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4 flex items-center gap-2">
            <FileText size={14} className="text-amber-500" /> Ruhsat Zorunluluğu
          </h2>
          <div className="space-y-3">
            {RUHSAT_BILGI.map((r, i) => (
              <div key={i} className="bg-amber-50 rounded-xl p-3">
                <p className="text-xs font-black text-gray-900 mb-0.5">{r.konu}</p>
                <p className="text-[10px] text-gray-600 leading-relaxed">{r.detay}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Kat Mülkiyeti Kuralları */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Kat Mülkiyeti Kuralları</h2>
          <div className="space-y-3">
            {KAT_MULKIYETI_KURALLARI.map((k, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                <p className="text-xs font-black text-gray-900 mb-1">{k.kural}</p>
                <p className="text-[10px] text-gray-600 leading-relaxed">{k.detay}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Bütçe Planlama */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4 flex items-center gap-2">
            <CheckCircle size={14} className="text-[#00C49F]" /> Bütçe Planlama (100 m² Daire)
          </h2>
          <div className="space-y-3">
            {BUTCE_PLANLAMA.map((b, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="bg-[#F0FDF8] rounded-lg px-3 py-2 min-w-[120px] text-center">
                  <p className="text-[10px] text-[#00C49F] font-black">{b.aralik}</p>
                </div>
                <div>
                  <p className="text-xs font-black text-gray-900 mb-0.5">{b.kalem}</p>
                  <p className="text-[10px] text-gray-600">{b.aciklama}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Taşeron Seçimi */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4">Taşeron Seçimi İpuçları</h2>
          <div className="space-y-2">
            {TASERON_SECIM.map((item, i) => (
              <div key={i} className="flex items-start gap-2">
                <div className="w-4 h-4 rounded border-2 border-[#00C49F]/40 shrink-0 mt-0.5" />
                <p className="text-xs text-gray-700 leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </section>

        {/* İpuçları */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Pratik İpuçları</h2>
          <div className="space-y-3">
            {IPUCLARI.map((ip, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                <p className="text-xs font-black text-gray-900 mb-1">{ip.ipucu}</p>
                <p className="text-[10px] text-gray-600 leading-relaxed">{ip.detay}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Warning */}
        <section className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
          <AlertTriangle size={14} className="text-amber-600 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-800 leading-relaxed">
            <span className="font-black">Önemli:</span> Taşıyıcı sisteme dokunacak tadilatları mutlaka ruhsatlı yapın. Ruhsatsız tadilat tespit edilirse hem satış hem de kredi işlemleri zorlaşır; yıkım cezasıyla da karşılaşabilirsiniz.
          </p>
        </section>

        {/* Related */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-4">İlgili Rehberler</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { href: '/muteahhit-secimi', label: 'Müteahhit Seçimi Rehberi' },
              { href: '/kat-mulkiyeti', label: 'Kat Mülkiyeti Rehberi' },
              { href: '/belediye-islemleri', label: 'Belediye İşlemleri' },
              { href: '/enerji-kimlik-belgesi', label: 'Enerji Kimlik Belgesi' },
              { href: '/konut-sigortasi', label: 'Konut Sigortası Rehberi' },
              { href: '/ekspertiz-raporu', label: 'Ekspertiz Raporu' },
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
