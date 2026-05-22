import React from 'react';
import { motion } from 'framer-motion';

export default function Schedule() {
  return (
    <section
      id="schedule"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(4rem, 7vh, 5.5rem) 1.5rem',
        background: 'var(--paper)',
        boxSizing: 'border-box',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        style={{ display: 'flex', justifyContent: 'center', width: '100%' }}
      >
        <img
          src="/order-of-events.jpeg"
          alt="Order of Events — Sunday, August 30, 2026. Ceremony at 12:30 PM, Saint Peter and Saint Paul Coptic Orthodox Church, Oakville. Reception at 5:00 PM, Ascott Parc, Concord."
          style={{
            display: 'block',
            width: 'auto',
            height: 'auto',
            maxWidth: '100%',
            maxHeight: 'min(86vh, 1748px)',
            borderRadius: '6px',
            boxShadow: '0 30px 70px -30px rgba(0, 0, 0, 0.38)',
          }}
        />
      </motion.div>
    </section>
  );
}
