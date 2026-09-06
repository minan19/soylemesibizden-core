import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kooperatif Konut Rehberi | Üyelik, Hak ve Riskler | Söylemesi Bizden',
  description:
    'Kooperatif konut nedir, nasıl üye olunur, hak ve yükümlülükler, kooperatif tapu süreci ve olası riskler hakkında kapsamlı rehber.',
};

const KOOPERATIF_AVANTAJLARI = [
  { baslik: 'Düşük Maliyet', aciklama: 'Ticari kâr marjı olmadığından piyasa fiyatının %15–30 altında konut edinme fırsatı sunar.' },
  { baslik: 'Kolektif Müzakere Gücü', aciklama: 'Toplu alım sayesinde inşaat firmasından daha iyi fiyat ve kalite standartları elde edilir.' },
  { baslik: 'Ortak Yönetim', aciklama: 'Üyeler yönetim kuruluna katılabilir; projeye ilişkin kararlar demokratik alınır.' },
  { baslik: 'Devlet Desteği', aciklama: 'TOKİ bağlantılı kooperatiflerde uzun vadeli düşük faizli kredi imkânı bulunabilir.' },
];

const RISKLER = [
  { baslik: 'Uzun Teslim Süreleri', aciklama: 'Kooperatiflerde proje süreci yıllarca uzayabilir; teslim tarihi garantisi yoktur.' },
  { baslik: 'Yönetim Sorunları', aciklama: 'Kötü yönetim, yolsuzluk veya iç anlaşmazlıklar projeyi durdurabilir.' },
  { baslik: 'Ek Aidat Talepleri', aciklama: 'Maliyet aşımlarında üyelerden ek ödeme istenebilir; başlangıçtaki bütçe şişebilir.' },
  { baslik: 'Tapu Gecikmesi', aciklama: 'Tüm borcunu ödeyen üye bile proje tamamlanmadan tapusunu alamaz.' },
  { baslik: 'Hisse Devrinde Kısıtlama', aciklama: 'Kooperatif üyeliği ve hissesi yönetim kurulu onayı olmadan kolayca devredilemez.' },
];

const UYELIK_SURECI = [
  { adim: 1, baslik: 'Kooperatif Araştırın', aciklama: 'Tarihçesi, teslim sicili, mevcut projeleri ve mali durumu inceleyin. Ticaret Sicili ve İl Müdürlüğü kayıtlarını kontrol edin.' },
  { adim: 2, baslik: 'Ana Sözleşmeyi İnceleyin', aciklama: 'Üyelik şartları, aidat yapısı, çıkarılma koşulları ve yönetim yapısı ana sözleşmede yer alır; mutlaka okuyun.' },
  { adim: 3, baslik: 'Giriş Aidatı ve Hisse Bedeli', aciklama: 'Üyelik kabulünden sonra belirlenmiş giriş aidatı ve hisse bedeli ödenir; makbuzları saklayın.' },
  { adim: 4, baslik: 'Üyelik Kararı', aciklama: 'Yönetim kurulu üyeliğinizi onaylar. Onay sonrası üye defterine kaydolursunuz.' },
  { adim: 5, baslik: 'İnşaat ve Taksit Ödemeleri', aciklama: 'Projenin ilerleme dönemlerine göre belirlenen taksitler ödenir; gecikmeler ek faiz doğurabilir.' },
  { adim: 6, baslik: 'Kura veya Kıdem Sırası', aciklama: 'Daire tahsisi kura veya kıdeme göre yapılır; yönetmeliği önceden öğrenin.' },
  { adim: 7, baslik: 'Tapu Teslimi', aciklama: 'Borcun tam ödenmesi ve inşaatın tamamlanmasının ardından bireysel tapu devri gerçekleşir.' },
];

const TAPU_ASAMALARI = [
  { aşama: 'Kooperatif Adına Arsa Tapusu', sure: 'Proje başında', durum: 'Arsa satın alındığında' },
  { aşama: 'Kat İrtifakı', sure: 'İnşaat başlamadan', durum: 'Mimari proje onayında' },
  { aşama: 'Kat Mülkiyeti', sure: 'İskan sonrası', durum: 'Yapı kullanma izni alındığında' },
  { aşama: 'Ferdi Tapu', sure: 'Borç ödeme tamamlandığında', durum: 'Kooperatif tarafından devredilir' },
];

const PRATIK_BILGILER = [
  { baslik: 'Kooperatif Sicil Sorgusu', aciklama: 'Ticaret Bakanlığı Merkezi Sicil Kayıt Sistemi (MERSİS) üzerinden kooperatifin tescil durumunu sorgulayın.' },
  { baslik: 'Arsa Üzerindeki Yükümlülük', aciklama: 'Kooperatif arsasında ipotek, haciz veya şerh olup olmadığını tapu müdürlüğünden tapu kaydı alarak kontrol edin.' },
  { baslik: 'Aidatların Belgelenmesi', aciklama: 'Yaptığınız her ödeme için makbuz alın; banka kanalıyla ödeme yapın. Sözlü taahhütlere güvenmeyin.' },
  { baslik: 'Avukat Desteği', aciklama: 'Yüksek meblağlı kooperatif üyeliği öncesinde ana sözleşmeyi bir gayrimenkul avukatına inceletin.' },
];

export default function KooperatifKonutRehberiPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-14">
          <p className="text-[#00C49F] text-xs font-bold mb-3 uppercase tracking-widest">Konut Rehberi</p>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">Kooperatif Konut Rehberi</h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed">
            Kooperatifle konut edinmenin avantajları, riskleri, üyelik süreci ve tapu aşamaları hakkında kapsamlı bilgi.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-10 space-y-10">

        {/* Avantajlar */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-base font-black text-gray-900 mb-1">Kooperatif Konutun Avantajları</h2>
          <p className="text-xs text-gray-400 mb-5">Neden kooperatif yoluyla konut alınır?</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {KOOPERATIF_AVANTAJLARI.map((a, i) => (
              <div key={i} className="border border-[#00C49F]/20 rounded-xl p-4 bg-[#F0FDF8]">
                <p className="text-xs font-black text-[#00C49F] mb-1">✓ {a.baslik}</p>
                <p className="text-[11px] text-gray-600 leading-relaxed">{a.aciklama}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Üyelik Süreci */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-base font-black text-gray-900 mb-1">Üyelik ve Edinim Süreci</h2>
          <p className="text-xs text-gray-400 mb-5">Kooperatif üyeliğinden ferdi tapuya kadar 7 adım.</p>
          <div className="space-y-4">
            {UYELIK_SURECI.map((a) => (
              <div key={a.adim} className="flex gap-3">
                <span className="w-6 h-6 rounded-full bg-[#00C49F] text-white text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5">{a.adim}</span>
                <div>
                  <p className="text-xs font-black text-gray-900 mb-0.5">{a.baslik}</p>
                  <p className="text-[11px] text-gray-500 leading-relaxed">{a.aciklama}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tapu Aşamaları */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm overflow-x-auto">
          <h2 className="text-base font-black text-gray-900 mb-1">Tapu Aşamaları</h2>
          <p className="text-xs text-gray-400 mb-5">Kooperatif tapusundan ferdi tapuya geçiş adımları.</p>
          <table className="w-full text-[10px] min-w-[380px]">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-2 font-black text-gray-500">Aşama</th>
                <th className="text-center py-2 font-black text-gray-500">Süre</th>
                <th className="text-right py-2 font-black text-[#00C49F]">Koşul</th>
              </tr>
            </thead>
            <tbody>
              {TAPU_ASAMALARI.map((t, i) => (
                <tr key={i} className="border-b border-gray-50 last:border-0">
                  <td className="py-2 font-black text-gray-900">{t.aşama}</td>
                  <td className="py-2 text-center font-bold text-gray-500">{t.sure}</td>
                  <td className="py-2 text-right font-bold text-[#00C49F]">{t.durum}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Riskler */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-base font-black text-gray-900 mb-1">Bilmeniz Gereken Riskler</h2>
          <p className="text-xs text-gray-400 mb-5">Kooperatif konutla ilgili yaygın sorunlar ve nasıl korunulur?</p>
          <div className="space-y-3">
            {RISKLER.map((r, i) => (
              <div key={i} className="flex gap-3 border border-rose-100 rounded-xl p-4 bg-rose-50">
                <span className="text-rose-500 font-black text-sm shrink-0">⚠</span>
                <div>
                  <p className="text-xs font-black text-rose-700 mb-0.5">{r.baslik}</p>
                  <p className="text-[11px] text-rose-600">{r.aciklama}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pratik Bilgiler */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-base font-black text-gray-900 mb-1">Pratik Bilgiler</h2>
          <p className="text-xs text-gray-400 mb-5">Kooperatif üyeliği öncesi ve süresince dikkat edilmesi gerekenler.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PRATIK_BILGILER.map((b, i) => (
              <div key={i} className="border border-gray-100 rounded-xl p-4">
                <p className="text-xs font-black text-gray-900 mb-1">{b.baslik}</p>
                <p className="text-[11px] text-gray-500 leading-relaxed">{b.aciklama}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}
