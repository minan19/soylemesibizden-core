import { Metadata } from 'next';
import InsaatMaliyetiClient from './InsaatMaliyetiClient';

export const metadata: Metadata = {
  title: 'İnşaat Maliyet Hesaplayıcı | m² Başına Yapı Maliyeti | Söylemesi Bizden',
  description:
    'Konut, villa veya ticari yapı inşaatı maliyet tahmini. m² birim fiyat, kaba inşaat, ince işçilik, mekanik-elektrik, arazi hariç yapım maliyeti.',
};

export default function InsaatMaliyetiPage() {
  return <InsaatMaliyetiClient />;
}
