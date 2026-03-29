import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Our Story', href: '#our-story' },
  { label: 'Details', href: '#details' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'RSVP', href: '#rsvp' },
  { label: 'Travel', href: '#travel' },
  { label: 'Registry', href: '#registry' },
];

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 900) setMobileOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const navStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 clamp(1rem, 4vw, 3rem)',
    height: '72px',
    background: 'rgba(253,249,240,0.75)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    borderBottom: 'none',
    borderRadius: '0 0 28px 28px',
    transition: 'box-shadow 0.5s ease, background 0.5s ease',
    boxShadow: scrolled
      ? '0 4px 32px rgba(109,125,106,0.10), 0 1.5px 8px rgba(143,170,140,0.07)'
      : '0 0 0 transparent',
    fontFamily: "'Josefin Sans', sans-serif",
  };

  const linkStyle = {
    fontFamily: "'Josefin Sans', sans-serif",
    fontSize: '0.78rem',
    letterSpacing: '3px',
    textTransform: 'uppercase',
    color: '#6d7d6a',
    textDecoration: 'none',
    padding: '8px 14px',
    borderRadius: '20px',
    transition: 'color 0.35s ease, background 0.35s ease',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
  };

  const linkHoverHandlers = (isActive = false) => ({
    onMouseEnter: (e) => {
      e.currentTarget.style.color = '#8faa8c';
      e.currentTarget.style.background = 'rgba(143,170,140,0.07)';
    },
    onMouseLeave: (e) => {
      e.currentTarget.style.color = '#6d7d6a';
      e.currentTarget.style.background = 'transparent';
    },
  });

  // Organic hamburger icon using rounded SVG paths
  const HamburgerIcon = ({ open }) => (
    <motion.svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      style={{ cursor: 'pointer' }}
      onClick={() => setMobileOpen((prev) => !prev)}
      whileTap={{ scale: 0.92 }}
    >
      <motion.path
        d="M6 10 C10 9, 22 11, 26 10"
        stroke="#6d7d6a"
        strokeWidth="2.2"
        strokeLinecap="round"
        animate={open ? { d: 'M8 8 C12 12, 20 20, 24 24' } : { d: 'M6 10 C10 9, 22 11, 26 10' }}
        transition={{ duration: 0.35, ease: 'easeInOut' }}
      />
      <motion.path
        d="M6 16 C11 17, 21 15, 26 16"
        stroke="#6d7d6a"
        strokeWidth="2.2"
        strokeLinecap="round"
        animate={open ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.2 }}
      />
      <motion.path
        d="M6 22 C10 23, 22 21, 26 22"
        stroke="#6d7d6a"
        strokeWidth="2.2"
        strokeLinecap="round"
        animate={open ? { d: 'M8 24 C12 20, 20 12, 24 8' } : { d: 'M6 22 C10 23, 22 21, 26 22' }}
        transition={{ duration: 0.35, ease: 'easeInOut' }}
      />
    </motion.svg>
  );

  const desktopLinksStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    listStyle: 'none',
    margin: 0,
    padding: 0,
  };

  const mobileDropdownStyle = {
    position: 'absolute',
    top: '72px',
    left: '5%',
    right: '5%',
    background: 'rgba(253,249,240,0.92)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    borderRadius: '24px',
    padding: '24px 16px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '4px',
    boxShadow: '0 12px 48px rgba(109,125,106,0.12), 0 2px 12px rgba(143,170,140,0.08)',
  };

  const mobileLinkStyle = {
    ...linkStyle,
    fontSize: '0.85rem',
    letterSpacing: '2.5px',
    padding: '12px 24px',
    width: '100%',
    textAlign: 'center',
    borderRadius: '16px',
  };

  return (
    <nav style={navStyle}>
      {/* Logo / Brand */}
      <a
        href="#home"
        style={{
          position: 'absolute',
          left: 'clamp(1rem, 4vw, 3rem)',
          fontFamily: "'Pinyon Script', cursive",
          fontSize: 'clamp(1.4rem, 2.5vw, 1.8rem)',
          color: '#8faa8c',
          textDecoration: 'none',
          letterSpacing: '1px',
        }}
      >
        B & V
      </a>

      {/* Desktop links */}
      <ul
        style={{
          ...desktopLinksStyle,
          '@media (maxWidth: 900px)': { display: 'none' },
        }}
        className="nav-desktop-links"
      >
        {NAV_LINKS.map((link) => (
          <li key={link.label}>
            <a href={link.href} style={linkStyle} {...linkHoverHandlers()}>
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      {/* Mobile hamburger */}
      <div
        style={{
          position: 'absolute',
          right: 'clamp(1rem, 4vw, 3rem)',
          display: 'none',
        }}
        className="nav-mobile-toggle"
      >
        <HamburgerIcon open={mobileOpen} />
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            style={mobileDropdownStyle}
            className="nav-mobile-dropdown"
          >
            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                style={mobileLinkStyle}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05, duration: 0.3 }}
                onClick={() => setMobileOpen(false)}
                {...linkHoverHandlers()}
              >
                {link.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Responsive CSS injected via style tag */}
      <style>{`
        .nav-desktop-links {
          display: flex !important;
        }
        .nav-mobile-toggle {
          display: none !important;
        }
        .nav-mobile-dropdown {
          display: flex;
        }
        @media (max-width: 900px) {
          .nav-desktop-links {
            display: none !important;
          }
          .nav-mobile-toggle {
            display: block !important;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navigation;
