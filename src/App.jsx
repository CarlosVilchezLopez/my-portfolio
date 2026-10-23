import React from 'react';
import ReactGA from 'react-ga4';
import { LanguageProvider } from './i18n';
import Header from './components/header';
import Hero from './components/hero';
import About from './components/about';
import Skills from './components/skills';
import Projects from './components/projects';
import Contact from './components/contact';
import Footer from './components/footer';

// Google Analytics solo en producción, para no contar las visitas mientras se desarrolla.
// Al inicializarse ya registra la visita a la página.
if (import.meta.env.PROD) {
  ReactGA.initialize('G-FZ0T8783H8');
}

function App() {
  return (
    <LanguageProvider>
      <Header />
      <main id="main">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </LanguageProvider>
  );
}

export default App;
