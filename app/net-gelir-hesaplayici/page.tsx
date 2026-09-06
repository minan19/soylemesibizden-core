import { Metadata } from 'next';
import NetGelirClient from './NetGelirClient';

export const metadata: Metadata = {
  title: 'Kira Net Gelir Hesaplayıcı | Vergi, Aidat, Giderler | Söylemesi Bizden',
  description:
    'Brüt kira gelirinizden aidat, sigorta, bakım ve gelir vergisi düşüldükten sonra gerçek net kira kazancınızı hesaplayın.',
};

export default function NetGelirHesaplayiciPage() {
  return <NetGelirClient />;
}
