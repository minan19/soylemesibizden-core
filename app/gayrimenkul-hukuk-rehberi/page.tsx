import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gayrimenkul Hukuk Rehberi | Alım Satım ve Kira Hukuku | Söylemesi Bizden',
  description:
    'Gayrimenkul hukuku rehberi: tapu devri, ön sözleşme, kira hakları, kamulaştırma, imar hukuku ve sık sorulan hukuki sorular.',
};

const TEMEL_KONULAR = [
  {
    baslik: 'Tapu Devri ve Tescil',
    icerik: [
      'Gayrimenkul mülkiyeti ancak tapu siciline tescil ile kazanılır (TMK md. 705).',
      'Sözlü veya yazılı satış vaadi tapusuz devir oluşturmaz; sadece borç doğurur.',
      'Tapusuz gayrimenkul alımı büyük hukuki risk taşır; noterde ön sözleşme yapılmalıdır.',
      'Tapu devri sırasında tapu harcı (%4) her iki tarafça ayrı ayrı ödenir.',
      'Yabancı uyruklu alıcılar Türkiye\'de gayrimenkul satın alabilir; askeri yasak bölgeler hariç.',
    ],
  },
  {
    baslik: 'Ön Sözleşme (Satış Vaadi)',
    icerik: [
      'Tapu olmadan yapılan satış vaadi sözleşmesi noterde düzenlenmelidir; aksi halde geçersizdir.',
      'Tapu Siciline şerh ettirilen satış vaadi 5 yıl geçerlidir; üçüncü kişilere karşı da koruma sağlar.',
      'Satıcı taahhüdünü yerine getirmezse alıcı ayni hak tescili davası açabilir.',
      'Ön sözleşme bedelinin tamamı ödenmişse mahkeme tapu devrini zorlayabilir.',
    ],
  },
  {
    baslik: 'İpotek ve Kredi Hukuku',
    icerik: [
      'Konut kredisi için taşınmaz üzerine ipotek kurulur; kredi ödendikten sonra ipotek kaldırılmalıdır.',
      'İpotek derecesi önemlidir: 1. dereceden ipotek alacaklısı satış gelirinden önce pay alır.',
      'İpotekli taşınmazı satmak için bankanın onayı veya borcun kapatılması gerekir.',
      'Kat irtifakı veya kat mülkiyeti tapusunda ipotek kurulabilir; arsa payı üzerinden değil.',
    ],
  },
  {
    baslik: 'Kira Hukuku Özeti',
    icerik: [
      'Kira sözleşmesi tarafların anlaşmasıyla yapılır; yazılı olması ispat kolaylığı sağlar.',
      'Konut kiralarında yıllık artış TÜFE oranı ile sınırlıdır; %25 tavan uygulanmaktadır.',
      'Kiracı, kira bedelini her ay peşin ödemekle yükümlüdür (TBK md. 314).',
      'Tahliye taahhüdü noterden veya noter onaylı olmalıdır; adi yazılı taahhüt icra yoluyla geçerli değildir.',
      'Kiraya veren depozitoyu tahliyeden 1 ay içinde geri vermek zorundadır; aksi halde faiz işler.',
    ],
  },
  {
    baslik: 'Kamulaştırma Hukuku',
    icerik: [
      'Devlet, kamu yararı kararıyla özel mülke kamulaştırma (istimlak) kararı alabilir.',
      'Kamulaştırma bedeli piyasa değeri üzerinden nakden ödenir; itiraz hakkı saklıdır.',
      'Bedele itiraz 30 gün içinde asliye hukuk mahkemesine yapılmalıdır.',
      'Kamulaştırmasız el atma durumunda taşınmaz sahibi tam bedel ile tazminat talep edebilir.',
    ],
  },
  {
    baslik: 'İmar ve Yapı Hukuku',
    icerik: [
      'İnşaat ruhsatı olmadan yapılan yapılar kaçak yapıdır; yıkım kararı alınabilir.',
      'İmara aykırı tadilat (duvar yıkma, eklenti) da ruhsat gerektirebilir.',
      'İskan (yapı kullanma izni) olmadan tapuya kat mülkiyeti kurulamaz.',
      'Kat mülkiyeti kurulmamış yapılarda eşdeğer paylaşım ancak kat irtifakıyla mümkündür.',
    ],
  },
];

const SIK_SORULAR = [
  {
    soru: 'Ticari kira sözleşmesinde artış sınırı var mı?',
    cevap: 'Hayır. %25 tavan yalnızca konut kiralarını kapsar; işyeri kiralarında taraflar serbestçe oran belirleyebilir.',
  },
  {
    soru: 'Tapuyu gören alan mağdur olur mu?',
    cevap: 'Tapu sicilinin aleni olduğu ve iyiniyetle edinilen hakların korunduğu kuralı geçerlidir (TMK md. 1023); ancak gerçek malik gizli anlaşmayı ispat ederse tescili iptal ettirebilir.',
  },
  {
    soru: 'Eşin onayı olmadan ev satılabilir mi?',
    cevap: 'Aile konutu şerhi varsa hayır (TMK md. 194). Ortak mülkiyette ise her pay sahibinin onayı gerekir. Tek malikin aile konutunda ise noterde eş rızası aranır.',
  },
  {
    soru: 'Satıştan kaçınan kiracı ne zaman zorla çıkarılabilir?',
    cevap: 'İcra ve tahliye kararı kesinleştikten sonra icra müdürlüğü aracılığıyla zorla tahliye yapılabilir; bu süreç ortalama 3–9 ay sürer.',
  },
  {
    soru: 'Gizli ayıp nedeniyle satıcıya ne zaman başvurulabilir?',
    cevap: 'Satın alma tarihinden itibaren 5 yıl (TBK md. 231); ancak ayıbın öğrenilmesinden itibaren 1 yıl içinde bildirim yapılmalıdır.',
  },
];

export default function GayrimenkulHukukRehberiPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-14">
          <p className="text-[#00C49F] text-xs font-bold mb-3 uppercase tracking-widest">Hukuki Rehber</p>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">Gayrimenkul Hukuk Rehberi</h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed">
            Tapu devri, kira hukuku, ipotek, kamulaştırma ve imar konularında temel hukuki bilgiler.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-10 space-y-10">

        {/* Temel Konular */}
        {TEMEL_KONULAR.map((konu, i) => (
          <div key={i} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <h2 className="text-sm font-black text-gray-900 mb-4">{konu.baslik}</h2>
            <ul className="space-y-2">
              {konu.icerik.map((m, j) => (
                <li key={j} className="flex gap-2">
                  <span className="text-[#00C49F] font-black text-xs shrink-0 mt-0.5">•</span>
                  <p className="text-[11px] text-gray-600 leading-relaxed">{m}</p>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Sık Sorulan Sorular */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-1">Sık Sorulan Hukuki Sorular</h2>
          <p className="text-xs text-gray-400 mb-5">Gayrimenkul alım satım ve kirasında en çok merak edilen sorular.</p>
          <div className="space-y-4">
            {SIK_SORULAR.map((s, i) => (
              <div key={i} className="border border-gray-100 rounded-xl p-4">
                <p className="text-xs font-black text-gray-900 mb-2">❓ {s.soru}</p>
                <p className="text-[11px] text-gray-600 leading-relaxed">{s.cevap}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5">
          <p className="text-xs font-black text-amber-700 mb-1">⚠ Yasal Uyarı</p>
          <p className="text-[11px] text-amber-600 leading-relaxed">
            Bu sayfa genel bilgilendirme amaçlıdır. Her hukuki durum kendine özgüdür. Tapu devri, kira anlaşmazlığı veya diğer hukuki işlemler için bir gayrimenkul avukatından kişisel danışmanlık alınması önerilir.
          </p>
        </div>

      </div>
    </main>
  );
}
