import { Metadata } from 'next';
import KonutDegerClient from './KonutDegerClient';

export const metadata: Metadata = {
  title: 'Konut Değer Tahmini | Şehir, Semt, Alan Bazlı Hesaplama | Söylemesi Bizden',
  description:
    'Konutunuzun tahmini piyasa değerini hesaplayın: şehir, semt tipi, bina yaşı, alan ve özellikler bazlı ₺/m² fiyat tahmini.',
};

export default function KonutDegerTahminiPage() {
  return <KonutDegerClient />;
}
