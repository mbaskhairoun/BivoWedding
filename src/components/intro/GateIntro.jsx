import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function GateIntro({ onComplete }) {
  const videoRef = useRef(null);
  const completedRef = useRef(false);
  const [phase, setPhase] = useState('idle'); // idle | opening | finishing
  const [canPlay, setCanPlay] = useState(false);

  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  const finish = () => {
    if (completedRef.current) return;
    completedRef.current = true;
    onComplete?.();
  };

  const handleEnter = async () => {
    if (phase !== 'idle') return;
    const video = videoRef.current;
    if (!video) return;
    setPhase('opening');
    try {
      video.muted = false;
      await video.play();
    } catch {
      video.muted = true;
      try { await video.play(); } catch { handleEnded(); }
    }
  };

  const handleEnded = () => {
    setPhase('finishing');
  };

  return (
    <AnimatePresence>
      {phase !== 'gone' && (
        <motion.div
          key="gate-intro"
          className="fixed inset-0 z-[10000] overflow-hidden"
          style={{ background: '#0a0d0a' }}
          initial={{ opacity: 1 }}
          animate={{ opacity: phase === 'finishing' ? 0 : 1 }}
          transition={{ duration: 1.0, ease: [0.65, 0, 0.35, 1] }}
          onAnimationComplete={() => {
            if (phase === 'finishing') finish();
          }}
        >
          <video
            ref={videoRef}
            src="/intro.mp4"
            className="absolute inset-0 w-full h-full object-cover"
            playsInline
            preload="auto"
            muted
            onCanPlay={() => setCanPlay(true)}
            onLoadedData={() => setCanPlay(true)}
            onEnded={handleEnded}
            style={{
              filter: phase === 'finishing' ? 'brightness(1.15)' : 'brightness(1)',
              transition: 'filter 1s ease-out',
            }}
          />

          {/* Top scrim — darkens behind the writing so it stays legible without muddying the gates */}
          <div
            className="absolute inset-x-0 top-0 pointer-events-none"
            style={{
              height: '55%',
              background:
                'linear-gradient(to bottom, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.45) 45%, rgba(0,0,0,0) 100%)',
            }}
          />

          <AnimatePresence>
            {phase === 'idle' && (
              <motion.button
                key="enter"
                type="button"
                onClick={handleEnter}
                disabled={!canPlay}
                className="absolute inset-0 w-full h-full flex flex-col items-center justify-start cursor-pointer gap-7"
                style={{ paddingTop: 'clamp(3rem, 9vh, 7rem)', paddingBottom: 'clamp(2.5rem, 7vh, 5.5rem)' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: canPlay ? 1 : 0.5 }}
                exit={{ opacity: 0, transition: { duration: 0.55, ease: 'easeOut' } }}
                transition={{ duration: 1.2, delay: 0.2, ease: 'easeOut' }}
                aria-label="Tap to open the gates and enter"
              >
                <motion.div
                  initial={{ y: 14, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1.4, delay: 0.4, ease: 'easeOut' }}
                  className="text-center px-8"
                >
                  <p
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontStyle: 'italic',
                      fontWeight: 400,
                      letterSpacing: '0.42em',
                      fontSize: 'clamp(0.78rem, 1.7vw, 1.05rem)',
                      color: '#fdf9f0',
                      textTransform: 'uppercase',
                      marginBottom: '1.25rem',
                      textShadow: '0 2px 18px rgba(0,0,0,0.85), 0 1px 2px rgba(0,0,0,0.6)',
                    }}
                  >
                    Bino &amp; Vivo
                  </p>
                  <h1
                    style={{
                      fontFamily: "'Pinyon Script', cursive",
                      fontWeight: 400,
                      fontSize: 'clamp(3rem, 9vw, 7rem)',
                      lineHeight: 1.05,
                      color: '#fdf9f0',
                      textShadow:
                        '0 4px 30px rgba(0,0,0,0.9), 0 2px 6px rgba(0,0,0,0.7), 0 0 1px rgba(0,0,0,0.5)',
                    }}
                  >
                    you&rsquo;re invited
                  </h1>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.2, delay: 1.2, ease: 'easeOut' }}
                  className="flex flex-col items-center gap-3"
                >
                  <motion.span
                    animate={{ scale: [1, 1.06, 1], opacity: [0.92, 1, 0.92] }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                    style={{
                      fontFamily: "'Josefin Sans', sans-serif",
                      fontWeight: 400,
                      letterSpacing: '0.55em',
                      fontSize: 'clamp(0.7rem, 1.3vw, 0.85rem)',
                      color: '#fdf9f0',
                      textTransform: 'uppercase',
                      textShadow: '0 2px 14px rgba(0,0,0,0.85), 0 1px 2px rgba(0,0,0,0.6)',
                    }}
                  >
                    {canPlay ? 'tap to open the gates' : 'preparing...'}
                  </motion.span>

                  <svg
                    width="44"
                    height="14"
                    viewBox="0 0 44 14"
                    fill="none"
                    aria-hidden="true"
                    style={{ opacity: 0.7 }}
                  >
                    <path
                      d="M2 7 Q 11 1.5 22 7 T 42 7"
                      stroke="rgba(253,249,240,0.7)"
                      strokeWidth="1"
                      strokeLinecap="round"
                      fill="none"
                    />
                  </svg>
                </motion.div>
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
