import { Metadata } from 'next';
import Link from 'next/link';
import {
  FileText, CheckCircle, AlertTriangle, ArrowRight, Scale,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Taksitli Satış Rehberi | Ön Ödemeli Konut, Cayma, Temerrüt | Söylemesi Bizden',
  description:
    'Gayrimenkulde taksitli ve ön ödemeli satış: sözleşme şartları, 14 günlük cayma hakkı, temerrüt durumu ve tüketici hakları.',
};

const SOZLESME_TURLERI = [
  {
    tur: 'Ön Ödemeli Konut Satışı',
    tanim: 'Konut tesliminden önce tüketiciden peşin veya taksit ödemesi alınması.',
    dayanak: 'Tüketicinin Korunması Hakkında Kanun md. 40–50',
    cayma: '14 gün cayma hakkı; bu sürede ödeme alınamaz.',
    noterde: 'Noterde tapuya şerh gerekir.',
  },
  {
    tur: 'Müteahhit Taksitli Satış',
    tanim: 'Müteahhidin projesini kat karşılığı değil, doğrudan taksitle alıcıya sattığı yöntem.',
    dayanak: 'TBK + Ön Ödemeli Konut Kanunu',
    cayma: 'Sözleşme 14 gün içinde serbestçe dönülebilir.',
    noterde: 'Noterde düzenleme zorunlu; tapuya şerh.',
  },
  {
    tur: 'Sahibinden Taksitli Satış',
    tanim: 'Bireysel satıcının alıcıya taksit imkânı tanıması.',
    dayanak: 'TBK — tarafların anlaşması',
    cayma: 'Tüketici kanunu değil; sözleşme hükümleri geçerli.',
    noterde: 'Zorunlu değil ama resmi şekil tavsiye edilir.',
  },
];

const SOZLESME_ICERIGI = [
  'Tarafların kimlik bilgileri ve iletişim adresleri',
  'Taşınmazın tapu bilgileri (ada, parsel, bağımsız bölüm)',
  'Toplam satış bedeli ve para birimi',
  'Peşinat miktarı ve ödeme tarihi',
  'Taksit sayısı, tutarı ve vade tarihleri',
  'Gecikme faizi oranı ve uygulanacak endeks',
  'Cayma hakkı koşulları ve süresi',
  'Temerrüt halinde sözleşme feshi koşulları',
  'Tapu devri koşulu (son taksit mi, belirli oran mı?)',
  'İnşaat bitmemişse teslim tarihi ve cezai şart',
];

const TEMERRUT = [
  {
    durum: 'Alıcı Temerrüdü',
    detay: 'Taksit ödenmezse satıcı ihtar gönderir. TBK uyarınca makul süre verilir. İhlalin devam etmesi halinde sözleşme feshi ve tahliye.',
    risk: 'Ödenmiş taksitler iade edilebilir ya da sözleşmeye göre tutulabilir.',
  },
  {
    durum: 'Satıcı Temerrüdü',
    detay: 'Teslim gecikirse alıcı kira tazminatı veya teslim zorlaması talebinde bulunabilir.',
    risk: 'Inşaat bitmemişse her ay gecikme tazminatı talep hakkı doğar.',
  },
  {
    durum: 'İnşaatın Durması',
    detay: 'Projenin iflas veya hukuki engel nedeniyle durması halinde tüketici sözleşmeden dönebilir ve ödediği bedeli geri alır.',
    risk: 'İcra takibi; tüketici irtifak hakları devreye girer.',
  },
];

const CAYMA_SEKLI = [
  'Cayma beyanı sözleşme tarihinden itibaren 14 takvim günü içinde yapılmalıdır.',
  'Cayma beyanı iadeli taahhütlü posta veya noter kanalıyla iletilmelidir.',
  'Cayma süresinde satıcı herhangi bir ödeme talep edemez; alınanlar iade edilir.',
  'Cayma hakkı sözleşmede kısıtlanamaz veya kaldırılamaz — taraf aleyhine şartlar geçersiz.',
  'Yabancı para cinsinden sözleşmelerde kur farkı alıcı aleyhine yansıtılamaz.',
];

const BELGE_LISTESI = [
  'Ön ödemeli konut satış sözleşmesi (noter onaylı)',
  'Tapu şerh belgesi (tapu müdürlüğü)',
  'İnşaat ruhsatı veya yapı kullanma izni fotokopisi',
  'Taksit ödemelerine ait banka dekontları / makbuzlar',
  'Projeye ait teknik şartname ve proje onayları',
  'Müteahhit firma TOBB/ticaret sicil kaydı',
  'Sigorta / teminat bilgileri (varsa)',
];

export default function TaksitliSatisPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-2 bg-[#00C49F]/20 border border-[#00C49F]/30 text-[#00C49F] text-xs font-bold px-4 py-1.5 rounded-full mb-5">
            <FileText size={13} /> Taksitli Satış Rehberi
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
            Taksitli Satış Rehberi
          </h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed mb-8">
            Ön ödemeli konut satışı, 14 günlük cayma hakkı, temerrüt durumu ve tüketici koruma haklarınız.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-[#00C49F]">14 Gün</p>
              <p className="text-xs text-gray-400">Yasal cayma süresi</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-white">Noterden</p>
              <p className="text-xs text-gray-400">Zorunlu şekil</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-amber-400">TKHK 40</p>
              <p className="text-xs text-gray-400">Tüketici kanunu maddesi</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">

        {/* Sözleşme Türleri */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Taksitli Satış Türleri</h2>
          <div className="space-y-4">
            {SOZLESME_TURLERI.map((s, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                <p className="text-xs font-black text-gray-900 mb-1">{s.tur}</p>
                <p className="text-[10px] text-gray-600 mb-3 leading-relaxed">{s.tanim}</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <div className="bg-[#F0FDF8] rounded-lg p-2">
                    <p className="text-[10px] text-[#00C49F] font-bold mb-0.5">Dayanak</p>
                    <p className="text-[10px] text-gray-600">{s.dayanak}</p>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-2">
                    <p className="text-[10px] text-blue-600 font-bold mb-0.5">Cayma</p>
                    <p className="text-[10px] text-gray-600">{s.cayma}</p>
                  </div>
                  <div className="col-span-2 bg-amber-50 rounded-lg p-2">
                    <p className="text-[10px] text-amber-600 font-bold mb-0.5">Resmi Şekil</p>
                    <p className="text-[10px] text-gray-600">{s.noterde}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Sözleşme İçeriği */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4 flex items-center gap-2">
            <CheckCircle size={14} className="text-[#00C49F]" /> Sözleşmede Olması Gerekenler
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {SOZLESME_ICERIGI.map((item, i) => (
              <div key={i} className="flex items-start gap-2">
                <div className="w-4 h-4 rounded border-2 border-[#00C49F]/40 shrink-0 mt-0.5" />
                <p className="text-xs text-gray-700 leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Temerrüt */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Temerrüt Durumları</h2>
          <div className="space-y-4">
            {TEMERRUT.map((t, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                <p className="text-xs font-black text-gray-900 mb-2">{t.durum}</p>
                <p className="text-[10px] text-gray-600 mb-2 leading-relaxed">{t.detay}</p>
                <div className="bg-rose-50 border border-rose-100 rounded-lg p-2">
                  <p className="text-[10px] text-rose-600 font-bold mb-0.5">Risk</p>
                  <p className="text-[10px] text-gray-600">{t.risk}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Cayma Şekli */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Cayma Hakkının Kullanımı</h2>
          <div className="space-y-3">
            {CAYMA_SEKLI.map((item, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm flex items-start gap-3">
                <Scale size={13} className="text-blue-500 shrink-0 mt-0.5" />
                <p className="text-xs text-gray-700 leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Belge Listesi */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4 flex items-center gap-2">
            <FileText size={14} className="text-amber-500" /> Gerekli Belgeler
          </h2>
          <div className="space-y-2">
            {BELGE_LISTESI.map((item, i) => (
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
            <span className="font-black">Önemli:</span> Ön ödemeli konut satışında müteahhit, sözleşme bedelinin %10'unu aşan tutarda teminat (banka teminat mektubu veya sigorta) göstermek zorundadır. Bu teminat alınmadan ödeme yapmaktan kaçının.
          </p>
        </section>

        {/* Related */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-4">İlgili Rehberler</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { href: '/pismanlik-hakki', label: 'Pişmanlık Hakkı ve Cayma' },
              { href: '/sozlesme-iptal', label: 'Sözleşme İptal ve Fesih' },
              { href: '/tapu-devir-sureci', label: 'Tapu Devir Süreci' },
              { href: '/kat-karsiligi', label: 'Kat Karşılığı Rehberi' },
              { href: '/odeme-plani', label: 'Ödeme Planı Simülatörü' },
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
