import { Metadata } from 'next';
import Link from 'next/link';
import { FileText, CheckCircle, AlertTriangle, ArrowRight, Scale } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Kira Sözleşmesi Örneği 2024 | Madde Madde Şablon | Söylemesi Bizden',
  description:
    'Türk Borçlar Kanunu\'na uygun kira sözleşmesi örneği. Zorunlu maddeler, depozito, fesih koşulları ve sık yapılan hatalar.',
};

const SOZLESME_TARAFLARI = [
  {
    taraf: 'Kiraya Veren (Mal Sahibi)',
    bilgiler: ['Ad Soyad / Unvan', 'TC Kimlik No / Vergi No', 'İkametgah / Tescilli Adres', 'İletişim Bilgileri'],
    not: 'Şirket ise imza yetkisi olan kişi imzalamalı; yetki belgesi eklenmeli.',
  },
  {
    taraf: 'Kiracı',
    bilgiler: ['Ad Soyad (tüm ortak kiracılar)', 'TC Kimlik No', 'İş Yeri / İkametgah Adresi', 'Telefon ve E-posta'],
    not: 'Birden fazla kiracı varsa hepsi imzalamalı; müşterek borç hükmü eklenebilir.',
  },
  {
    taraf: 'Kefil (varsa)',
    bilgiler: ['Ad Soyad', 'TC Kimlik No', 'İmza (noter onaylı önerilir)', 'Kefaletinin üst sınırı'],
    not: 'TBK 603: kefalet eşin yazılı rızası olmadan geçersizdir.',
  },
];

const ZORUNLU_MADDELER = [
  {
    madde: '1. Kiralanan Taşınmaz',
    icerik: 'Adres, bağımsız bölüm no, tapu bilgileri (ada/parsel), brüt ve net alan, kat, cephe bilgisi.',
    onemi: 'Zorunlu',
  },
  {
    madde: '2. Kira Bedeli ve Ödeme',
    icerik: 'Aylık kira tutarı, ödeme günü (örn: her ayın 5\'i), ödeme şekli (IBAN / nakit), geç ödeme faizi.',
    onemi: 'Zorunlu',
  },
  {
    madde: '3. Kira Süresi',
    icerik: 'Başlangıç ve bitiş tarihi. 1 yıllık sözleşme konut kirasında standarttır; iş yeri kirası farklı süre alabilir.',
    onemi: 'Zorunlu',
  },
  {
    madde: '4. Depozito (Güvence Bedeli)',
    icerik: 'Miktarı (en fazla 3 aylık kira — TBK 342) ve nereye yatırılacağı (vadeli hesap / kefalet senedi).',
    onemi: 'Zorunlu',
  },
  {
    madde: '5. Kira Artışı',
    icerik: 'TÜFE endeksi üst sınır; yüzde veya endeks bazlı artış. 2024 konut kirasında %25 tavan uygulaması devam eder.',
    onemi: 'Zorunlu',
  },
  {
    madde: '6. Kullanım Amacı',
    icerik: 'Konut mu, işyeri mi? Alt kiralama yasak/serbest? Hayvan bulundurma izni? Ticari faaliyet izni?',
    onemi: 'Önemli',
  },
  {
    madde: '7. Bakım ve Onarım',
    icerik: 'Olağan bakım kiracıya, büyük onarım kiraya verene ait (TBK 317–319). İstisnaların sözleşmede belirtilmesi.',
    onemi: 'Önemli',
  },
  {
    madde: '8. Taşınmazın Teslim Durumu',
    icerik: 'Demirbaş listesi, fotoğraflı teslim tutanağı, sayaç endeksleri. İade anında karşılaştırma belgesi olur.',
    onemi: 'Kritik',
  },
  {
    madde: '9. Sözleşmenin Sona Ermesi',
    icerik: 'Kiracı bildirim süresi (konut: 15 gün; iş yeri: 3 ay). Mal sahibi hangi koşullarda feshedebilir (TBK 347–356).',
    onemi: 'Önemli',
  },
  {
    madde: '10. Uyuşmazlık Çözümü',
    icerik: 'Arabuluculuk zorunluluğu (2023 sonrası). Yetkili mahkeme: kiralananın bulunduğu yer sulh hukuk mahkemesi.',
    onemi: 'Önemli',
  },
];

const YANLIS_MADDELER = [
  {
    hata: '"Kiraya veren istediği zaman tahliye edebilir"',
    neden: 'TBK 347: kiraya veren ancak Kanun\'da sayılan nedenlerle fesih yapabilir. Bu madde geçersiz sayılır.',
    sonuc: 'Geçersiz',
  },
  {
    hata: '"5 aylık depozito alınacaktır"',
    neden: 'TBK 342 azami 3 aylık kira bedeli sınırı koyar. Fazla alınan kısmı kiracı geri isteyebilir.',
    sonuc: 'Geçersiz',
  },
  {
    hata: '"Kira artışı %50 olarak kararlaştırılmıştır"',
    neden: 'Konut kiralarında TÜFE üst sınırı. 2024 itibarıyla ek %25 tavan. Aşan kısım uygulanamaz.',
    sonuc: 'Kısmen Geçersiz',
  },
  {
    hata: '"Kiracı izinsiz tadilat yapabilir"',
    neden: 'TBK 321: kiracı tadilat için kiraya verenin yazılı iznini almak zorunda. Bu madde haklar kaybına yol açabilir.',
    sonuc: 'Riskli',
  },
  {
    hata: '"Alt kiralama serbesttir"',
    neden: 'TBK 322: izinsiz alt kiralama yasak. "Serbesttir" yazmak kiraya verenin rızasını belgelemek açısından önemli.',
    sonuc: 'Dikkat',
  },
];

const KONTROL_LISTESI = [
  'Tapu fotokopisi alındı ve adres doğrulandı',
  'Fotoğraflı teslim tutanağı imzalandı',
  'Sayaç (elektrik/su/doğalgaz) endeksleri kaydedildi',
  'Demirbaş listesi (klima, ankastre vb.) oluşturuldu',
  'Depozito vadeli hesaba yatırıldı (banka dekontu alındı)',
  'Her iki taraf nüfus cüzdanı fotokopisi eklendi',
  'Sözleşme iki nüsha imzalandı (her tarafa bir nüsha)',
  'Varsa kefalet noter onaylı alındı',
  'Aidat, yakıt, ortak gider sorumluluğu netleştirildi',
];

const SURE_BILGISI = [
  { konu: 'Konut kirasında kiracı fesih bildirimi', sure: '15 gün', kanal: 'TBK 347' },
  { konu: 'İşyeri kirasında kiracı fesih bildirimi', sure: '3 ay', kanal: 'TBK 347' },
  { konu: 'Mal sahibi ihtiyaç nedeniyle fesih', sure: '6 ay önceden', kanal: 'TBK 350' },
  { konu: 'Depozito iadesi (iade koşulları oluştuktan sonra)', sure: 'En fazla 3 ay', kanal: 'TBK 342' },
  { konu: 'Kira artış bildirimi önceden yapılmalı', sure: 'Dönem başında', kanal: 'Uygulama' },
  { konu: 'Arabuluculuk (dava öncesi zorunlu)', sure: 'Dava öncesi', kanal: 'HMK + 2023 düzenleme' },
];

export default function KiraSozlesmesiOrnekPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-2 bg-[#00C49F]/20 border border-[#00C49F]/30 text-[#00C49F] text-xs font-bold px-4 py-1.5 rounded-full mb-5">
            <FileText size={13} /> Kira Sözleşmesi Rehberi
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
            Kira Sözleşmesi Örneği 2024
          </h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed mb-8">
            TBK&apos;ya uygun kira sözleşmesi için zorunlu maddeler, taraf bilgileri, depozito koşulları ve kaçınılması gereken hatalar.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-[#00C49F]">10</p>
              <p className="text-xs text-gray-400">Zorunlu madde</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-white">3 Ay</p>
              <p className="text-xs text-gray-400">Maks. depozito</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-amber-400">TBK 342</p>
              <p className="text-xs text-gray-400">Temel kanun maddesi</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">

        {/* Taraflar */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Sözleşme Tarafları</h2>
          <div className="space-y-4">
            {SOZLESME_TARAFLARI.map((t, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                <p className="text-xs font-black text-gray-900 mb-3">{t.taraf}</p>
                <div className="grid grid-cols-2 gap-2 mb-3">
                  {t.bilgiler.map((b, j) => (
                    <div key={j} className="flex items-center gap-2">
                      <CheckCircle size={12} className="text-[#00C49F] shrink-0" />
                      <p className="text-[10px] text-gray-700">{b}</p>
                    </div>
                  ))}
                </div>
                <p className="text-[10px] text-amber-700 bg-amber-50 rounded-lg px-3 py-2">{t.not}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Zorunlu Maddeler */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Zorunlu ve Önemli Maddeler</h2>
          <div className="space-y-3">
            {ZORUNLU_MADDELER.map((m, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                <div className="flex items-start justify-between mb-2">
                  <p className="text-xs font-black text-gray-900">{m.madde}</p>
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded ml-2 shrink-0 ${
                    m.onemi === 'Zorunlu' ? 'bg-rose-50 text-rose-600' :
                    m.onemi === 'Kritik' ? 'bg-purple-50 text-purple-600' :
                    'bg-amber-50 text-amber-600'
                  }`}>{m.onemi}</span>
                </div>
                <p className="text-[10px] text-gray-600 leading-relaxed">{m.icerik}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Yanlış Maddeler */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Geçersiz ve Riskli Maddeler</h2>
          <div className="space-y-3">
            {YANLIS_MADDELER.map((y, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                <div className="flex items-start justify-between mb-2">
                  <p className="text-xs font-bold text-gray-800 italic">&ldquo;{y.hata}&rdquo;</p>
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded ml-2 shrink-0 ${
                    y.sonuc === 'Geçersiz' ? 'bg-rose-50 text-rose-600' :
                    y.sonuc === 'Kısmen Geçersiz' ? 'bg-orange-50 text-orange-600' :
                    'bg-amber-50 text-amber-600'
                  }`}>{y.sonuc}</span>
                </div>
                <p className="text-[10px] text-gray-600 leading-relaxed">{y.neden}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Süre Bilgisi */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4 flex items-center gap-2">
            <Scale size={14} className="text-[#00C49F]" /> Yasal Süreler
          </h2>
          <div className="space-y-2">
            {SURE_BILGISI.map((s, i) => (
              <div key={i} className="grid grid-cols-3 gap-2 py-2 border-b border-gray-50 last:border-0">
                <p className="text-[10px] text-gray-800 col-span-2 leading-relaxed">{s.konu}</p>
                <div className="text-right">
                  <span className="text-[10px] bg-[#F0FDF8] text-[#00C49F] font-black px-2 py-0.5 rounded">{s.sure}</span>
                  <p className="text-[9px] text-gray-400 mt-0.5">{s.kanal}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Kontrol Listesi */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4 flex items-center gap-2">
            <CheckCircle size={14} className="text-[#00C49F]" /> İmza Öncesi Kontrol Listesi
          </h2>
          <div className="grid grid-cols-1 gap-2">
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
            <span className="font-black">Önemli:</span> Bu örnek genel bilgi amaçlıdır. Sözleşmenizdeki özel koşullar için avukat veya gayrimenkul danışmanından destek almanız tavsiye edilir. Kira mevzuatı sık değişir; imzalamadan önce güncel TBK hükümlerini kontrol edin.
          </p>
        </section>

        {/* Related */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-4">İlgili Araçlar</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { href: '/kira-sozlesmesi', label: 'Kira Sözleşmesi Rehberi' },
              { href: '/depozito', label: 'Depozito Rehberi' },
              { href: '/tahliye-davasi', label: 'Tahliye Davası' },
              { href: '/kira-tespit-davasi', label: 'Kira Tespit Davası' },
              { href: '/kira-artis-hesaplama', label: 'Kira Artış Hesaplayıcı' },
              { href: '/kira-geliri-vergisi', label: 'Kira Geliri Vergisi' },
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
