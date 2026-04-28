import React from 'react';
import { motion } from 'framer-motion';

const segments = [
  {
    venue: 'St. Peter & St. Paul Coptic Orthodox Church',
    address: '1177 Invicta Drive, Oakville',
    mapUrl: 'https://maps.google.com/?q=St.+Peter+%26+St.+Paul+Coptic+Orthodox+Church+1177+Invicta+Drive+Oakville',
    events: [{ time: '2:00 PM', title: 'Ceremony' }],
  },
  {
    venue: 'Ascott Parc Event Centre',
    address: '2839 Rutherford Road, Vaughan',
    mapUrl: 'https://maps.google.com/?q=Ascott+Parc+Event+Centre+2839+Rutherford+Road+Vaughan',
    events: [
      { time: '5:30 PM', title: 'Reception' },
    ],
  },
];

export default function Schedule() {
  return (
    <section
      id="schedule"
      style={{
        padding: 'clamp(5rem, 12vh, 8rem) 1.5rem',
        background: 'var(--paper)',
        textAlign: 'center',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        style={{ maxWidth: '560px', margin: '0 auto' }}
      >
        <p style={labelStyle}>The Day</p>

        <h2
          style={{
            marginTop: '1rem',
            fontFamily: "'Pinyon Script', cursive",
            fontStyle: 'normal',
            fontWeight: 400,
            fontSize: 'clamp(2.4rem, 5.5vw, 4rem)',
            lineHeight: 1.05,
            color: 'var(--forest)',
          }}
        >
          Order of events
        </h2>

        <div style={{ marginTop: 'clamp(2.5rem, 5vw, 3.5rem)', display: 'flex', flexDirection: 'column', gap: 'clamp(2.5rem, 5vw, 3.5rem)' }}>
          {segments.map((s, si) => (
            <motion.div
              key={s.venue}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.8, delay: si * 0.15, ease: 'easeOut' }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
                {s.events.map((e, ei) => (
                  <div key={e.title}>
                    <p
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontStyle: 'italic',
                        fontSize: 'clamp(0.9rem, 1.5vw, 1.05rem)',
                        letterSpacing: '0.42em',
                        textTransform: 'uppercase',
                        color: 'var(--sage-dark)',
                      }}
                    >
                      {e.time}
                    </p>
                    <p
                      style={{
                        marginTop: '0.4rem',
                        fontFamily: "'Pinyon Script', cursive",
                        fontStyle: 'normal',
                        fontSize: 'clamp(2.1rem, 4.2vw, 2.8rem)',
                        lineHeight: 1.1,
                        color: 'var(--forest)',
                      }}
                    >
                      {e.title}
                    </p>
                    {ei < s.events.length - 1 && (
                      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1.4rem' }}>
                        <span style={{ height: '1px', width: '24px', background: 'var(--border)', opacity: 0.7 }} />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <p
                style={{
                  marginTop: '1.4rem',
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: 'italic',
                  fontSize: 'clamp(1.15rem, 1.7vw, 1.28rem)',
                  color: 'var(--forest)',
                  lineHeight: 1.5,
                  opacity: 0.92,
                }}
              >
                {s.venue}
              </p>
              <p
                style={{
                  marginTop: '0.3rem',
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: 'italic',
                  fontSize: 'clamp(1rem, 1.5vw, 1.1rem)',
                  color: 'var(--muted)',
                  lineHeight: 1.5,
                }}
              >
                {s.address}
              </p>
              <a
                href={s.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  marginTop: '0.9rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: 'italic',
                  fontSize: 'clamp(0.78rem, 1.2vw, 0.9rem)',
                  letterSpacing: '0.32em',
                  textTransform: 'uppercase',
                  color: 'var(--sage-dark)',
                  textDecoration: 'none',
                  borderBottom: '1px solid var(--border)',
                  paddingBottom: '0.3rem',
                  transition: 'color 0.3s ease, border-color 0.3s ease',
                }}
                onMouseEnter={(e2) => {
                  e2.currentTarget.style.color = 'var(--forest)';
                  e2.currentTarget.style.borderColor = 'var(--gold)';
                }}
                onMouseLeave={(e2) => {
                  e2.currentTarget.style.color = 'var(--sage-dark)';
                  e2.currentTarget.style.borderColor = 'var(--border)';
                }}
              >
                <svg width="11" height="14" viewBox="0 0 11 14" fill="none" aria-hidden="true">
                  <path
                    d="M5.5 0.7 C 2.7 0.7 0.7 2.7 0.7 5.4 C 0.7 8.7 5.5 13.3 5.5 13.3 C 5.5 13.3 10.3 8.7 10.3 5.4 C 10.3 2.7 8.3 0.7 5.5 0.7 Z M 5.5 7.1 C 4.6 7.1 3.8 6.4 3.8 5.4 C 3.8 4.5 4.6 3.7 5.5 3.7 C 6.4 3.7 7.2 4.5 7.2 5.4 C 7.2 6.4 6.4 7.1 5.5 7.1 Z"
                    stroke="currentColor"
                    strokeWidth="0.8"
                    fill="none"
                  />
                </svg>
                Open in Maps
              </a>

              {si < segments.length - 1 && (
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: 'clamp(2.2rem, 4vw, 3rem)' }}>
                  <span style={{ height: '1px', width: '40px', background: 'var(--border)' }} />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
          style={{ marginTop: 'clamp(3rem, 6vw, 4.5rem)' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.9rem', marginBottom: 'clamp(1.6rem, 3vw, 2.2rem)' }}>
            <span style={{ height: '1px', width: '50px', background: 'var(--border)' }} />
            <svg width="9" height="9" viewBox="0 0 9 9" aria-hidden="true">
              <circle cx="4.5" cy="4.5" r="1.8" fill="var(--gold)" opacity="0.75" />
            </svg>
            <span style={{ height: '1px', width: '50px', background: 'var(--border)' }} />
          </div>
          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: 'italic',
              fontSize: 'clamp(0.9rem, 1.5vw, 1.05rem)',
              letterSpacing: '0.42em',
              textTransform: 'uppercase',
              color: 'var(--sage-dark)',
            }}
          >
            Attire
          </p>
          <p
            style={{
              marginTop: '0.9rem',
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: 'italic',
              fontSize: 'clamp(1.15rem, 1.7vw, 1.3rem)',
              lineHeight: 1.7,
              color: 'var(--forest)',
              opacity: 0.9,
            }}
          >
            Formal &mdash; black kindly discouraged.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}

const labelStyle = {
  fontFamily: "'Cormorant Garamond', serif",
  fontStyle: 'italic',
  fontWeight: 400,
  fontSize: 'clamp(0.9rem, 1.5vw, 1.05rem)',
  letterSpacing: '0.42em',
  textTransform: 'uppercase',
  color: 'var(--muted)',
};
