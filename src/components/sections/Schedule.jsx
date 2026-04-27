import React from 'react';
import { motion } from 'framer-motion';

const events = [
  { time: '3:00 PM', title: 'Ceremony', note: 'Please be seated by 2:45' },
  { time: '4:00 PM', title: 'Cocktail Hour', note: 'Drinks & garden views' },
  { time: '5:30 PM', title: 'Reception', note: 'Dinner, toasts & dancing' },
];

export default function Schedule() {
  return (
    <section
      id="schedule"
      style={{
        padding: 'clamp(5rem, 12vh, 8rem) 1.5rem',
        background: 'var(--paper)',
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
        <p style={labelStyle}>The Day</p>

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
          Order of events
        </h2>

        <ul style={{ listStyle: 'none', padding: 0, margin: 'clamp(2.5rem, 5vw, 3.5rem) 0 0', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {events.map((e, i) => (
            <motion.li
              key={e.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.8, delay: i * 0.12, ease: 'easeOut' }}
            >
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: 'italic',
                  fontSize: 'clamp(0.75rem, 1.3vw, 0.88rem)',
                  letterSpacing: '0.42em',
                  textTransform: 'uppercase',
                  color: 'var(--sage-dark)',
                }}
              >
                {e.time}
              </p>
              <p
                style={{
                  marginTop: '0.4rem',
                  fontFamily: "'Pinyon Script', cursive",
                  fontStyle: 'normal',
                  fontSize: 'clamp(1.7rem, 3.5vw, 2.3rem)',
                  lineHeight: 1.1,
                  color: 'var(--forest)',
                }}
              >
                {e.title}
              </p>
              <p
                style={{
                  marginTop: '0.2rem',
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: 'italic',
                  fontSize: 'clamp(0.9rem, 1.4vw, 1.02rem)',
                  color: 'var(--muted)',
                }}
              >
                {e.note}
              </p>
              {i < events.length - 1 && (
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
                  <span style={{ height: '1px', width: '40px', background: 'var(--border)' }} />
                </div>
              )}
            </motion.li>
          ))}
        </ul>
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
