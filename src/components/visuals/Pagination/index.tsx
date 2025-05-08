/**
 * Pagination Component Index
 * 
 * Demonstrates different types of pagination controls used for navigating multiple pages of content
 */
'use client';

import React, { useState } from 'react';
import Pagination from './Pagination';

const PaginationDemo: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [solidPage, setSolidPage] = useState(3);
  const [minimalPage, setMinimalPage] = useState(5);
  const [customPage, setCustomPage] = useState(2);
  
  // Mock data for example content
  const exampleItems = [
    "Item 1: This is an example item to demonstrate pagination",
    "Item 2: A second example item showing content that would be paginated",
    "Item 3: The third item in our mock dataset",
    "Item 4: Fourth item with some content to show",
    "Item 5: Fifth item in the paginated list",
    "Item 6: Sixth item demonstrating pagination",
    "Item 7: The seventh item in the example",
    "Item 8: Eighth item with sample content",
    "Item 9: The ninth item in our demonstration",
    "Item 10: Final item in this example set"
  ];
  
  // Calculate which items to show based on current page (3 per page)
  const itemsPerPage = 3;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = exampleItems.slice(startIndex, startIndex + itemsPerPage);
  
  return (
    <div className="space-y-12">
      <div>
        <h2 className="text-xl font-semibold mb-4">Pagination</h2>
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          A navigation component that provides a series of links to navigate through
          multiple pages of content. Pagination is commonly used for search results,
          tables, product listings, or any content that needs to be divided into multiple pages.
        </p>
        
        <div className="space-y-8">
          {/* Basic Pagination with Content Example */}
          <div>
            <h3 className="text-lg font-medium mb-3">Basic Pagination with Content</h3>
            <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 space-y-6">
              {/* Content being paginated */}
              <div className="space-y-4">
                <h4 className="text-base font-medium">Page {currentPage} of Content</h4>
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                  {currentItems.map((item, index) => (
                    <li key={index} className="py-3">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Pagination control */}
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <Pagination
                  totalPages={Math.ceil(exampleItems.length / itemsPerPage)}
                  currentPage={currentPage}
                  onPageChange={setCurrentPage}
                />
              </div>
            </div>
          </div>
          
          {/* Pagination Style Variants */}
          <div>
            <h3 className="text-lg font-medium mb-3">Style Variants</h3>
            <div className="space-y-6 p-6 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
              <div>
                <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">Outline Style (Default)</p>
                <Pagination
                  totalPages={10}
                  currentPage={currentPage}
                  onPageChange={setCurrentPage}
                  variant="outline"
                />
              </div>
              
              <div>
                <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">Solid Style</p>
                <Pagination
                  totalPages={10}
                  currentPage={solidPage}
                  onPageChange={setSolidPage}
                  variant="solid"
                />
              </div>
              
              <div>
                <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">Minimal Style</p>
                <Pagination
                  totalPages={10}
                  currentPage={minimalPage}
                  onPageChange={setMinimalPage}
                  variant="minimal"
                />
              </div>
            </div>
          </div>
          
          {/* Pagination Sizes */}
          <div>
            <h3 className="text-lg font-medium mb-3">Size Variants</h3>
            <div className="space-y-6 p-6 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
              <div>
                <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">Small</p>
                <Pagination
                  totalPages={7}
                  currentPage={3}
                  size="sm"
                />
              </div>
              
              <div>
                <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">Medium (Default)</p>
                <Pagination
                  totalPages={7}
                  currentPage={3}
                  size="md"
                />
              </div>
              
              <div>
                <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">Large</p>
                <Pagination
                  totalPages={7}
                  currentPage={3}
                  size="lg"
                />
              </div>
            </div>
          </div>
          
          {/* Simplified Pagination */}
          <div>
            <h3 className="text-lg font-medium mb-3">Simplified Variants</h3>
            <div className="space-y-6 p-6 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
              <div>
                <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">Without First/Last Buttons</p>
                <Pagination
                  totalPages={10}
                  currentPage={4}
                  showFirstLastButtons={false}
                />
              </div>
              
              <div>
                <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">Previous/Next Only</p>
                <Pagination
                  totalPages={10}
                  currentPage={5}
                  maxVisiblePages={0}
                  showFirstLastButtons={false}
                  labels={{
                    previous: 'Previous',
                    next: 'Next'
                  }}
                />
              </div>
            </div>
          </div>
          
          {/* Custom Pagination */}
          <div>
            <h3 className="text-lg font-medium mb-3">Custom Pagination</h3>
            <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
              <Pagination
                totalPages={8}
                currentPage={customPage}
                onPageChange={setCustomPage}
                variant="solid"
                rounded={true}
                centered={true}
                labels={{
                  first: 'First',
                  last: 'Last',
                  previous: 'Prev',
                  next: 'Next'
                }}
                maxVisiblePages={3}
                className="text-sm"
              />
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-3">Common Use Cases</h3>
        <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
          <li>Search results pages to divide large result sets</li>
          <li>E-commerce product listings to navigate through products</li>
          <li>Blog or article lists to navigate between pages of content</li>
          <li>Data tables for paginating large datasets</li>
          <li>Image galleries to navigate through sets of images</li>
          <li>Dashboard interfaces to manage large amounts of data</li>
        </ul>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-3">Technical Details</h3>
        <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <dt className="font-medium text-gray-900 dark:text-white">Alternative Names</dt>
            <dd className="mt-1 text-gray-700 dark:text-gray-300">Page Navigation, Pager, Page Controls</dd>
          </div>
          <div>
            <dt className="font-medium text-gray-900 dark:text-white">Related Components</dt>
            <dd className="mt-1 text-gray-700 dark:text-gray-300">Navigation, Breadcrumbs, Stepper</dd>
          </div>
          <div>
            <dt className="font-medium text-gray-900 dark:text-white">Implementation</dt>
            <dd className="mt-1 text-gray-700 dark:text-gray-300">Uses React Hooks for state management and Tailwind CSS for styling</dd>
          </div>
          <div>
            <dt className="font-medium text-gray-900 dark:text-white">Accessibility</dt>
            <dd className="mt-1 text-gray-700 dark:text-gray-300">Includes proper ARIA labels and follows WAI-ARIA pagination pattern</dd>
          </div>
        </dl>
      </div>
    </div>
  );
};

export default PaginationDemo;
