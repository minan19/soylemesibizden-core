import Link from 'next/link';
import { Metadata } from 'next';
import { BookOpen, Home, Key, TrendingUp, ArrowRight, Shield, Calculator, FileText } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Gayrimenkul Rehberi | Söylemesi Bizden',
  description: 'Ev satın alma, kiralama, yatırım ve tapu işlemleri hakkında kapsamlı rehberler. Türkiye gayrimenkul piyasasını keşfedin.',
};

const GUIDES = [
  {
    href: '/rehber/ev-satin-alma',
    icon: Home,
    title: 'Ev Satın Alma Rehberi',
    desc: 'İlk evinizi almak için bilmeniz gereken her şey. Bütçe planlaması, banka kredisi, tapu işlemleri ve sık yapılan hatalar.',
    color: 'text-[#00C49F]',
    bg: 'bg-[#F0FDF8]',
    border: 'border-[#00C49F]/20',
    tags: ['Kredi', 'Tapu', 'Bütçe', 'Müzakere'],
    readTime: '8 dk',
  },
  {
    href: '/rehber/kiralama-rehberi',
    icon: Key,
    title: 'Kiralama Rehberi',
    desc: 'Ev kiralarken dikkat edilmesi gereken sözleşme maddeleri, depozito hakları ve kiracı-ev sahibi ilişkileri.',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-100',
    tags: ['Sözleşme', 'Depozito', 'Haklar', 'Kira Artışı'],
    readTime: '6 dk',
  },
  {
    href: '/rehber/satici-rehberi',
    icon: ArrowRight,
    title: 'Satıcı Rehberi',
    desc: 'Doğru fiyatlama, etkili ilan hazırlama, pazarlık teknikleri, tapu işlemleri ve vergi yükümlülükleri.',
    color: 'text-rose-600',
    bg: 'bg-rose-50',
    border: 'border-rose-100',
    tags: ['Fiyatlama', 'Tapu', 'Pazarlık', 'Vergi'],
    readTime: '15 dk',
  },
  {
    href: '/rehber/yatirim-rehberi',
    icon: TrendingUp,
    title: 'Gayrimenkul Yatırım Rehberi',
    desc: 'Gayrimenkul yatırımında kira getirisi, değer artışı, konum seçimi ve portföy çeşitlendirmesi stratejileri.',
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    border: 'border-amber-100',
    tags: ['Getiri', 'Konum', 'ROI', 'Portföy'],
    readTime: '10 dk',
  },
];

const QUICK_TOPICS = [
  { icon: Shield, label: 'Tapu Tescil İşlemleri', href: '/rehber/ev-satin-alma#tapu' },
  { icon: Calculator, label: 'Kredi Hesaplama', href: '/hesaplama' },
  { icon: FileText, label: 'Kira Sözleşmesi Maddeleri', href: '/rehber/kiralama-rehberi#sozlesme' },
  { icon: TrendingUp, label: 'Kira Getirisi Nasıl Hesaplanır?', href: '/rehber/yatirim-rehberi#getiri' },
];

export default function RehberIndexPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <div className="max-w-4xl mx-auto px-6 py-12 space-y-10">

        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 bg-[#F0FDF8] border border-[#00C49F]/20 text-[#00C49F] text-xs font-bold px-4 py-1.5 rounded-full mb-2">
            <BookOpen size={13} /> Kapsamlı Rehberler
          </div>
          <h1 className="text-4xl font-black tracking-tight text-gray-900">Gayrimenkul Rehberi</h1>
          <p className="text-gray-500 max-w-xl mx-auto text-sm leading-relaxed">
            Türkiye&apos;de gayrimenkul almak, kiralamak veya yatırım yapmak için bilmeniz gereken
            her şeyi uzman dilinden okuyun.
          </p>
        </div>

        {/* Guide Cards */}
        <div className="space-y-4">
          {GUIDES.map(guide => (
            <Link
              key={guide.href}
              href={guide.href}
              className={`group flex flex-col sm:flex-row gap-5 bg-white rounded-2xl border ${guide.border} p-6 shadow-sm hover:shadow-md transition-all`}
            >
              <div className={`w-14 h-14 rounded-2xl ${guide.bg} flex items-center justify-center shrink-0`}>
                <guide.icon size={26} className={guide.color} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h2 className={`text-lg font-bold text-gray-900 group-hover:${guide.color} transition-colors`}>
                    {guide.title}
                  </h2>
                  <span className="text-xs text-gray-400 shrink-0">{guide.readTime} okuma</span>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed mb-3">{guide.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {guide.tags.map(tag => (
                    <span key={tag} className="text-[10px] font-bold px-2.5 py-1 bg-gray-50 text-gray-500 rounded-full border border-gray-100">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center shrink-0">
                <ArrowRight size={18} className="text-gray-300 group-hover:text-gray-600 transition-colors" />
              </div>
            </Link>
          ))}
        </div>

        {/* Quick Topics */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-4">Sık Aranan Konular</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {QUICK_TOPICS.map(t => (
              <Link
                key={t.href}
                href={t.href}
                className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-[#F0FDF8] border border-transparent hover:border-[#00C49F]/20 transition-all group"
              >
                <t.icon size={15} className="text-gray-400 group-hover:text-[#00C49F] transition-colors shrink-0" />
                <span className="text-sm text-gray-700 group-hover:text-[#00C49F] font-medium transition-colors">{t.label}</span>
                <ArrowRight size={13} className="ml-auto text-gray-300 group-hover:text-[#00C49F] transition-colors" />
              </Link>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-br from-[#00C49F] to-[#00a882] rounded-2xl p-8 text-center text-white">
          <h3 className="text-xl font-black mb-2">Hâlâ Sorularınız Mı Var?</h3>
          <p className="text-sm text-white/80 mb-5">Uzman danışmanlarımız size özel sorularınızı yanıtlamak için hazır.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/concierge"
              className="px-6 py-2.5 bg-white text-[#00C49F] text-sm font-bold rounded-xl hover:bg-gray-50 transition-colors"
            >
              Danışman Talebi
            </Link>
            <Link
              href="/agents"
              className="px-6 py-2.5 border border-white/30 text-white text-sm font-bold rounded-xl hover:bg-white/10 transition-colors"
            >
              Danışmanları Görüntüle
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
