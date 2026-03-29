import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCreative, Navigation, Pagination } from 'swiper/modules';
import { useState } from 'react';
import ParallaxPainting from '../effects/ParallaxPainting';

import 'swiper/css';
import 'swiper/css/effect-creative';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

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

/* ──────────────────────────── CursiveHeading ──────────────────────────── */
const CursiveHeading = ({ title, subtitle }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
    style={{
      textAlign: 'center',
      marginBottom: 'clamp(2rem, 5vw, 4rem)',
    }}
  >
    <h2
      style={{
        fontFamily: "'Pinyon Script', cursive",
        fontSize: 'clamp(3rem, 8vw, 6rem)',
        color: C.sage,
        lineHeight: 1.1,
        marginBottom: '0.4em',
        textShadow: `0 2px 30px ${C.sagePale}`,
      }}
    >
      {title}
    </h2>
    {subtitle && (
      <p
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: 'italic',
          fontSize: 'clamp(1rem, 2.2vw, 1.5rem)',
          color: C.textLight,
          letterSpacing: '0.06em',
        }}
      >
        {subtitle}
      </p>
    )}
  </motion.div>
);

/* ──────────────────────────── slide gradient backgrounds ──────────────────────────── */
const SLIDE_GRADIENTS = [
  `radial-gradient(ellipse 80% 70% at 30% 40%, ${C.hydrangeaPale} 0%, ${C.hydrangeaLight}55 40%, ${C.cream} 100%)`,
  `radial-gradient(ellipse 70% 80% at 60% 30%, ${C.sagePale} 0%, ${C.sageLight}55 40%, ${C.cream} 100%)`,
  `radial-gradient(ellipse 75% 65% at 40% 60%, ${C.goldPale} 0%, ${C.hydrangeaPale}55 45%, ${C.cream} 100%)`,
  `radial-gradient(ellipse 85% 75% at 70% 50%, ${C.hydrangeaLight}88 0%, ${C.sagePale}55 40%, ${C.cream} 100%)`,
  `radial-gradient(ellipse 65% 85% at 35% 45%, ${C.sageLight}88 0%, ${C.goldPale}55 45%, ${C.cream} 100%)`,
  `radial-gradient(ellipse 80% 80% at 55% 35%, ${C.hydrangeaPale}88 0%, ${C.hydrangeaLight}44 50%, ${C.sagePale}33 100%)`,
];

const SLIDE_BLOB_RADII = [
  '52% 48% 45% 55% / 46% 54% 46% 54%',
  '48% 52% 55% 45% / 54% 46% 54% 46%',
  '55% 45% 48% 52% / 45% 55% 50% 50%',
  '45% 55% 52% 48% / 50% 50% 55% 45%',
  '50% 50% 45% 55% / 48% 52% 46% 54%',
  '53% 47% 50% 50% / 44% 56% 48% 52%',
];

/* ──────────────────────────── organic navigation arrows ──────────────────────────── */
const NavArrow = ({ direction, onClick }) => (
  <motion.button
    onClick={onClick}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.92 }}
    style={{
      position: 'absolute',
      top: '50%',
      [direction === 'prev' ? 'left' : 'right']: 'clamp(0.5rem, 2vw, 1.5rem)',
      transform: 'translateY(-50%)',
      zIndex: 20,
      width: 'clamp(44px, 6vw, 60px)',
      height: 'clamp(44px, 6vw, 60px)',
      borderRadius: direction === 'prev'
        ? '52% 48% 45% 55% / 46% 54% 46% 54%'
        : '48% 52% 55% 45% / 54% 46% 54% 46%',
      background: `rgba(253,249,240,0.82)`,
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      border: `1.5px solid ${C.sageLight}44`,
      boxShadow: `0 4px 20px rgba(143,170,140,0.15)`,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'background 0.3s ease',
    }}
  >
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      {direction === 'prev' ? (
        /* curved left arrow */
        <path
          d="M14 4 C10 6, 6 9, 5 11 C6 13, 10 16, 14 18"
          stroke={C.sage}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      ) : (
        /* curved right arrow */
        <path
          d="M8 4 C12 6, 16 9, 17 11 C16 13, 12 16, 8 18"
          stroke={C.sage}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      )}
    </svg>
  </motion.button>
);

/* ════════════════════════════════════════════════════════════════════
   GALLERY COMPONENT
   ════════════════════════════════════════════════════════════════════ */
export default function Gallery() {
  const [swiperRef, setSwiperRef] = useState(null);

  return (
    <section
      id="gallery"
      style={{
        position: 'relative',
        padding: 'clamp(4rem, 10vw, 8rem) 0',
        background: C.cream,
        overflow: 'hidden',
        minHeight: '100vh',
      }}
    >
      {/* subtle background watercolor wash */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: [
            `radial-gradient(ellipse 55% 50% at 15% 40%, ${C.hydrangeaPale}22 0%, transparent 70%)`,
            `radial-gradient(ellipse 50% 55% at 85% 60%, ${C.sagePale}22 0%, transparent 70%)`,
          ].join(', '),
          pointerEvents: 'none',
        }}
      />

      {/* left edge parallax painting */}
      <ParallaxPainting
        src="/inspo/WhatsApp Image 2026-03-29 at 7.06.07 PM.jpeg"
        speed={0.25}
        rotation={-3}
        style={{
          left: '-4%',
          top: '10%',
          width: 'clamp(180px, 26vw, 380px)',
          opacity: 0.18,
          borderRadius: '50% 40% 55% 45% / 45% 55% 40% 50%',
          maskImage: 'radial-gradient(ellipse 85% 85% at 50% 50%, black 35%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse 85% 85% at 50% 50%, black 35%, transparent 75%)',
          filter: 'saturate(0.6) brightness(1.1)',
        }}
      />

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* heading */}
        <div style={{ padding: '0 clamp(1.5rem, 5vw, 4rem)' }}>
          <CursiveHeading title="Our Moments" subtitle="A glimpse of us" />
        </div>

        {/* carousel container */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          style={{ position: 'relative' }}
        >
          <Swiper
            modules={[EffectCreative, Navigation, Pagination]}
            onSwiper={setSwiperRef}
            effect="creative"
            creativeEffect={{
              prev: { translate: ['-105%', 0, -200], opacity: 0.5, scale: 0.9 },
              next: { translate: ['105%', 0, -200], opacity: 0.5, scale: 0.9 },
            }}
            slidesPerView={1.3}
            centeredSlides
            spaceBetween={30}
            loop
            pagination={{
              clickable: true,
              el: '.gallery-pagination',
              bulletClass: 'gallery-bullet',
              bulletActiveClass: 'gallery-bullet-active',
            }}
            style={{
              padding: 'clamp(1rem, 3vw, 2rem) 0 clamp(3rem, 5vw, 4rem)',
              overflow: 'visible',
            }}
          >
            {SLIDE_GRADIENTS.map((gradient, i) => (
              <SwiperSlide key={i}>
                <div
                  style={{
                    width: '100%',
                    height: 'clamp(350px, 55vh, 600px)',
                    background: gradient,
                    borderRadius: SLIDE_BLOB_RADII[i],
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                    boxShadow: `0 12px 48px rgba(123,167,194,0.15), 0 4px 16px rgba(143,170,140,0.1)`,
                  }}
                >
                  {/* inner watercolor texture overlay */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: `radial-gradient(circle at ${30 + i * 10}% ${40 + i * 5}%, rgba(255,255,255,0.3) 0%, transparent 50%)`,
                      pointerEvents: 'none',
                    }}
                  />
                  <p
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontStyle: 'italic',
                      fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)',
                      color: C.textLight,
                      opacity: 0.6,
                      letterSpacing: '0.08em',
                      position: 'relative',
                      zIndex: 1,
                    }}
                  >
                    Photo {i + 1}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* custom nav arrows */}
          <NavArrow direction="prev" onClick={() => swiperRef?.slidePrev()} />
          <NavArrow direction="next" onClick={() => swiperRef?.slideNext()} />

          {/* custom pagination */}
          <div
            className="gallery-pagination"
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '10px',
              marginTop: '0.5rem',
            }}
          />
        </motion.div>

        {/* note below carousel */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          style={{
            textAlign: 'center',
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            fontSize: 'clamp(0.85rem, 1.5vw, 1.05rem)',
            color: C.textLight,
            opacity: 0.6,
            marginTop: 'clamp(1.5rem, 3vw, 2.5rem)',
            padding: '0 2rem',
          }}
        >
          Replace these placeholders with your favorite photos together
        </motion.p>
      </div>

      {/* ── custom pagination dot styles ── */}
      <style>{`
        .gallery-bullet {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: ${C.sageLight};
          opacity: 0.4;
          cursor: pointer;
          transition: all 0.4s ease;
          display: inline-block;
          border: none;
        }
        .gallery-bullet:hover {
          opacity: 0.7;
          transform: scale(1.2);
        }
        .gallery-bullet-active {
          background: ${C.hydrangea} !important;
          opacity: 1 !important;
          transform: scale(1.3);
          box-shadow: 0 0 12px ${C.hydrangeaLight}88;
        }
      `}</style>
    </section>
  );
}
