import { Metadata } from 'next';
import ServetBirikimClient from './ServetBirikimClient';

export const metadata: Metadata = {
  title: 'Servet Birikimi Hesaplayıcı | Tasarruf ve Yatırım Getirisi | Söylemesi Bizden',
  description:
    'Düzenli tasarruf ve yatırım getirisi ile kaç yılda ne kadar servet biriktirebilirsiniz? Nominal ve reel değer karşılaştırması, yıllık projeksiyon tablosu.',
};

export default function ServetBirikimHesaplayiciPage() {
  return <ServetBirikimClient />;
}
