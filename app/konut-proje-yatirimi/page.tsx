import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Konut Proje Yatırımı Rehberi 2025 | Ön Satış ve Değer Artışı | Söylemesi Bizden',
  description:
    'Konut projesine yatırım: ön satış fiyat avantajı, inşaat dönemi getirisi, risk faktörleri ve şehir bazlı fırsat analizi.',
};

const ON_SATIS_AVANTAJ = [
  {
    evre: 'Proje Aşaması (İlk %20)',
    iskonto: '%20–35',
    risk: 'En Yüksek',
    sure: '24–48 ay teslim',
    aciklama: 'Yalnızca maket ve görseller mevcut; teslim garantisi zayıf, ancak iskonto en cazip',
  },
  {
    evre: 'Temel Aşaması (%20–50)',
    iskonto: '%15–25',
    risk: 'Yüksek',
    sure: '18–36 ay teslim',
    aciklama: 'İnşaat başladı; iptal riski azaldı ama teslim belirsizliği devam eder',
  },
  {
    evre: 'Kaba İnşaat (%50–80)',
    iskonto: '%8–15',
    risk: 'Orta',
    sure: '12–24 ay teslim',
    aciklama: 'Yapı görünür; risk düştü, iskonto da azaldı',
  },
  {
    evre: 'İnce İşler / Teslim Yakını',
    iskonto: '%3–8',
    risk: 'Düşük',
    sure: '3–12 ay teslim',
    aciklama: 'Projenin sonu; iskonto minimum, değer artışı büyük ölçüde gerçekleşmiş',
  },
];

const GETIRI_HESABI = [
  {
    senaryo: 'Stanbul merkez, 48 ay proje, 2M₺ alış',
    alisFiyati: '2.000.000 ₺',
    teslimDegeri: '3.200.000 ₺',
    toplamGetiri: '%60',
    yillikGetiri: '%12.5',
    not: 'Enflasyon düzeltmesi çıkarılmamış',
  },
  {
    senaryo: 'İzmir sahil, 36 ay proje, 3M₺ alış',
    alisFiyati: '3.000.000 ₺',
    teslimDegeri: '4.500.000 ₺',
    toplamGetiri: '%50',
    yillikGetiri: '%14.3',
    not: 'Sahil lokasyon premium dahil',
  },
  {
    senaryo: 'Ankara çevre, 24 ay proje, 1,5M₺ alış',
    alisFiyati: '1.500.000 ₺',
    teslimDegeri: '2.100.000 ₺',
    toplamGetiri: '%40',
    yillikGetiri: '%18.3',
    not: 'Kısa vade, görece düşük nominal',
  },
];

const RISK_FAKTÖRLERI = [
  {
    risk: 'Müteahhit İflası',
    onem: 'Kritik',
    onlem: 'Müteahhit finansal sağlığını araştır; banka kredi desteği olan projeleri tercih et; ön satış ödemelerini noterde güvence altına al',
  },
  {
    risk: 'Proje Değişikliği',
    onem: 'Yüksek',
    onlem: 'Sözleşmede değişiklik hakkını sınırla; teknik şartnameyi ek olarak al ve onaylat',
  },
  {
    risk: 'Teslim Gecikmesi',
    onem: 'Yüksek',
    onlem: 'Sözleşmede günlük gecikme cezası maddesi eklet; kira giderini hesaba kat',
  },
  {
    risk: 'Piyasa Dönüşü',
    onem: 'Orta',
    onlem: 'Uzun vadeli lokasyon analizi yap; piyasa zirvesinde ön satış almaktan kaçın',
  },
  {
    risk: 'Faiz Artışı (Kredi Kullananlar)',
    onem: 'Orta',
    onlem: 'Değişken faizli krediyle uzun teslim süresine girme; faiz senaryosu analizi yap',
  },
  {
    risk: 'İmar Değişikliği',
    onem: 'Düşük',
    onlem: 'Projenin inşaat ruhsatı alınmış olduğunu teyit et; imar planı değişikliği ihtimalini araştır',
  },
];

const SEHIR_FIRSAT = [
  { sehir: 'İstanbul (Avrupa)', notlar: 'Metro/kentsel dönüşüm bölgeleri cazip; erken evre projelerde %25+ iskonto olası' },
  { sehir: 'İstanbul (Anadolu)', notlar: 'Kadıköy–Ataşehir koridoru değer artışını sürdürüyor; teslim gecikmesi riski yüksek' },
  { sehir: 'İzmir Sahil', notlar: 'Kıyı projeleri yabancı alıcı talebiyle destekleniyor; dolar bazlı değerleme avantajlı' },
  { sehir: 'Ankara Çankaya', notlar: 'Kamu personeli kiraya istikrar sağlıyor; düşük fiyat/kira oranı proje değerlemesini güçleştirebilir' },
  { sehir: 'Antalya Sahil', notlar: 'Turizm ve yabancı talep güçlü; kısa dönem kiralama getirisi cazip; mevsimsel boşluk riski var' },
  { sehir: 'Bursa Nilüfer', notlar: 'Sanayi yakınlığı ve üniversite talebi; İstanbul\'a alternatif olarak değer kazanıyor' },
];

const SSS = [
  {
    soru: 'Ön satış yatırımında ne zaman satmalıyım?',
    cevap: 'En yüksek sermaye kazancı genellikle teslim tarihinden 3–6 ay öncesinde veya teslimde gerçekleşir. Teslim sonrası kira getirisine geçmek veya amortisman hesabı yaparak uzun vadede tutmak da yaygın stratejidir.',
  },
  {
    soru: 'Banka kredisiyle ön satış alınabilir mi?',
    cevap: 'Evet. Bankalar kat irtifakı tesis edilmiş projelerde inşaat aşamasında kredi verebilir. Ancak iskan belgesi alınmadan tapu devri gerçekleşmez; bankalar bu durumda koşullu taahhüt mektubu verir.',
  },
  {
    soru: 'Yabancı uyruklu yatırımcı ön satış alabilir mi?',
    cevap: 'Evet, ancak tapu tescili için inşaat tamamlanmalı ve iskan belgesi alınmış olmalıdır. Ön satış döneminde ödeme yapabilirler; tapu devri teslimde gerçekleşir.',
  },
];

export default function KonutProjeYatirimiPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-14">
          <p className="text-[#00C49F] text-xs font-bold mb-3 uppercase tracking-widest">Yatırım Rehberi 2025</p>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">Konut Proje Yatırımı</h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed">
            Ön satış iskontoları, inşaat dönemi getirisi, risk faktörleri ve şehir bazlı fırsat analizi: proje yatırımcısı için rehber.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">

        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-base font-black text-gray-900 mb-4">İnşaat Evresine Göre İskonto</h2>
          <div className="space-y-3">
            {ON_SATIS_AVANTAJ.map((e, i) => (
              <div key={i} className="border border-gray-100 rounded-xl p-4">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-xs font-black text-gray-900">{e.evre}</p>
                  <div className="flex gap-2 shrink-0 ml-3">
                    <span className="text-[9px] font-black text-[#00C49F]">{e.iskonto}</span>
                    <span className={`text-[9px] font-black px-1.5 py-0.5 rounded ${e.risk === 'En Yüksek' ? 'bg-rose-500 text-white' : e.risk === 'Yüksek' ? 'bg-amber-400 text-white' : e.risk === 'Orta' ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-500'}`}>{e.risk}</span>
                  </div>
                </div>
                <p className="text-[10px] text-[#00C49F] font-bold mb-1">Teslim: {e.sure}</p>
                <p className="text-[11px] text-gray-500">{e.aciklama}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-base font-black text-gray-900 mb-4">Örnek Getiri Senaryoları</h2>
          <div className="space-y-3">
            {GETIRI_HESABI.map((g, i) => (
              <div key={i} className="border border-gray-100 rounded-xl p-4">
                <p className="text-[10px] font-black text-gray-700 mb-3">{g.senaryo}</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <div>
                    <p className="text-[9px] text-gray-400">Alış Fiyatı</p>
                    <p className="text-[10px] font-bold text-gray-700">{g.alisFiyati}</p>
                  </div>
                  <div>
                    <p className="text-[9px] text-gray-400">Teslim Değeri</p>
                    <p className="text-[10px] font-bold text-gray-700">{g.teslimDegeri}</p>
                  </div>
                  <div>
                    <p className="text-[9px] text-gray-400">Toplam Getiri</p>
                    <p className="text-[10px] font-bold text-[#00C49F]">{g.toplamGetiri}</p>
                  </div>
                  <div>
                    <p className="text-[9px] text-gray-400">Yıllık Getiri</p>
                    <p className="text-[10px] font-bold text-emerald-600">{g.yillikGetiri}</p>
                  </div>
                </div>
                <p className="text-[9px] text-gray-400 mt-2 italic">{g.not}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-base font-black text-gray-900 mb-4">Risk Faktörleri ve Önlemler</h2>
          <div className="space-y-3">
            {RISK_FAKTÖRLERI.map((r, i) => (
              <div key={i} className="border border-gray-100 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <p className="text-xs font-black text-gray-900">{r.risk}</p>
                  <span className={`text-[9px] font-black px-2 py-0.5 rounded shrink-0 ${r.onem === 'Kritik' ? 'bg-rose-500 text-white' : r.onem === 'Yüksek' ? 'bg-amber-400 text-white' : r.onem === 'Orta' ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-500'}`}>{r.onem}</span>
                </div>
                <p className="text-[11px] text-gray-500">{r.onlem}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-base font-black text-gray-900 mb-4">Şehir Bazlı Fırsat Analizi</h2>
          <div className="space-y-2">
            {SEHIR_FIRSAT.map((s, i) => (
              <div key={i} className="flex gap-3 py-2 border-b border-gray-50 last:border-0">
                <p className="text-[10px] font-black text-gray-700 w-32 shrink-0">{s.sehir}</p>
                <p className="text-[11px] text-gray-500">{s.notlar}</p>
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
          <p className="text-xs font-black text-emerald-700 mb-2">Temel İlke</p>
          <p className="text-[11px] text-emerald-600 leading-relaxed">
            Proje yatırımında en kritik karar lokasyon ve müteahhit seçimidir; iskonto oranı ikincil faktördür. %30 iskonto sunan ama güvenilirliği şüpheli bir proje, %10 iskonto sunan güçlü bir müteahhidin projesinden çok daha risklidir. Kâr marjı büyük, hata payı sıfıra yakın bir yatırım kategorisidir.
          </p>
        </div>

      </div>
    </main>
  );
}
