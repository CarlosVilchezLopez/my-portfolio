import React, { useState, useEffect, useRef } from 'react';
import typingSound from '../assets/typing.mp3'

const About = () => {
  const [text, setText] = useState('');
  const [typingStarted, setTypingStarted] = useState(false);
  const audioRef = useRef(new Audio(typingSound));
  const fullText = `I am a passionate Full Stack Developer who finds joy in writing clean, efficient code. Solving complex problems is what drives me, and I thrive on the challenge of turning ideas into functional, well-crafted applications. Every day is an opportunity to learn something new, and I’m committed to continuous growth and improvement in my craft.`;

  const startTyping = () => {
    setTypingStarted(true);
  };

  useEffect(() => {
    if (typingStarted) {
      const audio = audioRef.current;
      audio.loop = true; // Hace que el sonido se repita en bucle

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
      }, 50);

      return () => {
        clearInterval(interval);
        audio.pause(); // Asegura que el sonido se detenga si el componente se desmonta
      };
    }
  }, [typingStarted]);

  return (
    <section id="about" className="p-8 bg-white text-gray-900">
      <h2 className="text-2xl font-semibold mb-4">About Me</h2>
      {!typingStarted && (
        <button onClick={startTyping} className="bg-blue-500 text-white p-2 rounded-md">
          Click Me
        </button>
      )}
      {typingStarted && <p className="text-gray-700 text-lg">{text}</p>}

        {/* Sección de Skills */}
        <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">My Skills</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-gray-100 p-4 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300">
            <h4 className="text-lg font-bold">C# & .NET</h4>
            <p className="text-gray-600">Skilled in developing robust applications using C# and .NET.</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300">
            <h4 className="text-lg font-bold">SQL & Databases</h4>
            <p className="text-gray-600">Proficient in SQL Server, PostgreSQL, and database design.</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300">
            <h4 className="text-lg font-bold">REST API</h4>
            <p className="text-gray-600">Experienced in building RESTful APIs for scalable applications.</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300">
            <h4 className="text-lg font-bold">Java</h4>
            <p className="text-gray-600">Proficient in Java development for various platforms.</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300">
            <h4 className="text-lg font-bold">Python</h4>
            <p className="text-gray-600">Experienced in Python for automation and data analysis.</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300">
            <h4 className="text-lg font-bold">.NET Core</h4>
            <p className="text-gray-600">Developing modern applications using .NET Core.</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300">
            <h4 className="text-lg font-bold">Flutter</h4>
            <p className="text-gray-600">Building cross-platform mobile apps with Flutter.</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300">
            <h4 className="text-lg font-bold">HTML & CSS</h4>
            <p className="text-gray-600">Skilled in crafting responsive and accessible web designs.</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300">
            <h4 className="text-lg font-bold">JavaScript</h4>
            <p className="text-gray-600">Proficient in JavaScript, including ES6+ and various frameworks.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
