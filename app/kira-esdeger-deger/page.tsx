import { Metadata } from 'next';
import KiraEsdegerClient from './KiraEsdegerClient';

export const metadata: Metadata = {
  title: 'Kira Eşdeğer Değer Hesaplayıcı | Kiralık mı Satın Almalı mı? | Söylemesi Bizden',
  description:
    'Ödediğiniz kiranın karşılığında satın alabileceğiniz konut değerini hesaplayın. Kira eşdeğer satın alma gücü ve piyasa karşılaştırması.',
};

export default function KiraEsdegerDegerPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-14">
          <p className="text-[#00C49F] text-xs font-bold mb-3 uppercase tracking-widest">Karar Analizi</p>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">Kira Eşdeğer Değer Hesaplayıcı</h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed">
            Ödediğiniz aylık kiranın kaç yılda ne kadarlık bir konuta eşdeğer olduğunu hesaplayın ve kira çarpanı analizini görün.
          </p>
        </div>
      </section>
      <KiraEsdegerClient />
    </main>
  );
}
