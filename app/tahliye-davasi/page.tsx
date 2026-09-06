import { Metadata } from 'next';
import Link from 'next/link';
import {
  Scale, CheckCircle, AlertTriangle, ArrowRight, FileText,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Tahliye Davası Rehberi | Kiracı Tahliyesi, TBK 347-352, İcra | Söylemesi Bizden',
  description:
    'Kiracı tahliye davası türleri, TBK 347-352 şartları, ihtarname, icra yoluyla tahliye ve kiracı hakları.',
};

const TAHLIYE_NEDENLERI = [
  {
    neden: 'Kira Sözleşmesinin Sona Ermesi (Bildirimli)',
    tbk: 'TBK md. 347',
    aciklama: 'Belirsiz süreli kira sözleşmesinde ev sahibi, 6 ay önceden yazılı ihtar vererek 6 aylık dönem sonunda tahliye talep edebilir.',
    sure: '6 ay önceden ihtar',
    kiracı_hakki: 'İhtar süresine uyulmazsa tahliye istenemez.',
  },
  {
    neden: 'Kira Bedelinin Ödenmemesi',
    tbk: 'TBK md. 315',
    aciklama: 'Kiracı 30 günlük süre içinde kira borcunu ödemezse ev sahibi yazılı ihtar sonrası tahliye davası açabilir.',
    sure: '30 gün ihtarname',
    kiracı_hakki: 'Kiracı ihtar süresi içinde ödeme yaparsa tahliye istenemez.',
  },
  {
    neden: 'Ev Sahibinin Konut İhtiyacı',
    tbk: 'TBK md. 350/1',
    aciklama: 'Ev sahibi kendisi, eşi, altsoyu veya üstsoyu için konut ihtiyacı varsa kira sözleşmesi süresinin bitiminde tahliye talep edebilir.',
    sure: 'Dönem bitiminden 3 ay önce ihtar',
    kiracı_hakki: 'İhtiyaç gerçek ve samimi olmalı; 3 yıl içinde taşınmaz kiraya verilemez.',
  },
  {
    neden: 'Taşınmazı Satın Alanın İhtiyacı',
    tbk: 'TBK md. 351',
    aciklama: 'Taşınmazı satın alan yeni malik, kendi veya ailesi için konut/işyeri ihtiyacı varsa satın alış tarihinden itibaren 1 yıl sonra tahliye davası açabilir.',
    sure: '1 yıl bekleme + 1 ay ihtar',
    kiracı_hakki: 'Satın alma gerçek amaçla yapılmalı; spekülatif alım sayılabilir.',
  },
  {
    neden: 'Yeniden İnşaat / Esaslı Tamir',
    tbk: 'TBK md. 350/2',
    aciklama: 'Yapının yıkılıp yeniden yapılması veya esaslı onarım gerektiren durumda kiracı tahliye edilebilir.',
    sure: 'Dönem bitiminden 3 ay önce ihtar',
    kiracı_hakki: 'Onarım sonrası kiracı taşınmaza geri dönme talebinde bulunabilir.',
  },
  {
    neden: 'Kiracının Tahliye Taahhütnamesi',
    tbk: 'TBK md. 352/1',
    aciklama: 'Kiracı kira sözleşmesinden sonra noter onaylı taahhütname ile belirli bir tarihte tahliye sözü verdiyse o tarihten itibaren 1 ay içinde tahliye talep edilebilir.',
    sure: 'Taahhüt tarihi + 1 ay',
    kiracı_hakki: 'Taahhütname kira sözleşmesiyle aynı anda imzalanırsa geçersiz sayılabilir.',
  },
];

const SUREC = [
  { adim: 'İhtarname (Zorunlu)', detay: 'Tahliye öncesinde çoğunlukla noter ihtarnamesi veya iadeli taahhütlü posta zorunludur; ihtarname gönderilmeden dava açılması reddedilir.' },
  { adim: 'Arabuluculuk', detay: 'Konut kiralarında 2023 sonrası arabuluculuk zorunlu dava şartı haline gelmiştir; anlaşmazlık arabulucuda çözülmezse dava aşamasına geçilir.' },
  { adim: 'Dava Dilekçesi', detay: 'Taşınmazın bulunduğu yer Sulh Hukuk Mahkemesi\'ne dava dilekçesi verilir; kira sözleşmesi, ihtarname ve tapu eklenir.' },
  { adim: 'Yargılama', detay: 'Taraflar duruşmalara çağrılır; mahkeme delil toplar ve bilirkişi gerekirse atar.' },
  { adim: 'Tahliye Kararı', detay: 'Mahkeme tahliye kararı verirse kiracıya süre tanınır; süre içinde çıkmazsa icra yoluyla tahliye yapılır.' },
  { adim: 'İcra Yoluyla Tahliye', detay: 'Kiracı kararı uymazsa icra müdürlüğüne başvurulur; zorla tahliye icra marifetiyle gerçekleştirilir.' },
];

const KIRACI_HAKLARI = [
  { hak: 'Savunma Hakkı', detay: 'Kiracı davada tahliye nedenine itiraz edebilir; delil sunma hakkı bulunur.' },
  { hak: 'Ödeme Hakkı', detay: 'Kira borcu nedenli davalarda ihtar süresi içinde ödeme yapılırsa dava düşer.' },
  { hak: 'Geri Dönme Hakkı', detay: 'Yeniden inşaat nedeniyle tahliyede kiracı, onarım sonrası aynı koşullarda geri dönme hakkına sahiptir.' },
  { hak: 'Tazminat Hakkı', detay: 'İhtiyaç nedeniyle tahliyede ev sahibi taşınmazı 3 yıl içinde başkasına kiraya verirse kiracı tazminat talep edebilir.' },
  { hak: 'İtiraz Hakkı', detay: 'İcra takibine itiraz edilebilir; 7 gün içinde icra mahkemesine itiraz dilekçesi sunulmalıdır.' },
];

const PRATIK = [
  'İhtarname tarih ve tebliğ belgesi tahliye davasının can damarıdır; ihtarname olmadan dava açmayın.',
  'Konut ihtiyacı nedeniyle tahliye davalarında ihtiyacın gerçekliği mahkemece incelenir; sahte ihtiyaç iddiası reddedilir.',
  'Kiracıyla anlaşmalı tahliye (tahliye protokolü) dava sürecini önler; noter tasdiki ile yapılması önerilir.',
  'Aylık kira ödemelerini banka havalesiyle yapın; ödeme ispat sorunu yaşamamak için önemlidir.',
  'Tahliye davası ortalama 1–2 yıl sürebilir; alternatif çözüm yollarını önce değerlendirin.',
];

export default function TahliyeDavasiPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-2 bg-[#00C49F]/20 border border-[#00C49F]/30 text-[#00C49F] text-xs font-bold px-4 py-1.5 rounded-full mb-5">
            <Scale size={13} /> Tahliye Davası Rehberi
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
            Tahliye Davası Rehberi
          </h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed mb-8">
            Kiracı tahliye türleri, TBK şartları, ihtarname zorunluluğu ve kiracı hakları.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-[#00C49F]">30 Gün</p>
              <p className="text-xs text-gray-400">Kira borcu ihtarı</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-white">TBK 347</p>
              <p className="text-xs text-gray-400">Bildirimli tahliye</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-amber-400">Sulh HM</p>
              <p className="text-xs text-gray-400">Yetkili mahkeme</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">

        {/* Tahliye Nedenleri */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Tahliye Nedenleri</h2>
          <div className="space-y-4">
            {TAHLIYE_NEDENLERI.map((t, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                <div className="flex items-start justify-between mb-2">
                  <p className="text-xs font-black text-gray-900">{t.neden}</p>
                  <span className="text-[10px] bg-blue-50 text-blue-600 font-bold px-2 py-0.5 rounded ml-2 shrink-0">{t.tbk}</span>
                </div>
                <p className="text-[10px] text-gray-600 mb-3 leading-relaxed">{t.aciklama}</p>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-amber-50 rounded-lg p-2">
                    <p className="text-[10px] text-amber-600 font-bold mb-0.5">Süre</p>
                    <p className="text-[10px] text-gray-600">{t.sure}</p>
                  </div>
                  <div className="bg-[#F0FDF8] rounded-lg p-2">
                    <p className="text-[10px] text-[#00C49F] font-bold mb-0.5">Kiracı Hakkı</p>
                    <p className="text-[10px] text-gray-600">{t.kiracı_hakki}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Dava Süreci */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Tahliye Süreci</h2>
          <div className="space-y-3">
            {SUREC.map((s, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm flex items-start gap-3">
                <div className="bg-[#F0FDF8] text-[#00C49F] text-[10px] font-black px-2 py-1 rounded-lg shrink-0">{i + 1}</div>
                <div>
                  <p className="text-xs font-black text-gray-900 mb-0.5">{s.adim}</p>
                  <p className="text-[10px] text-gray-600 leading-relaxed">{s.detay}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Kiracı Hakları */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4 flex items-center gap-2">
            <CheckCircle size={14} className="text-[#00C49F]" /> Kiracının Hakları
          </h2>
          <div className="space-y-3">
            {KIRACI_HAKLARI.map((h, i) => (
              <div key={i} className="bg-[#F0FDF8] rounded-xl p-3">
                <p className="text-xs font-black text-gray-900 mb-0.5">{h.hak}</p>
                <p className="text-[10px] text-gray-600 leading-relaxed">{h.detay}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Pratik */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4 flex items-center gap-2">
            <FileText size={14} className="text-amber-500" /> Pratik Öneriler
          </h2>
          <div className="space-y-2">
            {PRATIK.map((item, i) => (
              <div key={i} className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 mt-1.5" />
                <p className="text-xs text-gray-700 leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Warning */}
        <section className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
          <AlertTriangle size={14} className="text-amber-600 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-800 leading-relaxed">
            <span className="font-black">Önemli:</span> Kiracıyı zorla çıkarmak veya kilit değiştirmek hukuka aykırıdır; cezai yaptırımla karşılaşabilirsiniz. Tahliye ancak mahkeme kararı ve icra marifetiyle gerçekleştirilmelidir.
          </p>
        </section>

        {/* Related */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-4">İlgili Rehberler</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { href: '/kira-tespit-davasi', label: 'Kira Tespit Davası' },
              { href: '/kira-sozlesmesi', label: 'Kira Sözleşmesi Rehberi' },
              { href: '/kira-artis-hesaplama', label: 'Kira Artış Hesaplayıcı' },
              { href: '/depozito', label: 'Depozito Rehberi' },
              { href: '/sozlesme-iptal', label: 'Sözleşme İptal ve Fesih' },
              { href: '/rehber/kiralama-rehberi', label: 'Kiralama Rehberi' },
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
