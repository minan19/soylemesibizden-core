import Link from 'next/link';
import { Metadata } from 'next';
import { ArrowLeft, Key, CheckCircle2, AlertTriangle, Info, FileText, Home, TrendingUp } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Kiralama Rehberi | Söylemesi Bizden',
  description: 'Türkiye\'de ev kiralarken bilmeniz gereken sözleşme maddeleri, depozito hakları, kira artış sınırları ve kiracı hakları.',
};

const SECTIONS = [
  {
    id: 'sozlesme',
    title: 'Kira Sözleşmesinde Olması Gereken Maddeler',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    icon: FileText,
    items: [
      'Kira bedeli ve ödeme günü açıkça belirtilmeli.',
      'Kira artış oranı (TÜFE veya sabit oran) sözleşmede yer almalı.',
      'Depozito miktarı ve iade koşulları (hasar tespiti, protokol).',
      'Aidat, doğalgaz, elektrik vs. hangi tarafın ödeyeceği.',
      'Erken fesih koşulları ve ihbar süreleri (genellikle 15-30 gün).',
      'Bakım-onarım sorumluluklarının paylaşımı.',
      'Evcil hayvan, sigara ve ev şartları mutabakat.',
    ],
  },
  {
    id: 'depozito',
    title: 'Depozito Hakları',
    color: 'text-[#00C49F]',
    bg: 'bg-[#F0FDF8]',
    icon: CheckCircle2,
    items: [
      'Türk Borçlar Kanunu\'na göre depozito max. 3 aylık kira olabilir.',
      'Depozito nakden değil; banka hesabına yatırılması önerilir.',
      'Çıkışta iadeye itiraz için hasar tutanağı tutulmalı.',
      'Kiralayanın depozito iade süresi sözleşme bitiminden 3 aydır.',
      'Haksız kesinti için icra ve sulh hukuk mahkemesine başvurulabilir.',
    ],
  },
  {
    id: 'artis',
    title: 'Kira Artış Sınırları',
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    icon: TrendingUp,
    items: [
      '2024 yılı itibarıyla konut kiralarında %25 artış tavanı uygulanmaktadır.',
      'Bu oran her yıl Hazine ve Maliye Bakanlığı tarafından güncellenir.',
      'Sözleşme yenilenmese bile kiracı tavan artış oranını talep edebilir.',
      'Tavanı aşan artış talepleri hukuken geçersizdir.',
      'İlk kira sözleşmelerinde herhangi bir tavan uygulanmaz.',
    ],
  },
];

const CHECKLIST = [
  'Ev sahibinin tapu senedini ve kimliğini kontrol edin',
  'Teslim protokolü yaparak sayaç değerlerini kaydedin',
  'Tüm hasar ve eksiklikleri fotoğrafla belgeleyin',
  'Sözleşmeyi iki nüsha, ıslak imzalı olarak saklayın',
  'İkametgah adres değişikliğini nüfus müdürlüğüne bildirin',
  'Ev sigortasını kiraya başlamadan yaptırın',
];

export default function KiralamaRehberiPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <div className="max-w-3xl mx-auto px-6 py-10 space-y-8">

        {/* Header */}
        <div>
          <Link href="/rehber" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-gray-700 transition-colors mb-3">
            <ArrowLeft size={14} /> Rehberler
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center">
              <Key size={22} className="text-blue-600" />
            </div>
            <div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Rehber · 6 dk okuma</span>
              <h1 className="text-2xl font-black tracking-tight text-gray-900 mt-0.5">Kiralama Rehberi</h1>
            </div>
          </div>
        </div>

        {/* Intro */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <p className="text-gray-600 leading-relaxed text-sm">
            Türkiye&apos;de kiracı olmak bazen göründüğünden daha karmaşık olabilir.
            Bu rehber, kira sözleşmesinde dikkat etmeniz gereken maddeleri, yasal haklarınızı
            ve pratik tüyoları sade bir dille aktarıyor.
          </p>
        </div>

        {/* Sections */}
        {SECTIONS.map(section => (
          <div key={section.id} id={section.id} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-10 h-10 rounded-xl ${section.bg} flex items-center justify-center`}>
                <section.icon size={18} className={section.color} />
              </div>
              <h2 className="text-base font-bold text-gray-900">{section.title}</h2>
            </div>
            <ul className="space-y-2">
              {section.items.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-gray-600">
                  <CheckCircle2 size={13} className={`${section.color} shrink-0 mt-0.5`} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Checklist */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-bold text-gray-900 mb-4">Taşınmadan Önce Kontrol Listesi</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {CHECKLIST.map((item, i) => (
              <div key={i} className="flex items-start gap-2.5 p-3 bg-gray-50 rounded-xl">
                <CheckCircle2 size={13} className="text-[#00C49F] shrink-0 mt-0.5" />
                <span className="text-xs text-gray-600">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Warning */}
        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle size={16} className="text-amber-600" />
            <h3 className="text-sm font-bold text-amber-800">Dikkat Edilmesi Gereken Durumlar</h3>
          </div>
          <ul className="space-y-1.5 text-xs text-amber-700">
            <li>• Sözlü anlaşmalar hukuken geçerlidir ancak ispat güçtür — her şeyi yazıya döküne.</li>
            <li>• &quot;Ev sahibi isterse çıkarır&quot; yaklaşımı yanlış — kiracı 6+6 yıl güvencesine sahiptir.</li>
            <li>• WhatsApp mesajları delil sayılabilir; yazışmalarınızı saklayın.</li>
            <li>• Kaparo verirken muhakkak belge alın veya banka havalesi kullanın.</li>
          </ul>
        </div>

        {/* Disclaimer */}
        <div className="flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-2xl p-4">
          <Info size={16} className="text-blue-400 shrink-0 mt-0.5" />
          <p className="text-xs text-blue-600 leading-relaxed">
            Bu rehber genel bilgi amaçlıdır. 2026 yılı Türk Borçlar Kanunu&apos;na dayanmaktadır.
            Hukuki uyuşmazlıklarda bir avukattan destek alın.
          </p>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-2">
          <Link href="/rehber/ev-satin-alma" className="flex items-center gap-2 text-sm text-gray-400 hover:text-gray-700 transition-colors">
            <ArrowLeft size={14} /> Ev Satın Alma Rehberi
          </Link>
          <Link href="/rehber/yatirim-rehberi" className="flex items-center gap-2 text-sm text-[#00C49F] hover:text-[#00a882] font-semibold transition-colors">
            Yatırım Rehberi →
          </Link>
        </div>
      </div>
    </main>
  );
}
