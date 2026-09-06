import { Metadata } from 'next';
import Link from 'next/link';
import {
  Home, CheckCircle, AlertTriangle, ArrowRight, FileText, Building2,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Konut Kredisi Başvuru Rehberi | Şartlar, Belgeler, Süreç | Söylemesi Bizden',
  description:
    'Konut kredisi başvurusu için gelir belgesi, ekspertiz, peşinat oranı ve banka seçim rehberi. 2024 kredi şartları.',
};

const KREDI_SARTLARI = [
  { konu: 'Minimum Yaş', detay: '18 yaş — 70 yaşında kredinin tamamlanmış olması gereken bankalar var.' },
  { konu: 'Gelir Belgesi', detay: 'Son 3 ay maaş bordrosu veya son 2 yıl SGK dökümü / serbest meslek makbuzu.' },
  { konu: 'Peşinat Oranı', detay: 'Minimum %20 (ilk ev); ikinci ve sonraki konutlarda %50\'ye kadar çıkabilir.' },
  { konu: 'Borç/Gelir Oranı', detay: 'Tüm taksit ödemelerinin aylık net gelirin %50\'sini geçmemesi gerekir.' },
  { konu: 'Kredi Notu', detay: 'Findeks skoru 1400+ iyi; 1200 altında faiz oranı yükselir veya başvuru reddedilir.' },
  { konu: 'Konut Ekspertiz Değeri', detay: 'Kredi, SPK lisanslı ekspertiz değerinin %80\'ine kadar (ilk ev); ekspertiz zorunlu.' },
  { konu: 'Vade', detay: 'Genellikle 10–30 yıl; vade uzadıkça aylık taksit düşer ama toplam faiz yükselir.' },
];

const BELGELER = [
  { kategori: 'Kişisel Belgeler', liste: ['Nüfus cüzdanı fotokopisi', 'İkametgah belgesi (son 3 ay)', 'Fotoğraf (2 adet)'] },
  { kategori: 'Gelir Belgeleri (Ücretli)', liste: ['Son 3 aylık maaş bordrosu', 'Son 3 aylık banka ekstresi', 'İşyeri vergi levhası'] },
  { kategori: 'Gelir Belgeleri (Serbest Meslek)', liste: ['Son 2 yıl vergi beyannamesi', 'Oda/esnaf sicil kaydı', 'Son 6 aylık hesap dökümü'] },
  { kategori: 'Konut Belgeleri', liste: ['Tapu senedi veya satış vaadi', 'SPK ekspertiz raporu', 'İskan belgesi (varsa)'] },
];

const SUREC = [
  { adim: 'Ön Başvuru', sure: '1–2 gün', detay: 'Banka web sitesi veya şubede ön kredi uygunluk kontrolü; kredi notunuzu etkileyen sert sorgu olmaksızın değerlendirme.' },
  { adim: 'Belge Teslimi', sure: '2–5 gün', detay: 'Tüm belgeleri eksiksiz sunun; eksik belge süreci uzatır.' },
  { adim: 'Ekspertiz Değerlemesi', sure: '3–7 gün', detay: 'Banka anlaşmalı SPK lisanslı ekspertiz şirketini atar; mülkü yerinde inceler.' },
  { adim: 'Kredi Onayı', sure: '1–3 gün', detay: 'Ekspertiz raporu ve belge incelemesi tamamlanınca banka onayını bildirir.' },
  { adim: 'Tapu Devri ve İpotek', sure: '1–2 gün', detay: 'Tapuya ipotek şerhi eklenir; tapu devri ve kredi kullandırımı aynı gün gerçekleşir.' },
  { adim: 'Ödeme Başlangıcı', sure: 'Kullandırımı takip eden ay', detay: 'İlk taksit genellikle kullandırım tarihinden 1 ay sonra başlar.' },
];

const BANKA_KARSILASTIRMA = [
  { banka: 'Ziraat Bankası', faiz: '%3.59/ay', vade: '10–30 yıl', ozelllik: 'Kamu bankası güvencesi, geniş şube ağı' },
  { banka: 'Vakıfbank', faiz: '%3.65/ay', vade: '10–30 yıl', ozelllik: 'Devlet memurlarına özel avantajlı paketler' },
  { banka: 'Halkbank', faiz: '%3.70/ay', vade: '10–30 yıl', ozelllik: 'Esnaf ve KOBİ dostu, kamu bankası' },
  { banka: 'İş Bankası', faiz: '%3.75/ay', vade: '5–20 yıl', ozelllik: 'Hızlı onay, dijital başvuru imkânı' },
  { banka: 'Garanti BBVA', faiz: '%3.80/ay', vade: '5–20 yıl', ozelllik: 'Esnek ödeme planı, mortgage danışmanlığı' },
  { banka: 'QNB Finansbank', faiz: '%3.85/ay', vade: '5–20 yıl', ozelllik: 'Özel bankacılık müşterilerine indirimli oran' },
];

const IPUCLARI = [
  { ipucu: 'Kredi Notunuzu Hazırlayın', detay: 'Başvurudan 3–6 ay önce mevcut borçlarınızı kapatın; kredi kartı limitlerini düşürün.' },
  { ipucu: 'Birden Fazla Bankaya Başvurun', detay: 'Aynı anda yapılan başvurular kredi notunuzu bir kez etkiler; farklı faiz teklifleri karşılaştırın.' },
  { ipucu: 'Ekspertizi Doğrulayın', detay: 'Bankanın atadığı ekspertiz şirketini önceden araştırın; SPK listesinde olmasını teyit edin.' },
  { ipucu: 'KKDF ve BSMV Unutmayın', detay: 'Konut kredisinde KKDF %15, BSMV %5 faiz bedeli üzerinden hesaplanır; efektif maliyeti artırır.' },
  { ipucu: 'Erken Kapama Opsiyonunu Sorun', detay: 'Bazı bankalar erken kapamada %2 cezai faiz uygular; sözleşmede netleştirin.' },
];

export default function KonutKredisiRehberiPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-2 bg-[#00C49F]/20 border border-[#00C49F]/30 text-[#00C49F] text-xs font-bold px-4 py-1.5 rounded-full mb-5">
            <Home size={13} /> Kredi Rehberi
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
            Konut Kredisi Başvuru Rehberi
          </h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed mb-8">
            2024 şartları, gerekli belgeler, başvuru süreci ve banka faiz oranları karşılaştırması —
            ilk kez kredi kullanacaklar için adım adım kılavuz.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-[#00C49F]">%20</p>
              <p className="text-xs text-gray-400">Minimum peşinat oranı</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-white">30 Yıl</p>
              <p className="text-xs text-gray-400">Maksimum vade</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-amber-400">10–15g</p>
              <p className="text-xs text-gray-400">Ortalama onay süreci</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">

        {/* Kredi Şartları */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Konut Kredisi Şartları</h2>
          <div className="space-y-3">
            {KREDI_SARTLARI.map((s, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm flex items-start gap-3">
                <CheckCircle size={13} className="text-[#00C49F] shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-black text-gray-900 mb-0.5">{s.konu}</p>
                  <p className="text-[10px] text-gray-600 leading-relaxed">{s.detay}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Gerekli Belgeler */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Gerekli Belgeler</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {BELGELER.map((b, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                <p className="text-xs font-black text-gray-900 mb-3 flex items-center gap-2">
                  <FileText size={12} className="text-[#00C49F]" /> {b.kategori}
                </p>
                <ul className="space-y-1.5">
                  {b.liste.map((l, j) => (
                    <li key={j} className="flex items-start gap-2">
                      <CheckCircle size={10} className="text-gray-400 shrink-0 mt-0.5" />
                      <p className="text-[10px] text-gray-600">{l}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Başvuru Süreci */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Başvuru Süreci</h2>
          <div className="space-y-3">
            {SUREC.map((s, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm flex items-start gap-3">
                <div className="bg-[#F0FDF8] text-[#00C49F] text-[10px] font-black px-2 py-1 rounded-lg shrink-0">{i + 1}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="text-xs font-black text-gray-900">{s.adim}</p>
                    <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">{s.sure}</span>
                  </div>
                  <p className="text-[10px] text-gray-600 leading-relaxed">{s.detay}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Banka Karşılaştırması */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Banka Faiz Oranı Karşılaştırması (2024)</h2>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="text-left px-4 py-3 font-black text-gray-700">Banka</th>
                    <th className="text-left px-4 py-3 font-black text-rose-600">Faiz Oranı</th>
                    <th className="text-left px-4 py-3 font-black text-gray-700">Vade</th>
                    <th className="text-left px-4 py-3 font-black text-gray-500">Özellik</th>
                  </tr>
                </thead>
                <tbody>
                  {BANKA_KARSILASTIRMA.map((b, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-3 font-bold text-gray-800">
                        <div className="flex items-center gap-2">
                          <Building2 size={11} className="text-gray-400" /> {b.banka}
                        </div>
                      </td>
                      <td className="px-4 py-3 font-bold text-rose-600">{b.faiz}</td>
                      <td className="px-4 py-3 text-gray-600">{b.vade}</td>
                      <td className="px-4 py-3 text-gray-500 leading-relaxed">{b.ozelllik}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="px-4 py-2 text-[10px] text-gray-400 border-t border-gray-100">* Oranlar gösterge niteliğindedir; güncel teklif için ilgili bankayı arayın.</p>
          </div>
        </section>

        {/* İpuçları */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Başvuru Öncesi İpuçları</h2>
          <div className="space-y-3">
            {IPUCLARI.map((t, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm flex items-start gap-3">
                <AlertTriangle size={13} className="text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-black text-gray-900 mb-0.5">{t.ipucu}</p>
                  <p className="text-[10px] text-gray-600 leading-relaxed">{t.detay}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Related */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-4">İlgili Hesaplama Araçları</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { href: '/mortgage-simulatoru', label: 'Mortgage Simülatörü' },
              { href: '/kredi-karsilastirma', label: 'Kredi Karşılaştırma' },
              { href: '/banka-kredileri', label: 'Banka Kredileri Analizi' },
              { href: '/odeme-plani', label: 'Ödeme Planı Simülatörü' },
              { href: '/tapu-masrafi', label: 'Tapu ve Alım Masrafları' },
              { href: '/pesinat-plani', label: 'Peşinat Planlayıcı' },
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
