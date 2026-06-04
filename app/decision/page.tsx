import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import Link from 'next/link';
import DecisionForm from '@/components/DecisionForm';

export const dynamic = 'force-dynamic';

export default async function DecisionPage() {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as any)?.id;
  if (!userId) {
    redirect('/login');
  }

  // Fetch listings
  const listings = await prisma.listing.findMany({
    where: { status: 'ACTIVE' },
    take: 50,
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8FAFC] to-[#F0FDF8]">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold text-[#00C49F] tracking-widest uppercase mb-1">
              KARAR MOTORU
            </p>
            <h1 className="text-3xl font-black text-[#0F172A]">Karar Analizi</h1>
            <p className="text-sm text-gray-500 mt-2">Bu mülkü satın almalı mıyım?</p>
          </div>
          <Link
            href="/dashboard"
            className="px-5 py-2.5 bg-gray-100 text-gray-700 text-[11px] font-bold rounded-full hover:bg-gray-200 transition"
          >
            ← GERI
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Form */}
          <div>
            <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
              <DecisionForm listings={listings} />
            </div>
          </div>

          {/* Right: Info */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-gray-100 p-8">
              <h3 className="font-bold text-lg mb-4 text-[#0F172A]">Karar Motoru Nedir?</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Sovereign Karar Motoru, gayrimenkul yatırım kararlarını daha objektif hale getirir.
                Finansal durumunuz, piyasa koşulları ve riskler göz önüne alarak bir skor üretir.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 p-8">
              <h3 className="font-bold text-lg mb-4 text-[#0F172A]">Nasıl Çalışır?</h3>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex gap-3">
                  <span className="text-[#00C49F] font-bold">1.</span>
                  <span>Profilinizi girin (gelir, varlıklar, risk toleransı)</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#00C49F] font-bold">2.</span>
                  <span>Bir mülk seçin</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#00C49F] font-bold">3.</span>
                  <span>0-100 arasında karar skoru alın</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#00C49F] font-bold">4.</span>
                  <span>Neden bu skor? Riskler neler? öğrenin</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
