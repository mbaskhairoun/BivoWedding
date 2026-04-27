import React from 'react';
import { motion } from 'framer-motion';

const items = [
  {
    title: 'Venue',
    body: 'Ascott Parc Event Centre\n2839 Rutherford Road\nVaughan, Ontario L4K 2N7',
  },
  {
    title: 'Attire',
    body: 'Garden formal.\nPale neutrals & soft florals\nencouraged.',
  },
  {
    title: 'Travel',
    body: 'A shuttle will run between\nthe Garden Inn and the venue\nthroughout the evening.',
  },
];

export default function Details() {
  return (
    <section
      id="details"
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
        style={{ maxWidth: '900px', margin: '0 auto' }}
      >
        <p style={labelStyle}>Information</p>

        <h2
          style={{
            marginTop: '1rem',
            fontFamily: "'Pinyon Script', cursive",
            fontStyle: 'normal',
            fontWeight: 400,
            fontSize: 'clamp(2.4rem, 5.5vw, 4rem)',
            lineHeight: 1.05,
            color: 'var(--forest)',
          }}
        >
          What to know
        </h2>

        <div
          style={{
            marginTop: 'clamp(2.5rem, 5vw, 4rem)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 'clamp(2.5rem, 5vw, 4rem)',
            alignItems: 'start',
          }}
        >
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: 'easeOut' }}
            >
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: 'italic',
                  fontSize: 'clamp(0.75rem, 1.3vw, 0.88rem)',
                  letterSpacing: '0.42em',
                  textTransform: 'uppercase',
                  color: 'var(--sage-dark)',
                  marginBottom: '0.9rem',
                }}
              >
                {item.title}
              </p>
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: 'italic',
                  fontSize: 'clamp(0.95rem, 1.45vw, 1.1rem)',
                  lineHeight: 1.85,
                  color: 'var(--forest)',
                  whiteSpace: 'pre-line',
                  opacity: 0.88,
                }}
              >
                {item.body}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

const labelStyle = {
  fontFamily: "'Cormorant Garamond', serif",
  fontStyle: 'italic',
  fontWeight: 400,
  fontSize: 'clamp(0.75rem, 1.3vw, 0.9rem)',
  letterSpacing: '0.42em',
  textTransform: 'uppercase',
  color: 'var(--muted)',
};
