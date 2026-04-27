import React from 'react';
import { motion } from 'framer-motion';

const photos = [
  { src: '/photos/photo-1.webp', alt: 'Bino and Vivo at a garden table' },
  { src: '/photos/photo-2.webp', alt: 'Bino and Vivo holding hands across a garden table' },
  { src: '/photos/photo-3.webp', alt: 'Bino and Vivo seated together in a tropical garden' },
];

// Slight desaturation + warm sepia tint + tiny brightness lift so the
// sun-drenched tropical photos sit calmly against the ivory/sage palette
const photoFilter = 'saturate(0.9) contrast(1.02) sepia(0.05) brightness(1.02)';

export default function Photos() {
  return (
    <section
      id="photos"
      style={{
        padding: 'clamp(5rem, 12vh, 8rem) 1.25rem',
        background: 'var(--paper)',
        textAlign: 'center',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        style={{ maxWidth: '1080px', margin: '0 auto' }}
      >
        <p style={labelStyle}>Photographs</p>

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
          Together
        </h2>

        <div
          style={{
            marginTop: 'clamp(2.5rem, 5vw, 4rem)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 'clamp(1rem, 2.5vw, 1.8rem)',
          }}
        >
          {photos.map((p, i) => (
            <motion.figure
              key={p.src}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.9, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ scale: 1.015 }}
              style={{
                margin: 0,
                aspectRatio: '3 / 4',
                overflow: 'hidden',
                borderRadius: 'clamp(10px, 1.4vw, 16px)',
                background: 'var(--ivory)',
                border: '1px solid var(--border)',
                boxShadow:
                  '0 10px 30px rgba(52,69,58,0.09), 0 2px 6px rgba(52,69,58,0.04)',
                transformOrigin: 'center',
                transition: 'box-shadow 0.4s ease',
              }}
            >
              <img
                src={p.src}
                alt={p.alt}
                loading={i === 0 ? 'eager' : 'lazy'}
                decoding="async"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  filter: photoFilter,
                }}
              />
            </motion.figure>
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
  fontSize: 'clamp(0.9rem, 1.5vw, 1.05rem)',
  letterSpacing: '0.42em',
  textTransform: 'uppercase',
  color: 'var(--muted)',
};
