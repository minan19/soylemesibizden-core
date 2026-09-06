import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Taşınmaz Hukuku Rehberi 2025 | Mülkiyet, Tapu, İpotek | Söylemesi Bizden',
  description:
    'Türk taşınmaz hukuku temel kavramları: mülkiyet hakkı, sınırlı ayni haklar, ipotek, irtifak, tapu sicili ve hukuki işlem adımları.',
};

const TEMEL_KAVRAMLAR = [
  {
    kavram: 'Mülkiyet Hakkı',
    tanim: 'Malike, taşınmaz üzerinde kullanma (usus), yararlanma (fructus) ve tasarruf (abusus) yetkisi veren en geniş ayni hak.',
    kanun: 'TMK md. 683',
  },
  {
    kavram: 'Tapu Sicili',
    tanim: 'Taşınmazlar üzerindeki hakların kamuya açık biçimde tescil edildiği resmi kayıt sistemi. Tescil kurucu etkiye sahiptir.',
    kanun: 'TMK md. 997–1001',
  },
  {
    kavram: 'İpotek',
    tanim: 'Alacağı güvence altına almak amacıyla taşınmaz üzerine kurulan sınırlı ayni hak. Borç ödenmezse icraya konu olur.',
    kanun: 'TMK md. 851–883',
  },
  {
    kavram: 'İrtifak Hakkı',
    tanim: 'Bir taşınmaz lehine veya belirli bir kişi lehine başka bir taşınmaz üzerinde kurulan kullanma hakkı (geçit, üst hakkı vb.).',
    kanun: 'TMK md. 779–826',
  },
  {
    kavram: 'Şufa (Önalım) Hakkı',
    tanim: 'Paylı mülkiyette paydaşın, payın üçüncü kişiye satışında yasal öncelikli satın alma hakkı.',
    kanun: 'TMK md. 732–735',
  },
  {
    kavram: 'Kat Mülkiyeti',
    tanim: 'Tamamlanmış bir yapının ayrı ayrı kullanıma elverişli bağımsız bölümleri üzerinde kurulan mülkiyet hakkı.',
    kanun: 'KMK md. 1–10',
  },
];

const TAPU_ISLEMLERI = [
  { islem: 'Satış (Alım-Satım)', taraflar: 'Satıcı + Alıcı', sekil: 'Tapu Müdürlüğünde resmi senet', sure: '1–3 gün' },
  { islem: 'Bağış', taraflar: 'Bağışlayan + Bağışlanan', sekil: 'Resmi senet', sure: '1–2 gün' },
  { islem: 'Miras Tescili', taraflar: 'Mirasçılar', sekil: 'Veraset ilamı + tescil', sure: '1–4 hafta' },
  { islem: 'İpotek Tesis', taraflar: 'Borçlu + Alacaklı', sekil: 'Resmi senet', sure: 'Aynı gün' },
  { islem: 'İpotek Terkin', taraflar: 'Alacaklı (feragat)', sekil: 'Yazılı talep', sure: 'Aynı gün' },
  { islem: 'Kat Mülkiyeti Kurma', taraflar: 'Tüm kat malikleri', sekil: 'Yönetim planı + iskan', sure: '1–2 hafta' },
  { islem: 'İrtifak Tesis', taraflar: 'İlgili taşınmaz malikleri', sekil: 'Resmi senet', sure: '1–3 gün' },
];

const HUKUKI_RISKLER = [
  { risk: 'Şerh ve Beyanlar', aciklama: 'Tapu sicilinde şerh (ön alım, kira, haciz) ve beyanlar (imar durumu) alım öncesi kontrol edilmelidir.', severity: 'Kritik' },
  { risk: 'İmar Durumu', aciklama: 'Yapı ruhsatı ve iskan belgesi bulunmayan yapılarda tapu devri sorunlara yol açabilir.', severity: 'Kritik' },
  { risk: 'İpotek Varlığı', aciklama: 'Üzerinde ipotek bulunan taşınmaz satışında ipotek kaldırılmadan veya taşınmadan tescil yapılmamalıdır.', severity: 'Yüksek' },
  { risk: 'Ortak Mülkiyet', aciklama: 'Paylı mülkiyette tüm paydaşların rızası olmadan pay dışı tasarruf kısıtlıdır.', severity: 'Yüksek' },
  { risk: 'Kaçak Yapı', aciklama: 'İmara aykırı bölüm veya bina imar barışından yararlanmamışsa yıkım riski taşır.', severity: 'Orta' },
  { risk: 'Kira Şerhi', aciklama: 'Tapuya şerh edilmiş uzun vadeli kira sözleşmesi alıcıyı bağlar; kiracı tahliye edilemez.', severity: 'Orta' },
];

export default function TasinmazHukukuRehberiPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-14">
          <p className="text-[#00C49F] text-xs font-bold mb-3 uppercase tracking-widest">Hukuk Rehberi 2025</p>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">Taşınmaz Hukuku Rehberi</h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed">
            Mülkiyet hakkı, tapu sicili, ipotek, irtifak ve kat mülkiyeti: Türk taşınmaz hukukunun temel kavramları.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">

        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-base font-black text-gray-900 mb-4">Temel Hukuki Kavramlar</h2>
          <div className="space-y-3">
            {TEMEL_KAVRAMLAR.map((k, i) => (
              <div key={i} className="border border-gray-100 rounded-xl p-4">
                <div className="flex items-start justify-between mb-1">
                  <p className="text-xs font-black text-gray-900">{k.kavram}</p>
                  <span className="text-[9px] text-gray-400 shrink-0 ml-4">{k.kanun}</span>
                </div>
                <p className="text-[11px] text-gray-500 leading-relaxed">{k.tanim}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm overflow-x-auto">
          <h2 className="text-base font-black text-gray-900 mb-1">Tapu İşlemleri</h2>
          <p className="text-xs text-gray-400 mb-5">Sık yapılan tapu işlemleri, taraflar ve resmi şekil gereklilikleri.</p>
          <table className="w-full text-[10px] min-w-[500px]">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-2 font-black text-gray-500">İşlem</th>
                <th className="text-center py-2 font-black text-gray-500">Taraflar</th>
                <th className="text-center py-2 font-black text-gray-500">Şekil</th>
                <th className="text-right py-2 font-black text-[#00C49F]">Süre</th>
              </tr>
            </thead>
            <tbody>
              {TAPU_ISLEMLERI.map((t, i) => (
                <tr key={i} className="border-b border-gray-50 last:border-0">
                  <td className="py-2 font-black text-gray-900">{t.islem}</td>
                  <td className="py-2 text-center font-bold text-gray-600">{t.taraflar}</td>
                  <td className="py-2 text-center font-bold text-gray-500">{t.sekil}</td>
                  <td className="py-2 text-right font-bold text-[#00C49F]">{t.sure}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-base font-black text-gray-900 mb-4">Hukuki Riskler ve Dikkat Edilecekler</h2>
          <div className="space-y-3">
            {HUKUKI_RISKLER.map((r, i) => (
              <div key={i} className={`border rounded-xl p-4 ${r.severity === 'Kritik' ? 'border-rose-100 bg-rose-50/30' : r.severity === 'Yüksek' ? 'border-amber-100 bg-amber-50/30' : 'border-gray-100'}`}>
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-xs font-black text-gray-900">{r.risk}</p>
                  <span className={`text-[9px] font-black px-1.5 py-0.5 rounded ${r.severity === 'Kritik' ? 'bg-rose-500 text-white' : r.severity === 'Yüksek' ? 'bg-amber-500 text-white' : 'bg-gray-200 text-gray-600'}`}>{r.severity}</span>
                </div>
                <p className="text-[11px] text-gray-600 leading-relaxed">{r.aciklama}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5">
          <p className="text-xs font-black text-amber-700 mb-2">Önemli Uyarı</p>
          <p className="text-[11px] text-amber-600 leading-relaxed">
            Bu rehber Türk Medeni Kanunu, Kat Mülkiyeti Kanunu ve Tapu Sicili Tüzüğü çerçevesinde genel bilgilendirme amacıyla hazırlanmıştır. Hukuki işlemler için avukat veya noter danışmanlığı alınması önerilir. Tapu sicili sorgulaması için e-Devlet veya Tapu ve Kadastro Genel Müdürlüğü resmi kanallarını kullanın.
          </p>
        </div>

      </div>
    </main>
  );
}
