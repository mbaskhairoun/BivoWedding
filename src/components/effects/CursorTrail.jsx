import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';

const TRAIL_COUNT = 8;

const TRAIL_CONFIG = [
  { color: '#a8cfe0', opacity: 0.35, size: 20, stiffness: 300, damping: 20 },
  { color: '#b5ccb2', opacity: 0.30, size: 18, stiffness: 250, damping: 22 },
  { color: '#d6eaf5', opacity: 0.25, size: 16, stiffness: 200, damping: 24 },
  { color: '#dfe9dc', opacity: 0.20, size: 14, stiffness: 160, damping: 26 },
  { color: '#f0e4bf', opacity: 0.15, size: 12, stiffness: 120, damping: 28 },
  { color: '#a8cfe0', opacity: 0.12, size: 10, stiffness: 90,  damping: 30 },
  { color: '#d6eaf5', opacity: 0.08, size: 8,  stiffness: 60,  damping: 32 },
  { color: '#b5ccb2', opacity: 0.05, size: 6,  stiffness: 40,  damping: 34 },
];

function TrailDot({ mouseX, mouseY, config }) {
  const x = useSpring(mouseX, { stiffness: config.stiffness, damping: config.damping });
  const y = useSpring(mouseY, { stiffness: config.stiffness, damping: config.damping });

  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        x,
        y,
        width: config.size,
        height: config.size,
        borderRadius: '50%',
        backgroundColor: config.color,
        opacity: config.opacity,
        pointerEvents: 'none',
        zIndex: 9990,
        translateX: '-50%',
        translateY: '-50%',
      }}
    />
  );
}

export default function CursorTrail() {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Disable on touch devices
    if (
      typeof navigator !== 'undefined' &&
      navigator.maxTouchPoints > 0 &&
      !window.matchMedia('(pointer: fine)').matches
    ) {
      setIsTouch(true);
      return;
    }

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  if (isTouch) return null;

  return (
    <>
      {TRAIL_CONFIG.map((config, i) => (
        <TrailDot
          key={i}
          mouseX={mouseX}
          mouseY={mouseY}
          config={config}
        />
      ))}
    </>
  );
}
