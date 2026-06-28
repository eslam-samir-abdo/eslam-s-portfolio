// src/App.js
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Cursor from './components/Cursor';
import PageLoader from './components/PageLoader';
import { AdminProvider } from './context/AdminContext';
import Home from './pages/Home';
import Skills from './pages/Skills';
import Projects from './pages/Projects';
import About from './pages/About';
import Contact from './pages/Contact';
import './App.css';

// ← هنا بنحفظ إن الـ intro اتشافت — خارج الـ component عشان متتعملش reset
let introDone = false;

export { introDone };
export function setIntroDone() { introDone = true; }

export default function App() {
  return (
    <AdminProvider>
      <BrowserRouter>
        <Cursor />
        <PageLoader />
        <Navbar />
        <Routes>
          <Route path="/"         element={<Home />}     />
          <Route path="/skills"   element={<Skills />}   />
          <Route path="/projects" element={<Projects />} />
          <Route path="/about"    element={<About />}    />
          <Route path="/contact"  element={<Contact />}  />
        </Routes>
      </BrowserRouter>
    </AdminProvider>
  );
}
