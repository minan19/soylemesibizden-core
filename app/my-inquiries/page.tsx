import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';
import Link from 'next/link';
import { Metadata } from 'next';
import { ArrowLeft, MessageSquare, MapPin, Building2, ArrowRight, Clock } from 'lucide-react';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = {
  title: 'Başvurularım | Söylemesi Bizden',
};

export default async function MyInquiriesPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) redirect('/login');

  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) redirect('/login');

  const inquiries = await prisma.inquiry.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: 'desc' },
    include: {
      listing: {
        select: {
          id: true,
          title: true,
          price: true,
          city: true,
          district: true,
          photos: true,
          propertyType: true,
          listingType: true,
          status: true,
        },
      },
    },
  });

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <div className="max-w-3xl mx-auto px-6 py-10 space-y-8">

        {/* Header */}
        <div>
          <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-gray-700 transition-colors mb-3">
            <ArrowLeft size={14} /> Dashboard
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#F0FDF8] flex items-center justify-center">
              <MessageSquare size={18} className="text-[#00C49F]" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Başvurularım</h1>
              <p className="text-xs text-gray-400 mt-0.5">{inquiries.length} gönderilen başvuru</p>
            </div>
          </div>
        </div>

        {inquiries.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-14 text-center">
            <MessageSquare size={36} className="text-gray-200 mx-auto mb-4" />
            <p className="text-gray-500 font-semibold">Henüz başvuru göndermediniz</p>
            <p className="text-gray-400 text-sm mt-1 mb-5">
              İlan detay sayfasından &quot;İletişim / Başvuru&quot; formuyla satıcılara ulaşın.
            </p>
            <Link
              href="/listings"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#00C49F] hover:bg-[#00a882] text-white text-sm font-bold rounded-xl transition-colors"
            >
              İlanlara Git <ArrowRight size={14} />
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {inquiries.map(inq => (
              <div key={inq.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-sm transition-shadow">
                {/* Listing row */}
                <div className="flex items-start gap-4 p-5">
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                    {inq.listing.photos[0] ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={inq.listing.photos[0]} alt={inq.listing.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Building2 size={18} className="text-gray-300" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        inq.listing.status === 'ACTIVE' ? 'bg-[#F0FDF8] text-[#00C49F]' :
                        inq.listing.status === 'SOLD' ? 'bg-gray-100 text-gray-500' : 'bg-amber-50 text-amber-600'
                      }`}>
                        {inq.listing.status === 'ACTIVE' ? 'AKTİF' : inq.listing.status === 'SOLD' ? 'SATILDI' : 'BEKLEMEDE'}
                      </span>
                      <span className="text-[10px] text-gray-400">{inq.listing.propertyType} · {inq.listing.listingType}</span>
                    </div>
                    <Link href={`/listing/${inq.listing.id}`} className="font-semibold text-sm text-gray-900 hover:text-[#00C49F] transition-colors line-clamp-1">
                      {inq.listing.title}
                    </Link>
                    {(inq.listing.district || inq.listing.city) && (
                      <p className="text-[11px] text-gray-400 flex items-center gap-1 mt-0.5">
                        <MapPin size={9} />
                        {[inq.listing.district, inq.listing.city].filter(Boolean).join(', ')}
                      </p>
                    )}
                    <p className="text-sm font-bold text-[#00C49F] mt-1">
                      {inq.listing.price.toLocaleString('tr-TR')} ₺
                    </p>
                  </div>

                  <Link
                    href={`/listing/${inq.listing.id}`}
                    className="shrink-0 flex items-center gap-1 text-xs text-[#00C49F] font-semibold hover:underline"
                  >
                    İlana Git <ArrowRight size={11} />
                  </Link>
                </div>

                {/* Message */}
                <div className="border-t border-gray-50 px-5 py-4 bg-gray-50/50">
                  <div className="flex items-center gap-2 mb-2">
                    <MessageSquare size={11} className="text-gray-400" />
                    <span className="text-[10px] font-bold tracking-wider text-gray-400 uppercase">Mesajınız</span>
                    <span className="ml-auto flex items-center gap-1 text-[10px] text-gray-400">
                      <Clock size={9} />
                      {new Date(inq.createdAt).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">{inq.message}</p>
                  {(inq.phone || inq.email !== user.email) && (
                    <div className="flex gap-4 mt-2 text-xs text-gray-400">
                      {inq.phone && <span>Tel: {inq.phone}</span>}
                      <span>E-posta: {inq.email}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
