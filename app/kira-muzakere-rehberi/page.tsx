import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kira Müzakere Rehberi | Kiracı ve Mal Sahibi İçin | Söylemesi Bizden',
  description:
    'Kira sözleşmesinde müzakere stratejileri: kiracı ve mal sahibi için hazırlık, talepte bulunma, pazarlık taktikleri ve sözleşme maddeleri.',
};

const KIRACI_STRATEJILERI = [
  {
    baslik: 'Piyasa Araştırması Yapın',
    aciklama: 'Müzakereye girmeden önce bölgedeki benzer dairelerin kira fiyatlarını karşılaştırın. Ortalama fiyatın altında teklifle başlamak için veri toplayın.',
    ipucu: 'İlk teklifiniz talep edilen fiyatın %10-15 altında olsun.',
  },
  {
    baslik: 'Güvenilirliğinizi Kanıtlayın',
    aciklama: 'Düzenli gelir belgesi, referans mektubu veya banka hesap özeti sunmak mal sahibinde güven oluşturur ve fiyat indirimi için zemin hazırlar.',
    ipucu: 'Uzun dönem sözleşme teklif edin (2 yıl) — mal sahipleri istikrar ister.',
  },
  {
    baslik: 'Nakit veya Peşin Teklif Edin',
    aciklama: '3-6 aylık kira peşin ödeme teklifi mal sahibinin vazgeçemeyeceği bir avantaj sunar. Bu karşılığında %5-10 indirim talep edilebilir.',
    ipucu: 'Peşin ödeme + uzun kontrat + referans = en güçlü müzakere paketi.',
  },
  {
    baslik: 'Eksiklikleri Belirtin',
    aciklama: 'Dairenin fiziksel eksiklikleri, onarım gerektiren yerleri veya eski donanımları gerekçe göstererek indirim talep edebilirsiniz.',
    ipucu: 'Onarım maliyetini belirleyin ve tutarı kiradan düşme teklifi yapın.',
  },
  {
    baslik: 'Zamanlama Avantajı Kullanın',
    aciklama: 'Uzun süredir boş kalan daireler için mal sahibinin kayıp geliri hesaplayın. Her boş ay sizin için avantaj.',
    ipucu: 'Eylül-Şubat dönemi kış mevsiminde talep düşer, pazarlık gücü artar.',
  },
];

const MAL_SAHIBI_STRATEJILERI = [
  {
    baslik: 'Kiracı Profilini İnceleyin',
    aciklama: 'Gelir belgesi, kefil, sigorta ve referanslar iyi kiracıyı tanımlar. Fiyat indirimi yerine bu güvenceleri isteyebilirsiniz.',
    ipucu: 'Gelir kira × 4 katından fazla olan kiracılar tercih edilir.',
  },
  {
    baslik: 'Piyasa Fiyatını Bilin',
    aciklama: 'Talep ettiğiniz fiyat piyasa üzerindeyse boşluk uzar ve toplam kayıp artar. Gerçekçi fiyat belirleyin.',
    ipucu: 'Boş geçen her ay yıllık getirinizi düşürür.',
  },
  {
    baslik: 'Artış Oranını Netleştirin',
    aciklama: 'Sözleşmede yıllık artış oranını (TÜFE, sabit yüzde veya tarafların mutabakatı) baştan belirtin. Belirsizlik ilerleyen yıllarda anlaşmazlık yaratır.',
    ipucu: 'TÜİK TÜFE bağlantılı artış her iki taraf için şeffaftır.',
  },
  {
    baslik: 'Depozito ve Kefil Şartı',
    aciklama: '2-3 aylık kira tutarında depozito almak, sözleşme ihlallerinde güvence sağlar. Kefil kira güvencesini artırır.',
    ipucu: 'Depozito mevduat veya bloke hesapta tutulabilir.',
  },
];

const SOZLESME_MADDELERI = [
  { madde: 'Kira Artış Oranı', aciklama: 'TÜFE, sabit yüzde veya piyasa koşulları — baştan netleştirilmeli', kritik: true },
  { madde: 'Depozito Tutarı ve İadesi', aciklama: 'Miktar, hangi koşulda iade edileceği ve süre', kritik: true },
  { madde: 'Tadilat ve Onarım Sorumlulukları', aciklama: 'Kim, neyi, ne kadar sürede tamir edecek', kritik: true },
  { madde: 'Kira Ödeme Günü', aciklama: 'Ay başı mı, belirli bir gün mü — gecikme cezası var mı', kritik: false },
  { madde: 'Erken Tahliye Koşulları', aciklama: 'Hangi süre önceden bildirim, ceza var mı', kritik: true },
  { madde: 'Alt Kiralama Yasağı', aciklama: 'Kiracının başkasına alt kira vermesi yasak mı', kritik: false },
  { madde: 'Evcil Hayvan', aciklama: 'İzin var mı, hangi koşullar', kritik: false },
  { madde: 'Aidat Kimin Yükümlülüğü', aciklama: 'Aidatı kiracı mı mal sahibi mi ödeyecek', kritik: true },
];

const PRATIK_IPUCLARI = [
  { baslik: 'Sözlü Anlaşma Yetmez', aciklama: 'Her taahhüt yazılı sözleşmeye yansıtılmalıdır. Sözlü mutabakat hukuki koruma sağlamaz.' },
  { baslik: 'Piyasa Karşılaştırması', aciklama: 'Müzakere öncesi benzer 3-5 ilan incelemek güçlü veri tabanı oluşturur.' },
  { baslik: 'Acele Karar Vermeyin', aciklama: 'Mal sahibi baskı yaparsa "düşünme süresi" talep etmek sizi korur.' },
  { baslik: 'Tapu Kontrolü', aciklama: 'Kiracı olarak, kiraya verenin mülkün gerçek sahibi olduğunu tapudan doğrulamak hakkınızdır.' },
];

export default function KiraMuzakereRehberiPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-14">
          <p className="text-[#00C49F] text-xs font-bold mb-3 uppercase tracking-widest">Kiracı & Mal Sahibi</p>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">Kira Müzakere Rehberi</h1>
          <p className="text-gray-300 text-sm max-w-xl leading-relaxed">
            Kira sözleşmesi müzakerelerinde her iki taraf için pratik stratejiler, sözleşme maddeleri ve pazarlık taktikleri.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-10 space-y-10">

        {/* Kiracı Stratejileri */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-base font-black text-gray-900 mb-1">Kiracı İçin Müzakere Stratejileri</h2>
          <p className="text-xs text-gray-400 mb-5">Daha iyi kira koşulları elde etmek için kanıtlanmış yöntemler.</p>
          <div className="space-y-4">
            {KIRACI_STRATEJILERI.map((s, i) => (
              <div key={i} className="border border-gray-100 rounded-xl p-4">
                <p className="text-xs font-black text-gray-900 mb-1">{s.baslik}</p>
                <p className="text-[11px] text-gray-500 leading-relaxed mb-2">{s.aciklama}</p>
                <div className="bg-[#00C49F]/10 rounded-lg px-3 py-2">
                  <p className="text-[10px] font-black text-[#00C49F]">💡 {s.ipucu}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mal Sahibi Stratejileri */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-base font-black text-gray-900 mb-1">Mal Sahibi İçin Müzakere Stratejileri</h2>
          <p className="text-xs text-gray-400 mb-5">Güvenilir kiracı bulurken fiyat ve koşulları koruma yöntemleri.</p>
          <div className="space-y-4">
            {MAL_SAHIBI_STRATEJILERI.map((s, i) => (
              <div key={i} className="border border-gray-100 rounded-xl p-4">
                <p className="text-xs font-black text-gray-900 mb-1">{s.baslik}</p>
                <p className="text-[11px] text-gray-500 leading-relaxed mb-2">{s.aciklama}</p>
                <div className="bg-blue-50 rounded-lg px-3 py-2">
                  <p className="text-[10px] font-black text-blue-600">💡 {s.ipucu}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sözleşme Maddeleri */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm overflow-x-auto">
          <h2 className="text-base font-black text-gray-900 mb-1">Kritik Sözleşme Maddeleri</h2>
          <p className="text-xs text-gray-400 mb-5">Müzakerede mutlaka netleştirilmesi gereken konular.</p>
          <table className="w-full text-[10px] min-w-[400px]">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-2 font-black text-gray-500">Madde</th>
                <th className="text-left py-2 font-black text-gray-500">Açıklama</th>
                <th className="text-right py-2 font-black text-[#00C49F]">Kritik</th>
              </tr>
            </thead>
            <tbody>
              {SOZLESME_MADDELERI.map((m, i) => (
                <tr key={i} className="border-b border-gray-50 last:border-0">
                  <td className="py-2 font-black text-gray-900 w-36">{m.madde}</td>
                  <td className="py-2 font-bold text-gray-500">{m.aciklama}</td>
                  <td className="py-2 text-right">
                    {m.kritik ? (
                      <span className="text-[9px] font-black text-rose-500 bg-rose-50 px-1.5 py-0.5 rounded">Kritik</span>
                    ) : (
                      <span className="text-[9px] font-black text-gray-400 bg-gray-50 px-1.5 py-0.5 rounded">İsteğe Bağlı</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pratik İpuçları */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="text-base font-black text-gray-900 mb-4">Genel Pratik İpuçları</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {PRATIK_IPUCLARI.map((p, i) => (
              <div key={i} className="border border-gray-100 rounded-xl p-4">
                <p className="text-xs font-black text-gray-900 mb-1">{p.baslik}</p>
                <p className="text-[11px] text-gray-500 leading-relaxed">{p.aciklama}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-5">
          <p className="text-xs font-black text-emerald-700 mb-2">Hukuki Dayanak</p>
          <p className="text-[11px] text-emerald-600 leading-relaxed">
            Kira sözleşmeleri Türk Borçlar Kanunu (TBK) md. 299-378 kapsamında düzenlenir. TBK md. 344 uyarınca taraflar yıllık artış oranını serbestçe belirleyebilir ancak bu oran belirlenen dönemler için TÜFE&apos;yi aşamaz (konut kirası için). Sözleşme yokluğunda TTK hükümleri uygulanır.
          </p>
        </div>

      </div>
    </main>
  );
}
