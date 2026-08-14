import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import Link from 'next/link';
import DecisionResultComponent from '@/components/DecisionResult';

export const dynamic = 'force-dynamic';

export default async function DecisionDetailPage({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as any)?.id;
  if (!userId) {
    redirect('/login');
  }

  // Fetch decision
  const decision = await prisma.decisionRecord.findUnique({
    where: { id: params.id },
  });

  if (!decision || decision.userId !== userId) {
    redirect('/decision');
  }

  // Convert DB data to component format
  const decisionResult = {
    score: decision.score,
    recommendation: decision.recommendation as 'AL' | 'BEKLE' | 'PAS',
    confidence: decision.confidence,
    scores: decision.scores as any,
    risks: decision.risks as any,
    reasons: decision.reasons as any,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8FAFC] to-[#F0FDF8]">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-8 py-6 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold text-[#00C49F] tracking-widest uppercase mb-1">
              KARAR SONUCU
            </p>
            <h1 className="text-3xl font-black text-[#0F172A]">Analiz Sonuçları</h1>
          </div>
          <Link
            href="/decision"
            className="px-5 py-2.5 bg-gray-100 text-gray-700 text-[11px] font-bold rounded-full hover:bg-gray-200 transition"
          >
            ← YENİ ANALIZ
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-8 py-12">
        <DecisionResultComponent decision={decisionResult} />

        {/* Footer */}
        <div className="mt-12 p-6 bg-blue-50 border border-blue-200 rounded-xl text-center">
          <p className="text-sm text-blue-900">
            💡 <strong>Hatırlatma:</strong> Bu skor yalnızca referensidir. Kararınızı vermeden
            profesyonal danışman ile görüşün.
          </p>
        </div>
      </div>
    </div>
  );
}
