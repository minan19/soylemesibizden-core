import { Metadata } from 'next';
import MortgageSimulatorClient from './MortgageSimulatorClient';

export const metadata: Metadata = {
  title: 'Gelişmiş Mortgage Simülatörü | Erken Ödeme & Refinansman | Söylemesi Bizden',
  description:
    'Mortgage simülatörü: erken ödeme tasarrufu, refinansman analizi, esnek taksit planı, toplam faiz yükü hesaplama. Farklı senaryoları karşılaştırın.',
};

export default function MortgageSimulatorPage() {
  return <MortgageSimulatorClient />;
}
