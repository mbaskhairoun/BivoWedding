import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ParallaxPainting from '../effects/ParallaxPainting';
import CursiveHeading from '../ui/CursiveHeading';

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

/* ──────────────── petal burst effect ──────────────── */
const petalColors = [C.hydrangea, '#a8cfe0', '#d6eaf5', C.sage, '#b5ccb2', '#dfe9dc'];

const PetalBurst = () => (
  <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'visible' }}>
    {Array.from({ length: 18 }).map((_, i) => {
      const angle = (i / 18) * 360;
      const distance = 60 + Math.random() * 80;
      const rad = (angle * Math.PI) / 180;
      return (
        <motion.div
          key={i}
          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
          animate={{
            x: Math.cos(rad) * distance,
            y: Math.sin(rad) * distance,
            opacity: 0,
            scale: 0.3,
          }}
          transition={{ duration: 1.2 + Math.random() * 0.6, ease: 'easeOut' }}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: 8 + Math.random() * 6,
            height: 8 + Math.random() * 6,
            borderRadius: '50% 40% 55% 45%',
            background: petalColors[i % petalColors.length],
            marginLeft: -5,
            marginTop: -5,
          }}
        />
      );
    })}
  </div>
);

/* ──────────────── stagger container ──────────────── */
const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ──────────────── shared input style ──────────────── */
const inputBase = {
  width: '100%',
  fontFamily: "'Cormorant Garamond', serif",
  fontSize: 'clamp(1rem, 2vw, 1.15rem)',
  color: C.text,
  background: 'rgba(253,249,240,0.65)',
  border: `1.5px solid rgba(143,170,140,0.3)`,
  borderRadius: '30px 24px 30px 24px',
  padding: '0.85rem 1.4rem',
  outline: 'none',
  transition: 'border-color 0.3s, box-shadow 0.3s',
  boxSizing: 'border-box',
};

const focusRing = {
  borderColor: C.sage,
  boxShadow: `0 0 0 4px rgba(143,170,140,0.18), 0 0 20px rgba(143,170,140,0.08)`,
};

/* ──────────────── custom input wrapper with focus ──────────────── */
function StyledInput({ type = 'text', placeholder, value, onChange, name }) {
  const [focused, setFocused] = React.useState(false);
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={{
        ...inputBase,
        ...(focused ? focusRing : {}),
      }}
    />
  );
}

function StyledTextarea({ placeholder, value, onChange, name }) {
  const [focused, setFocused] = React.useState(false);
  return (
    <textarea
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      rows={4}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={{
        ...inputBase,
        resize: 'vertical',
        minHeight: '100px',
        ...(focused ? focusRing : {}),
      }}
    />
  );
}

function StyledSelect({ value, onChange, name, children }) {
  const [focused, setFocused] = React.useState(false);
  return (
    <select
      name={name}
      value={value}
      onChange={onChange}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={{
        ...inputBase,
        appearance: 'none',
        WebkitAppearance: 'none',
        cursor: 'pointer',
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' fill='none' stroke='%238faa8c' stroke-width='1.5'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right 1.2rem center',
        paddingRight: '2.8rem',
        ...(focused ? focusRing : {}),
      }}
    >
      {children}
    </select>
  );
}

/* ════════════════════════════════════════════════════════════════════
   RSVP COMPONENT
   ════════════════════════════════════════════════════════════════════ */
export default function RSVP() {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    attending: '',
    guests: '1',
    dietary: '',
    note: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="rsvp" style={styles.section}>
      {/* watercolor gradient background */}
      <div style={styles.gradientLayer} />

      {/* left parallax painting */}
      <ParallaxPainting
        src="/inspo/WhatsApp Image 2026-03-29 at 7.05.49 PM.jpeg"
        speed={0.25}
        rotation={-3}
        style={{
          left: '-4%',
          top: '6%',
          width: 'clamp(200px, 30vw, 440px)',
          opacity: 0.2,
          borderRadius: '50% 40% 55% 45% / 45% 55% 40% 50%',
          maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 35%, transparent 72%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 35%, transparent 72%)',
          filter: 'saturate(0.7) brightness(1.1)',
        }}
      />

      {/* content */}
      <div style={styles.content}>
        <CursiveHeading text="RSVP" subtitle="We hope you can make it" />

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          style={styles.deadline}
        >
          Kindly respond by August 1, 2026
        </motion.p>

        <motion.form
          onSubmit={handleSubmit}
          style={styles.form}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
        >
          {/* Full Name */}
          <motion.div variants={fadeUp} style={styles.fieldWrap}>
            <label style={styles.label}>Full Name</label>
            <StyledInput
              name="fullName"
              placeholder="Your full name"
              value={form.fullName}
              onChange={handleChange}
            />
          </motion.div>

          {/* Email */}
          <motion.div variants={fadeUp} style={styles.fieldWrap}>
            <label style={styles.label}>Email</label>
            <StyledInput
              type="email"
              name="email"
              placeholder="your@email.com"
              value={form.email}
              onChange={handleChange}
            />
          </motion.div>

          {/* Will you attend? */}
          <motion.div variants={fadeUp} style={styles.fieldWrap}>
            <label style={styles.label}>Will you attend?</label>
            <div style={styles.radioGroup}>
              {[
                { value: 'accepts', label: 'Joyfully accepts' },
                { value: 'declines', label: 'Regretfully declines' },
              ].map((opt) => (
                <label key={opt.value} style={styles.radioLabel}>
                  <input
                    type="radio"
                    name="attending"
                    value={opt.value}
                    checked={form.attending === opt.value}
                    onChange={handleChange}
                    style={{ display: 'none' }}
                  />
                  <span
                    style={{
                      ...styles.radioBtn,
                      ...(form.attending === opt.value ? styles.radioBtnActive : {}),
                    }}
                  >
                    {form.attending === opt.value && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        style={styles.radioDot}
                      />
                    )}
                  </span>
                  <span style={styles.radioText}>{opt.label}</span>
                </label>
              ))}
            </div>
          </motion.div>

          {/* Number of Guests */}
          <motion.div variants={fadeUp} style={styles.fieldWrap}>
            <label style={styles.label}>Number of Guests</label>
            <StyledSelect name="guests" value={form.guests} onChange={handleChange}>
              {[1, 2, 3, 4].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </StyledSelect>
          </motion.div>

          {/* Dietary Requirements */}
          <motion.div variants={fadeUp} style={styles.fieldWrap}>
            <label style={styles.label}>Dietary Requirements</label>
            <StyledInput
              name="dietary"
              placeholder="Any dietary needs or allergies"
              value={form.dietary}
              onChange={handleChange}
            />
          </motion.div>

          {/* A Note to the Couple */}
          <motion.div variants={fadeUp} style={styles.fieldWrap}>
            <label style={styles.label}>A Note to the Couple</label>
            <StyledTextarea
              name="note"
              placeholder="Share your love and well wishes..."
              value={form.note}
              onChange={handleChange}
            />
          </motion.div>

          {/* Submit button */}
          <motion.div variants={fadeUp} style={{ position: 'relative', display: 'inline-block', alignSelf: 'center' }}>
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.button
                  key="submit"
                  type="submit"
                  style={styles.submitBtn}
                  whileHover={{ scale: 1.04, boxShadow: `0 8px 32px rgba(143,170,140,0.25)` }}
                  whileTap={{ scale: 0.97 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                >
                  Send RSVP
                </motion.button>
              ) : (
                <motion.div
                  key="thanks"
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', damping: 14, stiffness: 160 }}
                  style={styles.thankYouBtn}
                >
                  Thank You!
                  <PetalBurst />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.form>
      </div>
    </section>
  );
}

/* ──────────────── styles ──────────────── */
const styles = {
  section: {
    position: 'relative',
    width: '100%',
    minHeight: '100vh',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 'clamp(3rem, 8vw, 6rem) 1.5rem',
    boxSizing: 'border-box',
  },

  gradientLayer: {
    position: 'absolute',
    inset: 0,
    background: [
      `radial-gradient(ellipse 80% 70% at 25% 30%, rgba(143,170,140,0.12) 0%, transparent 65%)`,
      `radial-gradient(ellipse 70% 60% at 75% 60%, rgba(123,167,194,0.10) 0%, transparent 60%)`,
      `radial-gradient(ellipse 90% 80% at 50% 50%, rgba(253,249,240,0.9) 0%, transparent 80%)`,
      `radial-gradient(ellipse 50% 40% at 20% 80%, rgba(240,228,191,0.12) 0%, transparent 55%)`,
    ].join(', '),
    pointerEvents: 'none',
  },

  content: {
    position: 'relative',
    zIndex: 2,
    width: '100%',
    maxWidth: '560px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  deadline: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 'clamp(0.95rem, 2vw, 1.15rem)',
    fontStyle: 'italic',
    color: C.textLight,
    letterSpacing: '0.12em',
    marginTop: '0.6rem',
    marginBottom: 'clamp(1.5rem, 4vw, 2.5rem)',
    textAlign: 'center',
  },

  form: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: 'clamp(1rem, 2.5vw, 1.4rem)',
  },

  fieldWrap: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.4rem',
  },

  label: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 'clamp(0.85rem, 1.8vw, 1rem)',
    fontWeight: 600,
    color: C.text,
    letterSpacing: '0.08em',
    paddingLeft: '0.4rem',
  },

  radioGroup: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '1rem',
    paddingTop: '0.3rem',
  },

  radioLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    cursor: 'pointer',
  },

  radioBtn: {
    width: 22,
    height: 22,
    borderRadius: '50% 45% 50% 45%',
    border: `1.5px solid rgba(143,170,140,0.4)`,
    background: 'rgba(253,249,240,0.6)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'border-color 0.3s, box-shadow 0.3s',
    flexShrink: 0,
  },

  radioBtnActive: {
    borderColor: C.sage,
    boxShadow: `0 0 0 3px rgba(143,170,140,0.15)`,
  },

  radioDot: {
    display: 'block',
    width: 10,
    height: 10,
    borderRadius: '50% 42% 50% 42%',
    background: C.sage,
  },

  radioText: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
    color: C.text,
  },

  submitBtn: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 'clamp(1.05rem, 2.2vw, 1.25rem)',
    fontWeight: 600,
    letterSpacing: '0.14em',
    color: '#fff',
    background: C.sage,
    border: 'none',
    borderRadius: '50px 45px 50px 45px',
    padding: '0.9rem 2.8rem',
    cursor: 'pointer',
    boxShadow: '0 4px 20px rgba(143,170,140,0.2)',
    transition: 'background 0.3s',
  },

  thankYouBtn: {
    position: 'relative',
    fontFamily: "'Pinyon Script', cursive",
    fontSize: 'clamp(1.4rem, 3vw, 1.8rem)',
    color: '#fff',
    background: C.hydrangea,
    borderRadius: '50px 45px 50px 45px',
    padding: '0.9rem 2.8rem',
    display: 'inline-block',
    boxShadow: '0 4px 24px rgba(123,167,194,0.3)',
    overflow: 'visible',
  },
};
