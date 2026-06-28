// src/hooks/useProjects.js
import { useState, useEffect } from 'react';

const STORAGE_KEY = 'eslam_projects_v1';

// مفيش مشاريع افتراضية — هتضيف مشاريعك الحقيقية إنت بنفسك من زرار Add Project
const DEFAULT_PROJECTS = [];

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_PROJECTS));
  return DEFAULT_PROJECTS;
}

export function useProjects() {
  const [projects, setProjects] = useState(load);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  }, [projects]);

  function addProject(data) {
    const newId = projects.length ? Math.max(...projects.map(p => p.id)) + 1 : 1;
    setProjects(prev => [...prev, { id: newId, ...data }]);
  }

  function updateProject(id, data) {
    setProjects(prev => prev.map(p => p.id === id ? { ...p, ...data } : p));
  }

  function deleteProject(id) {
    setProjects(prev => prev.filter(p => p.id !== id));
  }

  return { projects, addProject, updateProject, deleteProject };
}
