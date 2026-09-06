import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'İnşaat Ruhsatı Rehberi 2025 | Yapı Ruhsatı ve İskan | Söylemesi Bizden',
  description:
    'Türkiye\'de inşaat ruhsatı nasıl alınır: başvuru süreci, gerekli belgeler, iskan izni, kaçak yapı riskleri ve İmar Kanunu hükümleri.',
};

const RUHSAT_TURLERI = [
  {
    tur: 'Yapı Ruhsatı',
    tanim: 'Yeni bina veya mevcut yapıya ek inşaat yapılabilmesi için belediyeden alınan izin belgesi.',
    gerekli: 'Arsa tapusu, mimari proje, zemin etüdü, mühendis imzası',
    sure: '30–90 gün (belediyeye göre)',
  },
  {
    tur: 'Tadilat Ruhsatı',
    tanim: 'Mevcut binanın taşıyıcı sistem, cephe veya kat planında değişiklik gerektiren tadilatları için alınan ruhsat.',
    gerekli: 'Mevcut tapu, proje tadilatı, idare onayı',
    sure: '15–45 gün',
  },
  {
    tur: 'Yıkım Ruhsatı',
    tanim: 'Mevcut yapının yıkılabilmesi için belediyeden alınan izin; kentsel dönüşüm projelerinde de gereklidir.',
    gerekli: 'Tapu, statik rapor, DASK iptali',
    sure: '7–30 gün',
  },
  {
    tur: 'İskan İzni (Yapı Kullanma İzni)',
    tanim: 'Tamamlanan binanın insanın yaşamasına uygun olduğunu belgeleyen ve oturulabilirliğini onaylayan izin.',
    gerekli: 'Yapı denetim raporu, sığınak belgesi, yangın raporu, DASK',
    sure: '15–60 gün',
  },
];

const BASVURU_ADIMLARI = [
  { adim: 1, baslik: 'İmar Durumu Sorgulama', aciklama: 'Parselin imar planındaki kullanım amacını, yapılaşma koşullarını (TAKS, KAKS, emsal) belediyeden öğrenin.' },
  { adim: 2, baslik: 'Proje Hazırlama', aciklama: 'Mimar ve mühendislere onaylı mimari, statik, elektrik ve mekanik projeler hazırlatın. Tüm projeler ilgili oda onayına taşınsın.' },
  { adim: 3, baslik: 'Zemin Etüdü', aciklama: 'Deprem yönetmeliği kapsamında zemin etüdü raporu zorunludur. Akredite firmalardan alın.' },
  { adim: 4, baslik: 'Yapı Denetim Sözleşmesi', aciklama: '2000 yılı sonrasında tüm yapılarda yapı denetim firması zorunludur. Lisanslı firmayla sözleşme yapın.' },
  { adim: 5, baslik: 'Belediye Başvurusu', aciklama: 'Tüm belgelerle birlikte ilgili belediyenin imar müdürlüğüne başvurun. e-Belediye sistemi üzerinden dijital başvuru da mümkün.' },
  { adim: 6, baslik: 'Harç Ödemesi', aciklama: 'İnşaat ruhsatı harcı proje bedeli üzerinden hesaplanır. İnşaat metrekare bazlı harç cetveline göre ödeme yapılır.' },
  { adim: 7, baslik: 'Ruhsat Teslimi', aciklama: 'Onaylı ruhsat teslim alınır. Ruhsat tarihinden itibaren 2 yıl içinde inşaata başlanması zorunludur.' },
];

const KAÇAK_YAPI_RISKLERI = [
  { risk: 'Yıkım Kararı', aciklama: 'İmara aykırı yapı belediye veya mahkeme kararıyla yıkılabilir; tadilat masrafları mal sahibine aittir.' },
  { risk: 'Para Cezası', aciklama: 'İmar Kanunu md. 42\'ye göre imara aykırı her m² için idari para cezası uygulanır; bu ceza yapı büyüdükçe artar.' },
  { risk: 'Satış / Devir Güçlüğü', aciklama: 'İskan belgesi olmayan taşınmazların satışı yasal olarak mümkün olsa da banka kredisi verilmez; alıcı bulmak zorlaşır.' },
  { risk: 'Sigorta Geçersizliği', aciklama: 'DASK ve konut sigortası, iskan belgesi olmayan yapılarda tam teminat sağlamayabilir.' },
  { risk: 'Miras Sorunu', aciklama: 'İskan belgesi olmayan yapı mirasçılara intikal ederken sorun çıkarabilir.' },
];

export default function InsaatRuhsatiRehberiPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-14">
          <p className="text-[#00C49F] text-xs font-bold mb-3 uppercase tracking-widest">İnşaat Rehberi 2025</p>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">İnşaat Ruhsatı Rehberi</h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed">
            Yapı ruhsatı nasıl alınır, hangi belgeler gerekir, iskan izni süreci ve kaçak yapı riskleri.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">

        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-base font-black text-gray-900 mb-4">Ruhsat Türleri</h2>
          <div className="space-y-3">
            {RUHSAT_TURLERI.map((r, i) => (
              <div key={i} className="border border-gray-100 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-black text-gray-900">{r.tur}</p>
                  <span className="text-[9px] font-black text-[#00C49F] shrink-0 ml-4">{r.sure}</span>
                </div>
                <p className="text-[11px] text-gray-600 mb-1">{r.tanim}</p>
                <p className="text-[10px] text-gray-400 font-bold">Belgeler: {r.gerekli}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-base font-black text-gray-900 mb-4">Başvuru Adımları</h2>
          <div className="space-y-3">
            {BASVURU_ADIMLARI.map((a, i) => (
              <div key={i} className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-[#00C49F] rounded-full flex items-center justify-center">
                  <span className="text-[10px] font-black text-white">{a.adim}</span>
                </div>
                <div>
                  <p className="text-xs font-black text-gray-900 mb-0.5">{a.baslik}</p>
                  <p className="text-[11px] text-gray-500 leading-relaxed">{a.aciklama}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-base font-black text-gray-900 mb-4">Kaçak Yapı Riskleri</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {KAÇAK_YAPI_RISKLERI.map((r, i) => (
              <div key={i} className="border border-rose-100 rounded-xl p-4 bg-rose-50/20">
                <p className="text-xs font-black text-rose-700 mb-1">{r.risk}</p>
                <p className="text-[11px] text-gray-600 leading-relaxed">{r.aciklama}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5">
          <p className="text-xs font-black text-amber-700 mb-2">Önemli Not</p>
          <p className="text-[11px] text-amber-600 leading-relaxed">
            Yapı ruhsatı olmaksızın inşaata başlamak ya da ruhsat kapsamı dışına çıkmak İmar Kanunu md. 32 ve 42 uyarınca ağır yaptırımlara yol açar. Projeni başlatmadan önce ilgili belediyenin imar müdürlüğüne danışın. Yasal dayanak: İmar Kanunu md. 21–42, Yapı Denetimi Hakkında Kanun.
          </p>
        </div>

      </div>
    </main>
  );
}
