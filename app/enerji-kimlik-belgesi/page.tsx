import { Metadata } from 'next';
import Link from 'next/link';
import {
  Zap, CheckCircle, AlertTriangle, ArrowRight, Clock, ShieldCheck,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Enerji Kimlik Belgesi (EKB) Rehberi | A\'dan G\'ye Enerji Sınıfı | Söylemesi Bizden',
  description:
    'Enerji Kimlik Belgesi nedir, nasıl alınır, ne zaman zorunludur? A\'dan G\'ye enerji sınıfları, EKB maliyeti ve alım-satımda önemi.',
};

const ENERGY_CLASSES = [
  { cls: 'A+', range: '≤ 25 kWh/m²·yıl', color: 'bg-green-600', textColor: 'text-white', label: 'Pasif Bina' },
  { cls: 'A', range: '26–50', color: 'bg-green-500', textColor: 'text-white', label: 'Çok Verimli' },
  { cls: 'B', range: '51–75', color: 'bg-lime-500', textColor: 'text-white', label: 'Verimli' },
  { cls: 'C', range: '76–100', color: 'bg-yellow-400', textColor: 'text-gray-900', label: 'Orta' },
  { cls: 'D', range: '101–150', color: 'bg-orange-400', textColor: 'text-white', label: 'Orta-Alt' },
  { cls: 'E', range: '151–200', color: 'bg-orange-500', textColor: 'text-white', label: 'Düşük' },
  { cls: 'F', range: '201–250', color: 'bg-red-500', textColor: 'text-white', label: 'Çok Düşük' },
  { cls: 'G', range: '> 250', color: 'bg-red-700', textColor: 'text-white', label: 'Yetersiz' },
];

const OBLIGATORY_CASES = [
  { case: 'Satış', detail: '2011 sonrası inşa veya 2012+ ruhsatlı binalarda zorunlu. Tapuya eklenmeden satış yapılamaz.' },
  { case: 'Kiralama', detail: '2017 itibarıyla kiraya verilecek mülklerde EKB belgesi kiracıya gösterilmeli.' },
  { case: 'Yeni Yapı Ruhsatı', detail: '2011 sonrası tüm binalarda yapı kullanma izninde EKB zorunlu.' },
  { case: 'Büyük Tadilat', detail: 'Isıl yalıtım, cam veya mekanik sistem değişiminde güncelleme gerekir.' },
];

const PROCESS_STEPS = [
  { step: '1', title: 'Makine Mühendisi Bul', desc: 'Çevre ve Şehircilik Bakanlığı\'na kayıtlı yetkili enerji kimlik belgesi uzmanına başvurun.', duration: '1 gün' },
  { step: '2', title: 'Yerinde İnceleme', desc: 'Uzman; bina yaşı, yalıtım, cam tipi, ısıtma/soğutma sistemlerini inceler.', duration: '1-2 saat' },
  { step: '3', title: 'Hesaplama ve Rapor', desc: 'BEP-TR yazılımıyla birincil enerji tüketimi hesaplanır; sınıf belirlenir.', duration: '1-3 iş günü' },
  { step: '4', title: 'Ulusal Veri Tabanına Kayıt', desc: 'EKB numarasıyla sisteme işlenir; 10 yıl geçerlidir.', duration: '1 gün' },
  { step: '5', title: 'Belge Teslimi', desc: 'Basılı + dijital EKB alırsınız. Satış/kira sözleşmesine eklenmesi tavsiye edilir.', duration: '1 gün' },
];

const COST_FACTORS = [
  { factor: 'Bina büyüklüğü', detail: 'Küçük daire (≤150m²): ₺1.500–₺3.000; büyük bina çok daha fazla' },
  { factor: 'Bina yaşı ve karmaşıklık', detail: 'Eski ve karma sistemli binalar daha uzun analiz gerektirir' },
  { factor: 'Konum', detail: 'İstanbul ve büyükşehirlerde %20-30 ek ücret' },
  { factor: 'Acele talebi', detail: '24-48 saat teslimat için %30-50 prim' },
];

const UPGRADE_TIPS = [
  { action: 'Çift cam yalıtımlı pencere', gain: '1-2 sınıf iyileşme', cost: '₺800–₺1.500/pencere' },
  { action: 'Dış cephe/çatı ısı yalıtımı', gain: '2-3 sınıf iyileşme', cost: '₺150–₺400/m²' },
  { action: 'Kombili doğalgaz yerine ısı pompası', gain: '1-2 sınıf iyileşme', cost: '₺40.000–₺80.000' },
  { action: 'Güneş enerjisi paneli (PV)', gain: '1 sınıf iyileşme', cost: '₺80.000–₺150.000' },
];

export default function EnerjiKimlikBelgesiPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-2 bg-green-500/20 border border-green-500/30 text-green-300 text-xs font-bold px-4 py-1.5 rounded-full mb-5">
            <Zap size={13} /> Enerji Rehberi
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
            Enerji Kimlik Belgesi (EKB) Rehberi
          </h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed mb-8">
            Satış ve kiralama süreçlerinde zorunlu olan EKB nedir? A&apos;dan G&apos;ye enerji sınıfları,
            nasıl alınır, sınıfı nasıl yükseltilir?
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-green-400">10 yıl</p>
              <p className="text-xs text-gray-400">Belge geçerliliği</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-white">A → G</p>
              <p className="text-xs text-gray-400">Enerji sınıfları</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-amber-400">2011+</p>
              <p className="text-xs text-gray-400">Zorunluluk yılı</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">

        {/* Enerji Sınıfları */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Enerji Performans Sınıfları</h2>
          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm space-y-2">
            {ENERGY_CLASSES.map(e => (
              <div key={e.cls} className="flex items-center gap-3">
                <div className={`w-10 h-8 rounded-lg ${e.color} flex items-center justify-center ${e.textColor} text-sm font-black shrink-0`}>
                  {e.cls}
                </div>
                <div className="flex-1 h-6 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${e.color}`}
                    style={{ width: `${Math.min(100, (8 - ENERGY_CLASSES.findIndex(x => x.cls === e.cls)) * 14)}%` }}
                  />
                </div>
                <div className="w-32 shrink-0">
                  <p className="text-[10px] text-gray-500">{e.range} kWh/m²</p>
                  <p className="text-[10px] font-bold text-gray-700">{e.label}</p>
                </div>
              </div>
            ))}
            <p className="text-[10px] text-gray-400 pt-2">Türkiye konut stoğunun büyük çoğunluğu D-F arasında yer almaktadır.</p>
          </div>
        </section>

        {/* Zorunluluk Durumları */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">EKB Zorunluluğu Ne Zaman Başlar?</h2>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <table className="w-full text-xs">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left px-4 py-3 font-black text-gray-700">Durum</th>
                  <th className="text-left px-4 py-3 font-black text-gray-700">Açıklama</th>
                </tr>
              </thead>
              <tbody>
                {OBLIGATORY_CASES.map((o, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-4 py-3 font-bold text-gray-800 whitespace-nowrap">{o.case}</td>
                    <td className="px-4 py-3 text-gray-600 leading-relaxed">{o.detail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Süreç */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-5">EKB Alma Süreci</h2>
          <div className="space-y-3">
            {PROCESS_STEPS.map(s => (
              <div key={s.step} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center text-xs font-black shrink-0">
                  {s.step}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-3 mb-1">
                    <h3 className="text-sm font-black text-gray-900">{s.title}</h3>
                    <span className="flex items-center gap-1 text-[10px] text-gray-400 whitespace-nowrap">
                      <Clock size={10} /> {s.duration}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Maliyet */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">EKB Maliyetini Etkileyen Faktörler</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {COST_FACTORS.map((c, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                <p className="text-xs font-black text-gray-900 mb-1">{c.factor}</p>
                <p className="text-[10px] text-gray-500 leading-relaxed">{c.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Sınıf Yükseltme */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Enerji Sınıfını Nasıl Yükseltirsiniz?</h2>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <table className="w-full text-xs">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left px-4 py-3 font-black text-gray-700">Önlem</th>
                  <th className="text-left px-4 py-3 font-black text-green-600">Kazanım</th>
                  <th className="text-right px-4 py-3 font-black text-gray-700">Tahmini Maliyet</th>
                </tr>
              </thead>
              <tbody>
                {UPGRADE_TIPS.map((u, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-4 py-3 text-gray-700">{u.action}</td>
                    <td className="px-4 py-3 font-bold text-green-600">{u.gain}</td>
                    <td className="px-4 py-3 text-right text-gray-600">{u.cost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* EKB + değer ilişkisi */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4 flex items-center gap-2">
            <ShieldCheck size={14} className="text-green-500" /> EKB ve Gayrimenkul Değeri
          </h2>
          <div className="space-y-3">
            {[
              'A veya B sınıfı binalarda enerji faturaları D-G sınıfına göre %40-60 daha düşüktür.',
              'Araştırmalar, enerji etkin binaların aynı bölgede %5-15 daha yüksek satış fiyatı elde ettiğini göstermektedir.',
              'Banka değerlemelerinde EKB sınıfı giderek daha fazla hesaba katılmaktadır.',
              'Kentsel dönüşüm projelerinde yüksek sınıflı binalar hibe ve teşvik avantajlarından yararlanabilir.',
            ].map((tip, i) => (
              <div key={i} className="flex items-start gap-2">
                <CheckCircle size={12} className="text-green-500 shrink-0 mt-0.5" />
                <p className="text-xs text-gray-600 leading-relaxed">{tip}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Warning */}
        <section className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
          <AlertTriangle size={14} className="text-amber-600 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-700 leading-relaxed">
            <span className="font-black">EKB olmadan satış geçersiz sayılabilir.</span> Noterde tapu devri sırasında EKB numarasının ibrazı zorunludur; belgesi olmayan satıcılar işlemi tamamlayamayabilir.
          </p>
        </section>

        {/* Related */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-4">İlgili Araçlar</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { href: '/ekspertiz-raporu', label: 'Ekspertiz Raporu Rehberi' },
              { href: '/tapu-devir-sureci', label: 'Tapu Devir Süreci' },
              { href: '/kentsel-donusum', label: 'Kentsel Dönüşüm Rehberi' },
              { href: '/dask-hesaplayici', label: 'DASK Prim Hesaplayıcı' },
              { href: '/konut-sigortasi', label: 'Konut Sigortası Rehberi' },
              { href: '/belediye-hizmetleri', label: 'Belediye Hizmetleri Rehberi' },
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
