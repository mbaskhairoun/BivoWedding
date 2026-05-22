import React from 'react';
import { motion } from 'framer-motion';

export default function DressCode() {
  return (
    <section
      id="dress-code"
      style={{
        padding: 'clamp(3.5rem, 9vh, 5.5rem) 1.5rem',
        background: 'var(--ivory)',
        textAlign: 'center',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        style={{ maxWidth: '560px', margin: '0 auto' }}
      >
        <p style={labelStyle}>Dress Code</p>

        <h2
          style={{
            marginTop: '1rem',
            fontFamily: "'Pinyon Script', cursive",
            fontStyle: 'normal',
            fontWeight: 400,
            fontSize: 'clamp(2.2rem, 5vw, 3.4rem)',
            lineHeight: 1.05,
            color: 'var(--forest)',
          }}
        >
          Formal Attire
        </h2>

        <Divider />

        <p style={bodyStyle}>
          We kindly ask guests to dress in formal attire for our celebration.
          To keep the aesthetic of the evening, we ask that you avoid wearing black.
        </p>

        <p style={{ ...bodyStyle, marginTop: 'clamp(1rem, 2vw, 1.4rem)' }}>
          As the event will take place outdoors in the evening, please bring a
          jacket, wrap, or scarf to stay warm and comfortable.
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

const bodyStyle = {
  margin: 0,
  fontFamily: "'Cormorant Garamond', serif",
  fontStyle: 'italic',
  fontWeight: 400,
  fontSize: 'clamp(1.1rem, 1.7vw, 1.25rem)',
  lineHeight: 1.8,
  color: 'var(--forest)',
  opacity: 0.88,
};

function Divider() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.9rem', margin: 'clamp(1.4rem, 2.6vw, 2rem) 0' }}>
      <span style={{ height: '1px', width: '60px', background: 'var(--border)' }} />
      <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
        <circle cx="5" cy="5" r="2" fill="var(--gold)" opacity="0.7" />
      </svg>
      <span style={{ height: '1px', width: '60px', background: 'var(--border)' }} />
    </div>
  );
}
