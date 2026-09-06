import { Metadata } from 'next';
import Link from 'next/link';
import {
  Shield, CheckCircle, AlertTriangle, ArrowRight, Scale,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Depozito Rehberi | Güvence Bedeli, İade Süresi, Kesinti Hakları | Söylemesi Bizden',
  description:
    'Kirada depozito (güvence bedeli) nedir? Yasal limit, iade süresi, ev sahibinin kesinti hakları ve kiracı hakları.',
};

const DEPOZITO_TANIM = {
  tanim: 'Kira sözleşmesinde kiracının güvencesi olarak ev sahibine bıraktığı para veya kıymetli evrak.',
  yasal: '6098 sayılı Türk Borçlar Kanunu md. 342',
  limit: '3 aylık kira bedelini aşamaz.',
  sekil: 'Para olarak veriliyorsa vadeli mevduat hesabına kiracı adına yatırılmalıdır.',
};

const IAD_KOSULLARI = [
  { konu: 'İade Süresi', detay: 'Kira ilişkisi sona erdiğinde ev sahibi, kiracının haklarına zarar verdiğine dair üç ay içinde icra takibine başlamaz veya dava açmazsa depozitoyu iade etmek zorundadır.' },
  { konu: 'Üç Aylık Bekleme', detay: 'Ev sahibi depozitoyu 3 ay elinde tutabilir; bu sürede alacağını ispat etmeli veya dava açmalıdır.' },
  { konu: 'Hasar Tespiti', detay: 'Çıkışta ev sahibi ile kiracı birlikte hasar tespit tutanağı düzenlerse iade miktarı kolayca belirlenir.' },
  { konu: 'Faiz Getirisi', detay: 'Vadeli hesaptaki depozito faiz getirisi kiracıya aittir; ev sahibi faize el koyamaz.' },
  { konu: 'Eksik İade', detay: 'Haksız kesinti yapılırsa kiracı sulh hukuk mahkemesine başvurabilir veya tüketici hakem heyetine şikayet edebilir.' },
];

const KESINTI_HAKLARI = [
  { durum: 'Olağan Yıpranma', karar: 'Kesinti YAPILAMAZ', aciklama: 'Boyalar solar, zeminler yıpranır — bunlar olağan kullanımdan kaynaklanır, kiracı sorumlu değildir.' },
  { durum: 'Kiracı Kusuru Hasarı', karar: 'Kesinti YAPILABİLİR', aciklama: 'Kırılan cam, delinmiş duvar, yakılan tezgah gibi kusurlu hasarlar kiracı sorumluluğundadır.' },
  { durum: 'Kira Borcu', karar: 'Kesinti YAPILABİLİR', aciklama: 'Ödenmemiş kira veya ortak gider borcu depozitodan mahsup edilebilir.' },
  { durum: 'Fatura Borçları', karar: 'Kesinti YAPILABİLİR', aciklama: 'Kiracı adındaki elektrik, su, doğalgaz borçları varsa kesilebilir; ev sahibi adında olanlar kesilemez.' },
  { durum: 'Temizlik / Boya', karar: 'Sınırlı Kesinti', aciklama: 'Sözleşmede şart konulmuşsa veya kiraya verildiği halden çok daha kötü durumdaysa kesilebilir.' },
];

const KIRACININ_HAKLARI = [
  'Depozito 3 ayı aşan tutarda talep edilemez — aşan kısım geçersizdir.',
  'Para olarak verilen depozito kiracı adına vadeli hesaba yatırılmalı; ev sahibi kullanamaz.',
  'Çıkışta ev sahibi sizi "teslim tutanağı imzalatmadan" depozitoyu keserek iade etmekten kaçınıyorsa yazılı talep edin.',
  'Üç ay dolduğu halde iade edilmezse sulh hukuk mahkemesinde dava açabilirsiniz.',
  'Fatura borçlarının kiracı adına olup olmadığını çıkış öncesinde teyit edin.',
  'Ev hasarı fotoğrafları, giriş ve çıkış tutanakları mahkemede güçlü delil oluşturur.',
];

const SOZLESME_MADDELERI = [
  'Depozito tutarı ve para birimi açıkça yazılmalı.',
  'Banka hesap bilgisi sözleşmeye eklenebilir (kiracı adına vadeli hesap).',
  'Çıkışta hasar tespiti usulü (birlikte tutanak) kararlaştırılabilir.',
  'Depozitonun hangi durumlarda kesileceği önceden belirtilmeli.',
  'Olağan yıpranmadan ev sahibinin depozito kesemeyeceği net yazılmalı.',
];

const SUREC = [
  { adim: 'Giriş Tutanağı', detay: 'Taşınmaza girerken mevcut hasarları fotoğraflayın ve her iki tarafın imzaladığı tutanak düzenleyin.' },
  { adim: 'Sözleşmede Depozito Maddesi', detay: 'Depozito tutarını, vadeli hesap bilgilerini ve iade koşullarını yazılı olarak belirleyin.' },
  { adim: 'Çıkış Bildirimi', detay: 'Taşınmazı boşaltmadan önce yazılı bildirim yapın; yasal bildirim sürelerine uyun.' },
  { adim: 'Çıkış Tutanağı', detay: 'Ev sahibiyle birlikte hasarları belirleyin, tutanağı imzalatın, fotoğraf ekleyin.' },
  { adim: 'Depozitoyu Takip Et', detay: 'Üç aylık bekleme süresinde iade gerçekleşmezse yazılı ihtar gönderin.' },
  { adim: 'Hukuki Yol', detay: 'İhtara rağmen iade yoksa sulh hukuk mahkemesi veya tüketici hakem heyetine başvurun.' },
];

export default function DepozitoPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-2 bg-[#00C49F]/20 border border-[#00C49F]/30 text-[#00C49F] text-xs font-bold px-4 py-1.5 rounded-full mb-5">
            <Shield size={13} /> Depozito Rehberi
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
            Depozito (Güvence Bedeli) Rehberi
          </h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed mb-8">
            Yasal limit, iade süresi, kesinti hakları ve kiracının korunma yolları.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-[#00C49F]">3 Ay</p>
              <p className="text-xs text-gray-400">Yasal maksimum</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-white">TBK 342</p>
              <p className="text-xs text-gray-400">Yasal dayanak</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-amber-400">3 Ay</p>
              <p className="text-xs text-gray-400">İade bekleme süresi</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">

        {/* Tanım */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-3">Depozito Nedir?</h2>
          <p className="text-xs text-gray-700 leading-relaxed mb-3">{DEPOZITO_TANIM.tanim}</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-[#F0FDF8] rounded-xl p-3">
              <p className="text-[10px] text-[#00C49F] font-bold mb-0.5">Dayanak</p>
              <p className="text-[10px] text-gray-600">{DEPOZITO_TANIM.yasal}</p>
            </div>
            <div className="bg-amber-50 rounded-xl p-3">
              <p className="text-[10px] text-amber-600 font-bold mb-0.5">Yasal Limit</p>
              <p className="text-[10px] text-gray-600">{DEPOZITO_TANIM.limit}</p>
            </div>
            <div className="bg-blue-50 rounded-xl p-3">
              <p className="text-[10px] text-blue-600 font-bold mb-0.5">Şekil</p>
              <p className="text-[10px] text-gray-600">{DEPOZITO_TANIM.sekil}</p>
            </div>
          </div>
        </section>

        {/* İade Koşulları */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">İade Koşulları</h2>
          <div className="space-y-3">
            {IAD_KOSULLARI.map((k, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                <p className="text-xs font-black text-gray-900 mb-1">{k.konu}</p>
                <p className="text-[10px] text-gray-600 leading-relaxed">{k.detay}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Kesinti Hakları */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Ev Sahibinin Kesinti Hakları</h2>
          <div className="space-y-3">
            {KESINTI_HAKLARI.map((k, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm flex items-start gap-3">
                <div className={`text-[10px] font-black px-2 py-1 rounded-lg shrink-0 ${
                  k.karar.includes('YAPILAMAZ') ? 'bg-rose-50 text-rose-600' :
                  k.karar.includes('YAPILABİLİR') ? 'bg-[#F0FDF8] text-[#00C49F]' : 'bg-amber-50 text-amber-600'
                }`}>{k.karar}</div>
                <div>
                  <p className="text-xs font-black text-gray-900 mb-0.5">{k.durum}</p>
                  <p className="text-[10px] text-gray-600 leading-relaxed">{k.aciklama}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Süreç */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Depozito Yönetim Süreci</h2>
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

        {/* Kiracının Hakları */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4 flex items-center gap-2">
            <CheckCircle size={14} className="text-[#00C49F]" /> Kiracının Hakları
          </h2>
          <div className="space-y-2">
            {KIRACININ_HAKLARI.map((item, i) => (
              <div key={i} className="flex items-start gap-2">
                <Scale size={12} className="text-[#00C49F] shrink-0 mt-0.5" />
                <p className="text-xs text-gray-700 leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Sözleşme Maddeleri */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4">Sözleşmede Olması Gerekenler</h2>
          <div className="space-y-2">
            {SOZLESME_MADDELERI.map((item, i) => (
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
            <span className="font-black">Önemli:</span> 3 aylık kira bedelini aşan depozito talebi yasal olarak geçersizdir. Fazlasını ödemeyin; sözleşmeye aşan miktarı yazdırmayın. Sözlü anlaşmalar yerine her şeyi yazılı sözleşmeyle belgeleyin.
          </p>
        </section>

        {/* Related */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-4">İlgili Rehberler</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { href: '/kira-sozlesmesi', label: 'Kira Sözleşmesi Rehberi' },
              { href: '/kira-artis-hesaplama', label: 'Kira Artış Hesaplayıcı' },
              { href: '/kira-geliri-vergisi', label: 'Kira Geliri Vergisi' },
              { href: '/rehber/kiralama-rehberi', label: 'Kiralama Rehberi' },
              { href: '/pismanlik-hakki', label: 'Pişmanlık Hakkı ve Cayma' },
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
