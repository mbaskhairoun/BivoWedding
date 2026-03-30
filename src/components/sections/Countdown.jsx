import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CountUp from 'react-countup';
import { useCountdown } from '../../hooks/useCountdown';
import ParallaxPainting from '../effects/ParallaxPainting';
import CursiveHeading from '../ui/CursiveHeading';

/* ───────────────────────────────────────────────
   Organic blob SVG background for each counter box
   ─────────────────────────────────────────────── */
const BlobBackground = ({ color = 'rgba(143,170,140,0.08)' }) => (
  <svg
    viewBox="0 0 200 200"
    style={{
      position: 'absolute',
      inset: '-20%',
      width: '140%',
      height: '140%',
      pointerEvents: 'none',
      zIndex: 0,
    }}
  >
    <path
      d="M 100,20 C 140,15 175,45 180,85 C 185,125 165,165 130,178 C 95,191 50,180 30,150 C 10,120 15,65 45,38 C 65,20 80,22 100,20 Z"
      fill={color}
    />
  </svg>
);

/* ───────────────────────────────────────────────
   Single animated counter item
   ─────────────────────────────────────────────── */
const CounterItem = ({ value, label, delay = 0, blobColor }) => {
  const prevValue = React.useRef(value);

  React.useEffect(() => {
    prevValue.current = value;
  }, [value]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 'clamp(100px, 18vw, 160px)',
        minHeight: 'clamp(110px, 18vw, 160px)',
        padding: '1.5rem 1rem',
      }}
    >
      <BlobBackground color={blobColor} />

      {/* Animated number */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(2.5rem, 5vw, 4rem)',
          fontWeight: 300,
          color: '#8faa8c',
          lineHeight: 1,
          minHeight: '1.2em',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <AnimatePresence mode="popLayout">
          <motion.span
            key={value}
            initial={{ opacity: 0, y: 12, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.85 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          >
            <CountUp end={value} duration={1.2} preserveValue={true} />
          </motion.span>
        </AnimatePresence>
      </div>

      {/* Label */}
      <span
        style={{
          position: 'relative',
          zIndex: 1,
          fontFamily: "'Josefin Sans', sans-serif",
          fontSize: 'clamp(0.55rem, 1vw, 0.72rem)',
          letterSpacing: '3px',
          textTransform: 'uppercase',
          color: '#6d7d6a',
          marginTop: '0.5rem',
          fontWeight: 400,
        }}
      >
        {label}
      </span>
    </motion.div>
  );
};

/* ───────────────────────────────────────────────
   Countdown Section
   ─────────────────────────────────────────────── */
export default function Countdown() {
  const { days, hours, minutes, seconds } = useCountdown();

  const blobColors = [
    'rgba(143,170,140,0.10)', // sage
    'rgba(123,167,194,0.09)', // hydrangea
    'rgba(240,228,191,0.12)', // gold
    'rgba(143,170,140,0.08)', // sage light
  ];

  return (
    <section
      id="countdown"
      style={{
        position: 'relative',
        overflow: 'hidden',
        padding: 'clamp(4rem, 10vw, 8rem) clamp(1.2rem, 5vw, 4rem)',
        background: '#faf6eb',
        minHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* ── Full-width watercolor wash background ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background: `
            radial-gradient(ellipse 70% 50% at 20% 30%, rgba(143,170,140,0.11) 0%, transparent 70%),
            radial-gradient(ellipse 55% 60% at 75% 60%, rgba(123,167,194,0.09) 0%, transparent 65%),
            radial-gradient(ellipse 80% 40% at 50% 80%, rgba(240,228,191,0.12) 0%, transparent 60%),
            radial-gradient(ellipse 40% 35% at 85% 15%, rgba(143,170,140,0.06) 0%, transparent 55%)
          `,
        }}
      />

      {/* ── Parallax: fountain on left corner ── */}
      <ParallaxPainting
        src="/inspo/WhatsApp Image 2026-03-29 at 7.05.39 PM.jpeg"
        speed={0.2}
        rotation={-4}
        style={{
          left: '-6%',
          top: '10%',
          width: 'clamp(180px, 22vw, 340px)',
          opacity: 0.2,
          borderRadius: '52% 48% 56% 44% / 46% 54% 48% 52%',
        }}
      />

      {/* ── Parallax: elements on right corner ── */}
      <ParallaxPainting
        src="/inspo/WhatsApp Image 2026-03-29 at 7.05.10 PM.jpeg"
        speed={0.18}
        rotation={5}
        style={{
          right: '-5%',
          bottom: '8%',
          width: 'clamp(160px, 20vw, 300px)',
          opacity: 0.18,
          borderRadius: '46% 54% 50% 50% / 52% 48% 52% 48%',
        }}
      />

      {/* ── Section heading ── */}
      <CursiveHeading text="Counting the Days" subtitle="Until forever begins" />

      {/* ── Countdown boxes ── */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 'clamp(0.8rem, 3vw, 2.5rem)',
          position: 'relative',
          zIndex: 2,
          marginTop: '1rem',
        }}
      >
        <CounterItem value={days} label="Days" delay={0} blobColor={blobColors[0]} />
        <CounterItem value={hours} label="Hours" delay={0.1} blobColor={blobColors[1]} />
        <CounterItem value={minutes} label="Minutes" delay={0.2} blobColor={blobColors[2]} />
        <CounterItem value={seconds} label="Seconds" delay={0.3} blobColor={blobColors[3]} />
      </motion.div>

      {/* ── Decorative organic separator below countdown ── */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0.3 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{
          marginTop: 'clamp(2rem, 4vw, 3.5rem)',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <svg width="200" height="20" viewBox="0 0 200 20">
          <path
            d="M 10,10 C 40,3 60,17 100,10 C 140,3 160,17 190,10"
            fill="none"
            stroke="#8faa8c"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity={0.35}
          />
        </svg>
      </motion.div>

      {/* ── Wedding date text ── */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.7 }}
        style={{
          fontFamily: "'Josefin Sans', sans-serif",
          fontSize: 'clamp(0.7rem, 1.1vw, 0.85rem)',
          letterSpacing: '4px',
          textTransform: 'uppercase',
          color: '#6d7d6a',
          marginTop: '1.2rem',
          position: 'relative',
          zIndex: 2,
        }}
      >
        August 30, 2026
      </motion.p>
    </section>
  );
}
