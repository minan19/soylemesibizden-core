import { Metadata } from 'next';
import Link from 'next/link';
import { Globe, CheckCircle, AlertTriangle, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Yabancı Yatırımcı Gayrimenkul Rehberi Türkiye 2024 | Tapu, Vatandaşlık, Vergi | Söylemesi Bizden',
  description:
    'Türkiye\'de yabancı uyruklu gayrimenkul alımı: tapu gereklilikleri, 400.000 USD vatandaşlık hakkı, vergi yükümlülükleri ve yasal süreç rehberi.',
};

const TEMEL_BILGILER = [
  {
    baslik: 'Kimler Alabilir?',
    icerik: 'Türk mevzuatına göre 183 ülke vatandaşı Türkiye\'de gayrimenkul alabilir. Kuzey Kore, Suriye, Ermenistan ve bazı ülke vatandaşları kısıtlamaya tabidir.',
  },
  {
    baslik: 'Alan Sınırı',
    icerik: 'Bir yabancı uyruklunun Türkiye\'de edinebileceği toplam taşınmaz alanı 30 hektarı geçemez. İlçe bazında %10 sınırı mevcuttur.',
  },
  {
    baslik: 'Askeri Bölge Kısıtlaması',
    icerik: 'Askeri yasak bölgeler ve güvenlik bölgelerinde satın alma yasaktır. Tapu Müdürlüğü bu bölgeleri doğrular.',
  },
  {
    baslik: 'Dövizle Satış',
    icerik: 'Yabancı uyrukluların satın alımlarında bedel döviz olarak belirlenir ve Türk lirası karşılığı beyan edilir. TCMB kuru esas alınır.',
  },
];

const VATANDASLIK_YOLU = [
  { kosul: 'Minimum Yatırım Tutarı', detay: '400.000 USD (veya eşdeğeri TL / EUR) değerinde gayrimenkul alımı' },
  { kosul: 'Tapu Değeri', detay: 'Ekspertiz ve tapu değeri her ikisi de 400.000 USD eşdeğerini karşılamalı' },
  { kosul: 'Satış Yasağı', detay: 'Alım tarihinden itibaren 3 yıl süreyle satış yapılamaz (şerh konulur)' },
  { kosul: 'Başvuru Süreci', detay: 'Tapu + ekspertiz + banka dekontu ile Göç İdaresi\'ne başvuru; 3–6 ay içinde sonuç' },
  { kosul: 'Eş ve Çocuklar', detay: '18 yaş altı çocuklar ve eş de vatandaşlığa dahil edilebilir' },
  { kosul: 'Birden Fazla Mülk', detay: '400.000 USD eşdeğerini karşılayan birden fazla mülk birleştirilebilir' },
];

const TAPU_SURECI = [
  'Türk vergi numarası alın (yerel vergi dairesinden, pasaportla)',
  'Türkiye\'deki bir bankada hesap açın',
  'Satın almak istediğiniz mülk için SPK lisanslı ekspertiz raporu hazırlatın',
  'Satış bedelini bankadan EFT/havale ile gönderin (banka dekontu gerekli)',
  'Türk Lirası karşılığı satış bedeli Merkez Bankası kuru ile hesaplanır',
  'Tapu Müdürlüğü\'nde randevu alın; taraflar veya yetkili vekiller hazır bulunur',
  'Tapu devri gerçekleşir; vatandaşlık başvurusu yapılacaksa şerh konulur',
];

const VERGI_YUKUMLULUK = [
  { vergi: 'Tapu Harcı', oran: '%4', aciklama: 'Satış değeri üzerinden; alıcı veya taraflarca paylaşılabilir' },
  { vergi: 'KDV', oran: '%20 / %10', aciklama: 'Müteahhit satışlarında uygulanır; konut 150 m² altı %10' },
  { vergi: 'Yıllık Emlak Vergisi', oran: '0,1–0,3‰', aciklama: 'Belediye rayiç değeri üzerinden yıllık ödenır' },
  { vergi: 'Kira Geliri Vergisi', oran: '%15–40', aciklama: 'Dilimli; 2024 istisna tutarı 33.000 ₺/yıl' },
  { vergi: 'Değer Artış Kazancı Vergisi', oran: '%15–40', aciklama: '5 yıl içinde satılırsa enflasyon farkı düşüldükten sonra vergiye tabi' },
  { vergi: 'Stopaj', oran: '%20', aciklama: 'Kira ödemelerinde kaynakta kesinti yöntemi tercih edilebilir' },
];

const PRATIK_IPUCU = [
  'Türkiye\'de ikamet etmiyorsanız noter tasdikli vekalet düzenleyerek bir avukata yetki verin',
  'Gayrimenkul avukatı veya danışmanı tutun; özellikle tapu şerhi araştırması kritik',
  'Yabancı uyruklu alımlarında banka hesabından yapılan ödeme şartı kesindir; nakit veya kripto ile ödeme geçersiz',
  'Vatandaşlık için alınan mülk kiralanabilir; sadece 3 yıl içinde satılamaz',
  'Konut kredisi: bazı Türk bankaları yabancı uyrukluya kredi açmaktadır; gelir belgesi ve kredi skoru istenir',
  'Döviz kuru riski: TL/USD paritesi değişebilir; alım zamanlaması önemlidir',
];

export default function YabanciYatirimciRehberiPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-2 bg-[#00C49F]/20 border border-[#00C49F]/30 text-[#00C49F] text-xs font-bold px-4 py-1.5 rounded-full mb-5">
            <Globe size={13} /> Yabancı Yatırımcı Rehberi
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
            Yabancı Yatırımcı için Türkiye Gayrimenkul Rehberi 2024
          </h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed mb-8">
            Tapu sürecinden vatandaşlık hakkına, vergi yükümlülüklerinden pratik ipuçlarına kapsamlı rehber.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-[#00C49F]">400K$</p>
              <p className="text-xs text-gray-400">Vatandaşlık eşiği</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-white">183</p>
              <p className="text-xs text-gray-400">Ülke alabilir</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-amber-400">3 Yıl</p>
              <p className="text-xs text-gray-400">Satış yasağı</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">

        {/* Temel Bilgiler */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Temel Kurallar</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {TEMEL_BILGILER.map((b, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                <p className="text-xs font-black text-[#00C49F] mb-2">{b.baslik}</p>
                <p className="text-[10px] text-gray-600 leading-relaxed">{b.icerik}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Vatandaşlık */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4">Gayrimenkul ile Türk Vatandaşlığı</h2>
          <div className="space-y-3">
            {VATANDASLIK_YOLU.map((v, i) => (
              <div key={i} className="grid grid-cols-3 gap-2 py-2 border-b border-gray-50 last:border-0">
                <p className="text-xs font-black text-gray-900">{v.kosul}</p>
                <p className="text-[10px] text-gray-600 leading-relaxed col-span-2">{v.detay}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Tapu Süreci */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Tapu Süreci</h2>
          <div className="space-y-3">
            {TAPU_SURECI.map((t, i) => (
              <div key={i} className="flex gap-3 bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
                <div className="w-6 h-6 rounded-full bg-[#00C49F] text-white text-[10px] font-black flex items-center justify-center shrink-0">{i + 1}</div>
                <p className="text-xs text-gray-700 leading-relaxed">{t}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Vergi */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4">Vergi Yükümlülükleri</h2>
          <div className="space-y-2">
            {VERGI_YUKUMLULUK.map((v, i) => (
              <div key={i} className="grid grid-cols-3 gap-2 py-2 border-b border-gray-50 last:border-0">
                <p className="text-xs font-black text-gray-900">{v.vergi}</p>
                <p className="text-xs font-black text-[#00C49F]">{v.oran}</p>
                <p className="text-[10px] text-gray-500 leading-relaxed">{v.aciklama}</p>
              </div>
            ))}
          </div>
        </section>

        {/* İpuçları */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Pratik İpuçları</h2>
          <div className="space-y-3">
            {PRATIK_IPUCU.map((ip, i) => (
              <div key={i} className="flex items-start gap-3 bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
                <CheckCircle size={12} className="text-[#00C49F] shrink-0 mt-0.5" />
                <p className="text-xs text-gray-700 leading-relaxed">{ip}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Uyarı */}
        <section className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
          <AlertTriangle size={14} className="text-amber-600 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-800 leading-relaxed">
            <span className="font-black">Önemli:</span> Bu rehber genel bilgi amaçlıdır; hukuki danışmanlık yerine geçmez. Vatandaşlık veya büyük ölçekli yatırım kararları için Türkiye&#39;de lisanslı bir gayrimenkul avukatına danışmanızı tavsiye ederiz. Mevzuat ve tutarlar değişebilir.
          </p>
        </section>

        {/* Related */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-4">İlgili Araçlar</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { href: '/yabanci-gayrimenkul', label: 'Yabancı Gayrimenkul Rehberi' },
              { href: '/tapu-devir-rehberi', label: 'Tapu Devir Rehberi' },
              { href: '/tapu-masrafi', label: 'Tapu Masrafı Hesaplayıcı' },
              { href: '/bolge-getiri-karsilastir', label: 'Bölge Getiri Karşılaştırması' },
              { href: '/konut-kredisi-basvuru', label: 'Konut Kredisi Başvurusu' },
              { href: '/dask-hesaplayici', label: 'DASK Prim Hesaplayıcı' },
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
