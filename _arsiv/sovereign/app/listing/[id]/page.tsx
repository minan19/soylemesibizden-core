import { notFound } from 'next/navigation';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import OfferForm from '@/components/OfferForm';
import AIIntelligenceReport from '@/components/AIIntelligenceReport';
import MortgageCalculator from '@/components/MortgageCalculator';
import SovereignScoreCard from '@/components/SovereignScoreCard';
import TrustBadge from '@/components/TrustBadge';
import RentOptimizer from '@/components/RentOptimizer';
import PhotoScoreWidget from '@/components/PhotoScoreWidget';
import { computeScore } from '@/lib/investmentScore';
import type { SovereignScore } from '@/lib/investmentScore';
import { analyzeTrust } from '@/lib/trustEngine';
import {
  MapPin, ArrowLeft, Building2, Activity, Shield,
  Users, Calendar, TrendingUp, CheckCircle,
} from 'lucide-react';

export const dynamic = 'force-dynamic';

function formatCurrency(val: number): string {
  if (val >= 1e9) return (val / 1e9).toFixed(2) + ' Milyar ₺';
  if (val >= 1e6) return (val / 1e6).toFixed(2) + ' Milyon ₺';
  if (val >= 1e3) return (val / 1e3).toFixed(0) + 'K ₺';
  return val.toLocaleString('tr-TR') + ' ₺';
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
}

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
  ACTIVE: { label: 'Aktif', color: '#00C49F', bg: '#F0FDF8' },
  PENDING: { label: 'Beklemede', color: '#F59E0B', bg: '#FFFBEB' },
  SOLD: { label: 'Satıldı', color: '#EF4444', bg: '#FEF2F2' },
  RENTED: { label: 'Kiralandı', color: '#8B5CF6', bg: '#F5F3FF' },
};

export default async function ListingDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const listing = await prisma.listing.findUnique({
    where: { id: params.id },
    include: {
      owner: {
        select: { id: true, name: true, email: true, createdAt: true,
          _count: { select: { listings: true } } },
      },
      offers: {
        orderBy: { createdAt: 'desc' },
        take: 5,
        include: { user: { select: { name: true, email: true } } },
      },
      _count: { select: { offers: true } },
    },
  });

  if (!listing) notFound();

  const daysOnMarket = Math.floor((Date.now() - new Date(listing.createdAt).getTime()) / 86_400_000);

  // Trust analizi — SSR
  const trustAnalysis = analyzeTrust({
    title: listing.title,
    description: listing.description,
    priceAmount: listing.priceAmount,
    area: listing.area,
    location: listing.location,
    propertyType: listing.propertyType,
    imageCount: listing.images.length,
    offerCount: listing._count.offers,
    daysOnMarket,
    ownerListingCount: listing.owner?._count?.listings ?? 0,
    ownerDaysSinceJoin: listing.owner?.createdAt
      ? Math.floor((Date.now() - new Date(listing.owner.createdAt).getTime()) / 86_400_000)
      : 365,
  });

  // SSR'de skoru hesapla (DB'de kayıtlıysa kullan, yoksa hesapla)
  const savedScore = listing.score as SovereignScore | null;
  const initialScore: SovereignScore = savedScore ?? computeScore({
    priceAmount: listing.priceAmount,
    area: listing.area,
    location: listing.location ?? '',
    propertyType: listing.propertyType,
    status: listing.status,
    description: listing.description,
    offerCount: listing._count.offers,
    daysOnMarket,
  });

  const statusCfg = STATUS_CONFIG[listing.status] ?? STATUS_CONFIG.ACTIVE;

  const stats = [
    { label: 'Varlık Tipi', value: listing.propertyType, icon: Building2 },
    { label: 'Alan', value: `${listing.area.toLocaleString('tr-TR')} m²`, icon: Activity },
    { label: 'Konum', value: listing.location ?? 'Belirtilmemiş', icon: MapPin },
    { label: 'Teklif Sayısı', value: listing.offers.length.toString(), icon: Users },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-[#0F172A]">
      {/* TOPBAR */}
      <nav className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-gray-100 h-20 flex items-center px-10 gap-6">
        <Link
          href="/listings"
          className="flex items-center gap-2 text-[11px] font-bold text-gray-400 hover:text-[#0F172A] transition-colors"
        >
          <ArrowLeft size={16} /> Tüm İlanlar
        </Link>
        <span className="text-gray-200">·</span>
        <span className="text-[11px] font-bold text-gray-400 truncate max-w-xs">{listing.title}</span>
      </nav>

      <div className="max-w-7xl mx-auto px-8 py-12 grid grid-cols-12 gap-10">
        {/* LEFT: MAIN CONTENT */}
        <section className="col-span-8 space-y-8">
          {/* HEADER */}
          <div className="bg-white rounded-[40px] border border-gray-100 p-10 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
            <div className="flex items-center gap-3 mb-6">
              <span
                className="text-[10px] font-black tracking-widest px-3 py-1.5 rounded-full uppercase"
                style={{ color: statusCfg.color, backgroundColor: statusCfg.bg }}
              >
                {statusCfg.label}
              </span>
              <span className="text-[10px] font-black tracking-widest px-3 py-1.5 rounded-full bg-gray-100 text-gray-500 uppercase">
                {listing.propertyType}
              </span>
            </div>

            <h1 className="text-4xl font-black tracking-tighter mb-3">{listing.title}</h1>

            {listing.location && (
              <div className="flex items-center gap-2 text-gray-500 font-semibold mb-6">
                <MapPin size={16} className="text-[#00C49F]" />
                {listing.location}
              </div>
            )}

            {listing.description && (
              <p className="text-base text-gray-500 leading-relaxed border-t border-gray-50 pt-6">
                {listing.description}
              </p>
            )}
          </div>

          {/* STAT GRID */}
          <div className="grid grid-cols-2 gap-5">
            {stats.map((s) => (
              <div
                key={s.label}
                className="bg-white rounded-[28px] border border-gray-100 p-7 shadow-[0_4px_24px_rgba(0,0,0,0.02)]"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-xl bg-[#F0FDF8] flex items-center justify-center">
                    <s.icon size={18} className="text-[#00C49F]" />
                  </div>
                  <p className="text-[10px] font-black tracking-widest text-gray-400 uppercase">
                    {s.label}
                  </p>
                </div>
                <p className="text-xl font-black tracking-tight">{s.value}</p>
              </div>
            ))}
          </div>

          {/* INTELLIGENCE REPORT */}
          <div className="bg-[#0F172A] rounded-[40px] p-10 text-white">
            <div className="flex items-center gap-3 mb-6">
              <Shield size={20} className="text-[#00C49F]" />
              <p className="text-[11px] font-black tracking-widest uppercase text-slate-400">
                Sovereign Intelligence Report
              </p>
            </div>
            <div className="grid grid-cols-3 gap-8">
              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">
                  Güven Skoru
                </p>
                <p className="text-3xl font-black text-[#00C49F]">98.4</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">
                  ROI Projeksiyonu
                </p>
                <p className="text-3xl font-black text-amber-400">%14.2</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">
                  Karbon Sertifikası
                </p>
                <p className="text-3xl font-black text-green-400">A++</p>
              </div>
            </div>
          </div>

          {/* RECENT OFFERS */}
          {listing.offers.length > 0 && (
            <div className="bg-white rounded-[40px] border border-gray-100 p-8 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
              <div className="flex items-center gap-3 mb-6">
                <TrendingUp size={18} className="text-[#00C49F]" />
                <h3 className="text-sm font-black tracking-widest uppercase">
                  Son Teklifler
                </h3>
              </div>
              <div className="space-y-3">
                {listing.offers.map((offer) => (
                  <div
                    key={offer.id}
                    className="flex items-center justify-between p-4 bg-[#F8FAFC] rounded-2xl"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#F0FDF8] flex items-center justify-center">
                        <CheckCircle size={14} className="text-[#00C49F]" />
                      </div>
                      <div>
                        <p className="text-[12px] font-bold">{offer.user?.name ?? 'Anonim'}</p>
                        <p className="text-[10px] text-gray-400 flex items-center gap-1">
                          <Calendar size={10} />
                          {formatDate(offer.createdAt)}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-black text-[#0F172A]">{formatCurrency(offer.amount)}</p>
                      <span
                        className={`text-[9px] font-black px-2 py-0.5 rounded-full uppercase ${
                          offer.status === 'ACCEPTED'
                            ? 'bg-[#F0FDF8] text-[#00C49F]'
                            : offer.status === 'REJECTED'
                            ? 'bg-red-50 text-red-400'
                            : 'bg-yellow-50 text-yellow-500'
                        }`}
                      >
                        {offer.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* RIGHT: PRICE + OFFER */}
        <aside className="col-span-4 space-y-6">
          {/* PRICE CARD */}
          <div className="bg-[#0F172A] rounded-[40px] p-10 text-white sticky top-28">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">
              Satış Bedeli
            </p>
            <p className="text-4xl font-black tracking-tighter mb-1">
              {formatCurrency(listing.priceAmount)}
            </p>
            <p className="text-[11px] text-slate-500 mb-8">
              {listing.area > 0
                ? `${formatCurrency(listing.priceAmount / listing.area)} / m²`
                : '—'}
            </p>

            {/* OWNER */}
            {listing.owner && (
              <div className="border-t border-slate-800 pt-6 mb-6">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">
                  İlan Sahibi
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center">
                    <span className="text-sm font-black text-[#00C49F]">
                      {(listing.owner.name ?? listing.owner.email)?.[0]?.toUpperCase() ?? 'S'}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-bold">
                      {listing.owner.name ?? 'Sovereign Üyesi'}
                    </p>
                    <p className="text-[10px] text-slate-500">{listing.owner.email}</p>
                  </div>
                </div>
              </div>
            )}

            {/* LISTING DATE */}
            <div className="flex items-center gap-2 text-[11px] text-slate-500">
              <Calendar size={12} />
              <span>Yayınlanma: {formatDate(listing.createdAt)}</span>
            </div>
          </div>

          {/* TRUST ENGINE */}
          <TrustBadge trust={trustAnalysis} />

          {/* AI GÖRSEL ANALİZ (sadece fotoğraf varsa) */}
          {listing.images.length > 0 && (
            <PhotoScoreWidget imageUrls={listing.images} />
          )}

          {/* SOVEREIGN INVESTMENT SCORE */}
          <SovereignScoreCard listingId={listing.id} initialScore={initialScore} />

          {/* OFFER FORM + AI Müzakere Asistanı */}
          <OfferForm
            listingId={listing.id}
            listingPrice={listing.priceAmount}
            location={listing.location ?? ''}
            propertyType={listing.propertyType}
            daysOnMarket={Math.floor((Date.now() - new Date(listing.createdAt).getTime()) / 86_400_000)}
            offerCount={listing._count.offers}
          />

          {/* MORTGAGE CALCULATOR */}
          <MortgageCalculator propertyPrice={listing.priceAmount} />

          {/* KİRA OPTİMİZASYON */}
          <RentOptimizer
            propertyType={listing.propertyType}
            location={listing.location ?? ''}
            priceAmount={listing.priceAmount}
            area={listing.area}
          />

          {/* AI INTELLIGENCE REPORT */}
          <AIIntelligenceReport listingId={listing.id} />
        </aside>
      </div>
    </div>
  );
}
