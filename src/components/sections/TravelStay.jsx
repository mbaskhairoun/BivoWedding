import React from 'react';
import { motion } from 'framer-motion';
import ParallaxPainting from '../effects/ParallaxPainting';
import CursiveHeading from '../ui/CursiveHeading';
import BlobCard from '../ui/BlobCard';

/* ──────────────── palette ──────────────── */
const C = {
  sage: '#8faa8c',
  hydrangea: '#7ba7c2',
  cream: '#fdf9f0',
  ivory: '#faf6eb',
  goldPale: '#f0e4bf',
  text: '#4a5a47',
  textLight: '#6d7d6a',
};

/* ──────────────── card data ──────────────── */
const cards = [
  {
    title: 'Getting There',
    body: 'The nearest airport is Greenfield Regional (GFR), just a scenic 30-minute drive through rolling countryside to the venue. Car rentals and taxis are readily available at the terminal.',
    direction: 'left',
  },
  {
    title: 'Where to Stay',
    body: 'We have reserved a block of rooms at the Garden Inn, a charming property minutes from the celebration. Use code BINOVIVO26 when booking for a special rate.',
    direction: 'right',
  },
  {
    title: 'Getting Around',
    body: 'A complimentary shuttle service will run between the Garden Inn and the venue throughout the wedding weekend, so you can relax and enjoy every moment.',
    direction: 'left',
  },
];

/* ──────────────── stagger animation ──────────────── */
const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.18, delayChildren: 0.15 },
  },
};

const cardVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ════════════════════════════════════════════════════════════════════
   TRAVEL & STAY COMPONENT
   ════════════════════════════════════════════════════════════════════ */
export default function TravelStay() {
  return (
    <section id="travel" style={styles.section}>
      {/* right parallax painting */}
      <ParallaxPainting
        src="/inspo/WhatsApp Image 2026-03-29 at 7.05.39 PM.jpeg"
        speed={0.2}
        rotation={3}
        style={{
          right: '-5%',
          top: '8%',
          width: 'clamp(200px, 28vw, 420px)',
          opacity: 0.18,
          borderRadius: '40% 60% 46% 54% / 55% 42% 58% 45%',
          maskImage: 'radial-gradient(ellipse 82% 82% at 50% 50%, black 36%, transparent 74%)',
          WebkitMaskImage: 'radial-gradient(ellipse 82% 82% at 50% 50%, black 36%, transparent 74%)',
          filter: 'saturate(0.65) brightness(1.1)',
        }}
      />

      {/* content */}
      <div style={styles.content}>
        <CursiveHeading text="Travel & Stay" subtitle="Making your journey easy" />

        <motion.div
          style={styles.cardsGrid}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {cards.map((card, i) => (
            <motion.div key={card.title} variants={cardVariant}>
              <BlobCard direction={card.direction} delay={0}>
                <h3 style={styles.cardTitle}>{card.title}</h3>
                <p style={styles.cardBody}>{card.body}</p>
              </BlobCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ──────────────── styles ──────────────── */
const styles = {
  section: {
    position: 'relative',
    width: '100%',
    minHeight: '80vh',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 'clamp(3rem, 8vw, 6rem) 1.5rem',
    boxSizing: 'border-box',
  },

  content: {
    position: 'relative',
    zIndex: 2,
    width: '100%',
    maxWidth: '1000px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  cardsGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 'clamp(1.5rem, 3vw, 2.2rem)',
    marginTop: 'clamp(2rem, 4vw, 3rem)',
    width: '100%',
  },

  cardTitle: {
    fontFamily: "'Pinyon Script', cursive",
    fontSize: 'clamp(1.5rem, 3vw, 2rem)',
    color: C.sage,
    fontWeight: 400,
    margin: '0 0 0.6rem 0',
    lineHeight: 1.2,
  },

  cardBody: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 'clamp(0.95rem, 1.8vw, 1.1rem)',
    color: C.text,
    lineHeight: 1.7,
    margin: 0,
  },
};
