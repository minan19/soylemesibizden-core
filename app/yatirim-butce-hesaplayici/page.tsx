import { Metadata } from 'next';
import YatirimButceClient from './YatirimButceClient';

export const metadata: Metadata = {
  title: 'Gayrimenkul Yatırım Bütçe Hesaplayıcı | Tüm Maliyetler | Söylemesi Bizden',
  description:
    'Peşinat, kredi taksiti, tapu masrafı, tadilat ve kurulum dahil gayrimenkul alımının toplam maliyetini hesaplayın.',
};

export default function YatirimButceHesaplayiciPage() {
  return <YatirimButceClient />;
}
