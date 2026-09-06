import { Metadata } from 'next';
import KonutAnaliziClient from './KonutAnaliziClient';

export const metadata: Metadata = {
  title: 'Konut Yatırım Analizi | Kira Getirisi, Başabaş Noktası, ROI | Söylemesi Bizden',
  description:
    'Konut yatırım analizi: kira getiri oranı, başabaş noktası, 10 yıllık projeksiyon ve bölge kira karşılaştırması.',
};

export default function KonutAnaliziPage() {
  return <KonutAnaliziClient />;
}
