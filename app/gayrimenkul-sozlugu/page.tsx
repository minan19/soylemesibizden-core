import { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, Search, ArrowRight } from 'lucide-react';
import GlossaryClient from './GlossaryClient';

export const metadata: Metadata = {
  title: 'Gayrimenkul Sözlüğü | Terimler ve Tanımlar | Söylemesi Bizden',
  description:
    'Türk gayrimenkul sektöründe kullanılan tüm terimler, kavramlar ve açıklamaları. Tapu, ipotek, imar, DASK ve daha fazlası.',
};

const TERMS = [
  { term: 'Tapu', letter: 'T', definition: 'Bir mülkün kime ait olduğunu gösteren resmi belgedir. Tapu ve Kadastro Genel Müdürlüğü (TKGM) tarafından düzenlenir.', related: ['Kat Mülkiyeti', 'İpotek'], links: [{ href: '/tapu-masrafi', label: 'Tapu Masrafı Hesapla' }] },
  { term: 'Kat Mülkiyeti', letter: 'K', definition: 'Tamamlanmış bir binanın bağımsız bölümleri (daire, işyeri vb.) üzerinde kurulan mülkiyet hakkıdır. Her bağımsız bölüm ayrı tapu alabilir.', related: ['Tapu', 'Arsa Payı'] },
  { term: 'Kat İrtifakı', letter: 'K', definition: 'İnşaat halindeki bir binanın bağımsız bölümleri üzerinde kurulan haktır. Bina tamamlandıktan sonra kat mülkiyetine çevrilir.', related: ['Kat Mülkiyeti'] },
  { term: 'DASK', letter: 'D', definition: 'Doğal Afet Sigortaları Kurumu\'nun yönettiği zorunlu deprem sigortası. Tapu devri yapılabilmesi için aktif DASK poliçesi zorunludur.', links: [{ href: '/tapu-masrafi', label: 'Tapu Masraflarına Bak' }] },
  { term: 'İpotek', letter: 'İ', definition: 'Bir borç karşılığında taşınmaz üzerine konulan rehin hakkıdır. Konut kredisi ödendiğinde ipotek kaldırılır.', related: ['Konut Kredisi', 'Tapu'] },
  { term: 'Konut Kredisi', letter: 'K', definition: 'Gayrimenkul alımı için bankalardan kullanılan uzun vadeli kredidir. BDDK kurallarına göre mülk değerinin en fazla %80\'i kredilendirilir.', related: ['İpotek', 'Tapu Harcı'], links: [{ href: '/hesaplama', label: 'Kredi Hesapla' }, { href: '/banka-kredileri', label: 'Banka Faizleri' }] },
  { term: 'Tapu Harcı', letter: 'T', definition: 'Gayrimenkul alım-satım işlemlerinde ödenen devlet harcıdır. Toplam harç oranı %4\'tür (alıcı ve satıcı birer %2 öder).', links: [{ href: '/tapu-masrafi', label: 'Tapu Masrafı Hesapla' }] },
  { term: 'Rayiç Bedel', letter: 'R', definition: 'Belediye ya da devlet tarafından belirlenen, vergi hesaplamalarında kullanılan taşınmaz değeridir. Piyasa fiyatından farklı olabilir.', related: ['Emlak Vergisi'], links: [{ href: '/emlak-vergisi', label: 'Emlak Vergisi Hesapla' }] },
  { term: 'Emlak Vergisi', letter: 'E', definition: 'Taşınmaz mülkler için her yıl Mayıs ve Kasım aylarında iki taksit halinde ödenen yerel vergidir. Oran belediye türüne ve mülk cinsine göre %0.1-%0.6 arasında değişir.', links: [{ href: '/emlak-vergisi', label: 'Emlak Vergisi Hesapla' }] },
  { term: 'Arsa Payı', letter: 'A', definition: 'Bir apartmanın toplam arsasından her bağımsız bölüme düşen paydır. Yıkım veya yeniden yapım kararlarında arsa payı belirleyicidir.' },
  { term: 'İmar Planı', letter: 'İ', definition: 'Belediyelerin hazırladığı, arazilerin kullanım amaçlarını (konut, ticari, yeşil alan vb.) belirleyen plandır. Yapı ruhsatı almak için imar iznine uyulması şarttır.' },
  { term: 'Yapı Ruhsatı', letter: 'Y', definition: 'İnşaat başlamadan önce belediyeden alınan izin belgesidir. Ruhsatsız yapılar yıkım kararıyla karşılaşabilir.' },
  { term: 'İskan', letter: 'İ', definition: 'Yapı kullanma izin belgesi. İnşaatın projeye uygun tamamlandığını gösteren belgedir. İskan olmayan binalar için doğalgaz ve su bağlanamaz.' },
  { term: 'Kira Getirisi', letter: 'K', definition: 'Gayrimenkulden elde edilen yıllık kira gelirinin mülkün değerine oranıdır (%). Brüt getiri = Yıllık kira / Satış fiyatı x 100.', links: [{ href: '/yatirim-analizi', label: 'Getiri Hesapla' }] },
  { term: 'Kira Artış Oranı', letter: 'K', definition: 'TBK m. 344 uyarınca kira artışı, önceki 12 ayın TÜFE ortalamasını geçemez. 2022-2024 arası geçici %25 tavan uygulandı.', links: [{ href: '/kira-artis-hesaplama', label: 'Kira Artışı Hesapla' }] },
  { term: 'Depozito', letter: 'D', definition: 'Kiracının sözleşme başlangıcında ev sahibine verdiği güvence bedelidir. Yasal sınır en fazla 3 aylık kira tutarıdır.' },
  { term: 'TÜFE', letter: 'T', definition: 'Tüketici Fiyat Endeksi. TÜİK tarafından aylık yayımlanan, hayat pahalılığını gösteren endekstir. Kira artışı hesaplamalarında 12 aylık ortalama TÜFE kullanılır.' },
  { term: 'Kat Karşılığı', letter: 'K', definition: 'Arsa sahibinin arsasını müteahhide vererek yeni inşaat yapılmasını sağladığı, karşılığında daireler aldığı anlaşma türüdür.' },
  { term: 'Müteahhit', letter: 'M', definition: 'İnşaat projelerini üstlenen ve yürüten şirket ya da kişidir. Birinci el satışlarda müteahhitten alınan mülklerde KDV uygulanır.' },
  { term: 'KDV', letter: 'K', definition: 'Katma Değer Vergisi. Müteahhitten ilk el gayrimenkul alımında uygulanır: 150m²\'ye kadar %1, 150-500m² arası %8, 500m²\'den büyük veya ticari için %20.', links: [{ href: '/tapu-masrafi', label: 'KDV Hesaplamasına Bak' }] },
  { term: 'Portföy', letter: 'P', definition: 'Bir yatırımcının sahip olduğu tüm gayrimenkul varlıklarının toplamıdır. Portföy analizi, toplam değer, getiri oranı ve risk dağılımını değerlendirir.', links: [{ href: '/portfoy', label: 'Portföy Takibi' }] },
  { term: 'Bağımsız Bölüm', letter: 'B', definition: 'Bir yapı içinde ayrı kullanıma özgülenmiş, kendi başına kullanılabilen bölümdür. Her bağımsız bölümün ayrı tapu kütüğü numarası vardır.' },
  { term: 'Ön Alım Hakkı', letter: 'Ö', definition: 'Paylı mülkiyette diğer paydaşların, payı satın almak istediklerinde öncelik hakkıdır. Hisseli tapularda uygulanır.' },
  { term: 'Satış Vaadi Sözleşmesi', letter: 'S', definition: 'Resmi tapu devri gerçekleşmeden önce alıcı ve satıcı arasında noter huzurunda yapılan sözleşmedir. Bağlayıcıdır ancak tapu tescilinin yerini tutmaz.' },
  { term: 'Gayrimenkul Değerleme', letter: 'G', definition: 'Bir taşınmazın piyasa değerinin uzman bir değerleme uzmanı tarafından bilimsel yöntemlerle belirlenmesidir.', links: [{ href: '/valuation', label: 'Değerleme Aracı' }] },
];

const LETTERS = Array.from(new Set(TERMS.map(t => t.letter))).sort();

export default function GayrimenkulSozluguPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-800 to-slate-900 text-white">
        <div className="max-w-5xl mx-auto px-6 py-14">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
              <BookOpen size={22} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-black tracking-tight">Gayrimenkul Sözlüğü</h1>
              <p className="text-slate-400 text-sm mt-0.5">{TERMS.length} terim · A&apos;dan Z&apos;ye</p>
            </div>
          </div>
          <p className="text-slate-300 text-sm max-w-xl leading-relaxed">
            Türk gayrimenkul sektöründe sıkça kullanılan terimler, hukuki kavramlar ve finansal
            göstergeler. Alıcı, satıcı veya yatırımcı olarak bilmeniz gerekenler.
          </p>

          {/* Alphabet index */}
          <div className="flex flex-wrap gap-2 mt-6">
            {LETTERS.map(l => (
              <a
                key={l}
                href={`#letter-${l}`}
                className="w-8 h-8 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-lg text-xs font-bold text-white transition-colors"
              >
                {l}
              </a>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 py-10 space-y-8">

        {/* Client-side search */}
        <GlossaryClient terms={TERMS} />

        {/* Related links */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
            <ArrowRight size={14} className="text-[#00C49F]" /> İlgili Araçlar
          </h3>
          <div className="flex flex-wrap gap-3">
            {[
              { href: '/hesaplama', label: 'Kredi Hesaplayıcı' },
              { href: '/tapu-masrafi', label: 'Tapu Masrafı' },
              { href: '/emlak-vergisi', label: 'Emlak Vergisi' },
              { href: '/kira-artis-hesaplama', label: 'Kira Artışı' },
              { href: '/yatirim-analizi', label: 'Yatırım Analizi' },
              { href: '/rehber', label: 'Konut Rehberi' },
            ].map(l => (
              <Link
                key={l.href}
                href={l.href}
                className="px-4 py-2 bg-gray-50 hover:bg-[#F0FDF8] border border-gray-200 hover:border-[#00C49F] rounded-xl text-xs font-semibold text-gray-600 hover:text-[#00C49F] transition-all"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
