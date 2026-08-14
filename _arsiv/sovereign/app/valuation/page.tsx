import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Brain, Sparkles, TrendingUp, Shield } from 'lucide-react';
import AutoValuation from '@/components/AutoValuation';

export const dynamic = 'force-dynamic';

export default async function ValuationPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect('/login');

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-[#0F172A]">
      {/* Navbar */}
      <nav className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-gray-100 h-20 flex items-center justify-between px-10">
        <Link href="/dashboard" className="text-[11px] font-bold tracking-[0.35em] uppercase">
          SÖYLEMESİ<span className="text-[#00C49F]">BİZDEN</span>
        </Link>
        <Link
          href="/dashboard"
          className="flex items-center gap-2 text-[11px] font-bold text-gray-500 hover:text-[#0F172A] transition-colors"
        >
          <ArrowLeft size={14} />
          Dashboard
        </Link>
      </nav>

      <div className="max-w-5xl mx-auto px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <p className="text-[10px] font-black tracking-widest uppercase text-[#00C49F] mb-2">
            SOVEREIGN INTELLIGENCE
          </p>
          <h1 className="text-4xl font-black tracking-tighter text-[#0F172A] mb-4">
            AI Değerleme Motoru
          </h1>
          <p className="text-gray-400 text-sm max-w-xl leading-relaxed">
            Mülk özelliklerini girin, Claude AI ile desteklenen analizimiz saniyeler içinde
            tahmini piyasa değerini hesaplasın.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          {[
            {
              icon: Brain,
              label: 'Claude AI Destekli',
              desc: 'Anthropic claude-sonnet-4-5 modeli ile derin analiz',
              color: 'text-[#00C49F]',
              bg: 'bg-[#F0FDF8]',
            },
            {
              icon: TrendingUp,
              label: 'Piyasa Emsalleri',
              desc: 'Bölgesel karşılaştırmalı değerleme metodolojisi',
              color: 'text-blue-500',
              bg: 'bg-blue-50',
            },
            {
              icon: Shield,
              label: 'Risk Analizi',
              desc: 'Değeri artıran ve düşüren faktörlerin tespiti',
              color: 'text-purple-500',
              bg: 'bg-purple-50',
            },
          ].map(({ icon: Icon, label, desc, color, bg }) => (
            <div
              key={label}
              className="bg-white rounded-[24px] border border-gray-100 p-6 flex items-start gap-4 shadow-sm"
            >
              <div className={`${bg} w-10 h-10 rounded-2xl flex items-center justify-center shrink-0`}>
                <Icon size={18} className={color} />
              </div>
              <div>
                <p className="text-sm font-black text-[#0F172A] mb-1">{label}</p>
                <p className="text-[11px] text-gray-400 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Main Widget */}
        <AutoValuation />

        {/* Info Box */}
        <div className="mt-8 bg-white rounded-[24px] border border-gray-100 p-6 flex items-start gap-4 shadow-sm">
          <div className="w-8 h-8 rounded-xl bg-[#F0FDF8] flex items-center justify-center shrink-0">
            <Sparkles size={14} className="text-[#00C49F]" />
          </div>
          <div>
            <p className="text-sm font-bold text-[#0F172A] mb-1">
              Sovereign Intelligence hakkında
            </p>
            <p className="text-[11px] text-gray-400 leading-relaxed">
              Bu araç Türkiye gayrimenkul piyasasındaki güncel verileri ve yapay zeka modellerini
              kullanarak tahmini değer hesaplar. Sonuçlar bilgi amaçlı olup resmi ekspertiz
              değerlemesinin yerini tutmaz.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
