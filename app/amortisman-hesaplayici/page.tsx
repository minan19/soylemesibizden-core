import { Metadata } from 'next';
import AmortismanClient from './AmortismanClient';

export const metadata: Metadata = {
  title: 'Gayrimenkul Amortisman Hesaplayıcı | Kaç Yılda Kendini Karşılar? | Söylemesi Bizden',
  description:
    'Kiralık gayrimenkul yatırımınız kaç yılda kendini amorti eder? Net kira getirisi, mülk değer artışı ve 20 yıllık varlık projeksiyonu.',
};

export default function AmortismanHesaplayiciPage() {
  return <AmortismanClient />;
}
