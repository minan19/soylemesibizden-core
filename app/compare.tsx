import React from 'react';

export default function CompareEngine() {
  const accent = "#D4AF37"; // Hassasiyet Altını

  return (
    <div style={{ marginTop: '80px', padding: '40px', backgroundColor: '#fff', border: '1px solid #e0e0e0' }}>
      <h3 style={{ fontSize: '1.5rem', marginBottom: '30px', letterSpacing: '-1px' }}>
        <span style={{ color: accent }}>|</span> SÖYLEMESİ BİZDEN KARŞILAŞTIRMA MASASI
      </h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2px', backgroundColor: '#e0e0e0' }}>
        
        {/* Karşılaştırma Kolonu 1 */}
        <div style={{ backgroundColor: '#fff', padding: '20px' }}>
          <div style={{ fontWeight: '900' }}>Bebek Signature Yalı</div>
          <div style={{ fontSize: '2rem', margin: '20px 0' }}>%92.1 <small style={{fontSize: '0.8rem'}}>IQ</small></div>
          <div style={{ fontSize: '0.9rem', opacity: 0.7 }}>Bölge Amortisman: 16 Yıl</div>
          <div style={{ marginTop: '15px', color: 'green' }}>● En İyi Yatırım Skoru</div>
        </div>

        {/* Karşılaştırma Kolonu 2 */}
        <div style={{ backgroundColor: '#fff', padding: '20px' }}>
          <div style={{ fontWeight: '900' }}>Yeniköy Tarihi Köşk</div>
          <div style={{ fontSize: '2rem', margin: '20px 0' }}>%88.4 <small style={{fontSize: '0.8rem'}}>IQ</small></div>
          <div style={{ fontSize: '0.9rem', opacity: 0.7 }}>Bölge Amortisman: 22 Yıl</div>
          <div style={{ marginTop: '15px', color: accent }}>● En Yüksek Mahremiyet</div>
        </div>

      </div>
    </div>
  );
}
