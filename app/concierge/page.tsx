import prisma from '@/lib/prisma';
import Link from 'next/link';
import { ArrowLeft, Headphones, CheckCircle, Clock, MessageSquare, ArrowRight } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function ConciergePage() {
  const cases = await prisma.advisoryCase.findMany({
    orderBy: { createdAt: 'desc' },
    include: { user: { select: { name: true, email: true } } },
  });

  const open = cases.filter(c => c.status === 'OPEN').length;
  const resolved = cases.filter(c => c.status === 'RESOLVED').length;

  return (
    <main className="min-h-screen bg-[#F8FAFC] text-gray-900">
      <div className="max-w-5xl mx-auto px-8 py-10 space-y-8">

        <div className="flex items-center justify-between">
          <div>
            <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-gray-700 transition-colors mb-3">
              <ArrowLeft size={14} /> Dashboard
            </Link>
            <h1 className="text-3xl font-bold tracking-tight">Konsiyerj & Danışmanlık</h1>
            <p className="text-sm text-gray-500 mt-1">{cases.length} vaka</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'TOPLAM', value: cases.length, color: 'text-gray-900' },
            { label: 'AÇIK', value: open, color: 'text-amber-600' },
            { label: 'ÇÖZÜLDÜ', value: resolved, color: 'text-[#00C49F]' },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-2xl border border-gray-100 p-5">
              <p className={`text-3xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-[9px] font-bold tracking-widest text-gray-400 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="space-y-3">
          {cases.map(c => (
            <div key={c.id} className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-md transition-all group">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-10 h-10 rounded-xl bg-[#F0FDF8] flex items-center justify-center text-[#00C49F] shrink-0 mt-0.5">
                    <Headphones size={18} />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-base font-semibold text-gray-900 mb-1">{c.subject}</h2>
                    {c.description && (
                      <p className="text-sm text-gray-500 line-clamp-2 mb-2">{c.description}</p>
                    )}
                    <p className="text-xs text-gray-400">
                      {c.user.name ?? c.user.email} · {new Date(c.createdAt).toLocaleDateString('tr-TR')}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold ${
                    c.status === 'RESOLVED'
                      ? 'bg-[#F0FDF8] text-[#00C49F] border border-[#00C49F]/20'
                      : 'bg-amber-50 text-amber-600 border border-amber-200'
                  }`}>
                    {c.status === 'RESOLVED'
                      ? <><CheckCircle size={11} /> ÇÖZÜLDÜ</>
                      : <><Clock size={11} /> AÇIK</>
                    }
                  </span>
                  <ArrowRight size={14} className="text-gray-300 group-hover:text-[#00C49F] transition-colors" />
                </div>
              </div>
            </div>
          ))}

          {cases.length === 0 && (
            <div className="bg-white rounded-2xl border border-dashed border-gray-200 py-20 text-center">
              <MessageSquare size={32} className="text-gray-300 mx-auto mb-3" />
              <p className="text-gray-400 text-sm">Açık danışmanlık talebi bulunmuyor.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
