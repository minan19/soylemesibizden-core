import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Konut Kredisi Erken Ödeme Rehberi 2025 | Faiz Tasarrufu | Söylemesi Bizden',
  description:
    'Konut kredisi erken ödeme: erken kapama ücreti, kısmi ödeme avantajları, faiz tasarrufu hesabı ve banka uygulamaları.',
};

const ERKEN_ODEME_TURLERI = [
  {
    tur: 'Tam Erken Kapatma',
    tanim: 'Kalan borcun tamamının tek seferde ödenerek kredinin kapatılmasıdır.',
    ucret: 'Sabit: %2 | Değişken: %0',
    tasarruf: 'Kalan tüm faiz yükü ortadan kalkar',
    uygunluk: 'Büyük nakit varlığı olanlara',
  },
  {
    tur: 'Kısmi Erken Ödeme',
    tanim: 'Anapara tutarının bir kısmının ekstra ödenerek vade veya taksit azaltılmasıdır.',
    ucret: 'Sabit: %2 | Değişken: %0',
    tasarruf: 'Kısmi faiz tasarrufu; esneklik sağlar',
    uygunluk: 'Düzenli ek geliri olanlara',
  },
  {
    tur: 'Vade Kısaltma',
    tanim: 'Aynı taksit tutarı korunarak ödeme planının öne çekilmesidir.',
    ucret: 'Erken ödeme ücreti uygulanmaz',
    tasarruf: 'Toplam faiz önemli ölçüde düşer',
    uygunluk: 'Taksit yükü tolere edilebilenlere',
  },
  {
    tur: 'Taksit Artırımı',
    tanim: 'Aylık taksit miktarının artırılarak anapara daha hızlı eritilmesidir.',
    ucret: 'Erken ödeme ücreti uygulanmaz',
    tasarruf: 'Kümülatif faiz birikimini azaltır',
    uygunluk: 'Geliri artan borçlulara',
  },
];

const ERKEN_ODEME_UCRETI = [
  { krediTuru: 'Sabit Faizli Konut Kredisi', oran: '%2 (azami)', kapsam: 'Kalan anapara üzerinden', not: 'BDDK kılavuzu 2021' },
  { krediTuru: 'Değişken Faizli Konut Kredisi', oran: '%0', kapsam: 'Ücretsiz', not: '5411 sayılı Bankacılık Kanunu' },
  { krediTuru: 'Karma (ilk dönem sabit)', oran: 'Sabit dönemde %2', kapsam: 'Sabit dönem kalan anapara', not: 'Değişken döneme geçince %0' },
];

const TASARRUF_ORNEKLERI = [
  {
    senaryo: '1.000.000 ₺ kredi, %3.5 aylık, 120 ay',
    kalanAy: 60,
    kalanAnapara: '580.000 ₺',
    erkenOdemeCeza: '11.600 ₺ (%2)',
    faizTasarrufu: '~210.000 ₺',
    netKazanc: '~198.400 ₺',
  },
  {
    senaryo: '2.000.000 ₺ kredi, %3.2 aylık, 180 ay',
    kalanAy: 90,
    kalanAnapara: '1.350.000 ₺',
    erkenOdemeCeza: '27.000 ₺ (%2)',
    faizTasarrufu: '~520.000 ₺',
    netKazanc: '~493.000 ₺',
  },
  {
    senaryo: '500.000 ₺ kredi, değişken faiz, 84 ay',
    kalanAy: 36,
    kalanAnapara: '210.000 ₺',
    erkenOdemeCeza: '0 ₺',
    faizTasarrufu: '~65.000 ₺',
    netKazanc: '~65.000 ₺',
  },
];

const KISMI_ODEME_STRATEJILERI = [
  {
    strateji: 'İkramiye / Prim ile Ödeme',
    aciklama: 'Yıllık ikramiye veya prim geliri alındığında kısmini anaparaya eklemek uzun vadede büyük tasarruf sağlar.',
    tavsiye: 'İkramiyenin %50–70\'ini erken ödemeye ayırın',
  },
  {
    strateji: 'Ek Gelir Dönemlerinde Ödeme',
    aciklama: 'Serbest meslek veya ek iş gelirleri düzenli olmasa da, geldikçe kısmi anapara ödemesi yapmak birikimli etkiyle faiz yükünü azaltır.',
    tavsiye: 'Her 6 ayda bir en az 1 taksit tutarı ekstra ödeme hedefleyin',
  },
  {
    strateji: 'Refinansman Sonrası Erken Ödeme',
    aciklama: 'Düşük faizle refinansman yapıldıktan sonra eski taksit tutarını koruyarak aradaki farkı anaparaya yönlendirmek çift tasarruf etkisi yaratır.',
    tavsiye: 'Faiz farkı en az 0.3–0.5 puan ise refinansman değerlendirin',
  },
  {
    strateji: 'Vade Başında Erken Ödeme',
    aciklama: 'Anaparanın en yüksek, faiz bileşeninin de en yüksek olduğu vade başında yapılan erken ödemeler en yüksek tasarrufu sağlar.',
    tavsiye: 'İlk 36 ayda yapılan her ekstra ödeme en yüksek ROI\'li karardır',
  },
];

const SSS = [
  {
    soru: 'Erken ödeme ücreti kredinin tamamı için mi hesaplanır?',
    cevap: 'Hayır, yalnızca ödeme tarihindeki kalan anapara bakiyesi üzerinden hesaplanır; ödenmiş faizler dahil edilmez.',
  },
  {
    soru: 'Kısmi erken ödeme sonrası vade mi azalır taksit mi?',
    cevap: 'Banka tercih ettikçe vadeyi veya taksiti düşürür. Faiz tasarrufu açısından vadeyi kısaltmak daha avantajlıdır; bankadan açıkça talep edin.',
  },
  {
    soru: 'Erken ödeme faiz indirimi için vergi avantajı var mı?',
    cevap: 'Bireysel kullanıcılar için konut kredisi faizine özel vergi indirimi yoktur. Ancak ödenen kredi masrafları gayrimenkul satışında maliyet olarak dikkate alınabilir.',
  },
  {
    soru: 'Değişken faizli kredide erken ödeme ücreti neden sıfır?',
    cevap: 'Bankacılık mevzuatı, değişken faizli kredilerde erken ödeme ücreti alınmasını yasaklamaktadır. Sabit faizli kredilerde ise azami %2 uygulanabilir.',
  },
  {
    soru: 'Erken ödeme yaparsam sigorta primleri iade edilir mi?',
    cevap: 'Hayat sigortası ve konut sigortası primleri kalan vadeye orantılı olarak kısmen iade edilebilir; sigortacıya başvurmanız gerekir.',
  },
];

export default function KonutKredisiErkenOdemePage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-14">
          <p className="text-[#00C49F] text-xs font-bold mb-3 uppercase tracking-widest">Kredi Rehberi 2025</p>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">Konut Kredisi Erken Ödeme</h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed">
            Erken kapama, kısmi ödeme ve vade kısaltma stratejileri: faiz tasarrufu, ceza hesabı ve banka uygulamaları.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">

        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-base font-black text-gray-900 mb-4">Erken Ödeme Türleri</h2>
          <div className="space-y-3">
            {ERKEN_ODEME_TURLERI.map((t, i) => (
              <div key={i} className="border border-gray-100 rounded-xl p-4">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-xs font-black text-gray-900">{t.tur}</p>
                  <span className="text-[9px] font-black text-[#00C49F] shrink-0 ml-4">{t.ucret}</span>
                </div>
                <p className="text-[11px] text-gray-500 mb-1">{t.tanim}</p>
                <p className="text-[10px] text-emerald-600 font-bold">{t.tasarruf}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm overflow-x-auto">
          <h2 className="text-base font-black text-gray-900 mb-1">Erken Ödeme Ücreti</h2>
          <p className="text-xs text-gray-400 mb-5">Kredi türüne göre yasal üst sınırlar.</p>
          <table className="w-full text-[10px] min-w-[440px]">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-2 font-black text-gray-500">Kredi Türü</th>
                <th className="text-center py-2 font-black text-gray-500">Oran</th>
                <th className="text-center py-2 font-black text-gray-500">Kapsam</th>
                <th className="text-right py-2 font-black text-[#00C49F]">Dayanak</th>
              </tr>
            </thead>
            <tbody>
              {ERKEN_ODEME_UCRETI.map((u, i) => (
                <tr key={i} className="border-b border-gray-50 last:border-0">
                  <td className="py-2 font-black text-gray-900">{u.krediTuru}</td>
                  <td className="py-2 text-center font-bold text-[#00C49F]">{u.oran}</td>
                  <td className="py-2 text-center text-gray-500">{u.kapsam}</td>
                  <td className="py-2 text-right text-gray-400">{u.not}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-base font-black text-gray-900 mb-4">Örnek Faiz Tasarrufu</h2>
          <div className="space-y-3">
            {TASARRUF_ORNEKLERI.map((t, i) => (
              <div key={i} className="border border-gray-100 rounded-xl p-4">
                <p className="text-[10px] font-black text-gray-700 mb-3">{t.senaryo}</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <div>
                    <p className="text-[9px] text-gray-400">Kalan Anapara</p>
                    <p className="text-[10px] font-bold text-gray-700">{t.kalanAnapara}</p>
                  </div>
                  <div>
                    <p className="text-[9px] text-gray-400">Ceza</p>
                    <p className="text-[10px] font-bold text-rose-500">{t.erkenOdemeCeza}</p>
                  </div>
                  <div>
                    <p className="text-[9px] text-gray-400">Faiz Tasarrufu</p>
                    <p className="text-[10px] font-bold text-[#00C49F]">{t.faizTasarrufu}</p>
                  </div>
                  <div>
                    <p className="text-[9px] text-gray-400">Net Kazanç</p>
                    <p className="text-[10px] font-bold text-emerald-600">{t.netKazanc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-base font-black text-gray-900 mb-4">Kısmi Ödeme Stratejileri</h2>
          <div className="space-y-3">
            {KISMI_ODEME_STRATEJILERI.map((s, i) => (
              <div key={i} className="border border-gray-100 rounded-xl p-4">
                <p className="text-xs font-black text-gray-900 mb-1">{s.strateji}</p>
                <p className="text-[11px] text-gray-500 mb-2">{s.aciklama}</p>
                <p className="text-[10px] text-[#00C49F] font-bold">→ {s.tavsiye}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-base font-black text-gray-900 mb-4">Sık Sorulan Sorular</h2>
          <div className="space-y-3">
            {SSS.map((s, i) => (
              <div key={i} className="border-b border-gray-50 pb-3 last:border-0 last:pb-0">
                <p className="text-xs font-black text-gray-900 mb-1">{s.soru}</p>
                <p className="text-[11px] text-gray-500 leading-relaxed">{s.cevap}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-5">
          <p className="text-xs font-black text-emerald-700 mb-2">Altın Kural</p>
          <p className="text-[11px] text-emerald-600 leading-relaxed">
            Değişken faizli kredilerde erken ödeme ücretsizdir; sabit faizli kredilerde ise %2 ceza, çoğunlukla elde edilecek faiz tasarrufunun çok altında kalır. Elinizdeki nakit için beklenen getiriyi konut kredisi faiz oranıyla karşılaştırın — kredi faizi alternatif getiriden yüksekse erken ödeme her zaman doğru karardır.
          </p>
        </div>

      </div>
    </main>
  );
}
