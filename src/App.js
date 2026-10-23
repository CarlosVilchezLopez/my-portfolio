import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Header from './components/header';
import About from './components/about';
import Projects from './components/projects';
import Contact from './components/contact';
import Footer from './components/footer';
import ReactGA from 'react-ga4'; // Importa ReactGA

// Inicializa Google Analytics
ReactGA.initialize('G-FZ0T8783H8');

// Hook personalizado para rastrear vistas de página
function usePageTracking() {
  const location = useLocation();

  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: location.pathname + location.search });
  }, [location]);
}

function App() {
  const [language, setLanguage] = useState('en'); // Estado para el idioma

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <PageTrackingWrapper>
        <div className="flex flex-col min-h-screen">
          <Header language={language} setLanguage={setLanguage} /> {/* Pasa el estado y función de cambio */}
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<About language={language} />} />
              <Route path="/about" element={<About language={language} />} />
              <Route path="/projects" element={<Projects language={language} />} />
              <Route path="/contact" element={<Contact language={language} />} />
            </Routes>
          </div>
          <Footer /> {/* Footer siempre estará al final */}
        </div>
      </PageTrackingWrapper>
    </Router>
  );
}

// Componente Wrapper para usar el hook usePageTracking dentro del contexto del Router
function PageTrackingWrapper({ children }) {
  usePageTracking();
  return children;
}

export default App;
