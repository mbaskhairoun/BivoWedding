import React from 'react';
import { motion } from 'framer-motion';

const photos = [
  { src: '/photos/photo-1.webp', alt: 'Bino and Vivo at a garden table' },
  { src: '/photos/photo-2.webp', alt: 'Bino and Vivo holding hands across a garden table' },
  { src: '/photos/photo-3.webp', alt: 'Bino and Vivo seated together in a tropical garden' },
];

// Slight asymmetry: each photo tilts a different way, like loose prints scattered on a table
const rotations = [-3, 2, -1.5];

const photoFilter = 'saturate(0.9) contrast(1.02) sepia(0.05) brightness(1.02)';

export default function Photos() {
  return (
    <section
      id="photos"
      style={{
        padding: 'clamp(5rem, 12vh, 8rem) 0',
        background: 'var(--paper)',
        textAlign: 'center',
        overflow: 'hidden',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        style={{ paddingInline: '1.25rem' }}
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
      </motion.div>

      <div
        className="photo-rail"
        style={{
          marginTop: 'clamp(2.8rem, 5vw, 4.4rem)',
          display: 'flex',
          alignItems: 'center',
          gap: 'clamp(1.4rem, 3.5vw, 2.8rem)',
          overflowX: 'auto',
          overflowY: 'hidden',
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          paddingInline: 'clamp(2rem, 28vw, 30vw)',
          paddingBlock: 'clamp(2.5rem, 5vw, 4rem)',
        }}
      >
        {photos.map((p, i) => (
          <motion.figure
            key={p.src}
            initial={{ opacity: 0, y: 28, rotate: rotations[i] - 4 }}
            animate={{ opacity: 1, y: 0, rotate: rotations[i] }}
            transition={{ duration: 0.95, delay: 0.15 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ rotate: 0, scale: 1.03, y: -10 }}
            style={{
              margin: 0,
              flex: 'none',
              width: 'clamp(320px, 72vw, 560px)',
              aspectRatio: '3 / 4',
              scrollSnapAlign: 'center',
              borderRadius: 'clamp(10px, 1.4vw, 16px)',
              overflow: 'hidden',
              background: 'var(--ivory)',
              border: '1px solid var(--border)',
              boxShadow:
                '0 16px 40px rgba(52,69,58,0.14), 0 4px 12px rgba(52,69,58,0.06)',
              transformOrigin: 'center',
              transition: 'box-shadow 0.4s ease',
              cursor: 'grab',
            }}
          >
            <img
              src={p.src}
              alt={p.alt}
              loading="eager"
              decoding="async"
              draggable="false"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
                filter: photoFilter,
                userSelect: 'none',
              }}
            />
          </motion.figure>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, delay: 0.4, ease: 'easeOut' }}
        style={{
          marginTop: 'clamp(1.2rem, 2vh, 1.8rem)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.8rem',
        }}
      >
        <SwipeArrow />
        <span
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            fontSize: 'clamp(0.78rem, 1.2vw, 0.9rem)',
            letterSpacing: '0.42em',
            textTransform: 'uppercase',
            color: 'var(--muted)',
          }}
        >
          drag to explore
        </span>
        <SwipeArrow flip />
      </motion.div>

      <style>{`
        .photo-rail::-webkit-scrollbar { display: none; }
        .photo-rail { scroll-behavior: smooth; }
      `}</style>
    </section>
  );
}

function SwipeArrow({ flip = false }) {
  return (
    <motion.svg
      width="44"
      height="10"
      viewBox="0 0 44 10"
      fill="none"
      style={{ transform: flip ? 'scaleX(-1)' : 'none' }}
      animate={{ x: flip ? [0, 4, 0] : [0, -4, 0] }}
      transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
      aria-hidden="true"
    >
      <path
        d="M2 5 H 36"
        stroke="var(--border)"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <path
        d="M30 1 L 36 5 L 30 9"
        stroke="var(--muted)"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </motion.svg>
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
