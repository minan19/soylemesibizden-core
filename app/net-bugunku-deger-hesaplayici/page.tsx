import { Metadata } from 'next';
import NetBugunkuDegerClient from './NetBugunkuDegerClient';

export const metadata: Metadata = {
  title: 'Net Bugünkü Değer Hesaplayıcı | Gayrimenkul NBD Analizi | Söylemesi Bizden',
  description:
    'Gayrimenkul yatırımı için Net Bugünkü Değer (NBD) hesaplayıcı: kira getirileri, çıkış değeri ve iskonto oranıyla yatırım kârlılığını analiz edin.',
};

export default function NetBugunkuDegerPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-14">
          <p className="text-[#00C49F] text-xs font-bold mb-3 uppercase tracking-widest">Yatırım Analizi</p>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">Net Bugünkü Değer Hesaplayıcı</h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed">
            Gayrimenkul yatırımınızın kira getirileri ve çıkış değerini iskonto ederek NBD ve IRR analizi yapın.
          </p>
        </div>
      </section>
      <NetBugunkuDegerClient />
    </main>
  );
}
