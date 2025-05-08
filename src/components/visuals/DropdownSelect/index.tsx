/**
 * DropdownSelect Component
 * 
 * A form control that presents a menu of options when clicked, allowing users
 * to make a single selection from multiple choices.
 */
'use client';

import { useState } from 'react';

export default function DropdownSelect() {
  const [selected, setSelected] = useState('');
  
  return (
    <div className="w-full max-w-xs">
      <label
        htmlFor="dropdown"
        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
      >
        Choose a country
      </label>
      
      <div className="relative">
        <select
          id="dropdown"
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
        >
          <option value="" disabled>Select a country</option>
          <option value="us">United States</option>
          <option value="ca">Canada</option>
          <option value="uk">United Kingdom</option>
          <option value="au">Australia</option>
          <option value="de">Germany</option>
          <option value="fr">France</option>
          <option value="jp">Japan</option>
          <option value="sg">Singapore</option>
        </select>
        
        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
          <svg className="h-5 w-5 text-gray-400 dark:text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
      
      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
        Selected: {selected ? selected.toUpperCase() : "None"}
      </p>
    </div>
  );
}
