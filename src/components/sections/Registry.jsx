import React from 'react';
import { motion } from 'framer-motion';
import CursiveHeading from '../ui/CursiveHeading';
import BlobCard from '../ui/BlobCard';

/* ──────────────── palette ──────────────── */
const C = {
  sage: '#8faa8c',
  hydrangea: '#7ba7c2',
  cream: '#fdf9f0',
  text: '#4a5a47',
  textLight: '#6d7d6a',
};

/* ════════════════════════════════════════════════════════════════════
   REGISTRY COMPONENT
   ════════════════════════════════════════════════════════════════════ */
export default function Registry() {
  return (
    <section id="registry" style={styles.section}>
      <div style={styles.content}>
        <CursiveHeading text="Registry" subtitle="Your presence is our present" />

        <motion.div
          initial={{ opacity: 0, y: 36, scale: 0.94 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          style={styles.cardWrap}
        >
          <BlobCard
            direction="left"
            style={{
              maxWidth: '600px',
              borderRadius: '52% 48% 56% 44% / 46% 54% 42% 58%',
              padding: 'clamp(2.2rem, 5vw, 3.2rem) clamp(2rem, 4vw, 3rem)',
              textAlign: 'center',
            }}
          >
            <p style={styles.bodyText}>
              The greatest gift is having you celebrate with us. Your love, laughter,
              and presence on our special day mean more than words can say.
            </p>

            <p style={styles.bodyTextSm}>
              If you wish to honour us with a gift, we have curated a small registry
              for your convenience.
            </p>

            {/* Registry links placeholder */}
            <div style={styles.linksWrap}>
              {['Zola', 'Crate & Barrel', 'Honeymoon Fund'].map((name) => (
                <motion.a
                  key={name}
                  href="#"
                  style={styles.registryLink}
                  whileHover={{
                    scale: 1.06,
                    color: C.hydrangea,
                    borderColor: C.hydrangea,
                  }}
                  whileTap={{ scale: 0.96 }}
                >
                  {name}
                </motion.a>
              ))}
            </div>
          </BlobCard>
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
    minHeight: '60vh',
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
    maxWidth: '700px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  cardWrap: {
    marginTop: 'clamp(1.5rem, 4vw, 2.5rem)',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },

  bodyText: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 'clamp(1.05rem, 2.2vw, 1.25rem)',
    color: C.text,
    lineHeight: 1.75,
    margin: '0 0 1rem 0',
    fontStyle: 'italic',
  },

  bodyTextSm: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 'clamp(0.9rem, 1.8vw, 1.05rem)',
    color: C.textLight,
    lineHeight: 1.7,
    margin: '0 0 1.5rem 0',
  },

  linksWrap: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '0.8rem',
    marginTop: '0.6rem',
  },

  registryLink: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 'clamp(0.9rem, 1.8vw, 1.05rem)',
    fontWeight: 600,
    letterSpacing: '0.1em',
    color: C.sage,
    textDecoration: 'none',
    border: `1.5px solid rgba(143,170,140,0.35)`,
    borderRadius: '40px 35px 40px 35px',
    padding: '0.55rem 1.6rem',
    display: 'inline-block',
    transition: 'color 0.3s, border-color 0.3s',
    cursor: 'pointer',
  },
};
