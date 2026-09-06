import { Metadata } from 'next';
import SatinalmaMaliyetiClient from './SatinalmaMaliyetiClient';

export const metadata: Metadata = {
  title: 'Satın Alma Maliyeti Hesaplayıcı | Tapu, Komisyon, Toplam Gider | Söylemesi Bizden',
  description:
    'Gayrimenkul alım toplam maliyeti: tapu harcı, noter, emlakçı komisyonu, DASK, ekspertiz ve kredi masraflarını hesaplayın.',
};

export default function SatinalmaMaliyetiPage() {
  return <SatinalmaMaliyetiClient />;
}
