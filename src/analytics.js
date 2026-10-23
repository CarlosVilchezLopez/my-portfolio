import ReactGA from 'react-ga4';

const MEASUREMENT_ID = 'G-FZ0T8783H8';
const STORAGE_KEY = 'analytics-consent';

// 'granted' si el visitante aceptó, 'denied' si lo rechazó, null si aún no ha elegido
export function getConsent() {
  try {
    const consent = localStorage.getItem(STORAGE_KEY);
    return consent === 'granted' || consent === 'denied' ? consent : null;
  } catch {
    return null;
  }
}

export function setConsent(consent) {
  try {
    localStorage.setItem(STORAGE_KEY, consent);
  } catch {
    // Sin localStorage la elección solo dura hasta recargar
  }
  if (consent === 'granted') startAnalytics();
  else stopAnalytics();
}

let started = false;

// Google Analytics solo en producción, para no contar las visitas mientras se desarrolla.
// Al inicializarse ya registra la visita a la página.
export function startAnalytics() {
  if (!import.meta.env.PROD) return;
  window[`ga-disable-${MEASUREMENT_ID}`] = false;
  if (started) return;
  ReactGA.initialize(MEASUREMENT_ID);
  started = true;
}

// Si el visitante retira el permiso: Analytics deja de enviar datos y se borran sus cookies (_ga, _ga_…)
function stopAnalytics() {
  window[`ga-disable-${MEASUREMENT_ID}`] = true;

  // Analytics guarda las cookies en el dominio más alto posible (.carlosvilchez.com), así que se prueba con todos
  const labels = window.location.hostname.split('.');
  const domains = [''];
  for (let i = 0; i < labels.length - 1; i += 1) domains.push(`; domain=.${labels.slice(i).join('.')}`);

  for (const cookie of document.cookie.split(';')) {
    const name = cookie.split('=')[0].trim();
    if (name !== '_ga' && !name.startsWith('_ga_')) continue;
    for (const domain of domains) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${domain}`;
    }
  }
}
