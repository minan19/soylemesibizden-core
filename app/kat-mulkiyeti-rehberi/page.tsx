import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kat Mülkiyeti Rehberi 2025 | Haklar, Aidatlar ve Ortak Alan | Söylemesi Bizden',
  description:
    'Kat mülkiyeti: apartman ve site yönetimi, aidat yükümlülükleri, ortak alan hakları, kat malikleri kurulu ve yasal dayanak.',
};

const KAT_MULKIYETI_TANIMLARI = [
  {
    kavram: 'Kat Mülkiyeti',
    tanim: 'Tamamlanmış bir yapının ayrı ayrı kullanılmaya elverişli bağımsız bölümleri üzerinde kurulan mülkiyet hakkıdır.',
    kanun: 'KMK Madde 1',
  },
  {
    kavram: 'Kat İrtifakı',
    tanim: 'Yapı henüz tamamlanmadan arsa üzerinde kurulan, bağımsız bölüm sahiplerine belirli haklar tanıyan ön aşama hakkıdır.',
    kanun: 'KMK Madde 14',
  },
  {
    kavram: 'Bağımsız Bölüm',
    tanim: 'Kat mülkiyetine konu olan; daire, büro, dükkan, depo veya mahzen gibi ayrı kullanıma elverişli yapı parçasıdır.',
    kanun: 'KMK Madde 2',
  },
  {
    kavram: 'Ortak Alan',
    tanim: 'Zemin, çatı, merdiven, asansör, kapıcı dairesi, kazan dairesi, sığınak gibi bütün kat maliklerinin ortak kullandığı yerler.',
    kanun: 'KMK Madde 4',
  },
  {
    kavram: 'Arsa Payı',
    tanim: 'Her bağımsız bölüme özgülenen, tapu kütüğünde gösterilen arsa üzerindeki ortak mülkiyet payıdır.',
    kanun: 'KMK Madde 3',
  },
  {
    kavram: 'Yönetim Planı',
    tanim: 'Kat maliklerinin haklar ve yükümlülüklerini, yönetimin nasıl yürütüleceğini düzenleyen sözleşme niteliğindeki belge.',
    kanun: 'KMK Madde 28',
  },
];

const YONETICI_GOREVLER = [
  { gorev: 'Ortak gider bütçesini hazırlamak ve uygulamak', kapsam: 'Zorunlu' },
  { gorev: 'Yapı sigortasını (DASK dahil) yaptırmak', kapsam: 'Zorunlu' },
  { gorev: 'Ortak yerlerin bakım, onarım ve temizliğini sağlamak', kapsam: 'Zorunlu' },
  { gorev: 'Kat malikleri kurulunu toplantıya çağırmak', kapsam: 'Zorunlu' },
  { gorev: 'Avans ve aidatları toplamak, giderleri ödemek', kapsam: 'Zorunlu' },
  { gorev: 'Muhasebe kayıtlarını tutmak ve raporlamak', kapsam: 'Zorunlu' },
  { gorev: 'Kapıcı/güvenlik personelini yönetmek', kapsam: 'Gerekirse' },
  { gorev: 'Kat malikleri adına dava açmak ve davaya taraf olmak', kapsam: 'Gerekirse' },
];

const AIDAT_GIDER_KALEMLERI = [
  { kalem: 'Temizlik ve Çevre Bakımı', ortalamaPay: '%20–25', aciklama: 'Ortak alan temizliği, bahçe bakımı' },
  { kalem: 'Güvenlik / Kapıcı Gideri', ortalamaPay: '%25–35', aciklama: 'Personel ücreti, sosyal güvenlik' },
  { kalem: 'Elektrik (Ortak Alan)', ortalamaPay: '%10–15', aciklama: 'Asansör, aydınlatma, otomat' },
  { kalem: 'Bakım ve Onarım Fonu', ortalamaPay: '%10–15', aciklama: 'Asansör, mekanik sistem periyodik bakım' },
  { kalem: 'Sigorta (DASK + Bina)', ortalamaPay: '%5–10', aciklama: 'Zorunlu deprem + isteğe bağlı bina sigortası' },
  { kalem: 'Su / Doğalgaz (Ortak)', ortalamaPay: '%5–10', aciklama: 'Sıcak su, kalorifer, kazan dairesi' },
  { kalem: 'Yönetim / Muhasebe', ortalamaPay: '%5–8', aciklama: 'Yönetici ücreti, muhasebe hizmeti' },
  { kalem: 'İhtiyat / Birikim Fonu', ortalamaPay: '%5–10', aciklama: 'Büyük onarım ve yenileme için birikim' },
];

const KARAR_NISAPLARI = [
  {
    karar: 'Olağan yönetim işleri (bakım, onarım)',
    nisap: 'Oy çokluğu',
    katilim: 'Toplantı yeter sayısı gerekli',
    aciklama: 'Değerlere göre hesaplanır (arsa payı)',
  },
  {
    karar: 'Yönetici seçimi / görevden alınması',
    nisap: 'Kat malikleri sayısının salt çoğunluğu + arsa payı çoğunluğu',
    katilim: '1/3 salt çoğunluk',
    aciklama: 'Her iki koşulun birlikte sağlanması şarttır',
  },
  {
    karar: 'Yönetim planı değişikliği',
    nisap: '4/5 çoğunluk',
    katilim: 'Arsa payı ve kat maliki sayısına göre',
    aciklama: 'Yüksek nisap; oybirliği aranmaz ama ağır çoğunluk şarttır',
  },
  {
    karar: 'Ana taşıyıcı değişikliği, büyük tadilat',
    nisap: 'Oybirliği',
    katilim: 'Tüm kat maliklerinin katılımı',
    aciklama: 'Yapının taşıyıcı sistemini etkileyen işler',
  },
  {
    karar: 'Kentsel dönüşüm kararı (riskli yapı)',
    nisap: '2/3 çoğunluk',
    katilim: 'Arsa payı üzerinden',
    aciklama: '6306 sayılı Kanun kapsamında',
  },
];

const SIKAYETT_YOLLARI = [
  {
    yol: 'Kat Malikleri Kurulu',
    sure: 'Sonraki olağan / olağanüstü toplantı',
    avantaj: 'Ücretsiz, hızlı, gönüllü çözüm',
    dezavantaj: 'Çoğunluk sağlanamazsa sonuçsuz kalabilir',
  },
  {
    yol: 'Sulh Hukuk Mahkemesi',
    sure: '3–12 ay',
    avantaj: 'Bağlayıcı karar, icra edilebilir',
    dezavantaj: 'Yargılama ücreti, zaman alıcı',
  },
  {
    yol: 'Arabuluculuk',
    sure: '1–4 hafta',
    avantaj: 'Hızlı, düşük maliyetli, gizli',
    dezavantaj: 'Tarafların anlaşması zorunlu',
  },
  {
    yol: 'İcra Takibi (Aidat Borcu)',
    sure: '1–3 ay',
    avantaj: 'Gecikme faizi + icra masrafı alacaklıdan',
    dezavantaj: 'Yalnızca parasal alacaklar için',
  },
];

const SSS = [
  {
    soru: 'Aidat borcu olan kat maliki oy kullanabilir mi?',
    cevap: 'Evet, KMK oy hakkını aidatın ödenmesine bağlamaz; ancak borçlu malikten alacak icra yoluyla tahsil edilebilir.',
  },
  {
    soru: 'Yönetici apartman dışından biri olabilir mi?',
    cevap: 'Evet, KMK Madde 34 gereği yönetici kat maliki olmak zorunda değildir; dışarıdan profesyonel yönetici atanabilir.',
  },
  {
    soru: 'Komşu gürültüsü için hangi yola başvurulur?',
    cevap: 'Önce yöneticiye yazılı şikâyet, ardından gürültü kaynağına ihtarname, son çare Sulh Hukuk Mahkemesi veya Kabahatler Kanunu kapsamında idari şikâyet.',
  },
  {
    soru: 'Bağımsız bölümü kiraya verirken yönetim onayı gerekli mi?',
    cevap: 'Hayır; kat maliki kendi bağımsız bölümünü serbestçe kiraya verebilir. Ancak kiracılar da yönetim planı hükümlerine uymak zorundadır.',
  },
  {
    soru: 'Ortak alana ekleme / değişiklik için ne gerekir?',
    cevap: 'Ortak yerlerde değişiklik, KMK Madde 19 gereği tüm kat maliklerinin oybirliği ile alınan karara bağlıdır.',
  },
];

export default function KatMulkiyetiRehberiPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-14">
          <p className="text-[#00C49F] text-xs font-bold mb-3 uppercase tracking-widest">Hukuki Rehber 2025</p>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">Kat Mülkiyeti Rehberi</h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed">
            Apartman ve site sakinleri için kat mülkiyeti: temel kavramlar, yönetici görevleri, aidat gider kalemleri ve uyuşmazlık çözümü.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">

        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-base font-black text-gray-900 mb-4">Temel Kavramlar (634 Sayılı KMK)</h2>
          <div className="space-y-3">
            {KAT_MULKIYETI_TANIMLARI.map((k, i) => (
              <div key={i} className="border border-gray-100 rounded-xl p-4">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-xs font-black text-gray-900">{k.kavram}</p>
                  <span className="text-[9px] font-black text-[#00C49F] shrink-0 ml-4">{k.kanun}</span>
                </div>
                <p className="text-[11px] text-gray-500 leading-relaxed">{k.tanim}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-base font-black text-gray-900 mb-4">Yönetici Görevleri</h2>
          <div className="space-y-2">
            {YONETICI_GOREVLER.map((g, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                <p className="text-[11px] text-gray-700">{g.gorev}</p>
                <span className={`text-[9px] font-black px-2 py-0.5 rounded shrink-0 ml-3 ${g.kapsam === 'Zorunlu' ? 'bg-[#00C49F] text-white' : 'bg-gray-100 text-gray-500'}`}>{g.kapsam}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm overflow-x-auto">
          <h2 className="text-base font-black text-gray-900 mb-1">Aidat Gider Kalemleri</h2>
          <p className="text-xs text-gray-400 mb-5">Tipik apartman/site bütçesinde ortalama pay dağılımı.</p>
          <table className="w-full text-[10px] min-w-[440px]">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-2 font-black text-gray-500">Gider Kalemi</th>
                <th className="text-center py-2 font-black text-gray-500">Ort. Pay</th>
                <th className="text-right py-2 font-black text-[#00C49F]">Kapsam</th>
              </tr>
            </thead>
            <tbody>
              {AIDAT_GIDER_KALEMLERI.map((a, i) => (
                <tr key={i} className="border-b border-gray-50 last:border-0">
                  <td className="py-2 font-black text-gray-900">{a.kalem}</td>
                  <td className="py-2 text-center font-bold text-[#00C49F]">{a.ortalamaPay}</td>
                  <td className="py-2 text-right text-gray-400">{a.aciklama}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm overflow-x-auto">
          <h2 className="text-base font-black text-gray-900 mb-1">Karar Nisapları</h2>
          <p className="text-xs text-gray-400 mb-5">Kat malikleri kurulunda kararlar için gereken oy çoğunlukları.</p>
          <div className="space-y-3">
            {KARAR_NISAPLARI.map((k, i) => (
              <div key={i} className="border border-gray-100 rounded-xl p-4">
                <div className="flex items-start justify-between mb-1 gap-3">
                  <p className="text-xs font-black text-gray-900">{k.karar}</p>
                  <span className="text-[9px] font-black bg-amber-100 text-amber-700 px-2 py-0.5 rounded shrink-0">{k.nisap}</span>
                </div>
                <p className="text-[10px] text-gray-400">{k.aciklama}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-base font-black text-gray-900 mb-4">Uyuşmazlık Çözüm Yolları</h2>
          <div className="space-y-3">
            {SIKAYETT_YOLLARI.map((s, i) => (
              <div key={i} className="border border-gray-100 rounded-xl p-4">
                <div className="flex justify-between mb-2">
                  <p className="text-xs font-black text-gray-900">{s.yol}</p>
                  <span className="text-[9px] text-gray-400 shrink-0 ml-3">{s.sure}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <p className="text-[10px] text-emerald-600 font-bold">+ {s.avantaj}</p>
                  <p className="text-[10px] text-rose-500 font-bold">− {s.dezavantaj}</p>
                </div>
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

        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5">
          <p className="text-xs font-black text-blue-700 mb-2">Yönetim Planı Neden Önemlidir?</p>
          <p className="text-[11px] text-blue-600 leading-relaxed">
            Kat mülkiyeti tesis edilirken hazırlanan yönetim planı, tapuya tescil edilen ve tüm kat maliklerini bağlayan temel belgedir. Satın alma öncesinde yönetim planını, aidat miktarını ve birikmiş borçları mutlaka inceleyin; ihtiyat fonu yeterliği büyük onarım masraflarını öngörmenizi sağlar.
          </p>
        </div>

      </div>
    </main>
  );
}
