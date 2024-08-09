import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/header';
import About from './components/about';
import Projects from './components/projects';
import Contact from './components/contact';
import Footer from './components/footer'; // Importa el Footer aquí

function App() {
  return (
    <Router>
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<About />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
      <Footer /> {/* Footer siempre estará al final */}
    </div>
  </Router>
  );
}

export default App;
