"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Zap, Globe2, ArrowRightLeft, Activity, ShieldCheck, Network } from 'lucide-react';

export const EcosystemNexus = () => {
  const ecosystemNodes = [
    { 
      id: 'NODE_ALPHA', 
      name: 'SÖYLEMESİ BİZDEN', 
      role: 'KÜRESEL VARLIK & YATIRIM', 
      status: 'MASTER_ACTIVE', 
      icon: Building2, 
      color: 'var(--text-primary)',
      bg: 'var(--bg-secondary)'
    },
    { 
      id: 'NODE_BETA', 
      name: 'ECONIQ', 
      role: 'ENERJİ & KARBON İSTİHBARATI', 
      status: 'SYNCING_DATA', 
      icon: Zap, 
      color: 'var(--accent-emerald)',
      bg: 'rgba(26,188,156,0.05)'
    },
    { 
      id: 'NODE_GAMMA', 
      name: 'ATLASIO', 
      role: 'SİBER İSTİHBARAT & EĞİTİM', 
      status: 'ENCRYPTED_LINK', 
      icon: Globe2, 
      color: '#3B82F6', // Atlasio için güven veren bir siber mavi
      bg: 'rgba(59,130,246,0.05)'
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
      
      {/* Nexus Header */}
      <div style={{ padding: '40px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '32px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', right: '-20px', top: '-20px', opacity: 0.05, transform: 'scale(1.5)' }}>
          <Network size={200} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--accent-emerald)', fontWeight: '950', fontSize: '0.75rem', letterSpacing: '3px', marginBottom: '15px' }}>
          <Network size={18} /> MACRO-ARCHITECTURE
        </div>
        <h2 style={{ fontSize: '2.5rem', fontWeight: '950', letterSpacing: '-1.5px', marginBottom: '10px' }}>Egemen Ekosistem Köprüsü</h2>
        <p style={{ color: 'var(--text-secondary)', fontWeight: '600', maxWidth: '600px' }}>
          Farklı disiplinlerdeki küresel projelerinizi tek bir sinir ağı üzerinden birbirine bağlayın. Varlıklar, enerji verileri ve insan kaynağı senkronize.
        </p>
      </div>

      {/* Ecosystem Nodes Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px' }}>
        {ecosystemNodes.map((node, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
            style={{ padding: '40px', backgroundColor: '#FFF', borderRadius: '32px', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', position: 'relative' }}
          >
            <div style={{ padding: '15px', backgroundColor: node.bg, borderRadius: '20px', width: 'fit-content', marginBottom: '25px' }}>
              <node.icon size={32} color={node.color} />
            </div>
            
            <div style={{ fontSize: '0.65rem', fontWeight: '950', color: 'var(--text-secondary)', letterSpacing: '2px', marginBottom: '5px' }}>
              {node.id}
            </div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '950', letterSpacing: '-1px', marginBottom: '10px', color: 'var(--text-primary)' }}>
              {node.name}
            </h3>
            <p style={{ fontSize: '0.8rem', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '30px', flex: 1 }}>
              {node.role}
            </p>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '20px', borderTop: '1px solid var(--border-color)' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: '950', color: node.color }}>{node.status}</span>
              <Activity size={16} color={node.color} />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Synergy Matrix Analytics */}
      <div style={{ padding: '30px', backgroundColor: 'var(--text-primary)', color: '#FFF', borderRadius: '32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ padding: '15px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '50%' }}>
            <ArrowRightLeft size={24} color="#FFF" />
          </div>
          <div>
            <div style={{ fontSize: '1.2rem', fontWeight: '950', letterSpacing: '-0.5px' }}>INTER-NODE DATA STREAM: ACTIVE</div>
            <div style={{ fontSize: '0.75rem', fontWeight: '600', opacity: 0.8, marginTop: '5px' }}>Söylemesi Bizden portföyündeki varlıklar, ECONIQ enerji motoruna entegre ediliyor.</div>
          </div>
        </div>
        <ShieldCheck size={32} color="var(--accent-emerald)" />
      </div>

      {/* Matematiksel Vizyon */}
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', fontWeight: '600' }}>
          {"Ekosistem Sinerjisi: $$ \\Sigma_{ecosystem} = \\int (\\text{Assets} \\otimes \\text{Energy}_{carbon} \\otimes \\text{Cyber}_{intel}) \\, dt \\equiv \\text{Absolute}_{power} $$ mühürlenmiştir."}
        </p>
      </div>

    </div>
  );
};
