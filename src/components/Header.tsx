// src/components/Header.tsx
import React from 'react';

interface Props {
  onLoginClick: () => void;
}

const Header: React.FC<Props> = ({ onLoginClick }) => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="text-2xl font-bold text-blue-600">MediLink</div>

        <nav className="space-x-6 text-gray-700 font-medium hidden md:flex">
          <a href="#contacto" className="hover:text-blue-600">Contáctanos</a>
          <a href="#especialidades" className="hover:text-blue-600">Especialidades</a>
          <a href="#medicos" className="hover:text-blue-600">Médicos</a>
          <a href="#nosotros" className="hover:text-blue-600">Sobre Nosotros</a>
        </nav>

        <button onClick={onLoginClick} className="text-blue-600 hover:text-blue-800 cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 
              20.25a8.25 8.25 0 0115 0" />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;
