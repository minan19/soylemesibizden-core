import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft, Building2, Crown, Zap, Star, Check,
  Globe, Users, BarChart3, Shield, ArrowRight,
} from 'lucide-react';
import FranchiseApplyForm from '@/components/FranchiseApplyForm';

export const dynamic = 'force-dynamic';

const PLANS = [
  {
    id: 'BASIC',
    name: 'Basic Partner',
    price: '₺50.000/ay',
    icon: Zap,
    color: '#3B82F6',
    features: [
      'White-label platform erişimi',
      '10 agent hesabı',
      '50 aktif ilan',
      'Sovereign branding',
      'Email desteği',
      'Aylık raporlama',
    ],
  },
  {
    id: 'PRO',
    name: 'Pro Partner',
    price: '₺75.000/ay',
    icon: Star,
    color: '#00C49F',
    popular: true,
    features: [
      'Tüm Basic özellikler',
      '25 agent hesabı',
      'Sınırsız ilan',
      'Özel alan adı',
      'AI rapor entegrasyonu',
      'Dark Pool erişimi',
      'Öncelikli destek',
    ],
  },
  {
    id: 'ENTERPRISE',
    name: 'Enterprise',
    price: '₺150.000/ay',
    icon: Crown,
    color: '#D4AF37',
    features: [
      'Tüm Pro özellikler',
      'Sınırsız agent',
      'Tam marka kaldırma',
      'Dedicated sunucu',
      'API tam erişim',
      'SLA garantisi',
      'Dedicated müşteri yöneticisi',
      'Özel geliştirme desteği',
    ],
  },
];

const BENEFITS = [
  { icon: Globe, title: 'Kendi Markanız', desc: 'Sovereign altyapısı, sizin markanız. Müşterileriniz sadece sizi görür.' },
  { icon: Users, title: 'Agent Yönetimi', desc: 'Tüm brokerlarınızı tek panelden yönetin, performans takibi yapın.' },
  { icon: BarChart3, title: 'AI Raporlar', desc: 'Sovereign Intelligence Engine tüm analizleri sizin adınıza üretir.' },
  { icon: Shield, title: 'Veri Güvenliği', desc: 'KVKK uyumlu altyapı, verileriniz Türkiye sunucularında.' },
];

export default async function FranchisePage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect('/login');

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-[#0F172A]">
      {/* Navbar */}
      <nav className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-gray-100 h-20 flex items-center justify-between px-10">
        <Link href="/dashboard" className="text-[11px] font-bold tracking-[0.35em] uppercase">
          SÖYLEMESİ<span className="text-[#00C49F]">BİZDEN</span>
        </Link>
        <Link href="/dashboard" className="flex items-center gap-2 text-[11px] font-bold text-gray-400 hover:text-[#0F172A] transition-colors">
          <ArrowLeft size={14} /> Dashboard
        </Link>
      </nav>

      {/* Hero */}
      <div className="bg-[#0F172A] text-white py-24 px-8 text-center">
        <p className="text-[10px] font-black tracking-widest uppercase text-[#00C49F] mb-4">SOVEREIGN FRANCHISE OS</p>
        <h1 className="text-5xl font-black tracking-tighter mb-6 max-w-3xl mx-auto leading-tight">
          Türkiye&apos;nin En Güçlü Gayrimenkul Platformunu
          <span className="text-[#00C49F]"> Kendi Markanızla</span> Kullanın
        </h1>
        <p className="text-slate-400 text-base max-w-2xl mx-auto mb-10 leading-relaxed">
          Sovereign altyapısını kendi logonuz, renkleriniz ve alan adınızla müşterilerinize sunun.
          Teknoloji yatırımı yapmadan Türkiye&apos;nin en gelişmiş PropTech platformunu işletin.
        </p>
        <div className="flex items-center justify-center gap-6">
          <a href="#plans" className="px-8 py-4 bg-[#00C49F] text-white text-[11px] font-black tracking-widest uppercase rounded-2xl hover:bg-[#00A887] transition-all">
            Planları İncele
          </a>
          <a href="#apply" className="px-8 py-4 border border-white/20 text-white text-[11px] font-black tracking-widest uppercase rounded-2xl hover:bg-white/10 transition-all">
            Demo Talep Et
          </a>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-8 py-20">
        {/* Benefits */}
        <div className="grid grid-cols-4 gap-5 mb-20">
          {BENEFITS.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-white rounded-[24px] border border-gray-100 p-6 shadow-sm">
              <div className="w-10 h-10 rounded-2xl bg-[#F0FDF8] flex items-center justify-center mb-4">
                <Icon size={18} className="text-[#00C49F]" />
              </div>
              <p className="text-sm font-black text-[#0F172A] mb-2">{title}</p>
              <p className="text-[11px] text-gray-400 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="bg-gradient-to-r from-[#0F172A] to-[#1E293B] rounded-[40px] p-10 mb-20 text-white">
          <div className="grid grid-cols-4 gap-8 text-center">
            {[
              { label: 'Aktif Partner', value: '12+', sub: 'Türkiye geneli' },
              { label: 'Platform Trafiği', value: '50K+', sub: 'Aylık ziyaret' },
              { label: 'Ortalama ROI', value: '%380', sub: 'Partner başına' },
              { label: 'Kurulum Süresi', value: '48 saat', sub: 'Tam operasyonel' },
            ].map(({ label, value, sub }) => (
              <div key={label}>
                <p className="text-4xl font-black text-[#00C49F] mb-1">{value}</p>
                <p className="text-sm font-bold text-white">{label}</p>
                <p className="text-[11px] text-slate-500">{sub}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Plans */}
        <div id="plans" className="mb-20">
          <div className="text-center mb-10">
            <p className="text-[10px] font-black tracking-widest uppercase text-[#00C49F] mb-2">FRANCHISE PLANLARI</p>
            <h2 className="text-3xl font-black tracking-tighter">İşinize Uygun Planı Seçin</h2>
          </div>
          <div className="grid grid-cols-3 gap-6">
            {PLANS.map((plan) => {
              const Icon = plan.icon;
              return (
                <div key={plan.id}
                  className={`relative bg-white rounded-[32px] border-2 p-8 shadow-sm flex flex-col transition-all hover:shadow-lg ${
                    plan.popular ? 'border-[#00C49F] shadow-[#00C49F]/10' : 'border-gray-100'
                  }`}>
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#00C49F] text-white text-[9px] font-black tracking-widest uppercase px-4 py-1.5 rounded-full">
                      EN POPÜLER
                    </div>
                  )}
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5" style={{ backgroundColor: plan.color + '15' }}>
                    <Icon size={22} style={{ color: plan.color }} />
                  </div>
                  <p className="text-[10px] font-black tracking-widest uppercase text-gray-400 mb-1">{plan.name}</p>
                  <p className="text-2xl font-black tracking-tight mb-6" style={{ color: plan.color }}>{plan.price}</p>
                  <div className="space-y-3 flex-1 mb-8">
                    {plan.features.map((f) => (
                      <div key={f} className="flex items-start gap-3">
                        <Check size={13} className="shrink-0 mt-0.5" style={{ color: plan.color }} />
                        <span className="text-[12px] font-semibold text-gray-600">{f}</span>
                      </div>
                    ))}
                  </div>
                  <a href="#apply"
                    className={`block w-full text-center py-3.5 rounded-2xl text-[11px] font-black tracking-widest uppercase transition-all ${
                      plan.popular
                        ? 'bg-[#00C49F] text-white hover:bg-[#00A887]'
                        : 'bg-[#0F172A] text-white hover:bg-[#1E293B]'
                    }`}>
                    Bu Planı Seç
                  </a>
                </div>
              );
            })}
          </div>
        </div>

        {/* Application Form */}
        <div id="apply">
          <div className="text-center mb-10">
            <p className="text-[10px] font-black tracking-widest uppercase text-[#00C49F] mb-2">BAŞVURU</p>
            <h2 className="text-3xl font-black tracking-tighter">Partner Olmak İçin Başvurun</h2>
            <p className="text-gray-400 text-sm mt-2">Ekibimiz 24 saat içinde sizinle iletişime geçecektir.</p>
          </div>
          <FranchiseApplyForm />
        </div>
      </div>
    </div>
  );
}
