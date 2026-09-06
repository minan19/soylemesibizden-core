import { Metadata } from 'next';
import FaizKarsilastiricClient from './FaizKarsilastiricClient';

export const metadata: Metadata = {
  title: 'Konut Kredisi Faiz Oranı Karşılaştırıcı | 3 Banka Yan Yana | Söylemesi Bizden',
  description:
    '3 farklı aylık faiz oranını karşılaştırın: taksit farkı, toplam ödeme ve faiz yükü. Hangi banka daha avantajlı?',
};

export default function FaizOraniKarsilastiricPage() {
  return <FaizKarsilastiricClient />;
}
