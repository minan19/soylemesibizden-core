import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, TrendingUp, AlertTriangle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Kira Zam Oranı Tablosu 2024 | TÜFE Artış Oranları, Yasal Limit | Söylemesi Bizden',
  description:
    '2018–2024 yıllık TÜFE kira artış oranları tablosu. %25 yasal tavan kuralı, muafiyet koşulları ve hesaplama örnekleri.',
};

const TUFE_TABLOSU = [
  { yil: 2024, donem: 'Eylül 2023 – Eylül 2024', tufe: 48.58, tavan: 25, uygulamaAciklama: '%25 tavan devam ediyor (Temmuz 2024 sonrası yeniden değerlendirme bekleniyor)' },
  { yil: 2023, donem: 'Eylül 2022 – Eylül 2023', tufe: 65.17, tavan: 25, uygulamaAciklama: 'TÜFE %65 olsa da konut kiraları için %25 tavan uygulandı' },
  { yil: 2022, donem: 'Mayıs 2022\'ye kadar TÜFE; sonrası %25 tavan', tufe: 64.27, tavan: 25, uygulamaAciklama: 'Haziran 2022\'de %25 tavan getirildi; öncesinde TÜFE ile artış yapılıyordu' },
  { yil: 2021, donem: 'Eylül 2020 – Eylül 2021', tufe: 19.58, tavan: null, uygulamaAciklama: 'Tavan yoktu; TÜFE oranı uygulandı' },
  { yil: 2020, donem: 'Eylül 2019 – Eylül 2020', tufe: 11.75, tavan: null, uygulamaAciklama: 'Tavan yoktu; TÜFE oranı uygulandı' },
  { yil: 2019, donem: 'Eylül 2018 – Eylül 2019', tufe: 9.26, tavan: null, uygulamaAciklama: 'Tavan yoktu; TÜFE oranı uygulandı' },
  { yil: 2018, donem: 'Eylül 2017 – Eylül 2018', tufe: 24.52, tavan: null, uygulamaAciklama: 'Tavan yoktu; TÜFE oranı uygulandı' },
];

const HESAPLAMA_ORNEKLERI = [
  { mevcutKira: 10000, oran: 25, yeniKira: 12500, not: '%25 tavan (2022–2024 dönemi)' },
  { mevcutKira: 15000, oran: 25, yeniKira: 18750, not: '%25 tavan (2022–2024 dönemi)' },
  { mevcutKira: 20000, oran: 25, yeniKira: 25000, not: '%25 tavan (2022–2024 dönemi)' },
  { mevcutKira: 10000, oran: 48.58, yeniKira: 14858, not: 'TÜFE uygulanırsa (2024)' },
  { mevcutKira: 15000, oran: 48.58, yeniKira: 22287, not: 'TÜFE uygulanırsa (2024)' },
];

const MUAFIYET_DURUMLARI = [
  { durum: '5 Yıl Dolduran Sözleşmeler', aciklama: 'TBK m.344/3: 5 yıl veya daha uzun kira ilişkilerinde hâkim, TÜFE, kira tespiti davası ile daha yüksek zam yapabilir.' },
  { durum: 'Yenilenen Dönem Anlaşması', aciklama: 'Taraflar yazılı olarak %25 üzerinde anlaşırsa bu oran uygulanabilir (tartışmalı); ancak yargıya taşınabilir.' },
  { durum: 'İşyeri Kiraları', aciklama: '%25 tavan yalnızca konut kiraları için geçerlidir; işyeri kiralarında TÜFE esas alınır.' },
  { durum: 'Yeni Sözleşmeler', aciklama: 'İlk kira belirleme serbest piyasaya göre yapılır; tavan yalnızca mevcut sözleşme yenilemelerinde uygulanır.' },
];

const PRATIK_BILGI = [
  { bilgi: 'Zam Dönemi', detay: 'Kira artışı yalnızca yıllık dönem yenilemesinde yapılabilir; ara dönemde zam istenemez.' },
  { bilgi: 'Yazılı Bildirim', detay: 'Kiraya veren zam talebini sözleşme yenileme tarihinden en az 1 ay önce yazılı bildirmelidir.' },
  { bilgi: 'Ödeme Zorunluluğu', detay: 'Kiracı yasal limiti aşan zam talebini ödemek zorunda değildir; yargıya taşıyabilir.' },
  { bilgi: 'TÜFE Hesabı', detay: 'TÜİK\'in 12 aylık ortalama TÜFE değeri esas alınır; kira başlangıç ayına göre belirlenir.' },
];

export default function KiraZamTablosuPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-2 bg-[#00C49F]/20 border border-[#00C49F]/30 text-[#00C49F] text-xs font-bold px-4 py-1.5 rounded-full mb-5">
            <TrendingUp size={13} /> Kira Zam Tablosu
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
            Kira Zam Oranı Tablosu 2018–2024
          </h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed mb-8">
            Yıllık TÜFE kira artış oranları, %25 yasal tavan uygulaması ve hesaplama örnekleri.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-[#00C49F]">%25</p>
              <p className="text-xs text-gray-400">2024 tavan</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-white">%48.58</p>
              <p className="text-xs text-gray-400">2024 TÜFE</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-amber-400">Konut</p>
              <p className="text-xs text-gray-400">Tavan kapsamı</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">

        {/* TÜFE Tablosu */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm overflow-x-auto">
          <h2 className="text-sm font-black text-gray-900 mb-4">Yıllık TÜFE Kira Artış Oranları</h2>
          <table className="w-full text-[10px] min-w-[500px]">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-2 font-black text-gray-500">Yıl</th>
                <th className="text-left py-2 font-black text-gray-500">Dönem</th>
                <th className="text-right py-2 font-black text-gray-500">TÜFE</th>
                <th className="text-right py-2 font-black text-gray-500">Yasal Tavan</th>
              </tr>
            </thead>
            <tbody>
              {TUFE_TABLOSU.map((row, i) => (
                <tr key={i} className={`border-b border-gray-50 ${row.tavan ? 'bg-amber-50/50' : ''}`}>
                  <td className="py-2 font-black text-gray-900">{row.yil}</td>
                  <td className="py-2 text-gray-600">{row.donem}</td>
                  <td className="py-2 text-right font-black text-[#00C49F]">%{row.tufe}</td>
                  <td className="py-2 text-right font-black text-amber-600">{row.tavan ? `%${row.tavan}` : '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-[10px] text-gray-400 mt-2">* TÜİK 12 aylık ortalama TÜFE değerleri kullanılmıştır.</p>
        </section>

        {/* Hesaplama Örnekleri */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm overflow-x-auto">
          <h2 className="text-sm font-black text-gray-900 mb-4">Hesaplama Örnekleri</h2>
          <table className="w-full text-[10px] min-w-[400px]">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-2 font-black text-gray-500">Mevcut Kira</th>
                <th className="text-right py-2 font-black text-gray-500">Oran</th>
                <th className="text-right py-2 font-black text-gray-500">Yeni Kira</th>
                <th className="text-left py-2 font-black text-gray-500 pl-4">Not</th>
              </tr>
            </thead>
            <tbody>
              {HESAPLAMA_ORNEKLERI.map((r, i) => (
                <tr key={i} className="border-b border-gray-50">
                  <td className="py-2 font-bold text-gray-800">{r.mevcutKira.toLocaleString('tr-TR')} ₺</td>
                  <td className="py-2 text-right font-black text-amber-600">%{r.oran}</td>
                  <td className="py-2 text-right font-black text-[#00C49F]">{r.yeniKira.toLocaleString('tr-TR')} ₺</td>
                  <td className="py-2 text-gray-500 pl-4">{r.not}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Muafiyet Durumları */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Tavan Kuralının İstisnaları</h2>
          <div className="space-y-3">
            {MUAFIYET_DURUMLARI.map((m, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
                <p className="text-xs font-black text-[#00C49F] mb-1">{m.durum}</p>
                <p className="text-[10px] text-gray-600 leading-relaxed">{m.aciklama}</p>
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
            <span className="font-black">Önemli:</span> %25 tavan 2022–2024 dönemi için geçerlidir. Yasa değişiklikleri için TÜİK ve TCMB duyurularını takip edin; kesin hesap için bir avukattan destek alın.
          </p>
        </section>

        {/* Related */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-4">İlgili Araçlar</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { href: '/kira-artis-hesaplama', label: 'Kira Artış Hesaplayıcı' },
              { href: '/kira-deger-artisi', label: 'Kira Değer Artışı Simülatörü' },
              { href: '/kira-tespit-davasi-rehberi', label: 'Kira Tespit Davası Rehberi' },
              { href: '/kiraci-haklari', label: 'Kiracı Hakları' },
              { href: '/mal-sahibi-haklari', label: 'Mal Sahibi Hakları' },
              { href: '/kira-geliri-vergisi', label: 'Kira Geliri Vergisi' },
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
