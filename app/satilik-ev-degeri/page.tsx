import { Metadata } from 'next';
import SatilikEvDegeriClient from './SatilikEvDegeriClient';

export const metadata: Metadata = {
  title: 'Evimin Değeri Ne Kadar? | Gayrimenkul Değerleme | Söylemesi Bizden',
  description:
    'Satılık evinizin piyasa değerini belirlemek için yöntemler: karşılaştırmalı piyasa analizi, ₺/m² hesabı, değer etkileyen faktörler ve fiyat doğrulama rehberi.',
};

export default function SatilikEvDegeriPage() {
  return <SatilikEvDegeriClient />;
}
