import { kurus, fiyatDegisimi, goreliGun } from '@/lib/bicim';

/**
 * FIYAT GECMISI · 14.08.2026 (TRT)
 *
 * Bu bilesen urunun tek cumlelik farkidir.
 *
 * Turkiye'de hicbir buyuk portal ilanin fiyat gecmisini gostermiyor —
 * gosteremez de: geliri ilan/doping adedine bagli bir platform icin
 * "bu ilan 3 kez indirildi, 94 gundur satilamiyor" bilgisini yayinlamak
 * kendi urununu kotulemektir. Bizim gelirimiz ilan adedine bagli
 * olmadigi icin bunu gosterebiliyoruz. Kopyalanmasi zor olan sey budur.
 *
 * Zillow/Redfin'de fiyat gecmisi, kullanicilarin en cok guvendigi
 * ozellik olarak olculmus durumda.
 *
 * Bagimlilik yok — saf SVG. Recharts kart listesinde 40 kez yuklenirse
 * mobilde ilk boyama suresini oldurur.
 */

export interface FiyatKaydi {
  eskiFiyatKurus: bigint | null;
  yeniFiyatKurus: bigint;
  degisimTs: Date | string;
}

export function FiyatGecmisi({
  kayitlar,
  yukseklik = 48,
}: {
  kayitlar: FiyatKaydi[];
  yukseklik?: number;
}) {
  if (kayitlar.length === 0) {
    return (
      <p className="text-mikro text-metinSonuk">
        Henüz fiyat değişikliği yok.
      </p>
    );
  }

  const sirali = [...kayitlar].sort(
    (a, b) => new Date(a.degisimTs).getTime() - new Date(b.degisimTs).getTime()
  );

  const degerler = sirali.map((k) => k.yeniFiyatKurus);
  const enAz = degerler.reduce((m, v) => (v < m ? v : m), degerler[0]);
  const enCok = degerler.reduce((m, v) => (v > m ? v : m), degerler[0]);
  const aralik = enCok - enAz;

  const G = 100; // viewBox genisligi
  const Y = 32;  // viewBox yuksekligi
  const pay = 4;

  const noktalar = degerler.map((v, i) => {
    const x = degerler.length === 1 ? G / 2 : (i / (degerler.length - 1)) * G;
    // Aralik 0 ise duz cizgi ortada
    const oran =
      aralik === 0n ? 0.5 : Number(((v - enAz) * 1000n) / aralik) / 1000;
    const y = Y - pay - oran * (Y - pay * 2);
    return { x, y };
  });

  const cizgi = noktalar
    .map((n, i) => (i === 0 ? 'M' : 'L') + n.x.toFixed(2) + ' ' + n.y.toFixed(2))
    .join(' ');

  const ilk = degerler[0];
  const son = degerler[degerler.length - 1];
  const toplam = fiyatDegisimi(ilk, son);
  const dusus = son < ilk;
  const renk = dusus ? '#0E9F6E' : son > ilk ? '#DC2626' : '#8B94A3';

  return (
    <div>
      {/* Grafik */}
      <div className="flex items-center gap-3">
        <svg
          viewBox={`0 0 ${G} ${Y}`}
          preserveAspectRatio="none"
          style={{ height: yukseklik }}
          className="w-full"
          role="img"
          aria-label={`Fiyat seyri: ${kurus(ilk)} değerinden ${kurus(son)} değerine`}
        >
          <path
            d={`${cizgi} L ${G} ${Y} L 0 ${Y} Z`}
            fill={renk}
            fillOpacity={0.08}
          />
          <path
            d={cizgi}
            fill="none"
            stroke={renk}
            strokeWidth={1.5}
            strokeLinejoin="round"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
          {/* Degisim isaretleri.
              Daire KULLANILMIYOR: preserveAspectRatio="none" grafigi
              yatayda esnettigi icin daireler elips olarak ciziliyordu.
              Dikey cizgi esnemede bozulmaz ve "burada bir degisim oldu"
              bilgisini daha net verir. */}
          {noktalar.map((n, i) => (
            <line
              key={i}
              x1={n.x}
              y1={n.y}
              x2={n.x}
              y2={Y}
              stroke={renk}
              strokeOpacity={0.35}
              strokeWidth={1}
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </svg>

        {toplam && (
          <span
            className={`sayi shrink-0 text-sm font-bold ${
              dusus ? 'text-dogrulandi' : son > ilk ? 'text-risk' : 'text-metinSonuk'
            }`}
          >
            {toplam.metin}
          </span>
        )}
      </div>

      {/* Degisim listesi — en yeni ustte */}
      <ol className="mt-3 divide-y divide-cizgi border-t border-cizgi">
        {[...sirali].reverse().map((k, i) => {
          const d = fiyatDegisimi(k.eskiFiyatKurus, k.yeniFiyatKurus);
          return (
            <li
              key={i}
              className="flex items-baseline justify-between gap-3 py-2"
            >
              <span className="text-mikro text-metinSonuk">
                {goreliGun(k.degisimTs)}
              </span>
              <span className="flex items-baseline gap-2">
                <span className="sayi text-sm font-semibold text-metin">
                  {kurus(k.yeniFiyatKurus)}
                </span>
                {d && d.yon !== 'sabit' && (
                  <span
                    className={`sayi text-mikro font-semibold ${
                      d.yon === 'dusus' ? 'text-dogrulandi' : 'text-risk'
                    }`}
                  >
                    {d.metin}
                  </span>
                )}
                {!d && (
                  <span className="text-mikro text-metinSonuk">ilk fiyat</span>
                )}
              </span>
            </li>
          );
        })}
      </ol>

      <p className="mt-2 text-mikro text-metinSonuk">
        Fiyat geçmişi kalıcıdır ve herkese açıktır. Silinemez.
      </p>
    </div>
  );
}
