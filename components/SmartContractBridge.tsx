"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, ShieldCheck, Zap, Code2, ArrowRightCircle, Layers } from 'lucide-react';

export const SmartContractBridge = () => {
  const steps = [
    { label: 'DEPOSIT VERIFICATION', status: 'COMPLETED', color: 'var(--accent-emerald)' },
    { label: 'REGISTRY VALIDATION', status: 'IN_PROGRESS', color: 'var(--accent-emerald)' },
    { label: 'DEED TRANSFER LOGIC', status: 'PENDING', color: '#CCC' }
  ];

  return (
    <div style={{ padding: '40px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '32px', position: 'relative' }}>
      <header style={{ marginBottom: '35px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--accent-emerald)', fontWeight: '950', fontSize: '0.7rem', letterSpacing: '3px' }}>
            <Code2 size={18} /> SMART CONTRACT BRIDGE
          </div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '950', marginTop: '10px' }}>Otonom İşlem Katmanı</h3>
        </div>
        <div style={{ padding: '10px 20px', backgroundColor: '#FFF', borderRadius: '50px', border: '1px solid var(--border-color)', color: 'var(--text-primary)', fontSize: '0.65rem', fontWeight: '950' }}>
          v4.2 STABLE
        </div>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '35px' }}>
        {steps.map((step, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '12px', backgroundColor: '#FFF', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {step.status === 'COMPLETED' ? <ShieldCheck size={20} color="var(--accent-emerald)" /> : <Layers size={20} color={step.color} />}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '0.6rem', fontWeight: '950', color: 'var(--text-secondary)', letterSpacing: '1px' }}>{step.label}</div>
              <div style={{ fontSize: '0.8rem', fontWeight: '900', color: step.status === 'PENDING' ? '#BBB' : 'var(--text-primary)' }}>{step.status}</div>
            </div>
            {step.status === 'IN_PROGRESS' && (
              <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                <Zap size={16} color="var(--accent-emerald)" />
              </motion.div>
            )}
          </div>
        ))}
      </div>

      <div style={{ padding: '20px', backgroundColor: 'rgba(26,188,156,0.05)', borderRadius: '15px', border: '1px dashed var(--accent-emerald)', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', fontWeight: '600', margin: 0 }}>
          Sözleşme yürütme mantığı "Sovereign Node" üzerinde mühürlenmiştir.
        </p>
      </div>

      <div style={{ marginTop: '25px', textAlign: 'center' }}>
        <p style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', fontWeight: '600' }}>
          {"Yürütme Mantığı: $$ X_{smart} = \\mathbb{1}(\\text{Deposit} \\geq \\tau) \\cap \\mathbb{1}(\\text{Registry} = \\text{Verified}) $$ mühürlenmiştir."}
        </p>
      </div>
    </div>
  );
};
