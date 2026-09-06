import { Metadata } from 'next';
import NetKiraClient from './NetKiraClient';

export const metadata: Metadata = {
  title: 'Net Kira Geliri Hesaplayıcı | Vergi Sonrası Getiri Analizi | Söylemesi Bizden',
  description:
    'Net kira geliri hesaplayıcı: aidat, sigorta, bakım, emlak vergisi ve gelir vergisi düşüldükten sonraki gerçek kira getirisi ve amortisman analizi.',
};

export default function NetKiraHesaplayiciPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-14">
          <p className="text-[#00C49F] text-xs font-bold mb-3 uppercase tracking-widest">Gelir Analizi</p>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">Net Kira Geliri Hesaplayıcı</h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed">
            Tüm giderleri ve vergiyi düştükten sonra gerçek kira getirinizi ve amortisman sürenizi hesaplayın.
          </p>
        </div>
      </section>
      <NetKiraClient />
    </main>
  );
}
