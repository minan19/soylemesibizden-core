'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Search, ShieldCheck, ShieldX, Loader2, AlertTriangle,
  FlaskConical, CheckCircle2, MapPin,
} from 'lucide-react';

/**
 * Ilan verme akisi · 14.08.2026 (TRT)
 *
 * Iki adim:
 *   1. Tasinmaz numarasi -> EIDS sorgusu (tapu + yetki)
 *   2. Yetki varsa -> ilan bilgileri
 *
 * Yetki yoksa form ACILMAZ. Bu, "once ilani yaz sonra dogrulariz"
 * yaklasiminin tersidir ve kasitlidir: dogrulama bir onay adimi
 * degil, giris kapisidir.
 *
 * Istemcideki bu kontrol yalnizca kullanici deneyimi icindir;
 * gercek kapi POST /api/ilanlar icinde, sunucu tarafinda.
 */

type Tapu = {
  tasinmazNo: string;
  ada?: string;
  parsel?: string;
  ilceAd?: string;
  mahalleAd?: string;
  brutM2?: number;
};

type SorguSonucu = {
  bulundu: boolean;
  tapu: Tapu;
  yetki: { yetkili: boolean; turu: string | null; redSebebi: string | null };
  kaynak: 'GERCEK' | 'MOCK';
  mukerrer: boolean;
};

const YETKI_METIN: Record<string, string> = {
  MALIK: 'Malik',
  HISIM: 'Hısım',
  YETKILI_ISLETME: 'Yetkili işletme',
};

export function IlanVerFormu() {
  const router = useRouter();

  const [tasinmazNo, setTasinmazNo] = useState('');
  const [sorgulaniyor, setSorgulaniyor] = useState(false);
  const [sonuc, setSonuc] = useState<SorguSonucu | null>(null);
  const [hata, setHata] = useState<string | null>(null);

  const [kaydediliyor, setKaydediliyor] = useState(false);
  const [form, setForm] = useState({
    turu: 'SATILIK' as 'SATILIK' | 'KIRALIK',
    tipi: 'KONUT' as 'KONUT' | 'ISYERI' | 'ARSA' | 'BINA' | 'DEVREMULK',
    baslik: '',
    aciklama: '',
    fiyatLira: '',
    odaSayisi: '',
  });

  async function sorgula(e: React.FormEvent) {
    e.preventDefault();
    setHata(null);
    setSonuc(null);
    setSorgulaniyor(true);
    try {
      const r = await fetch('/api/eids/tasinmaz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tasinmazNo: tasinmazNo.trim() }),
      });
      const d = (await r.json()) as SorguSonucu & { error?: string; detay?: string };
      if (!r.ok) {
        setHata(d.detay ? `${d.error} ${d.detay}` : (d.error ?? 'Sorgu başarısız.'));
        return;
      }
      setSonuc(d);
      setForm((f) => ({
        ...f,
        baslik:
          f.baslik ||
          `${d.tapu.ilceAd} / ${d.tapu.mahalleAd} — Ada ${d.tapu.ada} Parsel ${d.tapu.parsel}`,
      }));
    } catch {
      setHata('Bağlantı hatası.');
    } finally {
      setSorgulaniyor(false);
    }
  }

  async function kaydet(e: React.FormEvent) {
    e.preventDefault();
    if (!sonuc) return;
    setHata(null);
    setKaydediliyor(true);
    try {
      const r = await fetch('/api/ilanlar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tasinmazNo: sonuc.tapu.tasinmazNo,
          turu: form.turu,
          tipi: form.tipi,
          baslik: form.baslik,
          aciklama: form.aciklama || undefined,
          fiyatLira: Number(form.fiyatLira.replace(/\D/g, '')),
          odaSayisi: form.odaSayisi || undefined,
        }),
      });
      const d = (await r.json()) as { id?: string; error?: string; detay?: string };
      if (!r.ok) {
        setHata(d.detay ? `${d.error} — ${d.detay}` : (d.error ?? 'Kayıt başarısız.'));
        return;
      }
      router.push(`/ilan/${d.id}`);
    } catch {
      setHata('Bağlantı hatası.');
    } finally {
      setKaydediliyor(false);
    }
  }

  const alan =
    'w-full rounded-rozet border border-cizgi bg-kart px-3 py-2.5 text-sm ' +
    'text-metin placeholder:text-metinSonuk focus:border-marka';
  const etiket = 'mb-1 block text-mikro font-semibold text-metinIkincil';

  return (
    <div className="space-y-4">
      {/* ADIM 1 — tasinmaz numarasi */}
      <form onSubmit={sorgula} className="kart p-4">
        <label htmlFor="tno" className={etiket}>
          1. TAŞINMAZ NUMARASI
        </label>
        <p className="mb-2 text-mikro text-metinSonuk">
          Tapu senedinizde veya e-Devlet &quot;Tapu Bilgileri Sorgulama&quot;
          hizmetinde yer alır. İlan yayınlamak için zorunludur.
        </p>
        <div className="flex flex-col gap-2 sm:flex-row">
          <input
            id="tno"
            inputMode="numeric"
            value={tasinmazNo}
            onChange={(e) => setTasinmazNo(e.target.value)}
            placeholder="örn. 100001"
            className={`sayi ${alan}`}
            required
          />
          <button
            type="submit"
            disabled={sorgulaniyor || tasinmazNo.trim().length < 6}
            className="dokunulabilir flex items-center justify-center gap-2 rounded-rozet bg-marka px-4 py-2.5 text-sm font-bold text-white disabled:opacity-40"
          >
            {sorgulaniyor ? (
              <Loader2 size={16} className="animate-spin" aria-hidden />
            ) : (
              <Search size={16} aria-hidden />
            )}
            EİDS&apos;te sorgula
          </button>
        </div>
      </form>

      {hata && (
        <div
          role="alert"
          className="kart flex items-start gap-2 border-red-200 bg-red-50 p-3 text-sm text-risk"
        >
          <AlertTriangle size={16} className="mt-0.5 shrink-0" aria-hidden />
          <span>{hata}</span>
        </div>
      )}

      {/* ADIM 1 SONUCU */}
      {sonuc && (
        <div className="kart p-4">
          {sonuc.kaynak === 'MOCK' && (
            <p className="rozet mb-3 bg-violet-50 text-test">
              <FlaskConical size={12} aria-hidden />
              DOĞRULANMAMIŞ — TEST VERİSİ (MockEids)
            </p>
          )}

          <dl className="mb-3 divide-y divide-cizgi border-y border-cizgi">
            {[
              ['Taşınmaz no', sonuc.tapu.tasinmazNo],
              ['Ada / Parsel', `${sonuc.tapu.ada ?? '—'} / ${sonuc.tapu.parsel ?? '—'}`],
              ['Konum', `${sonuc.tapu.ilceAd} / ${sonuc.tapu.mahalleAd}`],
              ['Brüt m²', sonuc.tapu.brutM2 ?? '—'],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4 py-2">
                <dt className="text-sm text-metinIkincil">{k}</dt>
                <dd className="sayi text-sm font-semibold text-metin">{v}</dd>
              </div>
            ))}
          </dl>

          {sonuc.mukerrer ? (
            <p className="flex items-start gap-2 text-sm font-semibold text-risk">
              <ShieldX size={16} className="mt-0.5 shrink-0" aria-hidden />
              Bu taşınmaz için zaten yayında bir ilan var. Bir taşınmaz
              numarası için aynı anda tek ilan bulunabilir.
            </p>
          ) : sonuc.yetki.yetkili ? (
            <p className="flex items-start gap-2 text-sm font-semibold text-marka-koyu">
              <ShieldCheck size={16} className="mt-0.5 shrink-0" aria-hidden />
              İlan verme yetkiniz doğrulandı
              {sonuc.yetki.turu ? ` — ${YETKI_METIN[sonuc.yetki.turu]}` : ''}.
            </p>
          ) : (
            <div className="flex items-start gap-2 text-sm text-risk">
              <ShieldX size={16} className="mt-0.5 shrink-0" aria-hidden />
              <div>
                <p className="font-semibold">İlan verme yetkiniz bulunmuyor.</p>
                {sonuc.yetki.redSebebi && (
                  <p className="mt-0.5 text-metinIkincil">{sonuc.yetki.redSebebi}</p>
                )}
                <p className="mt-1 text-mikro text-metinSonuk">
                  Malik değilseniz, malikin e-Devlet üzerinden sizi
                  yetkilendirmesi gerekir.
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ADIM 2 — yalnizca yetki varsa acilir */}
      {sonuc?.yetki.yetkili && !sonuc.mukerrer && (
        <form onSubmit={kaydet} className="kart space-y-3 p-4">
          <p className="flex items-center gap-1.5 text-mikro font-semibold text-metinIkincil">
            <MapPin size={12} aria-hidden /> 2. İLAN BİLGİLERİ
          </p>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={etiket} htmlFor="turu">İlan türü</label>
              <select
                id="turu"
                value={form.turu}
                onChange={(e) => setForm({ ...form, turu: e.target.value as 'SATILIK' })}
                className={alan}
              >
                <option value="SATILIK">Satılık</option>
                <option value="KIRALIK">Kiralık</option>
              </select>
            </div>
            <div>
              <label className={etiket} htmlFor="tipi">Taşınmaz tipi</label>
              <select
                id="tipi"
                value={form.tipi}
                onChange={(e) => setForm({ ...form, tipi: e.target.value as 'KONUT' })}
                className={alan}
              >
                <option value="KONUT">Konut</option>
                <option value="ISYERI">İş yeri</option>
                <option value="ARSA">Arsa</option>
                <option value="BINA">Bina</option>
                <option value="DEVREMULK">Devremülk</option>
              </select>
            </div>
          </div>

          <div>
            <label className={etiket} htmlFor="baslik">Başlık</label>
            <input
              id="baslik"
              value={form.baslik}
              onChange={(e) => setForm({ ...form, baslik: e.target.value })}
              className={alan}
              minLength={10}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={etiket} htmlFor="fiyat">
                Fiyat (TL) {form.turu === 'KIRALIK' && '/ ay'}
              </label>
              <input
                id="fiyat"
                inputMode="numeric"
                value={form.fiyatLira}
                onChange={(e) =>
                  setForm({ ...form, fiyatLira: e.target.value.replace(/\D/g, '') })
                }
                placeholder="2500000"
                className={`sayi ${alan}`}
                required
              />
            </div>
            <div>
              <label className={etiket} htmlFor="oda">Oda sayısı</label>
              <input
                id="oda"
                value={form.odaSayisi}
                onChange={(e) => setForm({ ...form, odaSayisi: e.target.value })}
                placeholder="3+1"
                className={alan}
              />
            </div>
          </div>

          <div>
            <label className={etiket} htmlFor="aciklama">Açıklama</label>
            <textarea
              id="aciklama"
              value={form.aciklama}
              onChange={(e) => setForm({ ...form, aciklama: e.target.value })}
              rows={4}
              className={alan}
            />
          </div>

          <p className="rounded-rozet bg-zemin p-2.5 text-mikro text-metinIkincil">
            İlan <strong>taslak</strong> olarak kaydedilir. Yayına alma ayrı bir
            adımdır ve yetki süresi boyunca periyodik teyit gerektirir; teyit
            edilmeyen ilan otomatik pasifleşir.
          </p>

          <button
            type="submit"
            disabled={kaydediliyor}
            className="dokunulabilir flex w-full items-center justify-center gap-2 rounded-rozet bg-marka px-4 py-3 text-sm font-bold text-white disabled:opacity-40"
          >
            {kaydediliyor ? (
              <Loader2 size={16} className="animate-spin" aria-hidden />
            ) : (
              <CheckCircle2 size={16} aria-hidden />
            )}
            Taslak olarak kaydet
          </button>
        </form>
      )}
    </div>
  );
}
