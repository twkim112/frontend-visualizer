/**
 * SearchField Component Index
 * 
 * Demonstrates different variants of search fields with examples of common use cases
 */
'use client';

import React, { useState } from 'react';
import SearchField from './SearchField';

const SearchFieldDemo: React.FC = () => {
  const [basicSearchValue, setBasicSearchValue] = useState('');
  const [advancedSearchValue, setAdvancedSearchValue] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<string[]>([]);
  
  // Dummy data for search results
  const dummyData = [
    'React', 'Next.js', 'TypeScript', 'JavaScript', 'Tailwind CSS',
    'Material UI', 'Redux', 'GraphQL', 'Node.js', 'Express',
    'MongoDB', 'PostgreSQL', 'Docker', 'Kubernetes', 'AWS',
    'Frontend Development', 'Backend Development', 'Full Stack'
  ];
  
  // Mock search function
  const handleSearch = (value: string) => {
    setIsSearching(true);
    // Simulate API call delay
    setTimeout(() => {
      const results = value.trim() === '' 
        ? [] 
        : dummyData.filter(item => 
            item.toLowerCase().includes(value.toLowerCase())
          );
      setSearchResults(results);
      setIsSearching(false);
    }, 1000);
  };
  
  // Handle search submission
  const handleSubmitSearch = (value: string) => {
    handleSearch(value);
  };
  
  // Clear search results
  const handleClearSearch = () => {
    setSearchResults([]);
  };
  
  return (
    <div className="space-y-12">
      <div>
        <h2 className="text-xl font-semibold mb-4">Search Field</h2>
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          A specialized input component designed specifically for search functionality,
          typically featuring a search icon, clear button, and optimized for search interactions.
          Search fields are commonly used in navigation bars, filters, and as the primary interaction
          for search-centric applications.
        </p>
        
        <div className="space-y-8">
          {/* Basic Search Field */}
          <div>
            <h3 className="text-lg font-medium mb-3">Basic Search Field</h3>
            <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
              <SearchField
                placeholder="Search..."
                onChange={setBasicSearchValue}
                onSearch={handleSubmitSearch}
              />
              {basicSearchValue && (
                <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  Current value: {basicSearchValue}
                </div>
              )}
            </div>
          </div>
          
          {/* Search Field Sizes */}
          <div>
            <h3 className="text-lg font-medium mb-3">Size Variants</h3>
            <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 space-y-4">
              <div>
                <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">Small</p>
                <SearchField
                  size="sm"
                  placeholder="Small search field..."
                />
              </div>
              <div>
                <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">Medium (Default)</p>
                <SearchField
                  size="md"
                  placeholder="Medium search field..."
                />
              </div>
              <div>
                <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">Large</p>
                <SearchField
                  size="lg"
                  placeholder="Large search field..."
                />
              </div>
            </div>
          </div>
          
          {/* Interactive Search Example */}
          <div>
            <h3 className="text-lg font-medium mb-3">Interactive Search Example</h3>
            <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 space-y-4">
              <SearchField
                placeholder="Search technologies..."
                onChange={setAdvancedSearchValue}
                onSearch={handleSubmitSearch}
                onClear={handleClearSearch}
                isLoading={isSearching}
                autoFocus
              />
              
              <div className="min-h-[120px] pt-2">
                {isSearching ? (
                  <p className="text-gray-600 dark:text-gray-400">Searching...</p>
                ) : (
                  <>
                    {searchResults.length > 0 ? (
                      <div>
                        <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">
                          Found {searchResults.length} result{searchResults.length !== 1 ? 's' : ''}:
                        </p>
                        <ul className="space-y-1">
                          {searchResults.map((result, index) => (
                            <li 
                              key={index}
                              className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            >
                              {result}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      advancedSearchValue && (
                        <p className="text-gray-600 dark:text-gray-400">
                          No results found for "{advancedSearchValue}"
                        </p>
                      )
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
          
          {/* Search Field with Custom Styling */}
          <div>
            <h3 className="text-lg font-medium mb-3">Custom Styled Search</h3>
            <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
              <div className="max-w-lg mx-auto p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl">
                <SearchField
                  placeholder="Search products..."
                  className="rounded-full shadow-sm"
                />
              </div>
            </div>
          </div>
          
          {/* Search Field in a Navbar Context */}
          <div>
            <h3 className="text-lg font-medium mb-3">In Navigation Context</h3>
            <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
              <div className="flex items-center justify-between px-4 py-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
                <div className="font-bold text-gray-800 dark:text-white">Brand Logo</div>
                <div className="w-64">
                  <SearchField
                    size="sm"
                    placeholder="Quick search..."
                    showClearButton={false}
                  />
                </div>
                <nav>
                  <ul className="flex space-x-4 text-sm">
                    <li>Home</li>
                    <li>Products</li>
                    <li>About</li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-3">Common Use Cases</h3>
        <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
          <li>Global site search in navigation headers</li>
          <li>Search functionality in e-commerce product listings</li>
          <li>Filtering content in dashboards and admin panels</li>
          <li>Search interfaces in documentation and knowledge bases</li>
          <li>Content discovery in media applications</li>
          <li>Searching within page context (Ctrl+F equivalent)</li>
        </ul>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-3">Technical Details</h3>
        <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <dt className="font-medium text-gray-900 dark:text-white">Alternative Names</dt>
            <dd className="mt-1 text-gray-700 dark:text-gray-300">Search Bar, Search Box, Search Input, Query Input</dd>
          </div>
          <div>
            <dt className="font-medium text-gray-900 dark:text-white">Related Components</dt>
            <dd className="mt-1 text-gray-700 dark:text-gray-300">Input, AutoComplete, ComboBox, FilterInput</dd>
          </div>
          <div>
            <dt className="font-medium text-gray-900 dark:text-white">Implementation</dt>
            <dd className="mt-1 text-gray-700 dark:text-gray-300">Uses React Hooks for state management and Tailwind CSS for styling</dd>
          </div>
          <div>
            <dt className="font-medium text-gray-900 dark:text-white">Accessibility</dt>
            <dd className="mt-1 text-gray-700 dark:text-gray-300">Includes proper ARIA labels and follows WAI-ARIA search pattern</dd>
          </div>
        </dl>
      </div>
    </div>
  );
};

export default SearchFieldDemo;
