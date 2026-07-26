import prisma from '@/lib/prisma';
import Link from 'next/link';
import { ArrowLeft, Monitor, Building2, Users, TrendingUp, Globe, CheckCircle, ArrowRight } from 'lucide-react';

export const dynamic = 'force-dynamic';

function formatPrice(price: number) {
  return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(price);
}

export default async function PresentationPage() {
  const [listingCount, userCount, offerCount, priceStats] = await Promise.all([
    prisma.listing.count({ where: { status: 'ACTIVE' } }),
    prisma.user.count(),
    prisma.offer.count(),
    prisma.listing.aggregate({ _avg: { price: true }, _max: { price: true } }),
  ]);

  const slides = [
    {
      num: '01',
      title: 'Platform Vizyonu',
      body: 'Söylemesi Bizden, Türkiye\'nin en gelişmiş gayrimenkul ve varlık yönetim platformudur. Sahibinden.com ve Hepsiemlak.com\'un ötesine geçen kurumsal kalite.',
    },
    {
      num: '02',
      title: 'Teknoloji Altyapısı',
      body: 'Next.js 14, Prisma ORM, Neon PostgreSQL, NextAuth.js ve TypeScript strict mode ile inşa edildi. Vercel Edge Network üzerinde 99.9% uptime garantisi.',
    },
    {
      num: '03',
      title: 'Temel Özellikler',
      body: 'Gelişmiş ilan arama (13 filtre), anlaşma odaları, varlık portföyü, ESG/karbon skoru, piyasa radar, danışmanlık modülü ve daha fazlası.',
    },
    {
      num: '04',
      title: 'Güvenlik & Uyum',
      body: 'RBAC erişim kontrolü, bcrypt şifreleme, JWT token auth, Zod validasyonu ve HTTPS zorunlu bağlantı ile kurumsal güvenlik standartları.',
    },
  ];

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <div className="max-w-5xl mx-auto px-8 py-10 space-y-10">

        <div>
          <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-gray-700 transition-colors mb-3">
            <ArrowLeft size={14} /> Dashboard
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#F0FDF8] flex items-center justify-center text-[#00C49F]">
              <Monitor size={18} />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Platform Sunumu</h1>
              <p className="text-xs text-gray-400 mt-0.5">Vizyon, teknoloji ve piyasa konumu</p>
            </div>
          </div>
        </div>

        {/* Hero slide */}
        <div className="bg-gray-900 rounded-3xl p-10 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#00C49F]/10 rounded-full translate-x-1/2 -translate-y-1/2" />
          <div className="relative">
            <div className="flex items-center gap-2 text-[#00C49F] text-xs font-bold uppercase tracking-widest mb-4">
              <Globe size={14} /> Söylemesi Bizden · 2026
            </div>
            <h2 className="text-4xl font-black tracking-tight mb-3">
              Türkiye&apos;nin Kurumsal<br />Gayrimenkul Platformu
            </h2>
            <p className="text-gray-400 text-sm max-w-xl">
              Sahibinden.com ve Hepsiemlak.com&apos;a rakip; daha kullanışlı, daha çok tercih edilen, satışı daha fazla olan platform.
            </p>
          </div>
        </div>

        {/* Live stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'AKTİF İLAN', value: listingCount, icon: <Building2 size={16} />, color: 'text-[#00C49F]' },
            { label: 'KULLANICI', value: userCount, icon: <Users size={16} />, color: 'text-blue-500' },
            { label: 'TEKLİF', value: offerCount, icon: <TrendingUp size={16} />, color: 'text-amber-500' },
            { label: 'ORT. FİYAT', value: priceStats._avg.price ? formatPrice(priceStats._avg.price) : '—', icon: <Globe size={16} />, color: 'text-gray-900' },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-2xl border border-gray-100 p-5">
              <div className={`${s.color} mb-2`}>{s.icon}</div>
              <p className={`text-2xl font-bold ${s.color} leading-tight`}>{s.value}</p>
              <p className="text-[9px] font-bold tracking-widest text-gray-400 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Presentation slides */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {slides.map(slide => (
            <div key={slide.num} className="bg-white rounded-2xl border border-gray-100 p-6">
              <div className="text-4xl font-black text-gray-100 mb-3">{slide.num}</div>
              <h3 className="text-base font-bold text-gray-900 mb-2">{slide.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{slide.body}</p>
            </div>
          ))}
        </div>

        {/* Feature checklist */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="text-[10px] font-bold tracking-widest text-[#00C49F] uppercase mb-5">Tamamlanan Modüller</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              'İlan Yönetimi', 'Gelişmiş Arama', 'Teklif Sistemi',
              'Anlaşma Odaları', 'Varlık Portföyü', 'Favoriler',
              'Karşılaştırma (18 Özellik)', 'Admin Dashboard', 'ESG/Karbon Skoru',
              'Piyasa Radar', 'Dark Pool', 'İstihbarat Modülü',
              'Güvenlik Merkezi', 'Konsiyerj', 'Ekosistem Nexus',
            ].map(feat => (
              <div key={feat} className="flex items-center gap-2 text-sm text-gray-700">
                <CheckCircle size={14} className="text-[#00C49F] shrink-0" />
                <span className="font-medium">{feat}</span>
              </div>
            ))}
          </div>
        </div>

        <Link href="/listings" className="flex items-center justify-between bg-[#00C49F] text-white rounded-2xl p-5 hover:bg-[#00B090] transition-colors group">
          <div>
            <p className="text-sm font-bold">Platforma Gir</p>
            <p className="text-xs text-white/70 mt-0.5">İlanları keşfet, teklif ver, anlaşma yap</p>
          </div>
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </main>
  );
}
