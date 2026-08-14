import { Metadata } from 'next';
import TrackedPricesClient from './TrackedPricesClient';

export const metadata: Metadata = {
  title: 'Takip Ettiğim Fiyatlar | Söylemesi Bizden',
  description: 'İlan fiyat değişimlerini takip edin.',
};

export default function TrackedPricesPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <div className="max-w-4xl mx-auto px-6 py-10">
        <TrackedPricesClient />
      </div>
    </main>
  );
}
