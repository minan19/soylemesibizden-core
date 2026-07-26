import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { Shield, MapPin, ArrowRight, ArrowLeft, User } from 'lucide-react';

export const dynamic = 'force-dynamic';

function formatPrice(value: number) {
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
    minimumFractionDigits: 0,
  }).format(value);
}

export default async function VaultPage() {
  const assets = await prisma.asset.findMany({
    orderBy: { value: 'desc' },
    include: { user: { select: { name: true, email: true } } },
  });

  const total = assets.reduce((s, a) => s + a.value, 0);

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Header */}
        <div className="mb-10">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 transition-colors mb-6"
          >
            <ArrowLeft size={16} />
            Dashboard
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 bg-[#00C49F]/10 rounded-xl">
              <Shield size={24} className="text-[#00C49F]" />
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
              Dijital Tapu Kasası
            </h1>
          </div>
          <p className="text-slate-500 text-base font-medium">Kayıtlı varlık portföyü</p>
        </div>

        {/* Total value banner */}
        <div className="bg-slate-900 text-white rounded-2xl p-8 mb-10 flex items-center justify-between">
          <div>
            <p className="text-slate-400 text-sm font-medium mb-1">Toplam Portföy Değeri</p>
            <p className="text-4xl font-extrabold tracking-tight">{formatPrice(total)}</p>
          </div>
          <div className="text-right">
            <p className="text-slate-400 text-sm font-medium mb-1">Kayıtlı Varlık</p>
            <p className="text-4xl font-extrabold text-[#00C49F]">{assets.length}</p>
          </div>
        </div>

        {/* Asset grid */}
        {assets.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-16 text-center">
            <Shield size={40} className="mx-auto mb-4 text-slate-300" />
            <p className="text-slate-500 font-medium">Kayıtlı varlık yok.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {assets.map(asset => (
              <Link
                key={asset.id}
                href={`/asset/${asset.id}`}
                className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex flex-col gap-4 hover:shadow-md hover:border-[#00C49F]/30 transition-all group"
              >
                {/* Type badge */}
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#00C49F] bg-[#00C49F]/10 px-3 py-1 rounded-full uppercase tracking-wide">
                    {asset.type}
                  </span>
                  <ArrowRight
                    size={16}
                    className="text-slate-300 group-hover:text-[#00C49F] transition-colors"
                  />
                </div>

                {/* Value */}
                <div>
                  <p className="text-xs text-slate-400 font-medium uppercase tracking-wide mb-0.5">
                    Değer
                  </p>
                  <p className="text-2xl font-extrabold text-slate-900 tracking-tight">
                    {formatPrice(asset.value)}
                  </p>
                </div>

                {/* Location */}
                {asset.location && (
                  <div className="flex items-center gap-1.5 text-sm text-slate-500">
                    <MapPin size={14} className="text-slate-400 flex-shrink-0" />
                    <span className="truncate">{asset.location}</span>
                  </div>
                )}

                {/* Owner */}
                <div className="flex items-center gap-1.5 text-sm text-slate-500 pt-2 border-t border-slate-50">
                  <User size={14} className="text-slate-400 flex-shrink-0" />
                  <span className="truncate font-medium">
                    {asset.user.name ?? asset.user.email}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
