import { Metadata } from 'next';
import DepremSigortaClient from './DepremSigortaClient';

export const metadata: Metadata = {
  title: 'Deprem Sigorta (DASK) Prim Hesaplayıcı | Risk Bölgesi, Yapı Türü | Söylemesi Bizden',
  description:
    'DASK zorunlu deprem sigortası prim hesaplayıcı: risk bölgesi, yapı türü, kat ve yapım yılına göre yıllık ve aylık prim tahmini.',
};

export default function DepremSigortaHesaplayiciPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-14">
          <p className="text-[#00C49F] text-xs font-bold mb-3 uppercase tracking-widest">DASK Hesaplama</p>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">Deprem Sigorta Prim Hesaplayıcı</h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed">
            Risk bölgesi, yapı türü ve kat konumuna göre zorunlu deprem sigortası (DASK) prim tahmini.
          </p>
        </div>
      </section>
      <DepremSigortaClient />
    </main>
  );
}
