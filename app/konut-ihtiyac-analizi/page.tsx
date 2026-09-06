import { Metadata } from 'next';
import KonutIhtiyacClient from './KonutIhtiyacClient';

export const metadata: Metadata = {
  title: 'Konut İhtiyaç Analizi | Kira mı Satın mı, Bütçe, Oda Hesabı | Söylemesi Bizden',
  description:
    'Kişisel konut ihtiyacınızı analiz edin: kaç oda yeterli, bütçenize göre hangi ilçe, kira mı satın alma mı daha avantajlı?',
};

export default function KonutIhtiyacAnaliziPage() {
  return <KonutIhtiyacClient />;
}
