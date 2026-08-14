import prisma from '@/lib/prisma';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import { Flag, ArrowLeft, ExternalLink, AlertTriangle } from 'lucide-react';

export const dynamic = 'force-dynamic';

const REASON_LABELS: Record<string, string> = {
  YANILTICI: 'Yanıltıcı / Yanlış bilgi',
  YANLIS_FIYAT: 'Yanlış fiyat',
  KOPYALA: 'Kopya / Tekrar ilan',
  UYGUNSUZ: 'Uygunsuz içerik',
  DIGER: 'Diğer',
};

const REASON_COLORS: Record<string, string> = {
  YANILTICI: 'bg-amber-50 text-amber-700 border-amber-200',
  YANLIS_FIYAT: 'bg-blue-50 text-blue-700 border-blue-100',
  KOPYALA: 'bg-purple-50 text-purple-700 border-purple-100',
  UYGUNSUZ: 'bg-red-50 text-red-600 border-red-100',
  DIGER: 'bg-gray-100 text-gray-600 border-gray-200',
};

export default async function AdminReportsPage() {
  const session = await getServerSession(authOptions);
  const role = (session?.user as { role?: string })?.role;
  if (role !== 'ADMIN') redirect('/');

  const reports = await prisma.inquiry.findMany({
    where: { name: { startsWith: '[ŞIKAYET]' } },
    orderBy: { createdAt: 'desc' },
    take: 100,
    include: {
      listing: { select: { id: true, title: true, status: true, city: true } },
    },
  });

  // Group by listingId to show aggregate counts
  const countByListing = reports.reduce<Record<string, number>>((acc, r) => {
    acc[r.listingId] = (acc[r.listingId] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <div className="max-w-5xl mx-auto px-6 py-10 space-y-8">

        <div>
          <Link href="/admin/dashboard" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-gray-700 transition-colors mb-3">
            <ArrowLeft size={14} /> Admin Dashboard
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center">
              <Flag size={22} className="text-red-500" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">İlan Şikayetleri</h1>
              <p className="text-sm text-gray-500 mt-0.5">
                {reports.length} şikayet · {Object.keys(countByListing).length} farklı ilan
              </p>
            </div>
          </div>
        </div>

        {reports.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center shadow-sm">
            <Flag size={32} className="text-gray-200 mx-auto mb-3" />
            <p className="font-semibold text-gray-400">Henüz şikayet bulunmuyor</p>
          </div>
        ) : (
          <div className="space-y-3">
            {reports.map(report => {
              const reasonKey = report.name.replace('[ŞIKAYET] ', '');
              const details = report.message.includes('\n\nDetaylar: ')
                ? report.message.split('\n\nDetaylar: ')[1]
                : null;
              const colorClass = REASON_COLORS[reasonKey] ?? REASON_COLORS.DIGER;
              const count = countByListing[report.listingId] ?? 1;

              return (
                <div key={report.id} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm flex gap-4">

                  {/* Count badge */}
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
                    {count > 1 ? (
                      <span className="text-xs font-bold text-red-500">{count}x</span>
                    ) : (
                      <Flag size={16} className="text-red-400" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="min-w-0">
                        <Link
                          href={`/listing/${report.listingId}`}
                          target="_blank"
                          className="font-semibold text-gray-900 hover:text-[#00C49F] transition-colors flex items-center gap-1.5 text-sm"
                        >
                          {report.listing?.title ?? 'İlan silinmiş'}
                          <ExternalLink size={11} className="text-gray-300 flex-shrink-0" />
                        </Link>
                        {report.listing?.city && (
                          <p className="text-xs text-gray-400 mt-0.5">{report.listing.city}</p>
                        )}
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border tracking-wide ${colorClass}`}>
                          {REASON_LABELS[reasonKey] ?? reasonKey}
                        </span>
                        {report.listing?.status === 'ACTIVE' && (
                          <Link
                            href={`/admin/listings`}
                            className="text-[10px] font-bold px-2.5 py-1 rounded-full border bg-[#F0FDF8] text-[#00C49F] border-[#00C49F]/20"
                          >
                            AKTİF
                          </Link>
                        )}
                      </div>
                    </div>

                    {details && (
                      <div className="bg-gray-50 rounded-xl px-3 py-2 mt-2">
                        <p className="text-xs text-gray-500 flex items-start gap-1.5">
                          <AlertTriangle size={11} className="text-amber-400 flex-shrink-0 mt-0.5" />
                          {details}
                        </p>
                      </div>
                    )}

                    <div className="flex items-center gap-3 mt-2">
                      <p className="text-[10px] text-gray-300">
                        {report.email !== 'anonim' ? report.email : 'Anonim kullanıcı'}
                      </p>
                      <span className="text-gray-200">·</span>
                      <p className="text-[10px] text-gray-300">
                        {new Date(report.createdAt).toLocaleDateString('tr-TR', {
                          day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit',
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
