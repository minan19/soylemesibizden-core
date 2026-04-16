"use client";
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Link as LinkIcon, Share2, MessageCircle, QrCode, ExternalLink } from 'lucide-react';

interface ShareProps {
  isOpen: boolean;
  onClose: () => void;
  assetTitle: string;
}

export const AssetShareModal = ({ isOpen, onClose, assetTitle }: ShareProps) => {
  if (!isOpen) return null;

  const shareActions = [
    { name: 'WhatsApp', icon: MessageCircle, color: '#25D366' },
    { name: 'LinkedIn', icon: ExternalLink, color: '#0077B5' },
    { name: 'X', icon: Share2, color: '#000' },
    { name: 'QR Code', icon: QrCode, color: 'var(--accent-emerald)' },
    { name: 'Bağlantıyı Kopyala', icon: LinkIcon, color: '#666' }
  ];

  return (
    <AnimatePresence>
      <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(10px)' }}>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          style={{ width: '100%', maxWidth: '480px', backgroundColor: '#FFF', padding: '50px', borderRadius: '32px', border: '1px solid var(--border-color)', boxShadow: '0 40px 100px rgba(0,0,0,0.1)', position: 'relative' }}
        >
          <button onClick={onClose} style={{ position: 'absolute', top: '30px', right: '30px', border: 'none', backgroundColor: 'transparent', cursor: 'pointer', color: '#999' }}>
            <X size={24} />
          </button>

          <header style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div style={{ display: 'inline-flex', padding: '15px', backgroundColor: 'rgba(26,188,156,0.05)', borderRadius: '20px', marginBottom: '20px' }}>
              <Share2 size={32} color="var(--accent-emerald)" />
            </div>
            <h3 style={{ fontSize: '1.8rem', fontWeight: '950', letterSpacing: '-1.5px', marginBottom: '10px' }}>Varlığı Paylaş</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: '600' }}>{assetTitle} istihbaratını güvenle dağıtın.</p>
          </header>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
            {shareActions.map((action, i) => (
              <motion.button
                key={i}
                whileHover={{ y: -5 }}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', padding: '20px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '20px', cursor: 'pointer' }}
              >
                <action.icon size={24} color={action.color} />
                <span style={{ fontSize: '0.6rem', fontWeight: '950', letterSpacing: '0.5px' }}>{action.name.toUpperCase()}</span>
              </motion.button>
            ))}
          </div>

          <div style={{ marginTop: '40px', textAlign: 'center' }}>
            <p style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', fontWeight: '600' }}>
              {"Paylaşım Protokolü: $$ P_{share} = \\text{Asset}_{id} \\oplus \\text{Encrypted}_{link} $$ mühürlenmiştir."}
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
