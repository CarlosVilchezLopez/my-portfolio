import React from 'react';
import { Link } from 'react-router';
import Select from 'react-select';
import myPhoto from '../assets/MyPhoto.jpeg';
import flagEn from '../assets/united-states.png';
import flagEs from '../assets/nicaragua.png';
import translations from '../translation.json'; // Importa el archivo JSON

// Definimos las opciones del select de idiomas, cada una incluye una imagen de bandera y una etiqueta de idioma
const options = [
  { value: 'en', label: <div><img src={flagEn} alt="En" className="inline-block h-4 w-4 mr-2"/>En</div> },
  { value: 'es', label: <div><img src={flagEs} alt="Es" className="inline-block h-4 w-4 mr-2"/>Es</div> },
];

// Personalización de los estilos de react-select para que el select se integre con el diseño del sitio
const customStyles = {
  control: (provided) => ({
    ...provided,
    backgroundColor: '#374151', // Color de fondo para el select (bg-gray-700)
    color: '#FFFFFF', // Color del texto dentro del select (text-white)
    minWidth: '80px', // Ancho mínimo del select para que sea más compacto
    width: 'auto', // Ajuste automático del ancho según el contenido
    paddingRight: '2px', // Reducción del padding para hacer el select más estrecho
  }),
  singleValue: (provided) => ({
    ...provided,
    color: '#FFFFFF', // Color del texto en la opción seleccionada
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: '#374151', // Color de fondo del menú desplegable
  }),
  option: (provided, state) => ({
    ...provided,
    display: 'flex',
    alignItems: 'center', // Alinea verticalmente la imagen y el texto en las opciones
    padding: '4px 8px', // Ajuste del padding para que las opciones sean más compactas
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    padding: '4px', // Reduce el padding del indicador del dropdown para que sea más compacto
  }),
};

const Header = ({ language, setLanguage }) => {
  // Función que maneja el cambio de idioma cuando se selecciona una opción del select
  const handleLanguageChange = (selectedOption) => {
    setLanguage(selectedOption.value); // Actualiza el estado del idioma en el componente padre (App.js)
  };

  return (
    <header className="bg-gray-800 text-white p-4 flex flex-col sm:flex-row items-center justify-between">
      <div className="flex items-center mb-4 sm:mb-0">
        {/* Imagen de perfil */}
        <img src={myPhoto} alt="My Photo" className="h-12 w-12 sm:h-16 sm:w-16 rounded-full mr-4" />
        {/* Título y subtítulo del header, traducidos dinámicamente según el idioma seleccionado */}
        <div className="flex flex-col">
          <h1 className="text-2xl sm:text-3xl font-bold">{translations[language].title}</h1>
          <h2 className="text-xl sm:text-2xl text-gray-400">{translations[language].subtitle}</h2>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-between w-full sm:w-auto">
      <nav className="flex space-x-4">
        <Link to="/about" className="hover:text-gray-400 text-white p-2">
          {translations[language].about}
        </Link>
        <Link to="/projects" className="hover:text-gray-400 text-white p-2">
          {translations[language].projects}
        </Link>
        <Link to="/contact" className="hover:text-gray-400 text-white p-2">
          {translations[language].contact}
        </Link>
      </nav>
        <div className="mt-4 sm:mt-0 sm:ml-4 w-full sm:w-auto">
          <Select
            defaultValue={options.find(option => option.value === language)} // Muestra la opción seleccionada según el idioma actual
            options={options} // Opciones de idioma disponibles
            styles={customStyles} // Estilos personalizados para el select
            onChange={handleLanguageChange} // Maneja el cambio de idioma
            components={{
              IndicatorSeparator: () => null, // Oculta el separador entre la opción seleccionada y el indicador de dropdown
            }}
          />
        </div>
      </div>
    </header>
  );
}

export default Header;
