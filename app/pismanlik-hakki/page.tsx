import { Metadata } from 'next';
import Link from 'next/link';
import {
  Scale, CheckCircle, AlertTriangle, ArrowRight, FileText,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Pişmanlık Hakkı ve Cayma | Kapora, BK 177, Tazminat | Söylemesi Bizden',
  description:
    'Gayrimenkul satışında pişmanlık hakkı, kapora uygulaması, Borçlar Kanunu 177. madde cayma tazminatı ve hukuki süreç.',
};

const CAYMA_SENARYOLARI = [
  {
    senaryo: 'Alıcı Cayarsa',
    kapora: 'Kapora satıcıda kalır (müsadere edilir).',
    tazminat: 'Ödenen kapora tazminat niteliği taşır; ayrıca zarar talep edilmez (kapora paketi geçerliyse).',
    sure: 'Satış vaadi sözleşmesindeki cayma süresi geçerliyse o süreye kadar.',
    dayanak: 'TBK md. 177 + Sözleşme hükümleri',
  },
  {
    senaryo: 'Satıcı Cayarsa',
    kapora: 'Satıcı kaporanın 2 katını iade eder.',
    tazminat: 'Sözleşme türüne göre alıcının fiili zararı (taşınma, ekspertiz, noter masrafı) da istenebilir.',
    sure: 'Satış vaadi sözleşmesindeki süre; aksi halde makul süre.',
    dayanak: 'TBK md. 177 + Medeni Kanun + Borçlar Kanunu',
  },
  {
    senaryo: 'Ön Sözleşme Varsa',
    kapora: 'Cayma bedeli sözleşmede belirlenmişse o uygulanır.',
    tazminat: 'Cayma bedeli zarara mahsup; fazlası istenebilir (müspet zarar).',
    sure: 'Sözleşmede yazılı süre; aksi halde dürüstlük kuralı.',
    dayanak: 'TBK md. 176–178',
  },
];

const KAPORA_TURLERI = [
  {
    tur: 'Pey Akçesi (Bayana)',
    aciklama: 'Sözleşmenin kurulduğunun belgesi; alıcı cayarsa geri alınamaz, satıcı cayarsa 2 katını öder.',
    tbk: 'TBK md. 177',
    yaygin: true,
  },
  {
    tur: 'Cayma Akçesi',
    aciklama: 'Taraflardan birine sözleşmeden cayma hakkı tanır; cayma hakkı bu bedeli ödeyerek kullanılır.',
    tbk: 'TBK md. 178',
    yaygin: false,
  },
  {
    tur: 'Pişmanlık Parası',
    aciklama: 'Tüketici sözleşmelerinde (konut satışı, ön ödemeli konut) yasal olarak tanınan geri adım hakkı.',
    tbk: 'Tüketici Kanunu md. 48',
    yaygin: false,
  },
  {
    tur: 'Bağlantı Parası',
    aciklama: 'Sözleşmenin tarafları arasındaki güçlük durumlarında tazminat önceden belirlenir.',
    tbk: 'TBK md. 179',
    yaygin: false,
  },
];

const SUREC = [
  { adim: 'Cayma Beyanı', detay: 'Karşı tarafa yazılı olarak (iadeli taahhütlü mektup veya noter ihtarı) cayma iradesi bildirilir.' },
  { adim: 'Kapora İadesi Talebi', detay: 'Satıcı cayarsa alıcı kaporanın 2 katını talep eder; yazılı talep + makul süre verilir.' },
  { adim: 'Uzlaşı Girişimi', detay: 'Taraflar arabulucu aracılığıyla anlaşmayı deneyebilir (zorunlu değil).' },
  { adim: 'İcra Takibi veya Dava', detay: 'Ödeme yapılmazsa icra takibi veya Asliye Hukuk Mahkemesi\'nde alacak davası.' },
  { adim: 'Tazminat Hesabı', detay: 'Fiili zararın kapora miktarını aşması halinde aradaki fark müspet zarar olarak talep edilebilir.' },
];

const TUKETICI_HAKLARI = [
  { hak: 'Ön Ödemeli Konut Sözleşmesi', detay: 'Tüketici sözleşme tarihinden itibaren 14 gün içinde hiçbir gerekçe göstermeksizin cayabilir; cayma durumunda avans iade edilir.' },
  { hak: 'Devre Tatil / Konut Paketi', detay: '14 gün yasal cayma hakkı; bu sürede ödeme alınamaz.' },
  { hak: 'Kooperatif Üyeliği', detay: 'Üyelik sözleşmesinde belirtilen cayma süresi ve koşulları uygulanır; belirsizlik varsa TBK devreye girer.' },
  { hak: 'Banka Çekişli Tapu', detay: 'Tapu ile aynı anda anahtar tesliminde aksaklık varsa hata nedeniyle cayma veya tazminat hakları doğabilir.' },
];

export default function PismanlikHakkiPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">

      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-2 bg-[#00C49F]/20 border border-[#00C49F]/30 text-[#00C49F] text-xs font-bold px-4 py-1.5 rounded-full mb-5">
            <Scale size={13} /> Pişmanlık Hakkı ve Cayma
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
            Pişmanlık Hakkı ve Cayma
          </h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed mb-8">
            Gayrimenkul satışında kapora uygulaması, BK 177 cayma tazminatı, alıcı ve satıcı senaryoları ile hukuki süreç.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-[#00C49F]">2 Kat</p>
              <p className="text-xs text-gray-400">Satıcı cayarsa iade</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-white">TBK 177</p>
              <p className="text-xs text-gray-400">Yasal dayanak</p>
            </div>
            <div className="bg-white/10 rounded-xl px-5 py-3 text-center">
              <p className="text-2xl font-black text-amber-400">14 Gün</p>
              <p className="text-xs text-gray-400">Tüketici cayma süresi</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">

        {/* Cayma Senaryoları */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Cayma Senaryoları</h2>
          <div className="space-y-4">
            {CAYMA_SENARYOLARI.map((s, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                <p className="text-xs font-black text-gray-900 mb-3">{s.senaryo}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="bg-[#F0FDF8] rounded-lg p-2">
                    <p className="text-[10px] text-[#00C49F] font-bold mb-0.5">Kapora</p>
                    <p className="text-[10px] text-gray-600">{s.kapora}</p>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-2">
                    <p className="text-[10px] text-blue-600 font-bold mb-0.5">Tazminat</p>
                    <p className="text-[10px] text-gray-600">{s.tazminat}</p>
                  </div>
                  <div className="bg-amber-50 rounded-lg p-2">
                    <p className="text-[10px] text-amber-600 font-bold mb-0.5">Süre</p>
                    <p className="text-[10px] text-gray-600">{s.sure}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-2">
                    <p className="text-[10px] text-gray-500 font-bold mb-0.5">Dayanak</p>
                    <p className="text-[10px] text-gray-600">{s.dayanak}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Kapora Türleri */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Kapora Türleri</h2>
          <div className="space-y-3">
            {KAPORA_TURLERI.map((k, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm flex items-start gap-3">
                <div className={`text-[10px] font-black px-2 py-1 rounded-lg shrink-0 ${k.yaygin ? 'bg-[#F0FDF8] text-[#00C49F]' : 'bg-gray-100 text-gray-500'}`}>
                  {k.yaygin ? 'YAYGIN' : 'NADİR'}
                </div>
                <div>
                  <p className="text-xs font-black text-gray-900 mb-0.5">{k.tur} <span className="font-normal text-gray-400 text-[10px]">({k.tbk})</span></p>
                  <p className="text-[10px] text-gray-600 leading-relaxed">{k.aciklama}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Hukuki Süreç */}
        <section>
          <h2 className="text-xl font-black text-gray-900 mb-4">Hukuki Süreç</h2>
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

        {/* Tüketici Hakları */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4 flex items-center gap-2">
            <CheckCircle size={14} className="text-[#00C49F]" /> Tüketici Cayma Hakları
          </h2>
          <div className="space-y-3">
            {TUKETICI_HAKLARI.map((h, i) => (
              <div key={i} className="bg-[#F0FDF8] rounded-xl p-3">
                <p className="text-xs font-black text-gray-900 mb-0.5">{h.hak}</p>
                <p className="text-[10px] text-gray-600 leading-relaxed">{h.detay}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Pratik İpuçları */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-sm font-black text-gray-900 mb-4 flex items-center gap-2">
            <FileText size={14} className="text-amber-500" /> Pratik İpuçları
          </h2>
          <div className="space-y-2">
            {[
              'Kapora her zaman yazılı sözleşmeyle verilmeli; makbuz almak zorunlu değil ama ispat açısından önemli.',
              'Noterde düzenlenmiş satış vaadi sözleşmesi, tarafları koruma açısından en güvenli yöntemdir.',
              'Nakit kapora yerine banka havalesi yaparak ödeme izini bırakmak ispat kolaylığı sağlar.',
              'Cayma beyanı sözlü değil, iadeli taahhütlü mektup veya noter ihtarıyla yapılmalı.',
              'Tapu devri gerçekleşmeden önce hukuki risk her iki taraf için de devam eder.',
              'Sözleşmede "pey akçesi mi yoksa cayma akçesi mi" olduğu açıkça belirtilmeli; belirsizlik satıcı aleyhine yorumlanabilir.',
            ].map((tip, i) => (
              <div key={i} className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 mt-1.5" />
                <p className="text-xs text-gray-700 leading-relaxed">{tip}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Warning */}
        <section className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
          <AlertTriangle size={14} className="text-amber-600 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-800 leading-relaxed">
            <span className="font-black">Önemli:</span> Kapora anlaşmazlıklarında ispat yükü çok kritiktir. Mahkemede geçerli olması için yazılı sözleşme ve ödeme belgesi şarttır. Avukat desteği olmadan dava açmaktan kaçınılması önerilir.
          </p>
        </section>

        {/* Related */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-4">İlgili Rehberler</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { href: '/sozlesme-iptal', label: 'Sözleşme İptal ve Fesih' },
              { href: '/tapu-devir-sureci', label: 'Tapu Devir Süreci' },
              { href: '/kira-sozlesmesi', label: 'Kira Sözleşmesi Rehberi' },
              { href: '/taksitli-satis', label: 'Taksitli Satış Rehberi' },
              { href: '/ortak-mulkiyet', label: 'Ortak Mülkiyet Rehberi' },
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
