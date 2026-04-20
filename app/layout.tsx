import './globals.css';
import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import { SovereignProvider } from '../providers/SovereignProvider';
import AuthSessionProvider from '../providers/SessionProvider';

const montserrat = Montserrat({ 
  subsets: ['latin'], 
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'SÖYLEMESİ BİZDEN | Sovereign Intelligence',
  description: 'The Global Energy, Carbon & Asset Intelligence Platform. Yönetim Merkezi.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className={montserrat.className}>
        {/* Tüm Ekosistem Veri Çekirdeği Tarafından Sarmalandı */}
        <AuthSessionProvider>
          <SovereignProvider>
            {children}
          </SovereignProvider>
        </AuthSessionProvider>
      </body>
    </html>
  );
}
