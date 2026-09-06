import { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck, CheckCircle, AlertTriangle, ArrowRight, Scale,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Enerji Kimlik Belgesi (EKB) Rehberi | A\'dan G\'ye Sınıflar, Maliyet | Söylemesi Bizden',
  description:
    'Enerji kimlik belgesi nedir, zorunlu mu? A\'dan G\'ye enerji sınıfları, satış ve kiralamada EKB şartı, yükseltme yöntemleri.',
};

const ENERJI_SINIFLARI = [
  { sinif: 'A+', renk: 'bg-green-700', metin: 'text-white', tuketim: '< 50 kWh/m²/yıl', aciklama: 'Neredeyse sıfır enerji binası (NZEB). Yenilenebilir enerji entegrasyonu zorunlu.' },
  { sinif: 'A', renk: 'bg-green-600', metin: 'text-white', tuketim: '50–75 kWh/m²/yıl', aciklama: 'Pasif ev standardına yakın. Üst düzey yalıtım, verimli ısıtma sistemi.' },
  { sinif: 'B', renk: 'bg-green-400', metin: 'text-gray-800', tuketim: '75–100 kWh/m²/yıl', aciklama: 'Yeni yapılar için minimum standart. Modern yalıtım ve çift cam sistemleri.' },
  { sinif: 'C', renk: 'bg-yellow-400', metin: 'text-gray-800', tuketim: '100–150 kWh/m²/yıl', aciklama: 'Orta düzey enerji verimliliği. 2010+ yapılarda yaygın.' },
  { sinif: 'D', renk: 'bg-orange-400', metin: 'text-white', tuketim: '150–200 kWh/m²/yıl', aciklama: 'Ortanın altı. Çoğu 2000\'li yıllar yapısı bu bandda yer alır.' },
  { sinif: 'E', renk: 'bg-orange-600', metin: 'text-white', tuketim: '200–250 kWh/m²/yıl', aciklama: 'Yetersiz yalıtım. Isınma maliyeti yüksek; tadilat önerilir.' },
  { sinif: 'F', renk: 'bg-red-500', metin: 'text-white', tuketim: '250–350 kWh/m²/yıl', aciklama: 'Eski yapı tipi. Isınma faturası çok yüksek; acil önlem gerekir.' },
  { sinif: 'G', renk: 'bg-red-700', metin: 'text-white', tuketim: '> 350 kWh/m²/yıl', aciklama: 'En düşük enerji verimliliği. Yıkım veya kapsamlı yenileme gerekebilir.' },
];

const ZORUNLULUKLAR = [
  {
    durum: 'Satış İşlemleri',
    zorunlu: true,
    detay: '2017\'den itibaren tüm konut ve işyeri satışlarında EKB zorunlu. Tapuya eklenmesi gerekir.',
  },
  {
    durum: 'Kira İşlemleri',
    zorunlu: true,
    detay: 'Kira sözleşmesinde EKB bilgisi belirtilmeli. İlan yayınlamada sınıf gösterimi zorunlu.',
  },
  {
    durum: 'Yeni İnşaat',
    zorunlu: true,
    detay: 'İnşaat ruhsatı için enerji performans projesi sunulması şart; minimum B sınıfı hedeflenir.',
  },
  {
    durum: 'Tadilat / Renovasyon',
    zorunlu: false,
    detay: 'Binada büyük çaplı tadilat yapılıyorsa EKB güncellenmesi gerekebilir.',
  },
  {
    durum: 'Kamu Binaları',
    zorunlu: true,
    detay: 'Tüm kamu binaları 2023 itibarıyla EKB\'ye sahip olmak zorunda.',
  },
];

const SUREC_ADIMLARI = [
  { adim: 'Yetkili Firma Seçimi', detay: 'Enerji Kimlik Belgesi düzenlemeye yetkili firma listesi Çevre, Şehircilik ve İklim Değişikliği Bakanlığı web sitesinden sorgulanabilir.' },
  { adim: 'Yerinde İnceleme', detay: 'Yetkili mühendis binayı inceler; ısıtma sistemi, yalıtım, pencere, aydınlatma ve mekanik sistemler değerlendirilir.' },
  { adim: 'Hesaplama ve Sınıf Belirleme', detay: 'Ulusal Bina Enerji Performansı Hesaplama Yöntemi (UBEPHesap) kullanılarak puan hesaplanır.' },
  { adim: 'Belge Düzenleme', detay: 'Bakanlığın sistemine kayıt; A'dan G'ye sınıf belirtilir. Resmi mühür ve imza zorunlu.' },
  { adim: 'Teslim', detay: 'Belge sahibine teslim. Geçerlilik süresi 10 yıl; büyük tadilat sonrası yenilenmelidir.' },
];

const YUKSELTME_YOLLARI = [
  { yontem: 'Dış Cephe Yalıtımı', beklenenKazanim: '1–2 sınıf', maliyet: '500–1.500 ₺/m²', sure: '2–4 hafta' },
  { yontem: 'Çift / Üçlü Cam', beklenenKazanim: '0.5–1 sınıf', maliyet: '3.000–8.000 ₺/pencere', sure: '1–2 gün/pencere' },
  { yontem: 'Yoğuşmalı Kombi', beklenenKazanim: '0.5–1 sınıf', maliyet: '15.000–35.000 ₺', sure: '1–2 gün' },
  { yontem: 'Isı Pompası', beklenenKazanim: '1–2 sınıf', maliyet: '80.000–200.000 ₺', sure: '3–5 gün' },
  { yontem: 'Çatı / Tavan Yalıtımı', beklenenKazanim: '0.5–1 sınıf', maliyet: '200–600 ₺/m²', sure: '1–3 gün' },
  { yontem: 'Güneş Enerjisi Paneli', beklenenKazanim: '1–2 sınıf', maliyet: '150.000–400.000 ₺', sure: '2–3 gün kurulum' },
];

const EKONOMIK_ETKI = [
  { sinif: 'A', aylikIsitmaTahmini: 400, yillikTasarruf: null },
  { sinif: 'B', aylikIsitmaTahmini: 600, yillikTasarruf: 2400 },
  { sinif: 'C', aylikIsitmaTahmini: 900, yillikTasarruf: 3600 },
  { sinif: 'D', aylikIsitmaTahmini: 1300, yillikTasarruf: 4800 },
  { sinif: 'E', aylikIsitmaTahmini: 1800, yillikTasarruf: 6000 },
  { sinif: 'F', aylikIsitmaTahmini: 2500, yillikTasarruf: 8400 },
  { sinif: 'G', aylikIsitmaTahmini: 3500, yillikTasarruf: 12000 },
];

const fmt = (n: number) => n.toLocaleString('tr-TR');

export default function EnerjiKimlikBelgesiPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-2 bg-[#00C49F]/20 border border-[#00C49F]/30 text-[#00C49F] text-xs font-bold px-4 py-1.5 rounded-full mb-5">
            <ShieldCheck size={13} /> EKB Rehberi
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
            Enerji Kimlik Belgesi (EKB)
          </h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed mb-8">
            A'dan G'ye enerji sınıfları, zorunluluklar, belgeleme süreci ve enerji verimliliğini artırma yolları.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-[#00C49F]">10 Yıl</p>
              <p className="text-xs text-gray-400">Geçerlilik süresi</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-white">A+ → G</p>
              <p className="text-xs text-gray-400">8 enerji sınıfı</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-amber-400">2017</p>
              <p className="text-xs text-gray-400">Satışta zorunluluk</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">

        {/* Enerji Sınıfları */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Enerji Sınıfları</h2>
          <div className="space-y-2">
            {ENERJI_SINIFLARI.map((s, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 p-3 shadow-sm flex items-center gap-4">
                <div className={`${s.renk} ${s.metin} text-sm font-black w-10 h-10 rounded-lg flex items-center justify-center shrink-0`}>
                  {s.sinif}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="text-xs font-black text-gray-900">{s.tuketim}</p>
                  </div>
                  <p className="text-[10px] text-gray-600 leading-relaxed">{s.aciklama}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Zorunluluklar */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">EKB Zorunluluğu Ne Zaman?</h2>
          <div className="space-y-3">
            {ZORUNLULUKLAR.map((z, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm flex items-start gap-3">
                <div className={`text-[10px] font-black px-2 py-1 rounded-lg shrink-0 ${z.zorunlu ? 'bg-rose-100 text-rose-600' : 'bg-gray-100 text-gray-500'}`}>
                  {z.zorunlu ? 'ZORUNLU' : 'OPSİYONEL'}
                </div>
                <div>
                  <p className="text-xs font-black text-gray-900 mb-0.5">{z.durum}</p>
                  <p className="text-[10px] text-gray-600 leading-relaxed">{z.detay}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Süreç */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Belgeleme Süreci</h2>
          <div className="space-y-3">
            {SUREC_ADIMLARI.map((s, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm flex items-start gap-3">
                <div className="bg-[#F0FDF8] text-[#00C49F] text-[10px] font-black px-2 py-1 rounded-lg shrink-0">{i + 1}</div>
                <div>
                  <p className="text-xs font-black text-gray-900 mb-0.5">{s.adim}</p>
                  <p className="text-[10px] text-gray-600 leading-relaxed">{s.detay}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Yükseltme Yolları */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Enerji Sınıfı Yükseltme Yolları</h2>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <table className="w-full text-xs">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left px-4 py-3 font-black text-gray-700">Yöntem</th>
                  <th className="text-left px-4 py-3 font-black text-gray-700">Kazanım</th>
                  <th className="text-left px-4 py-3 font-black text-gray-500">Maliyet</th>
                  <th className="text-left px-4 py-3 font-black text-gray-400">Süre</th>
                </tr>
              </thead>
              <tbody>
                {YUKSELTME_YOLLARI.map((y, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-4 py-3 font-bold text-gray-800">{y.yontem}</td>
                    <td className="px-4 py-3 text-[#00C49F] font-bold">{y.beklenenKazanim}</td>
                    <td className="px-4 py-3 text-gray-600">{y.maliyet}</td>
                    <td className="px-4 py-3 text-gray-500">{y.sure}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Ekonomik Etki */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4 flex items-center gap-2">
            <CheckCircle size={14} className="text-[#00C49F]" /> Tahmini Isıtma Maliyeti (100 m² Konut)
          </h2>
          <div className="space-y-2">
            {EKONOMIK_ETKI.map((e, i) => {
              const maxAylik = 3500;
              return (
                <div key={i} className="flex items-center gap-3">
                  <div className={`text-[10px] font-black w-6 text-center ${i === 0 ? 'text-green-600' : i <= 2 ? 'text-amber-600' : 'text-rose-500'}`}>{e.sinif}</div>
                  <div className="flex-1 bg-gray-100 rounded-full h-4 overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${(e.aylikIsitmaTahmini / maxAylik) * 100}%`,
                        backgroundColor: i === 0 ? '#16a34a' : i === 1 ? '#22c55e' : i === 2 ? '#f59e0b' : i === 3 ? '#f97316' : i === 4 ? '#ef4444' : '#dc2626',
                      }}
                    />
                  </div>
                  <span className="text-[10px] text-gray-600 w-20 text-right">₺{fmt(e.aylikIsitmaTahmini)}/ay</span>
                </div>
              );
            })}
          </div>
          <p className="text-[10px] text-gray-400 mt-3">Tahmini değerler; gerçek fatura ikliim, konum ve kullanım alışkanlığına göre değişir.</p>
        </section>

        {/* Warning */}
        <section className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
          <AlertTriangle size={14} className="text-amber-600 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-800 leading-relaxed">
            <span className="font-black">Önemli:</span> EKB olmadan tapu işlemi ve kira sözleşmesi yapılamaz. Satın aldığınız mülkün EKB sınıfını tapu devri öncesinde mutlaka kontrol edin; düşük sınıf hem enerji maliyeti hem de yeniden satışta dezavantaj yaratır.
          </p>
        </section>

        {/* Related */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-4">İlgili Rehberler</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { href: '/kentsel-donusum', label: 'Kentsel Dönüşüm Rehberi' },
              { href: '/konut-sigortasi', label: 'Konut Sigortası Rehberi' },
              { href: '/tapu-devir-sureci', label: 'Tapu Devir Süreci' },
              { href: '/deprem-riski', label: 'Deprem Riski Rehberi' },
              { href: '/ekspertiz-raporu', label: 'Ekspertiz Raporu' },
              { href: '/imar-durumu', label: 'İmar Durumu Rehberi' },
            ].map(l => (
              <Link key={l.href} href={l.href}
                className="flex items-center gap-2 p-3 rounded-xl bg-gray-50 hover:bg-[#F0FDF8] border border-transparent hover:border-[#00C49F]/20 transition-all group"
              >
                <ArrowRight size={12} className="text-gray-300 group-hover:text-[#00C49F] transition-colors shrink-0" />
                <span className="text-xs text-gray-700 group-hover:text-[#00C49F] font-medium transition-colors">{l.label}</span>
              </Link>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}
