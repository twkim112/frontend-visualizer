/**
 * FadeTransition Component
 * 
 * A smooth transition where an element gradually changes opacity to appear or disappear.
 * This is one of the most common and subtle transition effects used in web interfaces.
 */
'use client';

import { useState } from 'react';

export default function FadeTransition() {
  const [isVisible, setIsVisible] = useState(true);
  
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };
  
  return (
    <div className="space-y-6">
      <button
        onClick={toggleVisibility}
        className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
      >
        {isVisible ? 'Hide Element' : 'Show Element'}
      </button>
      
      <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 bg-white dark:bg-gray-800">
        {/* The transition is applied to the div below */}
        <div 
          className={`
            transition-opacity duration-500 ease-in-out 
            ${isVisible ? 'opacity-100' : 'opacity-0'}
            bg-gradient-to-r from-blue-500 to-purple-500 text-white p-6 rounded-lg
          `}
        >
          <h3 className="text-lg font-medium mb-2">Fade Transition Example</h3>
          <p>
            This element smoothly fades in and out when the visibility is toggled.
            Opacity transitions are used for subtle appearance and disappearance effects.
          </p>
        </div>
      </div>
      
      {/* Additional examples of fade transitions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Slow Fade</h4>
          <div className="group h-24 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 flex items-center justify-center overflow-hidden">
            <div className="transition-opacity duration-1000 ease-in-out opacity-50 group-hover:opacity-100">
              Hover (Slow)
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Medium Fade</h4>
          <div className="group h-24 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 flex items-center justify-center overflow-hidden">
            <div className="transition-opacity duration-500 ease-in-out opacity-50 group-hover:opacity-100">
              Hover (Medium)
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Fast Fade</h4>
          <div className="group h-24 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 flex items-center justify-center overflow-hidden">
            <div className="transition-opacity duration-300 ease-in-out opacity-50 group-hover:opacity-100">
              Hover (Fast)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
