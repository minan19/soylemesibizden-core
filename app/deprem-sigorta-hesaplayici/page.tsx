import { Metadata } from 'next';
import DepremSigortaClient from './DepremSigortaClient';

export const metadata: Metadata = {
  title: 'Deprem Sigorta Prim Hesaplayıcı | DASK + Konut Sigortası 2024 | Söylemesi Bizden',
  description:
    'DASK zorunlu deprem sigortası ve konut sigortası prim tahmini: bölge risk katsayısı, yapı türü ve yeniden inşa değeri bazında hesaplama.',
};

export default function DepremSigortaHesaplayiciPage() {
  return <DepremSigortaClient />;
}
