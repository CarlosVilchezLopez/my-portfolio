import React from 'react';
import projectsData from '../projects.json'; // Importa desde `src/projects.json`

const Projects = ({ language }) => {

  // Función para cargar imágenes con manejo de errores
  

  return (
    <section id="projects" className="p-8 bg-gray-100 text-gray-900">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        {language === "en" ? "My Projects" : "Mis Proyectos"}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {projectsData.projects.map((project) => {
        

          return (
            <div key={project.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transform hover:scale-105 transition duration-300">
              <div className="h-48 flex justify-center items-center bg-gray-200">
              
                  <img src={process.env.PUBLIC_URL + '/' + project.image} className="max-h-full max-w-full object-contain" />
           
                 
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold mb-2">{project[language].title}</h3>
                <p className="text-gray-700 mb-4">{project[language].description}</p>
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700">
                  {language === "en" ? "View Project" : "Ver Proyecto"}
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Projects;
