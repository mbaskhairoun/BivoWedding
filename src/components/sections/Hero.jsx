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
            color: '#f3e6c1',
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
            fontSize: 'clamp(1.05rem, 1.9vw, 1.3rem)',
            letterSpacing: '0.4em',
            textTransform: 'uppercase',
            color: 'rgba(243, 230, 193, 0.92)',
            textShadow: '0 2px 14px rgba(0,0,0,0.6)',
          }}
        >
          are getting married
        </motion.p>

        <motion.p
          {...fadeUp}
          transition={{ duration: 1, delay: 0.85, ease: 'easeOut' }}
          style={{
            marginTop: 'clamp(1.6rem, 3vh, 2.2rem)',
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            fontWeight: 400,
            fontSize: 'clamp(0.95rem, 1.7vw, 1.15rem)',
            letterSpacing: '0.3em',
            color: 'rgba(243, 230, 193, 0.95)',
            whiteSpace: 'nowrap',
            textShadow: '0 2px 14px rgba(0,0,0,0.6)',
          }}
        >
          08.30.2026
        </motion.p>

        <motion.a
          {...fadeUp}
          href="#rsvp"
          onClick={(e) => {
            e.preventDefault();
            const el = document.getElementById('rsvp');
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }}
          transition={{ duration: 1, delay: 1.05, ease: 'easeOut' }}
          whileHover={{ y: -2, letterSpacing: '0.46em' }}
          style={{
            marginTop: 'clamp(2.2rem, 4vh, 3rem)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.9rem',
            padding: '0.95rem 2.4rem',
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            fontWeight: 400,
            fontSize: 'clamp(0.78rem, 1.2vw, 0.92rem)',
            letterSpacing: '0.42em',
            textTransform: 'uppercase',
            color: 'rgba(243, 230, 193, 0.95)',
            border: '1px solid rgba(243, 230, 193, 0.55)',
            borderRadius: '999px',
            textDecoration: 'none',
            background: 'rgba(20, 24, 18, 0.18)',
            backdropFilter: 'blur(2px)',
            WebkitBackdropFilter: 'blur(2px)',
            textShadow: '0 2px 14px rgba(0,0,0,0.55)',
            cursor: 'pointer',
            transition: 'background 0.4s ease, border-color 0.4s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(243, 230, 193, 0.12)';
            e.currentTarget.style.borderColor = 'rgba(243, 230, 193, 0.85)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(20, 24, 18, 0.18)';
            e.currentTarget.style.borderColor = 'rgba(243, 230, 193, 0.55)';
          }}
        >
          <span
            aria-hidden="true"
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: 'rgba(243, 230, 193, 0.7)',
            }}
          />
          Rsvp
          <span
            aria-hidden="true"
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: 'rgba(243, 230, 193, 0.7)',
            }}
          />
        </motion.a>
      </div>
    </section>
  );
}

