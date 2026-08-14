import prisma from '@/lib/prisma';
import Link from 'next/link';
import { Metadata } from 'next';
import {
  Shield,
  TrendingUp,
  Users,
  Home,
  CheckCircle,
  Star,
  ArrowRight,
  MapPin,
  Zap,
  Heart,
  Globe,
} from 'lucide-react';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Hakkımızda | Söylemesi Bizden',
  description: 'Söylemesi Bizden, Türkiye\'nin en güvenilir gayrimenkul platformu. Misyonumuz, vizyonumuz ve değerlerimiz hakkında bilgi edinin.',
  openGraph: {
    title: 'Hakkımızda | Söylemesi Bizden',
    description: 'Türkiye\'nin en güvenilir gayrimenkul platformu hakkında her şey.',
    type: 'website',
  },
};

export default async function HakkimizdaPage() {
  const [totalListings, totalUsers, totalCities] = await Promise.all([
    prisma.listing.count({ where: { status: 'ACTIVE' } }),
    prisma.user.count(),
    prisma.listing.groupBy({ by: ['city'], where: { city: { not: null }, status: 'ACTIVE' }, _count: true }).then(r => r.length),
  ]);

  const values = [
    {
      icon: <Shield size={20} className="text-[#00C49F]" />,
      title: 'Güven',
      desc: 'Tüm ilanlar admin onayından geçer. Doğrulanmış kullanıcılar ve şeffaf iletişim önceliğimizdir.',
    },
    {
      icon: <TrendingUp size={20} className="text-[#00C49F]" />,
      title: 'Şeffaflık',
      desc: 'Piyasa fiyatları, istatistikler ve analitik veriler herkese açık. Veri saklamak yerine paylaşırız.',
    },
    {
      icon: <Zap size={20} className="text-[#00C49F]" />,
      title: 'Hız',
      desc: 'Saniyeler içinde arama, anlık bildirimler ve hızlı iletişim araçlarıyla zaman kaybetmezsiniz.',
    },
    {
      icon: <Heart size={20} className="text-[#00C49F]" />,
      title: 'Kullanıcı Odaklı',
      desc: 'Her özellik gerçek kullanıcı ihtiyaçlarına göre tasarlanır. Geri bildirimleriniz platformu şekillendirir.',
    },
    {
      icon: <Globe size={20} className="text-[#00C49F]" />,
      title: 'Erişilebilirlik',
      desc: 'Türkçe, İngilizce, Arapça ve Rusça dil desteğiyle Türkiye\'deki herkese hizmet veriyoruz.',
    },
    {
      icon: <CheckCircle size={20} className="text-[#00C49F]" />,
      title: 'Kalite',
      desc: 'Eksiksiz ilan bilgisi, yüksek çözünürlüklü fotoğraflar ve detaylı analiz raporları sunuyoruz.',
    },
  ];

  const milestones = [
    { year: '2024', label: 'Kuruluş', desc: 'Söylemesi Bizden, Türkiye\'nin dijital gayrimenkul açığını kapatmak için kuruldu.' },
    { year: '2024', label: 'İlk İlan', desc: 'Platform beta sürümünde ilk 100 ilan yayınlandı.' },
    { year: '2025', label: 'Büyüme', desc: 'Harita görünümü, karşılaştırma aracı ve piyasa analitikleri eklendi.' },
    { year: '2025', label: 'Kurumsal', desc: 'Admin paneli, teklif sistemi ve anlaşma odaları ile kurumsal sürüme geçildi.' },
    { year: '2026', label: 'Bugün', desc: 'Türkiye genelinde aktif şehir sayfaları, değerleme aracı ve akıllı arama.' },
  ];

  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-white/80 text-sm font-semibold mb-6">
            <Star size={14} className="text-[#00C49F]" />
            Türkiye&apos;nin Güvenilir Gayrimenkul Platformu
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-5">
            Gayrimenkulde Güven,<br />
            <span className="text-[#00C49F]">Söylemesi Bizden</span>
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto leading-relaxed">
            Alıcıları ve satıcıları buluşturan, piyasayı şeffaf kılan ve doğru kararı almanızı kolaylaştıran
            dijital gayrimenkul platformuyuz.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 py-14 space-y-16">

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6">
          {[
            { label: 'Aktif İlan', value: totalListings.toLocaleString('tr-TR'), icon: <Home size={20} className="text-[#00C49F]" /> },
            { label: 'Kullanıcı', value: totalUsers.toLocaleString('tr-TR'), icon: <Users size={20} className="text-[#00C49F]" /> },
            { label: 'Şehir', value: totalCities.toLocaleString('tr-TR'), icon: <MapPin size={20} className="text-[#00C49F]" /> },
          ].map(stat => (
            <div key={stat.label} className="bg-white rounded-2xl border border-gray-100 p-6 text-center shadow-sm">
              <div className="flex justify-center mb-3">{stat.icon}</div>
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-500 mt-1 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-[#F0FDF8] flex items-center justify-center mb-5">
              <TrendingUp size={22} className="text-[#00C49F]" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Misyonumuz</h2>
            <p className="text-gray-500 leading-relaxed">
              Türkiye&apos;deki gayrimenkul alım-satım ve kiralama süreçlerini dijital olarak kolaylaştırmak,
              bilgiye erişimi demokratikleştirmek ve alıcı-satıcı arasındaki güveni inşa etmek.
            </p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-[#F0FDF8] flex items-center justify-center mb-5">
              <Star size={22} className="text-[#00C49F]" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Vizyonumuz</h2>
            <p className="text-gray-500 leading-relaxed">
              Türkiye&apos;nin en kullanışlı, en güvenilir ve en veri odaklı gayrimenkul platformu olmak.
              Piyasa şeffaflığıyla sektörü dönüştürmek ve Orta Doğu&apos;ya açılmak.
            </p>
          </div>
        </div>

        {/* Values */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Değerlerimiz</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {values.map(v => (
              <div key={v.title} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-xl bg-[#F0FDF8] flex items-center justify-center mb-3">
                  {v.icon}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{v.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Yolculuğumuz</h2>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gray-200" />
            <div className="space-y-6">
              {milestones.map((m, idx) => (
                <div key={idx} className="flex items-start gap-6">
                  <div className="relative shrink-0">
                    <div className="w-16 h-16 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center justify-center z-10 relative">
                      <span className="text-xs font-bold text-[#00C49F]">{m.year}</span>
                    </div>
                  </div>
                  <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm flex-1 mt-1">
                    <p className="font-bold text-gray-900 mb-1">{m.label}</p>
                    <p className="text-sm text-gray-500">{m.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Why us */}
        <div className="bg-gradient-to-br from-[#F0FDF8] to-white border border-[#00C49F]/20 rounded-2xl p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-5">Neden Söylemesi Bizden?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              'Tüm ilanlar admin onaylıdır — sahte ilan yok',
              'Piyasa fiyat analizi ve ₺/m² karşılaştırması',
              'İnteraktif harita ile ilan keşfi',
              'Akıllı arama ve kayıtlı arama bildirimleri',
              'Teklif sistemi ve anlaşma odaları',
              'Mortgage ve kira getirisi hesaplayıcısı',
              'Şehir ve ilçe bazlı fiyat istatistikleri',
              'WhatsApp, mesaj ve görüntüleme randevusu',
            ].map(item => (
              <div key={item} className="flex items-start gap-2">
                <CheckCircle size={15} className="text-[#00C49F] mt-0.5 shrink-0" />
                <span className="text-sm text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Hemen Başlayın</h2>
          <p className="text-gray-500">Ücretsiz kayıt olun, ilan verin ya da hayalinizdeki mülkü bulun.</p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Link
              href="/listings"
              className="flex items-center gap-2 px-6 py-3 bg-[#00C49F] text-white font-bold rounded-xl hover:bg-[#00a882] transition-colors"
            >
              <Home size={16} /> İlanlara Gözat
            </Link>
            <Link
              href="/create-listing"
              className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 text-gray-700 font-semibold rounded-xl hover:border-[#00C49F] hover:text-[#00C49F] transition-colors"
            >
              İlan Ver <ArrowRight size={16} />
            </Link>
          </div>
        </div>

      </div>
    </main>
  );
}
