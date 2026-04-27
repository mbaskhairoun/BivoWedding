import React from 'react';
import { motion } from 'framer-motion';
import { useCountdown } from '../../hooks/useCountdown';

const units = [
  { key: 'days', label: 'Days' },
  { key: 'hours', label: 'Hours' },
  { key: 'minutes', label: 'Minutes' },
  { key: 'seconds', label: 'Seconds' },
];

export default function Countdown() {
  const t = useCountdown();

  return (
    <section
      style={{
        padding: 'clamp(3rem, 8vh, 5.5rem) 1.25rem',
        background: 'var(--ivory)',
        textAlign: 'center',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        style={{ maxWidth: '680px', margin: '0 auto' }}
      >
        <p style={labelStyle}>Counting the days</p>

        <Divider />

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'flex-start',
            gap: 'clamp(0.4rem, 2.5vw, 1.4rem)',
            flexWrap: 'wrap',
          }}
        >
          {units.map((u) => (
            <Unit key={u.key} value={t[u.key]} label={u.label} />
          ))}
        </div>

        <Divider />
      </motion.div>
    </section>
  );
}

function Unit({ value, label }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '64px' }}>
      <span
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: 'italic',
          fontWeight: 400,
          fontSize: 'clamp(2.6rem, 6.5vw, 4.2rem)',
          lineHeight: 1,
          color: 'var(--forest)',
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {value}
      </span>
      <span
        style={{
          marginTop: '0.7rem',
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: 'italic',
          fontSize: 'clamp(0.78rem, 1.25vw, 0.92rem)',
          letterSpacing: '0.36em',
          textTransform: 'uppercase',
          color: 'var(--sage-dark)',
        }}
      >
        {label}
      </span>
    </div>
  );
}

function Divider() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.9rem',
        margin: 'clamp(1.4rem, 3vw, 2.2rem) 0',
      }}
    >
      <span style={{ height: '1px', width: '60px', background: 'var(--border)' }} />
      <svg width="9" height="9" viewBox="0 0 9 9" aria-hidden="true">
        <circle cx="4.5" cy="4.5" r="1.8" fill="var(--gold)" opacity="0.75" />
      </svg>
      <span style={{ height: '1px', width: '60px', background: 'var(--border)' }} />
    </div>
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
