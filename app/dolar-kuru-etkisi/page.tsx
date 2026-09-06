import { Metadata } from 'next';
import DolarKuruClient from './DolarKuruClient';

export const metadata: Metadata = {
  title: 'Döviz Kuru ve Gayrimenkul Değeri | USD/EUR Bazlı Analiz | Söylemesi Bizden',
  description:
    'Gayrimenkulünüzün dolar ve euro bazındaki değeri, kur değişiminin TL fiyatına etkisi ve senaryo analizi.',
};

export default function DolarKuruEtkisiPage() {
  return <DolarKuruClient />;
}
