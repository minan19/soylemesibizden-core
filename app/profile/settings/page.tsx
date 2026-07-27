import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, User, Save } from 'lucide-react';
import ProfileSettingsForm from './ProfileSettingsForm';

export const dynamic = 'force-dynamic';

export default async function ProfileSettingsPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) redirect('/login');

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true, name: true, email: true, phone: true, role: true, createdAt: true },
  });

  if (!user) redirect('/login');

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <div className="max-w-2xl mx-auto px-6 py-10 space-y-8">

        <div>
          <Link href="/profile" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-gray-700 transition-colors mb-3">
            <ArrowLeft size={14} /> Profilime Dön
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#F0FDF8] flex items-center justify-center text-[#00C49F]">
              <User size={18} />
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-gray-900 tracking-tight">Profil Ayarları</h1>
              <p className="text-xs text-gray-400">Hesap bilgilerinizi güncelleyin</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-1">
          <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-4">Hesap Bilgileri</p>
          <div className="flex items-center justify-between py-2 border-b border-gray-50">
            <span className="text-xs text-gray-400 font-semibold">Email</span>
            <span className="text-sm font-medium text-gray-700">{user.email}</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-gray-50">
            <span className="text-xs text-gray-400 font-semibold">Rol</span>
            <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
              user.role === 'ADMIN' ? 'bg-green-100 text-green-700' :
              user.role === 'CONCIERGE' ? 'bg-blue-100 text-blue-700' :
              'bg-gray-100 text-gray-600'
            }`}>{user.role}</span>
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-xs text-gray-400 font-semibold">Üyelik Tarihi</span>
            <span className="text-sm font-medium text-gray-700">{new Date(user.createdAt).toLocaleDateString('tr-TR')}</span>
          </div>
        </div>

        <ProfileSettingsForm initialName={user.name ?? ''} initialPhone={user.phone ?? ''} />
      </div>
    </main>
  );
}
