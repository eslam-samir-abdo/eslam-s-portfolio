// src/pages/Skills.js
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Skills.css';

const SKILLS = [
  { icon: '🌐', name: 'HTML5',        cat: 'Markup',     desc: 'Semantic structure, accessibility, SEO-friendly markup.',          pct: 90 },
  { icon: '🎨', name: 'CSS3',         cat: 'Styling',    desc: 'Flexbox, Grid, animations, custom properties, responsive design.', pct: 85 },
  { icon: '⚡', name: 'JavaScript',   cat: 'ES6+',       desc: 'DOM manipulation, async/await, modern JS patterns.',               pct: 75 },
  { icon: '⚛️', name: 'React.js',     cat: 'Framework',  desc: 'Components, hooks, state management, single-page apps.',           pct: 70 },
  { icon: '🔀', name: 'React Router', cat: 'Routing',    desc: 'Client-side routing, nested routes, navigation guards.',           pct: 65 },
  { icon: '▲',  name: 'Next.js',      cat: 'Framework',  desc: 'SSR, SSG, file-based routing, API routes, image optimization.',    pct: 45 },
  { icon: '🎛️', name: 'Material UI',  cat: 'UI Library', desc: 'Pre-built components, theming, responsive layout system.',         pct: 60 },
  { icon: '🅱️', name: 'Bootstrap',    cat: 'UI Library', desc: 'Rapid UI development, grid system, utility classes.',              pct: 80 },
  { icon: '🔧', name: 'Git & GitHub', cat: 'DevTools',   desc: 'Version control, branching, pull requests, collaboration.',        pct: 72 },
];

export default function Skills() {
  const barsRef = useRef([]);

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.style.width = e.target.dataset.pct + '%';
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.3 });
    barsRef.current.forEach(b => b && obs.observe(b));
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <div className="page-hero">
        <div className="page-ghost">SKILLS</div>
        <Link className="back-link" to="/">← Back Home</Link>
        <p className="page-label">01 — Toolkit</p>
        <h1 className="page-title">What I<br /><em>Work With.</em></h1>
        <p className="page-sub">Technologies I use daily — rated honestly based on my current level.</p>
      </div>

      <main className="skills-main">
        <div className="skills-grid">
          {SKILLS.map((s, i) => (
            <div className="skill-card" key={s.name}>
              <div className="sk-top">
                <span className="sk-icon">{s.icon}</span>
                <div>
                  <div className="sk-name">{s.name}</div>
                  <div className="sk-cat">{s.cat}</div>
                </div>
              </div>
              <div className="sk-desc">{s.desc}</div>
              <div className="rating-wrap">
                <div className="rating-label">
                  <span>Proficiency</span>
                  <span className="rating-pct">{s.pct}%</span>
                </div>
                <div className="rating-track">
                  <div
                    className="rating-bar"
                    data-pct={s.pct}
                    ref={el => barsRef.current[i] = el}
                  />
                </div>
              </div>
            </div>
          ))}
          {/* END card */}
          <div className="skill-end">
            <div className="end-word">END</div>
          </div>
        </div>

        <div className="legend">
          <div className="legend-item"><div className="legend-dot" /><div className="legend-txt">Beginner 0–40%</div></div>
          <div className="legend-item"><div className="legend-dot" /><div className="legend-txt">Intermediate 40–70%</div></div>
          <div className="legend-item"><div className="legend-dot" /><div className="legend-txt">Advanced 70–100%</div></div>
        </div>
      </main>

      <footer><p>© 2025 Eslam Samir</p><p>GIZA, EGYPT</p></footer>
    </>
  );
}
