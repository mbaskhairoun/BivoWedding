import React, { useEffect, useState } from 'react';

const NAV_LINKS = [
  { label: 'Our Day', href: '#our-day' },
  { label: 'Schedule', href: '#schedule' },
  { label: 'RSVP', href: '#rsvp' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1.1rem clamp(1.4rem, 5vw, 3rem)',
        background: scrolled ? 'rgba(241, 234, 211, 0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(14px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(14px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        transition: 'background 0.4s ease, border-color 0.4s ease, backdrop-filter 0.4s ease',
      }}
    >
      <a
        href="#home"
        style={{
          fontFamily: "'Pinyon Script', cursive",
          fontStyle: 'normal',
          fontSize: 'clamp(1.7rem, 2.6vw, 2.1rem)',
          color: 'var(--sage-dark)',
          textDecoration: 'none',
          letterSpacing: '0.01em',
          lineHeight: 1,
        }}
      >
        B <span style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '0.55em', color: 'var(--gold)' }}>&amp;</span> V
      </a>

      <ul
        style={{
          display: 'flex',
          listStyle: 'none',
          gap: 'clamp(1rem, 2.4vw, 2.2rem)',
          margin: 0,
          padding: 0,
          alignItems: 'center',
        }}
      >
        {NAV_LINKS.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: 'italic',
                fontWeight: 400,
                fontSize: 'clamp(0.72rem, 1.1vw, 0.82rem)',
                letterSpacing: '0.32em',
                textTransform: 'uppercase',
                color: 'var(--forest)',
                textDecoration: 'none',
                transition: 'color 0.25s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--sage)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--forest)')}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
