import { Cormorant_Garamond, Inter, JetBrains_Mono, Montserrat } from 'next/font/google';

const cormorant = Cormorant_Garamond({ subsets: ['latin'], weight: ['300', '400', '600', '700'], style: ['normal', 'italic'] });
const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });
const jetbrains = JetBrains_Mono({ subsets: ['latin'], weight: ['400', '600'] });
const montserrat = Montserrat({ subsets: ['latin'], weight: ['700', '800', '900'] });

export default function TypographyPreviewPage() {
  return (
    <div style={{ background: '#F8FAFC', minHeight: '100vh', padding: '60px 40px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ marginBottom: 60 }}>
          <p className={montserrat.className} style={{ fontSize: 9, fontWeight: 800, letterSpacing: 5, textTransform: 'uppercase', color: '#00C49F', marginBottom: 12 }}>
            Tipografi Önizleme — Söylemesi Bizden
          </p>
          <p className={inter.className} style={{ fontSize: 14, color: '#94A3B8' }}>
            Onay vermeden önce iki stili karşılaştırın.
          </p>
        </div>

        {/* Comparison */}
        <p className={montserrat.className} style={{ fontSize: 9, fontWeight: 800, letterSpacing: 4, textTransform: 'uppercase', color: '#00C49F', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 12 }}>
          Karşılaştırma
          <span style={{ flex: 1, height: 1, background: '#E2E8F0', display: 'inline-block' }} />
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 72 }}>

          {/* OLD */}
          <div style={{ background: 'white', borderRadius: 24, border: '1px solid #E2E8F0', padding: 40, boxShadow: '0 8px 30px rgba(0,0,0,0.04)' }}>
            <span className={montserrat.className} style={{ fontSize: 9, fontWeight: 800, letterSpacing: 3, textTransform: 'uppercase', background: '#F1F5F9', color: '#94A3B8', padding: '6px 14px', borderRadius: 100, display: 'inline-block', marginBottom: 32 }}>
              Mevcut — Sadece Montserrat
            </span>
            <h1 className={montserrat.className} style={{ fontSize: 36, fontWeight: 900, letterSpacing: -1, marginBottom: 6 }}>Çanakkale Stratejik Tarla</h1>
            <h2 className={montserrat.className} style={{ fontSize: 18, fontWeight: 700, color: '#64748B', marginBottom: 16 }}>Ayvacık, Çanakkale</h2>
            <p className={montserrat.className} style={{ fontSize: 13, fontWeight: 400, lineHeight: 1.7, color: '#64748B', marginBottom: 20 }}>
              14.500 m² denize sıfır parsel. Sovereign protokol güvencesi altında yüksek ROI projeksiyonu.
            </p>
            <hr style={{ border: 'none', borderTop: '1px solid #E2E8F0', margin: '20px 0' }} />
            <p className={montserrat.className} style={{ fontSize: 28, fontWeight: 900, color: '#0F172A' }}>₺ 8.500.000</p>
            <p className={montserrat.className} style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: '#64748B', marginTop: 6 }}>%14.2 Yıllık ROI</p>
          </div>

          {/* NEW */}
          <div style={{ background: 'white', borderRadius: 24, border: '1px solid rgba(0,196,159,0.2)', padding: 40, boxShadow: '0 8px 30px rgba(0,196,159,0.08)' }}>
            <span className={montserrat.className} style={{ fontSize: 9, fontWeight: 800, letterSpacing: 3, textTransform: 'uppercase', background: '#F0FDF8', color: '#00C49F', padding: '6px 14px', borderRadius: 100, display: 'inline-block', marginBottom: 32 }}>
              Önerilen — 3 Katmanlı Sistem
            </span>
            <h1 className={cormorant.className} style={{ fontSize: 52, fontWeight: 600, letterSpacing: -2, lineHeight: 1.0, marginBottom: 6 }}>Çanakkale<br />Stratejik Tarla</h1>
            <h2 className={cormorant.className} style={{ fontSize: 24, fontWeight: 300, fontStyle: 'italic', color: '#64748B', marginBottom: 16 }}>Ayvacık, Çanakkale</h2>
            <p className={inter.className} style={{ fontSize: 14, lineHeight: 1.75, color: '#64748B', marginBottom: 20 }}>
              14.500 m² denize sıfır parsel. Sovereign protokol güvencesi altında yüksek ROI projeksiyonu.
            </p>
            <hr style={{ border: 'none', borderTop: '1px solid #E2E8F0', margin: '20px 0' }} />
            <p className={jetbrains.className} style={{ fontSize: 32, fontWeight: 600, color: '#0F172A', letterSpacing: -1 }}>₺ 8.500.000</p>
            <p className={montserrat.className} style={{ fontSize: 9, fontWeight: 800, letterSpacing: 3, textTransform: 'uppercase', color: '#00C49F', marginTop: 6 }}>%14.2 Yıllık ROI</p>
          </div>
        </div>

        {/* Full Card */}
        <p className={montserrat.className} style={{ fontSize: 9, fontWeight: 800, letterSpacing: 4, textTransform: 'uppercase', color: '#00C49F', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 12 }}>
          Tam Kart Önizlemesi
          <span style={{ flex: 1, height: 1, background: '#E2E8F0', display: 'inline-block' }} />
        </p>

        <div style={{ background: 'white', borderRadius: 32, border: '1px solid #E2E8F0', padding: 48, maxWidth: 680, boxShadow: '0 20px 60px rgba(0,0,0,0.06)', marginBottom: 72 }}>
          <p className={montserrat.className} style={{ fontSize: 9, fontWeight: 800, letterSpacing: 4, textTransform: 'uppercase', color: '#00C49F', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#00C49F', display: 'inline-block' }} />
            Elite Listing — Aktif
          </p>
          <h1 className={cormorant.className} style={{ fontSize: 58, fontWeight: 600, letterSpacing: -2, lineHeight: 1.0, marginBottom: 8 }}>Çanakkale<br />Stratejik Tarla</h1>
          <p className={cormorant.className} style={{ fontSize: 22, fontWeight: 300, fontStyle: 'italic', color: '#64748B', marginBottom: 28 }}>Ayvacık, Çanakkale — 14.500 m²</p>
          <p className={inter.className} style={{ fontSize: 14, lineHeight: 1.8, color: '#64748B', maxWidth: 500, marginBottom: 32 }}>
            Denize sıfır, stratejik konumlu tarım ve yatırım parseli. Sovereign İstihbarat Ağı tarafından doğrulanmış, holding portföyüne entegre edilmeye hazır premium varlık.
          </p>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16, marginBottom: 32 }}>
            <p className={jetbrains.className} style={{ fontSize: 44, fontWeight: 600, color: '#0F172A', letterSpacing: -1, lineHeight: 1 }}>₺ 8.500.000</p>
            <div>
              <p className={inter.className} style={{ fontSize: 13, fontWeight: 600, color: '#00C49F', marginBottom: 2 }}>↑ %14.2 Yıllık ROI</p>
              <p className={inter.className} style={{ fontSize: 12, color: '#94A3B8' }}>5 yıl projeksiyonu</p>
            </div>
          </div>
          <button className={montserrat.className} style={{ background: '#0F172A', color: 'white', padding: '16px 28px', borderRadius: 100, fontSize: 11, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', border: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 10 }}>
            Akıllı Kontrat ile Al →
          </button>
        </div>

        {/* Font Guide */}
        <p className={montserrat.className} style={{ fontSize: 9, fontWeight: 800, letterSpacing: 4, textTransform: 'uppercase', color: '#00C49F', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 12 }}>
          Font Rehberi
          <span style={{ flex: 1, height: 1, background: '#E2E8F0', display: 'inline-block' }} />
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginBottom: 48 }}>
          <div style={{ background: 'white', borderRadius: 20, border: '1px solid #E2E8F0', padding: 28 }}>
            <p className={montserrat.className} style={{ fontSize: 9, fontWeight: 800, letterSpacing: 3, textTransform: 'uppercase', color: '#94A3B8', marginBottom: 16 }}>Display — Başlıklar</p>
            <p className={cormorant.className} style={{ fontSize: 38, fontWeight: 600, lineHeight: 1.1 }}>Cormorant<br />Garamond</p>
            <p className={inter.className} style={{ fontSize: 12, color: '#94A3B8', marginTop: 12 }}>Hero başlıklar, ilan adları</p>
          </div>
          <div style={{ background: 'white', borderRadius: 20, border: '1px solid #E2E8F0', padding: 28 }}>
            <p className={montserrat.className} style={{ fontSize: 9, fontWeight: 800, letterSpacing: 3, textTransform: 'uppercase', color: '#94A3B8', marginBottom: 16 }}>UI & Body — Arayüz</p>
            <p className={inter.className} style={{ fontSize: 20, lineHeight: 1.6, color: '#64748B' }}>Inter ile yazılan metin açık, okunabilir ve kurumsal hissettiriyor.</p>
            <p className={inter.className} style={{ fontSize: 12, color: '#94A3B8', marginTop: 12 }}>Paragraflar, formlar, navigasyon</p>
          </div>
          <div style={{ background: 'white', borderRadius: 20, border: '1px solid #E2E8F0', padding: 28 }}>
            <p className={montserrat.className} style={{ fontSize: 9, fontWeight: 800, letterSpacing: 3, textTransform: 'uppercase', color: '#94A3B8', marginBottom: 16 }}>Mono — Sayılar & Veri</p>
            <p className={jetbrains.className} style={{ fontSize: 28, fontWeight: 600, lineHeight: 1.3 }}>₺ 8.500.000<br />ID: AX-2941</p>
            <p className={inter.className} style={{ fontSize: 12, color: '#94A3B8', marginTop: 12 }}>Fiyatlar, ID'ler, koordinatlar</p>
          </div>
        </div>

        <p className={inter.className} style={{ textAlign: 'center', fontSize: 12, color: '#94A3B8' }}>
          Montserrat → yalnızca uppercase etiketler için korunur (MASTER TERMINAL, SOVEREIGN VERIFIED vb.)
        </p>

      </div>
    </div>
  );
}
