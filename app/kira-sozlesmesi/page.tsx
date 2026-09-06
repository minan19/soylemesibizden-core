import { Metadata } from 'next';
import Link from 'next/link';
import {
  FileText, CheckCircle, AlertTriangle, ArrowRight,
  Key, Scale, Shield, Users,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Kira Sözleşmesi Rehberi | Zorunlu Maddeler & Haklar | Söylemesi Bizden',
  description:
    'Kira sözleşmesinde bulunması gereken zorunlu maddeler, kiracı ve ev sahibi hakları, depozito kuralları, kira artışı hesaplama ve erken tahliye koşulları.',
};

const MANDATORY_CLAUSES = [
  { no: 1, title: 'Tarafların Kimlik Bilgileri', desc: 'TC kimlik no, ad-soyad, iletişim bilgileri (hem kiracı hem ev sahibi).' },
  { no: 2, title: 'Kiralanan Mülkün Tanımı', desc: 'Adres, bağımsız bölüm no, kat, brüt/net m², tapu bilgileri.' },
  { no: 3, title: 'Kira Bedeli ve Ödeme Şekli', desc: 'Aylık kira tutarı, para birimi, hangi gün ve hangi hesaba ödeneceği.' },
  { no: 4, title: 'Kira Süresi', desc: 'Başlangıç ve bitiş tarihi. Belirsiz süreli sözleşmelerde fesih ihbar süreleri belirtilmeli.' },
  { no: 5, title: 'Depozito', desc: 'Tutar (max 3 aylık kira), iade koşulları, tutma süresi (max 3 ay). Banka hesabına yatırılması önerilir.' },
  { no: 6, title: 'Kira Artış Şartı', desc: 'TÜFE bazlı artış (yasal üst sınır: %25). Belirtilmezse yasal oran uygulanır.' },
  { no: 7, title: 'Aidat/Ortak Gider Sorumluluğu', desc: 'Kim öder? Sözleşmede açıkça belirtilmeli.' },
  { no: 8, title: 'Mülkün Teslim Durumu', desc: 'Eşyalı/eşyasız, demirbaş listesi, fotoğraflı teslim tutanağı.' },
  { no: 9, title: 'Tadilat/Değişiklik Hakları', desc: 'Kiracının yapabileceği değişiklikler ve izin koşulları.' },
  { no: 10, title: 'Fesih Koşulları', desc: 'Erken çıkış, ihbar süresi, tazminat koşulları.' },
];

const TENANT_RIGHTS = [
  'Kira bedelini peşin değil her ay ödeme hakkı (aksi sözleşmede belirtilmemişse)',
  'Tahliye için en az 1 yıl öncesinden ihbar hakkı (konut kiralarında)',
  'Kira artışının yasal TÜFE oranı + %25 tavanını aşmaması',
  'Depozitosunun iade edilmesi (hasarsız teslimde 3 ay içinde)',
  'Ev sahibinin habersiz mülke giremeyeceği güvencesi',
  '5 yıl tamamlanınca piyasa rayicine güncelleme mahkeme kararıyla yapılabilir',
  'İşten çıkarılma/hastalık/taşınma gibi zorunlulukta erken çıkış hakkı (mahkeme veya anlaşma)',
];

const LANDLORD_RIGHTS = [
  'Sözleşme bitiminde ihtiyaç gerekçesiyle (kendisi veya birinci derece yakını) tahliye talep edebilir',
  'Kira ödenmemesinde 30 gün gecikme sonrası noterle ihtarname — 2. ihtarda tahliye davası açma hakkı',
  'Mülkün satışı halinde yeni malikin 1 ay içinde tahliye ihbarı hakkı (ancak en az 6 ay süre verilmeli)',
  'Mülkün zorunlu tadilat gerektirmesi hâlinde tahliye talep etme hakkı',
  'Sözleşme koşullarına aykırı kullanımda tahliye davası açma hakkı',
];

const DEPOSIT_RULES = [
  { rule: 'Maksimum tutar', detail: '3 aylık kira bedelini geçemez' },
  { rule: 'Tavsiye edilen yöntem', detail: 'Banka blokeye alınmış hesaba yatırılması' },
  { rule: 'İade süresi', detail: 'Sorunsuz teslimde en geç 3 ay içinde' },
  { rule: 'Kesinti nedeni', detail: 'Yalnızca mülke verilen gerçek hasar (olağan yıpranma sayılmaz)' },
  { rule: 'Hesaplama', detail: 'Hasar tutarı belgelenmeli; ispat yükü ev sahibindedir' },
];

const TERMINATION = [
  {
    who: 'Kiracı',
    when: 'Sözleşme bitiminde',
    notice: '15 gün önce yazılı bildirim',
    note: 'Bildirimsiz çıkılırsa kira ödeme yükümlülüğü devam eder',
  },
  {
    who: 'Kiracı',
    when: 'Sözleşme süresinde',
    notice: 'Anlaşma veya mahkeme kararı gerekir',
    note: 'Zorunlu hâllerde hakim kararıyla olanaklı',
  },
  {
    who: 'Ev Sahibi',
    when: 'Sözleşme bitiminde',
    notice: 'En az 1 yıl önce noterle ihtarname (ihtiyaç gerekçesiyle)',
    note: 'Boşaltılan mülk 3 yıl başkasına kiralanamaz',
  },
  {
    who: 'Ev Sahibi',
    when: 'Kira ödenmemesinde',
    notice: '2 ihtarname sonrası dava',
    note: '30 gün gecikme + noter ihtarı gerekli',
  },
];

export default function KiraSozlesmesiPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-2 bg-[#00C49F]/20 border border-[#00C49F]/30 text-[#00C49F] text-xs font-bold px-4 py-1.5 rounded-full mb-5">
            <FileText size={13} /> Kira Hukuku Rehberi
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
            Kira Sözleşmesi Rehberi
          </h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed mb-8">
            Kiracı ve ev sahiplerinin bilmesi gereken zorunlu sözleşme maddeleri, yasal haklar,
            depozito kuralları ve tahliye koşulları.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-[#00C49F]">10</p>
              <p className="text-xs text-gray-400">Zorunlu madde</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-white">3 ay</p>
              <p className="text-xs text-gray-400">Max depozito</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-amber-400">%25</p>
              <p className="text-xs text-gray-400">Kira artış tavanı</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">

        {/* Mandatory clauses */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-2">Sözleşmede Bulunması Gereken 10 Madde</h2>
          <p className="text-sm text-gray-500 mb-5">
            Türk Borçlar Kanunu (TBK) kapsamında kira sözleşmesinin temel unsurları:
          </p>
          <div className="space-y-2">
            {MANDATORY_CLAUSES.map(c => (
              <div key={c.no} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm flex items-start gap-4">
                <div className="w-7 h-7 rounded-lg bg-[#F0FDF8] border border-[#00C49F]/20 flex items-center justify-center shrink-0">
                  <span className="text-[10px] font-black text-[#00C49F]">{c.no}</span>
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-900 mb-0.5">{c.title}</p>
                  <p className="text-xs text-gray-500 leading-relaxed">{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Deposit rules */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
              <Shield size={20} className="text-amber-600" />
            </div>
            <h2 className="text-lg font-black text-gray-900">Depozito Kuralları</h2>
          </div>
          <div className="space-y-3">
            {DEPOSIT_RULES.map(d => (
              <div key={d.rule} className="flex items-start justify-between gap-4 py-2 border-b border-gray-50 last:border-0">
                <span className="text-xs font-bold text-gray-700 shrink-0">{d.rule}</span>
                <span className="text-xs text-gray-500 text-right">{d.detail}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 bg-amber-50 border border-amber-200 rounded-xl p-3">
            <div className="flex items-start gap-2">
              <AlertTriangle size={13} className="text-amber-600 shrink-0 mt-0.5" />
              <p className="text-xs text-amber-800">
                Depozito nakit olarak ev sahibine verilmesi yerine taraflarca mutabık kalınan banka hesabına
                bloke yatırılması önerilir. Bu yöntem iade uyuşmazlıklarını önler.
              </p>
            </div>
          </div>
        </section>

        {/* Rights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Key size={18} className="text-[#00C49F]" />
              <h3 className="text-base font-black text-gray-900">Kiracı Hakları</h3>
            </div>
            <div className="space-y-2">
              {TENANT_RIGHTS.map((r, i) => (
                <div key={i} className="flex items-start gap-2">
                  <CheckCircle size={12} className="text-[#00C49F] shrink-0 mt-0.5" />
                  <p className="text-xs text-gray-600 leading-relaxed">{r}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Users size={18} className="text-blue-600" />
              <h3 className="text-base font-black text-gray-900">Ev Sahibi Hakları</h3>
            </div>
            <div className="space-y-2">
              {LANDLORD_RIGHTS.map((r, i) => (
                <div key={i} className="flex items-start gap-2">
                  <CheckCircle size={12} className="text-blue-500 shrink-0 mt-0.5" />
                  <p className="text-xs text-gray-600 leading-relaxed">{r}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Termination */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-5">Kira Sözleşmesi Sona Erdirme Koşulları</h2>
          <div className="space-y-3">
            {TERMINATION.map((t, i) => (
              <div key={i} className={`rounded-xl border p-4 ${t.who === 'Kiracı' ? 'bg-[#F0FDF8] border-[#00C49F]/20' : 'bg-blue-50 border-blue-200'}`}>
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <span className={`text-[10px] font-black px-2 py-1 rounded-full ${t.who === 'Kiracı' ? 'bg-[#00C49F] text-white' : 'bg-blue-600 text-white'}`}>
                    {t.who}
                  </span>
                  <span className="text-xs font-bold text-gray-900">{t.when}</span>
                </div>
                <p className="text-xs text-gray-700 font-semibold mb-1">Bildirim: {t.notice}</p>
                <p className="text-xs text-gray-500">{t.note}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Warning */}
        <section className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
          <div className="flex items-start gap-3">
            <AlertTriangle size={18} className="text-amber-600 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-bold text-amber-800 mb-2">Sözlü Kira Sözleşmesi Riski</h3>
              <p className="text-xs text-amber-700 leading-relaxed">
                Sözlü kira sözleşmeleri de hukuken geçerlidir, ancak ispat güçlüğü yaratır.
                Her zaman yazılı sözleşme yapın ve imzalı bir nüsha her tarafta bulundurun.
                Mümkünse noter onayı alın veya noter kanalıyla kira ödeyin.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link href="/kira-artis-hesaplama" className="group bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md transition-all flex flex-col gap-3">
              <Scale size={20} className="text-[#00C49F]" />
              <div>
                <p className="text-sm font-bold text-gray-900 mb-1">Kira Artış Hesapla</p>
                <p className="text-xs text-gray-500">TÜFE + %25 tavan</p>
              </div>
              <ArrowRight size={13} className="text-gray-300 group-hover:text-gray-600 transition-colors mt-auto" />
            </Link>
            <Link href="/kira-geliri-vergisi" className="group bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md transition-all flex flex-col gap-3">
              <FileText size={20} className="text-blue-600" />
              <div>
                <p className="text-sm font-bold text-gray-900 mb-1">Kira Geliri Vergisi</p>
                <p className="text-xs text-gray-500">2024 gelir vergisi hesabı</p>
              </div>
              <ArrowRight size={13} className="text-gray-300 group-hover:text-gray-600 transition-colors mt-auto" />
            </Link>
            <Link href="/rehber/kiralama-rehberi" className="group bg-gradient-to-br from-[#00C49F] to-[#00a882] rounded-2xl p-5 hover:shadow-md transition-all flex flex-col gap-3">
              <Key size={20} className="text-white" />
              <div>
                <p className="text-sm font-bold text-white mb-1">Kiralama Rehberi</p>
                <p className="text-xs text-white/70">Sözleşme, depozito, haklar</p>
              </div>
              <ArrowRight size={13} className="text-white/60 group-hover:text-white transition-colors mt-auto" />
            </Link>
          </div>
        </section>

      </div>
    </main>
  );
}
