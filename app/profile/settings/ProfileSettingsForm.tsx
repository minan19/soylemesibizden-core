'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, CheckCircle, User, ImageOff } from 'lucide-react';

export default function ProfileSettingsForm({
  initialName,
  initialPhone,
  initialAvatar,
}: {
  initialName: string;
  initialPhone: string;
  initialAvatar: string;
}) {
  const router = useRouter();
  const [name, setName] = useState(initialName);
  const [phone, setPhone] = useState(initialPhone);
  const [avatar, setAvatar] = useState(initialAvatar);
  const [imgError, setImgError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSaved(false);
    try {
      const res = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, avatar }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error ?? 'Güncelleme başarısız.');
      } else {
        setSaved(true);
        router.refresh();
        setTimeout(() => setSaved(false), 3000);
      }
    } catch {
      setError('Bağlantı hatası.');
    } finally {
      setLoading(false);
    }
  }

  const inputCls = 'w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:border-[#00C49F] transition-colors';
  const displayName = name || 'K';

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
      <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">Profili Düzenle</p>

      {/* Avatar Preview */}
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-2xl overflow-hidden bg-[#F0FDF8] flex items-center justify-center shrink-0 border border-[#00C49F]/20">
          {avatar && !imgError ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={avatar}
              alt="Avatar"
              className="w-full h-full object-cover"
              onError={() => setImgError(true)}
            />
          ) : (
            <span className="text-2xl font-bold text-[#00C49F]">
              {displayName.charAt(0).toUpperCase()}
            </span>
          )}
        </div>
        <div className="flex-1 space-y-1.5">
          <label className="text-xs font-bold tracking-widest text-gray-500 uppercase block">Profil Fotoğrafı (URL)</label>
          <input
            type="url"
            value={avatar}
            onChange={e => { setAvatar(e.target.value); setImgError(false); }}
            placeholder="https://… (resim URL'i)"
            className={inputCls}
          />
          {imgError && avatar && (
            <p className="text-xs text-red-400 flex items-center gap-1">
              <ImageOff size={11} /> URL geçersiz veya resim yüklenemiyor
            </p>
          )}
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-bold tracking-widest text-gray-500 uppercase">Ad Soyad</label>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Adınızı girin"
          className={inputCls}
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-bold tracking-widest text-gray-500 uppercase">Telefon</label>
        <input
          type="tel"
          value={phone}
          onChange={e => setPhone(e.target.value)}
          placeholder="+90 5xx xxx xx xx"
          className={inputCls}
        />
      </div>

      {error && (
        <p className="text-sm text-red-500 font-medium">{error}</p>
      )}

      {saved && (
        <p className="text-sm text-[#00C49F] font-medium flex items-center gap-2">
          <CheckCircle size={14} /> Profil güncellendi.
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 py-3 bg-[#00C49F] hover:bg-[#00a882] text-white text-sm font-bold rounded-xl transition-colors disabled:opacity-60"
      >
        <Save size={15} />
        {loading ? 'Kaydediliyor...' : 'Kaydet'}
      </button>
    </form>
  );
}
