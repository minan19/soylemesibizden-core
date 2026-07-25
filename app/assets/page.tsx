import prisma from '@/lib/prisma';
import Link from 'next/link';
import { ArrowLeft, Shield, MapPin, ArrowRight, User } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AssetsPage() {
  const assets = await prisma.asset.findMany({
    orderBy: { createdAt: 'desc' },
    include: { user: true },
  });

  const totalValue = assets.reduce((sum, a) => sum + a.value, 0);
  const types = Array.from(new Set(assets.map(a => a.type)));

  return (
    <main className="min-h-screen bg-[#F8FAFC] text-gray-900">
      <div className="max-w-7xl mx-auto px-8 py-10 space-y-8">

        <div className="flex items-center justify-between">
          <div>
            <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-gray-700 transition-colors mb-3">
              <ArrowLeft size={14} /> Dashboard
            </Link>
            <h1 className="text-3xl font-bold tracking-tight">Varlık Portföyü</h1>
            <p className="text-sm text-gray-500 mt-1">{assets.length} varlık kayıtlı</p>
          </div>
          <Link href="/admin/create-asset" className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#00C49F] hover:bg-[#00a882] text-white text-sm font-bold rounded-xl transition-colors">
            <Shield size={15} /> Varlık Ekle
          </Link>
        </div>

        {/* Toplam Değer Kartı */}
        <div className="bg-white rounded-2xl border border-[#00C49F]/20 p-6 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-1">Toplam Portföy Değeri</p>
            <p className="text-4xl font-bold text-gray-900 font-mono">₺ {totalValue.toLocaleString('tr-TR')}</p>
          </div>
          <div className="flex gap-2 flex-wrap justify-end">
            {types.map(t => (
              <span key={t} className="px-3 py-1 bg-[#F0FDF8] text-[#00C49F] rounded-full text-[10px] font-bold tracking-widest border border-[#00C49F]/20">
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Varlık Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {assets.map(asset => (
            <Link key={asset.id} href={`/asset/${asset.id}`}
              className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-lg hover:border-[#00C49F]/20 transition-all group">
              <div className="flex justify-between items-start mb-4">
                <span className="px-2.5 py-1 bg-gray-50 border border-gray-200 text-[10px] font-bold tracking-widest text-gray-600 rounded-full uppercase">
                  {asset.type}
                </span>
                <ArrowRight size={16} className="text-gray-300 group-hover:text-[#00C49F] transition-colors" />
              </div>

              <p className="text-2xl font-bold font-mono text-gray-900 mb-4">
                ₺ {asset.value.toLocaleString('tr-TR')}
              </p>

              <div className="space-y-2 pt-4 border-t border-gray-50">
                {asset.location && (
                  <p className="text-xs text-gray-400 flex items-center gap-1.5">
                    <MapPin size={11} /> {asset.location}
                  </p>
                )}
                <p className="text-xs text-gray-400 flex items-center gap-1.5">
                  <User size={11} /> {asset.user.name ?? asset.user.email}
                </p>
                <p className="text-[10px] text-gray-300 font-mono">{new Date(asset.createdAt).toLocaleDateString('tr-TR')}</p>
              </div>
            </Link>
          ))}

          {assets.length === 0 && (
            <div className="col-span-3 bg-white rounded-3xl border border-dashed border-gray-200 py-20 text-center">
              <Shield size={32} className="text-gray-300 mx-auto mb-3" />
              <p className="text-gray-400 text-sm">Sistemde kayıtlı varlık bulunmamaktadır.</p>
              <Link href="/admin/create-asset" className="mt-4 inline-flex items-center gap-1 text-xs text-[#00C49F] font-semibold hover:underline">
                Varlık ekle <ArrowRight size={12} />
              </Link>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
