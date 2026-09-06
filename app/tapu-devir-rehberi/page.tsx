import { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle, AlertTriangle, ArrowRight, FileText } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Tapu Devir Rehberi | Adım Adım İşlem, Masraflar, Belgeler | Söylemesi Bizden',
  description:
    'Tapu devri nasıl yapılır? Gerekli belgeler, tapu harcı hesaplama, randevu alma ve tapu müdürlüğünde işlem adımları rehberi.',
};

const GEREKLI_BELGELER = [
  { belge: 'Nüfus Cüzdanı / Pasaport', taraf: 'Alıcı + Satıcı', zorunlu: true },
  { belge: 'Tapu Senedi (Aslı)', taraf: 'Satıcı', zorunlu: true },
  { belge: 'DASK Poliçesi', taraf: 'Satıcı', zorunlu: true },
  { belge: 'Belediyeden Rayiç Değer Belgesi', taraf: 'Alıcı', zorunlu: true },
  { belge: 'Fotoğraf (2 adet)', taraf: 'Alıcı + Satıcı', zorunlu: true },
  { belge: 'Vekaletname (varsa)', taraf: 'İlgili Taraf', zorunlu: false },
  { belge: 'Tapu Harcı Dekontu', taraf: 'Alıcı', zorunlu: true },
  { belge: 'Döner Sermaye Makbuzu', taraf: 'Alıcı', zorunlu: true },
];

const ISLEM_ADIMLARI = [
  { adim: 'Randevu Alın', aciklama: 'ALO 181 veya e-Randevu sistemi üzerinden Tapu Müdürlüğü randevusu alın. Büyük şehirlerde 1–2 hafta önceden alınması gerekebilir.', sure: '1–14 Gün Önce' },
  { adim: 'Belediye Rayiç Belgesi', aciklama: 'Alıcı, taşınmazın bağlı olduğu belediyeden "Emlak Rayiç Değeri" belgesi alır. Bu belge tapu harcı matrahını belirler.', sure: '1–3 Gün' },
  { adim: 'DASK Poliçesi Yenileme', aciklama: 'Satıcının mevcut DASK poliçesi yoksa veya süresi dolmuşsa, satış öncesi yenilenmesi zorunludur.', sure: 'Aynı Gün' },
  { adim: 'Harç Ödemesi', aciklama: 'Tapu harcı (alım değerinin %4\'ü + döner sermaye) İnteraktif Vergi Dairesi veya bankadan ödenir.', sure: 'Randevu Günü' },
  { adim: 'Tapu Müdürlüğünde İşlem', aciklama: 'Her iki taraf (veya vekilleri) randevu saatinde hazır olur; belgeler incelenir, beyan alınır, tapu sicil müdürü devri onaylar.', sure: '30–60 Dk' },
  { adim: 'Yeni Tapu Teslimi', aciklama: 'İşlem tamamlandıktan sonra alıcıya yeni tapu senedi verilir. e-Tapu uygulamasından da dijital tapu görüntülenebilir.', sure: 'Aynı Gün' },
];

const MASRAF_TABLOSU = [
  { masraf: 'Tapu Harcı', oran: '%4 (alıcı + satıcı %2+%2)', aciklama: 'Satış bedelinin veya rayiç değerin yüksek olanı esas alınır.' },
  { masraf: 'Döner Sermaye', oran: '1.500–3.000 ₺', aciklama: 'Her yıl yeniden belirlenir; Hazine ve Maliye Bakanlığı tarifesi geçerli.' },
  { masraf: 'DASK Poliçesi', oran: '500–2.500 ₺', aciklama: 'Bina yaşı ve yüzölçümüne göre değişir; alım öncesi yenilenmelidir.' },
  { masraf: 'Emlakçı Komisyonu', oran: '%2 + KDV (alıcı + satıcı)', aciklama: 'Yasal tavan %2; toplam %4 + KDV iki taraftan alınır.' },
  { masraf: 'Banka Masrafları (Kredi)', oran: 'Banka tarifesine göre', aciklama: 'Ekspertiz (500–2.000 ₺), ipotek tesis (1.000–3.000 ₺).' },
];

const DIKKAT_NOKTALAR = [
  { baslik: 'Rayiç Altında Beyan', aciklama: 'Tapu harcını azaltmak amacıyla düşük bedel beyan etmek cezai işleme yol açabilir; vergi dairesi gerçek değeri tespit edebilir.' },
  { baslik: 'İpotek ve Haciz Araştırması', aciklama: 'Satın almadan önce tapu müdürlüğünden veya e-Devlet\'ten tapu kaydını sorgulayın; ipotek, haciz veya şerh olup olmadığını kontrol edin.' },
  { baslik: 'Veraset İlamı', aciklama: 'Miras yoluyla gelen taşınmazlarda satıcının veraset ilamı ve intikal işleminin tamamlanmış olması gerekir.' },
  { baslik: 'Kat Mülkiyeti', aciklama: 'Satın aldığınız dairenin bağımsız bölüm numarasını ve tapuyu kontrol edin; arsa paylı tapuyla kat mülkiyeti tapusu farklıdır.' },
];

export default function TapuDevirRehberiPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-2 bg-[#00C49F]/20 border border-[#00C49F]/30 text-[#00C49F] text-xs font-bold px-4 py-1.5 rounded-full mb-5">
            <FileText size={13} /> Tapu Devri
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
            Tapu Devir Rehberi
          </h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed mb-8">
            Tapu devri adım adım: gerekli belgeler, masraflar, randevu alma ve tapu müdürlüğünde işlem süreci.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-[#00C49F]">%4</p>
              <p className="text-xs text-gray-400">Tapu harcı oranı</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-white">6 Adım</p>
              <p className="text-xs text-gray-400">Devir süreci</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-amber-400">ALO 181</p>
              <p className="text-xs text-gray-400">Randevu hattı</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">

        {/* Gerekli Belgeler */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4 flex items-center gap-2">
            <CheckCircle size={14} className="text-[#00C49F]" /> Gerekli Belgeler
          </h2>
          <div className="space-y-2">
            {GEREKLI_BELGELER.map((b, i) => (
              <div key={i} className="flex items-center justify-between py-1.5 border-b border-gray-50 last:border-0">
                <div className="flex items-center gap-2">
                  <CheckCircle size={11} className={b.zorunlu ? 'text-[#00C49F]' : 'text-gray-300'} />
                  <p className="text-xs font-bold text-gray-900">{b.belge}</p>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded font-black shrink-0 ${b.zorunlu ? 'bg-[#F0FDF8] text-[#00C49F]' : 'bg-gray-50 text-gray-400'}`}>
                  {b.taraf}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* İşlem Adımları */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">İşlem Adımları</h2>
          <div className="space-y-3">
            {ISLEM_ADIMLARI.map((a, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
                <div className="flex items-start justify-between mb-1">
                  <div className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full bg-[#00C49F] text-white text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5">{i + 1}</div>
                    <p className="text-xs font-black text-gray-900">{a.adim}</p>
                  </div>
                  <span className="text-[10px] bg-amber-50 text-amber-600 font-black px-2 py-0.5 rounded shrink-0">{a.sure}</span>
                </div>
                <p className="text-[10px] text-gray-600 leading-relaxed mt-1 ml-7">{a.aciklama}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Masraf Tablosu */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm overflow-x-auto">
          <h2 className="text-sm font-black text-gray-900 mb-4">Tapu Devir Masrafları</h2>
          <table className="w-full text-[10px] min-w-[400px]">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-2 font-black text-gray-500">Masraf</th>
                <th className="text-center py-2 font-black text-[#00C49F]">Oran / Tutar</th>
                <th className="text-left py-2 font-black text-gray-500">Açıklama</th>
              </tr>
            </thead>
            <tbody>
              {MASRAF_TABLOSU.map((m, i) => (
                <tr key={i} className="border-b border-gray-50">
                  <td className="py-2 font-black text-gray-900">{m.masraf}</td>
                  <td className="py-2 text-center font-black text-[#00C49F]">{m.oran}</td>
                  <td className="py-2 text-gray-600">{m.aciklama}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Dikkat Noktaları */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Dikkat Edilmesi Gerekenler</h2>
          <div className="space-y-3">
            {DIKKAT_NOKTALAR.map((d, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
                <p className="text-xs font-black text-rose-500 mb-1">{d.baslik}</p>
                <p className="text-[10px] text-gray-600 leading-relaxed">{d.aciklama}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Uyarı */}
        <section className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
          <AlertTriangle size={14} className="text-amber-600 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-800 leading-relaxed">
            <span className="font-black">Önemli:</span> Tapu devri öncesinde taşınmazın üzerindeki ipotek, haciz veya şerhleri e-Devlet ya da tapu müdürlüğü aracılığıyla sorgulamayı unutmayın.
          </p>
        </section>

        {/* Related */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-4">İlgili Araçlar</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { href: '/tapu-masrafi', label: 'Tapu Masrafı Hesaplayıcı' },
              { href: '/ilk-ev-alma-rehberi', label: 'İlk Ev Alma Rehberi' },
              { href: '/dask-hesaplayici', label: 'DASK Prim Hesaplayıcı' },
              { href: '/sozlesme-iptal-cayma', label: 'Sözleşme İptal Rehberi' },
              { href: '/konut-kredisi-simulatoru', label: 'Konut Kredisi Simülatörü' },
              { href: '/hisseli-tapu', label: 'Hisseli Tapu Rehberi' },
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
