import { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle, AlertTriangle, ArrowRight, Home } from 'lucide-react';

export const metadata: Metadata = {
  title: 'İlk Ev Alma Rehberi | Yeni Alıcılar İçin Adım Adım | Söylemesi Bizden',
  description:
    'İlk evinizi alıyorsunuz? Bütçe planlaması, yer seçimi, kredi başvurusu, tapu işlemleri ve ilk kez ev alacaklar için pratik ipuçları.',
};

const BASLANGIC_ADIMLARI = [
  { adim: 'Finansal Durumunuzu Değerlendirin', aciklama: 'Mevcut birikimlerinizi, aylık gelir-gider dengenizi ve borçlarınızı analiz edin. Aylık taksit gelirinizin %35–40\'ını geçmemeli.', oncelik: 'İlk Adım' },
  { adim: 'Kredi Notunuzu Kontrol Edin', aciklama: 'Findeks veya e-Devlet üzerinden kredi notunuzu öğrenin. Düşükse başvurudan 3–6 ay önce iyileştirme adımları atın.', oncelik: 'Kritik' },
  { adim: 'Bütçe ve Peşinat Belirleyin', aciklama: 'Konut kredisinde en az %20 peşinat hedefleyin (kredi değer oranı max %80). Tapu masrafı için ayrıca %4–5 ekstra bütçe ayırın.', oncelik: '2. Adım' },
  { adim: 'Konum ve İhtiyaç Analizi', aciklama: 'İş yerine mesafe, okul, ulaşım, mahalle güvenliği, gelecek değer artış potansiyeli gibi kriterleri sıralayın.', oncelik: '3. Adım' },
  { adim: 'Emlak Araştırması', aciklama: 'En az 10–15 daire gezin, ₺/m² karşılaştırması yapın. Aynı bölgede birden fazla alternatif değerlendirin.', oncelik: '4. Adım' },
  { adim: 'Banka Tekliflerini Karşılaştırın', aciklama: 'En az 3–5 bankadan yazılı teklif alın; yalnızca faiz değil, masraf, sigorta ve erken ödeme koşullarını da karşılaştırın.', oncelik: '5. Adım' },
  { adim: 'Hukuki İnceleme', aciklama: 'Tapuda ipotek, haciz veya şerh olup olmadığını kontrol edin. Satıcının mülkü satma yetkisi olduğunu doğrulayın.', oncelik: '6. Adım' },
  { adim: 'Sözleşme ve Tapu', aciklama: 'Satış vaadi sözleşmesini noter huzurunda imzalayın; tapu devri için harçları ödeyip tapu müdürlüğüne başvurun.', oncelik: 'Son Adım' },
];

const BUTCE_KALEMLERI = [
  { kalem: 'Ev Fiyatı', oran: '%100', aciklama: 'Piyasa fiyatı; ekspertiz değeri ile mutlaka karşılaştırın.' },
  { kalem: 'Tapu Harcı', oran: '%4', aciklama: 'Alıcı + satıcı her biri %2 öder; toplam işlem bedeli üzerinden.' },
  { kalem: 'Döner Sermaye Ücreti', oran: '≈ 3.000 ₺', aciklama: 'Tapu müdürlüğüne ödenen sabit ücret (yıllık güncellenir).' },
  { kalem: 'DASK (Zorunlu Deprem Sig.)', oran: '500–3.000 ₺', aciklama: 'Zorunlu deprem sigortası; bölge ve yapıya göre değişir.' },
  { kalem: 'Komisyon (Emlakçı)', oran: '%2+KDV', aciklama: 'Alıcı tarafından ödenir; müzakere edilebilir.' },
  { kalem: 'Nakliye ve Tadilat', oran: '%1–3', aciklama: 'Taşınma ve küçük tadilatlar; baştan bütçeleyin.' },
  { kalem: 'Toplam Ek Maliyet', oran: '%8–10', aciklama: 'Ev fiyatının yaklaşık %8–10\'u kadar ek maliyet öngörün.' },
];

const DIKKAT_NOKTALARI = [
  { konu: 'Tapuyu Kontrol Edin', aciklama: 'Tapu sicilinde ipotek, haciz, şerh veya hisseli durum olup olmadığını tapu müdürlüğü veya e-Devlet\'ten mutlaka sorgulayın.' },
  { konu: 'Ekspertiz Değeri', aciklama: 'Bankanın ekspertiz değeri satış fiyatından düşük çıkabilir; bu durumda kredi tutarı düşer ve ek peşinat ödemeniz gerekir.' },
  { konu: 'İskan Belgesi', aciklama: 'Yapı ruhsatı ve iskan belgesi olmayan (kaçak/imarsız) binalarda konut kredisi kullanılamaz ve ileride yıkım riski olabilir.' },
  { konu: 'Aceleye Getirmeyin', aciklama: '"Bu fiyata gider, son gün" baskısına dikkat edin. Eğer ev gerçekten iyi ve fiyatı uygunsa yarın da satılmaz; araştırmanızı tamamlayın.' },
  { konu: 'Sözleşme Şartları', aciklama: 'Kaparo/pey akçesi verirken noterden satış vaadi sözleşmesi yapın. Tapu devri yapılmadan yapılan devirler hukuken korunmaz.' },
];

const DEVLET_DESTEKLERI = [
  { destek: 'TOKİ Konutları', aciklama: 'Toplu Konut İdaresi\'nin uygun fiyatlı konutları; gelir şartı ve kura sistemi ile başvurulur.' },
  { destek: 'KDV İndirimi', aciklama: 'Net 150 m² altındaki konutlar için KDV oranı %1 olabilir; büyük ve lüks projelerde %18/20 uygulanır.' },
  { destek: 'Kamu Bankası Kampanyaları', aciklama: 'Ziraat, Halkbank ve Vakıfbank dönemsel konut kredisi kampanyaları açar; Ev Sahibi Türkiye gibi programlara başvurabilirsiniz.' },
  { destek: 'Faiz Desteği Programları', aciklama: 'Belirli dönemlerde hükümet faiz sübvansiyonu uygular; yürürlükteki kampanyaları bankadan sorgulayın.' },
];

export default function IlkEvAlmaRehberiPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-2 bg-[#00C49F]/20 border border-[#00C49F]/30 text-[#00C49F] text-xs font-bold px-4 py-1.5 rounded-full mb-5">
            <Home size={13} /> İlk Ev Alma
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
            İlk Ev Alma Rehberi
          </h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed mb-8">
            İlk evinizi alıyorsunuz? Bütçeden tapuya 8 adım, masraf kalemleri ve ilk kez ev alacaklar için kritik ipuçları.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-[#00C49F]">8 Adım</p>
              <p className="text-xs text-gray-400">Satın alma süreci</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-white">%20</p>
              <p className="text-xs text-gray-400">Minimum peşinat</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-amber-400">%8–10</p>
              <p className="text-xs text-gray-400">Ek masraf oranı</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">

        {/* Adımlar */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">İlk Ev Alma Adımları</h2>
          <div className="space-y-3">
            {BASLANGIC_ADIMLARI.map((a, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
                <div className="flex items-start justify-between mb-1">
                  <div className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full bg-[#00C49F] text-white text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5">{i + 1}</div>
                    <p className="text-xs font-black text-gray-900">{a.adim}</p>
                  </div>
                  <span className="text-[10px] bg-amber-50 text-amber-600 font-black px-2 py-0.5 rounded shrink-0">{a.oncelik}</span>
                </div>
                <p className="text-[10px] text-gray-600 leading-relaxed mt-1 ml-7">{a.aciklama}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Bütçe Kalemleri */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm overflow-x-auto">
          <h2 className="text-sm font-black text-gray-900 mb-4">Toplam Maliyet Kalemleri</h2>
          <table className="w-full text-[10px] min-w-[380px]">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-2 font-black text-gray-500">Kalem</th>
                <th className="text-center py-2 font-black text-[#00C49F]">Oran/Tutar</th>
                <th className="text-left py-2 font-black text-gray-500">Açıklama</th>
              </tr>
            </thead>
            <tbody>
              {BUTCE_KALEMLERI.map((k, i) => (
                <tr key={i} className={`border-b border-gray-50 last:border-0 ${i === BUTCE_KALEMLERI.length - 1 ? 'bg-[#F0FDF8]' : ''}`}>
                  <td className="py-2 font-black text-gray-900">{k.kalem}</td>
                  <td className="py-2 text-center font-black text-[#00C49F]">{k.oran}</td>
                  <td className="py-2 text-gray-600">{k.aciklama}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Dikkat Noktaları */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Dikkat Edilmesi Gerekenler</h2>
          <div className="space-y-3">
            {DIKKAT_NOKTALARI.map((d, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
                <p className="text-xs font-black text-rose-500 mb-1">{d.konu}</p>
                <p className="text-[10px] text-gray-600 leading-relaxed">{d.aciklama}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Devlet Destekleri */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4 flex items-center gap-2">
            <CheckCircle size={14} className="text-[#00C49F]" /> Devlet Destekleri ve Avantajlar
          </h2>
          <div className="space-y-3">
            {DEVLET_DESTEKLERI.map((d, i) => (
              <div key={i} className="grid grid-cols-3 gap-2 py-2 border-b border-gray-50 last:border-0">
                <p className="text-xs font-black text-[#00C49F]">{d.destek}</p>
                <p className="text-[10px] text-gray-600 leading-relaxed col-span-2">{d.aciklama}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Uyarı */}
        <section className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
          <AlertTriangle size={14} className="text-amber-600 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-800 leading-relaxed">
            <span className="font-black">Hatırlatma:</span> İlk ev alımı büyük bir karardır. Araştırmanızı tamamlamadan acele etmeyin. Profesyonel bir emlak danışmanı veya avukattan destek almanız süreci kolaylaştırır.
          </p>
        </section>

        {/* Related */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-4">İlgili Araçlar</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { href: '/tapu-masrafi', label: 'Tapu Masrafı Hesaplayıcı' },
              { href: '/konut-kredisi-basvuru', label: 'Konut Kredisi Başvuru Rehberi' },
              { href: '/kredi-notu-rehberi', label: 'Kredi Notu Rehberi' },
              { href: '/pesinat-hesaplayici', label: 'Peşinat Hesaplayıcı' },
              { href: '/kira-mi-satin-mi', label: 'Kira mı Satın mı?' },
              { href: '/rehber/ev-satin-alma', label: 'Ev Satın Alma Rehberi' },
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
