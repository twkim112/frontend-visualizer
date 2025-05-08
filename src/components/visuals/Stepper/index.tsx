'use client';

import React, { useState } from 'react';

interface StepperProps {
  min?: number;
  max?: number;
  initialValue?: number;
  step?: number;
  onChange?: (value: number) => void;
  className?: string;
}

/**
 * Stepper - A quantity input control that allows users to increment or decrement a value
 * 
 * Used for precise numeric input when the range of possible values is known
 */
const Stepper: React.FC<StepperProps> = ({
  min = 0,
  max = 100,
  initialValue = 0,
  step = 1,
  onChange,
  className = '',
}) => {
  const [value, setValue] = useState(initialValue);

  const increment = () => {
    if (value + step <= max) {
      const newValue = value + step;
      setValue(newValue);
      onChange?.(newValue);
    }
  };

  const decrement = () => {
    if (value - step >= min) {
      const newValue = value - step;
      setValue(newValue);
      onChange?.(newValue);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = parseInt(e.target.value, 10);
    
    if (!isNaN(inputValue)) {
      const newValue = Math.min(Math.max(inputValue, min), max);
      setValue(newValue);
      onChange?.(newValue);
    }
  };

  const isDecrementDisabled = value <= min;
  const isIncrementDisabled = value >= max;

  return (
    <div className={`inline-flex items-center rounded-md border border-gray-300 dark:border-gray-700 ${className}`}>
      <button
        type="button"
        onClick={decrement}
        disabled={isDecrementDisabled}
        className={`px-3 py-2 text-gray-600 dark:text-gray-300 border-r border-gray-300 dark:border-gray-700 transition-colors rounded-l-md
          ${
            isDecrementDisabled
              ? 'opacity-50 cursor-not-allowed'
              : 'hover:bg-gray-100 dark:hover:bg-gray-800 active:bg-gray-200 dark:active:bg-gray-700'
          }
        `}
        aria-label="Decrease value"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="16" 
          height="16" 
          fill="currentColor" 
          viewBox="0 0 16 16"
        >
          <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
        </svg>
      </button>
      
      <input
        type="text"
        value={value}
        onChange={handleInputChange}
        className="w-12 py-2 text-center bg-transparent text-gray-900 dark:text-white focus:outline-none"
        aria-label="Quantity value"
      />
      
      <button
        type="button"
        onClick={increment}
        disabled={isIncrementDisabled}
        className={`px-3 py-2 text-gray-600 dark:text-gray-300 border-l border-gray-300 dark:border-gray-700 transition-colors rounded-r-md
          ${
            isIncrementDisabled
              ? 'opacity-50 cursor-not-allowed'
              : 'hover:bg-gray-100 dark:hover:bg-gray-800 active:bg-gray-200 dark:active:bg-gray-700'
          }
        `}
        aria-label="Increase value"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="16" 
          height="16" 
          fill="currentColor" 
          viewBox="0 0 16 16"
        >
          <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
        </svg>
      </button>
    </div>
  );
};

export default Stepper;
