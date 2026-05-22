import React from 'react';
import { motion } from 'framer-motion';

export default function Schedule() {
  return (
    <section id="schedule" style={{ background: '#f6f1ed' }}>
      <motion.img
        src="/order-of-events.jpeg"
        alt="Order of Events — Sunday, August 30, 2026. Ceremony at 12:30 PM, Saint Peter and Saint Paul Coptic Orthodox Church, Oakville. Reception at 5:00 PM, Ascott Parc, Concord."
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        style={{
          display: 'block',
          width: '100%',
          height: 'auto',
        }}
      />
    </section>
  );
}
