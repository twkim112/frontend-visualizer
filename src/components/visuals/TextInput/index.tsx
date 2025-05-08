/**
 * TextInput Component
 * 
 * A field that allows users to enter and edit text. This component shows
 * different types and states of text input fields commonly used in forms.
 */
'use client';

import { useState } from 'react';

export default function TextInput() {
  const [standardValue, setStandardValue] = useState('');
  const [labeledValue, setLabeledValue] = useState('');
  const [errorValue, setErrorValue] = useState('');
  
  return (
    <div className="flex flex-col gap-6 w-full max-w-md">
      {/* Standard Input */}
      <div>
        <input
          type="text"
          placeholder="Standard input"
          value={standardValue}
          onChange={(e) => setStandardValue(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
        />
      </div>
      
      {/* Labeled Input */}
      <div>
        <label
          htmlFor="labeled-input"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          Email address
        </label>
        <input
          id="labeled-input"
          type="email"
          placeholder="you@example.com"
          value={labeledValue}
          onChange={(e) => setLabeledValue(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
        />
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          We'll never share your email with anyone else.
        </p>
      </div>
      
      {/* Error State Input */}
      <div>
        <label
          htmlFor="error-input"
          className="block text-sm font-medium text-red-600 dark:text-red-400 mb-1"
        >
          Password
        </label>
        <input
          id="error-input"
          type="password"
          placeholder="Enter password"
          value={errorValue}
          onChange={(e) => setErrorValue(e.target.value)}
          className="w-full px-4 py-2 border border-red-500 dark:border-red-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 dark:bg-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
          aria-invalid="true"
          aria-describedby="password-error"
        />
        <p 
          id="password-error"
          className="mt-1 text-xs text-red-600 dark:text-red-400"
        >
          Password must be at least 8 characters long.
        </p>
      </div>
      
      {/* Disabled Input */}
      <div>
        <label
          htmlFor="disabled-input"
          className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1"
        >
          Username (Disabled)
        </label>
        <input
          id="disabled-input"
          type="text"
          placeholder="Cannot be changed"
          disabled
          className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-500 dark:text-gray-400 cursor-not-allowed"
        />
      </div>
    </div>
  );
}
