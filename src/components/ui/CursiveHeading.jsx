import React from 'react';
import { motion } from 'framer-motion';

/**
 * Animated cursive heading with per-character stagger animation.
 * Props:
 *   text: string (required) - main heading text
 *   subtitle: string (optional) - smaller italic line below
 *   as: string (default 'h2') - HTML element to render
 *   className: string (optional)
 */

const CursiveHeading = ({ text, subtitle, as: Tag = 'h2', className = '' }) => {
  const characters = text.split('');

  const containerStyle = {
    textAlign: 'center',
    perspective: '800px',
    perspectiveOrigin: '50% 50%',
    padding: '0.5rem 0',
  };

  const headingStyle = {
    fontFamily: "'Pinyon Script', cursive",
    fontSize: 'clamp(3rem, 8vw, 5.5rem)',
    color: '#8faa8c',
    fontWeight: 400,
    lineHeight: 1.15,
    margin: 0,
    display: 'inline-flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    letterSpacing: '2px',
    // No text-shadow for clean watercolor feel, but a very subtle one for depth
    textShadow: '0 2px 16px rgba(143,170,140,0.12)',
  };

  const subtitleStyle = {
    fontFamily: "'Cormorant Garamond', serif",
    fontStyle: 'italic',
    fontSize: 'clamp(1rem, 2.5vw, 1.35rem)',
    color: '#7ba7c2',
    fontWeight: 300,
    letterSpacing: '2px',
    marginTop: '0.6rem',
    textAlign: 'center',
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.035,
        delayChildren: 0.1,
      },
    },
  };

  const charVariants = {
    hidden: {
      opacity: 0,
      y: 28,
      rotateX: -60,
      scale: 0.85,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      transition: {
        type: 'spring',
        damping: 18,
        stiffness: 120,
        mass: 0.8,
      },
    },
  };

  const subtitleVariants = {
    hidden: { opacity: 0, y: 14 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: characters.length * 0.035 + 0.2,
        duration: 0.7,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  return (
    <motion.div
      style={containerStyle}
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={containerVariants}
    >
      <Tag style={headingStyle}>
        {characters.map((char, i) => (
          <motion.span
            key={`${char}-${i}`}
            variants={charVariants}
            style={{
              display: 'inline-block',
              transformOrigin: 'bottom center',
              // Preserve whitespace
              whiteSpace: char === ' ' ? 'pre' : 'normal',
              minWidth: char === ' ' ? '0.3em' : undefined,
            }}
          >
            {char}
          </motion.span>
        ))}
      </Tag>

      {subtitle && (
        <motion.p style={subtitleStyle} variants={subtitleVariants}>
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
};

export default CursiveHeading;
