/**
 * Table Component
 * 
 * A structured grid for displaying data in rows and columns. Tables are used to organize
 * and display data in a structured format that makes it easy to scan and compare information.
 */
'use client';

import React from 'react';

export interface TableProps {
  headers?: string[];
  rows?: string[][];
  className?: string;
}

const Table: React.FC<TableProps> = ({ headers: propHeaders, rows: propRows, className = '' }) => {
  // If props are empty, use demo data
  const isDemo = (!propHeaders || propHeaders.length === 0) && (!propRows || propRows.length === 0);
  
  // Sample demo data for the table when viewing as a standalone component
  const demoHeaders = isDemo ? ['Product', 'Category', 'Price', 'Status'] : propHeaders || [];
  const demoRows = isDemo ? [
    ['Laptop Pro', 'Electronics', '$1,299', 'In Stock'],
    ['Wireless Headphones', 'Audio', '$249', 'Low Stock'],
    ['Smart Watch', 'Wearables', '$399', 'In Stock'],
    ['Tablet Air', 'Electronics', '$649', 'Out of Stock'],
    ['Bluetooth Speaker', 'Audio', '$129', 'In Stock']
  ] : propRows || [];
  
  const headers = demoHeaders;
  const rows = demoRows;
  return (
    <div className="w-full overflow-x-auto">
      <table className={`min-w-full divide-y divide-gray-200 dark:divide-gray-700 ${className}`}>
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            {headers.map((header, index) => (
              <th
                key={`header-${index}`}
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
          {rows.map((row, rowIndex) => (
            <tr key={`row-${rowIndex}`} className={rowIndex % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-gray-50 dark:bg-gray-800'}>
              {row.map((cell, cellIndex) => (
                <td
                  key={`cell-${rowIndex}-${cellIndex}`}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
