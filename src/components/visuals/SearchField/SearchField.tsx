/**
 * SearchField Component
 * 
 * A specialized input component designed specifically for search functionality,
 * typically featuring a search icon, clear button, and optimized for search interactions.
 */
'use client';

import React, { useState, useRef, useEffect } from 'react';

export interface SearchFieldProps {
  /** Initial value for the search field */
  initialValue?: string;
  /** Placeholder text displayed when the field is empty */
  placeholder?: string;
  /** Called when the search value changes */
  onChange?: (value: string) => void;
  /** Called when the user submits the search (presses Enter) */
  onSearch?: (value: string) => void;
  /** Called when the clear button is clicked */
  onClear?: () => void;
  /** Whether to automatically focus the input on mount */
  autoFocus?: boolean;
  /** Whether the search is currently loading/in progress */
  isLoading?: boolean;
  /** Size variant of the search field */
  size?: 'sm' | 'md' | 'lg';
  /** Whether to include a clear button */
  showClearButton?: boolean;
  /** Additional CSS class names */
  className?: string;
  /** Accessibility label for the search input */
  ariaLabel?: string;
}

const SearchField: React.FC<SearchFieldProps> = ({
  initialValue = '',
  placeholder = 'Search...',
  onChange,
  onSearch,
  onClear,
  autoFocus = false,
  isLoading = false,
  size = 'md',
  showClearButton = true,
  className = '',
  ariaLabel = 'Search',
}) => {
  // Named constants for styling based on size (following the readability principles)
  const SIZE_STYLES = {
    sm: 'h-8 text-sm',
    md: 'h-10 text-base',
    lg: 'h-12 text-lg',
  };
  
  const ICON_SIZES = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };
  
  const INPUT_PADDING = {
    sm: 'pl-8 pr-8',
    md: 'pl-10 pr-10',
    lg: 'pl-12 pr-12',
  };
  
  // State for the search value
  const [searchValue, setSearchValue] = useState(initialValue);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Focus the input on mount if autoFocus is true
  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);
  
  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    if (onChange) {
      onChange(value);
    }
  };
  
  // Handle key press (for Enter key submission)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onSearch) {
      onSearch(searchValue);
    }
  };
  
  // Handle clear button click
  const handleClear = () => {
    setSearchValue('');
    if (onClear) {
      onClear();
    }
    if (onChange) {
      onChange('');
    }
    // Focus the input after clearing
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  
  // Handle search button click
  const handleSearchClick = () => {
    if (onSearch) {
      onSearch(searchValue);
    }
  };

  return (
    <div className={`relative inline-block w-full ${className}`}>
      {/* Search icon - left side */}
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <svg 
          className={`${ICON_SIZES[size]} text-gray-400`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      
      {/* Search input */}
      <input
        ref={inputRef}
        type="search"
        className={`
          w-full ${SIZE_STYLES[size]} ${INPUT_PADDING[size]}
          border border-gray-300 dark:border-gray-600 
          rounded-lg 
          bg-white dark:bg-gray-800 
          text-gray-900 dark:text-white
          focus:ring-2 focus:ring-blue-500 focus:border-blue-500
          transition-shadow duration-200
        `}
        placeholder={placeholder}
        value={searchValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        aria-label={ariaLabel}
      />
      
      {/* Right side buttons (clear or loading) */}
      <div className="absolute inset-y-0 right-0 flex items-center pr-3">
        {isLoading ? (
          <div className={`animate-spin ${ICON_SIZES[size]} text-gray-400`}>
            <svg 
              className="w-full h-full" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
          </div>
        ) : (
          <>
            {showClearButton && searchValue && (
              <button
                type="button"
                onClick={handleClear}
                className={`${ICON_SIZES[size]} text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none`}
                aria-label="Clear search"
              >
                <svg 
                  className="w-full h-full" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
            
            {onSearch && (
              <button
                type="button"
                onClick={handleSearchClick}
                className={`ml-1 ${ICON_SIZES[size]} text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none`}
                aria-label="Submit search"
              >
                <svg 
                  className="w-full h-full" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SearchField;
