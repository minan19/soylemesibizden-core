import { Metadata } from 'next';
import Link from 'next/link';
import {
  MapPin, TrendingUp, AlertTriangle, CheckCircle,
  ArrowRight, FileText, Scale, Home,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Arsa Yatırımı Rehberi | Nasıl Alınır, Ne Dikkat Edilmeli? | Söylemesi Bizden',
  description:
    'Türkiye\'de arsa yatırımı: imar durumu türleri, arazi alımında kontrol listesi, hisseli arsa riskleri, değer artışı dinamikleri ve yasal yükümlülükler.',
};

const ZONING_TYPES = [
  {
    type: 'Konut İmarlı',
    desc: 'Üzerine konut inşa edilebilir. TAKS/KAKS oranları belediye planında belirlenmiştir.',
    value: 'Yüksek',
    risk: 'Düşük',
    icon: '🏠',
    note: 'En değerli arsa tipi. Alım öncesi imar planı detayı mutlaka incelenmeli.',
  },
  {
    type: 'Ticari İmarlı',
    desc: 'Ofis, otel, AVM gibi ticari yapılar yapılabilir. Merkez konumlarda çok değerli.',
    value: 'Çok Yüksek',
    risk: 'Orta',
    icon: '🏢',
    note: 'Kira getirisi konutun üzerinde olabilir. Proje maliyeti yüksektir.',
  },
  {
    type: 'Tarım Arazisi',
    desc: 'Tarımsal amaçlı kullanım. Yapılaşma kısıtlıdır; izinsiz yapı yıkılır.',
    value: 'Düşük',
    risk: 'Yüksek',
    icon: '🌾',
    note: 'İmar dönüşümü zordur. "İmara açılacak" vaatlerine karşı dikkatli olun.',
  },
  {
    type: 'Orman / Hazine',
    desc: 'Devlet ya da Orman İdaresi mülkiyetinde. Satış yasaktır, tapu düzenlenemez.',
    value: 'Geçersiz',
    risk: 'Çok Yüksek',
    icon: '🌲',
    note: 'Bu arazilerin satışını öneren tekliflere kesinlikle yanıt vermeyin.',
  },
  {
    type: 'Hisseli Arsa',
    desc: 'Birden fazla maliki olan arazi. Her malik kendi hissesini serbestçe satabilir.',
    value: 'Orta',
    risk: 'Yüksek',
    icon: '🤝',
    note: 'Diğer maliklerle anlaşmazlık hâlinde ortaklığın giderilmesi davası açılabilir.',
  },
  {
    type: 'Sit Alanı',
    desc: 'Kültürel veya doğal sit alanında kalan arazi. Yapılaşma çok kısıtlı ya da yasak.',
    value: 'Düşük',
    risk: 'Yüksek',
    icon: '🏛',
    note: 'Koruma kurulundan izin gerekmektedir. Değer artışı potansiyeli çok sınırlıdır.',
  },
];

const CHECKLIST = [
  { group: 'İmar ve Hukuki Kontrol', items: [
    'Belediyeden imar durumu belgesi alın (TAKS, KAKS, kullanım amacı)',
    'Tapu müdürlüğünden parsel kütük kaydını sorgulayın (ipotek, haciz, şerh)',
    'Kadastro koordinatlarını kontrol edin — tapuyla arazinin örtüştüğünü doğrulayın',
    'Hisseli arsada diğer hissedarlar ve hisse oranları araştırılmalı',
    'İfraz/tevhid (bölme/birleştirme) kısıtı var mı kontrol edin',
  ]},
  { group: 'Fiziksel ve Çevre Kontrol', items: [
    'Arsayı yerinde ziyaret edin; çevre yapılaşmasını gözlemleyin',
    'Altyapı (elektrik, su, yol, kanalizasyon) varlığını kontrol edin',
    'Sel, heyelan, fay hattı yakınlığı araştırılmalı',
    'Komşu parsellere ait yapıların arsa sınırına tecavüzü var mı kontrol edin',
  ]},
  { group: 'Finansal Kontrol', items: [
    'Son 12 ayda bölgede gerçekleşen emsal satışlar araştırılmalı',
    'Geliştirme maliyeti (altyapı, temel, inşaat) hesaplanmalı',
    'Arsa vergisi + Çevre temizlik vergisi borcu sorgulanmalı',
    'Bankaların bu arsa için kredi verip vermeyeceği kontrol edilmeli',
  ]},
];

const APPRECIATION_FACTORS = [
  { factor: 'Ulaşım Yatırımı', detail: 'Metro, otoyol, köprü duyurusu bölge değerini %20–60 artırabilir', icon: '🚇' },
  { factor: 'İmar Değişikliği', detail: 'Tarım → konut imara açılma, değeri 5–10 kat yükseltebilir', icon: '📋' },
  { factor: 'Kentsel Dönüşüm', detail: 'Çevre yapıların yenilenmesi bölge ortalama değerini yukarı çeker', icon: '🏗' },
  { factor: 'Nüfus Artışı', detail: 'Büyüyen nüfus bölgelerinde konut talebi arsayı değerlendirir', icon: '👥' },
  { factor: 'OSB / Üniversite', detail: 'Yakın sanayi bölgesi veya kampüs işçi ve öğrenci konutu talebini artırır', icon: '🏭' },
  { factor: 'Turizm Gelişimi', detail: 'Tatil bölgelerinde arsa değerleri turistik talep ve dolar bazlı büyür', icon: '🏖' },
];

const RISKS = [
  '"İmara açılacak" vaadi gerçekleşmeyebilir — yalnızca mevcut belgelenmiş imar değeri güvenilirdir.',
  'Hisseli arsa; diğer hissedara tanınan ön alım hakkı (şufa) satışı geciktirebilir.',
  'Arsa değer artışı likiditenin düşük olmasından dolayı gerçekleşmeden boşa çıkabilir.',
  'Köy/kırsal alanlarda fiktif satışlar ve tapusuz taşınmazlar yaygındır — kadastro kontrolü şart.',
  'Yabancılara tarım arazisi satışı toplam 30 hektarla sınırlıdır.',
  'Sit alanı, orman alanı veya askeri yasak bölgedeki arsa alımı hukuki müeyyideye yol açabilir.',
];

const valueColors: Record<string, string> = {
  'Yüksek': 'text-[#00C49F]',
  'Çok Yüksek': 'text-blue-600',
  'Orta': 'text-amber-500',
  'Düşük': 'text-rose-500',
  'Geçersiz': 'text-rose-700',
};

const riskColors: Record<string, string> = {
  'Düşük': 'text-[#00C49F]',
  'Orta': 'text-amber-500',
  'Yüksek': 'text-rose-500',
  'Çok Yüksek': 'text-rose-700',
};

export default function ArsaYatirimiPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-2 bg-[#00C49F]/20 border border-[#00C49F]/30 text-[#00C49F] text-xs font-bold px-4 py-1.5 rounded-full mb-5">
            <MapPin size={13} /> Arsa Rehberi
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
            Arsa Yatırımı Rehberi
          </h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed mb-8">
            İmar türleri, kontrol listesi, değer artışı dinamikleri ve hisseli arsa riskleri dahil
            Türkiye&apos;de arsa alımının eksiksiz rehberi.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-[#00C49F]">6</p>
              <p className="text-xs text-gray-400">İmar türü</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-white">30 dk</p>
              <p className="text-xs text-gray-400">Okuma süresi</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-amber-400">6 Risk</p>
              <p className="text-xs text-gray-400">Dikkat edilmesi gereken</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">

        {/* Zoning types */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-5">Arsa/Arazi Türleri ve İmar Durumları</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {ZONING_TYPES.map(z => (
              <div key={z.type} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-2xl">{z.icon}</span>
                  <div>
                    <h3 className="text-sm font-black text-gray-900">{z.type}</h3>
                    <div className="flex gap-3 mt-0.5">
                      <span className="text-[10px]">Değer: <strong className={valueColors[z.value]}>{z.value}</strong></span>
                      <span className="text-[10px]">Risk: <strong className={riskColors[z.risk]}>{z.risk}</strong></span>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed mb-2">{z.desc}</p>
                <div className="flex items-start gap-2 bg-amber-50 rounded-lg p-2">
                  <AlertTriangle size={11} className="text-amber-500 shrink-0 mt-0.5" />
                  <p className="text-[10px] text-amber-700">{z.note}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Checklist */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-5">Alım Öncesi Kontrol Listesi</h2>
          <div className="space-y-5">
            {CHECKLIST.map(c => (
              <div key={c.group} className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
                <h3 className="text-sm font-black text-gray-900 mb-3 flex items-center gap-2">
                  <FileText size={14} className="text-[#00C49F]" /> {c.group}
                </h3>
                <div className="space-y-2">
                  {c.items.map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle size={13} className="text-[#00C49F] shrink-0 mt-0.5" />
                      <p className="text-xs text-gray-600 leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Appreciation factors */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-5">Değer Artışını Tetikleyen Faktörler</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {APPRECIATION_FACTORS.map(f => (
              <div key={f.factor} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm flex items-start gap-3">
                <span className="text-xl">{f.icon}</span>
                <div>
                  <p className="text-xs font-bold text-gray-900 mb-0.5">{f.factor}</p>
                  <p className="text-[10px] text-gray-500 leading-relaxed">{f.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Risks */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Riskler ve Dikkat Noktaları</h2>
          <div className="space-y-2">
            {RISKS.map((r, i) => (
              <div key={i} className="flex items-start gap-3 bg-white rounded-xl border border-amber-100 p-4 shadow-sm">
                <AlertTriangle size={14} className="text-amber-500 shrink-0 mt-0.5" />
                <p className="text-xs text-gray-600 leading-relaxed">{r}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Hisseli arsa detail */}
        <section className="bg-[#F0FDF8] border border-[#00C49F]/20 rounded-2xl p-6">
          <h2 className="text-lg font-black text-gray-900 mb-3">Hisseli Arsa: Bilmeniz Gerekenler</h2>
          <div className="space-y-3 text-xs text-gray-600 leading-relaxed">
            <p>Hisseli arsa; birden fazla kişi adına kayıtlı taşınmazdır. Her malik kendi hissesini satabilir ancak diğer malikler <strong>şufa hakkı</strong> (ön alım hakkı) kullanabilir — yani aynı fiyattan almayı talep edebilir.</p>
            <p>Tüm malikler ortaklaşa inşaat yapabilir veya arazi kullanımında anlaşabilir. Anlaşmazlık hâlinde sulh hukuk mahkemesine <strong>ortaklığın giderilmesi</strong> davası açılabilir.</p>
            <div className="flex items-start gap-2 mt-2">
              <Scale size={14} className="text-[#00C49F] shrink-0 mt-0.5" />
              <p className="font-bold text-[#00C49F]">Tavsiye: Hisseli arsa alımında noter onaylı ortaklık sözleşmesi yapılmasını şiddetle tavsiye ederiz.</p>
            </div>
          </div>
        </section>

        {/* CTAs */}
        <section>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link href="/imar-durumu" className="group bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md transition-all flex flex-col gap-3">
              <MapPin size={20} className="text-[#00C49F]" />
              <div>
                <p className="text-sm font-bold text-gray-900 mb-1">İmar Durumu Rehberi</p>
                <p className="text-xs text-gray-500">TAKS, KAKS, ruhsat</p>
              </div>
              <ArrowRight size={13} className="text-gray-300 group-hover:text-gray-600 transition-colors mt-auto" />
            </Link>
            <Link href="/emlak-vergisi" className="group bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md transition-all flex flex-col gap-3">
              <FileText size={20} className="text-blue-600" />
              <div>
                <p className="text-sm font-bold text-gray-900 mb-1">Arsa Vergisi Hesapla</p>
                <p className="text-xs text-gray-500">Arsa emlak vergisi oranları</p>
              </div>
              <ArrowRight size={13} className="text-gray-300 group-hover:text-gray-600 transition-colors mt-auto" />
            </Link>
            <Link href="/yatirim-bolgesi" className="group bg-gradient-to-br from-[#00C49F] to-[#00a882] rounded-2xl p-5 hover:shadow-md transition-all flex flex-col gap-3">
              <TrendingUp size={20} className="text-white" />
              <div>
                <p className="text-sm font-bold text-white mb-1">En İyi Yatırım Bölgeleri</p>
                <p className="text-xs text-white/70">Bölge analiz skorlaması</p>
              </div>
              <ArrowRight size={13} className="text-white/60 group-hover:text-white transition-colors mt-auto" />
            </Link>
          </div>
        </section>

      </div>
    </main>
  );
}
