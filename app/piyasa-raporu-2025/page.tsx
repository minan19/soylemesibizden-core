import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, TrendingUp, BarChart2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Türkiye Gayrimenkul Piyasası Raporu 2025 | Fiyat Trendi, Beklenti | Söylemesi Bizden',
  description:
    'Türkiye gayrimenkul piyasası 2025 raporu: şehir bazlı fiyat trendleri, kira getirisi, yabancı yatırımcı eğilimleri ve 2025 beklentileri.',
};

const SEHIR_TRENDLER = [
  { sehir: 'İstanbul', m2Ort: 75000, yillikArtis: 45, kiraGetirisi: 4.2, talep: 'Yüksek' },
  { sehir: 'Ankara', m2Ort: 42000, yillikArtis: 38, kiraGetirisi: 5.1, talep: 'Orta' },
  { sehir: 'İzmir', m2Ort: 55000, yillikArtis: 42, kiraGetirisi: 4.5, talep: 'Yüksek' },
  { sehir: 'Antalya', m2Ort: 50000, yillikArtis: 50, kiraGetirisi: 5.5, talep: 'Çok Yüksek' },
  { sehir: 'Bursa', m2Ort: 36000, yillikArtis: 36, kiraGetirisi: 5.8, talep: 'Orta' },
  { sehir: 'Bodrum', m2Ort: 90000, yillikArtis: 55, kiraGetirisi: 3.8, talep: 'Yüksek' },
  { sehir: 'Gaziantep', m2Ort: 28000, yillikArtis: 32, kiraGetirisi: 6.2, talep: 'Orta' },
  { sehir: 'Kocaeli', m2Ort: 40000, yillikArtis: 35, kiraGetirisi: 5.5, talep: 'Orta' },
];

const PIYASA_GOSTERGELER = [
  { gosterge: 'Satış İşlem Hacmi', deger: '1.2 Milyon', yoy: '+8%', yorum: 'Yabancı alımlar dahil 2024 tahmini' },
  { gosterge: 'Ortalama Satış Süresi', deger: '45 Gün', yoy: '-12%', yorum: 'Talep yüksekliği süreyi kısalttı' },
  { gosterge: 'Konut Kredisi Kullanımı', deger: '280 Milyar ₺', yoy: '+22%', yorum: 'Yüksek faize rağmen artış' },
  { gosterge: 'Yabancı Alım Sayısı', deger: '35.000+', yoy: '+5%', yorum: 'Rus ve Arap alımları öne çıktı' },
  { gosterge: 'Yeni Proje Sayısı', deger: '2.800+', yoy: '-5%', yorum: 'İnşaat maliyeti artışı fren etti' },
  { gosterge: 'Kentsel Dönüşüm Hızı', deger: '450.000 konut', yoy: '+30%', yorum: 'Deprem sonrası ivme arttı' },
];

const BEKLENTILER_2025 = [
  { alan: 'Fiyat Artışı', beklenti: '%30–40', aciklama: 'Enflasyonun gerilemesiyle birlikte reel getiri artmaya başlayabilir.' },
  { alan: 'Faiz Oranları', beklenti: '%3.5–4.5', aciklama: 'TCMB faiz indirimi senaryosunda konut kredisi faizleri gerileyebilir.' },
  { alan: 'Kira Artışı', beklenti: '%25–35', aciklama: '%25 tavan devam ederse yasal; arzın artmasıyla baskı azalabilir.' },
  { alan: 'Yabancı Yatırım', beklenti: 'Artış', aciklama: 'Vatandaşlık programı ve döviz avantajı talebi canlı tutacak.' },
  { alan: 'Kentsel Dönüşüm', beklenti: 'Hızlanma', aciklama: '6306 sayılı Kanun kapsamındaki projeler ivme kazanacak.' },
];

const SEKTOR_ANALIZ = [
  { sektor: 'Konut', durum: 'Güçlü', aciklama: 'Talep arz açığı sürmekte; özellikle İstanbul ve Antalya\'da stoğun altında fiyat sıçraması bekleniyor.' },
  { sektor: 'Ticari (AVM)', durum: 'Zorlu', aciklama: 'E-ticaret baskısı devam ediyor; deneyim odaklı konseptler öne çıkıyor.' },
  { sektor: 'Lojistik/Depo', durum: 'Çok Güçlü', aciklama: 'E-ticaret ve ihracat büyümesiyle lojistik gayrimenkul talebi rekor kırıyor.' },
  { sektor: 'Otel/Turizm', durum: 'Güçlü', aciklama: 'Turizm rekorları otel doluluk oranlarını yüksek tutuyor; yatırım getirileri artıyor.' },
  { sektor: 'Ofis', durum: 'Dengeli', aciklama: 'Hibrit çalışma modeli A sınıfı ofislerde talebi canlı tutarken B sınıfı boşlukları artıyor.' },
];

export default function PiyasaRaporu2025Page() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-2 bg-[#00C49F]/20 border border-[#00C49F]/30 text-[#00C49F] text-xs font-bold px-4 py-1.5 rounded-full mb-5">
            <BarChart2 size={13} /> Piyasa Raporu 2025
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
            Türkiye Gayrimenkul Piyasası Raporu 2025
          </h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed mb-8">
            Şehir bazlı fiyat trendleri, piyasa göstergeleri, sektör analizi ve 2025 beklentileri.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-[#00C49F]">1.2M</p>
              <p className="text-xs text-gray-400">Satış işlemi (2024)</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-white">35K+</p>
              <p className="text-xs text-gray-400">Yabancı alım</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-amber-400">%45</p>
              <p className="text-xs text-gray-400">İst. yıllık artış</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">

        {/* Şehir Trendleri */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm overflow-x-auto">
          <h2 className="text-sm font-black text-gray-900 mb-4">Şehir Bazlı Fiyat ve Getiri Tablosu</h2>
          <table className="w-full text-[10px] min-w-[500px]">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-2 font-black text-gray-500">Şehir</th>
                <th className="text-right py-2 font-black text-gray-500">Ort. ₺/m²</th>
                <th className="text-right py-2 font-black text-gray-500">Yıllık Artış</th>
                <th className="text-right py-2 font-black text-gray-500">Kira Getirisi</th>
                <th className="text-center py-2 font-black text-gray-500">Talep</th>
              </tr>
            </thead>
            <tbody>
              {SEHIR_TRENDLER.map((s, i) => (
                <tr key={i} className="border-b border-gray-50">
                  <td className="py-2 font-black text-gray-900">{s.sehir}</td>
                  <td className="py-2 text-right font-bold text-gray-700">{s.m2Ort.toLocaleString('tr-TR')} ₺</td>
                  <td className="py-2 text-right font-black text-[#00C49F]">%{s.yillikArtis}</td>
                  <td className="py-2 text-right font-bold text-blue-600">%{s.kiraGetirisi}</td>
                  <td className="py-2 text-center">
                    <span className={`text-[10px] font-black px-1.5 py-0.5 rounded ${s.talep === 'Çok Yüksek' ? 'bg-[#F0FDF8] text-[#00C49F]' : s.talep === 'Yüksek' ? 'bg-blue-50 text-blue-600' : 'bg-amber-50 text-amber-600'}`}>
                      {s.talep}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-[10px] text-gray-400 mt-2">* 2024 verileri tahminidir; kaynak: REIDIN, TÜİK, Sahibinden.com endeksi.</p>
        </section>

        {/* Piyasa Göstergeleri */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4">2024 Piyasa Göstergeleri</h2>
          <div className="space-y-3">
            {PIYASA_GOSTERGELER.map((g, i) => (
              <div key={i} className="grid grid-cols-4 gap-2 py-2 border-b border-gray-50 last:border-0">
                <p className="text-xs font-black text-gray-900">{g.gosterge}</p>
                <p className="text-xs font-black text-[#00C49F]">{g.deger}</p>
                <p className={`text-xs font-black ${g.yoy.startsWith('+') ? 'text-green-500' : 'text-rose-500'}`}>{g.yoy} YoY</p>
                <p className="text-[10px] text-gray-500">{g.yorum}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 2025 Beklentileri */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4 flex items-center gap-2">
            <TrendingUp size={16} className="text-[#00C49F]" /> 2025 Beklentileri
          </h2>
          <div className="space-y-3">
            {BEKLENTILER_2025.map((b, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
                <div className="flex items-start justify-between mb-1">
                  <p className="text-xs font-black text-gray-900">{b.alan}</p>
                  <span className="text-xs font-black text-[#00C49F] shrink-0">{b.beklenti}</span>
                </div>
                <p className="text-[10px] text-gray-600 leading-relaxed">{b.aciklama}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Sektör Analizi */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4">Sektör Bazlı Analiz</h2>
          <div className="space-y-3">
            {SEKTOR_ANALIZ.map((s, i) => (
              <div key={i} className="grid grid-cols-3 gap-2 py-2 border-b border-gray-50 last:border-0">
                <div>
                  <p className="text-xs font-black text-gray-900">{s.sektor}</p>
                  <span className={`text-[10px] font-black px-1.5 py-0.5 rounded inline-block mt-0.5 ${s.durum === 'Çok Güçlü' ? 'bg-[#F0FDF8] text-[#00C49F]' : s.durum === 'Güçlü' ? 'bg-blue-50 text-blue-600' : s.durum === 'Zorlu' ? 'bg-rose-50 text-rose-500' : 'bg-amber-50 text-amber-600'}`}>
                    {s.durum}
                  </span>
                </div>
                <p className="text-[10px] text-gray-600 leading-relaxed col-span-2">{s.aciklama}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Related */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-4">İlgili Sayfalar</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { href: '/piyasa', label: 'Türkiye Gayrimenkul Piyasası' },
              { href: '/fiyat-trendi', label: 'Fiyat Trendi Analizi' },
              { href: '/mahalle-analizi', label: 'Mahalle Analizi' },
              { href: '/istatistikler', label: 'Platform İstatistikleri' },
              { href: '/bolge-getiri-karsilastir', label: 'Bölge Getiri Karşılaştırması' },
              { href: '/yabanci-yatirimci-rehberi', label: 'Yabancı Yatırımcı Rehberi' },
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
