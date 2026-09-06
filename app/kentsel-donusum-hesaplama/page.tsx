import { Metadata } from 'next';
import KentselDonusumClient from './KentselDonusumClient';

export const metadata: Metadata = {
  title: 'Kentsel Dönüşüm Hesaplayıcı | Kira Yardımı, Hak Hesabı | Söylemesi Bizden',
  description:
    'Kentsel dönüşüm kapsamındaki evinizin kira yardımı, taşınma desteği ve yeni konut hakkını hesaplayın.',
};

export default function KentselDonusumHesaplamaPage() {
  return <KentselDonusumClient />;
}
