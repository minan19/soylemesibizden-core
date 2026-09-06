import { Metadata } from 'next';
import KiraKarsiligiBirikimClient from './KiraKarsiligiBirikimClient';

export const metadata: Metadata = {
  title: 'Kira Karşılığı Birikim Simülatörü | Kira vs Yatırım Karşılaştırması | Söylemesi Bizden',
  description:
    'Kira ödemek yerine o parayı yatırımlı birikim hesabına aktarsaydınız ne olurdu? Ev değer artışı ile uzun vadeli karşılaştırma.',
};

export default function KiraKarsiligiBirikimPage() {
  return <KiraKarsiligiBirikimClient />;
}
