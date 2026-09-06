import { Metadata } from 'next';
import KiraDegerArtisiClient from './KiraDegerArtisiClient';

export const metadata: Metadata = {
  title: 'Kira Değer Artışı Simülatörü | Nominal vs Reel Kira Projeksiyonu | Söylemesi Bizden',
  description:
    'Kiranızın nominal ve reel değerinin yıllar içinde nasıl değişeceğini, enflasyona karşı satın alma gücünü hesaplayın.',
};

export default function KiraDegerArtisiPage() {
  return <KiraDegerArtisiClient />;
}
