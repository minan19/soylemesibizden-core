import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Tapu Sicil Sorgulama Rehberi | e-Devlet ve Tapu Müdürlüğü | Söylemesi Bizden',
  description:
    'Tapu sicil sorgulama nasıl yapılır? e-Devlet, TAKBİS ve tapu müdürlüğü yolları, ipotek ve şerh araştırması, maliklik sorgulama.',
};

const SORGULAMA_YONTEMLERI = [
  {
    yontem: 'e-Devlet Kapısı (e-devlet.gov.tr)',
    adimlar: [
      'e-Devlet\'e TC kimlik numaranız ve şifrenizle giriş yapın.',
      '"Tapu ve Kadastro Genel Müdürlüğü" hizmetlerine gidin.',
      '"Tapu Belgesi Sorgulama" bölümünden ada/parsel veya adres ile sorgulama yapın.',
      'Tapu kaydındaki malik bilgisi, şerhler ve ipotek kısıtlamaları görüntülenir.',
    ],
    not: 'Yalnızca kendi adınıza kayıtlı taşınmazları tam detaylıyla görebilirsiniz; üçüncü şahıs için kısıtlı bilgi.',
    ikon: '💻',
  },
  {
    yontem: 'TAKBİS (Tapu ve Kadastro Bilgi Sistemi)',
    adimlar: [
      'Tapu müdürlüğünde yetkili personel üzerinden TAKBİS sorgusu yapabilirsiniz.',
      'Satın almak istediğiniz taşınmazın ada, parsel, bağımsız bölüm numarasını verin.',
      'İpotek, haciz, irtifak hakkı, şerh gibi kısıtlamalar listelenir.',
      'Tapu senedinin alınması veya tapu kaydı örneği talebi yapılabilir.',
    ],
    not: 'TAKBİS, profesyoneller için en kapsamlı kayıt sistemidir; değerleme uzmanları ve bankalar bu sistem üzerinden sorgu yapar.',
    ikon: '🏛️',
  },
  {
    yontem: 'Tapu Müdürlüğü Yüz Yüze',
    adimlar: [
      'Taşınmazın bağlı olduğu Tapu Müdürlüğü\'ne gidin (tapu kaydındaki il/ilçe).',
      'Kimlik belgesi ile müracaat edin; yasal menfaat beyan edin.',
      'Tapu kaydı örneği (tapu sicil müdürlüğünden belge) talep edin.',
      'Belge için harç ödenebilir; çıktı aynı gün alınabilir.',
    ],
    not: 'Satın alma öncesinde yüz yüze müracaat en güvenilir yoldur; üçüncü şahıs adına da maliklik araştırması yapılabilir.',
    ikon: '📋',
  },
];

const KONTROL_LISTESI = [
  { kalem: 'Malik Bilgisi', aciklama: 'Taşınmazın gerçek maliki kim? Satıcı ile uyuşuyor mu?', onemli: true },
  { kalem: 'İpotek Şerhi', aciklama: 'Taşınmaz üzerinde banka veya kişi ipoteği var mı? Miktar nedir?', onemli: true },
  { kalem: 'Haciz Kaydı', aciklama: 'İcra, mahkeme veya vergi haczi var mı? İşlem yapılamaz.', onemli: true },
  { kalem: 'Ön Alım Hakkı (Şufa)', aciklama: 'Hisseli taşınmazlarda diğer malikler ön alım hakkına sahiptir.', onemli: true },
  { kalem: 'Kira Şerhi', aciklama: 'Kiracının kira şerhi var mı? Tahliye süreci uzayabilir.', onemli: false },
  { kalem: 'İrtifak Hakkı', aciklama: 'Komşu parsel yararına geçit veya inşaat hakkı var mı?', onemli: false },
  { kalem: 'Belediye Şerhleri', aciklama: 'Kamulaştırma, imar değişikliği veya sit alanı şerhi var mı?', onemli: true },
  { kalem: 'Veraset Durumu', aciklama: 'Miras nedeniyle birden fazla malik var mı? Tüm mirasçıların onayı gerekli.', onemli: true },
];

const PRATIK_IPUCLARI = [
  { baslik: 'İşlem Öncesi Mutlaka Sorgu', aciklama: 'Sözleşme imzalamadan en geç bir gün önce tapu kaydını teyit edin; kayıt o ana kadar değişmiş olabilir.' },
  { baslik: 'Vekalet ile Satışta Dikkat', aciklama: 'Satıcı vekaletle temsil ediliyorsa vekaletname tarihini ve kapsamını noter onaylı asıl belgeden doğrulayın.' },
  { baslik: 'İpotek Sona Ermiş Olabilir', aciklama: 'Tapuda ipotek görünse bile kredi kapatılmışsa ipotek terkin edilmemiş olabilir. Satıcıdan terkin belgesi isteyin.' },
  { baslik: 'Kadastro Paftasını İnceleyin', aciklama: 'Taşınmazın harita üzerindeki konumu, sınırları ve komşu parseller ile çakışma riski kadastro paftasından kontrol edilebilir.' },
];

export default function GayrimenkulSicilSorgulamaPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-14">
          <p className="text-[#00C49F] text-xs font-bold mb-3 uppercase tracking-widest">Hukuki Rehber</p>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">Tapu Sicil Sorgulama Rehberi</h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed">
            Tapu kaydı nasıl sorgulanır, ipotek ve şerh araştırması nasıl yapılır?
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-10 space-y-10">

        {/* Sorgulama Yöntemleri */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-base font-black text-gray-900 mb-1">Sorgulama Yöntemleri</h2>
          <p className="text-xs text-gray-400 mb-5">Tapu sicilini sorgulamak için üç farklı yol.</p>
          <div className="space-y-6">
            {SORGULAMA_YONTEMLERI.map((y, i) => (
              <div key={i} className="border border-gray-100 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">{y.ikon}</span>
                  <p className="text-xs font-black text-gray-900">{y.yontem}</p>
                </div>
                <div className="space-y-1.5 mb-3">
                  {y.adimlar.map((a, j) => (
                    <div key={j} className="flex gap-2">
                      <span className="text-[10px] font-black text-[#00C49F] shrink-0">{j + 1}.</span>
                      <p className="text-[11px] text-gray-600">{a}</p>
                    </div>
                  ))}
                </div>
                <p className="text-[10px] text-amber-600 bg-amber-50 rounded-lg px-3 py-2">{y.not}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Kontrol Listesi */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-base font-black text-gray-900 mb-1">Tapu Kaydında Kontrol Listesi</h2>
          <p className="text-xs text-gray-400 mb-5">Alım öncesinde tapu kaydında incelemeniz gereken kalemler.</p>
          <div className="space-y-3">
            {KONTROL_LISTESI.map((k, i) => (
              <div key={i} className={`flex items-start gap-3 border rounded-xl p-3 ${k.onemli ? 'border-rose-100 bg-rose-50' : 'border-gray-100'}`}>
                <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${k.onemli ? 'bg-rose-500 text-white' : 'bg-gray-200 text-gray-600'}`}>
                  <span className="text-[9px] font-black">{k.onemli ? '!' : '✓'}</span>
                </div>
                <div>
                  <p className={`text-xs font-black mb-0.5 ${k.onemli ? 'text-rose-700' : 'text-gray-900'}`}>{k.kalem}</p>
                  <p className="text-[11px] text-gray-600">{k.aciklama}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pratik İpuçları */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-base font-black text-gray-900 mb-1">Pratik İpuçları</h2>
          <p className="text-xs text-gray-400 mb-5">Tapu araştırmasında sık yapılan hatalar ve öneriler.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PRATIK_IPUCLARI.map((p, i) => (
              <div key={i} className="border border-gray-100 rounded-xl p-4">
                <p className="text-xs font-black text-gray-900 mb-1">{p.baslik}</p>
                <p className="text-[11px] text-gray-500 leading-relaxed">{p.aciklama}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#00C49F]/10 border border-[#00C49F]/30 rounded-2xl p-5">
          <p className="text-xs font-black text-[#00C49F] mb-2">Hızlı Erişim</p>
          <p className="text-[11px] text-gray-600 leading-relaxed mb-3">
            Tapu kaydı araştırmanız tamamlandıktan sonra mülkün değer analizi için hesaplama araçlarımıza göz atabilirsiniz.
          </p>
          <div className="flex flex-wrap gap-2">
            <Link href="/tapu-masrafi" className="text-[10px] font-black text-white bg-[#00C49F] px-3 py-1.5 rounded-full hover:bg-[#00a882] transition-colors">
              Tapu Masrafı Hesapla
            </Link>
            <Link href="/konut-deger-tahmini" className="text-[10px] font-black text-[#00C49F] border border-[#00C49F] px-3 py-1.5 rounded-full hover:bg-[#00C49F]/10 transition-colors">
              Değer Tahmini
            </Link>
          </div>
        </div>

      </div>
    </main>
  );
}
