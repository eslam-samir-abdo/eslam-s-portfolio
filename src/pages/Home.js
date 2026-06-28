// src/pages/Home.js
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useProjects } from '../hooks/useProjects';
import { introDone, setIntroDone } from '../App';
import './Home.css';

export default function Home() {
  const { projects } = useProjects();
  const featured = projects.filter(p => p.featured).slice(0, 3);
  const [visible,   setVisible]   = useState(introDone);
  const [introHide, setIntroHide] = useState(introDone);

  useEffect(() => {
    if (introDone) return;
    const t1 = setTimeout(() => setIntroHide(true), 2500);
    const t2 = setTimeout(() => { setVisible(true); setIntroDone(); }, 2700);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const pad = n => n < 10 ? '0' + n : '' + n;

  return (
    <>
      {/* INTRO */}
      <div className={`intro${introHide ? ' hide' : ''}`}>
        <div className="intro-line"><span>ESLAM</span></div>
        <div className="intro-line"><span className="gold">SAMIR</span></div>
        <p className="intro-sub">Frontend Developer</p>
      </div>

      <div className={`home-wrap${visible ? ' visible' : ''}`}>

        {/* HERO */}
        <section className="hero">
          <div className="hero-ghost">FRONT</div>
          <div className="hero-badge">
            <span className="hero-dot" />
            Available for opportunities
          </div>
          <h1 className="hero-name">
            ESLAM<br /><em>SAMIR</em>
          </h1>
          <div className="hero-footer">
            <p className="hero-desc">
              Frontend developer focused on crafting responsive, pixel-perfect web experiences. Based in Giza, Egypt.
            </p>
            <Link className="hero-cta" to="/projects">View Work ↓</Link>
          </div>
        </section>
        
        {/* FEATURED PROJECTS */}
        <section className="featured">
          <div className="feat-header">
            <div>
              <p className="sec-label">Selected Work</p>
              <h2 className="sec-title">Featured<br />Projects</h2>
            </div>
            <Link className="see-all" to="/projects">All Projects →</Link>
          </div>
          <div className="feat-list">
            {featured.map((p, i) => (
              <Link className="feat-item" to="/projects" key={p.id}>
                <div className="fi-num">
                  {pad(i + 1)}<br />
                  <span>{p.year}</span>
                </div>
                <div className="fi-body">
                  <div className="fi-title">{p.title}</div>
                  <div className="fi-desc">{p.desc}</div>
                </div>
                <div className="fi-tags">
                  {p.tags.map(t => <span className="tag" key={t}>{t}</span>)}
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* STATS */}
        <div className="stats-strip">
          <div className="stat-block">
            <div className="stat-n">{projects.length}<em>+</em></div>
            <div className="stat-l">Projects Completed</div>
          </div>
          <div className="stat-block">
            <div className="stat-n">2<em>+</em></div>
            <div className="stat-l">Years Learning</div>
          </div>
          <div className="stat-block">
            <div className="stat-n">6</div>
            <div className="stat-l">Core Technologies</div>
          </div>
        </div>

        <footer>
          <p>© 2025 Eslam Samir</p>
          <p>GIZA, EGYPT</p>
        </footer>
      </div>
    </>
  );
}
