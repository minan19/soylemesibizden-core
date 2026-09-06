import { Metadata } from 'next';
import YatirimGetiriClient from './YatirimGetiriClient';

export const metadata: Metadata = {
  title: 'Yatırım Getiri Simülatörü | Kira + Değer Artışı + Satış ROI | Söylemesi Bizden',
  description:
    'Gayrimenkul yatırımında kira geliri, değer artışı ve satış senaryolarını birleştirerek toplam ROI ve yıllık CAGR hesaplayın.',
};

export default function YatirimGetiriSimulatoruPage() {
  return <YatirimGetiriClient />;
}
