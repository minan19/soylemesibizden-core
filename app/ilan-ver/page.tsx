import { getServerSession } from 'next-auth/next';
import Link from 'next/link';
import { authOptions } from '@/lib/auth';
import { IlanVerFormu } from './IlanVerFormu';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'İlan Ver — Söylemesi Bizden' };

export default async function IlanVerPage() {
  const session = await getServerSession(authOptions);

  return (
    <main className="mx-auto w-full max-w-2xl px-4 py-6 sm:px-6 sm:py-10">
      <header className="mb-5">
        <h1 className="text-xl font-extrabold tracking-tight text-metin sm:text-2xl">
          İlan ver
        </h1>
        <p className="mt-1 max-w-prose text-sm text-metinIkincil">
          Taşınmaz Ticareti Hakkında Yönetmelik gereği ilan yalnızca malik,
          eşi, birinci/ikinci derece kan hısımları veya malikin e-Devlet
          üzerinden yetkilendirdiği yetki belgeli emlak işletmesi tarafından
          verilebilir. Doğrulama, ilan yazıldıktan sonra değil{' '}
          <strong>önce</strong> yapılır.
        </p>
      </header>

      {session?.user ? (
        <IlanVerFormu />
      ) : (
        <div className="kart p-5">
          <p className="font-semibold text-metin">Oturum gerekli</p>
          <p className="mt-1 text-sm text-metinIkincil">
            İlan verebilmek için giriş yapmanız gerekir.
          </p>
          <Link
            href="/login"
            className="dokunulabilir mt-3 inline-flex items-center rounded-rozet bg-marka px-4 py-2.5 text-sm font-bold text-white"
          >
            Giriş yap
          </Link>
        </div>
      )}
    </main>
  );
}
