import { Metadata } from 'next';
import Link from 'next/link';
import {
  Scale, CheckCircle, AlertTriangle, ArrowRight, FileText,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Gayrimenkul Sözleşmesi İptal ve Fesih Rehberi | Haklar, Tazminat | Söylemesi Bizden',
  description:
    'Satış vaadi ve kira sözleşmesi feshi, cayma hakkı, tazminat yükümlülükleri ve hukuki süreç rehberi.',
};

const FESIH_NEDENLERI = [
  { taraf: 'Alıcı Feshi', nedenler: ['Gizli ayıp (TBK md. 475)', 'Satıcının teslim borcunu ifa etmemesi', 'Tapu üzerindeki şerh/ipotek açıklanmamışsa', 'Cayma süresi içinde (varsa yazılı hak)', '3. kişi ayni hak iddiası doğmuşsa'] },
  { taraf: 'Satıcı Feshi', nedenler: ['Alıcının ödeme borcunu yerine getirmemesi', 'Ön sözleşme bedelinin ödenmemesi', 'Noterde imzalanmış fesih anlaşması', 'Kapora iade ile karşılıklı anlaşma'] },
  { taraf: 'Kiracı Feshi', nedenler: ['İlk 6 ay sonrası 15 gün önceden bildirim (kiraya veren rızasıyla)', 'Konutun kullanılamaz hale gelmesi (TBK md. 316)', 'Ev sahibinin taciz veya ihlali', 'İşten çıkma / şehir değişikliği (ticari kiralarda)'] },
  { taraf: 'Kiraya Veren Feshi', nedenler: ['Kira bedelinin 30 gün içinde ödenmemesi (2 kez ihtarname)', 'Konutun tahliyesi için hukuki yol (tahliye davası 10+ ay)', 'Yenileme döneminde bildirilen zorunlu ihtiyaç', 'Yıkım/esaslı tamir zorunluluğu'] },
];

const TAZMINAT_HESABI = [
  { durum: 'Satıcı Cayması (Kapora)', hesap: 'Kaporanın 2 katını alıcıya iade eder (TBK md. 177).' },
  { durum: 'Alıcı Cayması (Kapora)', hesap: 'Ödenen kapora satıcıda kalır; ek tazminat yoktur.' },
  { durum: 'Satıcı Temerrüdü (Tapu Vermeme)', hesap: 'Tapuya tescil davası veya sözleşmeden dönme + fiili zarar tazminatı.' },
  { durum: 'Alıcı Temerrüdü (Ödeme Yapmama)', hesap: 'Gecikme faizi (yasal faiz %9) + ek zarar ispatlanırsa fark tazminatı.' },
  { durum: 'Kira Sözleşmesi Erken Çıkış', hesap: 'Kiraya veren kiraya yeni kiracı bulana kadar, en fazla 1 yıl kira kadar tazminat.' },
  { durum: 'Ev Sahibi Haksız Tahliye', hesap: 'Kiracı son 3 yılın kira bedeli tutarında tazminat talep edebilir (TBK md. 355).' },
];

const IHTARNAME_SURECI = [
  { adim: 'Noterden İhtarname Gönder', sure: '1 gün', detail: 'Borca aykırılığı belgeleyerek noter kanalından yazılı uyarı; ispat değeri yüksektir.' },
  { adim: 'Yanıt/Cevap Süresi', sure: '10–30 gün', detail: 'Karşı tarafın borcunu yerine getirmesi veya itiraz bildirmesi beklenir.' },
  { adim: 'Uzlaşı/Arabuluculuk', sure: '1–4 hafta', detail: 'Taşınmaz uyuşmazlıklarında dava öncesi arabuluculuk zorunludur (01.09.2023 sonrası).' },
  { adim: 'Sulh Hukuk / Asliye Hukuk Davası', sure: '6–18 ay', detail: 'Kira uyuşmazlıkları Sulh Hukuk, satış uyuşmazlıkları Asliye Hukuk Mahkemesi\'nde.' },
  { adim: 'İcra Takibi (Alacak/Tahliye)', sure: '2–6 ay', detail: 'Kesinleşen mahkeme kararıyla icra dairesi aracılığıyla cebri tahsil veya tahliye.' },
];

const BELGELER = [
  'Noter onaylı sözleşme veya tapu satış vaadi senedi',
  'Ödeme belgesi: havale, EFT dekontu, banka ekstresi',
  'Noterden gönderilmiş ihtarname örnekleri',
  'Tapu kaydı (güncel tapu senedi / takyidat belgesi)',
  'Varsa kapora makbuzu veya senet',
  'Teslim tutanağı (kirada: anahtar teslim belgesi)',
];

const HATALAR = [
  'Sözlü fesih anlaşmasına güvenmek — yazılı belge olmadan ispat imkânsız.',
  'İhtarname atmadan doğrudan dava açmak — usul hatası redde neden olabilir.',
  'Kira ödemelerini nakit yapmak — banka havalesi yoksa ispat yapılamaz.',
  'Arabuluculuğu atlamak — dava şartı eksikliği davayı usulden reddettiribilir.',
  'Eski tarihli bir sözleşmeye güvenmek — tapu şerhsiz sözleşme 3. kişilere karşı geçersiz.',
];

export default function SozlesmeIptalPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-2 bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-bold px-4 py-1.5 rounded-full mb-5">
            <Scale size={13} /> Hukuki Rehber
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
            Gayrimenkul Sözleşmesi İptal ve Fesih
          </h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed mb-8">
            Satış vaadi veya kira sözleşmesini kim feshedebilir, tazminat ne kadar, hukuki süreç nasıl işler?
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-rose-400">TBK</p>
              <p className="text-xs text-gray-400">Türk Borçlar Kanunu</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-white">×2</p>
              <p className="text-xs text-gray-400">Satıcı caymasında kapora</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-amber-400">Zorunlu</p>
              <p className="text-xs text-gray-400">Dava öncesi arabuluculuk</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">

        {/* Fesih Nedenleri */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Fesih Nedenleri</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {FESIH_NEDENLERI.map((f, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                <p className="text-xs font-black text-gray-900 mb-3">{f.taraf}</p>
                <ul className="space-y-1.5">
                  {f.nedenler.map((n, j) => (
                    <li key={j} className="flex items-start gap-2">
                      <FileText size={11} className="text-gray-400 shrink-0 mt-0.5" />
                      <p className="text-[10px] text-gray-600 leading-relaxed">{n}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Tazminat Tablosu */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Tazminat Hesabı</h2>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="text-left px-4 py-3 font-black text-gray-700">Durum</th>
                    <th className="text-left px-4 py-3 font-black text-gray-700">Tazminat Esası</th>
                  </tr>
                </thead>
                <tbody>
                  {TAZMINAT_HESABI.map((r, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-3 font-bold text-gray-800">{r.durum}</td>
                      <td className="px-4 py-3 text-gray-600 leading-relaxed">{r.hesap}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* İhtarname Süreci */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Hukuki Süreç Adımları</h2>
          <div className="space-y-3">
            {IHTARNAME_SURECI.map((s, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm flex items-start gap-3">
                <div className="bg-[#F0FDF8] text-[#00C49F] text-[10px] font-black px-2 py-1 rounded-lg shrink-0">{i + 1}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="text-xs font-black text-gray-900">{s.adim}</p>
                    <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">{s.sure}</span>
                  </div>
                  <p className="text-[10px] text-gray-600 leading-relaxed">{s.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Belgeler + Hatalar */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <h2 className="text-sm font-black text-gray-900 mb-4 flex items-center gap-2">
              <CheckCircle size={14} className="text-[#00C49F]" /> Toplanması Gereken Belgeler
            </h2>
            <ul className="space-y-2.5">
              {BELGELER.map((b, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle size={11} className="text-[#00C49F] shrink-0 mt-0.5" />
                  <p className="text-[10px] text-gray-600 leading-relaxed">{b}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <h2 className="text-sm font-black text-gray-900 mb-4 flex items-center gap-2">
              <AlertTriangle size={14} className="text-rose-500" /> Kaçınılması Gereken Hatalar
            </h2>
            <ul className="space-y-2.5">
              {HATALAR.map((h, i) => (
                <li key={i} className="flex items-start gap-2">
                  <AlertTriangle size={11} className="text-rose-500 shrink-0 mt-0.5" />
                  <p className="text-[10px] text-gray-600 leading-relaxed">{h}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Warning */}
        <section className="flex items-start gap-3 bg-rose-50 border border-rose-200 rounded-xl p-4">
          <AlertTriangle size={14} className="text-rose-600 shrink-0 mt-0.5" />
          <p className="text-xs text-rose-700 leading-relaxed">
            <span className="font-black">Uyarı:</span> Bu rehber genel bilgi niteliğindedir. Hukuki süreçlerde mutlaka gayrimenkul hukuku alanında uzman bir avukattan destek alın. Arabuluculuk zorunluluğu 01.09.2023 tarihinden itibaren taşınmaz uyuşmazlıkları için geçerlidir.
          </p>
        </section>

        {/* Related */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-4">İlgili Rehberler</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { href: '/pismanlik-hakki', label: 'Pişmanlık Hakkı ve Cayma' },
              { href: '/kira-sozlesmesi', label: 'Kira Sözleşmesi Rehberi' },
              { href: '/tapu-devir-sureci', label: 'Tapu Devir Süreci' },
              { href: '/taksitli-satis', label: 'Taksitli Satış Rehberi' },
              { href: '/gayrimenkul-komisyoncusu', label: 'Emlakçı ve Komisyon' },
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
