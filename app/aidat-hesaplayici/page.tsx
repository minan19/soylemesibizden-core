import { Metadata } from 'next';
import AidatClient from './AidatClient';

export const metadata: Metadata = {
  title: 'Aidat Hesaplayıcı | Bina Gider Paylaşımı | Söylemesi Bizden',
  description:
    'Apartman veya site aidatınızı hesaplayın. Ortak giderler, asansör bakımı, güvenlik, temizlik ve bağımsız bölüm payına göre aylık aidat tahmini.',
};

export default function AidatHesaplayiciPage() {
  return <AidatClient />;
}
