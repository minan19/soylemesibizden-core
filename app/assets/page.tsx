import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import Link from 'next/link';
import AssetCreateForm from '@/components/AssetCreateForm';
import {
  Database, ArrowLeft, MapPin, TrendingUp,
  Building2, Leaf, Zap, BarChart3,
} from 'lucide-react';

export const dynamic = 'force-dynamic';

function formatCurrency(val: number): string {
  if (val >= 1e9) return (val / 1e9).toFixed(2) + ' Milyar ₺';
  if (val >= 1e6) return (val / 1e6).toFixed(2) + ' Milyon ₺';
  if (val >= 1e3) return (val / 1e3).toFixed(0) + 'K ₺';
  return val.toLocaleString('tr-TR') + ' ₺';
}

const TYPE_CONFIG: Record<string, { color: string; bg: string; Icon: React.ElementType }> = {
  RESIDENTIAL: { color: '#3B82F6', bg: '#EFF6FF', Icon: Building2 },
  COMMERCIAL: { color: '#F59E0B', bg: '#FFFBEB', Icon: BarChart3 },
  LAND: { color: '#00C49F', bg: '#F0FDF8', Icon: Leaf },
  INDUSTRIAL: { color: '#8B5CF6', bg: '#F5F3FF', Icon: Zap },
};

export default async function AssetsPage() {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as { id?: string } | undefined)?.id;

  const assets = await prisma.asset.findMany({
    orderBy: { createdAt: 'desc' },
    include: { user: { select: { name: true, email: true } } },
  });

  const myAssets = userId ? assets.filter((a) => a.userId === userId) : assets;
  const totalValue = myAssets.reduce((sum, a) => sum + a.value, 0);

  const typeGroups = myAssets.reduce<Record<string, number>>((acc, a) => {
    acc[a.type] = (acc[a.type] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-[#0F172A]">
      <nav className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-gray-100 h-20 flex items-center justify-between px-10">
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="flex items-center gap-2 text-[11px] font-bold text-gray-400 hover:text-[#0F172A] transition-colors">
            <ArrowLeft size={16} /> Dashboard
          </Link>
          <span className="text-gray-200">·</span>
          <div className="flex items-center gap-2">
            <Database size={16} className="text-[#00C49F]" />
            <span className="text-[11px] font-bold">Varlık Yönetimi</span>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-8 py-10 grid grid-cols-12 gap-10">
        {/* MAIN */}
        <div className="col-span-8 space-y-8">
          {/* PORTFOLIO SUMMARY */}
          <div className="bg-[#0F172A] rounded-[40px] p-10 text-white">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Toplam Portföy Değeri</p>
            <p className="text-5xl font-black tracking-tighter mb-6">{formatCurrency(totalValue)}</p>
            <div className="flex items-center gap-6 flex-wrap">
              {Object.entries(typeGroups).map(([type, count]) => {
                const cfg = TYPE_CONFIG[type] ?? TYPE_CONFIG.RESIDENTIAL;
                return (
                  <div key={type} className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: cfg.color }} />
                    <span className="text-[11px] font-bold text-slate-400">{type}: {count}</span>
                  </div>
                );
              })}
              {Object.keys(typeGroups).length === 0 && (
                <span className="text-[11px] font-bold text-slate-500">Henüz varlık yok</span>
              )}
            </div>
          </div>

          {/* ASSETS GRID */}
          <div>
            <h2 className="text-[11px] font-black tracking-widest text-gray-400 uppercase mb-5 flex items-center gap-2">
              <span className="w-2 h-2 bg-[#00C49F] rounded-full animate-pulse" />
              Kayıtlı Varlıklar ({myAssets.length})
            </h2>

            {myAssets.length === 0 ? (
              <div className="bg-white rounded-[40px] border border-gray-100 p-16 text-center">
                <Database size={48} className="text-gray-200 mx-auto mb-6" />
                <p className="text-lg font-bold text-gray-400">Henüz kayıtlı varlık yok.</p>
                <p className="text-sm text-gray-300 mt-2">Sağdaki formu kullanarak varlık ekleyin.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-5">
                {myAssets.map((asset) => {
                  const cfg = TYPE_CONFIG[asset.type] ?? TYPE_CONFIG.RESIDENTIAL;
                  return (
                    <div key={asset.id} className="bg-white rounded-[28px] border border-gray-100 p-7 shadow-[0_4px_24px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.05)] transition-all">
                      <div className="flex items-start justify-between mb-5">
                        <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: cfg.bg }}>
                          <cfg.Icon size={22} style={{ color: cfg.color }} />
                        </div>
                        <span className="text-[9px] font-black tracking-widest px-2 py-1 rounded-full" style={{ color: cfg.color, backgroundColor: cfg.bg }}>
                          {asset.type}
                        </span>
                      </div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Değer</p>
                      <p className="text-2xl font-black tracking-tight text-[#0F172A] mb-3">{formatCurrency(asset.value)}</p>
                      {asset.location && (
                        <p className="flex items-center gap-1.5 text-[11px] font-semibold text-gray-400">
                          <MapPin size={11} className="text-[#00C49F]" /> {asset.location}
                        </p>
                      )}
                      {totalValue > 0 && (
                        <div className="flex items-center gap-2 mt-3">
                          <TrendingUp size={12} className="text-[#00C49F]" />
                          <span className="text-[11px] font-bold text-[#00C49F]">
                            Portföyün %{((asset.value / totalValue) * 100).toFixed(1)}&apos;i
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* SIDEBAR: FORM */}
        <aside className="col-span-4">
          <div className="sticky top-28">
            <AssetCreateForm />
          </div>
        </aside>
      </div>
    </div>
  );
}
