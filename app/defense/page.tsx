import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { ArrowLeft, ShieldCheck, Lock, AlertTriangle, CheckCircle, Wifi, Database, Key } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function DefensePage() {
  const session = await getServerSession(authOptions);

  const checks = [
    { label: 'HTTPS / TLS 1.3', status: 'Aktif', ok: true, icon: <Lock size={15} /> },
    { label: 'JWT Token Doğrulama', status: 'Aktif', ok: true, icon: <Key size={15} /> },
    { label: 'Veritabanı Şifreleme', status: 'Aktif', ok: true, icon: <Database size={15} /> },
    { label: 'RBAC Erişim Kontrolü', status: 'Aktif', ok: true, icon: <ShieldCheck size={15} /> },
    { label: 'Rate Limiting', status: 'Yakında', ok: false, icon: <Wifi size={15} /> },
    { label: 'İki Faktörlü Doğrulama', status: 'Yakında', ok: false, icon: <Lock size={15} /> },
    { label: 'DDoS Koruması', status: 'Vercel Edge', ok: true, icon: <ShieldCheck size={15} /> },
    { label: 'SQL Injection Koruması', status: 'Prisma ORM', ok: true, icon: <Database size={15} /> },
    { label: 'XSS Koruması', status: 'Next.js CSP', ok: true, icon: <AlertTriangle size={15} /> },
  ];

  const activeCount = checks.filter(c => c.ok).length;
  const pendingCount = checks.filter(c => !c.ok).length;

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <div className="max-w-4xl mx-auto px-8 py-10 space-y-8">

        <div>
          <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-gray-700 transition-colors mb-3">
            <ArrowLeft size={14} /> Dashboard
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#F0FDF8] flex items-center justify-center text-[#00C49F]">
              <ShieldCheck size={18} />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Savunma & Güvenlik</h1>
              <p className="text-xs text-gray-400 mt-0.5">Platform güvenlik katmanları ve tehdit kontrolü</p>
            </div>
          </div>
        </div>

        {/* Status Banner */}
        <div className={`rounded-2xl border p-6 flex items-center gap-4 ${activeCount >= 7 ? 'bg-[#F0FDF8] border-[#00C49F]/20' : 'bg-amber-50 border-amber-200'}`}>
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white shrink-0 ${activeCount >= 7 ? 'bg-[#00C49F]' : 'bg-amber-500'}`}>
            <ShieldCheck size={22} />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-900">
              {activeCount}/{checks.length} güvenlik katmanı aktif
            </p>
            <p className="text-xs text-gray-500 mt-0.5">
              {pendingCount} kontrol yakında devreye girecek · Mevcut koruma yeterli
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'AKTİF KORUMA', value: activeCount, color: 'text-[#00C49F]' },
            { label: 'YAKINDA', value: pendingCount, color: 'text-amber-500' },
            { label: 'OTURUM', value: session ? '1' : '0', color: 'text-gray-900' },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-2xl border border-gray-100 p-5">
              <p className={`text-3xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-[9px] font-bold tracking-widest text-gray-400 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Security checks */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="text-[10px] font-bold tracking-widest text-[#00C49F] uppercase mb-5">Güvenlik Kontrolleri</h2>
          <div className="space-y-3">
            {checks.map(check => (
              <div key={check.label} className="flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0">
                <div className="flex items-center gap-3">
                  <div className={`${check.ok ? 'text-[#00C49F]' : 'text-amber-400'}`}>{check.icon}</div>
                  <span className="text-sm font-medium text-gray-700">{check.label}</span>
                </div>
                <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-full ${
                  check.ok ? 'bg-[#F0FDF8] text-[#00C49F]' : 'bg-amber-50 text-amber-600'
                }`}>
                  {check.ok ? <CheckCircle size={10} /> : <AlertTriangle size={10} />}
                  {check.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Session info if logged in */}
        {session && (
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h2 className="text-[10px] font-bold tracking-widest text-[#00C49F] uppercase mb-4">Aktif Oturum</h2>
            <div className="flex items-center gap-3 p-3 bg-[#F0FDF8] rounded-xl border border-[#00C49F]/20">
              <div className="w-2 h-2 rounded-full bg-[#00C49F] animate-pulse" />
              <div>
                <p className="text-xs font-semibold text-gray-700">{session.user?.email} · JWT Token</p>
                <p className="text-[10px] text-gray-400">Güvenli bağlantı · Şifreli iletişim</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
