import { Camera, Sparkles, FileWarning, Wrench, ShieldCheck } from 'lucide-react';

/**
 * Gorsel koken gosterimi · 14.08.2026 (TRT)
 *
 * Bu bilesen "bu fotograf sahte" DEMEZ. Dosyanin ustverisinde ne
 * yazdigini gosterir. Fark onemli: yapay zeka uretimi goruntuyu
 * piksel analiziyle guvenilir sekilde tespit etmek mumkun degil ve
 * yanlis pozitif, masum bir ilan sahibini damgalar.
 *
 * "Ustveri silinmis" bir suclama degildir ve oyle sunulmaz —
 * bircok platform yuklemede ustveriyi zaten siler.
 */

export interface MedyaKoken {
  id: string;
  url: string;
  sira: number;
  kokenIsaretleri: string[];
  kokenAraci: string | null;
  kameraMarka: string | null;
  cekimTarihi: string | null;
}

function tarihBicim(t: string | null): string | null {
  if (!t) return null;
  // EXIF bicimi: "2026:03:14 10:22:31"
  const m = t.match(/^(\d{4}):(\d{2}):(\d{2})/);
  return m ? `${m[3]}.${m[2]}.${m[1]}` : t;
}

function Satir({ m, sira }: { m: MedyaKoken; sira: number }) {
  const yz = m.kokenIsaretleri.includes('YZ_ARACI_BEYANI');
  const c2pa = m.kokenIsaretleri.includes('C2PA_VAR');
  const kamera = m.kokenIsaretleri.includes('KAMERA_BILGISI_VAR');
  const duzenleme = m.kokenIsaretleri.includes('DUZENLEME_ARACI');
  const silinmis = m.kokenIsaretleri.includes('USTVERI_TAMAMEN_SILINMIS');

  let Ikon = FileWarning;
  let ton = 'text-metinSonuk';
  let metin = 'Üstveride kamera bilgisi yok.';

  if (yz) {
    Ikon = Sparkles;
    ton = 'text-test';
    metin = `Yapay zekâ aracı beyanı${m.kokenAraci ? ` — ${m.kokenAraci}` : ''}`;
  } else if (c2pa) {
    Ikon = ShieldCheck;
    ton = 'text-bilgi';
    metin = 'Köken imzası (Content Credentials) var';
  } else if (kamera) {
    Ikon = Camera;
    ton = 'text-dogrulandi';
    const t = tarihBicim(m.cekimTarihi);
    metin =
      `Kamera bilgisi var${m.kameraMarka ? ` — ${m.kameraMarka}` : ''}` +
      `${t ? `, çekim ${t}` : ''}`;
  } else if (duzenleme) {
    Ikon = Wrench;
    ton = 'text-metinIkincil';
    metin = `Düzenleme aracından geçmiş${m.kokenAraci ? ` — ${m.kokenAraci}` : ''}`;
  } else if (silinmis) {
    metin = 'Üstveri silinmiş';
  }

  return (
    <li className="flex items-start gap-2 py-2">
      <span className="sayi mt-0.5 w-5 shrink-0 text-mikro text-metinSonuk">
        {sira}.
      </span>
      <Ikon size={14} className={`mt-0.5 shrink-0 ${ton}`} aria-hidden />
      <span className={`text-sm ${ton === 'text-metinSonuk' ? 'text-metinIkincil' : ton}`}>
        {metin}
      </span>
    </li>
  );
}

export function GorselKoken({ medyalar }: { medyalar: MedyaKoken[] }) {
  if (medyalar.length === 0) return null;

  const yzVar = medyalar.some((m) => m.kokenIsaretleri.includes('YZ_ARACI_BEYANI'));

  return (
    <section className="kart p-4">
      <h2 className="mb-1 flex items-center gap-1.5 text-sm font-bold text-metin">
        <Camera size={14} aria-hidden /> Görsellerin kökeni
      </h2>

      {yzVar && (
        <p className="rozet mb-2 bg-violet-50 text-test">
          <Sparkles size={12} aria-hidden />
          BU İLANDA YAPAY ZEKÂ BEYANLI GÖRSEL VAR
        </p>
      )}

      <ul className="divide-y divide-cizgi border-y border-cizgi">
        {medyalar.map((m, i) => (
          <Satir key={m.id} m={m} sira={i + 1} />
        ))}
      </ul>

      <p className="mt-2 text-mikro text-metinSonuk">
        Bu bilgiler görsel dosyalarının kendi üstverisinden okunur; tahmin
        değildir. Üstverinin silinmiş olması tek başına bir sorun göstermez —
        birçok platform yüklemede üstveriyi siler.
      </p>
    </section>
  );
}
