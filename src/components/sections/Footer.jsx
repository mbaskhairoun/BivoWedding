import React from 'react';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer
      style={{
        padding: 'clamp(4rem, 10vh, 7rem) 1.5rem clamp(2.5rem, 6vh, 4rem)',
        background: 'var(--paper)',
        textAlign: 'center',
        borderTop: '1px solid var(--border)',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.4rem' }}
      >
        <div
          style={{
            fontFamily: "'Great Vibes', cursive",
            fontStyle: 'normal',
            fontSize: 'clamp(2.2rem, 5vw, 3.4rem)',
            color: 'var(--sage-dark)',
            lineHeight: 1,
            letterSpacing: '-0.02em',
          }}
        >
          B <span style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '0.55em', color: 'var(--gold)' }}>&amp;</span> V
        </div>

        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            fontSize: 'clamp(0.78rem, 1.3vw, 0.92rem)',
            letterSpacing: '0.42em',
            textTransform: 'uppercase',
            color: 'var(--muted)',
          }}
        >
          30 · 08 · 2026 &middot; Vaughan
        </p>

        <p
          style={{
            marginTop: '0.5rem',
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            fontSize: '0.82rem',
            color: 'var(--muted)',
            opacity: 0.6,
            letterSpacing: '0.08em',
          }}
        >
          Made with love for Bino &amp; Vivo
        </p>
      </motion.div>
    </footer>
  );
}
