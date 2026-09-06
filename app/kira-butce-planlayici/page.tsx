import { Metadata } from 'next';
import KiraButceClient from './KiraButceClient';

export const metadata: Metadata = {
  title: 'Kira Bütçe Planlayıcı | Kira/Gelir Oranı ve Gider Analizi | Söylemesi Bizden',
  description:
    'Kira, fatura ve yaşam giderlerinizi aylık net gelirinizle karşılaştırın; kira/gelir oranınızı ve tasarruf potansiyelinizi anlık görün.',
};

export default function KiraButcePlanlayiciPage() {
  return <KiraButceClient />;
}
