import React, { useState, useEffect, useRef } from 'react';
import typingSound from '../assets/typing.mp3';
import translations from '../translation.json'; // Importa el archivo JSON con las traducciones

const About = ({ language }) => {
  const [text, setText] = useState(''); // Estado para manejar el texto que se escribe
  const [typingStarted, setTypingStarted] = useState(false); // Estado para manejar si se ha iniciado la escritura
  const audioRef = useRef(new Audio(typingSound)); // Referencia para manejar el audio de la escritura
  const fullText = translations[language].aboutParagraph; // Texto completo a escribir, basado en el idioma seleccionado

  // Función para iniciar la escritura y el sonido
  const startTyping = () => {
    setTypingStarted(true);
  };

  useEffect(() => {
    if (typingStarted) {
      const audio = audioRef.current;
      audio.loop = true; // Repite el sonido en bucle

      // Inicia la reproducción del sonido
      audio.play().catch(error => console.log("Error playing sound:", error));

      const interval = setInterval(() => {
        setText((prev) => {
          if (prev.length < fullText.length) {
            return fullText.slice(0, prev.length + 1);
          } else {
            clearInterval(interval);
            audio.pause(); // Detiene el sonido cuando termina de escribir
            return prev;
          }
        });
      }, 50); // Controla la velocidad de la escritura

      return () => {
        clearInterval(interval);
        audio.pause(); // Asegura que el sonido se detenga si el componente se desmonta
      };
    }
  }, [typingStarted, fullText]);

  return (
    <section id="about" className="p-8 bg-white text-gray-900">
      {/* Título del componente, traducido dinámicamente */}
      <h2 className="text-2xl font-semibold mb-4">{translations[language].aboutTitle}</h2>
      
      {/* Botón para iniciar la escritura */}
      {!typingStarted && (
        <button onClick={startTyping} className="bg-blue-500 text-white p-2 rounded-md">
          Click Me
        </button>
      )}
      
      {/* Texto que se escribe dinámicamente */}
      {typingStarted && <p className="text-gray-700 text-lg">{text}</p>}

      {/* Sección de Skills */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">{translations[language].skillsTitle}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {/* Cada una de las habilidades, traducidas dinámicamente */}
          <div className="bg-gray-100 p-4 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300">
            <h4 className="text-lg font-bold">{translations[language].skills.csharp}</h4>
            <p className="text-gray-600">{translations[language].skills.csharpDesc}</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300">
            <h4 className="text-lg font-bold">{translations[language].skills.sql}</h4>
            <p className="text-gray-600">{translations[language].skills.sqlDesc}</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300">
            <h4 className="text-lg font-bold">{translations[language].skills.rest}</h4>
            <p className="text-gray-600">{translations[language].skills.restDesc}</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300">
            <h4 className="text-lg font-bold">{translations[language].skills.java}</h4>
            <p className="text-gray-600">{translations[language].skills.javaDesc}</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300">
            <h4 className="text-lg font-bold">{translations[language].skills.python}</h4>
            <p className="text-gray-600">{translations[language].skills.pythonDesc}</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300">
            <h4 className="text-lg font-bold">{translations[language].skills.netCore}</h4>
            <p className="text-gray-600">{translations[language].skills.netCoreDesc}</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300">
            <h4 className="text-lg font-bold">{translations[language].skills.flutter}</h4>
            <p className="text-gray-600">{translations[language].skills.flutterDesc}</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300">
            <h4 className="text-lg font-bold">{translations[language].skills.htmlCss}</h4>
            <p className="text-gray-600">{translations[language].skills.htmlCssDesc}</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300">
            <h4 className="text-lg font-bold">{translations[language].skills.javascript}</h4>
            <p className="text-gray-600">{translations[language].skills.javascriptDesc}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
