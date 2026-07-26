import prisma from '@/lib/prisma';
import Link from 'next/link';
import { ArrowLeft, Leaf, TrendingDown, Building2, CheckCircle, AlertTriangle } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function CarbonPage() {
  const listings = await prisma.listing.findMany({
    where: { status: 'ACTIVE', buildingAge: { not: null } },
    orderBy: { buildingAge: 'asc' },
    take: 10,
    select: { id: true, title: true, buildingAge: true, area: true, propertyType: true, city: true },
  });

  const totalListings = await prisma.listing.count({ where: { status: 'ACTIVE' } });
  const newBuildings = listings.filter(l => (l.buildingAge ?? 0) <= 5).length;
  const hasElevatorCount = await prisma.listing.count({ where: { status: 'ACTIVE', hasElevator: true } });

  const getEsgScore = (age: number | null) => {
    if (age === null) return { score: 'N/A', color: 'text-gray-400', bg: 'bg-gray-50' };
    if (age <= 2) return { score: 'A+', color: 'text-[#00C49F]', bg: 'bg-[#F0FDF8]' };
    if (age <= 5) return { score: 'A', color: 'text-[#00C49F]', bg: 'bg-[#F0FDF8]' };
    if (age <= 10) return { score: 'B', color: 'text-blue-500', bg: 'bg-blue-50' };
    if (age <= 20) return { score: 'C', color: 'text-amber-500', bg: 'bg-amber-50' };
    return { score: 'D', color: 'text-red-500', bg: 'bg-red-50' };
  };

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <div className="max-w-5xl mx-auto px-8 py-10 space-y-8">

        <div>
          <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-gray-700 transition-colors mb-3">
            <ArrowLeft size={14} /> Dashboard
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center text-green-600">
              <Leaf size={18} />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Karbon & ESG</h1>
              <p className="text-xs text-gray-400 mt-0.5">Çevresel etki ve sürdürülebilirlik skoru</p>
            </div>
          </div>
        </div>

        {/* Özet İstatistikler */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'AKTİF İLAN', value: totalListings, icon: <Building2 size={16} />, color: 'text-gray-900' },
            { label: 'YENİ BİNA (≤5 Yaş)', value: newBuildings, icon: <CheckCircle size={16} />, color: 'text-[#00C49F]' },
            { label: 'ASANSÖRLÜ', value: hasElevatorCount, icon: <TrendingDown size={16} />, color: 'text-blue-500' },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-2xl border border-gray-100 p-5">
              <div className={`${s.color} mb-2`}>{s.icon}</div>
              <p className={`text-3xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-[9px] font-bold tracking-widest text-gray-400 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* ESG Skoru Açıklaması */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="text-[10px] font-bold tracking-widest text-[#00C49F] uppercase mb-4">ESG Skor Metodolojisi</h2>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {[
              { grade: 'A+', label: '0-2 Yıl', color: 'text-[#00C49F]', bg: 'bg-[#F0FDF8]' },
              { grade: 'A', label: '3-5 Yıl', color: 'text-[#00C49F]', bg: 'bg-[#F0FDF8]' },
              { grade: 'B', label: '6-10 Yıl', color: 'text-blue-500', bg: 'bg-blue-50' },
              { grade: 'C', label: '11-20 Yıl', color: 'text-amber-500', bg: 'bg-amber-50' },
              { grade: 'D', label: '20+ Yıl', color: 'text-red-500', bg: 'bg-red-50' },
            ].map(g => (
              <div key={g.grade} className={`${g.bg} rounded-xl p-3 text-center`}>
                <p className={`text-2xl font-black ${g.color}`}>{g.grade}</p>
                <p className="text-xs text-gray-500 font-medium mt-1">{g.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* İlan Listesi */}
        {listings.length > 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-50">
              <h2 className="text-[10px] font-bold tracking-widest text-[#00C49F] uppercase">
                Bina Yaşına Göre Sıralı İlanlar (En Yeni)
              </h2>
            </div>
            <div className="divide-y divide-gray-50">
              {listings.map(listing => {
                const esg = getEsgScore(listing.buildingAge);
                return (
                  <Link key={listing.id} href={`/listing/${listing.id}`}
                    className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition-colors group">
                    <span className={`text-xl font-black w-10 text-center ${esg.color}`}>{esg.score}</span>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-900 group-hover:text-[#00C49F] transition-colors">
                        {listing.title}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {listing.propertyType} · {listing.city ?? '—'} · {listing.area ? `${listing.area} m²` : ''}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className={`text-xs font-bold px-2 py-1 rounded-full ${esg.bg} ${esg.color}`}>
                        {listing.buildingAge} yıl
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-dashed border-gray-200 py-16 text-center">
            <AlertTriangle size={32} className="text-gray-300 mx-auto mb-3" />
            <p className="text-gray-400 text-sm">Bina yaşı girilmiş aktif ilan bulunmuyor.</p>
          </div>
        )}
      </div>
    </main>
  );
}
