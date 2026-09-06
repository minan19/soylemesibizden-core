import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Emlak Danışmanı Seçme Rehberi | Komisyon ve Sözleşme | Söylemesi Bizden',
  description:
    'Doğru emlak danışmanını nasıl seçersiniz? Komisyon oranları, sözleşme türleri, danışmanlık hizmetleri ve dikkat edilmesi gerekenler.',
};

const DANISMANLIK_TURLERI = [
  {
    tur: 'Münhasır (Exclusive) Yetki',
    aciklama: 'Sadece bir emlak ofisine verilen satış yetkisi. Danışman daha fazla efor sarf eder; satıcı için fiyat optimizasyonu genellikle daha iyidir.',
    avantaj: 'Daha koordineli satış süreci',
    dezavantaj: 'Geniş portföy erişimi kısıtlı',
  },
  {
    tur: 'Açık (Open) Yetki',
    aciklama: 'Birden fazla danışmana verilen yetki. Daha geniş erişim sağlar ama danışmanların motivasyonu düşük olabilir.',
    avantaj: 'Daha geniş müşteri erişimi',
    dezavantaj: 'Koordinasyon eksikliği, düşük motivasyon',
  },
  {
    tur: 'Alıcı Temsilcisi',
    aciklama: 'Yalnızca alıcının çıkarını temsil eden danışman. Türkiye\'de henüz yaygın değil; bazı ofisler bu hizmeti sunmaktadır.',
    avantaj: 'Alıcı lehine müzakere',
    dezavantaj: 'Ayrı komisyon ödenmesi gerekebilir',
  },
];

const KOMISYON_REHBERI = [
  { durum: 'Satış işlemi — Alıcı', oran: 'Satış bedelinin %2\'si + KDV', not: 'Alıcı danışmanına standart oran' },
  { durum: 'Satış işlemi — Satıcı', oran: 'Satış bedelinin %2\'si + KDV', not: 'Her iki taraftan toplam %4 alınır' },
  { durum: 'Kiralık işlem', oran: 'Bir aylık kira + KDV', not: 'Kira bedelinin bir ayı standart komisyon' },
  { durum: 'Ticari gayrimenkul', oran: '%3–5 + KDV', not: 'Sözleşmeye göre değişebilir' },
];

const SECIM_KRITERLERI = [
  { kriter: 'Lisans ve Yetki Belgesi', aciklama: 'Danışmanın "Taşınmaz Ticareti Yetki Belgesi"ne sahip olduğunu Ticaret Bakanlığı sicilinden teyit edin.' },
  { kriter: 'Bölge Uzmanlığı', aciklama: 'Hedef bölgenizde son 6 ayda gerçekleştirdiği satışları sorgulayın. Lokal piyasayı iyi bilen danışman daha gerçekçi fiyat önerir.' },
  { kriter: 'Referans Kontrolü', aciklama: 'Önceki müşterilerinden en az 2–3 referans isteyin; doğrudan iletişime geçin.' },
  { kriter: 'Sözleşme Şartları', aciklama: 'Hizmet süresi, komisyon oranı, münhasırlık, iptal koşulları mutlaka yazılı olmalı. Belirsiz sözleşmelerden kaçının.' },
  { kriter: 'Pazarlama Planı', aciklama: 'Danışmanın mülkünüzü nasıl pazarlayacağını sorun: hangi portallar, profesyonel fotoğraf, sosyal medya planı.' },
  { kriter: 'İletişim Tarzı', aciklama: 'Mesajlarınıza kaç saatte döndüğünü not edin. Süreçte size düzenli güncelleme verip vermeyeceğini sorun.' },
];

const KIRMIZI_BAYRAKLAR = [
  'Hizmet sözleşmesi imzalatmayan danışman',
  'Komisyonunu peşin isteyen veya nakit talep eden',
  'Tapu belgeleri veya banka hesabı için dolaylı erişim isteyen',
  'Hızlı karar baskısı yapan ("Bu akşam başkası bakıyor" senaryosu)',
  'Piyasa değerinin çok üstünde fiyat önererek sizi ikna etmeye çalışan',
  'Yetki belgesini gösteremeyen veya ofisi olmayan "bağımsız aracı"',
];

const SORULAR = [
  'Son 6 ayda bu bölgede kaç işlem yaptınız?',
  'Münhasır yetki vermem durumunda pazarlama planınız ne olur?',
  'Referans verebilecek müşteri var mı?',
  'Komisyon dahil toplam masrafım ne kadara ulaşır?',
  'Sözleşme süresinde satış gerçekleşmezse ne olur?',
  'Haftada kaç kez geri bildirim yapacaksınız?',
];

export default function GayrimenkulDanismanlikRehberiPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-14">
          <p className="text-[#00C49F] text-xs font-bold mb-3 uppercase tracking-widest">Emlak Rehberi</p>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">Emlak Danışmanı Seçme Rehberi</h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed">
            Doğru emlak danışmanını bulun: komisyon oranları, sözleşme türleri, dikkat edilmesi gereken noktalar.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-10 space-y-10">

        {/* Danışmanlık Türleri */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-base font-black text-gray-900 mb-1">Yetki Sözleşmesi Türleri</h2>
          <p className="text-xs text-gray-400 mb-5">Gayrimenkul satışında danışmanla yapılan yetki anlaşması türleri.</p>
          <div className="space-y-4">
            {DANISMANLIK_TURLERI.map((d, i) => (
              <div key={i} className="border border-gray-100 rounded-xl p-4">
                <p className="text-xs font-black text-gray-900 mb-2">{d.tur}</p>
                <p className="text-[11px] text-gray-600 leading-relaxed mb-3">{d.aciklama}</p>
                <div className="flex gap-3">
                  <span className="text-[10px] text-emerald-600 font-bold">✓ {d.avantaj}</span>
                  <span className="text-[10px] text-rose-500 font-bold">✗ {d.dezavantaj}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Komisyon Tablosu */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm overflow-x-auto">
          <h2 className="text-base font-black text-gray-900 mb-1">Komisyon Oranları</h2>
          <p className="text-xs text-gray-400 mb-5">Türkiye&apos;de geçerli standart emlak komisyon oranları.</p>
          <table className="w-full text-[10px] min-w-[360px]">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-2 font-black text-gray-500">İşlem Türü</th>
                <th className="text-center py-2 font-black text-gray-500">Oran</th>
                <th className="text-right py-2 font-black text-[#00C49F]">Not</th>
              </tr>
            </thead>
            <tbody>
              {KOMISYON_REHBERI.map((k, i) => (
                <tr key={i} className="border-b border-gray-50 last:border-0">
                  <td className="py-2 font-black text-gray-900">{k.durum}</td>
                  <td className="py-2 text-center font-bold text-amber-500">{k.oran}</td>
                  <td className="py-2 text-right font-bold text-gray-400">{k.not}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Seçim Kriterleri */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-base font-black text-gray-900 mb-1">Danışman Seçim Kriterleri</h2>
          <p className="text-xs text-gray-400 mb-5">Güvenilir ve yetkin bir danışmanı nasıl tanırsınız?</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {SECIM_KRITERLERI.map((k, i) => (
              <div key={i} className="border border-gray-100 rounded-xl p-4">
                <p className="text-xs font-black text-gray-900 mb-1">{k.kriter}</p>
                <p className="text-[11px] text-gray-500 leading-relaxed">{k.aciklama}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Kırmızı Bayraklar */}
        <div className="bg-rose-50 border border-rose-100 rounded-2xl p-6">
          <h2 className="text-base font-black text-rose-800 mb-4">Dikkat Edilmesi Gereken Kırmızı Bayraklar</h2>
          <div className="space-y-2">
            {KIRMIZI_BAYRAKLAR.map((k, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="text-rose-500 font-black text-xs mt-0.5">✗</span>
                <p className="text-[11px] text-rose-700">{k}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Sorular */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-base font-black text-gray-900 mb-4">Danışmana Sormanız Gereken 6 Soru</h2>
          <div className="space-y-3">
            {SORULAR.map((s, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-[#00C49F]/20 text-[#00C49F] text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                <p className="text-xs font-bold text-gray-700">{s}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}
