import { Metadata } from 'next';
import DegerArtisClient from './DegerArtisClient';

export const metadata: Metadata = {
  title: 'Değer Artış Kazancı Vergisi Hesaplayıcı | 5 Yıl Kuralı | Söylemesi Bizden',
  description:
    'Gayrimenkul satışında değer artış kazancı vergisi hesaplayıcı. TÜFE endekslemesi, 2024 istisna tutarı, 5 yıl muafiyet kuralı.',
};

export default function DegerArtisVergisiPage() {
  return <DegerArtisClient />;
}
