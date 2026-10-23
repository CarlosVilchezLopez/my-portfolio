import { useEffect, useState } from 'react';
import { flushSync } from 'react-dom';

const REDUCED_MOTION = '(prefers-reduced-motion: reduce)';

export function prefersReducedMotion() {
  return typeof window.matchMedia === 'function' && window.matchMedia(REDUCED_MOTION).matches;
}

// Aplica un cambio de estado con una transición de la página (View Transitions API) si el navegador la soporta
export function withViewTransition(update) {
  if (!document.startViewTransition || prefersReducedMotion()) {
    update();
    return null;
  }
  const transition = document.startViewTransition(() => flushSync(update));
  // Se rechaza si el navegador se salta la animación (por ejemplo, con dos clics seguidos); el cambio se aplica igual
  transition.ready.catch(() => {});
  return transition;
}

// true si el sistema pide reducir animaciones
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(prefersReducedMotion);

  useEffect(() => {
    if (typeof window.matchMedia !== 'function') return;
    const query = window.matchMedia(REDUCED_MOTION);
    const onChange = () => setReduced(query.matches);
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  return reduced;
}

// Escribe el texto letra a letra. Vuelve a empezar si cambia el texto (por ejemplo, al cambiar de idioma)
// o el número `run`. Devuelve lo escrito hasta ahora y si ya terminó.
export function useTypewriter(text, { speed = 40, delay = 0, run = 0 } = {}) {
  const reduced = usePrefersReducedMotion();
  // El progreso se guarda junto a la vuelta a la que pertenece; si la vuelta cambió, se empieza de cero
  const round = `${run}:${text}`;
  const [progress, setProgress] = useState({ round, length: 0 });

  useEffect(() => {
    if (reduced) return;
    let length = 0;
    let interval;
    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        length += 1;
        setProgress({ round, length });
        if (length >= text.length) clearInterval(interval);
      }, speed);
    }, delay);
    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [round, text, speed, delay, reduced]);

  let length = progress.round === round ? progress.length : 0;
  if (reduced) length = text.length;
  return { typed: text.slice(0, length), done: length >= text.length };
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

  // Recibe el evento del clic para que el nuevo tema se expanda en círculo desde el botón
  const toggleTheme = (event) => {
    const next = !dark;
    try {
      localStorage.setItem('theme', next ? 'dark' : 'light');
    } catch {
      // Sin localStorage el tema solo dura hasta recargar
    }

    const root = document.documentElement;
    root.classList.add('theme-transition');
    const transition = withViewTransition(() => {
      setDark(next);
      root.classList.toggle('dark', next);
    });
    if (!transition) {
      root.classList.remove('theme-transition');
      return;
    }

    const button = event.currentTarget.getBoundingClientRect();
    const x = button.left + button.width / 2;
    const y = button.top + button.height / 2;
    const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
    // Las promesas se rechazan si el navegador se salta la transición; el tema ya cambió igualmente
    transition.ready
      .then(() => {
        root.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
          { duration: 550, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', pseudoElement: '::view-transition-new(root)' }
        );
      })
      .catch(() => {});
    transition.finished.catch(() => {}).finally(() => root.classList.remove('theme-transition'));
  };

  return [dark, toggleTheme];
}
