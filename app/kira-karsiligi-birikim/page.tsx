import { Metadata } from 'next';
import KiraKarsiligiBirikimClient from './KiraKarsiligiBirikimClient';

export const metadata: Metadata = {
  title: 'Kira Karşılığı Birikim Hesaplayıcı | Kira Ödemesini Yatırıma Çevir | Söylemesi Bizden',
  description:
    'Kira karşılığı birikim simülatörü: ödediğiniz kira tutarını yatırıma yönlendirseydik kaç yılda ne kadar birikirdi? Bileşik faiz proyeksiyonu.',
};

export default function KiraKarsiligiBirikimPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-14">
          <p className="text-[#00C49F] text-xs font-bold mb-3 uppercase tracking-widest">Kira Analizi</p>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">Kira Karşılığı Birikim Hesaplayıcı</h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed">
            Kira ödemeleriniz yerine aynı tutarı yatırıma yönlendirseydik, yıllık bileşik faizle ne kadar birikirdi?
          </p>
        </div>
      </section>
      <KiraKarsiligiBirikimClient />
    </main>
  );
}
