import { Metadata } from 'next';
import KiraGetiriClient from './KiraGetiriClient';

export const metadata: Metadata = {
  title: 'Kira Getiri Hesaplayıcı | Brüt & Net Getiri | Söylemesi Bizden',
  description:
    'Gayrimenkul yatırımınızın brüt kira getirisi, net getiri ve geri ödeme süresini hesaplayın. Yıllık giderler, boşluk oranı ve değer artışı dahil kapsamlı getiri analizi.',
};

export default function KiraGetiriPage() {
  return <KiraGetiriClient />;
}
