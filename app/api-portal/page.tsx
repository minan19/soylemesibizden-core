import Link from 'next/link';
import { ArrowLeft, Terminal, Key, ShieldCheck, Zap, ArrowRight } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default function ApiPortalPage() {
  const features = [
    { title: 'RESTful Endpoints', desc: 'Standart HTTP metodları — GET, POST, PUT, DELETE', icon: <Terminal size={18} />, status: 'Aktif' },
    { title: 'JWT Authentication', desc: 'Bearer token ile güvenli kimlik doğrulama', icon: <Key size={18} />, status: 'Aktif' },
    { title: 'Zod Validasyon', desc: 'Tüm giriş verileri şema doğrulamasına tabi', icon: <ShieldCheck size={18} />, status: 'Aktif' },
    { title: 'Webhook Desteği', desc: 'Teklif, ilan ve anlaşma olaylarına abone ol', icon: <Zap size={18} />, status: 'Yakında' },
    { title: 'API Rate Limiting', desc: 'Dakika başı istek sınırlandırma', icon: <ShieldCheck size={18} />, status: 'Yakında' },
    { title: 'SDK (Node.js)', desc: 'JavaScript/TypeScript client kütüphanesi', icon: <Terminal size={18} />, status: 'Planlanan' },
  ];

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <div className="max-w-4xl mx-auto px-8 py-10 space-y-8">

        <div>
          <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-gray-700 transition-colors mb-3">
            <ArrowLeft size={14} /> Dashboard
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gray-900 flex items-center justify-center text-white">
              <Terminal size={18} />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">API Portal</h1>
              <p className="text-xs text-gray-400 mt-0.5">Sovereign Intelligence Engine entegrasyon hattı</p>
            </div>
          </div>
        </div>

        {/* Code preview */}
        <div className="bg-gray-900 rounded-2xl p-6 text-white font-mono">
          <p className="text-gray-500 text-xs mb-3">// İlan listesi çek — örnek istek</p>
          <p className="text-[#00C49F] text-sm">
            curl -X GET &quot;https://soylemesibizden-core.vercel.app/api/listings?status=ACTIVE&amp;city=İstanbul&quot; \
          </p>
          <p className="text-gray-300 text-sm pl-4">-H &quot;Content-Type: application/json&quot;</p>
          <div className="mt-4 pt-4 border-t border-gray-800">
            <p className="text-gray-500 text-xs mb-2">// Response (200 OK)</p>
            <p className="text-amber-400 text-xs leading-relaxed">
              {`{ "listings": [...], "total": 42, "page": 1 }`}
            </p>
          </div>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {features.map(feat => (
            <div key={feat.title} className="bg-white rounded-2xl border border-gray-100 p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#F0FDF8] flex items-center justify-center text-[#00C49F] shrink-0">
                    {feat.icon}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">{feat.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{feat.desc}</p>
                  </div>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                  feat.status === 'Aktif' ? 'bg-[#F0FDF8] text-[#00C49F]' :
                  feat.status === 'Yakında' ? 'bg-amber-50 text-amber-600' :
                  'bg-gray-100 text-gray-500'
                }`}>
                  {feat.status}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Security */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="text-[10px] font-bold tracking-widest text-[#00C49F] uppercase mb-4 flex items-center gap-2">
            <ShieldCheck size={12} /> Güvenlik Mührü
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              { label: 'RSA-256 İmzalama', desc: 'JWT token doğrulama' },
              { label: 'bcrypt 12 Rounds', desc: 'Parola şifreleme' },
              { label: 'HTTPS Zorunlu', desc: 'TLS 1.3 şifrelemesi' },
            ].map(item => (
              <div key={item.label} className="flex items-start gap-2 p-3 bg-[#F0FDF8] rounded-xl">
                <ShieldCheck size={14} className="text-[#00C49F] mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs font-bold text-gray-800">{item.label}</p>
                  <p className="text-[10px] text-gray-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Link href="/developer" className="flex items-center justify-between bg-[#00C49F] text-white rounded-2xl p-5 hover:bg-[#00B090] transition-colors group">
          <div>
            <p className="text-sm font-bold">Tam Dokümantasyon</p>
            <p className="text-xs text-white/70 mt-0.5">Tüm endpoint'ler, parametreler ve örnek kodlar</p>
          </div>
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </main>
  );
}
