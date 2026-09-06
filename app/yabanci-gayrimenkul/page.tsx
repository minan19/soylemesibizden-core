import { Metadata } from 'next';
import Link from 'next/link';
import {
  Globe, CheckCircle, AlertTriangle, ArrowRight, Scale, FileText,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Yabancı Uyruklu Gayrimenkul Alımı | Tapu, Kısıtlama, Vergi | Söylemesi Bizden',
  description:
    'Yabancıların Türkiye\'de gayrimenkul alımı: izin şartları, yasak bölgeler, tapu süreci, vergi yükümlülükleri ve oturma izni.',
};

const ALIM_SARTLARI = [
  {
    konu: 'Karşılıklılık İlkesi',
    detay: 'Türk vatandaşlarına gayrimenkul edindirme hakkı tanıyan ülke vatandaşları alabilir. Yasaklı ülkeler listesi düzenli güncellenir.',
  },
  {
    konu: 'Alan Sınırı',
    detay: 'Yabancı uyruklu gerçek kişiler toplamda en fazla 30 hektar arazi edinebilir. Bu limit izinle 60 hektara çıkarılabilir.',
  },
  {
    konu: 'Askeri Yasak Bölge',
    detay: 'Askeri güvenlik bölgesi ve özel güvenlik bölgelerinde yabancılar taşınmaz edinemez. İlgili komutanlıktan izin alınması gerekir.',
  },
  {
    konu: 'Şirket Yoluyla Edinim',
    detay: 'Yabancı ortaklı Türk şirketi aracılığıyla alım yapılabilir; şirket %50+ yerli ortaklıklı olmalıdır veya izin gerekmez.',
  },
  {
    konu: 'Tapu Siciline Tescil',
    detay: 'Yabancı kimliği (pasaport) ve vergi numarası zorunludur. Türkçe bilmeyenler için yeminli tercüman şarttır.',
  },
];

const YASAK_BOLGELER = [
  { bolge: 'Askeri Güvenlik Bölgesi', aciklama: 'Genelkurmay Başkanlığı ve komutanlıklar tarafından belirlenen bölgeler.' },
  { bolge: 'Özel Güvenlik Bölgesi', aciklama: 'İçişleri Bakanlığı onayıyla ilan edilmiş hassas güvenlik alanları.' },
  { bolge: 'Orman Arazisi', aciklama: 'Devlet ormanları; herhangi bir uyruk için mülk edinimi yasak.' },
  { bolge: 'Sit Alanları', aciklama: 'Kültür ve tabiat varlıkları sit alanlarında kısıtlı edinim, restorasyon şartları.' },
];

const SUREC_ADIMLARI = [
  { adim: 'Vergi Numarası Alımı', detay: 'Pasaportla vergi dairesine başvuru; aynı gün düzenlenir. Online başvuru mümkün.' },
  { adim: 'Askeri İzin (Eski)', detay: '2012\'den itibaren kaldırıldı; NATO ülkeleri dahil çoğu yabancı için ayrı izin aranmaz.' },
  { adim: 'Tapu Randevusu', detay: 'TKGM e-randevu sistemi veya tapu müdürlüğü. Tercüman ve belgelerin hazır olması gerekir.' },
  { adim: 'Değerleme Raporu', detay: 'Yabancı alımlarında SPK lisanslı değerleme raporu zorunludur (2019\'dan itibaren).' },
  { adim: 'Döviz Bozdurma Belgesi', detay: 'Alım bedelinin Türk Lirası\'na çevirildiğini gösteren banka belgesi (DAB) şarttır.' },
  { adim: 'Tapu Devir', detay: 'Tapu müdürlüğünde noter tercümanlı devir; harç ve vergi peşin ödenir.' },
];

const VERGI_YUKUMLULUK = [
  { vergi: 'Tapu Harcı', oran: '%4 (alıcı+satıcı eşit bölüşür)', aciklama: 'Tapu devir işleminde devlet harcı.' },
  { vergi: 'Değer Artış Vergisi', oran: '%15–35 (5 yıldan önce satışta)', aciklama: 'Kısa vadeli satışta kazanç üzerinden.' },
  { vergi: 'Emlak Vergisi', oran: 'Konut %0.2, İşyeri %0.4 (büyükşehir 2 katı)', aciklama: 'Yıllık beyan; yabancılar da öder.' },
  { vergi: 'Kira Gelir Vergisi', oran: '%15–40 (gelir dilimine göre)', aciklama: '2024 istisna 33.000 ₺. Götürü %15 veya gerçek gider.' },
  { vergi: 'Servet Vergisi', oran: 'Yok', aciklama: 'Türkiye\'de gayrimenkul üzerinden ayrı servet vergisi uygulanmaz.' },
];

const OTURMA_IZNI = [
  { yol: 'Kısa Dönem Oturma İzni', sart: 'Tapu sahibi olması yeterli; yıllık yenileme.' },
  { yol: 'Uzun Dönem Oturma İzni', sart: '8 yıl kesintisiz kısa dönem + mali yeterlilik.' },
  { yol: 'Vatandaşlık (400K USD)', sart: 'En az 400.000 USD değerinde gayrimenkul + 3 yıl satmama taahhüdü.' },
  { yol: 'Vatandaşlık (500K USD)', sart: '500.000 USD sabit sermaye yatırımı (gayrimenkul dışı alternatif yol).' },
];

const DIKKAT_EDILMESI_GEREKENLER = [
  'Satıcının tapu kaydı mutlaka incelenmeli (ipotek, haciz, şerh)',
  'Değerleme raporu piyasa fiyatının altında ise beyan farkı sorun yaratır',
  'Döviz bozdurma belgesi (DAB) olmadan tapu devri yapılmaz',
  'Kira geliri varsa yıllık beyanname zorunlu (mart ayı sonu)',
  'Tapu devri sonrası 2 ay içinde emlak vergisi bildirimi verilmeli',
  'Miras durumunda yabancı mirasçı için ek işlem ve izin gerekebilir',
];

export default function YabanciGayrimenkulPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-2 bg-[#00C49F]/20 border border-[#00C49F]/30 text-[#00C49F] text-xs font-bold px-4 py-1.5 rounded-full mb-5">
            <Globe size={13} /> Yabancı Alım Rehberi
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
            Yabancı Uyruklu Gayrimenkul Alımı
          </h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed mb-8">
            Türkiye'de yabancıların taşınmaz edinme koşulları, yasak bölgeler, tapu süreci, vergi yükümlülükleri ve oturma/vatandaşlık yolları.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-[#00C49F]">30 ha</p>
              <p className="text-xs text-gray-400">Max arazi sınırı</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-white">400K$</p>
              <p className="text-xs text-gray-400">Vatandaşlık eşiği</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-amber-400">%4</p>
              <p className="text-xs text-gray-400">Tapu harcı</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">

        {/* Alım Şartları */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Alım Koşulları</h2>
          <div className="space-y-3">
            {ALIM_SARTLARI.map((a, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm flex items-start gap-3">
                <Scale size={13} className="text-blue-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-black text-gray-900 mb-0.5">{a.konu}</p>
                  <p className="text-[10px] text-gray-600 leading-relaxed">{a.detay}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Yasak Bölgeler */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Edinim Yasağı Olan Bölgeler</h2>
          <div className="space-y-3">
            {YASAK_BOLGELER.map((b, i) => (
              <div key={i} className="bg-rose-50 border border-rose-200 rounded-xl p-4 flex items-start gap-3">
                <AlertTriangle size={13} className="text-rose-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-black text-gray-900 mb-0.5">{b.bolge}</p>
                  <p className="text-[10px] text-gray-600 leading-relaxed">{b.aciklama}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Tapu Süreci */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Tapu Edinim Süreci</h2>
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

        {/* Vergi */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Vergi Yükümlülükleri</h2>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <table className="w-full text-xs">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left px-4 py-3 font-black text-gray-700">Vergi</th>
                  <th className="text-left px-4 py-3 font-black text-gray-700">Oran</th>
                  <th className="text-left px-4 py-3 font-black text-gray-500">Açıklama</th>
                </tr>
              </thead>
              <tbody>
                {VERGI_YUKUMLULUK.map((v, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-4 py-3 font-bold text-gray-800">{v.vergi}</td>
                    <td className="px-4 py-3 font-bold text-[#00C49F]">{v.oran}</td>
                    <td className="px-4 py-3 text-gray-500 leading-relaxed">{v.aciklama}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Oturma İzni */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4 flex items-center gap-2">
            <CheckCircle size={14} className="text-[#00C49F]" /> Oturma İzni ve Vatandaşlık Yolları
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {OTURMA_IZNI.map((o, i) => (
              <div key={i} className="bg-[#F0FDF8] rounded-xl p-3">
                <p className="text-xs font-black text-gray-900 mb-0.5">{o.yol}</p>
                <p className="text-[10px] text-gray-600 leading-relaxed">{o.sart}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Dikkat */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4 flex items-center gap-2">
            <FileText size={14} className="text-amber-500" /> Dikkat Edilmesi Gerekenler
          </h2>
          <div className="space-y-2">
            {DIKKAT_EDILMESI_GEREKENLER.map((item, i) => (
              <div key={i} className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 mt-1.5" />
                <p className="text-xs text-gray-700 leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Warning */}
        <section className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
          <AlertTriangle size={14} className="text-amber-600 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-800 leading-relaxed">
            <span className="font-black">Önemli:</span> Vatandaşlık için alınan gayrimenkuller 3 yıl satılamaz; erken satış vatandaşlığın iptali riskini doğurabilir. Yasal süreçlerde deneyimli bir hukuk bürosuyla çalışmanız şiddetle tavsiye edilir.
          </p>
        </section>

        {/* Related */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-4">İlgili Rehberler</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { href: '/tapu-devir-sureci', label: 'Tapu Devir Süreci' },
              { href: '/tapu-masrafi', label: 'Tapu Masrafı Hesaplayıcı' },
              { href: '/deger-artis-vergisi', label: 'Değer Artış Vergisi' },
              { href: '/kira-geliri-vergisi', label: 'Kira Geliri Vergisi' },
              { href: '/dolar-kuru-etkisi', label: 'Döviz Kuru Etkisi' },
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
