// Ajustes compartidos de las animaciones con Motion
export const ease = [0.22, 1, 0.36, 1];

// Aparece de abajo hacia arriba la primera vez que entra en pantalla.
// Se usa con componentes de Motion: <m.div {...reveal(0.1)}>
export function reveal(delay = 0) {
  return {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '0px 0px -80px 0px' },
    transition: { duration: 0.6, ease, delay },
  };
}

// Variantes para mostrar los elementos de la portada uno tras otro al cargar
export const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

export const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

// Guarda la posición del cursor dentro del elemento en --x y --y, para los efectos de luz del CSS
export function trackPointer(event) {
  const rect = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty('--x', `${event.clientX - rect.left}px`);
  event.currentTarget.style.setProperty('--y', `${event.clientY - rect.top}px`);
}
