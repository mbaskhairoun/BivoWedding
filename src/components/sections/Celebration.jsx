import { motion } from 'framer-motion';
import { staggerContainer, fadeUp } from '../../utils/animations';

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

/* ──────────────────────────── blob border-radius variants ──────────────────────────── */
const BLOB_RADII = {
  1: '52% 48% 45% 55% / 46% 54% 46% 54%',
  2: '48% 52% 55% 45% / 54% 46% 54% 46%',
  3: '55% 45% 48% 52% / 45% 55% 50% 50%',
};

const BLOB_HOVER_RADII = {
  1: '48% 52% 55% 45% / 54% 46% 54% 46%',
  2: '55% 45% 48% 52% / 45% 55% 50% 50%',
  3: '52% 48% 45% 55% / 46% 54% 46% 54%',
};

/* ──────────────────────────── CursiveHeading ──────────────────────────── */
const CursiveHeading = ({ title, subtitle }) => (
  <motion.div
    variants={fadeUp}
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

/* ──────────────────────────── SVG icons (organic, no straight lines) ──────────────────────────── */

/* Gazebo icon - arched top with organic columns and flowing roof */
const GazeboIcon = () => (
  <svg viewBox="0 0 80 80" width="60" height="60" fill="none" style={{ margin: '0 auto 1rem', display: 'block' }}>
    {/* dome / roof - organic arch */}
    <path
      d="M12 42 C12 18, 26 6, 40 6 C54 6, 68 18, 68 42"
      stroke={C.hydrangea}
      strokeWidth="2"
      strokeLinecap="round"
      fill="none"
    />
    {/* roof peak ornament */}
    <circle cx="40" cy="6" r="2.5" fill={C.hydrangeaLight} opacity="0.7" />
    {/* left column - slightly curved */}
    <path
      d="M18 42 C17 50, 17 60, 18 72"
      stroke={C.sageLight}
      strokeWidth="2"
      strokeLinecap="round"
    />
    {/* right column - slightly curved */}
    <path
      d="M62 42 C63 50, 63 60, 62 72"
      stroke={C.sageLight}
      strokeWidth="2"
      strokeLinecap="round"
    />
    {/* center column */}
    <path
      d="M40 32 C40 45, 40 58, 40 72"
      stroke={C.sageLight}
      strokeWidth="1.5"
      strokeLinecap="round"
      opacity="0.5"
    />
    {/* base - organic curve */}
    <path
      d="M10 72 C22 70, 58 70, 70 72"
      stroke={C.sage}
      strokeWidth="2"
      strokeLinecap="round"
    />
    {/* draped garland left */}
    <path
      d="M18 42 C24 48, 32 48, 40 42"
      stroke={C.hydrangeaPale}
      strokeWidth="1.5"
      strokeLinecap="round"
      opacity="0.6"
    />
    {/* draped garland right */}
    <path
      d="M40 42 C48 48, 56 48, 62 42"
      stroke={C.hydrangeaPale}
      strokeWidth="1.5"
      strokeLinecap="round"
      opacity="0.6"
    />
    {/* hydrangea cluster on top */}
    {[[34, 16], [40, 13], [46, 16], [37, 20], [43, 20]].map(([cx, cy], i) => (
      <circle
        key={i}
        cx={cx}
        cy={cy}
        r={2.5 + (i % 2)}
        fill={i % 2 === 0 ? C.hydrangeaLight : C.hydrangeaPale}
        opacity={0.5 + i * 0.08}
      />
    ))}
  </svg>
);

/* Draped pavilion - tent with flowing fabric */
const PavilionIcon = () => (
  <svg viewBox="0 0 80 80" width="60" height="60" fill="none" style={{ margin: '0 auto 1rem', display: 'block' }}>
    {/* tent top - flowing peak */}
    <path
      d="M8 58 C16 30, 30 12, 40 8 C50 12, 64 30, 72 58"
      stroke={C.hydrangea}
      strokeWidth="2"
      strokeLinecap="round"
      fill="none"
    />
    {/* drape left */}
    <path
      d="M8 58 C12 52, 18 56, 22 50 C26 44, 30 48, 34 42"
      stroke={C.hydrangeaPale}
      strokeWidth="1.5"
      strokeLinecap="round"
      opacity="0.6"
    />
    {/* drape right */}
    <path
      d="M72 58 C68 52, 62 56, 58 50 C54 44, 50 48, 46 42"
      stroke={C.hydrangeaPale}
      strokeWidth="1.5"
      strokeLinecap="round"
      opacity="0.6"
    />
    {/* center drape fold */}
    <path
      d="M34 42 C36 46, 38 38, 40 42 C42 38, 44 46, 46 42"
      stroke={C.sageLight}
      strokeWidth="1.2"
      strokeLinecap="round"
      opacity="0.5"
    />
    {/* pinnacle ornament */}
    <circle cx="40" cy="8" r="2.5" fill={C.goldSoft} opacity="0.6" />
    {/* base curve */}
    <path
      d="M6 60 C20 56, 60 56, 74 60"
      stroke={C.sage}
      strokeWidth="2"
      strokeLinecap="round"
    />
    {/* left tie-back */}
    <path
      d="M14 56 C10 62, 8 68, 10 74"
      stroke={C.sageLight}
      strokeWidth="1.5"
      strokeLinecap="round"
      opacity="0.5"
    />
    {/* right tie-back */}
    <path
      d="M66 56 C70 62, 72 68, 70 74"
      stroke={C.sageLight}
      strokeWidth="1.5"
      strokeLinecap="round"
      opacity="0.5"
    />
    {/* small flower clusters */}
    {[[20, 52], [60, 52], [40, 36]].map(([cx, cy], i) => (
      <circle
        key={i}
        cx={cx}
        cy={cy}
        r={2}
        fill={i === 2 ? C.goldPale : C.hydrangeaPale}
        opacity="0.6"
      />
    ))}
  </svg>
);

/* Reception table with flowers - organic curves */
const ReceptionIcon = () => (
  <svg viewBox="0 0 80 80" width="60" height="60" fill="none" style={{ margin: '0 auto 1rem', display: 'block' }}>
    {/* tablecloth - flowing organic shape */}
    <path
      d="M12 50 C12 46, 18 42, 40 42 C62 42, 68 46, 68 50 C68 56, 60 62, 40 62 C20 62, 12 56, 12 50Z"
      fill={C.sagePale}
      opacity="0.4"
      stroke={C.sageLight}
      strokeWidth="1.5"
    />
    {/* tablecloth drape */}
    <path
      d="M18 56 C24 66, 32 70, 40 70 C48 70, 56 66, 62 56"
      stroke={C.sageLight}
      strokeWidth="1.2"
      strokeLinecap="round"
      opacity="0.5"
    />
    {/* vase - organic blob */}
    <path
      d="M36 42 C35 36, 36 30, 38 28 C39 27, 41 27, 42 28 C44 30, 45 36, 44 42"
      fill={C.hydrangeaPale}
      opacity="0.6"
      stroke={C.hydrangea}
      strokeWidth="1"
    />
    {/* flower stems - curving */}
    <path d="M40 28 C38 22, 34 18, 30 14" stroke={C.sageLight} strokeWidth="1.2" strokeLinecap="round" />
    <path d="M40 28 C40 20, 40 16, 40 10" stroke={C.sageLight} strokeWidth="1.2" strokeLinecap="round" />
    <path d="M40 28 C42 22, 46 18, 50 14" stroke={C.sageLight} strokeWidth="1.2" strokeLinecap="round" />
    {/* hydrangea blooms on stems */}
    {[[30, 14], [40, 10], [50, 14]].map(([cx, cy], i) => (
      <g key={i}>
        <circle cx={cx} cy={cy} r="4" fill={C.hydrangeaLight} opacity="0.6" />
        <circle cx={cx - 2} cy={cy - 1} r="2.5" fill={C.hydrangea} opacity="0.5" />
        <circle cx={cx + 2} cy={cy + 1} r="2.5" fill={C.hydrangeaPale} opacity="0.7" />
        <circle cx={cx} cy={cy - 2.5} r="2" fill={C.hydrangeaLight} opacity="0.5" />
      </g>
    ))}
    {/* candles on table */}
    <path d="M24 42 C24 38, 24.5 36, 25 34" stroke={C.goldSoft} strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
    <circle cx="25" cy="33" r="1.5" fill={C.goldPale} opacity="0.7" />
    <path d="M56 42 C56 38, 55.5 36, 55 34" stroke={C.goldSoft} strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
    <circle cx="55" cy="33" r="1.5" fill={C.goldPale} opacity="0.7" />
  </svg>
);

const EVENT_ICONS = [GazeboIcon, PavilionIcon, ReceptionIcon];

/* ──────────────────────────── BlobCard ──────────────────────────── */
const BlobCard = ({ variant = 1, icon: Icon, title, time, venue, note }) => (
  <motion.div
    variants={fadeUp}
    style={{
      position: 'relative',
      padding: 'clamp(2rem, 4vw, 3rem)',
      background: `linear-gradient(135deg, ${C.cream}, rgba(255,255,255,0.85))`,
      borderRadius: BLOB_RADII[variant],
      boxShadow: `0 8px 40px rgba(143,170,140,0.12), 0 2px 12px rgba(123,167,194,0.08)`,
      textAlign: 'center',
      overflow: 'hidden',
      cursor: 'default',
      transition: 'border-radius 0.5s ease, transform 0.5s ease, box-shadow 0.5s ease',
    }}
    whileHover={{
      borderRadius: BLOB_HOVER_RADII[variant],
      y: -8,
      boxShadow: `0 16px 56px rgba(143,170,140,0.18), 0 4px 20px rgba(123,167,194,0.12)`,
    }}
    transition={{ duration: 0.5, ease: 'easeOut' }}
  >
    {/* watercolor wash behind */}
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: variant === 1
          ? `radial-gradient(ellipse 80% 70% at 30% 20%, ${C.hydrangeaPale}44 0%, transparent 70%)`
          : variant === 2
          ? `radial-gradient(ellipse 70% 80% at 70% 30%, ${C.sagePale}44 0%, transparent 70%)`
          : `radial-gradient(ellipse 75% 75% at 50% 70%, ${C.goldPale}44 0%, transparent 70%)`,
        pointerEvents: 'none',
      }}
    />

    {/* icon */}
    <div style={{ position: 'relative', zIndex: 1 }}>
      <Icon />
    </div>

    {/* title */}
    <h3
      style={{
        position: 'relative',
        zIndex: 1,
        fontFamily: "'Pinyon Script', cursive",
        fontSize: '2rem',
        color: C.sage,
        marginBottom: '0.8rem',
        lineHeight: 1.2,
      }}
    >
      {title}
    </h3>

    {/* time */}
    <p
      style={{
        position: 'relative',
        zIndex: 1,
        fontFamily: "'Cormorant Garamond', serif",
        fontWeight: 500,
        fontSize: 'clamp(1rem, 1.8vw, 1.2rem)',
        color: C.hydrangea,
        marginBottom: '0.4rem',
        letterSpacing: '0.04em',
      }}
    >
      {time}
    </p>

    {/* venue */}
    <p
      style={{
        position: 'relative',
        zIndex: 1,
        fontFamily: "'Josefin Sans', sans-serif",
        fontWeight: 300,
        fontSize: 'clamp(0.85rem, 1.4vw, 1rem)',
        color: C.text,
        marginBottom: '0.6rem',
      }}
    >
      {venue}
    </p>

    {/* note */}
    <p
      style={{
        position: 'relative',
        zIndex: 1,
        fontFamily: "'Cormorant Garamond', serif",
        fontStyle: 'italic',
        fontSize: 'clamp(0.8rem, 1.3vw, 0.95rem)',
        color: C.textLight,
        opacity: 0.8,
      }}
    >
      {note}
    </p>
  </motion.div>
);

/* ──────────────────────────── event data ──────────────────────────── */
const EVENTS = [
  {
    variant: 1,
    icon: EVENT_ICONS[0],
    title: 'Ceremony',
    time: '3:00 in the Afternoon',
    venue: 'The Garden Gazebo',
    note: 'Please be seated by 2:45 PM',
  },
  {
    variant: 2,
    icon: EVENT_ICONS[1],
    title: 'Cocktail Hour',
    time: '4:00 in the Afternoon',
    venue: 'The Draped Pavilion',
    note: 'Drinks, canap\u00e9s & garden views',
  },
  {
    variant: 3,
    icon: EVENT_ICONS[2],
    title: 'Reception',
    time: '5:30 in the Evening',
    venue: 'Under the Grand Tent',
    note: 'Dinner, toasts & dancing until midnight',
  },
];

/* ════════════════════════════════════════════════════════════════════
   CELEBRATION COMPONENT
   ════════════════════════════════════════════════════════════════════ */
export default function Celebration() {
  return (
    <section
      id="details"
      style={{
        position: 'relative',
        padding: 'clamp(4rem, 10vw, 8rem) clamp(1.5rem, 5vw, 4rem)',
        background: C.cream,
        overflow: 'hidden',
      }}
    >
      {/* subtle background watercolor wash */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: [
            `radial-gradient(ellipse 60% 50% at 20% 30%, ${C.hydrangeaPale}33 0%, transparent 70%)`,
            `radial-gradient(ellipse 50% 60% at 80% 70%, ${C.sagePale}33 0%, transparent 70%)`,
            `radial-gradient(ellipse 70% 40% at 50% 50%, ${C.goldPale}22 0%, transparent 60%)`,
          ].join(', '),
          pointerEvents: 'none',
        }}
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        style={{ position: 'relative', zIndex: 1, maxWidth: '1100px', margin: '0 auto' }}
      >
        {/* heading */}
        <CursiveHeading title="The Celebration" subtitle="Join us for a day of love" />

        {/* event cards grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 'clamp(1.5rem, 3vw, 2.5rem)',
            marginBottom: 'clamp(3rem, 6vw, 5rem)',
          }}
        >
          {EVENTS.map((event, i) => (
            <BlobCard key={i} {...event} />
          ))}
        </div>

        {/* venue info */}
        <motion.div
          variants={fadeUp}
          style={{
            textAlign: 'center',
            position: 'relative',
          }}
        >
          {/* decorative vine above venue */}
          <svg
            viewBox="0 0 300 30"
            width="min(300px, 60vw)"
            style={{ margin: '0 auto 1.5rem', display: 'block' }}
          >
            <path
              d="M20 15 C60 5, 100 25, 150 15 C200 5, 240 25, 280 15"
              stroke={C.sageLight}
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="none"
              opacity="0.5"
            />
            {[60, 110, 150, 190, 240].map((x, i) => (
              <circle
                key={i}
                cx={x}
                cy={i % 2 === 0 ? 12 : 18}
                r="2.5"
                fill={i % 2 === 0 ? C.hydrangeaLight : C.hydrangeaPale}
                opacity="0.5"
              />
            ))}
          </svg>

          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: 'italic',
              fontSize: 'clamp(1.3rem, 3vw, 2rem)',
              color: C.text,
              marginBottom: '0.4rem',
              letterSpacing: '0.04em',
            }}
          >
            The Botanical Garden Estate
          </p>
          <p
            style={{
              fontFamily: "'Josefin Sans', sans-serif",
              fontWeight: 300,
              fontSize: 'clamp(0.8rem, 1.4vw, 1rem)',
              color: C.textLight,
              letterSpacing: '0.08em',
            }}
          >
            1234 Garden Lane, Somewhere Beautiful
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
