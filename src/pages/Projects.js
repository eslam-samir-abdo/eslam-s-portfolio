// src/pages/Projects.js
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useProjects } from '../hooks/useProjects';
import { useAdmin } from '../context/AdminContext';
import './Projects.css';

const EMPTY = { title: '', desc: '', tags: '', github: '', demo: '', year: '', category: '', featured: false };
const UNCATEGORIZED = 'Other';

export default function Projects() {
  const { projects, addProject, updateProject, deleteProject } = useProjects();
  const { isAdmin, openLock } = useAdmin();

  const [open, setOpen]     = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm]     = useState(EMPTY);
  const [err, setErr]       = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null); // المشروع المطلوب حذفه

  const pad = n => n < 10 ? '0' + n : '' + n;

  // ── GROUP PROJECTS BY CATEGORY ──
  function groupProjects(list) {
    const groups = {};
    list.forEach(p => {
      const cat = (p.category || '').trim() || UNCATEGORIZED;
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push(p);
    });
    const order = Object.keys(groups).filter(c => c !== UNCATEGORIZED);
    if (groups[UNCATEGORIZED]) order.push(UNCATEGORIZED);
    return order.map(cat => ({ category: cat, items: groups[cat] }));
  }

  const grouped = groupProjects(projects);

  function startAdd() {
    if (!isAdmin) { openLock(); return; }
    setEditId(null);
    setForm(EMPTY);
    setOpen(true);
  }

  function startEdit(p) {
    if (!isAdmin) { openLock(); return; }
    setEditId(p.id);
    setForm({
      title: p.title, desc: p.desc,
      tags: p.tags.join(', '),
      github: p.github || '', demo: p.demo || '',
      year: p.year, category: p.category || '',
      featured: p.featured,
    });
    setOpen(true);
  }

  function handleDeleteClick(p) {
    if (!isAdmin) { openLock(); return; }
    setDeleteTarget(p);
  }

  function confirmDelete() {
    if (deleteTarget) deleteProject(deleteTarget.id);
    setDeleteTarget(null);
  }

  function handleSave() {
    if (!form.title.trim()) {
      setErr(true); setTimeout(() => setErr(false), 1200); return;
    }
    const data = {
      title:    form.title.trim(),
      desc:     form.desc.trim(),
      tags:     form.tags.split(',').map(t => t.trim()).filter(Boolean),
      github:   form.github.trim(),
      demo:     form.demo.trim(),
      year:     form.year.trim() || new Date().getFullYear().toString(),
      category: form.category.trim(),
      featured: form.featured,
    };
    if (editId) updateProject(editId, data);
    else addProject(data);
    setOpen(false); setForm(EMPTY); setEditId(null);
  }

  function handleOverlay(e) {
    if (e.target.classList.contains('modal-overlay')) {
      setOpen(false); setForm(EMPTY); setEditId(null);
    }
  }

  return (
    <>
      <div className="page-hero">
        <div className="page-ghost">WORK</div>
        <Link className="back-link" to="/">← Back Home</Link>
        <p className="page-label">02 — Portfolio</p>
        <h1 className="page-title">Every<br /><em>Project.</em></h1>
        <p className="page-sub">{projects.length} project{projects.length !== 1 ? 's' : ''} — and counting.</p>
      </div>

      <main className="proj-main">
        {/* الزرار يظهر بس وإنت Admin */}
        {isAdmin && (
          <div className="toolbar">
            <div className="proj-total">
              Total: <span>{projects.length}</span> projects
              <span className="admin-badge"><span className="dot" />Admin Mode</span>
            </div>
            <button className="btn-add" onClick={startAdd}>+ Add Project</button>
          </div>
        )}

        {projects.length === 0 && (
          <div className="empty-state"><p>No projects yet.</p></div>
        )}

        {grouped.map(group => (
          <div className="category-group" key={group.category}>
            <h2 className="category-title">{group.category}</h2>
            <div className="projects-list">
              {group.items.map((p) => {
                const globalIndex = projects.findIndex(pr => pr.id === p.id);
                return (
                  <div className="project-item" key={p.id}>
                    <div className="proj-num">{pad(globalIndex + 1)}<br /><span>{p.year}</span></div>
                    <div className="proj-body">
                      <div className="proj-title">{p.title}</div>
                      <div className="proj-desc">{p.desc}</div>
                      <div className="proj-tags">
                        {p.tags.map(t => <span className="tag" key={t}>{t}</span>)}
                      </div>
                    </div>
                    <div className="proj-actions">
                      {p.demo   && <a className="btn-demo" href={p.demo}   target="_blank" rel="noreferrer">Live Demo ↗</a>}
                      {p.github && <a className="btn-gh"   href={p.github} target="_blank" rel="noreferrer">GitHub ↗</a>}
                      {isAdmin && (
                        <>
                          <button className="btn-edit" onClick={() => startEdit(p)}>✎ Edit</button>
                          <button className="btn-del"  onClick={() => handleDeleteClick(p)}>✕</button>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </main>

      <footer><p>© 2025 Eslam Samir</p><p>GIZA, EGYPT</p></footer>

      {/* ── ADD / EDIT PROJECT MODAL ── */}
      {open && (
        <div className="modal-overlay" onClick={handleOverlay}>
          <div className="modal-box">
            <h3>{editId ? 'Edit Project' : 'New Project'}</h3>
            <label>Project Title *</label>
            <input
              className={err ? 'err' : ''}
              type="text" placeholder="e.g. E-Commerce Store"
              value={form.title} onChange={e => setForm({ ...form, title: e.target.value })}
            />
            <label>Category <span className="opt-hint">(same category groups together)</span></label>
            <input
              type="text" placeholder="e.g. E-Commerce, Tools, Landing Pages..."
              value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}
            />
            <label>Description</label>
            <textarea
              placeholder="What does this project do?"
              value={form.desc} onChange={e => setForm({ ...form, desc: e.target.value })}
            />
            <label>Tags (comma separated)</label>
            <input
              type="text" placeholder="React, CSS, API"
              value={form.tags} onChange={e => setForm({ ...form, tags: e.target.value })}
            />
            <label>GitHub Link</label>
            <input
              type="url" placeholder="https://github.com/username/repo"
              value={form.github} onChange={e => setForm({ ...form, github: e.target.value })}
            />
            <label>Live Demo Link <span className="opt-hint">(optional)</span></label>
            <input
              type="url" placeholder="https://myproject.vercel.app"
              value={form.demo} onChange={e => setForm({ ...form, demo: e.target.value })}
            />
            <p className="modal-hint">✦ Add a demo link and the Live Demo button will appear.</p>
            <div className="modal-row">
              <div>
                <label>Year</label>
                <input
                  type="text" placeholder="2025" maxLength={4}
                  value={form.year} onChange={e => setForm({ ...form, year: e.target.value })}
                />
              </div>
              <div>
                <label>Featured on Home?</label>
                <select
                  value={form.featured}
                  onChange={e => setForm({ ...form, featured: e.target.value === 'true' })}
                >
                  <option value="false">No</option>
                  <option value="true">Yes</option>
                </select>
              </div>
            </div>
            <div className="modal-actions">
              <button className="btn-save" onClick={handleSave}>{editId ? 'Update Project' : 'Save Project'}</button>
              <button className="btn-cancel" onClick={() => { setOpen(false); setForm(EMPTY); setEditId(null); }}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* ── DELETE CONFIRM MODAL ── */}
      {deleteTarget && (
        <div className="modal-overlay" onClick={e => { if (e.target.classList.contains('modal-overlay')) setDeleteTarget(null); }}>
          <div className="modal-box confirm-box">
            <div className="confirm-icon">🗑️</div>
            <h3 className="confirm-title">Remove Project?</h3>
            <p className="confirm-text">
              You're about to permanently remove <strong>{deleteTarget.title}</strong> from your portfolio. This can't be undone.
            </p>
            <div className="modal-actions">
              <button className="btn-confirm-delete" onClick={confirmDelete}>Yes, Remove It</button>
              <button className="btn-cancel" onClick={() => setDeleteTarget(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
