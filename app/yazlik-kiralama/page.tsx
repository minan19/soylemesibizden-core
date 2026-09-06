import { Metadata } from 'next';
import Link from 'next/link';
import { Sun, CheckCircle, AlertTriangle, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Yazlık Kiralama Rehberi 2024 | Sezonluk Kiralama, Haklar, Sözleşme | Söylemesi Bizden',
  description:
    'Yazlık kiralama: sezonluk sözleşme şartları, bölge fiyatları, kiracı ve ev sahibi hakları, 6563 sayılı Kanun ve kısa dönem kira kuralları.',
};

const POPULER_BOLGELER = [
  { bolge: 'Bodrum Merkez', fiyat: '25.000–80.000', sezon: 'Temmuz–Ağustos', doluluk: '95%' },
  { bolge: 'Çeşme / Alaçatı', fiyat: '20.000–60.000', sezon: 'Haziran–Eylül', doluluk: '92%' },
  { bolge: 'Antalya / Kemer', fiyat: '12.000–35.000', sezon: 'Mayıs–Ekim', doluluk: '88%' },
  { bolge: 'Fethiye / Ölüdeniz', fiyat: '15.000–45.000', sezon: 'Haziran–Eylül', doluluk: '90%' },
  { bolge: 'Marmaris', fiyat: '10.000–30.000', sezon: 'Haziran–Eylül', doluluk: '85%' },
  { bolge: 'Ayvalık / Cunda', fiyat: '8.000–22.000', sezon: 'Temmuz–Ağustos', doluluk: '80%' },
];

const SOZLESME_MADDELER = [
  { madde: 'Kiralama Süresi', aciklama: 'Kesin giriş-çıkış tarihleri, saat bazlı teslim ve iade (genellikle 14:00/12:00).' },
  { madde: 'Kira Bedeli ve Ödeme', aciklama: 'Haftalık veya toplam tutar; peşin ödeme + depozito ayrımı; iade şartları.' },
  { madde: 'Depozito', aciklama: 'Hasar güvencesi (genellikle 1–2 haftalık kira). Çıkışta evin teslim durumuna göre iade.' },
  { madde: 'Kapasite Sınırı', aciklama: 'Maksimum kişi sayısı. Aşılması halinde ek ücret veya sözleşme feshi hakkı.' },
  { madde: 'Evcil Hayvan / Sigara', aciklama: 'İzin durumu açıkça yazılmalı. "Yasak" varsayım değildir; belirtilmezse tartışma riski.' },
  { madde: 'İptal Politikası', aciklama: 'İptal tarihine göre kademeli iade (30 gün önce tam iade, 15 gün %50 vb.). Yazılı olmalı.' },
  { madde: 'Güvenlik / Giriş', aciklama: 'Anahtar teslimi mi, şifreli mi? Giriş-çıkış saatleri dışında kirasyon erişimi var mı?' },
  { madde: 'Demirbaş Listesi', aciklama: 'Beyaz eşya, klima, elektronik. Hasar durumunda belge zeminini oluşturur.' },
];

const KANUN_BILGISI = [
  {
    baslik: '6563 Sayılı Kanun (Kısa Dönem Kiralama)',
    icerik: '1 Ocak 2024 itibarıyla 100 günden kısa konut kiralamalarında Turizm Bakanlığı\'ndan "Kısa Dönem Konut Kiralama" izin belgesi zorunlu hale geldi.',
    onemli: true,
  },
  {
    baslik: 'İzin Belgesi Şartları',
    icerik: 'Kat malikleri kurulunun oy çokluğuyla onayı (veya tüm kat maliklerinin muvafakati), başvuru ve yıllık belge yenileme zorunluluğu.',
    onemli: true,
  },
  {
    baslik: 'Ceza Yaptırımı',
    icerik: 'Belgesiz kısa dönem kiralama için idari para cezası 100.000 ₺ – 1.000.000 ₺ arasında. Tekrarda kapatma yaptırımı.',
    onemli: true,
  },
  {
    baslik: 'Uzun Dönem (100 gün+)',
    icerik: 'Uzun süreli kiralamalar TBK 299 kapsamında değerlendirilir. Konut kirası hükümleri geçerli olur; 100 günden uzun kiralarda özel izin gerekmez.',
    onemli: false,
  },
  {
    baslik: 'Vergi Yükümlülüğü',
    icerik: 'Kısa dönem kira gelirleri gelir vergisi beyanına dahil edilir. Yıllık istisna tutarı (2024: 33.000 ₺) aşılıyorsa beyan zorunlu.',
    onemli: false,
  },
];

const KIRACININ_HAKLARI = [
  'Sözleşmede belirtilen özellikte ve temiz teslim alınan mülk',
  'İptal politikası çerçevesinde iade hakkı',
  'Yanlış tanıtım durumunda tam iade veya alternatif konut hakkı',
  'Depozitonu hasar olmaksızın iade',
  'Acil arıza (elektrik, su, klima) için derhal müdahale talep etme hakkı',
  'Sözleşme kopyasını alma hakkı',
];

const KONTROL_LISTESI = [
  'Fotoğraflarla gerçek lokasyon doğrulandı',
  'Ev sahibinin izin belgesi (6563 sayılı Kanun) görüldü',
  'İptal politikası yazılı alındı',
  'Giriş-çıkış teslim tutanağı için hazırlık yapıldı',
  'Güvenli ödeme kanalı (EFT / elden olmadan) kullanıldı',
  'Kira sözleşmesi imzalı kopyası alındı',
  'Yüzme havuzu / marina / park yeri durumu doğrulandı',
  'Komşuluk gürültü saatleri soruldu',
];

export default function YazlikKiralamaPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-2 bg-[#00C49F]/20 border border-[#00C49F]/30 text-[#00C49F] text-xs font-bold px-4 py-1.5 rounded-full mb-5">
            <Sun size={13} /> Yazlık Kiralama Rehberi
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
            Yazlık Kiralama Rehberi 2024
          </h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed mb-8">
            Sezonluk kiralama sözleşmesi, 6563 sayılı Kanun yükümlülükleri, bölge fiyatları ve kiracı hakları.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-[#00C49F]">100 Gün</p>
              <p className="text-xs text-gray-400">İzin belgesi eşiği</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-white">6563</p>
              <p className="text-xs text-gray-400">Sayılı Kanun 2024</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-amber-400">1M ₺</p>
              <p className="text-xs text-gray-400">Maks. ceza yaptırımı</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">

        {/* Bölge Fiyatları */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Popüler Bölge Haftalık Kira Fiyatları (₺)</h2>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="grid grid-cols-4 gap-2 px-4 py-2 bg-gray-50 text-[10px] font-black text-gray-500 uppercase">
              <span className="col-span-2">Bölge</span>
              <span className="text-right">Haftalık Kira</span>
              <span className="text-right">Doluluk</span>
            </div>
            {POPULER_BOLGELER.map((b, i) => (
              <div key={i} className="grid grid-cols-4 gap-2 px-4 py-3 border-t border-gray-50">
                <div className="col-span-2">
                  <p className="text-xs font-black text-gray-900">{b.bolge}</p>
                  <p className="text-[10px] text-gray-400">{b.sezon}</p>
                </div>
                <p className="text-xs font-bold text-[#00C49F] text-right self-center">{b.fiyat} ₺</p>
                <p className="text-xs font-black text-gray-700 text-right self-center">{b.doluluk}</p>
              </div>
            ))}
          </div>
          <p className="text-[10px] text-gray-400 mt-2">* Fiyatlar 2–4 kişilik standart villa/daire için yüksek sezonda tahmini aralıktır.</p>
        </section>

        {/* Kanun Bilgisi */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Yasal Düzenlemeler (2024)</h2>
          <div className="space-y-3">
            {KANUN_BILGISI.map((k, i) => (
              <div key={i} className={`rounded-2xl border p-5 ${k.onemli ? 'bg-rose-50 border-rose-100' : 'bg-white border-gray-100'} shadow-sm`}>
                <p className={`text-xs font-black mb-2 ${k.onemli ? 'text-rose-700' : 'text-gray-900'}`}>{k.baslik}</p>
                <p className="text-[10px] text-gray-600 leading-relaxed">{k.icerik}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Sözleşme Maddeleri */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Sözleşmede Olması Gerekenler</h2>
          <div className="space-y-3">
            {SOZLESME_MADDELER.map((m, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
                <p className="text-xs font-black text-gray-900 mb-1">{m.madde}</p>
                <p className="text-[10px] text-gray-600 leading-relaxed">{m.aciklama}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Kiracı Hakları */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4 flex items-center gap-2">
            <CheckCircle size={14} className="text-[#00C49F]" /> Kiracının Hakları
          </h2>
          <div className="space-y-2">
            {KIRACININ_HAKLARI.map((h, i) => (
              <div key={i} className="flex items-start gap-2 py-2 border-b border-gray-50 last:border-0">
                <CheckCircle size={12} className="text-[#00C49F] shrink-0 mt-0.5" />
                <p className="text-xs text-gray-700">{h}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Kontrol Listesi */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4">Rezervasyon Öncesi Kontrol Listesi</h2>
          <div className="space-y-2">
            {KONTROL_LISTESI.map((k, i) => (
              <div key={i} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
                <div className="w-5 h-5 rounded border-2 border-[#00C49F]/40 shrink-0" />
                <p className="text-xs text-gray-700">{k}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Uyarı */}
        <section className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
          <AlertTriangle size={14} className="text-amber-600 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-800 leading-relaxed">
            <span className="font-black">Önemli:</span> 6563 sayılı Kanun kapsamındaki izin belgesi yükümlülüğü ev sahiplerini bağlar; kiracı bu belgeyi sormaya hakkı vardır. Kira ödemelerini e-posta veya mesaj onaylı banka havalesiyle yapın; elden ödeme uyuşmazlık durumunda ispat güçlüğü yaratır.
          </p>
        </section>

        {/* Related */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-4">İlgili Araçlar</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { href: '/turizm-yatirimi', label: 'Turizm Yatırımı Analizi' },
              { href: '/kira-sozlesmesi-ornegi', label: 'Kira Sözleşmesi Örneği' },
              { href: '/kira-geliri-vergisi', label: 'Kira Geliri Vergisi' },
              { href: '/dask-hesaplayici', label: 'DASK Prim Hesaplayıcı' },
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
