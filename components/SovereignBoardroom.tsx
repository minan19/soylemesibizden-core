"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Scale, Cpu, Lock, PenTool, TrendingUp, CheckCircle } from 'lucide-react';

export const SovereignBoardroom = ({ asset }: any) => {
  const [signed, setSigned] = useState(false);

  return (
    <div style={{ marginTop: '40px', padding: '60px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '24px', boxShadow: '0 50px 100px rgba(0,0,0,0.05)' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '60px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--accent-emerald)', fontWeight: '950', fontSize: '0.75rem', letterSpacing: '4px', marginBottom: '15px' }}>
            <Lock size={20} /> PRIVATE BOARDROOM SESSION
          </div>
          <h2 style={{ fontSize: '2.8rem', fontWeight: '950', letterSpacing: '-2px', color: 'var(--text-primary)' }}>Sovereign Execution Terminal</h2>
        </div>
        <div style={{ textAlign: 'right' }}>
           <div style={{ padding: '10px 20px', backgroundColor: 'var(--accent-emerald)', color: '#FFF', borderRadius: '4px', fontSize: '0.65rem', fontWeight: '950', letterSpacing: '2px' }}>SESSION ENCRYPTED</div>
           <div style={{ marginTop: '10px', fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-secondary)' }}>ID: #EXEC-2026-ALPHA</div>
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '60px' }}>
        <section>
          {/* AI Moderator & Risk Shield */}
          <div style={{ padding: '40px', backgroundColor: 'var(--bg-primary)', borderRadius: '16px', border: '1px solid var(--border-color)', marginBottom: '40px' }}>
             <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '30px' }}>
               <Cpu size={24} color="var(--accent-emerald)" />
               <h4 style={{ fontSize: '0.9rem', fontWeight: '950', letterSpacing: '1px' }}>AI BOARD MODERATOR</h4>
             </div>
             <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
               {[
                 { label: 'Hukuki Uyumluluk', status: 'Passed', icon: Scale },
                 { label: 'Finansal Arbitraj', status: 'Optimized', icon: TrendingUp },
                 { label: 'Sovereign ID Verification', status: 'Verified', icon: ShieldCheck }
               ].map((m, i) => (
                 <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', backgroundColor: 'var(--bg-secondary)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                     <m.icon size={18} color="var(--text-secondary)" />
                     <span style={{ fontSize: '0.8rem', fontWeight: '800' }}>{m.label}</span>
                   </div>
                   <span style={{ fontSize: '0.65rem', fontWeight: '950', color: 'var(--accent-emerald)' }}>{m.status.toUpperCase()}</span>
                 </div>
               ))}
             </div>
          </div>

          <div style={{ padding: '40px', border: '1px solid var(--border-color)', borderRadius: '16px' }}>
             <h3 style={{ fontSize: '0.8rem', fontWeight: '950', letterSpacing: '2px', marginBottom: '25px' }}>MUTABAKAT METNİ</h3>
             <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.8', fontWeight: '500' }}>
               Bu işlem, SÖYLEMESİ BİZDEN Egemen Protokolü uyarınca mühürlenmiştir. Alıcı ve Satıcı taraflar, istihbarat verilerinin doğruluğunu ve $$ROI {'>'} %14.2$$ projeksiyonunu kabul ederek dijital imzaya geçiş yaparlar.
             </p>
          </div>
        </section>

        <aside>
          <div style={{ padding: '50px', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '16px', textAlign: 'center' }}>
            {!signed ? (
              <>
                <PenTool size={48} color="var(--accent-emerald)" style={{ marginBottom: '30px' }} />
                <h4 style={{ fontSize: '1.2rem', fontWeight: '950', marginBottom: '15px' }}>İşlemi Mühürle</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '40px', fontWeight: '600' }}>Dijital mühür basıldıktan sonra işlem Blockchain üzerinde geri dönülemez şekilde kaydedilecektir.</p>
                <button 
                  onClick={() => setSigned(true)}
                  style={{ width: '100%', padding: '25px', backgroundColor: 'var(--text-primary)', color: 'var(--accent-emerald)', border: 'none', borderRadius: '8px', fontWeight: '950', fontSize: '0.8rem', letterSpacing: '4px', cursor: 'pointer' }}
                >
                  SOVEREIGN SIGNATURE
                </button>
              </>
            ) : (
              <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }}>
                <CheckCircle size={60} color="var(--accent-emerald)" style={{ marginBottom: '30px' }} />
                <h4 style={{ fontSize: '1.2rem', fontWeight: '950', marginBottom: '15px', color: 'var(--accent-emerald)' }}>İŞLEM MÜHÜRLENDİ</h4>
                <div style={{ fontSize: '0.7rem', fontWeight: '950', color: 'var(--text-secondary)', fontFamily: 'monospace' }}>HASH: 0x82...F9A2</div>
                <button style={{ marginTop: '40px', width: '100%', padding: '20px', background: 'none', border: '1px solid var(--border-color)', color: 'var(--text-primary)', fontWeight: '950', fontSize: '0.7rem', letterSpacing: '2px' }}>MAKBUZ VE DOSYAYI İNDİR</button>
              </motion.div>
            )}
          </div>

          <div style={{ marginTop: '30px', padding: '30px', border: '1px solid var(--border-color)', borderRadius: '12px' }}>
            <div style={{ fontSize: '0.65rem', fontWeight: '950', color: 'var(--accent-gold)', letterSpacing: '2px', marginBottom: '15px' }}>TRUST ASSURANCE</div>
            <p style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              Bu oturumdaki tüm veri akışı, siber savunma kalkanımız tarafından anlık olarak denetlenmektedir.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
};
