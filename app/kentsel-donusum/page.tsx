import { Metadata } from 'next';
import Link from 'next/link';
import {
  Building2, CheckCircle2, AlertCircle, ArrowRight, Users,
  FileText, Info, Shield, TrendingUp, Home, Clock,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Kentsel Dönüşüm: Haklar, Süreç ve Tazminat | Söylemesi Bizden',
  description:
    'Kentsel dönüşüm nedir, kimler başlatabilir, hak sahipliği nasıl korunur? Riskli yapı tespiti, 2/3 çoğunluk kuralı ve kira yardımı hakkında kapsamlı rehber.',
};

const STAGES = [
  { num: 1, title: 'Riskli Yapı Tespiti', desc: 'Bina sahibi ya da kiracıların en az %10\'u talep etmesiyle veya Bakanlık re\'sen yapı tespiti başlatabilir. Lisanslı kuruluşlarca inceleme yapılır.', icon: Shield },
  { num: 2, title: 'Tespit Kararı Tebliği', desc: 'Riskli olduğu belirlenen bina maliklerine ve kiracılara resmi tebligat yapılır. Tebliğden itibaren 15 gün itiraz hakkı bulunur.', icon: FileText },
  { num: 3, title: 'Anlaşma Süreci', desc: 'Malikler kendi aralarında oy kullanır. En az 2/3 çoğunluk sağlanırsa yenileme/yıkım kararı alınabilir. Azınlıkta kalanların payı bedeli karşılığında devralınır.', icon: Users },
  { num: 4, title: 'Tahliye ve Yıkım', desc: 'Anlaşma sağlanıyorsa 60 gün içinde tahliye ve yıkım gerçekleşir. Kira yardımı ve faiz desteği bu süreçte devreye girer.', icon: Building2 },
  { num: 5, title: 'Yeniden İnşaat', desc: 'Müteahhit seçimi, kat karşılığı ya da hasılat paylaşımı modellerinden biriyle yeni bina inşaatı başlar.', icon: Home },
  { num: 6, title: 'Teslim ve Tapu', desc: 'Yeni bina tamamlandıktan sonra malikler yeni tapularını alır. Süreç genelde 2-5 yıl sürer.', icon: CheckCircle2 },
];

const RIGHTS = [
  { title: 'Kira Yardımı', desc: 'Tahliye edilen malikler ve kiracılar aylık kira yardımı alır. 2024 yılında İstanbul\'da bu tutar ₺10.000-15.000 aralığında uygulanmıştır.' },
  { title: 'Faiz Desteği', desc: 'Riskli alan kapsamındaki yapılar için kullanılan kredilerde faiz desteği sağlanır. Bakanlık belirli koşullarda kredi avantajı sunar.' },
  { title: 'Vergi Muafiyeti', desc: 'Kentsel dönüşüm kapsamındaki satış ve devir işlemlerinde harç, vergi ve tapu masraflarından muafiyet tanınır.' },
  { title: 'İtiraz Hakkı', desc: 'Riskli yapı tespitine 15 gün içinde itiraz edilebilir. Teknik heyet 30 gün içinde yeniden inceleme yapar.' },
  { title: '2/3 Kuralı Koruması', desc: 'Azınlıkta kalan malikler mülklerini gerçek değerinden satmak zorunda bırakılamaz; bağımsız ekspertiz raporu talep edebilirler.' },
  { title: 'Geçici Konut', desc: 'TOKİ \'nin belirlediği bölgelerde, tahliye süreci boyunca geçici konut tahsisi talep edilebilir.' },
];

const RISKS = [
  { title: 'Değer Kaybı Riski', desc: 'Riskli yapı kararı ilan edilen binalarda piyasa değeri düşebilir ve satmak zorunda kalınabilir.' },
  { title: 'Süreç Uzaması', desc: 'Kat maliklerinin anlaşamaması halinde tahliye ve yıkım mahkeme süreci gerektirebilir; bu da yıllarca sürebilir.' },
  { title: 'Müteahhit Riski', desc: 'Bazı dönüşüm projelerinde müteahhit iflasları yaşanmıştır; sözleşmede teminat, güvence ve teslim tarihi kesinleştirilmeli.' },
  { title: 'Azınlık Mağduriyeti', desc: 'Azınlıkta kalan malikler çoğunluk kararına uymak zorundadır; hukuki temsil önerilir.' },
];

const FAQS = [
  { q: 'Kiracılar kentsel dönüşümde ne haklarına sahip?', a: 'Kiracılar kira yardımına hak kazanır. Ancak bina sahibinin haklarının büyük kısmı malike aittir. Kiracının tahliye kararına itiraz hakkı sınırlıdır; sözleşmedeki tazminat şartları ön plana çıkar.' },
  { q: '2/3 çoğunluk nasıl hesaplanır?', a: 'Arsa payı oranları esas alınır; bağımsız bölüm sayısı değil. Büyük arsa paylı malikler daha fazla oy hakkına sahiptir.' },
  { q: 'Riskli yapı tespiti ücreti kim tarafından karşılanır?', a: 'İlk tespit masrafı maliklerden alınır; ancak yapı riskli çıkarsa bu ücret iade edilir. TOKİ ve AFAD ücretsiz tespit hizmeti de sunabilir.' },
  { q: 'Kentsel dönüşümde kat karşılığı nasıl işler?', a: 'Mevcut bina yıkılır, yerine yeni bina yapılır. Malikler arsa payları oranında yeni daireler alır. Müteahhit daire satışından kâr eder.' },
  { q: 'Tapu devri kısıtlaması ne anlama gelir?', a: 'Riskli alan kararnamesiyle kapsama alınan parsellerde tapu devri Bakanlık izniyle mümkün olabilir. Bu, mülkü satma sürecinizi etkileyebilir.' },
];

export default function KentselDonusumPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-800 to-slate-900 text-white">
        <div className="max-w-5xl mx-auto px-6 py-14">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
              <Building2 size={22} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-black tracking-tight">Kentsel Dönüşüm Rehberi</h1>
              <p className="text-slate-400 text-sm mt-0.5">Haklar · Süreç · Kira Yardımı · 2/3 Kuralı</p>
            </div>
          </div>
          <p className="text-slate-300 text-sm max-w-xl leading-relaxed">
            Türkiye&apos;nin deprem dönüşüm sürecinde milyonlarca vatandaşı etkileyen kentsel dönüşüm.
            Haklarınızı, süreçleri ve riskleri öğrenin.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8">
            {[
              { label: '2/3 Çoğunluk', sub: 'yıkım kararı için' },
              { label: '15 Gün', sub: 'itiraz süresi' },
              { label: 'Kira Yardımı', sub: 'tahliye sürecinde' },
              { label: 'Vergi Muafiyeti', sub: 'satış ve devir' },
            ].map(f => (
              <div key={f.label} className="bg-white/5 border border-white/10 rounded-xl p-3">
                <p className="text-sm font-black text-white">{f.label}</p>
                <p className="text-[10px] text-slate-400 mt-0.5">{f.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 py-10 space-y-8">

        {/* Process steps */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="text-sm font-black text-gray-900 mb-6 flex items-center gap-2">
            <Clock size={15} className="text-[#00C49F]" /> Kentsel Dönüşüm Süreci
          </h2>
          <div className="space-y-4">
            {STAGES.map(s => (
              <div key={s.num} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#F0FDF8] flex items-center justify-center shrink-0">
                  <s.icon size={18} className="text-[#00C49F]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold text-gray-400">ADIM {s.num}</span>
                    <span className="text-xs font-black text-gray-900">{s.title}</span>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Rights */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="text-sm font-black text-gray-900 mb-5 flex items-center gap-2">
            <Shield size={15} className="text-[#00C49F]" /> Malik Hakları
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {RIGHTS.map(r => (
              <div key={r.title} className="bg-[#F0FDF8] rounded-xl border border-[#00C49F]/20 p-4">
                <div className="flex items-start gap-2 mb-2">
                  <CheckCircle2 size={13} className="text-[#00C49F] shrink-0 mt-0.5" />
                  <p className="text-xs font-black text-gray-900">{r.title}</p>
                </div>
                <p className="text-[11px] text-gray-500 leading-relaxed pl-5">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Risks */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="text-sm font-black text-gray-900 mb-5 flex items-center gap-2">
            <AlertCircle size={15} className="text-rose-500" /> Riskler ve Dikkat Edilecekler
          </h2>
          <div className="space-y-3">
            {RISKS.map(r => (
              <div key={r.title} className="flex items-start gap-3 p-4 bg-rose-50 border border-rose-100 rounded-xl">
                <AlertCircle size={13} className="text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-rose-700">{r.title}</p>
                  <p className="text-xs text-rose-600 mt-0.5 leading-relaxed">{r.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Investment angle */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
          <h2 className="text-sm font-black text-amber-900 mb-3 flex items-center gap-2">
            <TrendingUp size={14} className="text-amber-500" /> Yatırımcı Perspektifi
          </h2>
          <ul className="space-y-2 text-xs text-amber-800">
            {[
              'Dönüşüm alanlarında eski bina fiyatları düşük, yeni bina değeri yüksektir; arsa payı yatırımı cazip olabilir.',
              'Riskli bölge kararnamesi olmadan bina sahibi dönüşümü başlatamaz; belediye sınırlarını kontrol edin.',
              'Kat karşılığı sözleşmesinde yeni daire/alan oranı, garanti fiyatı ve teslim tarihi kritik maddelerdir.',
              'Büyük ölçekli riskli alan kararları (ör. Fikirtepe, Başıbüyük) bölge değerini önce düşürüp sonra artırabilir.',
              'Kiracılı daireler, dönüşüm sürecinde tahliye masrafı ve kira kaybı riski nedeniyle fiyatı daha düşük olabilir.',
            ].map(tip => (
              <li key={tip} className="flex items-start gap-2">
                <CheckCircle2 size={11} className="text-amber-500 shrink-0 mt-0.5" />
                {tip}
              </li>
            ))}
          </ul>
        </div>

        {/* FAQ */}
        <div>
          <h2 className="text-sm font-black text-gray-900 mb-4">Sıkça Sorulan Sorular</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {FAQS.map(f => (
              <div key={f.q} className="bg-white rounded-2xl border border-gray-100 p-5">
                <p className="text-xs font-black text-gray-900 mb-2">{f.q}</p>
                <p className="text-xs text-gray-500 leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-2xl p-4">
          <Info size={14} className="text-amber-500 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-700 leading-relaxed">
            Kentsel dönüşüm mevzuatı sık güncellenmektedir (6306 sayılı Kanun ve yönetmelikleri).
            Hak kayıplarını önlemek için süreçe girişmeden önce gayrimenkul hukuku alanında uzman
            bir avukata danışmanızı öneririz.
          </p>
        </div>

        {/* Related */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { href: '/rehber/ev-satin-alma', label: 'Ev Satın Alma Rehberi', desc: 'Tapu süreçleri ve dikkat edilecekler' },
            { href: '/imar-durumu', label: 'İmar Durumu Rehberi', desc: 'TAKS/KAKS ve ruhsat süreci' },
            { href: '/gayrimenkul-sozlugu', label: 'Gayrimenkul Sözlüğü', desc: 'Kentsel dönüşüm terimleri' },
          ].map(t => (
            <Link
              key={t.href}
              href={t.href}
              className="group bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md hover:border-[#00C49F]/30 transition-all flex items-center gap-4"
            >
              <div className="flex-1">
                <p className="text-sm font-bold text-gray-800 group-hover:text-[#00C49F] transition-colors">{t.label}</p>
                <p className="text-xs text-gray-400">{t.desc}</p>
              </div>
              <ArrowRight size={14} className="text-gray-300 group-hover:text-[#00C49F] transition-colors shrink-0" />
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
