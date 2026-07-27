import prisma from '@/lib/prisma';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Users, Building2, Calendar, Activity, CheckCircle, Clock } from 'lucide-react';
import DealStatusButton from '@/components/DealStatusButton';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: { id: string } }) {
  const room = await prisma.dealRoom.findUnique({ where: { id: params.id }, select: { listing: { select: { title: true } } } });
  if (!room) return { title: 'Anlaşma Odası Bulunamadı' };
  return { title: `Anlaşma Odası — ${room.listing.title} | Söylemesi Bizden` };
}

function formatPrice(price: number) {
  return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(price);
}

export default async function BoardroomDetailPage({ params }: { params: { id: string } }) {
  const room = await prisma.dealRoom.findUnique({
    where: { id: params.id },
    include: {
      listing: { select: { id: true, title: true, price: true, city: true, district: true, propertyType: true, listingType: true, area: true, status: true } },
      buyer: { select: { name: true, email: true } },
      seller: { select: { name: true, email: true } },
    },
  });

  if (!room) notFound();

  const statusConfig = {
    OPEN: { label: 'Açık', icon: <Clock size={14} />, className: 'bg-amber-50 text-amber-600 border border-amber-200' },
    IN_PROGRESS: { label: 'Müzakerede', icon: <Activity size={14} />, className: 'bg-blue-50 text-blue-600 border border-blue-100' },
    CLOSED: { label: 'Tamamlandı', icon: <CheckCircle size={14} />, className: 'bg-[#F0FDF8] text-[#00C49F] border border-[#00C49F]/20' },
  };
  const sc = statusConfig[room.status as keyof typeof statusConfig] ?? statusConfig.OPEN;

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <div className="max-w-4xl mx-auto px-8 py-10 space-y-8">

        <div>
          <Link href="/boardroom" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-gray-700 transition-colors mb-3">
            <ArrowLeft size={14} /> Boardroom
          </Link>
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#F0FDF8] flex items-center justify-center text-[#00C49F] shrink-0">
                <Activity size={22} />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">Anlaşma Odası</h1>
                <p className="text-sm text-gray-400 font-mono mt-0.5">{room.id.slice(0, 20)}...</p>
              </div>
            </div>
            <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold shrink-0 ${sc.className}`}>
              {sc.icon} {sc.label}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Main info */}
          <div className="lg:col-span-2 space-y-5">

            {/* Listing info */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <p className="text-[10px] font-bold tracking-widest text-[#00C49F] uppercase mb-4 flex items-center gap-2">
                <Building2 size={12} /> İlan Bilgisi
              </p>
              <Link href={`/listing/${room.listing.id}`}
                className="text-lg font-bold text-gray-900 hover:text-[#00C49F] transition-colors block mb-3">
                {room.listing.title}
              </Link>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Fiyat', value: formatPrice(room.listing.price) },
                  { label: 'Konum', value: [room.listing.district, room.listing.city].filter(Boolean).join(', ') || '—' },
                  { label: 'Mülk Tipi', value: room.listing.propertyType },
                  { label: 'İlan Türü', value: room.listing.listingType },
                  { label: 'Alan', value: room.listing.area ? `${room.listing.area} m²` : '—' },
                  { label: 'İlan Durumu', value: room.listing.status },
                ].map(row => (
                  <div key={row.label}>
                    <p className="text-[9px] font-bold tracking-widest text-gray-400 uppercase">{row.label}</p>
                    <p className="text-sm font-semibold text-gray-700 mt-0.5">{row.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <p className="text-[10px] font-bold tracking-widest text-[#00C49F] uppercase mb-4 flex items-center gap-2">
                <Calendar size={12} /> Zaman Çizelgesi
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-[#F0FDF8] rounded-xl border border-[#00C49F]/20">
                  <CheckCircle size={16} className="text-[#00C49F] shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-gray-700">Oda Açıldı</p>
                    <p className="text-[10px] text-gray-400">{new Date(room.createdAt).toLocaleString('tr-TR')}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <div className={`w-4 h-4 rounded-full flex items-center justify-center ${room.status === 'CLOSED' ? 'bg-[#00C49F]' : 'bg-gray-200'}`}>
                    {room.status === 'CLOSED' && <CheckCircle size={12} className="text-white" />}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-700">Anlaşma Tamamlandı</p>
                    <p className="text-[10px] text-gray-400">
                      {room.status === 'CLOSED' ? new Date(room.updatedAt).toLocaleString('tr-TR') : 'Beklemede'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right panel */}
          <div className="space-y-4">

            {/* Parties */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <p className="text-[10px] font-bold tracking-widest text-[#00C49F] uppercase mb-4 flex items-center gap-2">
                <Users size={12} /> Taraflar
              </p>
              <div className="space-y-3">
                <div>
                  <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">Alıcı</p>
                  <p className="text-sm font-semibold text-gray-800">{room.buyer.name ?? room.buyer.email}</p>
                  <p className="text-xs text-gray-400">{room.buyer.email}</p>
                </div>
                <div className="border-t border-gray-50 pt-3">
                  <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">Satıcı</p>
                  <p className="text-sm font-semibold text-gray-800">{room.seller.name ?? room.seller.email}</p>
                  <p className="text-xs text-gray-400">{room.seller.email}</p>
                </div>
              </div>
            </div>

            {/* Status */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <p className="text-[10px] font-bold tracking-widest text-[#00C49F] uppercase mb-3">Durum</p>
              <span className={`inline-flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold ${sc.className}`}>
                {sc.icon} {sc.label}
              </span>
              {room.status === 'OPEN' && (
                <p className="text-xs text-gray-500 mt-3 leading-relaxed">
                  Müzakere süreci başlatıldı. Taraflar anlaşma şartlarını görüşüyor.
                </p>
              )}
              {room.status === 'IN_PROGRESS' && (
                <p className="text-xs text-gray-500 mt-3 leading-relaxed">
                  Aktif müzakere devam ediyor. Şartlar onay aşamasında.
                </p>
              )}
              {room.status === 'CLOSED' && (
                <p className="text-xs text-gray-500 mt-3 leading-relaxed">
                  Anlaşma başarıyla tamamlandı.
                </p>
              )}
            </div>

            {room.status !== 'CLOSED' && (
              <div className="bg-white rounded-2xl border border-gray-100 p-5">
                <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-3">Durum Güncelle</p>
                <DealStatusButton dealId={room.id} currentStatus={room.status} />
              </div>
            )}

            <Link href="/deals" className="flex items-center justify-center gap-2 py-3 border border-gray-200 text-gray-600 text-sm font-semibold rounded-xl hover:bg-gray-50 transition-colors">
              <ArrowLeft size={14} /> Tüm Odalar
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
