import { Metadata } from 'next';
import AidatHesaplayiciClient from './AidatHesaplayiciClient';

export const metadata: Metadata = {
  title: 'Aidat Hesaplayıcı | Bina/Site Aylık Aidat Maliyeti | Söylemesi Bizden',
  description:
    'Bina veya site aidat tutarını hesaplayın: kapıcı, asansör, temizlik, güvenlik ve diğer ortak giderleri daire sayısına bölerek aylık aidat bulun.',
};

export default function AidatHesaplayiciPage() {
  return <AidatHesaplayiciClient />;
}
