import { Metadata } from 'next';
import ArsaFiyatClient from './ArsaFiyatClient';

export const metadata: Metadata = {
  title: 'Arsa Fiyat Hesaplayıcı | İmar Durumu, Kat Adedi, Emsal | Söylemesi Bizden',
  description:
    'Arsa değerini imar durumu, TAKS/KAKS ve kat adedi parametrelerine göre tahmin edin. İnşaat maliyeti ve kârlılık analizi.',
};

export default function ArsaFiyatHesaplamaPage() {
  return <ArsaFiyatClient />;
}
