import { Metadata } from 'next';
import M2FiyatClient from './M2FiyatClient';

export const metadata: Metadata = {
  title: 'Metrekare Fiyat Karşılaştırıcı | Şehir ve Semt Bazlı ₺/m² | Söylemesi Bizden',
  description:
    'Şehir ve semt bazlı metrekare fiyatlarını karşılaştırın. İstanbul, Ankara, İzmir ve diğer büyük şehirlerde ortalama ₺/m² verileri.',
};

export default function M2FiyatKarsilastirPage() {
  return <M2FiyatClient />;
}
