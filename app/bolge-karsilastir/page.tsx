import { Metadata } from 'next';
import BolgeKarsilastirClient from './BolgeKarsilastirClient';

export const metadata: Metadata = {
  title: 'Bölge Karşılaştırma Aracı | 3 Şehri Yan Yana | Söylemesi Bizden',
  description:
    'Türkiye\'nin büyük şehirlerini gayrimenkul fiyatı, kira getirisi, yaşam maliyeti ve yatırım puanı açısından yan yana karşılaştırın.',
};

export default function BolgeKarsilastirPage() {
  return <BolgeKarsilastirClient />;
}
