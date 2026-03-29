import React from 'react';
import { motion } from 'framer-motion';

/**
 * Organic blob-shaped card with hover morphing animation.
 * Props:
 *   children: React node
 *   className: string (optional)
 *   variant: 1-4 (default 1) for different blob shapes
 */

// Each variant defines a resting and hover border-radius pair (organic blobs)
const BLOB_SHAPES = {
  1: {
    rest: '62% 38% 46% 54% / 48% 56% 44% 52%',
    hover: '44% 56% 58% 42% / 54% 42% 58% 46%',
    gradient: 'radial-gradient(ellipse at 30% 20%, rgba(143,170,140,0.08) 0%, transparent 60%), radial-gradient(ellipse at 80% 70%, rgba(123,167,194,0.06) 0%, transparent 55%)',
  },
  2: {
    rest: '52% 48% 56% 44% / 42% 58% 38% 62%',
    hover: '58% 42% 44% 56% / 62% 38% 54% 46%',
    gradient: 'radial-gradient(ellipse at 70% 30%, rgba(212,169,169,0.08) 0%, transparent 60%), radial-gradient(ellipse at 20% 80%, rgba(184,169,201,0.06) 0%, transparent 55%)',
  },
  3: {
    rest: '46% 54% 62% 38% / 56% 44% 52% 48%',
    hover: '54% 46% 38% 62% / 48% 52% 46% 54%',
    gradient: 'radial-gradient(ellipse at 50% 20%, rgba(123,167,194,0.08) 0%, transparent 60%), radial-gradient(ellipse at 30% 90%, rgba(143,170,140,0.06) 0%, transparent 55%)',
  },
  4: {
    rest: '58% 42% 48% 52% / 44% 56% 62% 38%',
    hover: '42% 58% 52% 48% / 56% 44% 38% 62%',
    gradient: 'radial-gradient(ellipse at 80% 20%, rgba(201,183,126,0.08) 0%, transparent 60%), radial-gradient(ellipse at 20% 70%, rgba(212,169,169,0.06) 0%, transparent 55%)',
  },
};

const BlobCard = ({ children, className = '', variant = 1 }) => {
  const blob = BLOB_SHAPES[variant] || BLOB_SHAPES[1];

  const cardStyle = {
    position: 'relative',
    background: `rgba(255,255,255,0.5)`,
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    border: '1px solid rgba(143,170,140,0.2)',
    padding: 'clamp(1.5rem, 3vw, 2.5rem)',
    overflow: 'hidden',
    cursor: 'default',
  };

  // Watercolor gradient overlay
  const overlayStyle = {
    position: 'absolute',
    inset: 0,
    background: blob.gradient,
    pointerEvents: 'none',
    borderRadius: 'inherit',
    zIndex: 0,
  };

  const contentStyle = {
    position: 'relative',
    zIndex: 1,
  };

  return (
    <motion.div
      className={className}
      style={cardStyle}
      initial={{
        opacity: 0,
        scale: 0.88,
        borderRadius: blob.rest,
      }}
      whileInView={{
        opacity: 1,
        scale: 1,
        borderRadius: blob.rest,
      }}
      whileHover={{
        borderRadius: blob.hover,
        y: -8,
        boxShadow:
          '0 20px 56px rgba(109,125,106,0.12), 0 8px 24px rgba(143,170,140,0.08)',
      }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        type: 'spring',
        damping: 22,
        stiffness: 150,
        mass: 0.9,
        borderRadius: { type: 'spring', damping: 18, stiffness: 100 },
      }}
    >
      <div style={overlayStyle} />
      <div style={contentStyle}>{children}</div>
    </motion.div>
  );
};

export default BlobCard;
