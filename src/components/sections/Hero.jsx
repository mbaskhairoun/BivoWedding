import React from 'react';
import { motion } from 'framer-motion';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

function Monogram() {
  return (
    <motion.img
      src="/bv-logo.webp"
      alt="Bino & Vivo monogram"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
      style={{
        width: 'clamp(200px, 22vw, 280px)',
        height: 'auto',
        display: 'block',
      }}
    />
  );
}

export default function Hero() {
  return (
    <section
      id="home"
      style={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(5rem, 10vh, 7rem) 1.5rem 4rem',
        background: 'var(--ivory)',
      }}
    >
      <div style={{ textAlign: 'center', maxWidth: '720px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Monogram />

        <motion.p
          {...fadeUp}
          transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
          style={{
            marginTop: 'clamp(2.5rem, 5vh, 3.5rem)',
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            fontWeight: 400,
            fontSize: 'clamp(0.78rem, 1.4vw, 0.95rem)',
            letterSpacing: '0.42em',
            textTransform: 'uppercase',
            color: 'var(--muted)',
          }}
        >
          You are cordially invited
        </motion.p>

        <motion.h1
          {...fadeUp}
          transition={{ duration: 1.2, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
          style={{
            marginTop: '1.4rem',
            fontFamily: "'Pinyon Script', cursive",
            fontWeight: 400,
            fontStyle: 'normal',
            fontSize: 'clamp(3.5rem, 9vw, 6.5rem)',
            lineHeight: 1.05,
            color: 'var(--forest)',
            letterSpacing: '-0.005em',
          }}
        >
          Bino &amp; Vivo
        </motion.h1>

        <motion.div
          {...fadeUp}
          transition={{ duration: 1, delay: 1.05, ease: 'easeOut' }}
          style={{ marginTop: '1.8rem', display: 'flex', alignItems: 'center', gap: '1.2rem' }}
        >
          <Flourish />
          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: 'italic',
              fontWeight: 400,
              fontSize: 'clamp(0.85rem, 1.5vw, 1.05rem)',
              letterSpacing: '0.32em',
              textTransform: 'uppercase',
              color: 'var(--sage-dark)',
              whiteSpace: 'nowrap',
            }}
          >
            30 · 08 · 2026
          </p>
          <Flourish flip />
        </motion.div>

        <motion.p
          {...fadeUp}
          transition={{ duration: 1, delay: 1.25, ease: 'easeOut' }}
          style={{
            marginTop: '0.9rem',
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            fontWeight: 400,
            fontSize: 'clamp(0.85rem, 1.4vw, 1rem)',
            color: 'var(--muted)',
            letterSpacing: '0.06em',
          }}
        >
          Oakville &middot; Vaughan
        </motion.p>
      </div>
    </section>
  );
}

function Flourish({ flip = false }) {
  return (
    <svg
      width="64"
      height="10"
      viewBox="0 0 64 10"
      fill="none"
      style={{ transform: flip ? 'scaleX(-1)' : 'none', flex: 'none' }}
      aria-hidden="true"
    >
      <path
        d="M2 5 Q 14 1 28 5 T 54 5"
        stroke="var(--gold)"
        strokeWidth="0.8"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="58" cy="5" r="1.4" fill="var(--gold)" opacity="0.7" />
    </svg>
  );
}
