import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';
import SessionProvider from '@/providers/SessionProvider';
import { SovereignProvider } from '@/providers/SovereignProvider';
import PropertyCopilot from '@/components/PropertyCopilot';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-montserrat',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'SöylemesiBizden — Kurumsal Gayrimenkul Platformu',
  description: 'Elit gayrimenkul & varlık yönetim platformu',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Danisman balonu YALNIZCA servis gercekten calisiyorsa gosterilir.
  // ANTHROPIC_API_KEY yoksa /api/intelligence/copilot 503 doner; her
  // sayfada calismayan bir asistan dugmesi asili tutmak, kaldirdigimiz
  // sahte yuzeyin aynisi olur.
  const danismanAktif = Boolean(process.env.ANTHROPIC_API_KEY);

  return (
    <html lang="tr" className={montserrat.variable}>
      <body className="antialiased font-sans">
        <SessionProvider>
          <SovereignProvider>
            {children}
            {danismanAktif && <PropertyCopilot />}
          </SovereignProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
