import { Metadata } from 'next';
import BolgeGetiriClient from './BolgeGetiriClient';

export const metadata: Metadata = {
  title: 'Bölge Kira Getiri Karşılaştırıcı | 12 Bölge Net Getiri Analizi | Söylemesi Bizden',
  description:
    '12 popüler bölgenin net kira getirisi, fiyat artış oranı ve toplam yatırım verimini karşılaştırın. Alan ve gider oranını girerek kişiselleştirin.',
};

export default function BolgeGetiriKarsilastirPage() {
  return <BolgeGetiriClient />;
}
