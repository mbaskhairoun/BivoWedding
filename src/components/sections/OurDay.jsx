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

        <div
          style={{
            marginTop: 'clamp(1.8rem, 3vw, 2.4rem)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.7rem',
            flexWrap: 'wrap',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true" style={{ flexShrink: 0 }}>
            <path
              d="M7 12 C 3 9, 1 6.5, 1 4.2 C 1 2.4, 2.4 1.2, 4 1.2 C 5.2 1.2, 6.3 1.9, 7 3 C 7.7 1.9, 8.8 1.2, 10 1.2 C 11.6 1.2, 13 2.4, 13 4.2 C 13 6.5, 11 9, 7 12 Z"
              fill="var(--gold)"
              opacity="0.65"
            />
          </svg>
          <p
            style={{
              margin: 0,
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: 'italic',
              fontWeight: 400,
              fontSize: 'clamp(1rem, 1.5vw, 1.15rem)',
              lineHeight: 1.6,
              color: 'var(--sage-dark)',
              opacity: 0.92,
            }}
          >
            but if you insist &mdash; a little something for our new beginning
            <br />
            would be lovingly received.
          </p>
          <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true" style={{ flexShrink: 0 }}>
            <path
              d="M7 12 C 3 9, 1 6.5, 1 4.2 C 1 2.4, 2.4 1.2, 4 1.2 C 5.2 1.2, 6.3 1.9, 7 3 C 7.7 1.9, 8.8 1.2, 10 1.2 C 11.6 1.2, 13 2.4, 13 4.2 C 13 6.5, 11 9, 7 12 Z"
              fill="var(--gold)"
              opacity="0.65"
            />
          </svg>
        </div>

        <p
          style={{
            marginTop: 'clamp(2rem, 3.5vw, 2.6rem)',
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
