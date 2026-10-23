import { useEffect, useState } from 'react';

const REDUCED_MOTION = '(prefers-reduced-motion: reduce)';

// true si el sistema pide reducir animaciones
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(
    () => typeof window.matchMedia === 'function' && window.matchMedia(REDUCED_MOTION).matches
  );

  useEffect(() => {
    if (typeof window.matchMedia !== 'function') return;
    const query = window.matchMedia(REDUCED_MOTION);
    const onChange = () => setReduced(query.matches);
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  return reduced;
}

// Escribe el texto letra a letra; vuelve a empezar si cambia (por ejemplo, al cambiar de idioma)
export function useTypewriter(text, speed = 40) {
  const reduced = usePrefersReducedMotion();
  const [typed, setTyped] = useState(reduced ? text : '');

  useEffect(() => {
    if (reduced) {
      setTyped(text);
      return;
    }
    let length = 0;
    setTyped('');
    const interval = setInterval(() => {
      length += 1;
      setTyped(text.slice(0, length));
      if (length >= text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed, reduced]);

  return typed;
}

// Devuelve el id de la sección que ocupa el centro de la pantalla. `ids` debe ser estable.
export function useActiveSection(ids) {
  const [active, setActive] = useState(null);

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    for (const id of ids) {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    }
    return () => observer.disconnect();
  }, [ids]);

  return active;
}

// Modo claro/oscuro. El tema inicial lo aplica index.html antes de pintar la página.
export function useTheme() {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains('dark'));

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    try {
      localStorage.setItem('theme', next ? 'dark' : 'light');
    } catch {
      // Sin localStorage el tema solo dura hasta recargar
    }
  };

  return [dark, toggleTheme];
}
