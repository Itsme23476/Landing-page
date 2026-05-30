import { useState } from 'react';
import Header from './Header';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPPORT_EMAIL = 'softwaregentofficial@gmail.com';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || message.trim().length < 10) {
      setError('Please enter your email and a message (at least 10 characters).');
      return;
    }
    setBusy(true);
    try {
      const r = await fetch(`${SUPABASE_URL}/functions/v1/send-contact`, {
        method: 'POST', headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ name, email, message: message.trim() }),
      });
      const j = await r.json();
      if (j.ok) setSent(true);
      else setError('Could not send your message. Please email us directly instead.');
    } catch { setError('Something went wrong. Please email us directly instead.'); }
    finally { setBusy(false); }
  };

  return (
    <div className="app-container" style={{ minHeight: '100vh' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        <Header />
      </div>

      <main style={{ maxWidth: '620px', margin: '0 auto', padding: '40px 24px 80px' }}>
        <h1 style={{ color: '#fff', fontSize: '2.25rem', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '10px' }}>
          Get in touch
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.6, marginBottom: '8px' }}>
          Questions, feedback, or need a hand? Send us a message and we'll get back to you, usually within 24 hours.
        </p>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '36px' }}>
          Prefer email? Reach us at{' '}
          <a href={`mailto:${SUPPORT_EMAIL}`} style={{ color: 'var(--primary)', textDecoration: 'none' }}>{SUPPORT_EMAIL}</a>.
        </p>

        {sent ? (
          <div style={{
            background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.3)',
            borderRadius: '14px', padding: '28px', textAlign: 'center',
          }}>
            <p style={{ color: '#4ADE80', fontSize: '1.1rem', fontWeight: 600, margin: '0 0 6px' }}>Message sent ✓</p>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', margin: 0 }}>
              Thanks for reaching out. We'll reply to {email} soon.
            </p>
          </div>
        ) : (
          <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <input
              type="text" placeholder="Your name (optional)" value={name}
              onChange={(e) => setName(e.target.value)} style={inputStyle}
            />
            <input
              type="email" placeholder="Your email" value={email}
              onChange={(e) => setEmail(e.target.value)} required style={inputStyle}
            />
            <textarea
              placeholder="How can we help?" value={message} rows={6}
              onChange={(e) => setMessage(e.target.value)} required
              style={{ ...inputStyle, resize: 'vertical', fontFamily: 'inherit' }}
            />
            {error && <p style={{ color: '#F87171', fontSize: '0.85rem', margin: 0 }}>{error}</p>}
            <button type="submit" disabled={busy} style={{
              padding: '14px 24px',
              background: 'linear-gradient(135deg, rgba(178,139,255,0.95), rgba(109,40,217,0.95))',
              border: '1px solid rgba(178,139,255,0.3)', borderRadius: '10px',
              color: '#fff', fontSize: '0.95rem', fontWeight: 600,
              cursor: busy ? 'not-allowed' : 'pointer', opacity: busy ? 0.6 : 1,
            }}>{busy ? 'Sending…' : 'Send message'}</button>
          </form>
        )}

        {/* Quick answers */}
        <div style={{ marginTop: '56px' }}>
          <h2 style={{ color: '#fff', fontSize: '1.4rem', fontWeight: 700, marginBottom: '24px' }}>
            Before you reach out
          </h2>
          {FAQS.map((f) => (
            <div key={f.q} style={{ borderTop: '1px solid var(--border-light)', padding: '20px 0' }}>
              <p style={{ color: '#fff', fontSize: '1rem', fontWeight: 600, margin: '0 0 8px' }}>{f.q}</p>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.65, margin: 0 }}>{f.a}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

const FAQS = [
  {
    q: 'How does Filect organize my files?',
    a: "Point it at a folder, tell it how you want things sorted, and it reads each file to figure out what it is, then moves it into the right place. You can review what it did and undo it if something looks off.",
  },
  {
    q: 'Will it move my files without asking?',
    a: "No. You choose the folder and the rules, and nothing happens until you run it. Your files stay on your computer the whole time.",
  },
  {
    q: 'How do I find a file later?',
    a: "Open Filect with a shortcut and describe what you are looking for in plain language, like \"the invoice from March\" or \"my tax return\". It pulls it up without you needing the exact filename.",
  },
  {
    q: 'Is my data private?',
    a: "Yes. File content is processed securely through OpenAI to understand it, and nothing is stored or shared. Only you can see your files.",
  },
  {
    q: 'Which devices does it work on?',
    a: "Filect runs on both Mac and Windows. Your subscription follows your account, so you can log in on either one with the same email.",
  },
  {
    q: 'I am having trouble logging in or installing.',
    a: "Make sure you log in with the same email you used to sign up. If it still will not work, send us a message above and we will sort it out.",
  },
];

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '13px 16px', borderRadius: '10px',
  background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-light)',
  color: '#fff', fontSize: '0.95rem',
};
