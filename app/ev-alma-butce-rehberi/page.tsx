import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ev Alma Bütçe Rehberi 2025 | Toplam Maliyet Hesaplama | Söylemesi Bizden',
  description:
    'Ev alırken toplam bütçe planlaması: peşinat, tapu masrafları, taşınma, tadilat ve ilk yıl giderleri dahil kapsamlı maliyet rehberi.',
};

const MALIYET_KALEMLERI = [
  { grup: 'Satın Alma Maliyetleri', kalemler: [
    { kalem: 'Ev fiyatı', min: '—', max: '—', not: 'Piyasa değeri referans alınır' },
    { kalem: 'Tapu harcı (alıcı %2)', min: '%2', max: '%2', not: 'Satış bedelinin %2\'si' },
    { kalem: 'Döner sermaye', min: '300 ₺', max: '1.000 ₺', not: 'Tapu Müdürlüğü ücreti' },
    { kalem: 'Ekspertiz ücreti', min: '1.500 ₺', max: '5.000 ₺', not: 'Banka kredisi için zorunlu' },
    { kalem: 'DASK sigortası (yıllık)', min: '300 ₺', max: '3.000+ ₺', not: 'Risk bölgesi + m²' },
    { kalem: 'Emlakçı komisyonu', min: '%2', max: '%3', not: 'KDV dahil (alıcı payı)' },
  ]},
  { grup: 'Kredi Maliyetleri', kalemler: [
    { kalem: 'Dosya ücreti', min: '500 ₺', max: '2.000 ₺', not: 'Bankaya göre değişir' },
    { kalem: 'Hayat sigortası (yıllık)', min: '0,3%', max: '0,6%', not: 'Kredi tutarı üzerinden' },
    { kalem: 'Konut sigortası (yıllık)', min: '500 ₺', max: '3.000 ₺', not: 'Zorunlu değil, önerilir' },
    { kalem: 'Erken ödeme cezası', min: '0', max: '%2', not: 'İlk 36 ay için geçerli olabilir' },
  ]},
  { grup: 'Taşınma ve Kurulum', kalemler: [
    { kalem: 'Taşıma firması', min: '5.000 ₺', max: '25.000 ₺', not: 'Uzaklık + eşya hacmi' },
    { kalem: 'Tadilat / boyama', min: '10.000 ₺', max: '100.000+ ₺', not: 'Konutun durumuna bağlı' },
    { kalem: 'Beyaz eşya', min: '20.000 ₺', max: '80.000 ₺', not: 'Komple set için' },
    { kalem: 'Mobilya', min: '30.000 ₺', max: '200.000+ ₺', not: 'Ölçüye göre değişir' },
    { kalem: 'Perde / aydınlatma', min: '5.000 ₺', max: '30.000 ₺', not: 'Oda sayısına bağlı' },
  ]},
  { grup: 'İlk Yıl Aylık Giderler', kalemler: [
    { kalem: 'Aidat', min: '500 ₺', max: '5.000 ₺', not: 'Site büyüklüğüne göre' },
    { kalem: 'Emlak vergisi (aylık)', min: '150 ₺', max: '2.000+ ₺', not: 'Yılda 2 taksit' },
    { kalem: 'Doğalgaz + elektrik', min: '2.000 ₺', max: '8.000 ₺', not: 'Mevsim ve ev büyüklüğü' },
    { kalem: 'Su faturası', min: '200 ₺', max: '1.000 ₺', not: 'Kişi sayısı bazlı' },
    { kalem: 'İnternet / TV', min: '300 ₺', max: '800 ₺', not: 'Paket seçimine göre' },
  ]},
];

const PESINAT_REHBERI = [
  { oran: '%20 Peşinat', avantaj: 'Standart banka kredisi, %80 LTV', dezavantaj: 'Minimum gereksinim; yüksek faiz yükü' },
  { oran: '%30 Peşinat', avantaj: 'Daha iyi faiz oranı müzakeresi', dezavantaj: 'Fazla nakit bağlanıyor' },
  { oran: '%50 Peşinat', avantaj: 'Taksit yükü hafifliyor, tasarruf artar', dezavantaj: 'Yatırım alternatifinden vazgeçiliyor' },
  { oran: '%100 Peşin', avantaj: 'Faiz yükü yok, güçlü pazarlık', dezavantaj: 'Likidite tamamen kullanılıyor' },
];

const UZMAN_TAVSIYELERI = [
  { baslik: 'Acil Fon Ayırın', aciklama: '3–6 aylık gideri karşılayacak acil fon alım sonrasında da devam etmeli; evin ilk aylarında beklenmedik giderler çıkabilir.' },
  { baslik: 'Toplam Maliyeti Hesaplayın', aciklama: 'Ev fiyatının yanı sıra tapu, ekspertiz, taşıma ve tadilat dahil toplam maliyet genellikle ev fiyatının %10-20\'si kadar ekstra tutar.' },
  { baslik: 'Yüksek Taksit Tuzağı', aciklama: 'Aylık gelirin %35\'ini aşan taksit ödemesi uzun vadede finansal baskı yaratır. Taksit/gelir oranını bu sınırda tutun.' },
  { baslik: 'Tadilat Bütçesi', aciklama: 'İkinci el konutlarda taşınmadan önce mutlaka bütçe belirleyin. Tadilatı başladıktan sonra durdurmak çok daha maliyetli olur.' },
  { baslik: 'Sigorta Paketi', aciklama: 'DASK zorunlu; ek konut sigortası yangın, deprem ve hırsızlığı kapsar. İlk tapu günü aktif edin.' },
  { baslik: 'Fatura Devri', aciklama: 'Elektrik, doğalgaz ve su aboneliklerini tapu tarihinden itibaren adınıza devir ettirin; aksi halde eski borçlardan etkilenebilirsiniz.' },
];

export default function EvAlmaButceRehberiPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-14">
          <p className="text-[#00C49F] text-xs font-bold mb-3 uppercase tracking-widest">Bütçe Rehberi 2025</p>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">Ev Alma Bütçe Rehberi</h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed">
            Ev alırken sadece satış fiyatı değil; tapu, ekspertiz, taşıma, tadilat ve ilk yıl giderleri dahil kapsamlı maliyet planı.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">

        {MALIYET_KALEMLERI.map((grup, gi) => (
          <div key={gi} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm overflow-x-auto">
            <h2 className="text-base font-black text-gray-900 mb-4">{grup.grup}</h2>
            <table className="w-full text-[10px] min-w-[420px]">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-2 font-black text-gray-500">Kalem</th>
                  <th className="text-center py-2 font-black text-gray-500">Min</th>
                  <th className="text-center py-2 font-black text-gray-500">Maks</th>
                  <th className="text-right py-2 font-black text-[#00C49F]">Not</th>
                </tr>
              </thead>
              <tbody>
                {grup.kalemler.map((k, i) => (
                  <tr key={i} className="border-b border-gray-50 last:border-0">
                    <td className="py-2 font-black text-gray-900">{k.kalem}</td>
                    <td className="py-2 text-center font-bold text-gray-600">{k.min}</td>
                    <td className="py-2 text-center font-bold text-gray-600">{k.max}</td>
                    <td className="py-2 text-right font-bold text-gray-400">{k.not}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}

        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-base font-black text-gray-900 mb-4">Peşinat Oranı Rehberi</h2>
          <div className="space-y-3">
            {PESINAT_REHBERI.map((p, i) => (
              <div key={i} className="border border-gray-100 rounded-xl p-4">
                <p className="text-xs font-black text-[#00C49F] mb-2">{p.oran}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div>
                    <p className="text-[9px] text-gray-400 mb-0.5">Avantaj</p>
                    <p className="text-[10px] font-bold text-emerald-600">{p.avantaj}</p>
                  </div>
                  <div>
                    <p className="text-[9px] text-gray-400 mb-0.5">Dezavantaj</p>
                    <p className="text-[10px] font-bold text-amber-600">{p.dezavantaj}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-base font-black text-gray-900 mb-4">Uzman Tavsiyeleri</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {UZMAN_TAVSIYELERI.map((t, i) => (
              <div key={i} className="border border-gray-100 rounded-xl p-4">
                <p className="text-xs font-black text-gray-900 mb-1">{t.baslik}</p>
                <p className="text-[11px] text-gray-500 leading-relaxed">{t.aciklama}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-5">
          <p className="text-xs font-black text-emerald-700 mb-2">Toplam Bütçe Formülü</p>
          <p className="text-[11px] text-emerald-600 leading-relaxed">
            Toplam bütçe = Ev fiyatı + Tapu/ekspertiz (%3-4) + Tadilat + Mobilya/beyaz eşya + Taşıma + 3 aylık acil fon. Peşinat ve gizli maliyetler genellikle ev fiyatının %15-25&apos;i kadar ek kaynak gerektirmektedir.
          </p>
        </div>

      </div>
    </main>
  );
}
