import { Metadata } from 'next';
import EnerjiVerimliligiClient from './EnerjiVerimliligiClient';

export const metadata: Metadata = {
  title: 'Konut Enerji Verimliliği Hesaplayıcı | EKB Sınıfı | Söylemesi Bizden',
  description:
    'Konutunuzun enerji tüketimi ve EKB sınıfını hesaplayın: ısıtma, soğutma, sıcak su ve aydınlatma bazlı yıllık enerji maliyeti tahmini.',
};

export default function EnerjiVerimliligiPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-14">
          <p className="text-[#00C49F] text-xs font-bold mb-3 uppercase tracking-widest">Enerji Analizi</p>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">Enerji Verimliliği Hesaplayıcı</h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed">
            Konutunuzun tahmini enerji tüketimini ve EKB sınıfını hesaplayın; iyileştirme ile sağlayabileceğiniz tasarrufu görün.
          </p>
        </div>
      </section>
      <EnerjiVerimliligiClient />
    </main>
  );
}
