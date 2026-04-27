import React from 'react';
import { motion } from 'framer-motion';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

export default function Hero() {
  return (
    <section
      id="home"
      style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(5rem, 10vh, 7rem) 1.5rem 4rem',
        overflow: 'hidden',
      }}
    >
      {/* Full-bleed background photo */}
      <img
        src="/hero-bg.webp"
        alt=""
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          filter: 'sepia(0.22) brightness(0.95) contrast(1.05) saturate(1.05)',
          zIndex: 0,
        }}
      />

      {/* Soft scrim — keeps copy readable without flattening the photo */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          background:
            'linear-gradient(to bottom, rgba(20,24,18,0.40) 0%, rgba(20,24,18,0.22) 35%, rgba(20,24,18,0.50) 100%)',
        }}
      />

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          maxWidth: '720px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <motion.h1
          {...fadeUp}
          transition={{ duration: 1.3, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: "'Pinyon Script', cursive",
            fontWeight: 400,
            fontStyle: 'normal',
            fontSize: 'clamp(4rem, 11vw, 8rem)',
            lineHeight: 1.05,
            color: '#fbf9f3',
            letterSpacing: '-0.005em',
            textShadow:
              '0 4px 30px rgba(0,0,0,0.6), 0 2px 8px rgba(0,0,0,0.4)',
          }}
        >
          Bino &amp; Vivo
        </motion.h1>

        <motion.p
          {...fadeUp}
          transition={{ duration: 1, delay: 0.6, ease: 'easeOut' }}
          style={{
            marginTop: 'clamp(1rem, 2vh, 1.5rem)',
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            fontWeight: 400,
            fontSize: 'clamp(0.85rem, 1.5vw, 1.05rem)',
            letterSpacing: '0.42em',
            textTransform: 'uppercase',
            color: 'rgba(251, 249, 243, 0.88)',
            textShadow: '0 2px 14px rgba(0,0,0,0.6)',
          }}
        >
          are getting married
        </motion.p>

        <motion.div
          {...fadeUp}
          transition={{ duration: 1, delay: 0.85, ease: 'easeOut' }}
          style={{
            marginTop: 'clamp(1.6rem, 3vh, 2.2rem)',
            display: 'flex',
            alignItems: 'center',
            gap: '1.2rem',
          }}
        >
          <Flourish />
          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: 'italic',
              fontWeight: 400,
              fontSize: 'clamp(0.92rem, 1.6vw, 1.1rem)',
              letterSpacing: '0.32em',
              textTransform: 'uppercase',
              color: 'rgba(251, 249, 243, 0.94)',
              whiteSpace: 'nowrap',
              textShadow: '0 2px 14px rgba(0,0,0,0.6)',
            }}
          >
            30 · 08 · 2026
          </p>
          <Flourish flip />
        </motion.div>

        <motion.p
          {...fadeUp}
          transition={{ duration: 1, delay: 1.05, ease: 'easeOut' }}
          style={{
            marginTop: '1rem',
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            fontWeight: 400,
            fontSize: 'clamp(0.9rem, 1.4vw, 1.05rem)',
            color: 'rgba(251, 249, 243, 0.78)',
            letterSpacing: '0.06em',
            textShadow: '0 2px 14px rgba(0,0,0,0.55)',
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
        stroke="rgba(228, 200, 145, 0.85)"
        strokeWidth="0.9"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="58" cy="5" r="1.6" fill="rgba(228, 200, 145, 0.9)" />
    </svg>
  );
}
