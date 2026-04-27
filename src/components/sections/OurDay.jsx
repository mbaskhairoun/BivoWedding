import React from 'react';
import { motion } from 'framer-motion';

export default function OurDay() {
  return (
    <section
      id="our-day"
      style={{
        padding: 'clamp(5rem, 12vh, 8rem) 1.5rem',
        background: 'var(--ivory)',
        textAlign: 'center',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        style={{ maxWidth: '620px', margin: '0 auto' }}
      >
        <p style={labelStyle}>Our Day</p>

        <h2
          style={{
            marginTop: '1rem',
            fontFamily: "'Pinyon Script', cursive",
            fontStyle: 'normal',
            fontWeight: 400,
            fontSize: 'clamp(2.6rem, 6vw, 4.5rem)',
            lineHeight: 1.05,
            color: 'var(--forest)',
          }}
        >
          A celebration of love
        </h2>

        <Divider />

        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            fontWeight: 400,
            fontSize: 'clamp(1.2rem, 1.8vw, 1.35rem)',
            lineHeight: 1.85,
            color: 'var(--forest)',
            opacity: 0.88,
          }}
        >
          After years of laughter, late-night talks, and a thousand small adventures,
          we are gathering the people we love most to share the beginning of our forever.
          Your presence is the only gift we ask for.
        </p>

        <p
          style={{
            marginTop: '2.4rem',
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            fontSize: 'clamp(0.9rem, 1.5vw, 1.05rem)',
            letterSpacing: '0.42em',
            textTransform: 'uppercase',
            color: 'var(--sage-dark)',
          }}
        >
          With love, Bino &amp; Vivo
        </p>
      </motion.div>
    </section>
  );
}

const labelStyle = {
  fontFamily: "'Cormorant Garamond', serif",
  fontStyle: 'italic',
  fontWeight: 400,
  fontSize: 'clamp(0.9rem, 1.5vw, 1.05rem)',
  letterSpacing: '0.42em',
  textTransform: 'uppercase',
  color: 'var(--muted)',
};

function Divider() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.9rem', margin: 'clamp(1.6rem, 3vw, 2.4rem) 0' }}>
      <span style={{ height: '1px', width: '60px', background: 'var(--border)' }} />
      <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
        <circle cx="5" cy="5" r="2" fill="var(--gold)" opacity="0.7" />
      </svg>
      <span style={{ height: '1px', width: '60px', background: 'var(--border)' }} />
    </div>
  );
}
