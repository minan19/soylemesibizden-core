import { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle, AlertTriangle, ArrowRight, FileText } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Kira Sözleşmesi Hazırlama Rehberi | Zorunlu Maddeler, İpuçları | Söylemesi Bizden',
  description:
    'Kira sözleşmesi nasıl hazırlanır? Zorunlu maddeler, ek hükümler, taraf hakları ve noter onayı hakkında kapsamlı rehber.',
};

const ZORUNLU_MADDELER = [
  { madde: 'Tarafların Kimlik Bilgileri', aciklama: 'Kiraya veren ve kiracının adı, soyadı, TC kimlik numarası veya vergi numarası ile adresleri.' },
  { madde: 'Kiralananın Tanımı', aciklama: 'Mülkün adresi, kat, kapı numarası, tapu bilgisi (ada/parsel) ve net/brüt alanı.' },
  { madde: 'Kira Bedeli', aciklama: 'Aylık kira tutarı rakam ve yazıyla; hangi para biriminde ödeneceği (TL, USD vb.).' },
  { madde: 'Ödeme Tarihi ve Yöntemi', aciklama: 'Kiranın her ayın kaçında, hangi banka hesabına ya da elden ödeneceği.' },
  { madde: 'Kira Artış Koşulu', aciklama: 'TÜFE, sabit oran veya karşılıklı mutabakat ile artış yöntemi; yasal %25 tavan dikkate alınmalı.' },
  { madde: 'Kira Süresi', aciklama: 'Başlangıç ve bitiş tarihi; belirsiz süreli ya da 1 yıllık dönem uzatmaları hakkında hüküm.' },
  { madde: 'Depozito', aciklama: 'Güvence bedelinin miktarı (max 3 aylık kira), ödeme tarihi ve iade koşulları.' },
  { madde: 'Kullanım Amacı', aciklama: 'Mülkün konut, işyeri veya karma kullanım amacıyla kiralandığı.' },
];

const EK_HUKUMLER = [
  { hukum: 'Yan Giderler', aciklama: 'Su, elektrik, doğalgaz, internet ve aidat gibi giderlerin kime ait olduğu.' },
  { hukum: 'Tadilat İzni', aciklama: 'Kiracının mülkte tadilat yapıp yapamayacağı; yapılacaksa izin koşulları ve çıkıştaki durum.' },
  { hukum: 'Evcil Hayvan', aciklama: 'Evcil hayvan beslenip besilemeyeceği; beslenebiliyorsa hangi koşullar altında.' },
  { hukum: 'Alt Kiralama Yasağı', aciklama: 'Kiracının mülkü kiraya veren izni olmaksızın başkasına kiralaması veya devretmesi yasağı.' },
  { hukum: 'Erken Fesih Cezası', aciklama: 'Kira süresi dolmadan çıkılması halinde uygulanacak cezai şart (genellikle 1–3 aylık kira).' },
  { hukum: 'Fotoğraflı Teslim Tutanağı', aciklama: 'Mülkün teslim tarihindeki durumunu belgeleyen, her iki tarafça imzalanan tutanağın sözleşme eki sayılacağı.' },
];

const NOTERDE_FAYDASI = [
  { avantaj: 'Resmiyet ve Kesinlik', detay: 'Noter onaylı sözleşme, tarafların kimliğini teyit eder ve inkâra karşı güçlü delil oluşturur.' },
  { avantaj: 'İcra Takibi', detay: 'İlamlar gibi icra takibine konu edilebilir; mahkeme kararı olmaksızın haciz yapılabilir.' },
  { avantaj: 'Tahliye Kolaylığı', detay: 'Noterden yapılan kira sözleşmesine dayalı tahliye talebi mahkemede daha hızlı sonuçlanır.' },
  { avantaj: 'Vergi Beyanı', detay: 'Vergi dairesi tarafından talep edildiğinde noter onaylı sözleşme, kira gelirinin kanıtı olarak kabul edilir.' },
];

const HATA_YAPILMASIN = [
  { hata: 'Yüksek Kira Göstermemek', aciklama: 'Gerçek kiradan düşük tutarı sözleşmeye yazmak, kiracının gelecekte artışa itiraz etmesine zemin hazırlar.' },
  { hata: 'Depozito Makbuzu Almamak', aciklama: 'Nakdi depozitoyu belgelemeden ödemek, iade anlaşmazlıklarında sizi zor durumda bırakır.' },
  { hata: 'Eşya Listesi Yapmamak', aciklama: 'Eşyalı kiralamada teslim edilen eşyaların listesi yapılmazsa çıkışta hasar tespiti güçleşir.' },
  { hata: 'Artış Maddesini Atlamak', aciklama: 'Artış hükmü olmayan sözleşmede TÜFE tavanı uygulanır; yüksek enflasyonda kira güncellenmez.' },
];

export default function KiraSozlesmesiHazirlamaPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-2 bg-[#00C49F]/20 border border-[#00C49F]/30 text-[#00C49F] text-xs font-bold px-4 py-1.5 rounded-full mb-5">
            <FileText size={13} /> Kira Sözleşmesi
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
            Kira Sözleşmesi Hazırlama Rehberi
          </h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed mb-8">
            Zorunlu maddeler, ek hükümler, noter onayının avantajları ve yapılmaması gereken hatalar.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-[#00C49F]">8 Madde</p>
              <p className="text-xs text-gray-400">Zorunlu içerik</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-white">Max 3</p>
              <p className="text-xs text-gray-400">Aylık depozito sınırı</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-amber-400">%25</p>
              <p className="text-xs text-gray-400">Kira artış tavanı</p>
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
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-[#00C49F] text-white text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5">{i + 1}</div>
                  <div>
                    <p className="text-xs font-black text-gray-900">{m.madde}</p>
                    <p className="text-[10px] text-gray-600 leading-relaxed mt-0.5">{m.aciklama}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Ek Hükümler */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4 flex items-center gap-2">
            <CheckCircle size={14} className="text-[#00C49F]" /> Önerilen Ek Hükümler
          </h2>
          <div className="space-y-2">
            {EK_HUKUMLER.map((e, i) => (
              <div key={i} className="flex items-start gap-3 py-2 border-b border-gray-50 last:border-0">
                <CheckCircle size={12} className="text-[#00C49F] shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-black text-gray-900">{e.hukum}</p>
                  <p className="text-[10px] text-gray-500 mt-0.5">{e.aciklama}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Noterden Onayın Faydası */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Noterden Onayın Avantajları</h2>
          <div className="space-y-3">
            {NOTERDE_FAYDASI.map((n, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
                <p className="text-xs font-black text-[#00C49F] mb-1">{n.avantaj}</p>
                <p className="text-[10px] text-gray-600 leading-relaxed">{n.detay}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Sık Yapılan Hatalar */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4">Sık Yapılan Hatalar</h2>
          <div className="space-y-3">
            {HATA_YAPILMASIN.map((h, i) => (
              <div key={i} className="grid grid-cols-3 gap-2 py-2 border-b border-gray-50 last:border-0">
                <p className="text-xs font-black text-rose-500">{h.hata}</p>
                <p className="text-[10px] text-gray-600 leading-relaxed col-span-2">{h.aciklama}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Uyarı */}
        <section className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
          <AlertTriangle size={14} className="text-amber-600 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-800 leading-relaxed">
            <span className="font-black">Önemli:</span> Bu rehber genel bilgi amaçlıdır. Kira sözleşmenizin yasal geçerlilik açısından incelenmesi için bir avukattan veya emlak danışmanından destek alın.
          </p>
        </section>

        {/* Related */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-4">İlgili Araçlar</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { href: '/kiraci-haklari', label: 'Kiracı Hakları' },
              { href: '/mal-sahibi-haklari', label: 'Mal Sahibi Hakları' },
              { href: '/depozito-yonetimi', label: 'Depozito Yönetimi Rehberi' },
              { href: '/kira-artis-hesaplama', label: 'Kira Artış Hesaplayıcı' },
              { href: '/tahliye-sureci', label: 'Tahliye Süreci Rehberi' },
              { href: '/sozlesme-iptal-cayma', label: 'Sözleşme İptal Rehberi' },
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
