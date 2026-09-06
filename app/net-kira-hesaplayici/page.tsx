import { Metadata } from 'next';
import NetKiraClient from './NetKiraClient';

export const metadata: Metadata = {
  title: 'Net Kira Geliri Hesaplayıcı | Gider Düşümü, Getiri Oranı | Söylemesi Bizden',
  description:
    'Kira gelirinden aidat, vergi, bakım ve sigorta giderlerini düşerek gerçek net getirinizi ve amortisman sürenizi hesaplayın.',
};

export default function NetKiraHesaplayiciPage() {
  return <NetKiraClient />;
}
