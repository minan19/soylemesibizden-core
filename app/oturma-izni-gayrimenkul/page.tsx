import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Yabancıların Oturma İzni ve Gayrimenkul Rehberi | Türkiye | Söylemesi Bizden',
  description:
    'Türkiye\'de yabancı uyruklu kişilerin gayrimenkul alımı, oturma izni başvurusu, 400.000 USD yatırım yolu ve tapu süreçleri rehberi.',
};

const ALIM_KOŞULLARI = [
  {
    başlık: 'Hangi Yabancılar Taşınmaz Alabilir?',
    aciklama: '183 ülkenin vatandaşları Türkiye\'de taşınmaz satın alabilir. Bazı ülkeler karşılıklılık ilkesi kapsamında kısıtlamaya tabidir. Tapu Kanunu md. 35\'e göre sınır bölgeleri ve askeri alanlar yasaktır.',
    kanun: 'Tapu Kanunu md. 35',
  },
  {
    başlık: 'Edinim Limitleri',
    aciklama: 'Bir yabancı uyruklu kişi Türkiye genelinde en fazla 30 hektar taşınmaz edinebilir. Tek bir ilçedeki taşınmazların o ilçenin yüzölçümünün %10\'unu geçmesi yasaktır.',
    kanun: 'Tapu Kanunu md. 35/3',
  },
  {
    başlık: 'Askeri Yasak Bölgeler',
    aciklama: 'Askeri güvenlik bölgelerinde, sınır hattına 0–1. derece güvenlik bölgelerinde taşınmaz edinimi mümkün değildir. Türk Silahlı Kuvvetleri izni gerektirir.',
    kanun: 'Askeri Yasak Bölgeler Kanunu',
  },
];

const OTURMA_IZNI_TURLERI = [
  {
    tur: 'Kısa Dönem Oturma İzni',
    sure: '1 yıl (uzatılabilir)',
    kosul: '400.000 USD+ gayrimenkul yatırımı veya Türkiye\'de mülk sahipliği',
    aciklama: 'En yaygın yol. Türkiye\'de en az 1 taşınmaz sahibi olan yabancılara verilir.',
  },
  {
    tur: 'Uzun Dönem Oturma İzni',
    sure: 'Süresiz',
    kosul: '8 yıl kesintisiz kısa dönem ikamet',
    aciklama: 'Türkiye\'de 8 yıl kısa dönem izinle ikamet eden, koşulları karşılayan yabancılara verilir.',
  },
  {
    tur: 'Vatandaşlık (Yatırım Yoluyla)',
    sure: 'Kalıcı',
    kosul: '400.000 USD+ gayrimenkul veya 500.000 USD banka mevduatı',
    aciklama: 'En az 400.000 USD değerinde mülk alan ve 3 yıl satmama taahhüdü veren yabancılar başvurabilir.',
  },
];

const BASVURU_ADIMLARI = [
  { adim: 1, baslik: 'Tapu Işlemini Tamamlayın', aciklama: 'Tapu Müdürlüğü\'nde mülk devri gerçekleştirin ve tapu senedini alın.' },
  { adim: 2, baslik: 'SPK Değerleme Raporu', aciklama: 'Vatandaşlık başvurusu için SPK lisanslı değerleme şirketinden ekspertiz raporu alın (USD bazlı).' },
  { adim: 3, baslik: 'Yabancı Para Değişimi', aciklama: 'Vatandaşlık için mülk bedelinin TCMB aracılığıyla Türk lirasına çevrilmesi gerekir; banka belgesi şart.' },
  { adim: 4, baslik: 'Uygunluk Belgesi', aciklama: 'Vatandaşlık için İl Göç İdaresi Müdürlüğü\'nden uygunluk belgesi alınır.' },
  { adim: 5, baslik: 'Başvuru Dosyası Hazırlanması', aciklama: 'Pasaport, tapu senedi, ekspertiz raporu, sağlık sigortası, ikametgah belgesi dosyaya eklenir.' },
  { adim: 6, baslik: 'Göç İdaresi Başvurusu', aciklama: 'e-ikamet.goc.gov.tr üzerinden veya yerel Göç İdaresi Müdürlüğü\'nde başvuru tamamlanır.' },
];

const PRATIK_BILGILER = [
  { baslik: 'Döviz Kuru Riski', aciklama: '400.000 USD eşiği, başvuru günündeki TCMB kuru üzerinden hesaplanır. Kur değişimlerini takip edin.' },
  { baslik: '3 Yıl Satmama Taahhüdü', aciklama: 'Vatandaşlık yoluyla alınan taşınmaz, yatırım tarihinden itibaren 3 yıl boyunca satılamaz; tapuya şerh düşülür.' },
  { baslik: 'Birden Fazla Taşınmaz', aciklama: '400.000 USD eşiğine ulaşmak için birden fazla taşınmaz alınabilir; değerlerin toplamı dikkate alınır.' },
  { baslik: 'Sağlık Sigortası Zorunluluğu', aciklama: 'Kısa dönem oturma izni için Türkiye\'yi kapsayan geçerli sağlık sigortası şarttır.' },
];

export default function OturmaIzniGayrimenkulPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-14">
          <p className="text-[#00C49F] text-xs font-bold mb-3 uppercase tracking-widest">Yabancı Yatırımcı</p>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">Oturma İzni ve Gayrimenkul Rehberi</h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed">
            Türkiye&apos;de gayrimenkul alımı ile oturma izni ve vatandaşlık başvurusu: koşullar, süreç ve pratik bilgiler.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-10 space-y-10">

        {/* Alım Koşulları */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-base font-black text-gray-900 mb-1">Yabancıların Taşınmaz Edinim Koşulları</h2>
          <p className="text-xs text-gray-400 mb-5">Türkiye&apos;de taşınmaz satın alabilecek yabancı uyruklu kişiler ve sınırlılıklar.</p>
          <div className="space-y-4">
            {ALIM_KOŞULLARI.map((k, i) => (
              <div key={i} className="border border-gray-100 rounded-xl p-4">
                <div className="flex items-start justify-between mb-2">
                  <p className="text-xs font-black text-gray-900">{k.başlık}</p>
                  <span className="text-[9px] text-gray-400 shrink-0 ml-2">{k.kanun}</span>
                </div>
                <p className="text-[11px] text-gray-600 leading-relaxed">{k.aciklama}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Oturma İzni Türleri */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm overflow-x-auto">
          <h2 className="text-base font-black text-gray-900 mb-1">Oturma İzni ve Vatandaşlık Yolları</h2>
          <p className="text-xs text-gray-400 mb-5">Gayrimenkul yatırımı ile elde edilebilecek statüler.</p>
          <table className="w-full text-[10px] min-w-[440px]">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-2 font-black text-gray-500">Statü</th>
                <th className="text-center py-2 font-black text-gray-500">Süre</th>
                <th className="text-center py-2 font-black text-gray-500">Koşul</th>
                <th className="text-right py-2 font-black text-[#00C49F]">Not</th>
              </tr>
            </thead>
            <tbody>
              {OTURMA_IZNI_TURLERI.map((o, i) => (
                <tr key={i} className="border-b border-gray-50 last:border-0">
                  <td className="py-2 font-black text-gray-900">{o.tur}</td>
                  <td className="py-2 text-center font-bold text-[#00C49F]">{o.sure}</td>
                  <td className="py-2 text-center font-bold text-amber-500">{o.kosul}</td>
                  <td className="py-2 text-right font-bold text-gray-400">{o.aciklama}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Başvuru Adımları */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-base font-black text-gray-900 mb-1">Başvuru Süreci</h2>
          <p className="text-xs text-gray-400 mb-5">Oturma izni ve vatandaşlık başvurusu adımları.</p>
          <div className="space-y-4">
            {BASVURU_ADIMLARI.map((a) => (
              <div key={a.adim} className="flex gap-3">
                <span className="w-6 h-6 rounded-full bg-[#00C49F] text-white text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5">{a.adim}</span>
                <div>
                  <p className="text-xs font-black text-gray-900 mb-0.5">{a.baslik}</p>
                  <p className="text-[11px] text-gray-500 leading-relaxed">{a.aciklama}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pratik Bilgiler */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-base font-black text-gray-900 mb-1">Pratik Bilgiler</h2>
          <p className="text-xs text-gray-400 mb-5">Yabancı yatırımcıların sık karşılaştığı durumlar.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PRATIK_BILGILER.map((p, i) => (
              <div key={i} className="border border-gray-100 rounded-xl p-4">
                <p className="text-xs font-black text-gray-900 mb-1">{p.baslik}</p>
                <p className="text-[11px] text-gray-500 leading-relaxed">{p.aciklama}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5">
          <p className="text-xs font-black text-amber-700 mb-2">Hukuki Uyarı</p>
          <p className="text-[11px] text-amber-600 leading-relaxed">
            Yabancı yatırımcı mevzuatı sık güncellenmektedir. Vatandaşlık veya oturma izni başvurusu yapmadan önce Göç İdaresi Genel Müdürlüğü&apos;nün (goc.gov.tr) güncel düzenlemelerini ve bir göçmenlik avukatının görüşünü alınız.
          </p>
        </div>

      </div>
    </main>
  );
}
