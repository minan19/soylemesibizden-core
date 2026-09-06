import { Metadata } from 'next';
import Link from 'next/link';
import { Home, CheckCircle, AlertTriangle, ArrowRight, Star } from 'lucide-react';

export const metadata: Metadata = {
  title: 'İlk Ev Alma Rehberi 2024 | Bütçe, Kredi, Tapu | Söylemesi Bizden',
  description:
    'İlk kez ev alacaklar için kapsamlı rehber: bütçe planlaması, kredi başvurusu, ev seçimi, tapu işlemleri ve taşınma. Adım adım kılavuz.',
};

const ADIMLAR = [
  {
    adim: 'Bütçenizi Belirleyin',
    sure: '1–2 hafta',
    detay: [
      'Aylık net gelirinizin %35–40\'ından fazlasını taksit için ayırmayın',
      'Peşinat olarak ev değerinin en az %20\'sini (genellikle %20–30) biriktirin',
      'Tapu harcı, döner sermaye, DASK, nakliye ve tadilat için ek %6–8 ayırın',
      'Acil durum fonu olarak 3–6 aylık gideri birikim hesabında tutun',
    ],
  },
  {
    adim: 'Kredi Notunuzu ve Uygunluğunuzu Öğrenin',
    sure: '1 hafta',
    detay: [
      'Findeks/KKB\'den kredi notunuzu ücretsiz sorgulayın (yılda 1 kez)',
      '1500+ not konut kredisi onayı için iyi; 1700+ avantajlı faiz sağlar',
      'Birden fazla bankaya ön başvuru yaparak teklifleri karşılaştırın',
      'Bankanın talep edeceği gelir belgesi ve sgk dökümanlarını hazırlayın',
    ],
  },
  {
    adim: 'Ev Araştırması ve Seçim',
    sure: '1–3 ay',
    detay: [
      'Önceliklerinizi listeleyin: ulaşım, okul, mahalle, bina yaşı, kat',
      'En az 10–15 ev görüntüleyin; yalnızca fotoğraflara güvenmeyin',
      'Aynı semtte son 6 ayda satılan emsal fiyatları inceleyin',
      'İskan belgesi, tapu ve yapı ruhsatını satıcıdan isteyin',
      'Bina yönetimi ve komşularla görüşün; aidat ve ortak giderleri sorun',
    ],
  },
  {
    adim: 'Teklif ve Ön Sözleşme',
    sure: '1–2 hafta',
    detay: [
      'Piyasa ortalamasının %5–10 altından başlayan teklif verin',
      'Kabul edilirse satış vaadi (ön sözleşme) yapın; kapora yatırın',
      'Kapora miktarı genellikle satış bedelinin %5–10\'u kadardır',
      'Ön sözleşmede teslim tarihi, koşullar ve cezai şartları açıkça belirtin',
    ],
  },
  {
    adim: 'Kredi Başvurusu ve Ekspertiz',
    sure: '2–4 hafta',
    detay: [
      'Seçtiğiniz bankaya tüm belgelerle resmi kredi başvurusu yapın',
      'Banka, mülk için ekspertiz raporu hazılatır (ücretini siz ödersiniz)',
      'Ekspertiz değeri satış fiyatının altındaysa kredi tutarı buna göre belirlenir',
      'Onay sonrası faiz oranını ve vadeyi son kez müzakere edin',
    ],
  },
  {
    adim: 'Tapu Devri',
    sure: '1 gün',
    detay: [
      'Tapu müdürlüğünden randevu alın (e-devlet üzerinden)',
      'Her iki taraf birlikte ya da vekaletname ile işlem yapılır',
      'Tapu harcı (%2 alıcı + %2 satıcı = toplam %4 satış bedeli üzerinden)',
      'DASK poliçesi tapudan önce hazır olmalıdır',
      'Ödeme banka havalesi ile tapuda yapılır; nakit büyük risk taşır',
    ],
  },
];

const KACINILANLAR = [
  'Sadece fotoğraflara bakarak karar vermek — mutlaka fiziksel inceleme yapın',
  'İskan belgesi olmayan (kaçak yapı) gayrimenkul almak',
  'Takyidat/ipotek araştırması yapmadan kapora yatırmak',
  'Acele kararla müzakere yapmadan teklif kabul etmek',
  'Aylık taksiti gelirin %40\'ının üzerine çıkarmak',
  'Emsal fiyat araştırması yapmadan liste fiyatını kabul etmek',
  'Kredi onayı olmadan ön sözleşme yapmak',
];

const DEVLET_DESTEKLERI = [
  { destek: 'TOKİ Konut Projeleri', aciklama: 'Düşük gelirli aileler için uygun fiyatlı konut kampanyaları; uzun vadeli taksit imkânı.' },
  { destek: 'Sosyal Konut Projesi', aciklama: 'İlk kez ev alacak vatandaşlar için devlet destekli düşük faizli kredi kampanyaları.' },
  { destek: 'KGF Destekli Krediler', aciklama: 'Kredi Garanti Fonu güvencesiyle düşük notlu başvurulara da açılan konut kredileri.' },
  { destek: 'Engellilik/Şehit Ailesi İndirimleri', aciklama: 'Belirli gruplar için tapu harcı muafiyeti veya indirimi söz konusu olabilir.' },
];

export default function IlkEvAlmaRehberiPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-2 bg-[#00C49F]/20 border border-[#00C49F]/30 text-[#00C49F] text-xs font-bold px-4 py-1.5 rounded-full mb-5">
            <Home size={13} /> İlk Ev Alımı
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
            İlk Ev Alma Rehberi 2024
          </h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed mb-8">
            Bütçe planlamasından tapu devrine kadar ilk ev alımının 6 adımı. Hata yapmadan ev sahibi olun.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-[#00C49F]">6 Adım</p>
              <p className="text-xs text-gray-400">Alım süreci</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-white">%20</p>
              <p className="text-xs text-gray-400">Min. peşinat</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-amber-400">%6–8</p>
              <p className="text-xs text-gray-400">Ek masraf oranı</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">

        {/* Adımlar */}
        {ADIMLAR.map((a, i) => (
          <section key={i}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-[#00C49F] text-white text-sm font-black flex items-center justify-center shrink-0">{i + 1}</div>
              <div>
                <h2 className="text-lg font-black text-gray-900">{a.adim}</h2>
                <span className="text-[10px] text-amber-600 font-bold">{a.sure}</span>
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm space-y-2">
              {a.detay.map((d, di) => (
                <div key={di} className="flex items-start gap-2 py-1.5 border-b border-gray-50 last:border-0">
                  <CheckCircle size={12} className="text-[#00C49F] shrink-0 mt-0.5" />
                  <p className="text-xs text-gray-700 leading-relaxed">{d}</p>
                </div>
              ))}
            </div>
          </section>
        ))}

        {/* Kaçınılacaklar */}
        <section className="bg-rose-50 rounded-2xl border border-rose-100 p-6">
          <h2 className="text-sm font-black text-rose-800 mb-4 flex items-center gap-2">
            <AlertTriangle size={14} className="text-rose-600" /> Bunlardan Kaçının
          </h2>
          <div className="space-y-2">
            {KACINILANLAR.map((k, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="text-rose-500 shrink-0 mt-0.5 text-xs font-black">✕</span>
                <p className="text-xs text-rose-700 leading-relaxed">{k}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Devlet Destekleri */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4 flex items-center gap-2">
            <Star size={14} className="text-amber-500" /> Devlet Destekleri
          </h2>
          <div className="space-y-3">
            {DEVLET_DESTEKLERI.map((d, i) => (
              <div key={i} className="grid grid-cols-3 gap-2 py-2 border-b border-gray-50 last:border-0">
                <p className="text-xs font-black text-[#00C49F]">{d.destek}</p>
                <p className="text-[10px] text-gray-600 leading-relaxed col-span-2">{d.aciklama}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Related */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-4">İlgili Araçlar</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { href: '/pesinat-hesaplayici', label: 'Peşinat Hesaplayıcı' },
              { href: '/konut-kredisi-simulatoru', label: 'Konut Kredisi Simülatörü' },
              { href: '/kredi-notu-rehberi', label: 'Kredi Notu Rehberi' },
              { href: '/tapu-masrafi', label: 'Tapu Masrafı Hesaplayıcı' },
              { href: '/kira-mi-satin-mi', label: 'Kira mı Satın mı?' },
              { href: '/rehber/ev-satin-alma', label: 'Ev Satın Alma Rehberi' },
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
