import { Metadata } from 'next';
import TadilatClient from './TadilatClient';

export const metadata: Metadata = {
  title: 'Tadilat Maliyet Hesaplayıcı 2024 | Boya, Zemin, Banyo, Mutfak | Söylemesi Bizden',
  description:
    'Ev tadilat maliyeti hesaplayıcı: boya, zemin kaplama, banyo renovasyonu, mutfak yenileme, elektrik ve tesisat işlemleri için tahmini maliyet.',
};

export default function TadilatMaliyetHesaplayiciPage() {
  return <TadilatClient />;
}
