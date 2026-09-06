import { Metadata } from 'next';
import ButcePlanlayiciClient from './ButcePlanlayiciClient';

export const metadata: Metadata = {
  title: 'Bütçe Planlayıcı | Ne Kadar Ev Alabilirim? | Söylemesi Bizden',
  description:
    'Gelirinize, birikimlerinize ve kredi puanınıza göre ne kadar ev alabileceğinizi hesaplayın. Konut bütçesi, peşinat ve aylık taksit dengesi için kapsamlı planlayıcı.',
};

export default function ButcePlanlayiciPage() {
  return <ButcePlanlayiciClient />;
}
