"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, ShieldCheck, Target } from 'lucide-react';

export const GlobalSearch = ({ onSearch }: any) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 1000 }}>
      <motion.div 
        animate={{ width: isExpanded ? '100%' : '100%' }}
        style={{ backgroundColor: '#FFF', border: '2px solid #0A0A0A', borderRadius: '4px', padding: '10px 30px', display: 'flex', alignItems: 'center', gap: '20px', boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }}
      >
        <Search size={24} color="#1ABC9C" />
        <input 
          onFocus={() => setIsExpanded(true)}
          type="text" 
          placeholder="Lokasyon, Varlık Tipi veya Yatırım Hedefi Giriniz..."
          style={{ flex: 1, border: 'none', outline: 'none', fontSize: '1.1rem', fontWeight: '600', color: '#0A0A0A', padding: '15px 0' }}
        />
        <div style={{ display: 'flex', gap: '15px', borderLeft: '1px solid #EEE', paddingLeft: '20px' }}>
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', color: '#666', fontSize: '0.75rem', fontWeight: '900' }}>
            <SlidersHorizontal size={18} /> FİLTRELER
          </button>
          <button style={{ backgroundColor: '#0A0A0A', color: '#1ABC9C', border: 'none', padding: '12px 25px', fontWeight: '950', fontSize: '0.75rem', letterSpacing: '2px', cursor: 'pointer', borderRadius: '2px' }}>
            KEŞFET
          </button>
        </div>
      </motion.div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            style={{ position: 'absolute', top: '110%', left: 0, right: 0, backgroundColor: '#FFF', border: '1px solid #EEE', padding: '30px', borderRadius: '8px', boxShadow: '0 30px 60px rgba(0,0,0,0.1)' }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px' }}>
              <div>
                <h4 style={{ fontSize: '0.65rem', fontWeight: '950', letterSpacing: '2px', color: '#AAA', marginBottom: '15px' }}>PAZAR KATMANI</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {['Signature Market', 'Verified Market', 'Private Market'].map(item => (
                    <label key={item} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem', fontWeight: '700', cursor: 'pointer' }}>
                      <input type="checkbox" style={{ accentColor: '#1ABC9C' }} /> {item}
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <h4 style={{ fontSize: '0.65rem', fontWeight: '950', letterSpacing: '2px', color: '#AAA', marginBottom: '15px' }}>YAŞAM TARZI</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {['Ultra Sessiz', 'Yüksek Mahremiyet', 'Deniz Değeri'].map(item => (
                    <label key={item} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem', fontWeight: '700', cursor: 'pointer' }}>
                      <input type="checkbox" style={{ accentColor: '#1ABC9C' }} /> {item}
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <h4 style={{ fontSize: '0.65rem', fontWeight: '950', letterSpacing: '2px', color: '#AAA', marginBottom: '15px' }}>HIZLI ERİŞİM</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  <button onClick={() => setIsExpanded(false)} style={{ background: '#F5F5F5', border: 'none', padding: '8px 15px', fontSize: '0.7rem', fontWeight: '800', cursor: 'pointer' }}>KAPAT</button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
