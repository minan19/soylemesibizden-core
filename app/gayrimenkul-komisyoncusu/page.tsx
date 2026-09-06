import { Metadata } from 'next';
import Link from 'next/link';
import {
  Users, CheckCircle, AlertTriangle, ArrowRight, Scale,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Gayrimenkul Komisyoncusu Rehberi | Emlakçı Seçimi, Haklar | Söylemesi Bizden',
  description:
    'Emlakçı komisyon oranları, lisanslı komisyoncu seçimi, sözleşme hakları ve alıcı/satıcı hakları rehberi.',
};

const COMMISSION_TABLE = [
  { type: 'Satış İşlemleri', buyer: '%2 (alıcıdan)', seller: '%2 (satıcıdan)', note: 'Tapu devri sırasında ödenir, toplam %4.' },
  { type: 'Kiralama İşlemleri', buyer: '1 aylık kira (kiracıdan)', seller: '—', note: 'Yalnızca kiracıdan; kiraya verenden komisyon alınamaz (TTK md. 520).' },
  { type: 'Ticari Gayrimenkul Satış', buyer: '%2–%3', seller: '%2–%3', note: 'Anlaşmaya göre değişir; fatura zorunlu.' },
  { type: 'Ticari Kira', buyer: '1–2 aylık kira', seller: 'Anlaşmaya göre', note: 'Yazılı sözleşme zorunlu.' },
];

const SELECTION_CRITERIA = [
  { criterion: 'TOBB Lisansı', detail: 'Aracılık faaliyetleri için TOBB (Türkiye Odalar ve Borsalar Birliği) bünyesindeki ilgili oda kayıt belgesi zorunludur.' },
  { criterion: 'Tapu Sicil Müdürlüğü Yetki Belgesi', detail: 'Tapu devri süreçlerine aracılık edecek komisyoncuların yetkili belgesi olmalıdır.' },
  { criterion: 'Portföy Büyüklüğü', detail: 'Aktif portföy sayısı bölgedeki pazar bilgisini gösterir; çok geniş portföy kişisel ilgi kalitesini düşürebilir.' },
  { criterion: 'Referans ve Yorumlar', detail: 'Son 12 aydaki satış/kira geçmişini ve müşteri yorumlarını inceleyin.' },
  { criterion: 'Pazarlama Kanalları', detail: 'Hangi portallarda ilan verdiği, fotoğraf/sanal tur kalitesi ve sosyal medya varlığı değerlendirin.' },
  { criterion: 'Yazılı Aracılık Sözleşmesi', detail: 'Komisyon oranı, münhasır yetki süresi ve koşullar yazılı sözleşmeyle belirlenmeli; sözlü anlaşmalar geçersizdir.' },
];

const CONTRACT_TYPES = [
  { type: 'Açık Yetki', desc: 'Birden fazla acenteye eş zamanlı yetki verilir.', pros: 'Geniş yayılım', cons: 'Düşük öncelik, çakışan teklifler' },
  { type: 'Münhasır Yetki', desc: 'Tek acente belirli süre için yetkilidir.', pros: 'Yoğun pazarlama çabası', cons: 'Süre boyunca bağlılık (genellikle 3–6 ay)' },
  { type: 'Net Fiyat Sözleşmesi', desc: 'Satıcı net tutarı belirler; üstü komisyon.', pros: 'Satıcı fiyatını garantiler', cons: 'Fazla fiyatlandırma riski' },
];

const BUYER_RIGHTS = [
  'Komisyon oranı tapu devri öncesinde yazılı olarak teyit edilmelidir.',
  'Emlakçı, satın alma sürecinde size özel danışmanlık sunar; alıcı çıkarlarınızı korumalıdır.',
  'Tapu devir işleminde ödenen komisyon üzerinden fatura talep etme hakkınız vardır.',
  'Lisanssız aracı kullanımı durumunda ödenen komisyonu Tüketici Mahkemesi kanalıyla iade talebinde bulunabilirsiniz.',
  'Açıklanmayan gizli kusur varsa komisyoncunun da sorumluluğu bulunmaktadır (TBK md. 475).',
];

const SELLER_RIGHTS = [
  'Münhasır yetki süresini doldurmadan sözleşmeyi feshederseniz tazminat ödeyebilirsiniz; sözleşmeyi dikkatlice okuyun.',
  'Satış gerçekleşmezse komisyon talep edilemez (başarı bazlı ücret ilkesi).',
  'Emlakçının kendi adına (veya bağlı kişilere) satın almasını önce size bildirmesi zorunludur.',
  'Birden fazla teklifin hepsini size iletmesi yasal yükümlülüktür; seçici iletim haksız rekabet sayılır.',
  'Tapu harçları ve döner sermaye ücretleri komisyon dışında; emlakçı bunları ayrı göstermeli.',
];

const RED_FLAGS = [
  'Yazılı sözleşme imzalamayı reddeden komisyoncu',
  'Peşin komisyon veya ön ödeme talep edilmesi',
  'TOBB lisans belgesini gösteremeyen acente',
  '%4 toplamı aşan komisyon oranı talebi (piyasa standardını aşar)',
  'Tapu devir tarihini bilerek erteleme girişimi',
  'Gerçek değerin çok altında fiyat önererek hızlı satışa yönlendirme',
];

const NEGOTIATION_TIPS = [
  { tip: 'Birden Fazla Teklif Alın', detail: 'En az 3 farklı komisyoncudan yazılı teklif toplayın; oranlar %1–%3 arasında değişebilir.' },
  { tip: 'Paket Pazarlığı', detail: 'Fotoğraf, sanal tur ve ilan maliyetleri ayrı fatura ediliyorsa komisyon üzerinden indirim talep edin.' },
  { tip: 'Performans Şartı', detail: 'Belirlenen sürede satılmazsa komisyon dilimli azalsın (ör: 6. aydan sonra %1.5).' },
  { tip: 'Münhasır Yetkiyi Kısaltın', detail: 'Standart 6 ay yerine 3 ay önerun; sonuç vermezse yenileme veya iptal seçeneği sağlar.' },
];

export default function GayrimenkulKomisyoncusuPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-2 bg-[#00C49F]/20 border border-[#00C49F]/30 text-[#00C49F] text-xs font-bold px-4 py-1.5 rounded-full mb-5">
            <Users size={13} /> Komisyoncu Rehberi
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
            Gayrimenkul Komisyoncusu Rehberi
          </h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed mb-8">
            Emlakçı seçimi, komisyon oranları, sözleşme türleri, alıcı ve satıcı hakları — her şey açık ve net.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-[#00C49F]">%4</p>
              <p className="text-xs text-gray-400">Satışta toplam komisyon</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-white">1 Ay</p>
              <p className="text-xs text-gray-400">Kirada komisyon standardı</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-amber-400">Yazılı</p>
              <p className="text-xs text-gray-400">Sözleşme zorunlu</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">

        {/* Komisyon Tablosu */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Komisyon Oranları</h2>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="text-left px-4 py-3 font-black text-gray-700">İşlem Türü</th>
                    <th className="text-left px-4 py-3 font-black text-blue-600">Alıcı / Kiracı</th>
                    <th className="text-left px-4 py-3 font-black text-rose-600">Satıcı / Kiraya Veren</th>
                    <th className="text-left px-4 py-3 font-black text-gray-500">Not</th>
                  </tr>
                </thead>
                <tbody>
                  {COMMISSION_TABLE.map((r, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-3 font-bold text-gray-800">{r.type}</td>
                      <td className="px-4 py-3 text-gray-600">{r.buyer}</td>
                      <td className="px-4 py-3 text-gray-600">{r.seller}</td>
                      <td className="px-4 py-3 text-gray-500 leading-relaxed">{r.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Seçim Kriterleri */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Lisanslı Komisyoncu Seçimi</h2>
          <div className="space-y-3">
            {SELECTION_CRITERIA.map((c, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm flex items-start gap-3">
                <CheckCircle size={13} className="text-[#00C49F] shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-black text-gray-900 mb-0.5">{c.criterion}</p>
                  <p className="text-[10px] text-gray-600 leading-relaxed">{c.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Sözleşme Türleri */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Aracılık Sözleşmesi Türleri</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {CONTRACT_TYPES.map((c, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                <p className="text-xs font-black text-gray-900 mb-1">{c.type}</p>
                <p className="text-[10px] text-gray-600 mb-3 leading-relaxed">{c.desc}</p>
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[#00C49F] text-[10px] font-bold">+</span>
                    <span className="text-[10px] text-gray-600">{c.pros}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-rose-500 text-[10px] font-bold">−</span>
                    <span className="text-[10px] text-gray-600">{c.cons}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Alıcı / Satıcı Hakları */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <h2 className="text-sm font-black text-gray-900 mb-4 flex items-center gap-2">
              <Scale size={14} className="text-blue-500" /> Alıcı Hakları
            </h2>
            <ul className="space-y-2.5">
              {BUYER_RIGHTS.map((r, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle size={11} className="text-blue-500 shrink-0 mt-0.5" />
                  <p className="text-[10px] text-gray-600 leading-relaxed">{r}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <h2 className="text-sm font-black text-gray-900 mb-4 flex items-center gap-2">
              <Scale size={14} className="text-rose-500" /> Satıcı Hakları
            </h2>
            <ul className="space-y-2.5">
              {SELLER_RIGHTS.map((r, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle size={11} className="text-rose-500 shrink-0 mt-0.5" />
                  <p className="text-[10px] text-gray-600 leading-relaxed">{r}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Kırmızı Bayraklar */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Dikkat Edilmesi Gereken Uyarı İşaretleri</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {RED_FLAGS.map((f, i) => (
              <div key={i} className="flex items-start gap-2 bg-rose-50 border border-rose-200 rounded-xl p-3">
                <AlertTriangle size={12} className="text-rose-500 shrink-0 mt-0.5" />
                <p className="text-[10px] text-rose-700 leading-relaxed">{f}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Müzakere İpuçları */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Komisyon Müzakere İpuçları</h2>
          <div className="space-y-3">
            {NEGOTIATION_TIPS.map((t, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm flex items-start gap-3">
                <div className="bg-[#F0FDF8] text-[#00C49F] text-[10px] font-black px-2 py-1 rounded-lg shrink-0">{i + 1}</div>
                <div>
                  <p className="text-xs font-black text-gray-900 mb-0.5">{t.tip}</p>
                  <p className="text-[10px] text-gray-600 leading-relaxed">{t.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Warning */}
        <section className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
          <AlertTriangle size={14} className="text-amber-600 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-800 leading-relaxed">
            <span className="font-black">Hatırlatma:</span> Gayrimenkul aracılık faaliyetleri için yetki belgesi zorunludur. Lisanssız aracıya ödenen komisyon Tüketici Mahkemesi aracılığıyla iade edilebilir. Her zaman yazılı sözleşme imzalayın ve fatura talep edin.
          </p>
        </section>

        {/* Related */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-4">İlgili Sayfalar</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { href: '/emlak-komisyonu', label: 'Emlak Komisyonu Hesaplayıcı' },
              { href: '/tapu-devir-sureci', label: 'Tapu Devir Süreci' },
              { href: '/pismanlik-hakki', label: 'Pişmanlık Hakkı ve Cayma' },
              { href: '/tapu-masrafi', label: 'Tapu ve Alım Masrafları' },
              { href: '/rehber/satici-rehberi', label: 'Satıcı Rehberi' },
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
