import { Metadata } from 'next';
import Link from 'next/link';
import {
  FileText, CheckCircle, AlertTriangle, ArrowRight, Scale,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Kira Sözleşmesi Örnek Şablonu ve Madde Rehberi | Söylemesi Bizden',
  description:
    'Konut ve işyeri kira sözleşmesi zorunlu maddeleri, örnek hükümler, depozito kuralları ve geçersiz kılınabilecek maddeler rehberi.',
};

const ZORUNLU_MADDELER = [
  { madde: 'Taraflar', aciklama: 'Kiraya veren ve kiracının tam adı, TC kimlik numarası veya vergi numarası, adresi.' },
  { madde: 'Kira Konusu', aciklama: 'Kiralanan taşınmazın adresi, niteliği (konut/işyeri), tapu ada-parsel bilgisi ve kullanım amacı.' },
  { madde: 'Kira Bedeli ve Ödeme', aciklama: 'Aylık kira tutarı (rakam ve yazıyla), ödeme günü ve ödeme yöntemi (banka kanalı zorunlu).' },
  { madde: 'Kira Süresi', aciklama: 'Başlangıç ve bitiş tarihi; belirtilmemişse belirsiz süreli sayılır.' },
  { madde: 'Depozito', aciklama: 'En fazla 3 aylık kira; geri iade koşulları ve süresi (6 ay kural).' },
  { madde: 'Kira Artışı', aciklama: 'Artış oranı veya endeksi; kanuni sınırı aşan maddeler geçersizdir.' },
  { madde: 'Teslim Tutanağı', aciklama: 'Taşınmazın teslim tarihindeki durumunu gösteren ve imzalanan tutanak.' },
  { madde: 'Kullanım Koşulları', aciklama: 'Alt kiralama, evcil hayvan, tadilatlar gibi kullanım kısıtlamaları.' },
];

const GECERSIZ_HUKUMLER = [
  { hüküm: 'Kiracıdan 3 aydan fazla depozito istenmesi', dayanak: 'TBK md. 342 — fazlası kendiliğinden geçersiz.' },
  { hüküm: 'Yıllık artışı TÜFE\'yi aşan oran', dayanak: 'TBK md. 344 — fazlası uygulanamaz; yasal sınır geçerlidir.' },
  { hüküm: 'Kiracıya önceden ihtarsız tahliye hakkı', dayanak: 'TBK md. 352 — yazılı tahliye taahhüdü şartları belirlidir.' },
  { hüküm: 'Sözleşme yenilenmesini engelleyen hüküm', dayanak: 'TBK md. 347 — konut kiralarında kira ilişkisi otomatik uzar.' },
  { hüküm: 'Kiracının haklarından önceden feragat etmesi', dayanak: 'TBK md. 346 — kanunun kiracıya tanıdığı haklardan peşin feragat geçersiz.' },
];

const DEPOZITO_KURALLARI = [
  'Depozito en fazla 3 aylık kira bedeli olabilir (TBK md. 342).',
  'Kiracı depozitoyu nakit ödüyorsa ev sahibi bankada bloke hesap açmalıdır.',
  'Kira ilişkisi sona erince 3 ay içinde iade edilmelidir; hasar yoksa faizle birlikte.',
  'Ev sahibi hasarı ispat etmekle yükümlüdür; ispatlamazsa iade etmek zorundadır.',
  'Bloke hesap yerine kefalet senedi de kabul edilebilir.',
];

const TAHLIYE_DAVALARI = [
  { neden: 'Kira Ödememe', sure: 'Yazılı bildirimden 30 gün sonra', aciklama: '2 haklı ihtar durumunda dönem sonunda tahliye davası açılabilir.' },
  { neden: 'Kiracının Taahhüdü', sure: 'Taahhüt tarihinde', aciklama: 'Kiracı kendi isteğiyle belirli tarihte boşaltacağını noter veya yazılı taahhüt etmişse.' },
  { neden: 'Ev Sahibinin Zorunlu İhtiyacı', sure: 'Sözleşme bitişinde', aciklama: 'Ev sahibi kendisi/eşi/çocuğu için konutu kullanacaksa; gerçek ihtiyaç belgeli olmalı.' },
  { neden: 'Yeniden İnşa/Esaslı Tamir', sure: 'Dönem sonunda', aciklama: 'Binanın yıkılıp yeniden yapılması veya kullanımı engelleyen büyük tamirat.' },
  { neden: 'Sözleşmeye Aykırılık', sure: 'İhbardan sonra', aciklama: 'Kiracının sözleşmede yasaklanan kullanım, alt kiralama veya ciddi zarar verme durumu.' },
];

const ORNEK_MADDELER = [
  {
    baslik: 'Kira Artışı',
    ornek: '"İşbu sözleşme kapsamında kira artışı; her kira yılı sonunda, Türkiye İstatistik Kurumu (TÜİK) tarafından açıklanan bir önceki 12 aylık tüketici fiyatları genel endeksi (TÜFE) değişim oranını geçmeyecek şekilde uygulanacaktır."',
    neden: 'TBK md. 344 uyumlu; yasal sınırı açıkça yansıtır.',
  },
  {
    baslik: 'Depozito İadesi',
    ornek: '"Kiralananın tahliyesinde kiracı, mevcut durumun teslim tutanağındaki durumla aynı olması kaydıyla depozitosunu faizi ile birlikte 3 (üç) ay içinde iade alacaktır."',
    neden: 'İade süresini ve koşulunu netleştirir; uyuşmazlık riskini azaltır.',
  },
  {
    baslik: 'Alt Kiralama Yasağı',
    ornek: '"Kiracı, kiraya verenin yazılı izni olmaksızın kiralananı kısmen veya tamamen başka bir kişiye kiralayamaz, devredemez veya kullandıramaz."',
    neden: 'Yasal dayanak TBK md. 322; alt kiralama için açık yazılı izin şartı.',
  },
];

export default function KiraSozlesmesiOrnegiPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-2 bg-[#00C49F]/20 border border-[#00C49F]/30 text-[#00C49F] text-xs font-bold px-4 py-1.5 rounded-full mb-5">
            <FileText size={13} /> Sözleşme Şablonu
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
            Kira Sözleşmesi Örnek Maddeleri
          </h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed mb-8">
            Zorunlu maddeler, geçersiz hükümler, depozito kuralları, tahliye nedenleri
            ve örnek sözleşme metinleri.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-[#00C49F]">8</p>
              <p className="text-xs text-gray-400">Zorunlu madde</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-white">3 Ay</p>
              <p className="text-xs text-gray-400">Max depozito</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-amber-400">TBK</p>
              <p className="text-xs text-gray-400">Borçlar Kanunu dayanağı</p>
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
              <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm flex items-start gap-3">
                <CheckCircle size={13} className="text-[#00C49F] shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-black text-gray-900 mb-0.5">{m.madde}</p>
                  <p className="text-[10px] text-gray-600 leading-relaxed">{m.aciklama}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Geçersiz Hükümler */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Geçersiz Sayılan Sözleşme Hükümleri</h2>
          <div className="space-y-3">
            {GECERSIZ_HUKUMLER.map((h, i) => (
              <div key={i} className="bg-rose-50 border border-rose-200 rounded-xl p-4 flex items-start gap-3">
                <AlertTriangle size={13} className="text-rose-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-black text-rose-800 mb-0.5">{h.hüküm}</p>
                  <p className="text-[10px] text-rose-700 leading-relaxed">{h.dayanak}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Depozito Kuralları */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4 flex items-center gap-2">
            <Scale size={14} className="text-[#00C49F]" /> Depozito Kuralları
          </h2>
          <ul className="space-y-2.5">
            {DEPOZITO_KURALLARI.map((r, i) => (
              <li key={i} className="flex items-start gap-2">
                <CheckCircle size={11} className="text-[#00C49F] shrink-0 mt-0.5" />
                <p className="text-[10px] text-gray-600 leading-relaxed">{r}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Tahliye Nedenleri */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Tahliye Nedenleri</h2>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="text-left px-4 py-3 font-black text-gray-700">Neden</th>
                    <th className="text-left px-4 py-3 font-black text-gray-700">Süre</th>
                    <th className="text-left px-4 py-3 font-black text-gray-500">Açıklama</th>
                  </tr>
                </thead>
                <tbody>
                  {TAHLIYE_DAVALARI.map((r, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-3 font-bold text-gray-800">{r.neden}</td>
                      <td className="px-4 py-3 text-gray-600">{r.sure}</td>
                      <td className="px-4 py-3 text-gray-500 leading-relaxed">{r.aciklama}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Örnek Maddeler */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Örnek Sözleşme Madde Metinleri</h2>
          <div className="space-y-4">
            {ORNEK_MADDELER.map((o, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                <p className="text-xs font-black text-gray-900 mb-2">{o.baslik}</p>
                <blockquote className="bg-gray-50 border-l-4 border-[#00C49F] rounded-r-lg p-3 mb-2">
                  <p className="text-[10px] text-gray-700 leading-relaxed italic">{o.ornek}</p>
                </blockquote>
                <div className="flex items-start gap-2">
                  <CheckCircle size={11} className="text-[#00C49F] shrink-0 mt-0.5" />
                  <p className="text-[10px] text-gray-600">{o.neden}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Warning */}
        <section className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
          <AlertTriangle size={14} className="text-amber-600 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-800 leading-relaxed">
            <span className="font-black">Uyarı:</span> Bu maddeler örnek niteliğindedir. Kira sözleşmenizi imzalamadan önce bir gayrimenkul hukukçusuna incelettirmenizi öneririz. Özellikle uzun süreli veya yüksek bedellli kiralarda hukuki danışmanlık kritik önem taşır.
          </p>
        </section>

        {/* Related */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-4">İlgili Rehberler</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { href: '/kira-sozlesmesi', label: 'Kira Sözleşmesi Rehberi' },
              { href: '/kira-endeksi', label: 'Kira Endeksi ve TÜFE' },
              { href: '/sozlesme-iptal', label: 'Sözleşme İptal ve Fesih' },
              { href: '/kira-artis-hesaplama', label: 'Kira Artış Hesaplayıcı' },
              { href: '/stopaj-vergisi', label: 'Kira Stopaj Vergisi' },
              { href: '/pismanlik-hakki', label: 'Cayma ve Pişmanlık Hakkı' },
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
