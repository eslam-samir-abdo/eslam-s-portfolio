// src/components/Cursor.js
import { useEffect, useRef } from 'react';

export default function Cursor() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    const move = e => {
      el.style.left = e.clientX + 'px';
      el.style.top  = e.clientY + 'px';
    };
    const over = e => {
      if (e.target.closest('a,button,.skill-card,.project-item,.feat-item'))
        el.classList.add('xl');
      else
        el.classList.remove('xl');
    };
    document.addEventListener('mousemove', move);
    document.addEventListener('mouseover', over);
    return () => {
      document.removeEventListener('mousemove', move);
      document.removeEventListener('mouseover', over);
    };
  }, []);

  return <div id="cur" ref={ref} />;
}
