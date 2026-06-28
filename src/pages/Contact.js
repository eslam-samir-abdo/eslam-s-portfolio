// src/pages/Contact.js
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Contact.css';

const FAQS = [
  { q: 'Are you available for freelance work?',     a: "Yes — I'm actively taking on freelance projects. Whether it's a landing page, a web app, or a full site, reach out and we'll see if it's a good fit." },
  { q: 'How fast do you reply?',                    a: 'I check my messages daily and reply within 24 hours. For urgent matters, a phone call is the fastest way to reach me.' },
  { q: 'What technologies do you specialize in?',   a: 'My core stack is HTML, CSS, JavaScript, and React. I also work with Bootstrap, Next.js, Material UI, and Git. Check the Skills page for the full breakdown.' },
  { q: 'Are you open to full-time roles?',          a: "Absolutely. I'm actively looking for junior frontend developer positions where I can grow and contribute." },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', msg: '' });
  const [toast, setToast] = useState('');
  const [sent,  setSent]  = useState(false);

  function showToast(msg) {
    setToast(msg);
    setTimeout(() => setToast(''), 3500);
  }

  function handleSend() {
    if (!form.name || !form.email || !form.msg) {
      showToast('Please fill in the required fields.');
      return;
    }
    const body = `Name: ${form.name}\nEmail: ${form.email}\n\n${form.msg}`;
    window.location.href = `mailto:eslamsamirabdoo@gmail.com?subject=${encodeURIComponent(form.subject || 'Message from Portfolio')}&body=${encodeURIComponent(body)}`;
    setSent(true);
    showToast('Opening your email client... ✦');
    setTimeout(() => {
      setSent(false);
      setForm({ name: '', email: '', subject: '', msg: '' });
    }, 3000);
  }

  return (
    <>
      {toast && (
        <div className="toast">
          <span className="t-icon">✦</span>{toast}
        </div>
      )}

      <div className="page-hero">
        <div className="page-ghost">HELLO</div>
        <Link className="back-link" to="/">← Back Home</Link>
        <p className="page-label">04 — Get In Touch</p>
        <h1 className="page-title">Let's Build<br /><em>Something Great.</em></h1>
        <p className="page-sub">Available for freelance work, collaborations, and full-time opportunities.</p>
      </div>

      <main className="contact-main">
        <div className="contact-grid">

          {/* LEFT — INFO */}
          <div>
            <h2 className="contact-big">Drop me<br />a <em>message.</em></h2>
            <p className="contact-tagline">
              Whether it's a project idea, a job offer, a question, or just a hello — I read every message and reply within 24 hours.
            </p>
            <div className="contact-methods">
              <div className="contact-method"><span className="cm-label">Email</span><a className="cm-value" href="mailto:eslamsamirabdoo@gmail.com">eslamsamirabdoo@gmail.com</a></div>
              <div className="contact-method"><span className="cm-label">Phone</span><a className="cm-value" href="tel:+201033744131">+20 103 374 4131</a></div>
              <div className="contact-method"><span className="cm-label">Location</span><span className="cm-value">Giza, Egypt</span></div>
              <div className="contact-method"><span className="cm-label">Response Time</span><span className="cm-value">Within 24 hours</span></div>
            </div>
            <div className="avail-badge">
              <span className="avail-dot" />
              <span className="avail-text">Available for new opportunities</span>
            </div>
            <div className="socials-wrap">
              <p className="socials-label">Find me online</p>
              <div className="socials">
                <a className="social-btn" href="https://github.com/" target="_blank" rel="noreferrer">GitHub ↗</a>
                <a className="social-btn" href="https://linkedin.com/" target="_blank" rel="noreferrer">LinkedIn ↗</a>
              </div>
            </div>
          </div>

          {/* RIGHT — FORM */}
          <div className="form-wrap">
            <p className="form-title">Send a Message</p>
            <div className="form-row">
              <div className="form-group">
                <label>Your Name *</label>
                <input type="text" placeholder="John Doe" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Your Email *</label>
                <input type="email" placeholder="you@example.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
              </div>
            </div>
            <div className="form-group">
              <label>Subject</label>
              <select value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })}>
                <option value="">Select a topic...</option>
                <option>Freelance Project</option>
                <option>Job Opportunity</option>
                <option>Collaboration</option>
                <option>General Question</option>
                <option>Just Saying Hi 👋</option>
              </select>
            </div>
            <div className="form-group">
              <label>Message *</label>
              <textarea placeholder="Tell me about your project or idea..." value={form.msg} onChange={e => setForm({ ...form, msg: e.target.value })} />
            </div>
            <button className={`btn-send${sent ? ' sent' : ''}`} onClick={handleSend}>
              {sent ? 'Opening Email Client ✓' : 'Send Message →'}
            </button>
          </div>

        </div>

        {/* FAQ */}
        <div className="faq-section">
          <h2 className="faq-title">Common Questions</h2>
          <div className="faq-list">
            {FAQS.map((f, i) => (
              <div className="faq-item" key={i}>
                <div className="faq-q">{f.q}</div>
                <div className="faq-a">{f.a}</div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer><p>© 2025 Eslam Samir</p><p>GIZA, EGYPT</p></footer>
    </>
  );
}
