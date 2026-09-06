import { Metadata } from 'next';
import KiraSimulatorClient from './KiraSimulatorClient';

export const metadata: Metadata = {
  title: 'Kira Simülatörü | 20 Yıl Kira Maliyet ve Birikim Analizi | Söylemesi Bizden',
  description:
    '20 yıllık kira simülatörü: toplam kira gideri, kira yerine birikiminizin büyümesi ve fırsat maliyeti analizi.',
};

export default function KiraSimulatoruPage() {
  return <KiraSimulatorClient />;
}
