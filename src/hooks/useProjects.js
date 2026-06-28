// src/hooks/useProjects.js
import { useState, useEffect } from 'react';

const STORAGE_KEY = 'eslam_projects_v1';

const DEFAULT_PROJECTS = [
  {
    id: 1,
    title: 'E-Commerce Store',
    desc: 'Full shopping experience with cart & product pages.',
    tags: ['React', 'CSS3', 'JS'],
    year: '2025',
    github: '',
    demo: '',
    category: 'E-Commerce Stores',
    featured: true,
  },
  {
    id: 2,
    title: 'E-Commerce #2',
    desc: 'Second storefront with enhanced UI patterns.',
    tags: ['React', 'Bootstrap'],
    year: '2024',
    github: 'https://github.com/',
    demo: '',
    category: 'E-Commerce Stores',
    featured: false,
  },
  {
    id: 3,
    title: 'Copywriter Portfolio',
    desc: 'Showcase of projects and skills.',
    tags: ['HTML', 'CSS', 'JS'],
    year: '2026',
    github: 'https://github.com/eslam-samir-abdo/copywriter-portifolio',
    demo: 'https://eslam-samir-abdo.github.io/copywriter-portifolio/',
    category: 'Portfolios',
    featured: true,
  },
  {
    id: 4,
    title: 'Weather App',
    desc: 'Real-time weather data with location search.',
    tags: ['React', 'API'],
    year: '2024',
    github: 'https://github.com/eslam-samir-abdo/Weather-app',
    demo: 'https://eslam-samir-abdo.github.io/Weather-app/',
    category: 'Other',
    featured: true,
  },
  {
    id: 5,
    title: 'Todo List App',
    desc: 'Task manager with add, delete & filter.',
    tags: ['React', 'Hooks'],
    year: '2025',
    github: '',
    demo: '',
    category: 'Other',
    featured: true,
  },
  {
    id: 6,
    title: 'Graphic Designer Portfolio',
    desc: 'Made using React.',
    tags: ['React', 'React Router', 'CSS'],
    year: '2026',
    github: 'https://github.com/eslam-samir-abdo/graphic-designer-portifolio',
    demo: 'https://eslam-samir-abdo.github.io/graphic-designer-portifolio/',
    category: 'Portfolios',
    featured: false,
  },
];

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
