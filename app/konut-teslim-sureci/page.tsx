import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Konut Teslim Süreci Rehberi 2025 | Anahtar Teslimi ve İskan | Söylemesi Bizden',
  description:
    'Konut teslim süreci: iskan belgesi, anahtar teslimi protokolü, sayaç devri, tapu tescili ve teslim sonrası garanti hakları.',
};

const TESLIM_ASAMALARI = [
  {
    asama: 'İskan (Yapı Kullanma İzni) Alınması',
    kim: 'Müteahhit / Yapı Sahibi',
    sure: 'Teslimden 1–3 ay önce',
    aciklama: 'Belediye tescil ve denetim sürecidir. İskan belgesi olmadan tapu devri yapılamaz ve bağımsız bölüm hukuken kullanılamaz.',
    kritik: true,
  },
  {
    asama: 'Teslim Davetiyesi',
    kim: 'Müteahhit → Alıcı',
    sure: 'Yazılı bildirim, teslimden 15–30 gün önce',
    aciklama: 'Sözleşmedeki teslim tarihine yakın yazılı davetiye gönderilir. Tarihin gecikmesi durumunda gecikme ihtarı hazırlanmalıdır.',
    kritik: false,
  },
  {
    asama: 'Teknik Muayene (Keşif)',
    kim: 'Alıcı (teknik uzman ile)',
    sure: '1–3 gün',
    aciklama: 'Bağımsız bölümde kapsamlı muayene yapılır; ayıplar, eksikler ve sözleşmeden sapmalar tespit edilir.',
    kritik: true,
  },
  {
    asama: 'Ayıp Listesi (Punch List)',
    kim: 'Alıcı + Müteahhit',
    sure: 'Muayene günü imzalanır',
    aciklama: 'Tespit edilen tüm ayıplar detaylı olarak yazılır; müteahhit giderme tarihini taahhüt eder. Her iki tarafça imzalanması şarttır.',
    kritik: true,
  },
  {
    asama: 'Sayaç Devri',
    kim: 'Alıcı (idareye başvuru)',
    sure: '1–5 iş günü',
    aciklama: 'Elektrik, doğalgaz ve su abonelikleri yeni malike devredilir. Önceki borç kalmadığından emin olunmalıdır.',
    kritik: false,
  },
  {
    asama: 'Tapu Devri',
    kim: 'Tapu Müdürlüğü',
    sure: 'Randevu günü (genellikle 1–3 iş günü bekleme)',
    aciklama: 'İskan belgesi ibrazıyla tapu müdürlüğünde devir gerçekleştirilir. Tapu harcı aynı gün ödenir.',
    kritik: true,
  },
  {
    asama: 'Anahtar Teslimi',
    kim: 'Müteahhit → Alıcı',
    sure: 'Tapu devri sonrası veya eş zamanlı',
    aciklama: 'Tüm anahtarlar ve ortak alan kartları teslim edilir; teslim tutanağı imzalanır.',
    kritik: false,
  },
];

const AYIP_TURLERI = [
  {
    tur: 'Açık Ayıp',
    tanim: 'Teslim sırasında veya normal kullanımda kolayca fark edilebilen kusurlar.',
    ornekler: 'Çatlak boya, eğri kapı, kırık fayans, çalışmayan priz',
    ihbarSuresi: 'Teslimde veya en geç 30 gün içinde ihbar',
  },
  {
    tur: 'Gizli Ayıp',
    tanim: 'Teslim sırasında fark edilemeyen, ancak kullanım sırasında ortaya çıkan kusurlar.',
    ornekler: 'Çatı sızıntısı, ısı yalıtım yetersizliği, su tesisatı sorunları',
    ihbarSuresi: 'Keşfedilmesinden itibaren makul süre (TBK md. 223)',
  },
  {
    tur: 'Esaslı Ayıp',
    tanim: 'Mülkün kullanımını engelleyen veya önemli ölçüde kısıtlayan ağır kusurlar.',
    ornekler: 'Taşıyıcı sistem hasarı, deprem dayanımı yetersizliği',
    ihbarSuresi: 'Fark edildiğinde derhal; süre sınırı daha geniş yorumlanır',
  },
];

const GARANTI_HAKLARI = [
  { hak: '5 Yıl Yapı Müteahhidi Garantisi', dayanak: 'TBK md. 474', kapsam: 'Yapı ayıpları, gizli kusurlar, taşıyıcı sistem sorunları' },
  { hak: '2 Yıl Ekipman Garantisi', dayanak: 'Tüketici mevzuatı', kapsam: 'Mutfak donanımı, klima, ısıtma sistemi' },
  { hak: 'Ayıp Giderme Talebi', dayanak: 'TBK md. 475', kapsam: 'Ücretsiz onarım, bedel indirimi veya sözleşmeden dönme' },
  { hak: 'Kira Tazminatı', dayanak: 'TBK md. 112', kapsam: 'Ayıp nedeniyle kullanılamayan süre için kira kaybı tazminatı' },
];

const SAYAC_DEVIR_BELGE = [
  'Nüfus cüzdanı / pasaport (fotokopi)',
  'Tapu belgesi (yeni malik adına)',
  'İkametgah belgesi (talep edilirse)',
  'Önceki abonelerin borç yokluğu beyanı',
  'DASK poliçesi (elektrik aboneliği için zorunlu)',
  'Abonelik talep formu (kurum tarafından sağlanır)',
];

const SSS = [
  {
    soru: 'İskan belgesi olmadan taşınabilir miyim?',
    cevap: 'Fiilen taşınmak mümkün olsa da iskan belgesi olmayan yapıda abonelik açılamaz (elektrik, su, gaz) ve tapu devri yapılamaz. Pratikte hukuki ve güvenlik riskleri barındıran bir adımdır.',
  },
  {
    soru: 'Teslimde ayıp bulursam teslimi reddedebilir miyim?',
    cevap: 'Evet. Esaslı ayıplar teslimi haklı olarak reddettirmenize imkân tanır. Daha küçük ayıplarda ise teslimi kabul edip ayıp listesini imzalayarak müteahhitten düzeltmeyi talep etmek yaygın ve pratik yoldur.',
  },
  {
    soru: 'Ayıp ihbarını nasıl yapmalıyım?',
    cevap: 'İhbar, iadeli taahhütlü posta veya noter ihtarnamesi yoluyla yazılı olarak yapılmalıdır. Sözlü bildirim ispat güçlüğü yaratır; delil değeri yoktur.',
  },
  {
    soru: 'Tapu devri öncesinde ödeme yapılmalı mı?',
    cevap: 'Uygulamada son ödeme taksiti tapu devri ile eş zamanlı yapılır. Sözleşmede aksi belirtilmedikçe tapu almadan son ödemeyi yapmak risklidir; müteahhit iflası durumunda hak kaybı yaşanabilir.',
  },
];

export default function KonutTeslimSureciPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-14">
          <p className="text-[#00C49F] text-xs font-bold mb-3 uppercase tracking-widest">Alıcı Rehberi 2025</p>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">Konut Teslim Süreci</h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed">
            İskandan anahtar teslimine, ayıp ihbarından garanti haklarına: yeni konut tesliminde bilmeniz gereken her şey.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">

        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-base font-black text-gray-900 mb-4">Teslim Aşamaları</h2>
          <div className="space-y-3">
            {TESLIM_ASAMALARI.map((a, i) => (
              <div key={i} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className={`w-6 h-6 rounded-full text-white text-[10px] font-black flex items-center justify-center shrink-0 ${a.kritik ? 'bg-[#00C49F]' : 'bg-gray-300'}`}>{i + 1}</div>
                  {i < TESLIM_ASAMALARI.length - 1 && <div className="w-px flex-1 bg-gray-100 mt-1" />}
                </div>
                <div className="pb-4">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <p className="text-xs font-black text-gray-900">{a.asama}</p>
                    {a.kritik && <span className="text-[8px] font-black bg-rose-100 text-rose-600 px-1.5 py-0.5 rounded shrink-0">KRİTİK</span>}
                  </div>
                  <p className="text-[9px] text-[#00C49F] font-bold mb-1">{a.kim} · {a.sure}</p>
                  <p className="text-[11px] text-gray-500">{a.aciklama}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-base font-black text-gray-900 mb-4">Ayıp Türleri</h2>
          <div className="space-y-3">
            {AYIP_TURLERI.map((t, i) => (
              <div key={i} className="border border-gray-100 rounded-xl p-4">
                <p className="text-xs font-black text-gray-900 mb-1">{t.tur}</p>
                <p className="text-[11px] text-gray-500 mb-2">{t.tanim}</p>
                <p className="text-[10px] text-gray-400 mb-1">Örnekler: {t.ornekler}</p>
                <p className="text-[10px] text-[#00C49F] font-bold">İhbar: {t.ihbarSuresi}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-base font-black text-gray-900 mb-4">Yasal Garanti Hakları</h2>
          <div className="space-y-2">
            {GARANTI_HAKLARI.map((g, i) => (
              <div key={i} className="flex gap-3 py-2 border-b border-gray-50 last:border-0">
                <div className="shrink-0">
                  <p className="text-[10px] font-black text-gray-900">{g.hak}</p>
                  <p className="text-[9px] text-[#00C49F] font-bold">{g.dayanak}</p>
                </div>
                <p className="text-[11px] text-gray-500">{g.kapsam}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-base font-black text-gray-900 mb-4">Sayaç Devri İçin Gerekli Belgeler</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {SAYAC_DEVIR_BELGE.map((b, i) => (
              <div key={i} className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50">
                <div className="w-4 h-4 border-2 border-[#00C49F] rounded shrink-0" />
                <p className="text-[11px] text-gray-700">{b}</p>
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
          <p className="text-xs font-black text-amber-700 mb-2">En Kritik Adım</p>
          <p className="text-[11px] text-amber-600 leading-relaxed">
            Teknik muayeneyi bağımsız ve alanında uzman bir kişiyle (inşaat mühendisi veya mimar) yapın. Kendi gözünüzle fark edemeyeceğiniz ısı yalıtımı, taşıyıcı sistem ve su tesisatı sorunları yıllar sonra büyük maliyet doğurabilir. Muayene ücreti (2.000–5.000 ₺), tespit ettiği sorunlarla kolayca telafi edilir.
          </p>
        </div>

      </div>
    </main>
  );
}
