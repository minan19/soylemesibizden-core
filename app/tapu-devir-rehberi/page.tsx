import { Metadata } from 'next';
import Link from 'next/link';
import { Key, CheckCircle, AlertTriangle, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Tapu Devir Süreci Rehberi 2024 | Tapu Harcı, Randevu, İşlem | Söylemesi Bizden',
  description:
    'Tapu devir süreci nasıl işler? Randevu alma, gerekli belgeler, tapu harcı, döner sermaye ve sıkça yapılan hatalar hakkında kapsamlı rehber.',
};

const TAPU_ADIMLARI = [
  {
    baslik: '1. Belgeleri Hazırla',
    sure: '1–3 gün',
    adimlar: [
      'Kimlik belgesi (T.C. nüfus cüzdanı veya pasaport)',
      'Alıcı ve satıcının 1 adet biyometrik fotoğrafı',
      'Tapu fotokopisi (satıcıdan)',
      'Banka kredi kullanılıyorsa kredi onay yazısı',
      'Konut için DASK poliçesi ve konut sigortası poliçesi',
    ],
  },
  {
    baslik: '2. Beyan Değerini Belirle',
    sure: '1 gün',
    adimlar: [
      'Belediyeden o yıla ait emlak rayiç değeri öğrenilir',
      'Tapu harcı beyan edilen satış değeri üzerinden hesaplanır; rayiç değerin altında beyan hukuka aykırıdır',
      'Satış fiyatı > rayiç değer ise satış fiyatı üzerinden harç alınır',
    ],
  },
  {
    baslik: '3. Harç ve Masrafları Öde',
    sure: '1 gün',
    adimlar: [
      'Tapu harcı: satış bedelinin %4\'ü (alıcı + satıcı paylaşabilir; pratikte genellikle alıcı öder)',
      'Döner sermaye: yıllık güncellenen sabit tutar (2024: yaklaşık 3.200 ₺)',
      'Ödeme bankayla veya e-Devlet üzerinden yapılabilir',
      'Tapu Müdürlüğü\'ne ödeme makbuzu ibraz edilir',
    ],
  },
  {
    baslik: '4. Tapu Müdürlüğü\'nden Randevu Al',
    sure: '1–5 gün bekleme',
    adimlar: [
      'webtapu.tkgm.gov.tr üzerinden online randevu alın',
      'İki taraf aynı randevuya gelmeli; vekalet varsa noter onaylı olmalı',
      'Yoğun dönemlerde (yaz/dönem sonu) randevu 1–2 hafta gecikebilir',
    ],
  },
  {
    baslik: '5. Tapu Müdürlüğü\'nde İşlem',
    sure: 'Yarım gün',
    adimlar: [
      'Memur tapu kaydını inceler, tarafları tanımlar',
      'Satış sözleşmesi tapu memuru önünde imzalanır',
      'Yeni tapu alıcı adına düzenlenir ve teslim edilir',
      'Tapu Sicil Gazetesi yerine artık SMS/e-posta bildirimi gelir',
    ],
  },
  {
    baslik: '6. Devir Sonrası Bildirimler',
    sure: '1 hafta',
    adimlar: [
      'Belediyeye yeni mülk sahibi bildirimi: emlak vergisi güncellenmeli',
      'DASK ve konut sigortası poliçelerini kendi adınıza yenileyin',
      'Elektrik, su, doğalgaz aboneliklerini devralın',
      'Apartman yönetimine yeni mülkiyet bildirin',
    ],
  },
];

const HARÇ_TABLOSU = [
  { kalem: 'Tapu Harcı (Alıcı)', oran: '%2', aciklama: 'Satış bedeli üzerinden; taraflarca paylaşılabilir' },
  { kalem: 'Tapu Harcı (Satıcı)', oran: '%2', aciklama: 'Satış bedeli üzerinden; toplamda %4' },
  { kalem: 'Döner Sermaye', oran: 'Sabit ~3.200 ₺', aciklama: '2024 yılı tapu sicil hizmet bedeli' },
  { kalem: 'KDV', oran: '%20 (proje)', aciklama: 'Sadece müteahhit/proje satışlarında; net 150 m² altı konut %10' },
  { kalem: 'Banka Komisyonu', oran: 'Değişken', aciklama: 'Kredi kullanılıyorsa ipotek tesis ücreti' },
];

const HATA_LISTESI = [
  { hata: 'Tapuyu görmeden kapora vermek', sonuc: 'İpotekli/hacizli mülk satın alınabilir' },
  { hata: 'Düşük beyan değeri yazmak', sonuc: 'Vergi ziyaı cezası + faiz' },
  { hata: 'Vekalet olmadan taraf adına işlem', sonuc: 'İşlem geçersiz sayılır' },
  { hata: 'Harçları son gün ödemek', sonuc: 'Randevu iptali, süre kaybı' },
  { hata: 'Devir sonrası belediyeye bildirmemek', sonuc: 'Eski malik adına vergi tahakkuk etmeye devam eder' },
];

const KONTROL_LISTESI = [
  'Tapu sicil kaydında ipotek/haciz/şerh yok mu? (e-Devlet veya Tapu Müd.)',
  'Kat mülkiyeti tapusu mu (kat irtifakından üstün)?',
  'İskan belgesi (yapı kullanım izni) mevcut mu?',
  'Satıcının kimliği tapudaki isimle eşleşiyor mu?',
  'Tapu harcı doğru hesaplandı mı (%4)?',
  'DASK poliçesi güncel mi?',
  'İki taraf randevu için hazır mı?',
];

export default function TapuDevirRehberiPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-2 bg-[#00C49F]/20 border border-[#00C49F]/30 text-[#00C49F] text-xs font-bold px-4 py-1.5 rounded-full mb-5">
            <Key size={13} /> Tapu Devir Rehberi
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
            Tapu Devir Süreci Rehberi 2024
          </h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed mb-8">
            Belge hazırlığından tapu teslimine 6 adımda eksiksiz süreç rehberi.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-[#00C49F]">%4</p>
              <p className="text-xs text-gray-400">Tapu harcı</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-white">6 Adım</p>
              <p className="text-xs text-gray-400">Devir süreci</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-amber-400">e-Devlet</p>
              <p className="text-xs text-gray-400">Tapu kontrolü</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">

        {/* Adımlar */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Tapu Devir Adımları</h2>
          <div className="space-y-4">
            {TAPU_ADIMLARI.map((a, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs font-black text-gray-900">{a.baslik}</p>
                  <span className="text-[10px] bg-[#F0FDF8] text-[#00C49F] font-black px-2 py-0.5 rounded">{a.sure}</span>
                </div>
                <div className="space-y-2">
                  {a.adimlar.map((ad, j) => (
                    <div key={j} className="flex items-start gap-2">
                      <CheckCircle size={12} className="text-[#00C49F] shrink-0 mt-0.5" />
                      <p className="text-[10px] text-gray-700 leading-relaxed">{ad}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Harç Tablosu */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4">Tapu Harç ve Masrafları</h2>
          <div className="space-y-2">
            {HARÇ_TABLOSU.map((h, i) => (
              <div key={i} className="grid grid-cols-3 gap-2 py-2 border-b border-gray-50 last:border-0">
                <p className="text-xs font-black text-gray-900">{h.kalem}</p>
                <p className="text-xs font-black text-[#00C49F]">{h.oran}</p>
                <p className="text-[10px] text-gray-500 leading-relaxed">{h.aciklama}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Kontrol Listesi */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4 flex items-center gap-2">
            <CheckCircle size={14} className="text-[#00C49F]" /> Tapu Kontrol Listesi
          </h2>
          <div className="space-y-2">
            {KONTROL_LISTESI.map((k, i) => (
              <div key={i} className="flex items-start gap-3 py-2 border-b border-gray-50 last:border-0">
                <div className="w-5 h-5 rounded border-2 border-[#00C49F]/40 shrink-0" />
                <p className="text-xs text-gray-700 leading-relaxed">{k}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Hata Listesi */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Sık Yapılan Hatalar</h2>
          <div className="space-y-3">
            {HATA_LISTESI.map((h, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm flex items-center justify-between gap-3">
                <p className="text-xs text-gray-800">{h.hata}</p>
                <span className="text-[10px] bg-rose-50 text-rose-600 font-black px-2 py-0.5 rounded shrink-0">{h.sonuc}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Uyarı */}
        <section className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
          <AlertTriangle size={14} className="text-amber-600 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-800 leading-relaxed">
            <span className="font-black">Önemli:</span> Tapu devri öncesi e-Devlet üzerinden tapu sicil kaydını kontrol edin. İpotek, haciz veya şerh bulunan bir mülkü devretmek kısıtlıdır; bu durumda işlem öncesi borçların ödenmesi veya kaldırılması gerekir.
          </p>
        </section>

        {/* Related */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-4">İlgili Araçlar</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { href: '/tapu-masrafi', label: 'Tapu Masrafı Hesaplayıcı' },
              { href: '/ev-alma-rehberi', label: 'Ev Alma Rehberi' },
              { href: '/satinalma-maliyeti', label: 'Satın Alma Maliyeti' },
              { href: '/dask-hesaplayici', label: 'DASK Prim Hesaplayıcı' },
              { href: '/konut-kredisi-basvuru', label: 'Konut Kredisi Başvurusu' },
              { href: '/kat-mulkiyeti', label: 'Kat Mülkiyeti Rehberi' },
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
