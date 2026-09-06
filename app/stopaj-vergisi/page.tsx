import { Metadata } from 'next';
import StopajClient from './StopajClient';

export const metadata: Metadata = {
  title: 'Kira Stopaj Vergisi Hesaplayıcı | %20 Stopaj, Net/Brüt | Söylemesi Bizden',
  description:
    'Kurumsal kiracı stopaj kesintisi, net ve brüt kira farkı, yıllık gelir vergisi mahsubu ve iade hesabı.',
};

export default function StopajVergisiPage() {
  return <StopajClient />;
}
