import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';
import Link from 'next/link';
import { ArrowLeft, Users, TrendingUp, MapPin, Clock, Plus } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import InvestorNetworkClient from '@/components/InvestorNetworkClient';

export const dynamic = 'force-dynamic';

const TYPE_LABELS: Record<string, string> = {
  RESIDENTIAL: 'Konut', COMMERCIAL: 'Ticari', LAND: 'Arsa', INDUSTRIAL: 'Endüstriyel',
};

export default async function InvestorNetworkPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect('/login');

  const opportunities = await prisma.investmentOpportunity.findMany({
    where: { status: 'OPEN' },
    include: {
      owner: { select: { name: true } },
      _count: { select: { participants: true } },
      participants: { select: { amount: true, status: true } },
    },
    orderBy: { createdAt: 'desc' },
  });

  const enriched = opportunities.map((opp) => {
    const confirmed = opp.participants.filter((p) => p.status === 'CONFIRMED').reduce((s, p) => s + p.amount, 0);
    const pct = opp.targetAmount > 0 ? Math.round((confirmed / opp.targetAmount) * 100) : 0;
    return { ...opp, confirmedAmount: confirmed, fundingPct: pct };
  });

  const totalCapital = enriched.reduce((s, o) => s + o.targetAmount, 0);
  const avgReturn = enriched.length > 0
    ? enriched.reduce((s, o) => s + o.expectedReturn, 0) / enriched.length
    : 0;

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-[#0F172A]">
      <nav className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-gray-100 h-20 flex items-center justify-between px-10">
        <Link href="/dashboard" className="text-[11px] font-bold tracking-[0.35em] uppercase">SÖYLEMESİ<span className="text-[#00C49F]">BİZDEN</span></Link>
        <Link href="/dashboard" className="flex items-center gap-2 text-[11px] font-bold text-gray-400 hover:text-[#0F172A] transition-colors">
          <ArrowLeft size={14} /> Dashboard
        </Link>
      </nav>

      <div className="max-w-6xl mx-auto px-8 py-12">
        {/* Header */}
        <div className="flex items-start justify-between mb-10">
          <div>
            <p className="text-[10px] font-black tracking-widest uppercase text-[#00C49F] mb-2">SOVEREIGN INVESTOR</p>
            <h1 className="text-4xl font-black tracking-tighter">Yatırımcı Ağı</h1>
            <p className="text-gray-400 text-sm mt-2">Ortaklık fırsatları, proje finansmanı, konsorsiyum yatırımları.</p>
          </div>
          <InvestorNetworkClient mode="trigger" />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          {[
            { label: 'Açık Fırsat', value: enriched.length.toString(), icon: TrendingUp, color: '#00C49F' },
            { label: 'Toplam Hedef', value: formatCurrency(totalCapital), icon: Users, color: '#3B82F6' },
            { label: 'Ort. Getiri', value: `%${avgReturn.toFixed(1)}/yıl`, icon: TrendingUp, color: '#D4AF37' },
          ].map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="bg-white rounded-[24px] border border-gray-100 p-6 shadow-sm">
              <div className="w-10 h-10 rounded-2xl flex items-center justify-center mb-3" style={{ backgroundColor: color + '15' }}>
                <Icon size={18} style={{ color }} />
              </div>
              <p className="text-2xl font-black tracking-tighter" style={{ color }}>{value}</p>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">{label}</p>
            </div>
          ))}
        </div>

        {/* Opportunities */}
        {enriched.length === 0 ? (
          <div className="bg-white rounded-[32px] border border-gray-100 p-16 text-center shadow-sm">
            <Users size={48} className="text-gray-200 mx-auto mb-6" />
            <p className="text-lg font-black text-gray-400">Henüz açık fırsat yok</p>
            <p className="text-sm text-gray-300 mt-2 mb-6">İlk yatırım fırsatını siz oluşturun.</p>
            <InvestorNetworkClient mode="trigger" />
          </div>
        ) : (
          <div className="grid gap-5">
            {enriched.map((opp) => (
              <div key={opp.id} className="bg-white rounded-[32px] border border-gray-100 p-8 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-start justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-[9px] font-black tracking-widest px-3 py-1 rounded-full bg-[#F0FDF8] text-[#00C49F] uppercase">
                        {TYPE_LABELS[opp.propertyType] ?? opp.propertyType}
                      </span>
                      <span className="text-[9px] font-black tracking-widest px-3 py-1 rounded-full bg-gray-100 text-gray-500 uppercase">
                        AÇIK
                      </span>
                    </div>
                    <h2 className="text-xl font-black tracking-tight mb-2">{opp.title}</h2>
                    <p className="text-sm text-gray-400 line-clamp-2 mb-4">{opp.description}</p>
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1.5 text-[11px] font-semibold text-gray-400">
                        <MapPin size={11} /> {opp.location}
                      </span>
                      <span className="flex items-center gap-1.5 text-[11px] font-semibold text-gray-400">
                        <Clock size={11} /> {opp.durationMonths} ay
                      </span>
                      <span className="flex items-center gap-1.5 text-[11px] font-semibold text-gray-400">
                        <Users size={11} /> {opp._count.participants} katılımcı
                      </span>
                    </div>
                  </div>

                  <div className="shrink-0 text-right">
                    <div className="mb-3">
                      <p className="text-[9px] font-black tracking-widest uppercase text-gray-400">Hedef</p>
                      <p className="text-2xl font-black tracking-tighter text-[#0F172A]">{formatCurrency(opp.targetAmount)}</p>
                    </div>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="text-center">
                        <p className="text-[9px] font-black tracking-widest uppercase text-gray-400">Getiri</p>
                        <p className="text-lg font-black text-[#00C49F]">%{opp.expectedReturn}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-[9px] font-black tracking-widest uppercase text-gray-400">Min</p>
                        <p className="text-sm font-black text-[#0F172A]">{formatCurrency(opp.minInvestment)}</p>
                      </div>
                    </div>
                    <InvestorNetworkClient mode="join" opportunityId={opp.id} minInvestment={opp.minInvestment} />
                  </div>
                </div>

                {/* Funding Progress */}
                <div className="mt-6 pt-5 border-t border-gray-50">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-[10px] font-black tracking-widest uppercase text-gray-400">Fonlama Durumu</p>
                    <p className="text-[10px] font-black" style={{ color: opp.fundingPct >= 75 ? '#00C49F' : '#F59E0B' }}>
                      {opp.fundingPct}%
                    </p>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${Math.min(opp.fundingPct, 100)}%`,
                        backgroundColor: opp.fundingPct >= 75 ? '#00C49F' : '#F59E0B',
                      }}
                    />
                  </div>
                  <div className="flex items-center justify-between mt-1.5">
                    <p className="text-[10px] text-gray-400">{formatCurrency(opp.confirmedAmount)} toplandı</p>
                    <p className="text-[10px] text-gray-400">{formatCurrency(Math.max(0, opp.targetAmount - opp.confirmedAmount))} kaldı</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
