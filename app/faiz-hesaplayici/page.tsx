import { Metadata } from 'next';
import FaizHesaplayiciClient from './FaizHesaplayiciClient';

export const metadata: Metadata = {
  title: 'Faiz Hesaplayıcı | Basit ve Bileşik Faiz, Mevduat, Kredi | Söylemesi Bizden',
  description:
    'Basit ve bileşik faiz karşılaştırması, mevduat büyüme projeksiyonu ve kredi aylık taksit hesaplayıcı.',
};

export default function FaizHesaplayiciPage() {
  return <FaizHesaplayiciClient />;
}
