import { Metadata } from 'next';
import Link from 'next/link';
import {
  Scale, CheckCircle, AlertTriangle, ArrowRight, FileText, Users,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Miras ve Gayrimenkul | Veraset, İntikal, Vergi | Söylemesi Bizden',
  description:
    'Gayrimenkul mirası: yasal mirasçı sıralaması, veraset ilamı, tapu intikali, miras vergisi ve mirasçı hakları.',
};

const MIRASCI_SIRASI = [
  { sira: 1, grup: 'Altsoy', aciklama: 'Çocuklar eşit payda miras alır. Vefat etmiş çocuğun payı onun çocuklarına geçer (halefiyet).' },
  { sira: 2, grup: 'Anne-Baba', aciklama: '1. zümre yoksa; hayatta olan ebeveyn tüm mirası alır. Her ikisi de hayattaysa yarı yarıya.' },
  { sira: 3, grup: 'Büyükanne/Büyükbaba', aciklama: '1. ve 2. zümre yoksa; büyükbaba ve büyükannenin payları.' },
  { sira: 4, grup: 'Devlet', aciklama: 'Hiç mirasçı yoksa miras devlete kalır.' },
  { sira: null, grup: 'Eş', aciklama: 'Eş her zümreden önce pay alır: 1. zümreden 1/4, 2. zümreden 1/2, 3. zümreden 3/4.' },
];

const INTIKAL_SURECI = [
  { adim: 'Ölüm Belgesi', detay: 'Nüfus müdürlüğünden veya hastaneden ölüm belgesi alınır.' },
  { adim: 'Veraset İlamı', detay: 'Sulh Hukuk Mahkemesi veya noter aracılığıyla mirasçılık belgesi düzenlenir. 1–4 hafta.' },
  { adim: 'Veraset Vergisi Beyannamesi', detay: 'Ölüm tarihinden itibaren 4 ay (yurt dışı 8 ay) içinde vergi dairesine beyan.' },
  { adim: 'Vergi Ödeme veya Taksit', detay: 'Hesaplanan vergi 3 yılda, yılda 2 taksit olmak üzere 6 taksitte ödenebilir.' },
  { adim: 'Tapu İntikali Başvurusu', detay: 'Veraset ilamı, ödeme belgesi ve tüm mirasçıların imzası ile tapu müdürlüğüne başvuru.' },
  { adim: 'İntikalin Tescili', detay: 'Tapu sicilinde hisselere göre tüm mirasçılar adına tescil yapılır.' },
];

const VERASET_VERGISI_2024 = [
  { matrah: '1.000.000 ₺\'ya kadar', oran: '%1', ornekMatrah: '500.000 ₺', ornekVergi: '5.000 ₺' },
  { matrah: '1.000.000 – 3.000.000 ₺', oran: '%3', ornekMatrah: '2.000.000 ₺', ornekVergi: '30.000 + 10.000 = 40.000 ₺' },
  { matrah: '3.000.000 – 7.000.000 ₺', oran: '%5', ornekMatrah: '5.000.000 ₺', ornekVergi: '100.000 + 60.000 = 160.000 ₺' },
  { matrah: '7.000.000 – 30.000.000 ₺', oran: '%7', ornekMatrah: '15.000.000 ₺', ornekVergi: '560.000 + 280.000 = 840.000 ₺' },
  { matrah: '30.000.000 ₺\'yı aşan', oran: '%10', ornekMatrah: '50.000.000 ₺', ornekVergi: 'Kademeli hesap' },
];

const VASIYETNAME_TURLERI = [
  {
    tur: 'Resmi Vasiyetname',
    aciklama: 'Noterden veya iki tanık huzurunda düzenlenir. En güvenli yöntem.',
    gecerlilik: 'İmzalı, imzasız, son hali geçerli.',
  },
  {
    tur: 'El Yazılı Vasiyetname',
    aciklama: 'Baştan sona el yazısı ile yazılı ve imzalı. Tarih belirtilmeli.',
    gecerlilik: 'Mahkeme veya noter onayı ile geçerli hale gelir.',
  },
  {
    tur: 'Sözlü Vasiyetname',
    aciklama: 'Yakın ölüm tehlikesinde, iki tanık önünde yapılır. Tehlike geçince geçersiz.',
    gecerlilik: '1 ay içinde mahkemeye bildirilmezse geçersiz.',
  },
];

const SAKLANAN_PAY = [
  { mirasci: 'Çocuk (her biri)', sakliPay: 'Yasal payının 1/2\'si' },
  { mirasci: 'Anne veya Baba', sakliPay: 'Yasal payının 1/4\'ü' },
  { mirasci: 'Eş', sakliPay: 'Yasal payının tamamı (eş aleyhine kısıtlama yapılamaz)' },
];

const HATALI_UYGULAMALAR = [
  'Mirasçıların tamamının muvafakati olmadan gayrimenkul satışı yapılamaz.',
  'Bir mirasçının noterde vekâlet vermeden tapu intikalini "kolaylaştırması" hukuki sorumluluk doğurur.',
  'Miras ortaklığından çıkış için payın diğer mirasçılara veya üçüncü kişilere devri şarttır.',
  'Veraset vergisi beyan süresine uyulmazsa ceza ve gecikme faizi işler.',
  'Gayrımenkul değerinin düşük gösterilmesi vergi kaçakçılığı kapsamında değerlendirilebilir.',
];

export default function MirasveGayrimenkulPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-2 bg-[#00C49F]/20 border border-[#00C49F]/30 text-[#00C49F] text-xs font-bold px-4 py-1.5 rounded-full mb-5">
            <Scale size={13} /> Miras ve Gayrimenkul
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
            Miras ve Gayrimenkul
          </h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed mb-8">
            Yasal mirasçı sıralaması, veraset vergisi, tapu intikali adımları, vasiyetname türleri ve saklı pay hakları.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-[#00C49F]">4 Ay</p>
              <p className="text-xs text-gray-400">Vergi beyan süresi</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-white">%1–10</p>
              <p className="text-xs text-gray-400">Veraset vergisi</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-amber-400">6 Taksit</p>
              <p className="text-xs text-gray-400">Vergi ödeme seçeneği</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">

        {/* Mirasçı Sıralaması */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Yasal Mirasçı Sıralaması</h2>
          <div className="space-y-3">
            {MIRASCI_SIRASI.map((m, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm flex items-start gap-3">
                <div className={`text-[10px] font-black px-2 py-1 rounded-lg shrink-0 ${m.sira ? 'bg-[#F0FDF8] text-[#00C49F]' : 'bg-blue-50 text-blue-600'}`}>
                  {m.sira ? `${m.sira}. Zümre` : 'Eş'}
                </div>
                <div>
                  <p className="text-xs font-black text-gray-900 mb-0.5">{m.grup}</p>
                  <p className="text-[10px] text-gray-600 leading-relaxed">{m.aciklama}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* İntikal Süreci */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Tapu İntikal Süreci</h2>
          <div className="space-y-3">
            {INTIKAL_SURECI.map((s, i) => (
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

        {/* Veraset Vergisi */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Veraset ve İntikal Vergisi 2024</h2>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <table className="w-full text-xs">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left px-4 py-3 font-black text-gray-700">Matrah Dilimi</th>
                  <th className="text-left px-4 py-3 font-black text-gray-700">Oran</th>
                  <th className="text-left px-4 py-3 font-black text-gray-400">Örnek</th>
                </tr>
              </thead>
              <tbody>
                {VERASET_VERGISI_2024.map((v, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-4 py-3 text-gray-700">{v.matrah}</td>
                    <td className="px-4 py-3 font-black text-[#00C49F]">{v.oran}</td>
                    <td className="px-4 py-3 text-gray-400">{v.ornekMatrah}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[10px] text-gray-400 mt-2">* İvazsız (karşılıksız) intikallerde oran 2 katı uygulanabilir. Eşten kalan miras farklı tarifeye tabidir.</p>
        </section>

        {/* Vasiyetname */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Vasiyetname Türleri</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {VASIYETNAME_TURLERI.map((v, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
                <p className="text-xs font-black text-gray-900 mb-1">{v.tur}</p>
                <p className="text-[10px] text-gray-600 mb-2 leading-relaxed">{v.aciklama}</p>
                <div className="bg-[#F0FDF8] rounded-lg p-2">
                  <p className="text-[10px] text-[#00C49F] font-bold mb-0.5">Geçerlilik</p>
                  <p className="text-[10px] text-gray-600">{v.gecerlilik}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Saklı Pay */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4 flex items-center gap-2">
            <Users size={14} className="text-[#00C49F]" /> Saklı Pay Hakları
          </h2>
          <div className="space-y-3">
            {SAKLANAN_PAY.map((s, i) => (
              <div key={i} className="flex items-center justify-between bg-[#F0FDF8] rounded-xl p-3">
                <p className="text-xs font-black text-gray-900">{s.mirasci}</p>
                <p className="text-xs text-[#00C49F] font-bold">{s.sakliPay}</p>
              </div>
            ))}
          </div>
          <p className="text-[10px] text-gray-400 mt-3">Saklı pay oranının altında bırakılan mirasçı, tenkis davası açabilir.</p>
        </section>

        {/* Hatalar */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4 flex items-center gap-2">
            <AlertTriangle size={14} className="text-amber-500" /> Sık Yapılan Hatalar
          </h2>
          <div className="space-y-2">
            {HATALI_UYGULAMALAR.map((h, i) => (
              <div key={i} className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 mt-1.5" />
                <p className="text-xs text-gray-700 leading-relaxed">{h}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Warning */}
        <section className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
          <AlertTriangle size={14} className="text-amber-600 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-800 leading-relaxed">
            <span className="font-black">Önemli:</span> Miras hukuku karmaşık ve bireysel durumlara özeldir. Özellikle yabancı uyruklu mirasçı, yurt dışı mal varlığı veya birden fazla evlilik gibi özel durumlarda mutlaka gayrimenkul avukatı ile çalışın.
          </p>
        </section>

        {/* Related */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-4">İlgili Rehberler</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { href: '/hisseli-tapu', label: 'Hisseli Tapu Rehberi' },
              { href: '/ortak-mulkiyet', label: 'Ortak Mülkiyet Rehberi' },
              { href: '/tapu-devir-sureci', label: 'Tapu Devir Süreci' },
              { href: '/deger-artis-vergisi', label: 'Değer Artış Vergisi' },
              { href: '/yabanci-gayrimenkul', label: 'Yabancı Gayrimenkul' },
              { href: '/sozlesme-iptal', label: 'Sözleşme İptal ve Fesih' },
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
