import React from 'react';
import { motion } from 'framer-motion';
import ParallaxPainting from '../effects/ParallaxPainting';

/* ──────────────── palette ──────────────── */
const C = {
  sage: '#8faa8c',
  sageLight: '#b5ccb2',
  sagePale: '#dfe9dc',
  hydrangea: '#7ba7c2',
  hydrangeaLight: '#a8cfe0',
  hydrangeaPale: '#d6eaf5',
  cream: '#fdf9f0',
  text: '#4a5a47',
  textLight: '#6d7d6a',
};

/* ──────────────── SVG hydrangea ornament cluster ──────────────── */
const HydrangeaCluster = () => (
  <motion.svg
    viewBox="0 0 200 60"
    width="clamp(120px, 30vw, 200px)"
    style={{ margin: '0 auto', display: 'block' }}
    initial={{ opacity: 0, scale: 0.6 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
  >
    {/* center cluster */}
    {[
      [96, 22], [100, 16], [104, 24], [92, 16], [108, 18],
      [98, 10], [104, 10], [88, 22], [112, 22], [100, 28],
      [94, 28], [106, 28], [100, 6], [96, 34], [104, 34],
    ].map(([cx, cy], i) => (
      <circle
        key={`c-${i}`}
        cx={cx}
        cy={cy}
        r={3 + (i % 3) * 0.8}
        fill={
          i % 4 === 0
            ? C.hydrangea
            : i % 4 === 1
            ? C.hydrangeaLight
            : i % 4 === 2
            ? C.hydrangeaPale
            : C.sagePale
        }
        opacity={0.5 + (i % 3) * 0.15}
      />
    ))}
    {/* left mini cluster */}
    {[
      [40, 30], [46, 26], [36, 26], [42, 22], [48, 32],
    ].map(([cx, cy], i) => (
      <circle
        key={`l-${i}`}
        cx={cx}
        cy={cy}
        r={2.5 + (i % 2) * 0.8}
        fill={i % 2 === 0 ? C.hydrangea : C.hydrangeaLight}
        opacity={0.45 + (i % 3) * 0.12}
      />
    ))}
    {/* right mini cluster */}
    {[
      [158, 28], [164, 24], [154, 24], [160, 20], [166, 30],
    ].map(([cx, cy], i) => (
      <circle
        key={`r-${i}`}
        cx={cx}
        cy={cy}
        r={2.5 + (i % 2) * 0.8}
        fill={i % 2 === 0 ? C.hydrangeaLight : C.hydrangea}
        opacity={0.45 + (i % 3) * 0.12}
      />
    ))}
    {/* connecting vine */}
    <path
      d="M44 32 C60 42, 80 20, 100 32 S140 42, 160 30"
      fill="none"
      stroke={C.sageLight}
      strokeWidth="1.5"
      strokeLinecap="round"
      opacity="0.5"
    />
    {/* tiny leaves */}
    {[60, 100, 140].map((x, i) => (
      <ellipse
        key={`leaf-${i}`}
        cx={x}
        cy={i % 2 === 0 ? 30 : 34}
        rx="4"
        ry="7"
        fill={C.sage}
        opacity="0.35"
        transform={`rotate(${i % 2 === 0 ? -25 : 25} ${x} ${i % 2 === 0 ? 30 : 34})`}
      />
    ))}
  </motion.svg>
);

/* ════════════════════════════════════════════════════════════════════
   FOOTER COMPONENT
   ════════════════════════════════════════════════════════════════════ */
export default function Footer() {
  return (
    <footer style={styles.footer}>
      {/* radial gradient washes */}
      <div style={styles.gradientLayer} />

      {/* left parallax painting */}
      <ParallaxPainting
        src="/inspo/WhatsApp Image 2026-03-29 at 7.05.10 PM.jpeg"
        speed={0.15}
        rotation={-2}
        style={{
          left: '-3%',
          top: '5%',
          width: 'clamp(180px, 26vw, 380px)',
          opacity: 0.22,
          borderRadius: '50% 42% 55% 45% / 46% 54% 42% 52%',
          maskImage: 'radial-gradient(ellipse 78% 78% at 50% 50%, black 32%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(ellipse 78% 78% at 50% 50%, black 32%, transparent 70%)',
          filter: 'saturate(0.65) brightness(1.08)',
        }}
      />

      {/* right parallax painting */}
      <ParallaxPainting
        src="/inspo/WhatsApp Image 2026-03-29 at 7.05.49 PM.jpeg"
        speed={0.18}
        rotation={2.5}
        style={{
          right: '-3%',
          top: '10%',
          width: 'clamp(170px, 24vw, 360px)',
          opacity: 0.2,
          borderRadius: '42% 55% 45% 50% / 54% 42% 52% 46%',
          maskImage: 'radial-gradient(ellipse 78% 78% at 50% 50%, black 32%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(ellipse 78% 78% at 50% 50%, black 32%, transparent 70%)',
          filter: 'saturate(0.6) brightness(1.1)',
        }}
      />

      {/* content */}
      <div style={styles.content}>
        {/* Floating names */}
        <motion.h2
          style={styles.names}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.span
            style={{ display: 'inline-block' }}
            animate={{ y: [0, -8, 0] }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            Bino & Vivo
          </motion.span>
        </motion.h2>

        {/* Date and love line */}
        <motion.p
          style={styles.dateLine}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          September 20, 2026 &hearts; With love and joy
        </motion.p>

        {/* Hydrangea ornament */}
        <div style={{ marginTop: 'clamp(1rem, 2.5vw, 1.8rem)' }}>
          <HydrangeaCluster />
        </div>

        {/* tiny copyright */}
        <motion.p
          style={styles.copyright}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Made with love for Bino & Vivo
        </motion.p>
      </div>
    </footer>
  );
}

/* ──────────────── styles ──────────────── */
const styles = {
  footer: {
    position: 'relative',
    width: '100%',
    overflow: 'hidden',
    padding: 'clamp(4rem, 10vw, 7rem) 1.5rem clamp(2rem, 5vw, 3.5rem)',
    boxSizing: 'border-box',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  gradientLayer: {
    position: 'absolute',
    inset: 0,
    background: [
      `radial-gradient(ellipse 80% 70% at 30% 40%, rgba(143,170,140,0.14) 0%, transparent 65%)`,
      `radial-gradient(ellipse 70% 60% at 70% 55%, rgba(123,167,194,0.12) 0%, transparent 60%)`,
      `radial-gradient(ellipse 90% 80% at 50% 50%, rgba(253,249,240,0.85) 0%, transparent 80%)`,
      `radial-gradient(ellipse 55% 45% at 80% 25%, rgba(143,170,140,0.08) 0%, transparent 50%)`,
      `radial-gradient(ellipse 50% 40% at 20% 75%, rgba(123,167,194,0.08) 0%, transparent 50%)`,
    ].join(', '),
    pointerEvents: 'none',
  },

  content: {
    position: 'relative',
    zIndex: 2,
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  names: {
    fontFamily: "'Pinyon Script', cursive",
    fontSize: 'clamp(3rem, 8vw, 5rem)',
    color: C.sage,
    fontWeight: 400,
    lineHeight: 1.1,
    margin: 0,
    letterSpacing: '1px',
    textShadow: `0 2px 24px rgba(143,170,140,0.15)`,
  },

  dateLine: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 'clamp(0.85rem, 1.8vw, 1.05rem)',
    color: C.textLight,
    letterSpacing: '0.18em',
    fontWeight: 300,
    margin: 0,
    marginTop: '0.8rem',
  },

  copyright: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: '0.8rem',
    color: C.textLight,
    opacity: 0.5,
    letterSpacing: '0.12em',
    marginTop: 'clamp(1.5rem, 3vw, 2.5rem)',
  },
};
