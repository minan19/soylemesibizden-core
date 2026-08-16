'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Check, Loader2, X, CalendarCheck, UserX } from 'lucide-react';

/**
 * Panel islem dugmeleri · 16.08.2026 (TRT)
 *
 * Teyit ve randevu durum degisikligi.
 *
 * Basarisiz istekte SESSIZ KALINMAZ: hata metni ekranda gosterilir.
 * "Teyit ettim sandim ama olmamis" durumu, ilanin dusmesiyle
 * sonuclanir; kullanicinin bunu ogrenmesi gerekir.
 */

function Hata({ metin }: { metin: string }) {
  return (
    <p role="alert" className="mt-1.5 text-mikro font-semibold text-risk">
      {metin}
    </p>
  );
}

export function TeyitDugmesi({
  ilanId,
  edilebilir,
  engel,
  vurgulu,
}: {
  ilanId: string;
  edilebilir: boolean;
  engel?: string;
  vurgulu: boolean;
}) {
  const router = useRouter();
  const [calisiyor, setCalisiyor] = useState(false);
  const [hata, setHata] = useState<string | null>(null);

  if (!edilebilir) {
    return (
      <p className="text-mikro text-metinSonuk">
        {engel ?? 'Teyit edilemez.'}
      </p>
    );
  }

  async function teyitEt() {
    setHata(null);
    setCalisiyor(true);
    try {
      const r = await fetch(`/api/ilanlar/${ilanId}/teyit`, { method: 'POST' });
      const d = (await r.json()) as { error?: string };
      if (!r.ok) {
        setHata(d.error ?? 'Teyit işlenemedi.');
        return;
      }
      router.refresh();
    } catch {
      setHata('Bağlantı hatası.');
    } finally {
      setCalisiyor(false);
    }
  }

  return (
    <div>
      <button
        onClick={teyitEt}
        disabled={calisiyor}
        className={`dokunulabilir flex items-center justify-center gap-1.5 rounded-rozet px-3 py-2 text-sm font-bold disabled:opacity-40 ${
          vurgulu
            ? 'bg-marka text-white'
            : 'border border-cizgi bg-kart text-metin'
        }`}
      >
        {calisiyor ? (
          <Loader2 size={15} className="animate-spin" aria-hidden />
        ) : (
          <Check size={15} aria-hidden />
        )}
        İlan hâlâ geçerli
      </button>
      {hata && <Hata metin={hata} />}
    </div>
  );
}

export function RandevuIslemleri({
  randevuId,
  durumu,
}: {
  randevuId: string;
  durumu: string;
}) {
  const router = useRouter();
  const [calisiyor, setCalisiyor] = useState<string | null>(null);
  const [hata, setHata] = useState<string | null>(null);

  async function guncelle(yeniDurum: string) {
    setHata(null);
    setCalisiyor(yeniDurum);
    try {
      const r = await fetch(`/api/randevular/${randevuId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ durumu: yeniDurum }),
      });
      const d = (await r.json()) as { error?: string; detay?: string };
      if (!r.ok) {
        setHata(d.detay ? `${d.error} ${d.detay}` : (d.error ?? 'İşlem başarısız.'));
        return;
      }
      router.refresh();
    } catch {
      setHata('Bağlantı hatası.');
    } finally {
      setCalisiyor(null);
    }
  }

  const dugme =
    'dokunulabilir flex items-center gap-1.5 rounded-rozet border border-cizgi px-2.5 py-1.5 text-mikro font-semibold disabled:opacity-40';

  return (
    <div>
      <div className="flex flex-wrap gap-1.5">
        {durumu === 'TALEP' && (
          <>
            <button
              onClick={() => guncelle('ONAYLANDI')}
              disabled={calisiyor !== null}
              className={`${dugme} bg-marka text-white`}
            >
              {calisiyor === 'ONAYLANDI' ? (
                <Loader2 size={12} className="animate-spin" aria-hidden />
              ) : (
                <Check size={12} aria-hidden />
              )}
              Onayla
            </button>
            <button
              onClick={() => guncelle('IPTAL')}
              disabled={calisiyor !== null}
              className={`${dugme} text-metinIkincil`}
            >
              <X size={12} aria-hidden /> Uygun değil
            </button>
          </>
        )}

        {durumu === 'ONAYLANDI' && (
          <>
            <button
              onClick={() => guncelle('GERCEKLESTI')}
              disabled={calisiyor !== null}
              className={`${dugme} bg-marka text-white`}
            >
              {calisiyor === 'GERCEKLESTI' ? (
                <Loader2 size={12} className="animate-spin" aria-hidden />
              ) : (
                <CalendarCheck size={12} aria-hidden />
              )}
              Gösterim yapıldı
            </button>
            <button
              onClick={() => guncelle('GELMEDI')}
              disabled={calisiyor !== null}
              className={`${dugme} text-metinIkincil`}
            >
              <UserX size={12} aria-hidden /> Gelinmedi
            </button>
          </>
        )}
      </div>

      {durumu === 'ONAYLANDI' && (
        <p className="mt-1.5 text-mikro text-metinSonuk">
          &quot;Gösterim yapıldı&quot; işaretlendikten sonra ziyaretçiye
          ilandaki taşınmazın gösterilip gösterilmediği sorulur. Bu kayıt
          geri alınamaz.
        </p>
      )}

      {hata && <Hata metin={hata} />}
    </div>
  );
}
