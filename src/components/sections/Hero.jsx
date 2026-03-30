import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ──────────────────────────── palette ──────────────────────────── */
const C = {
  sage: '#8faa8c',
  sageLight: '#b5ccb2',
  sagePale: '#dfe9dc',
  hydrangea: '#7ba7c2',
  hydrangeaLight: '#a8cfe0',
  hydrangeaPale: '#d6eaf5',
  cream: '#fdf9f0',
  goldSoft: '#d4b96a',
  goldPale: '#f0e4bf',
  text: '#4a5a47',
  textLight: '#6d7d6a',
};

/* ──────────────── animated letter helper ──────────────── */
const AnimatedText = ({ text, style, delay = 0 }) => (
  <span style={{ display: 'inline-block', ...style }}>
    {text.split('').map((char, i) => (
      <motion.span
        key={i}
        initial={{ opacity: 0, y: 60, rotate: -8 + Math.random() * 16 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{
          duration: 1.1,
          delay: delay + i * 0.09,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{ display: 'inline-block', willChange: 'transform, opacity' }}
      >
        {char}
      </motion.span>
    ))}
  </span>
);

/* ──────────────── SVG hydrangea ornament ──────────────── */
const HydrangeaOrnament = () => (
  <motion.svg
    viewBox="0 0 400 120"
    width="min(400px, 80vw)"
    style={{ margin: '0 auto', display: 'block' }}
    initial={{ opacity: 0, scale: 0.7 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
  >
    {/* vine path */}
    <path
      d="M40 80 C80 30, 140 90, 200 60 S320 30, 360 80"
      fill="none"
      stroke={C.sageLight}
      strokeWidth="2.2"
      strokeLinecap="round"
      opacity="0.7"
    />
    {/* tiny leaves along vine */}
    {[70, 140, 260, 330].map((x, i) => (
      <ellipse
        key={`leaf-${i}`}
        cx={x}
        cy={i % 2 === 0 ? 62 : 70}
        rx="6"
        ry="10"
        fill={C.sage}
        opacity="0.45"
        transform={`rotate(${i % 2 === 0 ? -30 : 30} ${x} ${i % 2 === 0 ? 62 : 70})`}
      />
    ))}
    {/* left hydrangea cluster */}
    {[
      [80, 48], [88, 42], [74, 40], [82, 34], [90, 50], [72, 50],
      [86, 56], [68, 44], [76, 56], [94, 44],
    ].map(([cx, cy], i) => (
      <circle
        key={`l-${i}`}
        cx={cx}
        cy={cy}
        r={4 + Math.random() * 2}
        fill={i % 3 === 0 ? C.hydrangea : i % 3 === 1 ? C.hydrangeaLight : C.hydrangeaPale}
        opacity={0.55 + Math.random() * 0.3}
      />
    ))}
    {/* center hydrangea cluster */}
    {[
      [195, 42], [200, 36], [205, 44], [192, 36], [208, 38],
      [198, 30], [204, 30], [188, 42], [212, 42], [200, 48],
      [194, 48], [206, 48], [200, 24], [196, 54], [204, 54],
    ].map(([cx, cy], i) => (
      <circle
        key={`c-${i}`}
        cx={cx}
        cy={cy}
        r={3.5 + Math.random() * 2.5}
        fill={i % 4 === 0 ? C.hydrangea : i % 4 === 1 ? C.hydrangeaLight : i % 4 === 2 ? C.hydrangeaPale : C.sagePale}
        opacity={0.5 + Math.random() * 0.35}
      />
    ))}
    {/* right hydrangea cluster */}
    {[
      [310, 46], [318, 40], [304, 38], [312, 32], [320, 48],
      [302, 48], [316, 54], [298, 42], [306, 54], [324, 42],
    ].map(([cx, cy], i) => (
      <circle
        key={`r-${i}`}
        cx={cx}
        cy={cy}
        r={4 + Math.random() * 2}
        fill={i % 3 === 0 ? C.hydrangeaLight : i % 3 === 1 ? C.hydrangea : C.hydrangeaPale}
        opacity={0.55 + Math.random() * 0.3}
      />
    ))}
  </motion.svg>
);

/* ──────────────── pulsing ampersand ──────────────── */
const PulsingAmpersand = () => (
  <motion.span
    initial={{ opacity: 0, scale: 0.4 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 1.2, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
    style={{
      display: 'inline-block',
      fontFamily: "'Pinyon Script', cursive",
      fontSize: 'clamp(2.5rem, 7vw, 5.5rem)',
      color: C.hydrangea,
      margin: '0 clamp(0.4rem, 2vw, 1.5rem)',
      lineHeight: 1,
      willChange: 'transform',
    }}
  >
    <motion.span
      animate={{ scale: [1, 1.08, 1], opacity: [1, 0.85, 1] }}
      transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
      style={{ display: 'inline-block' }}
    >
      &amp;
    </motion.span>
  </motion.span>
);

/* ──────────────── organic blob badge for the date ──────────────── */
const DateBadge = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 30, scale: 0.85 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ duration: 1.3, delay: 2.2, ease: [0.22, 1, 0.36, 1] }}
    style={{ position: 'relative', display: 'inline-block', marginTop: 'clamp(1rem, 3vw, 2.2rem)' }}
  >
    <svg
      viewBox="0 0 340 90"
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '110%',
        height: '180%',
        pointerEvents: 'none',
      }}
    >
      <path
        d="M30 45 C30 18, 65 8, 170 10 C275 12, 310 20, 312 45 C314 70, 280 82, 170 80 C60 78, 28 72, 30 45Z"
        fill={C.goldPale}
        opacity="0.55"
      />
      <path
        d="M30 45 C30 18, 65 8, 170 10 C275 12, 310 20, 312 45 C314 70, 280 82, 170 80 C60 78, 28 72, 30 45Z"
        fill="none"
        stroke={C.goldSoft}
        strokeWidth="1.2"
        opacity="0.5"
      />
    </svg>
    <span
      style={{
        position: 'relative',
        zIndex: 1,
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: 'clamp(1rem, 2.6vw, 1.65rem)',
        fontWeight: 400,
        letterSpacing: '0.18em',
        color: C.text,
        padding: '0.6em 1.6em',
        display: 'inline-block',
      }}
    >
      {children}
    </span>
  </motion.div>
);

/* ──────────────── floating watercolor blobs (background decoration) ──────────────── */
const WatercolorBlob = ({ color, size, top, left, blur, delay, opacity }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity, scale: 1 }}
    transition={{ duration: 3, delay, ease: 'easeOut' }}
    style={{
      position: 'absolute',
      top,
      left,
      width: size,
      height: size,
      borderRadius: '50% 40% 55% 45% / 45% 55% 40% 50%',
      background: color,
      filter: `blur(${blur})`,
      pointerEvents: 'none',
      willChange: 'transform',
    }}
  />
);

/* ════════════════════════════════════════════════════════════════════
   HERO COMPONENT
   ════════════════════════════════════════════════════════════════════ */
export default function Hero() {
  const sectionRef = useRef(null);
  const namesRef = useRef(null);
  const leftPaintingRef = useRef(null);
  const rightPaintingRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* names float up at half scroll speed */
      gsap.to(namesRef.current, {
        yPercent: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.8,
        },
      });

      /* left painting drifts slowly */
      gsap.to(leftPaintingRef.current, {
        yPercent: -18,
        xPercent: -4,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2,
        },
      });

      /* right painting drifts at a different rate */
      gsap.to(rightPaintingRef.current, {
        yPercent: -25,
        xPercent: 6,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.6,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} style={styles.section}>
      {/* ─── radial gradient watercolor washes ─── */}
      <div style={styles.gradientLayer} />

      {/* ─── floating watercolor blobs ─── */}
      <WatercolorBlob color={C.hydrangeaPale} size="40vw" top="-8%" left="-12%" blur="80px" delay={0.3} opacity={0.35} />
      <WatercolorBlob color={C.sagePale} size="35vw" top="15%" left="65%" blur="90px" delay={0.5} opacity={0.3} />
      <WatercolorBlob color={C.goldPale} size="28vw" top="55%" left="10%" blur="70px" delay={0.8} opacity={0.22} />
      <WatercolorBlob color={C.hydrangeaLight} size="22vw" top="60%" left="72%" blur="60px" delay={1.0} opacity={0.2} />
      <WatercolorBlob color={C.sageLight} size="18vw" top="-5%" left="42%" blur="50px" delay={0.6} opacity={0.18} />

      {/* ─── left inspo painting ─── */}
      <div ref={leftPaintingRef} style={styles.leftPainting}>
        <img
          src="/inspo/WhatsApp Image 2026-03-29 at 7.05.10 PM.jpeg"
          alt=""
          style={styles.leftPaintingImg}
        />
      </div>

      {/* ─── right inspo painting ─── */}
      <div ref={rightPaintingRef} style={styles.rightPainting}>
        <img
          src="/inspo/WhatsApp Image 2026-03-29 at 7.06.07 PM.jpeg"
          alt=""
          style={styles.rightPaintingImg}
        />
      </div>

      {/* ─── soft vignette overlay ─── */}
      <div style={styles.vignette} />

      {/* ─── main content ─── */}
      <div ref={namesRef} style={styles.content}>
        {/* hydrangea ornament */}
        <HydrangeaOrnament />

        {/* spacer */}
        <div style={{ height: 'clamp(0.8rem, 2vw, 1.6rem)' }} />

        {/* names row */}
        <div style={styles.namesRow}>
          <AnimatedText
            text="Bino"
            delay={0.3}
            style={styles.name}
          />
          <PulsingAmpersand />
          <AnimatedText
            text="Vivo"
            delay={0.7}
            style={styles.name}
          />
        </div>

        {/* "are getting married" */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 1.6, ease: [0.22, 1, 0.36, 1] }}
          style={styles.subtitle}
        >
          are getting married
        </motion.div>

        {/* date badge */}
        <DateBadge>August 30, 2026</DateBadge>

        {/* scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 3 }}
          style={styles.scrollHint}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <svg width="28" height="44" viewBox="0 0 28 44" fill="none">
              <rect
                x="1" y="1" width="26" height="42" rx="13"
                stroke={C.sageLight}
                strokeWidth="1.5"
                opacity="0.6"
              />
              <motion.circle
                cx="14" cy="14" r="3"
                fill={C.sage}
                opacity="0.7"
                animate={{ cy: [12, 22, 12] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
              />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ──────────────────────────── styles ──────────────────────────── */
const styles = {
  section: {
    position: 'relative',
    width: '100%',
    minHeight: '100vh',
    height: '100vh',
    overflow: 'hidden',
    background: C.cream,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  gradientLayer: {
    position: 'absolute',
    inset: 0,
    background: [
      `radial-gradient(ellipse 80% 60% at 20% 25%, ${C.sagePale}88 0%, transparent 70%)`,
      `radial-gradient(ellipse 70% 55% at 80% 30%, ${C.hydrangeaPale}77 0%, transparent 65%)`,
      `radial-gradient(ellipse 60% 50% at 50% 75%, ${C.goldPale}66 0%, transparent 60%)`,
      `radial-gradient(ellipse 90% 70% at 50% 50%, ${C.cream}cc 0%, transparent 80%)`,
      `radial-gradient(ellipse 40% 35% at 15% 70%, ${C.hydrangeaPale}55 0%, transparent 55%)`,
      `radial-gradient(ellipse 45% 40% at 85% 75%, ${C.sagePale}55 0%, transparent 55%)`,
    ].join(', '),
    pointerEvents: 'none',
  },

  leftPainting: {
    position: 'absolute',
    left: '-6%',
    top: '8%',
    width: 'clamp(220px, 32vw, 480px)',
    zIndex: 1,
    pointerEvents: 'none',
    willChange: 'transform',
  },
  leftPaintingImg: {
    width: '100%',
    height: 'auto',
    opacity: 0.25,
    transform: 'rotate(-4deg)',
    borderRadius: '30% 50% 40% 60% / 50% 40% 60% 30%',
    maskImage: 'radial-gradient(ellipse 85% 85% at 50% 50%, black 40%, transparent 75%)',
    WebkitMaskImage: 'radial-gradient(ellipse 85% 85% at 50% 50%, black 40%, transparent 75%)',
    filter: 'saturate(0.7) brightness(1.1)',
  },

  rightPainting: {
    position: 'absolute',
    right: '-6%',
    top: '12%',
    width: 'clamp(200px, 30vw, 440px)',
    zIndex: 1,
    pointerEvents: 'none',
    willChange: 'transform',
  },
  rightPaintingImg: {
    width: '100%',
    height: 'auto',
    opacity: 0.2,
    transform: 'rotate(3deg)',
    borderRadius: '50% 30% 60% 40% / 40% 60% 30% 50%',
    maskImage: 'radial-gradient(ellipse 85% 85% at 50% 50%, black 40%, transparent 75%)',
    WebkitMaskImage: 'radial-gradient(ellipse 85% 85% at 50% 50%, black 40%, transparent 75%)',
    filter: 'saturate(0.65) brightness(1.1)',
  },

  vignette: {
    position: 'absolute',
    inset: 0,
    background: `radial-gradient(ellipse 70% 65% at 50% 50%, transparent 40%, ${C.cream}ee 100%)`,
    pointerEvents: 'none',
    zIndex: 2,
  },

  content: {
    position: 'relative',
    zIndex: 3,
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 1.5rem',
    willChange: 'transform',
  },

  namesRow: {
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: '0',
  },

  name: {
    fontFamily: "'Pinyon Script', cursive",
    fontSize: 'clamp(5rem, 14vw, 11rem)',
    color: C.sage,
    lineHeight: 0.9,
    letterSpacing: '-0.01em',
    textShadow: `0 2px 30px ${C.sagePale}, 0 0 60px ${C.cream}`,
  },

  subtitle: {
    fontFamily: "'Pinyon Script', cursive",
    fontSize: 'clamp(1.5rem, 4vw, 2.8rem)',
    color: C.textLight,
    marginTop: 'clamp(0.2rem, 1vw, 0.6rem)',
    letterSpacing: '0.04em',
    textShadow: `0 1px 12px ${C.cream}`,
  },

  scrollHint: {
    position: 'absolute',
    bottom: '-12vh',
    left: '50%',
    transform: 'translateX(-50%)',
  },
};
