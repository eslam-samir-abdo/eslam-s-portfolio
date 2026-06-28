// src/pages/About.js
import { Link } from 'react-router-dom';
import { useProjects } from '../hooks/useProjects';
import './About.css';

export default function About() {
  const { projects } = useProjects();

  return (
    <>
      <div className="page-hero">
        <div className="page-ghost">ABOUT</div>
        <Link className="back-link" to="/">← Back Home</Link>
        <p className="page-label">03 — Who I Am</p>
        <h1 className="page-title">Eslam<br /><em>Samir.</em></h1>
        <p className="page-sub">Frontend Developer · Giza, Egypt · Cairo University</p>
      </div>

      <main className="about-main">

        {/* BIO */}
        <div className="about-intro">
          <div className="about-text">
            <p>I'm <strong>Eslam Samir</strong>, a Frontend Developer based in <strong>Giza, Egypt</strong>. Passionate about turning ideas into clean, responsive, user-friendly web experiences.</p>
            <p>Currently studying <strong>Accounting at Cairo University</strong> (2023–2027) while building real-world projects every day. I believe the best way to learn is by shipping.</p>
            <p>My stack centers around <strong>HTML, CSS, JavaScript, and React</strong>. Expanding into <strong>Next.js</strong> and <strong>Material UI</strong>.</p>
          </div>
          <div className="about-text">
            <p>Every project is a chance to learn — a better state pattern, a slicker animation, a more accessible component.</p>
            <p>I'm available for <strong>freelance work</strong> and looking for opportunities to join a team where I can grow fast and contribute meaningfully.</p>
            <p>When I'm not coding, I'm studying or planning the next project. <strong>Always building. Always learning.</strong></p>
          </div>
        </div>

        {/* QUOTE */}
        <div className="big-quote">
          <blockquote>
            "I don't wait to feel ready.<br />I build until I <em>am</em> ready."
          </blockquote>
          <cite>— Eslam Samir</cite>
        </div>

        {/* STATS */}
        <div className="stats-section">
          <h2 className="section-h">By The Numbers</h2>
          <div className="stats-grid">
            <div className="stat-box">
              <div className="stat-n">{projects.length}<em>+</em></div>
              <div className="stat-l">Projects Completed</div>
            </div>
            <div className="stat-box">
              <div className="stat-n">2<em>+</em></div>
              <div className="stat-l">Years of Learning</div>
            </div>
            <div className="stat-box">
              <div className="stat-n">6</div>
              <div className="stat-l">Core Technologies</div>
            </div>
          </div>
        </div>

        {/* TIMELINE */}
        <div className="timeline-section">
          <h2 className="section-h">Experience & Education</h2>
          <div className="tl-item">
            <div className="tl-date">Aug 2024<br />— Present</div>
            <div>
              <div className="tl-title">Frontend Developer</div>
              <div className="tl-place">Freelance · Self-Employed · Giza, Egypt</div>
              <div className="tl-desc">Building responsive web pages and apps using HTML, CSS, JavaScript, and React. Applying Git & GitHub for version control and delivering production-ready code.</div>
            </div>
          </div>
          <div className="tl-item">
            <div className="tl-date">Jan 2023<br />— Jan 2027</div>
            <div>
              <div className="tl-title">Bachelor of Accounting</div>
              <div className="tl-place">Cairo University · Giza, Egypt</div>
              <div className="tl-desc">Balancing academic studies with continuous self-development in frontend engineering — building projects in parallel to bridge theory and real-world application.</div>
            </div>
          </div>
        </div>

        {/* LANGUAGES */}
        <div className="lang-section">
          <h2 className="section-h">Languages</h2>
          <div className="lang-grid">
            <div className="lang-card">
              <div className="lang-name">Arabic</div>
              <div className="lang-level">Native</div>
              <div className="lang-detail">Full proficiency — reading, writing, speaking.</div>
            </div>
            <div className="lang-card">
              <div className="lang-name">English</div>
              <div className="lang-level">Good</div>
              <div className="lang-detail">Reading, writing and speaking.</div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="cta-strip">
          <div className="cta-text">Ready to work<br />together? <em>Let's go.</em></div>
          <div className="cta-btns">
            <Link className="cta-btn" to="/contact">Get In Touch</Link>
            <Link className="cta-btn-ghost" to="/projects">View Projects</Link>
          </div>
        </div>

      </main>
      <footer><p>© 2025 Eslam Samir</p><p>GIZA, EGYPT</p></footer>
    </>
  );
}
