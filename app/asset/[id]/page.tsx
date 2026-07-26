import prisma from '@/lib/prisma';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Shield, MapPin, User, Calendar, TrendingUp, ShieldCheck } from 'lucide-react';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: { id: string } }) {
  const asset = await prisma.asset.findUnique({ where: { id: params.id }, select: { type: true, value: true } });
  if (!asset) return { title: 'Varlık Bulunamadı' };
  return { title: `${asset.type} Varlığı | Söylemesi Bizden` };
}

export default async function AssetDetailPage({ params }: { params: { id: string } }) {
  const asset = await prisma.asset.findUnique({
    where: { id: params.id },
    include: { user: { select: { name: true, email: true } } },
  });

  if (!asset) notFound();

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <div className="max-w-4xl mx-auto px-8 py-10 space-y-8">

        <div>
          <Link href="/assets" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-gray-700 transition-colors mb-3">
            <ArrowLeft size={14} /> Varlık Portföyü
          </Link>
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#F0FDF8] flex items-center justify-center text-[#00C49F] shrink-0">
                <Shield size={22} />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h1 className="text-2xl font-bold tracking-tight text-gray-900">{asset.type}</h1>
                  <span className="text-[10px] font-bold px-2 py-0.5 bg-[#F0FDF8] text-[#00C49F] rounded-full border border-[#00C49F]/20 flex items-center gap-1">
                    <ShieldCheck size={10} /> KAYITLI
                  </span>
                </div>
                <p className="text-sm text-gray-400 font-mono">{asset.id.slice(0, 20)}...</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Ana Bilgiler */}
          <div className="lg:col-span-2 space-y-5">

            {/* Değerleme */}
            <div className="bg-white rounded-2xl border border-[#00C49F]/20 p-6">
              <p className="text-[10px] font-bold tracking-widest text-[#00C49F] uppercase mb-2">Güncel Değerleme</p>
              <p className="text-4xl font-black text-gray-900 font-mono mb-1">
                ₺ {asset.value.toLocaleString('tr-TR')}
              </p>
              <p className="text-xs text-gray-400 flex items-center gap-1">
                <TrendingUp size={11} /> Son değerleme: {new Date(asset.createdAt).toLocaleDateString('tr-TR')}
              </p>
            </div>

            {/* Detaylar */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h2 className="text-[10px] font-bold tracking-widest text-[#00C49F] uppercase mb-5">Varlık Detayları</h2>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Varlık Tipi', value: asset.type, icon: <Shield size={14} /> },
                  { label: 'Konum', value: asset.location ?? '—', icon: <MapPin size={14} /> },
                  { label: 'Sahip', value: asset.user.name ?? asset.user.email, icon: <User size={14} /> },
                  { label: 'Kayıt Tarihi', value: new Date(asset.createdAt).toLocaleDateString('tr-TR'), icon: <Calendar size={14} /> },
                ].map(row => (
                  <div key={row.label} className="space-y-1">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-gray-400 uppercase tracking-widest">
                      {row.icon} {row.label}
                    </div>
                    <p className="text-sm font-semibold text-gray-700">{row.value}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Sağ Panel */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-gray-100 p-5 flex items-center gap-3">
              <ShieldCheck size={20} className="text-[#00C49F] shrink-0" />
              <div>
                <p className="text-xs font-bold text-gray-900">Sovereign Verified</p>
                <p className="text-[10px] text-gray-400 mt-0.5">Varlık sisteme kayıtlı ve doğrulanmış.</p>
              </div>
            </div>

            <div className="bg-[#F0FDF8] rounded-2xl border border-[#00C49F]/20 p-5">
              <p className="text-[10px] font-bold tracking-widest text-[#00C49F] uppercase mb-3">Toplam Değer</p>
              <p className="text-2xl font-black text-gray-900 font-mono">
                ₺ {asset.value.toLocaleString('tr-TR')}
              </p>
            </div>

            <Link
              href="/assets"
              className="flex items-center justify-center gap-2 py-3 border border-gray-200 text-gray-600 text-sm font-semibold rounded-xl hover:bg-gray-50 transition-colors"
            >
              <ArrowLeft size={14} /> Portföye Dön
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
