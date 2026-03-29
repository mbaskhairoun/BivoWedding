import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ParallaxPainting from '../effects/ParallaxPainting';
import BlobCard from '../ui/BlobCard';
import CursiveHeading from '../ui/CursiveHeading';

gsap.registerPlugin(ScrollTrigger);

/* ───────────────────────────────────────────────
   Small SVG hydrangea cluster for timeline nodes
   ─────────────────────────────────────────────── */
const HydrangeaCluster = ({ cx, cy }) => {
  const petals = [];
  const colors = ['#7ba7c2', '#9dbdd4', '#a8c4d8', '#8faa8c', '#b8cce0'];
  // 5 petals in a soft cluster
  const offsets = [
    { dx: 0, dy: -7 },
    { dx: 6, dy: -2 },
    { dx: 4, dy: 5 },
    { dx: -4, dy: 5 },
    { dx: -6, dy: -2 },
  ];
  offsets.forEach((o, i) => {
    petals.push(
      <ellipse
        key={i}
        cx={cx + o.dx}
        cy={cy + o.dy}
        rx={5.5}
        ry={4.8}
        fill={colors[i]}
        opacity={0.7}
      />
    );
  });
  // Center dot
  petals.push(
    <circle key="center" cx={cx} cy={cy} r={2.2} fill="#f0e4bf" opacity={0.9} />
  );
  return <g>{petals}</g>;
};

/* ───────────────────────────────────────────────
   Milestone data
   ─────────────────────────────────────────────── */
const milestones = [
  {
    title: 'The Beginning',
    body: 'Some love stories start with a grand gesture. Ours started with a smile, a conversation that never seemed to end...',
    direction: 'left',
    variant: 1,
  },
  {
    title: 'Growing Together',
    body: 'Through every season, every adventure, and every quiet evening at home, our love has grown deeper and stronger.',
    direction: 'right',
    variant: 2,
  },
  {
    title: 'The Proposal',
    body: 'And then came the question that changed everything. Under a canopy of stars, one knee, one ring, one forever yes.',
    direction: 'left',
    variant: 3,
  },
];

/* ───────────────────────────────────────────────
   The organic vine SVG path (curvy, NOT straight)
   Three nodes at roughly 20%, 50%, 80% vertically
   ─────────────────────────────────────────────── */
const VINE_PATH =
  'M 150,0 C 130,60 170,100 150,160 C 130,220 170,260 150,320 C 130,380 170,420 150,480 C 130,540 170,580 150,640 C 130,700 170,740 150,800';

// Y positions of the three milestone nodes along the vine
const NODE_Y = [160, 480, 800];

export default function OurStory() {
  const sectionRef = useRef(null);
  const pathRef = useRef(null);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    const length = path.getTotalLength();
    // Set up the dash for draw-on effect
    gsap.set(path, {
      strokeDasharray: length,
      strokeDashoffset: length,
    });

    const ctx = gsap.context(() => {
      gsap.to(path, {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          end: 'bottom 30%',
          scrub: 0.8,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="our-story"
      ref={sectionRef}
      style={{
        position: 'relative',
        overflow: 'hidden',
        padding: 'clamp(4rem, 10vw, 8rem) clamp(1.2rem, 5vw, 4rem)',
        background: '#fdf9f0',
        minHeight: '100vh',
      }}
    >
      {/* ── Watercolor radial gradient backgrounds ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background: `
            radial-gradient(ellipse 60% 40% at 15% 20%, rgba(123,167,194,0.10) 0%, transparent 70%),
            radial-gradient(ellipse 50% 50% at 80% 70%, rgba(143,170,140,0.09) 0%, transparent 65%),
            radial-gradient(ellipse 70% 30% at 50% 50%, rgba(240,228,191,0.08) 0%, transparent 60%)
          `,
        }}
      />

      {/* ── Parallax painting: aerial gazebo on right edge ── */}
      <ParallaxPainting
        src="/inspo/WhatsApp Image 2026-03-29 at 7.05.49 PM.jpeg"
        speed={0.25}
        rotation={3}
        style={{
          right: '-4%',
          top: '8%',
          width: 'clamp(220px, 28vw, 420px)',
          opacity: 0.2,
          borderRadius: '48% 52% 44% 56% / 50% 46% 54% 50%',
        }}
      />

      {/* ── Section heading ── */}
      <CursiveHeading text="Our Story" subtitle="How it all began" />

      {/* ── Timeline container ── */}
      <div
        style={{
          position: 'relative',
          maxWidth: '900px',
          margin: '3rem auto 0',
          minHeight: '900px',
        }}
      >
        {/* ── SVG vine timeline ── */}
        <svg
          viewBox="0 0 300 840"
          preserveAspectRatio="xMidYMid meet"
          style={{
            position: 'absolute',
            left: '50%',
            top: 0,
            transform: 'translateX(-50%)',
            width: '300px',
            height: '100%',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        >
          {/* Vine path */}
          <path
            ref={pathRef}
            d={VINE_PATH}
            fill="none"
            stroke="#8faa8c"
            strokeWidth="2.5"
            strokeLinecap="round"
            opacity={0.5}
          />
          {/* Small leaf tendrils along the vine */}
          <path
            d="M 148,80 C 130,75 125,65 132,58"
            fill="none"
            stroke="#8faa8c"
            strokeWidth="1.2"
            opacity={0.3}
            strokeLinecap="round"
          />
          <path
            d="M 152,240 C 170,235 178,225 172,218"
            fill="none"
            stroke="#8faa8c"
            strokeWidth="1.2"
            opacity={0.3}
            strokeLinecap="round"
          />
          <path
            d="M 148,400 C 128,395 122,385 130,378"
            fill="none"
            stroke="#8faa8c"
            strokeWidth="1.2"
            opacity={0.25}
            strokeLinecap="round"
          />
          <path
            d="M 152,560 C 172,555 178,545 170,538"
            fill="none"
            stroke="#8faa8c"
            strokeWidth="1.2"
            opacity={0.25}
            strokeLinecap="round"
          />
          <path
            d="M 148,720 C 128,715 120,705 128,698"
            fill="none"
            stroke="#8faa8c"
            strokeWidth="1.2"
            opacity={0.2}
            strokeLinecap="round"
          />

          {/* Hydrangea clusters at timeline nodes */}
          {NODE_Y.map((y, i) => (
            <HydrangeaCluster key={i} cx={150} cy={y} />
          ))}
        </svg>

        {/* ── Milestone cards ── */}
        <div style={{ position: 'relative', zIndex: 2 }}>
          {milestones.map((ms, i) => {
            const isLeft = ms.direction === 'left';
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: isLeft ? -60 : 60, y: 20 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{
                  duration: 0.9,
                  delay: i * 0.15,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                style={{
                  display: 'flex',
                  justifyContent: isLeft ? 'flex-start' : 'flex-end',
                  paddingTop: i === 0 ? '0' : 'clamp(3rem, 6vw, 5rem)',
                  paddingLeft: isLeft ? '0' : 'clamp(2rem, 12vw, 7rem)',
                  paddingRight: isLeft ? 'clamp(2rem, 12vw, 7rem)' : '0',
                }}
              >
                <BlobCard variant={ms.variant}>
                  <h3
                    style={{
                      fontFamily: "'Pinyon Script', cursive",
                      fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)',
                      color: '#8faa8c',
                      margin: '0 0 0.6rem',
                      fontWeight: 400,
                    }}
                  >
                    {ms.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: 'clamp(1rem, 1.6vw, 1.18rem)',
                      color: '#4a5a47',
                      lineHeight: 1.7,
                      margin: 0,
                      fontStyle: 'italic',
                    }}
                  >
                    {ms.body}
                  </p>
                </BlobCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
