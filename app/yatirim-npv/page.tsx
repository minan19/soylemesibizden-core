import { Metadata } from 'next';
import YatirimNpvClient from './YatirimNpvClient';

export const metadata: Metadata = {
  title: 'Gayrimenkul NBD (NPV) Hesaplayıcı | Net Bugünkü Değer | Söylemesi Bizden',
  description:
    'Gayrimenkul yatırımı için net bugünkü değer (NBD/NPV) ve iç verim oranı (IRR) hesaplayıcı. Kira geliri, değer artışı ve çıkış değeriyle 10 yıl projeksiyon.',
};

export default function YatirimNpvPage() {
  return <YatirimNpvClient />;
}
