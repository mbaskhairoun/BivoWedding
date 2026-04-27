import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  getDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../../firebase';
/* ──────────────── palette (Mar & Jaume style) ──────────────── */
const C = {
  sage: '#878f6b',       // primary sage olive
  hydrangea: '#5e624e',  // accent (was hydrangea — repurposed to deep sage)
  cream: '#f1ead3',      // ivory paper bg
  ivory: '#ebe1c8',      // slightly darker paper / cards
  goldPale: '#ddd1a7',   // soft gold tint
  text: '#34453a',       // forest green text
  textLight: '#6d7d6a',  // muted text
  error: '#a85e5e',
};

/* ──────────────── Levenshtein distance ──────────────── */
function levenshtein(a, b) {
  const m = a.length, n = b.length;
  const dp = Array.from({ length: m + 1 }, (_, i) => i);
  for (let j = 1; j <= n; j++) {
    let prev = dp[0]; dp[0] = j;
    for (let i = 1; i <= m; i++) {
      const tmp = dp[i];
      dp[i] = a[i - 1] === b[j - 1] ? prev : 1 + Math.min(prev, dp[i], dp[i - 1]);
      prev = tmp;
    }
  }
  return dp[m];
}

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

/* ──────────────── animation variants ──────────────── */
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

const stepTransition = {
  initial: { opacity: 0, y: 30, scale: 0.97 },
  animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -20, scale: 0.97, transition: { duration: 0.3 } },
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

/* ──────────────── styled input components ──────────────── */
function StyledInput({ type = 'text', placeholder, value, onChange, name, required = false, disabled = false }) {
  const [focused, setFocused] = React.useState(false);
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      disabled={disabled}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={{
        ...inputBase,
        ...(focused ? focusRing : {}),
        ...(disabled ? { opacity: 0.6, cursor: 'not-allowed' } : {}),
      }}
    />
  );
}

function StyledTextarea({ placeholder, value, onChange, name, rows = 4 }) {
  const [focused, setFocused] = React.useState(false);
  return (
    <textarea
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      rows={rows}
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

/* ──────────────── checkbox component ──────────────── */
function StyledCheckbox({ checked, onChange, label }) {
  return (
    <label style={styles.checkboxLabel}>
      <span
        onClick={onChange}
        style={{
          ...styles.checkboxBox,
          ...(checked ? styles.checkboxBoxActive : {}),
        }}
      >
        {checked && (
          <motion.svg
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', damping: 14, stiffness: 200 }}
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
          >
            <path d="M3 7l3 3 5-6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </motion.svg>
        )}
      </span>
      <span style={styles.checkboxText}>{label}</span>
    </label>
  );
}

/* ──────────────── radio component ──────────────── */
function StyledRadio({ name, value, checked, onChange, label }) {
  return (
    <label style={styles.radioLabel}>
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        style={{ display: 'none' }}
      />
      <span style={{ ...styles.radioBtn, ...(checked ? styles.radioBtnActive : {}) }}>
        {checked && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            style={styles.radioDot}
          />
        )}
      </span>
      <span style={styles.radioText}>{label}</span>
    </label>
  );
}

/* ──────────────── loading spinner ──────────────── */
function LoadingSpinner({ size = 24, color = C.sage }) {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
      style={{
        width: size,
        height: size,
        border: `2.5px solid rgba(143,170,140,0.2)`,
        borderTopColor: color,
        borderRadius: '50%',
        display: 'inline-block',
      }}
    />
  );
}

/* ════════════════════════════════════════════════════════════════════
   RSVP COMPONENT
   ════════════════════════════════════════════════════════════════════ */
export default function RSVP() {
  /* ---- state ---- */
  const [step, setStep] = useState('lookup'); // 'lookup' | 'select' | 'form' | 'success'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Settings / form config from Firestore
  const [settings, setSettings] = useState(null);
  const [rsvpDisabled, setRsvpDisabled] = useState(false);

  // Lookup
  const [lookupName, setLookupName] = useState('');
  const [matches, setMatches] = useState([]);

  // Guest & existing RSVP
  const [guest, setGuest] = useState(null);
  const [existingRsvp, setExistingRsvp] = useState(null);
  const [existingRsvpId, setExistingRsvpId] = useState(null);

  // Form fields
  const [form, setForm] = useState({
    email: '',
    phone: '',
    attending: '',
    relationship: '',
    mealPreference: '',
    dietary: '',
    childrenCount: '0',
    childrenAges: '',
    songRequest: '',
    transportNeeded: false,
    accommodationNeeded: false,
    specialRequests: '',
    message: '',
  });
  const [attendingMembers, setAttendingMembers] = useState([]);
  const [memberEmails, setMemberEmails] = useState({});

  /* ──────────────── Load settings on mount ──────────────── */
  useEffect(() => {
    async function loadSettings() {
      try {
        const settingsRef = doc(db, 'settings', 'formConfig');
        const snap = await getDoc(settingsRef);
        if (snap.exists()) {
          const data = snap.data();
          setSettings(data);
          if (data.rsvpDisabled) {
            setRsvpDisabled(true);
          }
        }
      } catch (err) {
        console.warn('Could not load form settings:', err);
        // Continue with defaults - all fields visible
      }
    }
    loadSettings();
  }, []);

  /* ──────────────── field visibility helper ──────────────── */
  const isFieldVisible = useCallback(
    (fieldName) => {
      if (!settings || !settings.fields) return true;
      return settings.fields[fieldName] !== false;
    },
    [settings]
  );

  /* ──────────────── fuzzy search logic ──────────────── */
  const searchGuests = async (searchName) => {
    const normalized = searchName.trim().toLowerCase();
    if (!normalized) return [];

    const guestsRef = collection(db, 'guests');
    const allGuestsSnap = await getDocs(guestsRef);
    const allGuests = allGuestsSnap.docs.map((d) => ({ id: d.id, ...d.data() }));

    const results = [];
    const addedIds = new Set();

    const addResult = (guest, level) => {
      if (!addedIds.has(guest.id)) {
        addedIds.add(guest.id);
        results.push({ ...guest, matchLevel: level });
      }
    };

    // Level 1: Exact match on nameLower
    for (const g of allGuests) {
      if ((g.nameLower || g.name?.toLowerCase()) === normalized) {
        addResult(g, 1);
      }
    }

    // Level 2: Exact match within familyMembersLower array
    for (const g of allGuests) {
      const members = g.familyMembersLower || (g.familyMembers || []).map((m) => m.toLowerCase());
      if (members.some((m) => m === normalized)) {
        addResult(g, 2);
      }
    }

    // Level 3: Word-boundary partial match
    const searchWords = normalized.split(/\s+/);
    for (const g of allGuests) {
      const gName = (g.nameLower || g.name?.toLowerCase() || '');
      const members = g.familyMembersLower || (g.familyMembers || []).map((m) => m.toLowerCase());
      const allNames = [gName, ...members];

      for (const name of allNames) {
        const nameWords = name.split(/\s+/);
        const match = searchWords.every((sw) =>
          nameWords.some((nw) => nw.startsWith(sw) || nw.includes(sw))
        );
        if (match) {
          addResult(g, 3);
          break;
        }
      }
    }

    // Level 4: Fuzzy match using Levenshtein distance
    for (const g of allGuests) {
      const gName = (g.nameLower || g.name?.toLowerCase() || '');
      const members = g.familyMembersLower || (g.familyMembers || []).map((m) => m.toLowerCase());
      const allNames = [gName, ...members];

      for (const name of allNames) {
        const dist = levenshtein(normalized, name);
        const maxAllowed = Math.min(3, Math.floor(Math.max(normalized.length, name.length) * 0.3));
        if (dist <= maxAllowed) {
          addResult(g, 4);
          break;
        }
      }
    }

    // Sort by match level (best first)
    results.sort((a, b) => a.matchLevel - b.matchLevel);
    return results;
  };

  /* ──────────────── check for existing RSVP ──────────────── */
  const checkExistingRsvp = async (guestId) => {
    try {
      const rsvpsRef = collection(db, 'rsvps');
      const q = query(rsvpsRef, where('guestId', '==', guestId));
      const snap = await getDocs(q);
      if (!snap.empty) {
        const rsvpDoc = snap.docs[0];
        return { id: rsvpDoc.id, ...rsvpDoc.data() };
      }
    } catch (err) {
      console.warn('Error checking existing RSVP:', err);
    }
    return null;
  };

  /* ──────────────── handle name lookup ──────────────── */
  const handleLookup = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const results = await searchGuests(lookupName);

      if (results.length === 0) {
        setError(
          'We could not find your name on the guest list. Please try a different spelling or contact the couple directly.'
        );
        setLoading(false);
        return;
      }

      if (results.length === 1) {
        await selectGuest(results[0]);
      } else {
        setMatches(results);
        setStep('select');
      }
    } catch (err) {
      console.error('Lookup error:', err);
      setError('Something went wrong. Please try again.');
    }

    setLoading(false);
  };

  /* ──────────────── select a guest from matches ──────────────── */
  const selectGuest = async (g) => {
    setLoading(true);
    setGuest(g);

    // Pre-populate attending members with all family members
    const members = g.familyMembers || [];
    setAttendingMembers([...members]);

    // Check for existing RSVP
    const existing = await checkExistingRsvp(g.id);
    if (existing) {
      setExistingRsvp(existing);
      setExistingRsvpId(existing.id);
      // Pre-populate form from existing RSVP
      setForm({
        email: existing.email || '',
        phone: existing.phone || '',
        attending: existing.attending || '',
        relationship: existing.relationship || '',
        mealPreference: existing.mealPreference || '',
        dietary: existing.dietary || '',
        childrenCount: String(existing.childrenCount || '0'),
        childrenAges: existing.childrenAges || '',
        songRequest: existing.songRequest || '',
        transportNeeded: existing.transportNeeded || false,
        accommodationNeeded: existing.accommodationNeeded || false,
        specialRequests: existing.specialRequests || '',
        message: existing.message || '',
      });
      if (existing.attendingMembers) {
        setAttendingMembers(existing.attendingMembers);
      }
      if (existing.memberEmails) {
        setMemberEmails(existing.memberEmails);
      }
    }

    setStep('form');
    setLoading(false);
  };

  /* ──────────────── handle form field changes ──────────────── */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  /* ──────────────── toggle household member attendance ──────────────── */
  const toggleMember = (member) => {
    setAttendingMembers((prev) =>
      prev.includes(member) ? prev.filter((m) => m !== member) : [...prev, member]
    );
  };

  /* ──────────────── handle member email change ──────────────── */
  const handleMemberEmail = (member, email) => {
    setMemberEmails((prev) => ({ ...prev, [member]: email }));
  };

  /* ──────────────── validate and submit ──────────────── */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validate required fields
    if (!form.email.trim()) {
      setError('Please enter your email address.');
      return;
    }
    if (!form.attending) {
      setError('Please let us know if you will be attending.');
      return;
    }

    setLoading(true);

    try {
      const allMembers = guest.familyMembers || [];
      const declined = allMembers.filter((m) => !attendingMembers.includes(m));

      const rsvpData = {
        guestId: guest.id,
        invitationName: guest.name || guest.invitationName || '',
        fullName: guest.name || lookupName,
        email: form.email.trim(),
        phone: form.phone.trim(),
        attending: form.attending,
        rsvpStatus: form.attending === 'yes' ? 'accepted' : 'declined',
        attendingMembers: form.attending === 'yes' ? attendingMembers : [],
        declinedMembers: form.attending === 'yes' ? declined : allMembers,
        totalAttending: form.attending === 'yes' ? attendingMembers.length : 0,
        totalDeclined: form.attending === 'yes' ? declined.length : allMembers.length,
        memberEmails,
        relationship: form.relationship,
        mealPreference: form.mealPreference,
        dietary: form.dietary,
        childrenCount: parseInt(form.childrenCount, 10) || 0,
        childrenAges: form.childrenAges,
        songRequest: form.songRequest,
        transportNeeded: form.transportNeeded,
        accommodationNeeded: form.accommodationNeeded,
        specialRequests: form.specialRequests,
        message: form.message,
        submittedAt: serverTimestamp(),
        userAgent: navigator.userAgent,
      };

      if (existingRsvpId) {
        // Update existing RSVP
        const rsvpRef = doc(db, 'rsvps', existingRsvpId);
        await updateDoc(rsvpRef, { ...rsvpData, updatedAt: serverTimestamp() });
      } else {
        // Create new RSVP
        await addDoc(collection(db, 'rsvps'), rsvpData);
      }

      // Mark guest as having RSVPed
      try {
        const guestRef = doc(db, 'guests', guest.id);
        await updateDoc(guestRef, { hasRsvped: true });
      } catch (err) {
        console.warn('Could not update guest hasRsvped:', err);
      }

      // Fire-and-forget confirmation email
      try {
        fetch('/api/send-rsvp-confirmation', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(rsvpData),
        }).catch(() => {});
      } catch {
        // Silently ignore email errors
      }

      setStep('success');
    } catch (err) {
      console.error('Submit error:', err);
      setError('Something went wrong submitting your RSVP. Please try again.');
    }

    setLoading(false);
  };

  /* ──────────────── RENDER ──────────────── */

  // RSVP disabled state
  if (rsvpDisabled) {
    return (
      <section id="rsvp" style={styles.section}>
        <div style={styles.gradientLayer} />
        <div style={styles.content}>
          <div style={{ textAlign: 'center', marginBottom: 'clamp(2rem, 4vw, 3rem)' }}>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: 'clamp(0.75rem, 1.3vw, 0.9rem)', letterSpacing: '0.42em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '0.9rem' }}>
              Kindly respond
            </p>
            <h2 style={{ fontFamily: "'Pinyon Script', cursive", fontStyle: 'normal', fontWeight: 400, fontSize: 'clamp(2.6rem, 6vw, 4.5rem)', lineHeight: 1.05, color: 'var(--forest)' }}>
              RSVP
            </h2>
            <p style={{ marginTop: '0.7rem', fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: 'clamp(0.95rem, 1.5vw, 1.08rem)', color: 'var(--muted)' }}>
              We hope you can make it
            </p>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            style={styles.closedNotice}
          >
            <p style={styles.closedText}>RSVPs are currently closed.</p>
            <p style={styles.closedSubtext}>
              If you need to reach us, please contact the couple directly.
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="rsvp" style={styles.section}>
      {/* watercolor gradient background */}
      <div style={styles.gradientLayer} />

      {/* content */}
      <div style={styles.content}>
        <div style={{ textAlign: 'center', marginBottom: 'clamp(2rem, 4vw, 3rem)' }}>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: 'clamp(0.75rem, 1.3vw, 0.9rem)', letterSpacing: '0.42em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '0.9rem' }}>
              Kindly respond
            </p>
            <h2 style={{ fontFamily: "'Pinyon Script', cursive", fontStyle: 'normal', fontWeight: 400, fontSize: 'clamp(2.6rem, 6vw, 4.5rem)', lineHeight: 1.05, color: 'var(--forest)' }}>
              RSVP
            </h2>
            <p style={{ marginTop: '0.7rem', fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: 'clamp(0.95rem, 1.5vw, 1.08rem)', color: 'var(--muted)' }}>
              We hope you can make it
            </p>
          </div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          style={styles.deadline}
        >
          Kindly respond by August 1, 2026
        </motion.p>

        {/* Error display */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              style={styles.errorBox}
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Step transitions */}
        <AnimatePresence mode="wait">
          {/* ═══════ STEP 1: NAME LOOKUP ═══════ */}
          {step === 'lookup' && (
            <motion.form
              key="lookup"
              onSubmit={handleLookup}
              style={styles.form}
              {...stepTransition}
            >
              <motion.div variants={fadeUp} style={styles.fieldWrap}>
                <label style={styles.label}>Find Your Invitation</label>
                <p style={styles.helpText}>
                  Enter your name as it appears on your invitation.
                </p>
                <StyledInput
                  name="lookupName"
                  placeholder="Your full name"
                  value={lookupName}
                  onChange={(e) => setLookupName(e.target.value)}
                  required
                />
              </motion.div>

              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <motion.button
                  type="submit"
                  style={styles.submitBtn}
                  whileHover={{ scale: 1.04, boxShadow: `0 8px 32px rgba(143,170,140,0.25)` }}
                  whileTap={{ scale: 0.97 }}
                  disabled={loading}
                >
                  {loading ? (
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                      <LoadingSpinner size={18} color="#fff" /> Searching...
                    </span>
                  ) : (
                    'Find My Invitation'
                  )}
                </motion.button>
              </div>
            </motion.form>
          )}

          {/* ═══════ STEP 1b: SELECT FROM MATCHES ═══════ */}
          {step === 'select' && (
            <motion.div
              key="select"
              style={styles.form}
              {...stepTransition}
            >
              <p style={styles.helpText}>
                We found multiple matches. Please select your invitation:
              </p>
              <div style={styles.matchList}>
                {matches.map((m) => (
                  <motion.button
                    key={m.id}
                    type="button"
                    onClick={() => selectGuest(m)}
                    style={styles.matchItem}
                    whileHover={{
                      scale: 1.02,
                      borderColor: C.sage,
                      boxShadow: `0 4px 20px rgba(143,170,140,0.15)`,
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span style={styles.matchName}>{m.name || m.invitationName}</span>
                    {m.familyMembers && m.familyMembers.length > 0 && (
                      <span style={styles.matchMembers}>
                        Household: {m.familyMembers.join(', ')}
                      </span>
                    )}
                  </motion.button>
                ))}
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
                <motion.button
                  type="button"
                  onClick={() => { setStep('lookup'); setMatches([]); setError(''); }}
                  style={styles.backBtn}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Try a different name
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* ═══════ STEP 2: RSVP FORM ═══════ */}
          {step === 'form' && guest && (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              style={styles.form}
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: -20 }}
            >
              {/* Welcome message */}
              <motion.div variants={fadeUp} style={styles.welcomeBox}>
                <p style={styles.welcomeText}>
                  Welcome, <strong>{guest.name || guest.invitationName}</strong>!
                </p>
                {existingRsvp && (
                  <p style={styles.editingNotice}>
                    You have already submitted an RSVP. You can update your response below.
                  </p>
                )}
              </motion.div>

              {/* Household member checkboxes */}
              {guest.familyMembers && guest.familyMembers.length > 0 && (
                <motion.div variants={fadeUp} style={styles.fieldWrap}>
                  <label style={styles.label}>Who will be attending?</label>
                  <p style={styles.helpText}>Select all household members attending.</p>
                  <div style={styles.memberGrid}>
                    {guest.familyMembers.map((member) => (
                      <div key={member} style={styles.memberRow}>
                        <StyledCheckbox
                          checked={attendingMembers.includes(member)}
                          onChange={() => toggleMember(member)}
                          label={member}
                        />
                        {isFieldVisible('memberEmails') && attendingMembers.includes(member) && (
                          <div style={{ marginLeft: '2rem', marginTop: '0.3rem' }}>
                            <StyledInput
                              type="email"
                              name={`email-${member}`}
                              placeholder={`Email for ${member} (optional)`}
                              value={memberEmails[member] || ''}
                              onChange={(e) => handleMemberEmail(member, e.target.value)}
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Email (always required) */}
              <motion.div variants={fadeUp} style={styles.fieldWrap}>
                <label style={styles.label}>Email *</label>
                <StyledInput
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </motion.div>

              {/* Phone (optional) */}
              {isFieldVisible('phone') && (
                <motion.div variants={fadeUp} style={styles.fieldWrap}>
                  <label style={styles.label}>Phone</label>
                  <StyledInput
                    type="tel"
                    name="phone"
                    placeholder="Your phone number (optional)"
                    value={form.phone}
                    onChange={handleChange}
                  />
                </motion.div>
              )}

              {/* Attendance */}
              <motion.div variants={fadeUp} style={styles.fieldWrap}>
                <label style={styles.label}>Will you attend? *</label>
                <div style={styles.radioGroup}>
                  <StyledRadio
                    name="attending"
                    value="yes"
                    checked={form.attending === 'yes'}
                    onChange={handleChange}
                    label="Joyfully accepts"
                  />
                  <StyledRadio
                    name="attending"
                    value="no"
                    checked={form.attending === 'no'}
                    onChange={handleChange}
                    label="Regretfully declines"
                  />
                </div>
              </motion.div>

              {/* Conditional fields shown only when attending === 'yes' */}
              <AnimatePresence>
                {form.attending === 'yes' && (
                  <motion.div
                    key="attending-fields"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: 'clamp(1rem, 2.5vw, 1.4rem)' }}
                  >
                    {/* Relationship */}
                    {isFieldVisible('relationship') && (
                      <div style={styles.fieldWrap}>
                        <label style={styles.label}>Relationship to the Couple</label>
                        <StyledSelect name="relationship" value={form.relationship} onChange={handleChange}>
                          <option value="">Select...</option>
                          <option value="family-bride">Family of the Bride</option>
                          <option value="family-groom">Family of the Groom</option>
                          <option value="friend-bride">Friend of the Bride</option>
                          <option value="friend-groom">Friend of the Groom</option>
                          <option value="friend-both">Friend of Both</option>
                          <option value="colleague">Colleague</option>
                          <option value="other">Other</option>
                        </StyledSelect>
                      </div>
                    )}

                    {/* Meal Preference */}
                    {isFieldVisible('mealPreference') && (
                      <div style={styles.fieldWrap}>
                        <label style={styles.label}>Meal Preference</label>
                        <StyledSelect name="mealPreference" value={form.mealPreference} onChange={handleChange}>
                          <option value="">Select...</option>
                          <option value="beef">Beef</option>
                          <option value="chicken">Chicken</option>
                          <option value="fish">Fish</option>
                          <option value="vegetarian">Vegetarian</option>
                          <option value="vegan">Vegan</option>
                        </StyledSelect>
                      </div>
                    )}

                    {/* Dietary Requirements */}
                    {isFieldVisible('dietary') && (
                      <div style={styles.fieldWrap}>
                        <label style={styles.label}>Dietary Requirements</label>
                        <StyledInput
                          name="dietary"
                          placeholder="Any dietary needs or allergies"
                          value={form.dietary}
                          onChange={handleChange}
                        />
                      </div>
                    )}

                    {/* Children */}
                    {isFieldVisible('childrenCount') && (
                      <div style={styles.fieldWrap}>
                        <label style={styles.label}>Number of Children Attending</label>
                        <StyledSelect name="childrenCount" value={form.childrenCount} onChange={handleChange}>
                          {[0, 1, 2, 3, 4, 5].map((n) => (
                            <option key={n} value={n}>{n}</option>
                          ))}
                        </StyledSelect>
                      </div>
                    )}

                    {isFieldVisible('childrenAges') && parseInt(form.childrenCount, 10) > 0 && (
                      <div style={styles.fieldWrap}>
                        <label style={styles.label}>Children's Ages</label>
                        <StyledInput
                          name="childrenAges"
                          placeholder="e.g. 3, 7, 12"
                          value={form.childrenAges}
                          onChange={handleChange}
                        />
                      </div>
                    )}

                    {/* Song Request */}
                    {isFieldVisible('songRequest') && (
                      <div style={styles.fieldWrap}>
                        <label style={styles.label}>Song Request</label>
                        <StyledInput
                          name="songRequest"
                          placeholder="What song gets you on the dance floor?"
                          value={form.songRequest}
                          onChange={handleChange}
                        />
                      </div>
                    )}

                    {/* Transport */}
                    {isFieldVisible('transportNeeded') && (
                      <div style={styles.fieldWrap}>
                        <StyledCheckbox
                          checked={form.transportNeeded}
                          onChange={() => setForm((prev) => ({ ...prev, transportNeeded: !prev.transportNeeded }))}
                          label="I need transportation assistance"
                        />
                      </div>
                    )}

                    {/* Accommodation */}
                    {isFieldVisible('accommodationNeeded') && (
                      <div style={styles.fieldWrap}>
                        <StyledCheckbox
                          checked={form.accommodationNeeded}
                          onChange={() => setForm((prev) => ({ ...prev, accommodationNeeded: !prev.accommodationNeeded }))}
                          label="I need accommodation assistance"
                        />
                      </div>
                    )}

                    {/* Special Requests */}
                    {isFieldVisible('specialRequests') && (
                      <div style={styles.fieldWrap}>
                        <label style={styles.label}>Special Requests</label>
                        <StyledInput
                          name="specialRequests"
                          placeholder="Accessibility needs, seating preferences, etc."
                          value={form.specialRequests}
                          onChange={handleChange}
                        />
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Message to couple (always visible) */}
              {isFieldVisible('message') && (
                <motion.div variants={fadeUp} style={styles.fieldWrap}>
                  <label style={styles.label}>A Note to the Couple</label>
                  <StyledTextarea
                    name="message"
                    placeholder="Share your love and well wishes..."
                    value={form.message}
                    onChange={handleChange}
                  />
                </motion.div>
              )}

              {/* Submit button */}
              <motion.div variants={fadeUp} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.8rem' }}>
                <motion.button
                  type="submit"
                  style={styles.submitBtn}
                  whileHover={{ scale: 1.04, boxShadow: `0 8px 32px rgba(143,170,140,0.25)` }}
                  whileTap={{ scale: 0.97 }}
                  disabled={loading}
                >
                  {loading ? (
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                      <LoadingSpinner size={18} color="#fff" /> Submitting...
                    </span>
                  ) : existingRsvp ? (
                    'Update RSVP'
                  ) : (
                    'Send RSVP'
                  )}
                </motion.button>

                <motion.button
                  type="button"
                  onClick={() => {
                    setStep('lookup');
                    setGuest(null);
                    setExistingRsvp(null);
                    setExistingRsvpId(null);
                    setMatches([]);
                    setError('');
                    setForm({
                      email: '', phone: '', attending: '', relationship: '',
                      mealPreference: '', dietary: '', childrenCount: '0',
                      childrenAges: '', songRequest: '', transportNeeded: false,
                      accommodationNeeded: false, specialRequests: '', message: '',
                    });
                    setAttendingMembers([]);
                    setMemberEmails({});
                  }}
                  style={styles.backBtn}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Not you? Search again
                </motion.button>
              </motion.div>
            </motion.form>
          )}

          {/* ═══════ STEP 3: SUCCESS ═══════ */}
          {step === 'success' && (
            <motion.div
              key="success"
              style={{ ...styles.form, alignItems: 'center', textAlign: 'center' }}
              {...stepTransition}
            >
              <div style={{ position: 'relative', display: 'inline-block' }}>
                <motion.div
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', damping: 14, stiffness: 160 }}
                  style={styles.thankYouBtn}
                >
                  Thank You!
                  <PetalBurst />
                </motion.div>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                style={styles.successText}
              >
                {form.attending === 'yes'
                  ? 'We are so excited to celebrate with you! A confirmation email has been sent.'
                  : 'We are sorry you cannot make it. Thank you for letting us know.'}
              </motion.p>

              {form.attending === 'yes' && guest && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  style={styles.summaryBox}
                >
                  <p style={styles.summaryTitle}>Your RSVP Summary</p>
                  <p style={styles.summaryDetail}>
                    <strong>Attending:</strong> {attendingMembers.join(', ') || 'Just you'}
                  </p>
                  {form.mealPreference && (
                    <p style={styles.summaryDetail}>
                      <strong>Meal:</strong> {form.mealPreference}
                    </p>
                  )}
                </motion.div>
              )}

              <motion.button
                type="button"
                onClick={() => {
                  setStep('lookup');
                  setGuest(null);
                  setExistingRsvp(null);
                  setExistingRsvpId(null);
                  setMatches([]);
                  setError('');
                  setLookupName('');
                  setForm({
                    email: '', phone: '', attending: '', relationship: '',
                    mealPreference: '', dietary: '', childrenCount: '0',
                    childrenAges: '', songRequest: '', transportNeeded: false,
                    accommodationNeeded: false, specialRequests: '', message: '',
                  });
                  setAttendingMembers([]);
                  setMemberEmails({});
                }}
                style={styles.backBtn}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                RSVP for another guest
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
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

  helpText: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 'clamp(0.85rem, 1.6vw, 0.95rem)',
    fontStyle: 'italic',
    color: C.textLight,
    paddingLeft: '0.4rem',
    margin: '0 0 0.3rem 0',
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

  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.6rem',
    cursor: 'pointer',
    padding: '0.3rem 0',
  },

  checkboxBox: {
    width: 22,
    height: 22,
    borderRadius: '8px 6px 8px 6px',
    border: `1.5px solid rgba(143,170,140,0.4)`,
    background: 'rgba(253,249,240,0.6)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'border-color 0.3s, background 0.3s, box-shadow 0.3s',
    flexShrink: 0,
    cursor: 'pointer',
  },

  checkboxBoxActive: {
    borderColor: C.sage,
    background: C.sage,
    boxShadow: `0 0 0 3px rgba(143,170,140,0.15)`,
  },

  checkboxText: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
    color: C.text,
  },

  memberGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    paddingTop: '0.3rem',
  },

  memberRow: {
    display: 'flex',
    flexDirection: 'column',
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

  backBtn: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 'clamp(0.9rem, 1.8vw, 1rem)',
    color: C.textLight,
    background: 'transparent',
    border: `1px solid rgba(143,170,140,0.3)`,
    borderRadius: '30px 24px 30px 24px',
    padding: '0.5rem 1.6rem',
    cursor: 'pointer',
    transition: 'border-color 0.3s, color 0.3s',
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

  errorBox: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 'clamp(0.9rem, 1.8vw, 1.05rem)',
    color: C.error,
    background: 'rgba(201,122,122,0.08)',
    border: `1.5px solid rgba(201,122,122,0.25)`,
    borderRadius: '20px 16px 20px 16px',
    padding: '0.8rem 1.2rem',
    textAlign: 'center',
    width: '100%',
    boxSizing: 'border-box',
    marginBottom: '0.5rem',
  },

  welcomeBox: {
    textAlign: 'center',
    padding: '1rem 0',
  },

  welcomeText: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 'clamp(1.1rem, 2.5vw, 1.35rem)',
    color: C.text,
    margin: 0,
  },

  editingNotice: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 'clamp(0.85rem, 1.6vw, 0.95rem)',
    fontStyle: 'italic',
    color: C.hydrangea,
    marginTop: '0.5rem',
    padding: '0.5rem 1rem',
    background: 'rgba(123,167,194,0.08)',
    borderRadius: '16px 12px 16px 12px',
    display: 'inline-block',
  },

  matchList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.6rem',
  },

  matchItem: {
    fontFamily: "'Cormorant Garamond', serif",
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '0.2rem',
    padding: '1rem 1.4rem',
    background: 'rgba(253,249,240,0.65)',
    border: `1.5px solid rgba(143,170,140,0.25)`,
    borderRadius: '24px 20px 24px 20px',
    cursor: 'pointer',
    transition: 'border-color 0.3s, box-shadow 0.3s',
    textAlign: 'left',
    width: '100%',
    boxSizing: 'border-box',
  },

  matchName: {
    fontSize: 'clamp(1rem, 2vw, 1.15rem)',
    fontWeight: 600,
    color: C.text,
  },

  matchMembers: {
    fontSize: 'clamp(0.8rem, 1.5vw, 0.9rem)',
    fontStyle: 'italic',
    color: C.textLight,
  },

  closedNotice: {
    textAlign: 'center',
    padding: '2rem',
    background: 'rgba(253,249,240,0.5)',
    borderRadius: '30px 24px 30px 24px',
    border: `1.5px solid rgba(143,170,140,0.2)`,
    marginTop: '1.5rem',
  },

  closedText: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 'clamp(1.1rem, 2.5vw, 1.3rem)',
    color: C.text,
    fontWeight: 600,
    margin: '0 0 0.5rem 0',
  },

  closedSubtext: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 'clamp(0.9rem, 1.8vw, 1.05rem)',
    fontStyle: 'italic',
    color: C.textLight,
    margin: 0,
  },

  successText: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 'clamp(1rem, 2vw, 1.15rem)',
    color: C.text,
    lineHeight: 1.6,
    marginTop: '1rem',
  },

  summaryBox: {
    background: 'rgba(253,249,240,0.6)',
    border: `1.5px solid rgba(143,170,140,0.2)`,
    borderRadius: '24px 20px 24px 20px',
    padding: '1.2rem 1.6rem',
    width: '100%',
    boxSizing: 'border-box',
    marginTop: '0.5rem',
  },

  summaryTitle: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 'clamp(0.95rem, 1.8vw, 1.1rem)',
    fontWeight: 600,
    color: C.text,
    margin: '0 0 0.5rem 0',
  },

  summaryDetail: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 'clamp(0.85rem, 1.6vw, 0.95rem)',
    color: C.textLight,
    margin: '0.2rem 0',
  },
};
