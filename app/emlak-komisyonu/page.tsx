import { Metadata } from 'next';
import EmlakKomisyonuClient from './EmlakKomisyonuClient';

export const metadata: Metadata = {
  title: 'Emlak Komisyonu Hesaplayıcı | Komisyon Nedir, Kim Öder? | Söylemesi Bizden',
  description:
    'Emlak komisyonu nedir, kim öder, nasıl hesaplanır? Satıcı ve alıcı komisyon oranları, KDV dahil gerçek maliyet ve pazarlık ipuçları.',
};

export default function EmlakKomisyonuPage() {
  return <EmlakKomisyonuClient />;
}
