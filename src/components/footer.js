import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-4 mt-8">
      <div className="container mx-auto text-center">
        <h3 className="text-xl font-semibold mb-4">Connect with me</h3>
        <div className="flex justify-center space-x-6 mb-4">
          <a href="https://github.com/tu-usuario" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
            <i className="fa fa-github text-3xl"></i>
          </a>
          <a href="https://linkedin.com/in/tu-usuario" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
            <i className="fa fa-linkedin text-3xl"></i>
          </a>
         
          
        </div>
        <p className="text-gray-500">&copy; {new Date().getFullYear()} Carlos Vilchez. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
