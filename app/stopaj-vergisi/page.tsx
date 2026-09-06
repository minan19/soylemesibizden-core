import { Metadata } from 'next';
import StopajVergisiClient from './StopajVergisiClient';

export const metadata: Metadata = {
  title: 'Kira Stopaj Vergisi Hesaplayıcı | Kurumsal Kiracı Kesintisi | Söylemesi Bizden',
  description:
    'Kurumsal kiracıların konut ve işyeri kira ödemelerinde uyguladığı stopaj (gelir vergisi kesintisi) hesaplayıcı. Net kira ve brüt kira dönüşümü.',
};

export default function StopajVergisiPage() {
  return <StopajVergisiClient />;
}
