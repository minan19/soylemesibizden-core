import { Metadata } from 'next';
import PesinatHesaplayiciClient from './PesinatHesaplayiciClient';

export const metadata: Metadata = {
  title: 'Peşinat Hesaplayıcı | Ev Peşinatına Ne Zaman Ulaşırsınız? | Söylemesi Bizden',
  description:
    'Konut peşinatı hesaplayıcı: ev fiyatı, peşinat oranı, mevcut birikim ve aylık katkı ile hedefe ulaşma sürenizi öğrenin.',
};

export default function PesinatHesaplayiciPage() {
  return <PesinatHesaplayiciClient />;
}
