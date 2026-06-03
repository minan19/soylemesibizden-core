'use client';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Shield, Loader2 } from 'lucide-react';

type Mode = 'login' | 'register';

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (mode === 'register') {
        const res = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: form.email, password: form.password, name: form.name }),
        });
        const data = await res.json();
        if (!res.ok) { setError(data.error ?? 'Kayıt başarısız.'); return; }
        // Kayıt sonrası otomatik giriş
      }

      const result = await signIn('credentials', {
        email: form.email,
        password: form.password,
        redirect: false,
      });

      if (result?.error) {
        setError('E-posta veya şifre hatalı.');
      } else {
        router.push('/dashboard');
        router.refresh();
      }
    } catch {
      setError('Bağlantı hatası. Lütfen tekrar deneyin.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">

        {/* Logo */}
        <div className="flex flex-col items-center mb-10">
          <div className="w-12 h-12 bg-[#0F172A] rounded-2xl flex items-center justify-center mb-4">
            <Shield size={22} className="text-[#00C49F]" />
          </div>
          <span className="text-[10px] font-bold tracking-[0.35em] uppercase text-[#0F172A]">
            SöylemesiBizden
          </span>
          <span className="text-[10px] text-gray-400 tracking-[0.2em] uppercase mt-1">
            {mode === 'login' ? 'Güvenli Giriş' : 'Hesap Oluştur'}
          </span>
        </div>

        {/* Kart */}
        <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-[0_4px_40px_rgba(0,0,0,0.04)]">
          <form onSubmit={handleSubmit} className="space-y-4">

            {mode === 'register' && (
              <div>
                <label className="block text-[11px] font-semibold text-gray-400 tracking-wider uppercase mb-1.5">
                  Ad Soyad
                </label>
                <input
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Mustafa İnan"
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm font-medium text-[#0F172A] outline-none focus:border-[#00C49F]/40 focus:bg-white transition-all"
                />
              </div>
            )}

            <div>
              <label className="block text-[11px] font-semibold text-gray-400 tracking-wider uppercase mb-1.5">
                E-posta
              </label>
              <input
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="ad@sirket.com"
                className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm font-medium text-[#0F172A] outline-none focus:border-[#00C49F]/40 focus:bg-white transition-all"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-gray-400 tracking-wider uppercase mb-1.5">
                Şifre
              </label>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 pr-11 text-sm font-medium text-[#0F172A] outline-none focus:border-[#00C49F]/40 focus:bg-white transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500 transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-100 rounded-xl px-4 py-3 text-[12px] text-red-600 font-medium">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#0F172A] hover:bg-[#1E293B] text-white rounded-xl py-3.5 text-[12px] font-bold tracking-[0.15em] uppercase transition-all flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {loading && <Loader2 size={14} className="animate-spin" />}
              {mode === 'login' ? 'Giriş Yap' : 'Hesap Oluştur'}
            </button>
          </form>

          {/* Toggle */}
          <div className="mt-6 text-center">
            <span className="text-[11px] text-gray-400">
              {mode === 'login' ? 'Hesabınız yok mu? ' : 'Zaten hesabınız var mı? '}
            </span>
            <button
              onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError(''); }}
              className="text-[11px] font-bold text-[#00C49F] hover:underline"
            >
              {mode === 'login' ? 'Kayıt Ol' : 'Giriş Yap'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
