'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AuthPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const endpoint = isLogin ? '/auth/login' : '/auth/register';
    
    try {
      // Karargaha (Backend) doğrudan güvenli istek
      const res = await fetch(`http://localhost:4000${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(isLogin ? { email: formData.email, password: formData.password } : formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Bir hata oluştu.');
      }

      // Başarılı giriş/kayıt: JWT Token'ı kasaya (localStorage) kilitle
      localStorage.setItem('sovereign_token', data.access_token);
      localStorage.setItem('sovereign_user', JSON.stringify(data.user));

      // Kontrol Paneline (Dashboard) yönlendir
      router.push('/dashboard/listings');

    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans">
      <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl p-10 border border-slate-100">
        
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black italic tracking-tighter text-slate-900">
            SOVEREIGN <span className="text-blue-600 not-italic font-light">IQ</span>
          </h1>
          <p className="text-[10px] tracking-[0.3em] font-bold text-slate-400 mt-2 uppercase">
            Corporate Access Portal
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-sm font-bold mb-6 text-center border border-red-100">
            🚨 {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {!isLogin && (
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-2">Ad Soyad</label>
              <input 
                type="text" 
                required 
                className="w-full bg-slate-50 px-6 py-4 rounded-2xl text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
          )}
          
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-2">Kurumsal E-Posta</label>
            <input 
              type="email" 
              required 
              className="w-full bg-slate-50 px-6 py-4 rounded-2xl text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-2">Şifre</label>
            <input 
              type="password" 
              required 
              className="w-full bg-slate-50 px-6 py-4 rounded-2xl text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-blue-600 text-white font-black uppercase tracking-widest text-sm py-5 rounded-2xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 mt-4 disabled:opacity-50"
          >
            {loading ? 'İşleniyor...' : (isLogin ? 'Sisteme Giriş Yap' : 'Kurumsal Kayıt Ol')}
          </button>
        </form>

        <div className="mt-8 text-center">
          <button 
            type="button" 
            onClick={() => { setIsLogin(!isLogin); setError(''); }}
            className="text-xs font-bold text-slate-400 hover:text-blue-600 transition-colors"
          >
            {isLogin ? "Yeni hesap oluştur (Sistem Yöneticisi)" : "Zaten hesabınız var mı? Giriş yapın"}
          </button>
        </div>

      </div>
    </div>
  );
}
