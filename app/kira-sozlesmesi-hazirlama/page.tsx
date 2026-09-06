import { Metadata } from 'next';
import Link from 'next/link';
import { FileText, CheckCircle, AlertTriangle, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Kira Sözleşmesi Hazırlama Rehberi 2024 | Zorunlu Maddeler, Hukuki Uyarılar | Söylemesi Bizden',
  description:
    'Kira sözleşmesi nasıl hazırlanır? Zorunlu maddeler, geçersiz hükümler, depozito kuralları ve noter onayı hakkında kapsamlı rehber.',
};

const ZORUNLU_MADDELER = [
  { madde: 'Tarafların kimlik bilgileri', detay: 'Kiraya veren ve kiracının T.C. kimlik numarası, adres ve iletişim bilgileri eksiksiz yazılmalı.' },
  { madde: 'Kiralanan taşınmaz', detay: 'Tam adres, kat, brüt/net m², tapu bilgileri ve bağımsız bölüm numarası.' },
  { madde: 'Kira bedeli ve ödeme koşulları', detay: 'Aylık kira tutarı (rakam ve yazıyla), ödeme tarihi, banka IBAN numarası.' },
  { madde: 'Kira artış şartı', detay: 'Yıllık artış oranı: tüketici enflasyonu (TÜFE) ile sınırlı olup %25 tavan uygulaması devam ediyor (2024).' },
  { madde: 'Depozito', detay: 'En fazla 3 aylık kira tutarı. Nakit veya bankada bloke edilmeli; sözleşme bitişinde hasar olmadıkça iade edilmeli.' },
  { madde: 'Kullanım amacı', detay: 'Konut, işyeri, depo vb. açıkça belirtilmeli. Amaca aykırı kullanım fesih gerekçesi olabilir.' },
  { madde: 'Kira süresi ve başlangıç tarihi', detay: '1 yıl altı kira için bazı kiracı hakları kısıtlanabilir. Belirsiz süreli sözleşmeler 1 yıllık kabul edilir.' },
  { madde: 'Fesih koşulları', detay: 'Süreli sözleşmelerde kiracı son aydan 15 gün önce yazılı bildirimle çıkabilir; kiraya veren 10 yıl sonra ya da yasal sebeple fesih yapabilir.' },
];

const GECERSIZ_HUKMLER = [
  { hukum: '%25 üstünde kira artışı', neden: 'Kanuni tavan %25; üzerindeki hüküm geçersiz sayılır, tavan uygulanır.' },
  { hukum: '3 ayı aşan depozito', neden: 'TBK m.342: azami 3 aylık kira; fazlası geçersizdir.' },
  { hukum: 'Her zaman fesih hakkı kiraya verende', neden: 'Kanunun öngördüğü sebepler dışında tek taraflı fesih geçersizdir.' },
  { hukum: 'Tadilat masrafının tümü kiracıya', neden: 'Adi onarımlar dışındaki masraflar kiraya verene aittir; aksi hüküm geçersiz.' },
  { hukum: 'Kiracının ziyaretçi getirememesi', neden: 'Sözleşmeyle temel kullanım hakkı kısıtlanamaz.' },
];

const NOTER_BILGISI = [
  { durum: 'Konut kiralama', gerek: 'Zorunlu değil', aciklama: 'El yazılı veya imzalı kira sözleşmesi hukuken geçerlidir.' },
  { durum: 'İşyeri kiralama', gerek: 'Zorunlu değil', aciklama: 'Yazılı sözleşme yeterli; ancak noter onaylı tercih edilir.' },
  { durum: '5 yılı aşan uzun vadeli', gerek: 'Önerilir', aciklama: 'Tapu şerhi için noter veya tapu müdürlüğü işlemi yapılabilir.' },
  { durum: 'Yabancı uyruklu kiracı', gerek: 'Önerilir', aciklama: 'Oturma izni başvurularında noter tasdikli sözleşme istenir.' },
];

const KONTROL_LISTESI = [
  'Tarafların kimlik bilgilerini T.C. kimlik numarasıyla doğrulayın',
  'Kiranın IBAN\'a yatırılacağını maddeye ekleyin (ödeme kanıtı)',
  'Depozito miktarını ve iade koşulunu açıkça yazın',
  'Mülkün teslim durumunu (tadilat, demirbaş) tutanak ile belgeleyin',
  'Kira artış oranını açıkça belirtin; "yasal oran" yazarsanız TÜFE bağlanır',
  'Ortak gider (aidat) kimin üstünde olduğunu belirtin',
  'Yan odaların/garajın kiralamaya dahil olup olmadığını netleştirin',
  'İmzaları mavi mürekkeple atın; her sayfayı paraflamayı değerlendirin',
  'İki nüsha hazırlayın; birer nüshayı karşılıklı saklayın',
];

const TAHLIYE_NEDENLERI = [
  { neden: 'Kira borcunun ödenmemesi (temerrüt)', sure: '2 haklı ihtar sonrası dava' },
  { neden: 'Kiraya verenin konut ihtiyacı', sure: 'Sözleşme bitişinde yazılı bildirim' },
  { neden: 'Mülkün yeniden inşası/esaslı onarımı', sure: 'Sözleşme bitişinde yazılı bildirim' },
  { neden: 'Yeni malikin konut/işyeri ihtiyacı', sure: 'Devir tarihinden 1 ay içinde bildirim, 6 ay sonra dava' },
  { neden: '10 yıllık kira süresi', sure: 'Her uzama döneminin bitiminde 3 ay önceden bildirim' },
];

export default function KiraSozlesmesiHazirlamaPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-2 bg-[#00C49F]/20 border border-[#00C49F]/30 text-[#00C49F] text-xs font-bold px-4 py-1.5 rounded-full mb-5">
            <FileText size={13} /> Kira Sözleşmesi Rehberi
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
            Kira Sözleşmesi Hazırlama Rehberi 2024
          </h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed mb-8">
            Geçerli ve güvenli bir kira sözleşmesi için zorunlu maddeler, geçersiz hükümler ve pratik kontrol listesi.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-[#00C49F]">%25</p>
              <p className="text-xs text-gray-400">Kira artış tavanı</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-white">3 Ay</p>
              <p className="text-xs text-gray-400">Maks. depozito</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-amber-400">TBK</p>
              <p className="text-xs text-gray-400">Yasal dayanak</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">

        {/* Zorunlu Maddeler */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Zorunlu Sözleşme Maddeleri</h2>
          <div className="space-y-3">
            {ZORUNLU_MADDELER.map((m, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#00C49F] text-white text-[10px] font-black flex items-center justify-center shrink-0">{i + 1}</div>
                  <div>
                    <p className="text-xs font-black text-gray-900 mb-1">{m.madde}</p>
                    <p className="text-[10px] text-gray-600 leading-relaxed">{m.detay}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Geçersiz Hükümler */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Geçersiz Sayılan Hükümler</h2>
          <div className="space-y-3">
            {GECERSIZ_HUKMLER.map((h, i) => (
              <div key={i} className="bg-rose-50 border border-rose-100 rounded-2xl p-4">
                <p className="text-xs font-black text-rose-700 mb-1">{h.hukum}</p>
                <p className="text-[10px] text-rose-600 leading-relaxed">{h.neden}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Noter */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4">Noter Onayı Gerekli mi?</h2>
          <div className="space-y-2">
            {NOTER_BILGISI.map((n, i) => (
              <div key={i} className="grid grid-cols-3 gap-2 py-2 border-b border-gray-50 last:border-0">
                <p className="text-xs font-black text-gray-900">{n.durum}</p>
                <span className={`text-[10px] font-black px-2 py-0.5 rounded self-start ${n.gerek === 'Zorunlu değil' ? 'bg-[#F0FDF8] text-[#00C49F]' : 'bg-amber-50 text-amber-600'}`}>{n.gerek}</span>
                <p className="text-[10px] text-gray-500 leading-relaxed">{n.aciklama}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Tahliye Nedenleri */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4">Yasal Tahliye Nedenleri</h2>
          <div className="space-y-2">
            {TAHLIYE_NEDENLERI.map((t, i) => (
              <div key={i} className="flex items-start justify-between gap-3 py-2 border-b border-gray-50 last:border-0">
                <p className="text-xs text-gray-800">{t.neden}</p>
                <span className="text-[10px] bg-gray-100 text-gray-600 font-bold px-2 py-0.5 rounded shrink-0">{t.sure}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Kontrol Listesi */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4 flex items-center gap-2">
            <CheckCircle size={14} className="text-[#00C49F]" /> İmzadan Önce Kontrol Listesi
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

        {/* Uyarı */}
        <section className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
          <AlertTriangle size={14} className="text-amber-600 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-800 leading-relaxed">
            <span className="font-black">Önemli:</span> Bu rehber genel bilgi amaçlıdır; hukuki danışmanlık yerine geçmez. Uyuşmazlık durumunda bir gayrimenkul avukatına danışın. Kira sözleşmesi imzalanmadan önce her iki tarafın da koşulları anladığından emin olun.
          </p>
        </section>

        {/* Related */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-4">İlgili Araçlar</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { href: '/kira-sozlesmesi-ornegi', label: 'Kira Sözleşmesi Örneği' },
              { href: '/kiraci-haklari', label: 'Kiracı Hakları' },
              { href: '/mal-sahibi-haklari', label: 'Mal Sahibi Hakları' },
              { href: '/kira-artis-hesaplama', label: 'Kira Artış Hesaplayıcı' },
              { href: '/depozito', label: 'Depozito Rehberi' },
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
