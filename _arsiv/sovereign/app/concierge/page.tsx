import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import Link from 'next/link';
import ConciergeForm from '@/components/ConciergeForm';
import {
  MessageSquare, ArrowLeft, Calendar, CheckCircle,
  Clock, AlertCircle, User,
} from 'lucide-react';

export const dynamic = 'force-dynamic';

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' }).format(date);
}

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string; Icon: React.ElementType }> = {
  OPEN: { label: 'Açık', color: '#F59E0B', bg: '#FFFBEB', Icon: Clock },
  IN_REVIEW: { label: 'İnceleniyor', color: '#3B82F6', bg: '#EFF6FF', Icon: AlertCircle },
  RESOLVED: { label: 'Çözüldü', color: '#00C49F', bg: '#F0FDF8', Icon: CheckCircle },
  CLOSED: { label: 'Kapandı', color: '#94A3B8', bg: '#F8FAFC', Icon: CheckCircle },
};

export default async function ConciergePage() {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as { id?: string } | undefined)?.id;

  const cases = await prisma.advisoryCase.findMany({
    orderBy: { createdAt: 'desc' },
    include: { user: { select: { id: true, name: true, email: true } } },
  });

  const myCases = userId ? cases.filter((c) => c.userId === userId) : cases;

  const stats = [
    { label: 'Toplam Talep', value: cases.length, color: '#0F172A' },
    { label: 'Açık', value: cases.filter((c) => c.status === 'OPEN').length, color: '#F59E0B' },
    { label: 'İnceleniyor', value: cases.filter((c) => c.status === 'IN_REVIEW').length, color: '#3B82F6' },
    { label: 'Çözüldü', value: cases.filter((c) => c.status === 'RESOLVED').length, color: '#00C49F' },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-[#0F172A]">
      <nav className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-gray-100 h-20 flex items-center justify-between px-10">
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="flex items-center gap-2 text-[11px] font-bold text-gray-400 hover:text-[#0F172A] transition-colors">
            <ArrowLeft size={16} /> Dashboard
          </Link>
          <span className="text-gray-200">·</span>
          <div className="flex items-center gap-2">
            <MessageSquare size={16} className="text-[#00C49F]" />
            <span className="text-[11px] font-bold">Konsiyerj & Danışmanlık</span>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-8 py-10 grid grid-cols-12 gap-10">
        {/* MAIN */}
        <div className="col-span-8 space-y-8">
          {/* STATS */}
          <div className="grid grid-cols-4 gap-4">
            {stats.map((s) => (
              <div key={s.label} className="bg-white rounded-3xl border border-gray-100 p-6 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">{s.label}</p>
                <p className="text-3xl font-black" style={{ color: s.color }}>{s.value}</p>
              </div>
            ))}
          </div>

          {/* INTRO */}
          <div className="bg-gradient-to-br from-[#0F172A] to-[#1E293B] rounded-[40px] p-10 text-white">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Sovereign Concierge</p>
            <h2 className="text-3xl font-black tracking-tighter mb-4">Kişisel Danışmanlık Hizmeti</h2>
            <p className="text-slate-400 text-sm leading-relaxed max-w-lg">
              Portföy analizi, hukuki danışmanlık, değerleme ve yatırım stratejisi konularında uzman ekibimizle bağlantıya geçin.
              Her talep 24 saat içinde yanıtlanır.
            </p>
            <div className="flex items-center gap-4 mt-6">
              {['Portföy Analizi', 'Hukuki Danışmanlık', 'Değerleme', 'Yatırım Stratejisi'].map((tag) => (
                <span key={tag} className="text-[10px] font-black tracking-widest bg-white/10 px-3 py-1.5 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* CASES LIST */}
          <div>
            <h2 className="text-[11px] font-black tracking-widest text-gray-400 uppercase mb-5 flex items-center gap-2">
              <span className="w-2 h-2 bg-[#00C49F] rounded-full animate-pulse" />
              {userId ? 'Taleplerim' : 'Tüm Talepler'} ({myCases.length})
            </h2>

            {myCases.length === 0 ? (
              <div className="bg-white rounded-[40px] border border-gray-100 p-16 text-center">
                <MessageSquare size={48} className="text-gray-200 mx-auto mb-6" />
                <p className="text-lg font-bold text-gray-400">Henüz danışmanlık talebiniz yok.</p>
                <p className="text-sm text-gray-300 mt-2">Sağdaki formu kullanarak talep oluşturun.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {myCases.map((c) => {
                  const cfg = STATUS_CONFIG[c.status] ?? STATUS_CONFIG.OPEN;
                  return (
                    <div key={c.id} className="bg-white rounded-[28px] border border-gray-100 p-7 shadow-[0_4px_24px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.04)] transition-all">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1 pr-4">
                          <h3 className="font-black text-[#0F172A] text-lg mb-1">{c.subject}</h3>
                          <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">{c.description}</p>
                        </div>
                        <span className="flex items-center gap-1.5 text-[10px] font-black px-3 py-1.5 rounded-full shrink-0" style={{ color: cfg.color, backgroundColor: cfg.bg }}>
                          <cfg.Icon size={11} /> {cfg.label}
                        </span>
                      </div>
                      <div className="flex items-center justify-between border-t border-gray-50 pt-4">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-[#F0FDF8] flex items-center justify-center">
                            <User size={12} className="text-[#00C49F]" />
                          </div>
                          <span className="text-[11px] font-semibold text-gray-500">
                            {c.user?.name ?? c.user?.email ?? 'Anonim'}
                          </span>
                        </div>
                        <span className="flex items-center gap-1 text-[11px] text-gray-400">
                          <Calendar size={11} /> {formatDate(c.createdAt)}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* SIDEBAR: FORM */}
        <aside className="col-span-4">
          <div className="sticky top-28">
            <ConciergeForm />
          </div>
        </aside>
      </div>
    </div>
  );
}
