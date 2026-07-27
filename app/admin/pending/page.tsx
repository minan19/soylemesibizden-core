import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import { ArrowLeft, Clock, CheckCircle } from 'lucide-react';
import PendingListingsClient from '@/components/PendingListingsClient';

export const dynamic = 'force-dynamic';

export default async function AdminPendingPage() {
  const session = await getServerSession(authOptions);
  const user = session?.user as { role?: string } | undefined;
  if (user?.role !== 'ADMIN') redirect('/dashboard');

  const pending = await prisma.listing.findMany({
    where: { status: 'PENDING' },
    orderBy: { createdAt: 'asc' }, // oldest first (FIFO)
    include: { owner: { select: { id: true, name: true, email: true } } },
  });

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <div className="max-w-5xl mx-auto px-6 py-10 space-y-6">

        {/* Header */}
        <div>
          <Link
            href="/admin/dashboard"
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-gray-700 transition-colors mb-3"
          >
            <ArrowLeft size={14} /> Admin Panel
          </Link>
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
                <Clock size={18} className="text-amber-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">Onay Kuyruğu</h1>
                <p className="text-sm text-gray-400 mt-0.5">
                  {pending.length} ilan onay bekliyor · En eskiden en yeniye
                </p>
              </div>
            </div>
            {pending.length === 0 && (
              <div className="flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-xl text-sm font-semibold text-green-600">
                <CheckCircle size={15} /> Tüm ilanlar onaylandı
              </div>
            )}
          </div>
        </div>

        {pending.length === 0 ? (
          <div className="bg-white rounded-2xl border border-dashed border-gray-200 py-20 text-center">
            <CheckCircle size={40} className="text-[#00C49F] mx-auto mb-4" />
            <p className="text-gray-600 font-semibold text-base">Onay bekleyen ilan yok</p>
            <p className="text-gray-400 text-sm mt-1">Yeni ilanlar geldiğinde burada görünecek.</p>
          </div>
        ) : (
          <PendingListingsClient listings={pending} />
        )}
      </div>
    </main>
  );
}
