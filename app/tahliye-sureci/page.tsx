import { Metadata } from 'next';
import Link from 'next/link';
import { Scale, CheckCircle, AlertTriangle, ArrowRight, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Tahliye Süreci Rehberi 2024 | Kiracı Tahliyesi, İhtar, Dava | Söylemesi Bizden',
  description:
    'Kiracı tahliye süreci nasıl işler? İhtar, sulh hukuk mahkemesi, icra yoluyla tahliye ve yasal süreler hakkında kapsamlı rehber.',
};

const TAHLIYE_NEDENLERI = [
  {
    neden: 'Kira Bedelini Ödememek',
    aciklama: 'Kiracının kira borcunu ödememesi durumunda kiraya veren, yazılı ihtar ile 30 gün süre verir. Ödeme yapılmazsa tahliye davası açılabilir.',
    sure: '30 gün ihtar',
  },
  {
    neden: 'Kiralananı Amacı Dışında Kullanmak',
    aciklama: 'Kira sözleşmesinde belirtilen kullanım amacı dışındaki kullanım (konutu işyerine dönüştürme vb.) tahliye sebebidir.',
    sure: 'Dava yolu',
  },
  {
    neden: 'Kiraya Verenin Konut İhtiyacı',
    aciklama: 'Mal sahibi, eşi, altsoyu veya üstsoyu için konut ihtiyacı doğduğunda, sözleşme süresinin bitiminde tahliye isteyebilir.',
    sure: '3 ay önceden ihtar',
  },
  {
    neden: 'Yeniden İnşa veya Tadilat',
    aciklama: 'Taşınmazın esaslı tadilat gerektirmesi durumunda, mülk sahibi tahliye talep edebilir; tamirat bitince kiracıya öncelik hakkı tanınır.',
    sure: '3 ay önceden ihtar',
  },
  {
    neden: 'Yazılı Tahliye Taahhüdü',
    aciklama: 'Kiracının belirli bir tarihte tahliye edeceğini yazılı olarak taahhüt etmesi; bu tarihte çıkmaması halinde dava açılabilir.',
    sure: 'Taahhüt tarihi',
  },
  {
    neden: 'Kiralananı Üçüncü Kişiye Devir/Alt Kira',
    aciklama: 'Kiraya verenin izni olmaksızın kiralananı başkasına devretmek veya alt kiraya vermek tahliye sebebidir.',
    sure: 'Dava yolu',
  },
];

const TAHLIYE_SURECI = [
  {
    adim: 'İhtar Göndermek',
    sure: '1 hafta',
    aciklama: 'Noterden yazılı ihtarname gönderilir. Kira bedeli ödenmemişse 30 günlük süre verilir. İhtar içeriği ve tebliğ tarihi ispat için kritiktir.',
  },
  {
    adim: 'Arabuluculuk Başvurusu',
    sure: '2–3 hafta',
    aciklama: 'Kira uyuşmazlıklarında dava açmadan önce zorunlu arabuluculuk şartı vardır (2023 itibarıyla). Anlaşma sağlanamazsa tutanak alınır.',
  },
  {
    adim: 'Sulh Hukuk Mahkemesi\'ne Dava',
    sure: '2–6 ay',
    aciklama: 'Yetkili mahkeme: kiralananın bulunduğu yer. Dava dilekçesi, sözleşme, ihtarname ve arabuluculuk tutanağı eklenir.',
  },
  {
    adim: 'Mahkeme Kararı',
    sure: '3–6 ay',
    aciklama: 'Mahkeme tahliye kararı verir. Karar kesinleştikten sonra icra dairesi aracılığıyla zorla tahliye yapılabilir.',
  },
  {
    adim: 'İcra Yoluyla Tahliye',
    sure: '1–2 ay',
    aciklama: 'Mahkeme kararı icra dairesine verilir. İcra müdürlüğü kiracıya süre tanır; çıkmaması halinde zorla tahliye uygulanır.',
  },
];

const KRITIK_SURELER = [
  { sure: '30 gün', aciklama: 'Kira bedelini ödememe ihtarında kiracıya tanınan asgari süre' },
  { sure: '3 ay', aciklama: 'Mülk sahibinin konut ihtiyacı veya tadilat için önceden ihtar süresi' },
  { sure: '1 ay', aciklama: 'Yazılı tahliye taahhüdünde belirlenen tarihten sonra dava açma süresi' },
  { sure: '15 gün', aciklama: 'Yenilenen kira döneminde sözleşmeyi feshetme için kiracının bildirim süresi' },
  { sure: '10 yıl', aciklama: 'Uzun dönem kira sözleşmelerinde kiraya verenin fesih hakkı için gereken asgari süre' },
];

const BELGE_LISTESI = [
  'Kira sözleşmesi (noter onaylı veya imzalı orijinal)',
  'Noterden gönderilen ihtarname ve tebliğ belgesi',
  'Kira ödemesine ilişkin banka dekontları / ekstre',
  'Arabuluculuk tutanağı (son tutanak — anlaşmazlık)',
  'Tapu senedi fotokopisi (sahiplik belgesi)',
  'Kiralananın durumuna ilişkin fotoğraf/video (varsa)',
  'Konut ihtiyacı davasında sağlık/ikametgah belgesi',
];

const PRATIK_BILGI = [
  { bilgi: 'Avukat zorunluluğu', detay: 'Zorunlu değildir; ancak süreç teknik olduğundan uzman desteği önerilir.' },
  { bilgi: 'Yargılama harcı', detay: 'Tahliye davası harçları düşüktür; ancak kaybeden taraf vekalet ücreti ve yargılama gideri öder.' },
  { bilgi: 'Kiracıyı koruma', detay: 'Kiracı kararı temyize götürebilir; Yargıtay süreci 6–18 ay ekleyebilir.' },
  { bilgi: 'Depozito', detay: 'Tahliye sonrası hasar tespiti yapılır; kiracı sebep olmadığı hasarlar için sorumlu tutulmaz.' },
];

export default function TahliyeSureciPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-2 bg-[#00C49F]/20 border border-[#00C49F]/30 text-[#00C49F] text-xs font-bold px-4 py-1.5 rounded-full mb-5">
            <Scale size={13} /> Tahliye Rehberi
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
            Kiracı Tahliye Süreci Rehberi 2024
          </h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed mb-8">
            Kiracıyı tahliye etme süreci: ihtar, arabuluculuk, mahkeme ve icra aşamalarını adım adım öğrenin.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-[#00C49F]">6 Neden</p>
              <p className="text-xs text-gray-400">Tahliye sebebi</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-white">5 Adım</p>
              <p className="text-xs text-gray-400">Yasal süreç</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-amber-400">30 Gün</p>
              <p className="text-xs text-gray-400">İhtar süresi</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">

        {/* Tahliye Nedenleri */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Tahliye Nedenleri</h2>
          <div className="space-y-3">
            {TAHLIYE_NEDENLERI.map((d, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
                <div className="flex items-start justify-between gap-3 mb-1">
                  <p className="text-xs font-black text-[#00C49F]">{d.neden}</p>
                  <span className="text-[10px] bg-amber-50 text-amber-600 font-black px-2 py-0.5 rounded shrink-0">{d.sure}</span>
                </div>
                <p className="text-[10px] text-gray-600 leading-relaxed">{d.aciklama}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Süreç */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Tahliye Süreci</h2>
          <div className="space-y-3">
            {TAHLIYE_SURECI.map((a, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-[#00C49F] text-white text-[10px] font-black flex items-center justify-center shrink-0">{i + 1}</div>
                    <p className="text-xs font-black text-gray-900">{a.adim}</p>
                  </div>
                  <span className="text-[10px] bg-amber-50 text-amber-600 font-black px-2 py-0.5 rounded">{a.sure}</span>
                </div>
                <p className="text-[10px] text-gray-600 leading-relaxed ml-8">{a.aciklama}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Kritik Süreler */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4 flex items-center gap-2">
            <Clock size={14} className="text-amber-500" /> Kritik Yasal Süreler
          </h2>
          <div className="space-y-2">
            {KRITIK_SURELER.map((s, i) => (
              <div key={i} className="flex items-start gap-3 py-2 border-b border-gray-50 last:border-0">
                <span className="text-xs font-black text-[#00C49F] shrink-0 w-14">{s.sure}</span>
                <p className="text-xs text-gray-600 leading-relaxed">{s.aciklama}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Belgeler */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4 flex items-center gap-2">
            <CheckCircle size={14} className="text-[#00C49F]" /> Gerekli Belgeler
          </h2>
          <div className="space-y-2">
            {BELGE_LISTESI.map((b, i) => (
              <div key={i} className="flex items-start gap-2 py-2 border-b border-gray-50 last:border-0">
                <CheckCircle size={12} className="text-[#00C49F] shrink-0 mt-0.5" />
                <p className="text-xs text-gray-700 leading-relaxed">{b}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Pratik Bilgi */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4">Pratik Bilgiler</h2>
          <div className="space-y-3">
            {PRATIK_BILGI.map((p, i) => (
              <div key={i} className="grid grid-cols-3 gap-2 py-2 border-b border-gray-50 last:border-0">
                <p className="text-xs font-black text-gray-900">{p.bilgi}</p>
                <p className="text-[10px] text-gray-600 leading-relaxed col-span-2">{p.detay}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Uyarı */}
        <section className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
          <AlertTriangle size={14} className="text-amber-600 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-800 leading-relaxed">
            <span className="font-black">Önemli:</span> Bu rehber genel bilgi amaçlıdır; hukuki danışmanlık yerine geçmez. Tahliye davası açmadan önce bir gayrimenkul avukatından destek alın.
          </p>
        </section>

        {/* Related */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-4">İlgili Araçlar</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { href: '/kira-tespit-davasi-rehberi', label: 'Kira Tespit Davası Rehberi' },
              { href: '/kiraci-haklari', label: 'Kiracı Hakları' },
              { href: '/mal-sahibi-haklari', label: 'Mal Sahibi Hakları' },
              { href: '/kira-sozlesmesi-hazirlama', label: 'Kira Sözleşmesi Hazırlama' },
              { href: '/depozito', label: 'Depozito Rehberi' },
              { href: '/kira-artis-hesaplama', label: 'Kira Artış Hesaplayıcı' },
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
