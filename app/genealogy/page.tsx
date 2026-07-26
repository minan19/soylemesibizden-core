import prisma from '@/lib/prisma';
import Link from 'next/link';
import { ArrowLeft, History, ShieldCheck, Calendar, User, MapPin, TrendingUp } from 'lucide-react';

export const dynamic = 'force-dynamic';

function formatPrice(price: number) {
  return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(price);
}

export default async function GenealogyPage() {
  const assets = await prisma.asset.findMany({
    orderBy: { createdAt: 'asc' },
    include: { user: { select: { name: true, email: true } } },
  });

  const totalValue = assets.reduce((s, a) => s + a.value, 0);

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <div className="max-w-5xl mx-auto px-8 py-10 space-y-8">

        <div>
          <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-gray-700 transition-colors mb-3">
            <ArrowLeft size={14} /> Dashboard
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
              <History size={18} />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Varlık Genealojisi</h1>
              <p className="text-xs text-gray-400 mt-0.5">Mülkiyet zinciri, değer tarihi ve köken takibi</p>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'KAYITLI VARLIK', value: assets.length, icon: <History size={16} />, color: 'text-purple-600' },
            { label: 'TOPLAM DEĞER', value: formatPrice(totalValue), icon: <TrendingUp size={16} />, color: 'text-[#00C49F]' },
            { label: 'SAHIP SAYISI', value: new Set(assets.map(a => a.userId)).size, icon: <User size={16} />, color: 'text-gray-900' },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-2xl border border-gray-100 p-5">
              <div className={`${s.color} mb-2`}>{s.icon}</div>
              <p className={`text-2xl font-bold ${s.color} leading-tight`}>{s.value}</p>
              <p className="text-[9px] font-bold tracking-widest text-gray-400 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Verification badge */}
        <div className="bg-[#F0FDF8] rounded-2xl border border-[#00C49F]/20 p-5 flex items-center gap-4">
          <ShieldCheck size={24} className="text-[#00C49F] shrink-0" />
          <div>
            <p className="text-sm font-bold text-gray-900">Tüm varlıklar Sovereign Verified</p>
            <p className="text-xs text-gray-500 mt-0.5">Kayıtlı her varlık sistem tarafından doğrulanmış ve mühürlenmiştir.</p>
          </div>
        </div>

        {/* Asset timeline */}
        {assets.length > 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h2 className="text-[10px] font-bold tracking-widest text-[#00C49F] uppercase mb-6 flex items-center gap-2">
              <Calendar size={12} /> Kayıt Zaman Çizelgesi
            </h2>
            <div className="relative">
              <div className="absolute left-5 top-0 bottom-0 w-px bg-gray-100" />
              <div className="space-y-6">
                {assets.map((asset, idx) => (
                  <div key={asset.id} className="relative flex gap-6 pl-12">
                    <div className="absolute left-3.5 w-3 h-3 rounded-full bg-[#00C49F] border-2 border-white ring-2 ring-[#00C49F]/20 mt-1" />
                    <div className="flex-1 bg-gray-50 rounded-xl p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-bold text-gray-900">{asset.type}</span>
                            <span className="text-[10px] font-bold px-2 py-0.5 bg-[#F0FDF8] text-[#00C49F] rounded-full">#{idx + 1}</span>
                          </div>
                          <div className="flex items-center gap-3 text-xs text-gray-400">
                            {asset.location && <span className="flex items-center gap-1"><MapPin size={10} /> {asset.location}</span>}
                            <span className="flex items-center gap-1"><User size={10} /> {asset.user.name ?? asset.user.email}</span>
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-sm font-bold text-[#00C49F]">{formatPrice(asset.value)}</p>
                          <p className="text-[10px] text-gray-400 mt-0.5">{new Date(asset.createdAt).toLocaleDateString('tr-TR')}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-dashed border-gray-200 py-16 text-center">
            <History size={32} className="text-gray-300 mx-auto mb-3" />
            <p className="text-gray-400 text-sm">Kayıtlı varlık bulunamadı.</p>
            <Link href="/admin/create-asset" className="inline-flex mt-4 text-xs font-semibold text-[#00C49F] hover:underline">
              İlk varlığı ekle →
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
