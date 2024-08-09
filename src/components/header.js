import React from 'react';
import { Link } from 'react-router-dom';
import myPhoto from '../assets/MyPhoto.jpeg';

const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-4 flex flex-col sm:flex-row items-center justify-center sm:justify-between">
      <div className="flex items-center mb-4 sm:mb-0">
        <img src={myPhoto} alt="My Photo" className="h-12 w-12 sm:h-16 sm:w-16 rounded-full mr-4" />
        <div className="flex flex-col">
          <h1 className="text-2xl sm:text-3xl font-bold">Carlos Vilchez</h1>
          <h2 className="text-xl sm:text-2xl text-gray-400">Full Stack Developer</h2>
        </div>
      </div>
      <nav>
        <ul className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 mt-2 sm:mt-0">
          <li><Link to="/about" className="hover:text-gray-400">About</Link></li>
          <li><Link to="/projects" className="hover:text-gray-400">Projects</Link></li>
          <li><Link to="/contact" className="hover:text-gray-400">Contact</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;