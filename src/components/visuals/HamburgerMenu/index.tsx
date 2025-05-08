/**
 * HamburgerMenu Component
 * 
 * A button that toggles a navigation menu, represented by three horizontal lines stacked on top of each other.
 * Commonly used to save space in mobile interfaces.
 */
'use client';

import { useState } from 'react';

export default function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleMenu = () => setIsOpen(!isOpen);
  
  return (
    <div className="relative">
      {/* Hamburger Button */}
      <button 
        onClick={toggleMenu}
        className="relative z-10 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
        aria-expanded={isOpen}
        aria-label="Main menu"
      >
        <div className="flex flex-col justify-center items-center h-6 w-6 space-y-1.5">
          <span 
            className={`block h-0.5 w-6 bg-foreground transform transition duration-300 ease-in-out ${
              isOpen ? 'rotate-45 translate-y-2' : ''
            }`}
          />
          <span 
            className={`block h-0.5 w-6 bg-foreground transition duration-300 ease-in-out ${
              isOpen ? 'opacity-0' : ''
            }`}
          />
          <span 
            className={`block h-0.5 w-6 bg-foreground transform transition duration-300 ease-in-out ${
              isOpen ? '-rotate-45 -translate-y-2' : ''
            }`}
          />
        </div>
      </button>
      
      {/* Menu Panel */}
      <div 
        className={`absolute top-full mt-2 left-0 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-md py-2 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 invisible'
        }`}
      >
        <ul>
          <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">Home</li>
          <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">About</li>
          <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">Services</li>
          <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">Products</li>
          <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">Contact</li>
        </ul>
      </div>
    </div>
  );
}
