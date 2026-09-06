import { Metadata } from 'next';
import Link from 'next/link';
import {
  Building, CheckCircle, AlertTriangle, ArrowRight, FileText, Scale,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Müteahhit Seçimi Rehberi | Kat Karşılığı, Sözleşme, Teminat | Söylemesi Bizden',
  description:
    'Güvenilir müteahhit nasıl seçilir? Kat karşılığı inşaat sözleşmesi, teminat, yapı denetim ve hukuki haklar.',
};

const SECIM_KRITERLERI = [
  { kriter: 'Sicil ve Referans', aciklama: 'Ticaret sicili, SGK ve vergi kayıtları temiz mi? Tamamlanmış projelerini yerinde ziyaret edin.', onem: 'Kritik' },
  { kriter: 'Mali Güç', aciklama: 'Bilanço, gelir tablosu ve banka referans mektuplarını isteyin; proje başlamadan iflas riski olup olmadığını değerlendirin.', onem: 'Kritik' },
  { kriter: 'Yapı Denetim Uyumu', aciklama: 'Yasal zorunluluk: yapı denetim şirketiyle kayıtlı olması ve geçmiş projelerinde sorun yaşamamış olması.', onem: 'Yüksek' },
  { kriter: 'Usta Kadrosu', aciklama: 'Proje müdürü, şantiye şefi ve usta kadrosunu tanıyın; taşeron mu, kendi ekibi mi olduğunu sorun.', onem: 'Yüksek' },
  { kriter: 'Proje Kapasitesi', aciklama: 'Aynı anda kaç proje yürütüyor? Kapasitesini aşan müteahhitler gecikmeler yaratır.', onem: 'Orta' },
  { kriter: 'Sigorta ve Teminat', aciklama: 'İnşaat all-risk sigortası, sorumluluk sigortası ve banka teminat mektubunu sözleşme öncesi isteyin.', onem: 'Yüksek' },
];

const SOZLESME_TURLERI = [
  {
    tur: 'Götürü Bedel Sözleşme',
    aciklama: 'Toplam bedel önceden sabitlenir; müteahhit maliyet artışı riskini üstlenir.',
    avantaj: 'Bütçe öngörülebilirliği yüksek',
    risk: 'Düşük fiyat teklifiyle kalite feda edilebilir',
  },
  {
    tur: 'Birim Fiyat Sözleşme',
    aciklama: 'Her iş kalemi için birim fiyat belirlenir; toplam bedel imalat miktarına göre oluşur.',
    avantaj: 'Değişiklikler kolayca fiyatlandırılır',
    risk: 'Toplam maliyet başlangıçta belirsiz kalır',
  },
  {
    tur: 'Kat Karşılığı Sözleşme',
    aciklama: 'Arsa sahibi arsa verir, müteahhit inşaat yapar; bitişte belirlenen kat adedi arsa sahibine verilir.',
    avantaj: 'Nakit ödeme gerekmez',
    risk: 'Kat paylaşımı ve proje kalitesi anlaşmazlıkları',
  },
  {
    tur: 'Hasılat Paylaşımı',
    aciklama: 'Satış gelirleri arsa sahibi ve müteahhit arasında önceden belirlenen oranda paylaşılır.',
    avantaj: 'Piyasa değeri esas alınır; daha adil dağılım',
    risk: 'Satış süreci uzarsa her iki taraf da bekler',
  },
];

const SOZLESME_MADDELER = [
  'Tarafların kimlik ve adres bilgileri ile imza yetkileri',
  'İşin tanımı ve teknik şartname referansı',
  'Başlangıç ve bitiş tarihleri; kısmi teslim takvimi',
  'Gecikme halinde günlük cezai şart (bedelin %0,3–1)',
  'İş bedeli, ödeme planı ve avans koşulları',
  'Banka teminat mektubu miktarı ve süresi',
  'Malzeme kalite standartları ve marka seçimi',
  'Fiyat artışı (eskalasyon) klozlu veya kloz yok — net belirtilmeli',
  'Sözleşmeden dönme ve fesih koşulları',
  'Uyuşmazlık çözümü (tahkim veya mahkeme)',
];

const YAPI_DENETIM = [
  { asama: 'Temel Vizesi', detay: 'Zemin etüdü ve temel betonu dökülmeden önce yapı denetim şirketi vize vermeli.' },
  { asama: 'Kaba İnşaat', detay: 'Kolon, kiriş ve döşeme betonları dökülmeden yapı denetim onayı alınmalı.' },
  { asama: 'Subasman Vizesi', detay: 'Subasmanın tamamlanması ve su yalıtımının kontrolü yapılmalı.' },
  { asama: 'İnce İşler', detay: 'Sıva, kaplama ve tesisat uygunluğu denetçi gözetiminde teslim edilmeli.' },
  { asama: 'Hakediş Kontrolü', detay: 'Ödeme serbest bırakmadan önce yapı denetim şirketinin ilerleme raporu alınmalı.' },
];

const KIRMIZI_BAYRAKLAR = [
  'Sözleşmesiz çalışmayı teklif ediyor.',
  'Ön ödemeyi nakit ve makbuz vermeden istiyor.',
  'Tamamlanmış proje referansı gösteremiyor.',
  'Ticaret sicili veya vergi borcu sorgulamasına izin vermiyor.',
  'Piyasa fiyatının çok altında (yüzde 30+ ucuz) teklif veriyor.',
  'Yapı denetim şirketi seçimini kendi yapacağını söylüyor (bağımsız olmalı).',
];

const TEMINAT_TURLERI = [
  { tur: 'Kesin Teminat Mektubu', oran: 'Sözleşme bedelinin %10', aciklama: 'İş tamamlanana kadar geçerli; taahhüt yerine getirilmezse bankadan talep edilir.' },
  { tur: 'Avans Teminat Mektubu', oran: 'Avans tutarına eşit', aciklama: 'Avans ödeniyorsa müteahhitten alınan karşı teminat.' },
  { tur: 'Bakiye Teminat', oran: '%2–5 (1–5 yıl)', aciklama: 'Teslimat sonrası gizli ayıplar için garanti teminatı.' },
];

export default function MuteahhitSecimiPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-2 bg-[#00C49F]/20 border border-[#00C49F]/30 text-[#00C49F] text-xs font-bold px-4 py-1.5 rounded-full mb-5">
            <Building size={13} /> Müteahhit Seçimi Rehberi
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
            Müteahhit Seçimi Rehberi
          </h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed mb-8">
            Güvenilir müteahhit kriterleri, sözleşme türleri, teminat ve yapı denetim süreci.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-[#00C49F]">%10</p>
              <p className="text-xs text-gray-400">Kesin teminat oranı</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-white">Yapı Den.</p>
              <p className="text-xs text-gray-400">Zorunlu denetim</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-amber-400">%0,3–1</p>
              <p className="text-xs text-gray-400">Günlük gecikme cezası</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">

        {/* Seçim Kriterleri */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Müteahhit Seçim Kriterleri</h2>
          <div className="space-y-3">
            {SECIM_KRITERLERI.map((k, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm flex items-start gap-3">
                <div className={`text-[10px] font-black px-2 py-1 rounded-lg shrink-0 ${
                  k.onem === 'Kritik' ? 'bg-rose-50 text-rose-600' :
                  k.onem === 'Yüksek' ? 'bg-amber-50 text-amber-600' : 'bg-blue-50 text-blue-600'
                }`}>{k.onem}</div>
                <div>
                  <p className="text-xs font-black text-gray-900 mb-0.5">{k.kriter}</p>
                  <p className="text-[10px] text-gray-600 leading-relaxed">{k.aciklama}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Sözleşme Türleri */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">İnşaat Sözleşmesi Türleri</h2>
          <div className="space-y-4">
            {SOZLESME_TURLERI.map((s, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                <p className="text-xs font-black text-gray-900 mb-1">{s.tur}</p>
                <p className="text-[10px] text-gray-600 mb-3 leading-relaxed">{s.aciklama}</p>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-[#F0FDF8] rounded-lg p-2">
                    <p className="text-[10px] text-[#00C49F] font-bold mb-0.5">Avantaj</p>
                    <p className="text-[10px] text-gray-600">{s.avantaj}</p>
                  </div>
                  <div className="bg-rose-50 rounded-lg p-2">
                    <p className="text-[10px] text-rose-500 font-bold mb-0.5">Risk</p>
                    <p className="text-[10px] text-gray-600">{s.risk}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Sözleşme Maddeleri */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4 flex items-center gap-2">
            <CheckCircle size={14} className="text-[#00C49F]" /> Sözleşmede Olması Gerekenler
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {SOZLESME_MADDELER.map((item, i) => (
              <div key={i} className="flex items-start gap-2">
                <div className="w-4 h-4 rounded border-2 border-[#00C49F]/40 shrink-0 mt-0.5" />
                <p className="text-xs text-gray-700 leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Yapı Denetim */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Yapı Denetim Aşamaları</h2>
          <div className="space-y-3">
            {YAPI_DENETIM.map((a, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm flex items-start gap-3">
                <div className="bg-[#F0FDF8] text-[#00C49F] text-[10px] font-black px-2 py-1 rounded-lg shrink-0">{i + 1}</div>
                <div>
                  <p className="text-xs font-black text-gray-900 mb-0.5">{a.asama}</p>
                  <p className="text-[10px] text-gray-600 leading-relaxed">{a.detay}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Teminat Türleri */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4 flex items-center gap-2">
            <Scale size={14} className="text-[#00C49F]" /> Teminat Türleri
          </h2>
          <div className="space-y-3">
            {TEMINAT_TURLERI.map((t, i) => (
              <div key={i} className="bg-[#F0FDF8] rounded-xl p-3 grid grid-cols-3 gap-2">
                <div>
                  <p className="text-[10px] text-[#00C49F] font-bold mb-0.5">Teminat</p>
                  <p className="text-xs font-black text-gray-900">{t.tur}</p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 font-bold mb-0.5">Oran</p>
                  <p className="text-[10px] text-gray-700 font-bold">{t.oran}</p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 font-bold mb-0.5">Açıklama</p>
                  <p className="text-[10px] text-gray-600 leading-relaxed">{t.aciklama}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Kırmızı Bayraklar */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4 flex items-center gap-2">
            <FileText size={14} className="text-rose-500" /> Kırmızı Bayraklar — Bu Müteahhitten Uzak Durun
          </h2>
          <div className="space-y-2">
            {KIRMIZI_BAYRAKLAR.map((item, i) => (
              <div key={i} className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0 mt-1.5" />
                <p className="text-xs text-gray-700 leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Warning */}
        <section className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
          <AlertTriangle size={14} className="text-amber-600 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-800 leading-relaxed">
            <span className="font-black">Önemli:</span> Kat karşılığı sözleşmeleri noterde düzenlenmelidir; adi yazılı sözleşmeler geçersiz sayılabilir. Proje başlamadan arsa payınızı koruyacak şerh ve tedbir kararları için avukat desteği alın.
          </p>
        </section>

        {/* Related */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-4">İlgili Rehberler</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { href: '/kat-karsiligi', label: 'Kat Karşılığı Rehberi' },
              { href: '/belediye-islemleri', label: 'Belediye İşlemleri' },
              { href: '/imar-durumu', label: 'İmar Durumu Rehberi' },
              { href: '/enerji-kimlik-belgesi', label: 'Enerji Kimlik Belgesi' },
              { href: '/kooperatif', label: 'Kooperatif Rehberi' },
              { href: '/arsa-yatirimi', label: 'Arsa Yatırımı Rehberi' },
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
