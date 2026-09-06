import { Metadata } from 'next';
import YatirimButceClient from './YatirimButceClient';

export const metadata: Metadata = {
  title: 'Yatırım Bütçe Hesaplayıcı | ROI, Kira Getirisi, 5 Yıl Projeksiyon | Söylemesi Bizden',
  description:
    'Gayrimenkul yatırım bütçesi hesaplayıcı: mülk değeri, peşinat, kira getirisi ve 5 yıllık ROI projeksiyonu. Şehir bazlı kira getirisi analizi.',
};

export default function YatirimButceHesaplayiciPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-14">
          <p className="text-[#00C49F] text-xs font-bold mb-3 uppercase tracking-widest">Yatırım Araçları</p>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">Yatırım Bütçe Hesaplayıcı</h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed">
            Mülk değeri, peşinat oranı ve şehre göre kira getirisi ile 5 yıllık ROI projeksiyonunu hesaplayın.
          </p>
        </div>
      </section>
      <YatirimButceClient />
    </main>
  );
}
