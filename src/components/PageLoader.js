// src/components/PageLoader.js
import { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export default function PageLoader() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const firstRender = useRef(true);

  useEffect(() => {
    // Skip the loader on the very first page load (the intro animation handles that)
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 650);
    return () => clearTimeout(t);
  }, [location]);

  return (
    <div className={`page-loader${loading ? ' active' : ''}`}>
      <div className="page-loader-bar"></div>
      <div className="page-loader-mark">ES<span>.</span></div>
    </div>
  );
}
