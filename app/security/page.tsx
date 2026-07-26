import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import { Shield, Lock, Key, CheckCircle, AlertTriangle, ArrowLeft, User, Clock } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function SecurityPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect('/login');

  const user = session.user as { name?: string | null; email?: string | null; role?: string };

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <div className="max-w-4xl mx-auto px-8 py-10 space-y-8">

        <div>
          <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-gray-700 transition-colors mb-3">
            <ArrowLeft size={14} /> Dashboard
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#F0FDF8] flex items-center justify-center text-[#00C49F]">
              <Shield size={18} />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Güvenlik Merkezi</h1>
              <p className="text-xs text-gray-400 mt-0.5">Hesap güvenliği ve gizlilik ayarları</p>
            </div>
          </div>
        </div>

        {/* Güvenlik Durumu */}
        <div className="bg-[#F0FDF8] rounded-2xl border border-[#00C49F]/20 p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#00C49F] flex items-center justify-center text-white">
            <CheckCircle size={22} />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-900">Hesabınız Güvende</p>
            <p className="text-xs text-gray-500 mt-0.5">Temel güvenlik ayarları aktif · Son giriş: bugün</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Hesap Bilgileri */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
            <h2 className="text-[10px] font-bold tracking-widest text-[#00C49F] uppercase flex items-center gap-2">
              <User size={12} /> Hesap Bilgileri
            </h2>
            {[
              { label: 'Ad Soyad', value: user.name ?? '—' },
              { label: 'E-posta', value: user.email ?? '—' },
              { label: 'Rol', value: user.role ?? 'USER' },
            ].map(row => (
              <div key={row.label} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                <span className="text-xs font-semibold text-gray-400">{row.label}</span>
                <span className="text-sm font-semibold text-gray-700">{row.value}</span>
              </div>
            ))}
            <Link
              href="/profile"
              className="block text-center py-2.5 border border-gray-200 rounded-xl text-xs font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
            >
              Profili Düzenle
            </Link>
          </div>

          {/* Şifre */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
            <h2 className="text-[10px] font-bold tracking-widest text-[#00C49F] uppercase flex items-center gap-2">
              <Key size={12} /> Şifre & Giriş
            </h2>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
              <CheckCircle size={16} className="text-[#00C49F] shrink-0" />
              <div>
                <p className="text-xs font-semibold text-gray-700">Şifre ayarlandı</p>
                <p className="text-[10px] text-gray-400">bcrypt ile şifrelenmiş</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-xl">
              <AlertTriangle size={16} className="text-amber-500 shrink-0" />
              <div>
                <p className="text-xs font-semibold text-gray-700">İki Faktörlü Doğrulama</p>
                <p className="text-[10px] text-gray-400">Yakında aktif edilecek</p>
              </div>
            </div>
          </div>

          {/* Oturum */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
            <h2 className="text-[10px] font-bold tracking-widest text-[#00C49F] uppercase flex items-center gap-2">
              <Clock size={12} /> Aktif Oturum
            </h2>
            <div className="flex items-center gap-3 p-3 bg-[#F0FDF8] rounded-xl border border-[#00C49F]/20">
              <div className="w-2 h-2 rounded-full bg-[#00C49F] animate-pulse" />
              <div>
                <p className="text-xs font-semibold text-gray-700">Mevcut oturum · Web Tarayıcı</p>
                <p className="text-[10px] text-gray-400">JWT Token · Güvenli bağlantı</p>
              </div>
            </div>
          </div>

          {/* Gizlilik */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
            <h2 className="text-[10px] font-bold tracking-widest text-[#00C49F] uppercase flex items-center gap-2">
              <Lock size={12} /> Gizlilik
            </h2>
            {[
              { label: 'Veri Şifreleme', active: true },
              { label: 'HTTPS Zorunlu', active: true },
              { label: 'Üçüncü Taraf Paylaşımı', active: false, note: 'Kapalı' },
            ].map(item => (
              <div key={item.label} className="flex justify-between items-center">
                <span className="text-xs font-semibold text-gray-600">{item.label}</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  item.active !== false
                    ? 'bg-[#F0FDF8] text-[#00C49F]'
                    : 'bg-gray-100 text-gray-500'
                }`}>
                  {item.note ?? (item.active ? 'AKTİF' : 'PASİF')}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
