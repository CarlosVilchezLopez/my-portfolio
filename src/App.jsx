import React from 'react';
import { LazyMotion, MotionConfig, domAnimation } from 'motion/react';
import { getConsent, startAnalytics } from './analytics';
import LanguageProvider from './components/language-provider';
import Header from './components/header';
import Hero from './components/hero';
import About from './components/about';
import Skills from './components/skills';
import Projects from './components/projects';
import Contact from './components/contact';
import Footer from './components/footer';

// Si el visitante ya aceptó las cookies en otra visita, Analytics arranca directamente
if (getConsent() === 'granted') startAnalytics();

// LazyMotion con domAnimation carga solo las animaciones que usa la web (strict obliga a usar <m.*>).
// reducedMotion="user" quita los desplazamientos si el sistema pide reducir el movimiento.
function App() {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
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
      </MotionConfig>
    </LazyMotion>
  );
}

export default App;
