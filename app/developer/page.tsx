import Link from 'next/link';
import { ArrowLeft, Code, Zap, ShieldCheck, Book, Terminal, CheckCircle } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default function DeveloperPage() {
  const endpoints = [
    { method: 'GET', path: '/api/listings', desc: 'Aktif ilanları listele (filtre desteği)', auth: false },
    { method: 'POST', path: '/api/listings', desc: 'Yeni ilan oluştur', auth: true },
    { method: 'GET', path: '/api/listings/[id]', desc: 'İlan detayı', auth: false },
    { method: 'PUT', path: '/api/listings/[id]', desc: 'İlanı güncelle', auth: true },
    { method: 'DELETE', path: '/api/listings/[id]', desc: 'İlanı sil (Admin)', auth: true },
    { method: 'GET', path: '/api/offers', desc: 'Teklifleri listele', auth: true },
    { method: 'POST', path: '/api/offers', desc: 'Yeni teklif ver', auth: true },
    { method: 'PUT', path: '/api/offers/[id]', desc: 'Teklifi kabul/reddet', auth: true },
    { method: 'POST', path: '/api/favorites', desc: 'Favori ekle/kaldır', auth: true },
    { method: 'POST', path: '/api/inquiries', desc: 'Başvuru formu gönder', auth: false },
    { method: 'POST', path: '/api/auth/register', desc: 'Yeni kullanıcı kaydı', auth: false },
  ];

  const methodColor: Record<string, string> = {
    GET: 'bg-blue-50 text-blue-600',
    POST: 'bg-[#F0FDF8] text-[#00C49F]',
    PUT: 'bg-amber-50 text-amber-600',
    DELETE: 'bg-red-50 text-red-600',
  };

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <div className="max-w-5xl mx-auto px-8 py-10 space-y-8">

        <div>
          <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-gray-700 transition-colors mb-3">
            <ArrowLeft size={14} /> Dashboard
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gray-900 flex items-center justify-center text-white">
              <Code size={18} />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Developer Portal</h1>
              <p className="text-xs text-gray-400 mt-0.5">REST API dokümantasyonu ve entegrasyon kılavuzu</p>
            </div>
          </div>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'ENDPOİNT', value: endpoints.length, icon: <Terminal size={16} />, color: 'text-gray-900' },
            { label: 'AUTH GEREKTİREN', value: endpoints.filter(e => e.auth).length, icon: <ShieldCheck size={16} />, color: 'text-[#00C49F]' },
            { label: 'PUBLIC', value: endpoints.filter(e => !e.auth).length, icon: <Zap size={16} />, color: 'text-blue-500' },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-2xl border border-gray-100 p-5">
              <div className={`${s.color} mb-2`}>{s.icon}</div>
              <p className={`text-3xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-[9px] font-bold tracking-widest text-gray-400 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Base URL */}
        <div className="bg-gray-900 rounded-2xl p-5 text-white font-mono text-sm">
          <p className="text-gray-500 text-xs mb-2">// Base URL</p>
          <p className="text-[#00C49F]">https://soylemesibizden-core.vercel.app/api</p>
          <p className="text-gray-500 text-xs mt-3 mb-1">// Auth Header</p>
          <p className="text-amber-400">Authorization: Bearer &lt;JWT_TOKEN&gt;</p>
        </div>

        {/* Endpoint table */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-50 flex items-center gap-2">
            <Book size={14} className="text-[#00C49F]" />
            <h2 className="text-[10px] font-bold tracking-widest text-[#00C49F] uppercase">API Endpoint Kataloğu</h2>
          </div>
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-[9px] font-bold text-gray-400 uppercase tracking-widest w-16">Method</th>
                <th className="px-6 py-3 text-left text-[9px] font-bold text-gray-400 uppercase tracking-widest">Path</th>
                <th className="px-6 py-3 text-left text-[9px] font-bold text-gray-400 uppercase tracking-widest">Açıklama</th>
                <th className="px-6 py-3 text-center text-[9px] font-bold text-gray-400 uppercase tracking-widest">Auth</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {endpoints.map((ep, idx) => (
                <tr key={idx} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-3">
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded ${methodColor[ep.method] ?? 'bg-gray-100 text-gray-600'}`}>
                      {ep.method}
                    </span>
                  </td>
                  <td className="px-6 py-3 font-mono text-xs text-gray-700">{ep.path}</td>
                  <td className="px-6 py-3 text-sm text-gray-600">{ep.desc}</td>
                  <td className="px-6 py-3 text-center">
                    {ep.auth
                      ? <ShieldCheck size={14} className="text-[#00C49F] mx-auto" />
                      : <CheckCircle size={14} className="text-gray-300 mx-auto" />
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Stack info */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="text-[10px] font-bold tracking-widest text-[#00C49F] uppercase mb-4">Teknoloji Stack</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              { label: 'Next.js 14', note: 'App Router + Server Actions' },
              { label: 'Prisma 5.22', note: 'PostgreSQL ORM' },
              { label: 'NextAuth v4', note: 'JWT + CredentialsProvider' },
              { label: 'TypeScript 5.3', note: 'Strict mode, 0 hata' },
              { label: 'Zod', note: 'API input validasyonu' },
              { label: 'Neon PostgreSQL', note: 'Cloud database' },
            ].map(tech => (
              <div key={tech.label} className="bg-gray-50 rounded-xl p-3">
                <p className="text-sm font-bold text-gray-800">{tech.label}</p>
                <p className="text-xs text-gray-500 mt-0.5">{tech.note}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
