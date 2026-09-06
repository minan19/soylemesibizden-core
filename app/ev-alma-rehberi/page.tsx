import { Metadata } from 'next';
import Link from 'next/link';
import { Key, CheckCircle, AlertTriangle, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Ev Alma Rehberi 2024 | Tapu, Banka Kredisi, Adım Adım | Söylemesi Bizden',
  description:
    'Türkiye\'de ev satın alma rehberi: bütçe, kredi başvurusu, tapu devri, ekspertiz ve hukuki kontrol. Adım adım rehber.',
};

const ADIMLAR = [
  {
    adim: '1. Bütçe ve Finansman Planı',
    sure: '1–2 hafta',
    icerik: [
      'Toplam bütçenizi belirleyin: peşinat (%20–30) + ek masraflar (%4–8)',
      'Banka kredi başvurusu için gelir belgelerini hazırlayın',
      'Farklı bankaların konut kredisi faiz oranlarını karşılaştırın',
      'Aylık taksit miktarı net gelirinizin %40\'ını aşmamalı',
    ],
  },
  {
    adim: '2. Arama ve Mülk Seçimi',
    sure: '2–8 hafta',
    icerik: [
      'Öncelikli kriterleri listeleyin: konum, alan, oda sayısı, bina yaşı',
      'Birden fazla mülkü aynı kriterlere göre karşılaştırın',
      'Gündüz ve gece farklı saatlerde ziyaret edin',
      'Bölgedeki son 3–6 aydaki emsal satışları araştırın',
      'Okul/hastane/metro mesafelerini doğrulayın',
    ],
  },
  {
    adim: '3. Hukuki ve Teknik Kontrol',
    sure: '1–2 hafta',
    icerik: [
      'Tapu kaydı üzerinde haciz/ipotek var mı kontrol edin (Tapu Müdürlüğü/e-Devlet)',
      'İmar durumunu belediyeden teyit edin',
      'Kat mülkiyeti veya kat irtifakı tapusu mu? (Kat mülkiyeti tercih edilmeli)',
      'Yapı ruhsatı ve iskan belgesini isteyin',
      'Bina deprem yönetmeliğine uygun mu? Güçlendirme var mı?',
    ],
  },
  {
    adim: '4. Fiyat Müzakeresi ve Ön Anlaşma',
    sure: '1 hafta',
    icerik: [
      'Emsal fiyatlara ve mülkün eksikliklerine göre indirim talep edin',
      'Satıcıyla yazılı ön protokol veya satış vaadi sözleşmesi yapın',
      'Cayma bedeli (pişmanlık tazminatı) her iki taraf için belirlenmeli',
      'Ön ödeme miktarını belgeleyin',
    ],
  },
  {
    adim: '5. Banka Ekspertizi ve Kredi Onayı',
    sure: '1–3 hafta',
    icerik: [
      'Kredi başvurusu yapılır; banka SPK lisanslı ekspertiz ister',
      'Ekspertiz değeri satış fiyatının altında çıkarsa kredi tutarı buna göre belirlenir',
      'Banka onayı gelince sigorta (DASK + konut sigortası) yaptırılır',
      'Kredi sözleşmesini dikkatlice okuyun: değişken/sabit faiz, erken ödeme koşulları',
    ],
  },
  {
    adim: '6. Tapu Devri',
    sure: '1 gün',
    icerik: [
      'Tapu Müdürlüğü\'nde randevu alın (webtapu.tkgm.gov.tr)',
      'Tapu harcını (%4) ve döner sermayeyi önceden yatırın',
      'İki taraf veya vekilleri hazır; satış işlemi gerçekleşir',
      'Tapu belgesini ve anahtar teslimini belgelendirin',
      'Elektrik/su/doğalgaz aboneliklerini devredene alın',
    ],
  },
];

const MALIYET_TABLOSU = [
  { kalem: 'Tapu Harcı', oran: '%4', aciklama: 'Beyan değeri üzerinden (alıcı + satıcı paylaşır)' },
  { kalem: 'Döner Sermaye', oran: 'Sabit ~3.200 ₺', aciklama: '2024 tapu sicil hizmet bedeli' },
  { kalem: 'Emlak Komisyonu', oran: '%2 + KDV', aciklama: 'Alıcı payı; serbest pazarlık' },
  { kalem: 'DASK (Zorunlu)', oran: 'Alan × risk bölgesi', aciklama: 'Zorunlu deprem sigortası; kredi zorunlu' },
  { kalem: 'Konut Sigortası', oran: '1.500–6.000 ₺/yıl', aciklama: 'Banka kredisinde zorunlu' },
  { kalem: 'Ekspertiz Ücreti', oran: '2.500–8.000 ₺', aciklama: 'Banka kredisinde zorunlu' },
  { kalem: 'Noterlik Masrafı', oran: '1.000–3.000 ₺', aciklama: 'Vekalet veya satış vaadi sözleşmesi' },
];

const TAPU_KONTROL = [
  'Tapudaki isim satıcı mı? (Kimlik kontrolü)',
  'İpotek, haciz, şerh var mı? (e-Devlet / Tapu Müdürlüğü)',
  'Kat irtifakı mı yoksa kat mülkiyeti mi? (Kat mülkiyeti tercih edilmeli)',
  'Yüzölçümü sözleşmede yazan ile eşleşiyor mu?',
  'Belediye rayiç değeri ile satış fiyatı arasındaki fark makul mü?',
  'İmar durumu: yapı kullanım iznine (iskan) sahip mi?',
];

const HATA_LISTESI = [
  { hata: 'Tapu kontrolü yapmadan kapora vermek', sonuc: 'Hacizli mülk alınabilir' },
  { hata: 'Sadece satıcının sözüne güvenmek', sonuc: 'Hukuki sorunlar fatura olabilir' },
  { hata: 'Ekspertiz değerini göz ardı etmek', sonuc: 'Kredi tutarı düşük çıkabilir' },
  { hata: 'Ortak giderleri hesap dışı bırakmak', sonuc: 'Aylık bütçe aşımı' },
  { hata: 'Sözleşmeyi okumadan imzalamak', sonuc: 'Cayma tazminatı kaybı' },
  { hata: 'Kura etkisini planlamadan değişken faizli kredi almak', sonuc: 'Taksit artışı' },
];

export default function EvAlmaRehberiPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-2 bg-[#00C49F]/20 border border-[#00C49F]/30 text-[#00C49F] text-xs font-bold px-4 py-1.5 rounded-full mb-5">
            <Key size={13} /> Ev Alma Rehberi
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
            Ev Satın Alma Rehberi 2024
          </h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed mb-8">
            Bütçe planlamasından tapu devrine kadar adım adım rehber; ek masraflar, hata kaçınma ve tapu kontrol listesi.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-[#00C49F]">6 Adım</p>
              <p className="text-xs text-gray-400">Ev alma süreci</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-white">%4–8</p>
              <p className="text-xs text-gray-400">Ek masraf oranı</p>
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
          <h2 className="text-xl font-black text-gray-900 mb-4">Adım Adım Ev Satın Alma</h2>
          <div className="space-y-4">
            {ADIMLAR.map((a, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs font-black text-gray-900">{a.adim}</p>
                  <span className="text-[10px] bg-[#F0FDF8] text-[#00C49F] font-black px-2 py-0.5 rounded">{a.sure}</span>
                </div>
                <div className="space-y-2">
                  {a.icerik.map((ic, j) => (
                    <div key={j} className="flex items-start gap-2">
                      <CheckCircle size={12} className="text-[#00C49F] shrink-0 mt-0.5" />
                      <p className="text-[10px] text-gray-700 leading-relaxed">{ic}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Maliyet Tablosu */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4">Alım Ek Masrafları</h2>
          <div className="space-y-2">
            {MALIYET_TABLOSU.map((m, i) => (
              <div key={i} className="grid grid-cols-3 gap-2 py-2 border-b border-gray-50 last:border-0">
                <p className="text-xs font-black text-gray-900">{m.kalem}</p>
                <p className="text-xs font-black text-[#00C49F]">{m.oran}</p>
                <p className="text-[10px] text-gray-500 leading-relaxed">{m.aciklama}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Tapu Kontrol */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4 flex items-center gap-2">
            <CheckCircle size={14} className="text-[#00C49F]" /> Tapu Kontrol Listesi
          </h2>
          <div className="space-y-2">
            {TAPU_KONTROL.map((t, i) => (
              <div key={i} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
                <div className="w-5 h-5 rounded border-2 border-[#00C49F]/40 shrink-0" />
                <p className="text-xs text-gray-700">{t}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Hata Listesi */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">En Yaygın Hatalar ve Sonuçları</h2>
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
            <span className="font-black">Önemli:</span> Kapora vermeden önce tapu sicil kaydını kontrol edin. Hukuki sorunlu bir mülkü satın almak uzun ve pahalı hukuki süreçler doğurabilir. İlk kez ev alıyorsanız deneyimli bir gayrimenkul avukatından destek almanızı öneririz.
          </p>
        </section>

        {/* Related */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-4">İlgili Araçlar</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { href: '/tapu-masrafi', label: 'Tapu Masrafı Hesaplayıcı' },
              { href: '/satinalma-maliyeti', label: 'Satın Alma Maliyeti' },
              { href: '/mortgage-simulatoru', label: 'Mortgage Simülatörü' },
              { href: '/dask-hesaplayici', label: 'DASK Prim Hesaplayıcı' },
              { href: '/ekspertiz-raporu', label: 'Ekspertiz Raporu' },
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
