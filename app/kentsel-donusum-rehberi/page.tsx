import { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle, AlertTriangle, ArrowRight, Building2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Kentsel Dönüşüm Rehberi | Riskli Yapı, Hak Sahipliği | Söylemesi Bizden',
  description:
    'Kentsel dönüşüm nedir? Riskli yapı tespiti, hak sahipliği hakları, kira yardımı, kat karşılığı anlaşması ve dönüşüm sürecinde dikkat edilmesi gerekenler.',
};

const DONUSUM_SURECI = [
  { adim: 'Riskli Yapı Tespiti', aciklama: 'Bina sahibinin başvurusu veya Çevre ve Şehircilik Bakanlığı\'nın re\'sen kararıyla lisanslı kurumlar tarafından yapı incelenir; depreme karşı güvenli olmadığı tespit edilir.', sure: '1–3 Ay' },
  { adim: 'Tebligat ve İtiraz', aciklama: 'Riskli yapı kararı hak sahiplerine tebliğ edilir. 15 gün içinde itiraz hakkı vardır; itiraz ilgili Çevre ve Şehircilik İl Müdürlüğü bünyesindeki teknik heyete yapılır.', sure: '15 Gün' },
  { adim: 'Tahliye Bildirimi', aciklama: 'İtiraz reddedilirse veya itiraz yapılmazsa binanın 60 gün içinde tahliye edilmesi istenir. Tahliye süresi uzatılabilir.', sure: '60 Gün' },
  { adim: 'Kira Yardımı', aciklama: 'Tahliye eden hak sahiplerine 18 ay boyunca aylık kira yardımı yapılır (bölgeye göre değişen güncel bedel). Kiracılar için farklı miktarlar geçerlidir.', sure: '18 Ay' },
  { adim: 'Yıkım ve Yeniden İnşaat', aciklama: 'Hak sahiplerinin %3/5 çoğunluğu ile müteahhit anlaşması yapılır; yıkım sonrası yeni yapı inşa edilir. Azınlık hissesi mahkeme yoluyla el değiştirebilir.', sure: '18–36 Ay' },
  { adim: 'Teslim ve Tescil', aciklama: 'Yeni bina tamamlandığında hak sahiplerine daireleri teslim edilir ve bağımsız bölümler tapu kütüğüne tescil edilir.', sure: 'Son Adım' },
];

const HAK_SAHIPLIGI = [
  { hak: 'Kira Yardımı', aciklama: '18 aya kadar devlet destekli kira yardımı; malikler ve kiracılar için farklı miktarlarda ödenir.' },
  { hak: 'Faiz Desteği', aciklama: 'Riskli yapı yerine yenisi inşa edilecekse çekilen konut kredisine belirli oranda devlet faiz desteği sağlanabilir.' },
  { hak: 'Vergi ve Harç Muafiyeti', aciklama: 'Kentsel dönüşüm kapsamındaki tapu işlemleri ve inşaat harçları ile KDV\'den muafiyet sağlanır.' },
  { hak: 'Müteahhit Seçim Hakkı', aciklama: 'Hak sahipleri %3/5 çoğunluk ile istedikleri müteahhiti seçebilir; devlet müteahhit dayatamaz.' },
  { hak: 'Azınlık Hissesi Zorla Satış', aciklama: 'Anlaşmayan azınlıktaki hissedar payı, Bakanlık aracılığıyla Hazine\'ye veya anlaşan hissedara devredilir.' },
];

const MUDAHALE_HATALARI = [
  { hata: 'Müteahhit Araştırması Yapmamak', aciklama: 'Mali durumu ve referansları iyi olmayan müteahhitlerle anlaşmak inşaat yarım kalmasına neden olabilir. Vergi borcu, tamamlanmış proje sayısı araştırın.' },
  { hata: 'Sözleşmeyi Dikkatlice Okumamak', aciklama: 'Kat karşılığı veya hasılat paylaşımı sözleşmelerindeki belirsiz maddeler ileride ciddi hak kaybına yol açabilir; avukat incelemesi şarttır.' },
  { hata: 'Kira Yardımını Geç Başlatmak', aciklama: 'Kira yardımı başvurusu tahliyeyle eş zamanlı yapılmalı; geç yapılan başvurularda kaybedilen dönemler için geriye dönük ödeme yapılmaz.' },
  { hata: 'Komşu Baskısına Uymak', aciklama: 'Hak sahiplerinin yalnızca çoğunluğunun anlaşması yeterlidir; azınlıkta kalmak hakkınızdır. Baskı altında imzalamayın.' },
];

const PRATIK_BILGILER = [
  { bilgi: 'Riskli Yapı Sorgulama', detay: 'e-Devlet üzerinden "Riskli Yapı Sorgulama" hizmetiyle binanızın riskli yapı listesinde olup olmadığını kontrol edebilirsiniz.' },
  { bilgi: 'Kat Karşılığı mı Hasılat mı?', detay: 'Kat karşılığında belirli daireler alırsınız; hasılat paylaşımında satış gelirinin bir kısmı. Piyasa koşullarına göre hangisinin daha avantajlı olduğunu hesaplayın.' },
  { bilgi: 'Bağımsız Değerleme', detay: 'Müteahhitin önerdiği kat planını kabul etmeden önce bağımsız bir ekspertizden daire değerlerini teyit ettirin.' },
  { bilgi: 'İtiraz Hakkı', detay: 'Riskli yapı tespitine 15 gün, tahliye süresinin uzatılmasına ayrıca başvurulabilir. Süre kaçırmak hak kaybı doğurur.' },
];

export default function KentselDonusumRehberiPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-2 bg-[#00C49F]/20 border border-[#00C49F]/30 text-[#00C49F] text-xs font-bold px-4 py-1.5 rounded-full mb-5">
            <Building2 size={13} /> Kentsel Dönüşüm
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
            Kentsel Dönüşüm Rehberi
          </h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed mb-8">
            Riskli yapı tespitinden yeni daireye: süreç adımları, hak sahipliği hakları, kira yardımı ve dikkat edilmesi gerekenler.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-[#00C49F]">18 Ay</p>
              <p className="text-xs text-gray-400">Kira yardımı süresi</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-white">3/5</p>
              <p className="text-xs text-gray-400">Çoğunluk eşiği</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-amber-400">15 Gün</p>
              <p className="text-xs text-gray-400">İtiraz süresi</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">

        {/* Süreç */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Kentsel Dönüşüm Süreci</h2>
          <div className="space-y-3">
            {DONUSUM_SURECI.map((a, i) => (
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

        {/* Hak Sahipliği */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4 flex items-center gap-2">
            <CheckCircle size={14} className="text-[#00C49F]" /> Hak Sahipliği Hakları
          </h2>
          <div className="space-y-3">
            {HAK_SAHIPLIGI.map((h, i) => (
              <div key={i} className="grid grid-cols-3 gap-2 py-2 border-b border-gray-50 last:border-0">
                <p className="text-xs font-black text-[#00C49F]">{h.hak}</p>
                <p className="text-[10px] text-gray-600 leading-relaxed col-span-2">{h.aciklama}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Sık Hatalar */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Sık Yapılan Hatalar</h2>
          <div className="space-y-3">
            {MUDAHALE_HATALARI.map((h, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
                <p className="text-xs font-black text-rose-500 mb-1">{h.hata}</p>
                <p className="text-[10px] text-gray-600 leading-relaxed">{h.aciklama}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Pratik Bilgiler */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4">Pratik Bilgiler</h2>
          <div className="space-y-3">
            {PRATIK_BILGILER.map((p, i) => (
              <div key={i} className="grid grid-cols-3 gap-2 py-2 border-b border-gray-50 last:border-0">
                <p className="text-xs font-black text-[#00C49F]">{p.bilgi}</p>
                <p className="text-[10px] text-gray-600 leading-relaxed col-span-2">{p.detay}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Uyarı */}
        <section className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
          <AlertTriangle size={14} className="text-amber-600 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-800 leading-relaxed">
            <span className="font-black">Önemli:</span> Kentsel dönüşüm süreçleri hem hukuki hem mali açıdan karmaşıktır. Müteahhit ile sözleşme imzalamadan önce mutlaka bir avukat ve bağımsız ekspertizden destek alın.
          </p>
        </section>

        {/* Related */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-4">İlgili Araçlar</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { href: '/dask-hesaplayici', label: 'DASK Prim Hesaplayıcı' },
              { href: '/deprem-sigorta-hesaplayici', label: 'Deprem Sigortası Hesaplayıcı' },
              { href: '/yeni-konut-projeleri', label: 'Yeni Konut Projeleri' },
              { href: '/tapu-devir-rehberi', label: 'Tapu Devir Rehberi' },
              { href: '/insaat-maliyeti', label: 'İnşaat Maliyeti Hesaplayıcı' },
              { href: '/rehber', label: 'Konut Rehberi' },
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
