import { Metadata } from 'next';
import KonutKredisiSimulatorClient from './KonutKredisiSimulatorClient';

export const metadata: Metadata = {
  title: 'Konut Kredisi Simülatörü | Taksit, Toplam Ödeme, Faiz Yükü | Söylemesi Bizden',
  description:
    'Konut kredisi taksit hesaplayıcı: aylık taksit, toplam ödeme, faiz yükü ve ödeme planı. Farklı vade ve faiz kombinasyonlarını karşılaştırın.',
};

export default function KonutKredisiSimulatorPage() {
  return <KonutKredisiSimulatorClient />;
}
