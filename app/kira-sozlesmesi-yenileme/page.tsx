import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kira Sözleşmesi Yenileme Rehberi 2025 | Artış Oranı ve Haklar | Söylemesi Bizden',
  description:
    'Kira sözleşmesi yenileme: yasal artış oranı, otomatik yenileme, tahliye koşulları, kira tespiti davası ve ev sahibi-kiracı hakları.',
};

const YENILEME_SURECI = [
  {
    adim: 'Sözleşme Bitiş Tarihini Kontrol Et',
    aciklama: 'Sözleşmenin ne zaman sona ereceğini belirleyin. 1 yıllık sözleşmeler otomatik olarak 1 yıl daha uzar; aksi yönde yazılı ihbar gerekmez.',
    sure: '30–60 gün öncesinden',
  },
  {
    adim: 'Kira Artış Oranını Hesapla',
    aciklama: 'TÜİK tarafından açıklanan 12 aylık TÜFE (Tüketici Fiyat Endeksi) artışı üst sınır olarak uygulanır. 2024 yılı için geçici %25 tavan hâlâ uygulanmaktadır.',
    sure: 'Yenileme ayından önce',
  },
  {
    adim: 'Yazılı Bildirim Yap',
    aciklama: 'Artışı veya sözleşme koşullarını değiştirmek isteyen taraf karşı tarafı yazılı (noter/iadeli taahhütlü posta) olarak bilgilendirmelidir.',
    sure: 'En az 1 ay öncesinden',
  },
  {
    adim: 'Anlaşma Belgele',
    aciklama: 'Tarafların mutabık kaldığı yeni kira bedeli ve koşullar imzalı ek sözleşme veya zeyilname ile belgelenir.',
    sure: 'Yenileme tarihinde',
  },
  {
    adim: 'Anlaşmazlıkta Arabuluculuk / Mahkeme',
    aciklama: 'Taraflar uzlaşamazsa kira tespiti için Sulh Hukuk Mahkemesi&apos;ne başvurulabilir; yargı piyasa rayicine göre karar verir.',
    sure: '1–6 ay süreç',
  },
];

const ARTIS_SINIRI = [
  {
    donem: '2020 öncesi',
    kural: 'TBK md.344 — TÜFE 12 aylık ortalaması',
    tavan: 'TÜFE ortalaması',
    not: 'Taraflar TÜFE altında anlaşabilir',
  },
  {
    donem: '2022–2024 (geçici)',
    kural: 'Geçici yasal düzenleme',
    tavan: '%25 (konut)',
    not: 'Ticari kira için geçerli değil',
  },
  {
    donem: '2025+',
    kural: 'TBK md.344 normale dönüş bekleniyor',
    tavan: 'TÜFE 12 ay ortalaması',
    not: 'Yasal düzenleme değişebilir',
  },
];

const TAHLIYE_SEBEPLERI = [
  { sebep: 'Kira Borcunu Ödememe', sure: '2 haklı ihtar sonrası dava', kim: 'Kiraya veren', detay: 'Aynı kira döneminde 2 ihtardan sonra 1 ay içinde dava açılabilir' },
  { sebep: 'Konut İhtiyacı (Ev Sahibi)', sure: 'Süre sonu + 1 ay ihtar', kim: 'Kiraya veren', detay: 'Gerçek ihtiyaç ispat edilmeli; 3 yıl başkasına kiralama yasağı' },
  { sebep: 'Yeniden İnşa / Esaslı Onarım', sure: 'Süre sonu + 1 ay ihtar', kim: 'Kiraya veren', detay: 'Yapı kullanılamaz hâle gelmeli; ruhsat alınmış olmalı' },
  { sebep: 'Kiracının Yazılı Tahliye Taahhüdü', sure: 'Taahhüt tarihinde', kim: 'Kiraya veren', detay: 'Sözleşme sırasında alınan taahhüt icra yoluyla uygulanabilir' },
  { sebep: 'Kiracı İradesiyle Tahliye', sure: '15 gün öncesinde ihbar', kim: 'Kiracı', detay: 'Kiracı istediği zaman çıkabilir; sözleşme ceza şartı hükümlerine dikkat' },
];

const KIRA_TESPITI_DAVASI = [
  { konu: 'Başvuru Yeri', bilgi: 'Taşınmazın bulunduğu Sulh Hukuk Mahkemesi' },
  { konu: 'Kimler Başvurabilir', bilgi: 'Hem kiraya veren hem kiracı; sözleşme yenileme döneminden en az 30 gün önce veya yenileme tarihinden itibaren' },
  { konu: 'Mahkeme Kriteri', bilgi: 'Emsal kira değerleri, bölge koşulları, enflasyon; hakkaniyete uygun bedel belirlenir' },
  { konu: 'Karar Geçerliliği', bilgi: 'Kararlaştırılan kira, karar tarihinden sonraki ilk kira döneminden itibaren uygulanır' },
  { konu: 'Süre', bilgi: 'Ortalama 3–12 ay; bilirkişi raporu süreye eklenir' },
  { konu: 'Yargılama Gideri', bilgi: 'Kaybeden taraf mahkeme masraflarını öder; avukatlık ücreti kararın içeriğine göre belirlenir' },
];

const SSS = [
  {
    soru: 'Kira sözleşmem doldu, çıkmak zorunda mıyım?',
    cevap: 'Hayır. Konut kiralarında sözleşme süresi dolsa bile kiracı otomatik tahliye edilemez. Kiraya veren ancak yasal tahliye sebeplerinden birine dayanarak dava açabilir.',
  },
  {
    soru: 'Ev sahibi sözlü olarak artış isteyebilir mi?',
    cevap: 'Sözlü anlaşma hukuken geçersizdir. Kira artışının bağlayıcı olması için yazılı bildirim veya imzalı zeyilname şarttır.',
  },
  {
    soru: '%25 tavanı aşan artışa itiraz edebilir miyim?',
    cevap: 'Evet. Yasal tavan aşılırsa kiracı aşan kısmı ödemekle yükümlü değildir; Sulh Hukuk Mahkemesi&apos;ne kira tespiti davası açılabilir.',
  },
  {
    soru: 'Depozito yenileme sırasında artırılabilir mi?',
    cevap: 'Yasal olarak depozito en fazla 3 aylık kira bedelidir. Yenileme döneminde kira arttığında depozito da artışla orantılı güncellenebilir; ancak kiracı mevcut depozitoyu iade almadan yenisini vermek zorunda değildir.',
  },
];

export default function KiraSozlesmesiYenilemePage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-14">
          <p className="text-[#00C49F] text-xs font-bold mb-3 uppercase tracking-widest">Kiracı / Ev Sahibi Rehberi 2025</p>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">Kira Sözleşmesi Yenileme</h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed">
            Yenileme süreci, yasal artış oranı, tahliye koşulları ve kira tespiti davası: ev sahibi ve kiracı için tam rehber.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">

        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-base font-black text-gray-900 mb-4">Yenileme Süreci</h2>
          <div className="space-y-3">
            {YENILEME_SURECI.map((s, i) => (
              <div key={i} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-6 h-6 rounded-full bg-[#00C49F] text-white text-[10px] font-black flex items-center justify-center shrink-0">{i + 1}</div>
                  {i < YENILEME_SURECI.length - 1 && <div className="w-px flex-1 bg-gray-100 mt-1" />}
                </div>
                <div className="pb-4">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-xs font-black text-gray-900">{s.adim}</p>
                    <span className="text-[9px] text-[#00C49F] font-bold shrink-0">{s.sure}</span>
                  </div>
                  <p className="text-[11px] text-gray-500">{s.aciklama}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm overflow-x-auto">
          <h2 className="text-base font-black text-gray-900 mb-1">Yasal Artış Sınırları</h2>
          <p className="text-xs text-gray-400 mb-5">TBK Madde 344 ve geçici yasal düzenlemeler.</p>
          <table className="w-full text-[10px] min-w-[420px]">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-2 font-black text-gray-500">Dönem</th>
                <th className="text-center py-2 font-black text-gray-500">Kural</th>
                <th className="text-center py-2 font-black text-[#00C49F]">Tavan</th>
                <th className="text-right py-2 font-black text-gray-500">Not</th>
              </tr>
            </thead>
            <tbody>
              {ARTIS_SINIRI.map((a, i) => (
                <tr key={i} className="border-b border-gray-50 last:border-0">
                  <td className="py-2 font-black text-gray-900">{a.donem}</td>
                  <td className="py-2 text-center text-gray-500">{a.kural}</td>
                  <td className="py-2 text-center font-bold text-[#00C49F]">{a.tavan}</td>
                  <td className="py-2 text-right text-gray-400">{a.not}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-base font-black text-gray-900 mb-4">Tahliye Sebepleri</h2>
          <div className="space-y-3">
            {TAHLIYE_SEBEPLERI.map((t, i) => (
              <div key={i} className="border border-gray-100 rounded-xl p-4">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-xs font-black text-gray-900">{t.sebep}</p>
                  <span className={`text-[9px] font-black px-2 py-0.5 rounded shrink-0 ml-3 ${t.kim === 'Kiraya veren' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'}`}>{t.kim}</span>
                </div>
                <p className="text-[10px] text-[#00C49F] font-bold mb-1">{t.sure}</p>
                <p className="text-[11px] text-gray-500">{t.detay}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-base font-black text-gray-900 mb-4">Kira Tespiti Davası</h2>
          <div className="space-y-2">
            {KIRA_TESPITI_DAVASI.map((k, i) => (
              <div key={i} className="flex gap-3 py-2 border-b border-gray-50 last:border-0">
                <p className="text-[10px] font-black text-gray-500 w-32 shrink-0">{k.konu}</p>
                <p className="text-[11px] text-gray-700">{k.bilgi}</p>
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

        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5">
          <p className="text-xs font-black text-amber-700 mb-2">Dikkat Edilmesi Gereken Nokta</p>
          <p className="text-[11px] text-amber-600 leading-relaxed">
            Kira mevzuatı Türkiye&apos;de sık değişmektedir; özellikle geçici %25 tavan düzenlemesi uzatılıp uzatılmayacağı her yıl yeniden değerlendirilen bir politika meselesidir. Hukuki süreç başlatmadan önce güncel mevzuatı bir avukattan teyit edin. Bu rehber bilgilendirme amaçlıdır, hukuki tavsiye niteliği taşımaz.
          </p>
        </div>

      </div>
    </main>
  );
}
