'use client';

import React, { useState, useMemo } from 'react';

// Define the type for column configuration
interface TableColumn<T> {
  header: string;
  accessor: keyof T | ((row: T) => React.ReactNode);
  sortable?: boolean;
  cellClassName?: string;
  headerClassName?: string;
}

// Define the type for table properties
interface TableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  className?: string;
  striped?: boolean;
  hoverable?: boolean;
  bordered?: boolean;
  compact?: boolean;
  loading?: boolean;
  emptyMessage?: string;
  sortable?: boolean;
  stickyHeader?: boolean;
  caption?: string;
  headerPosition?: 'top' | 'left';
  onRowClick?: (row: T) => void;
  rowClassName?: string | ((row: T) => string);
  rowKey?: keyof T | ((row: T) => string);
}

/**
 * Table Component
 * 
 * A component for displaying structured data in rows and columns.
 * Provides features like sorting, custom cell rendering, and various styling options.
 * 
 * @param columns - Configuration for table columns
 * @param data - Array of data objects to display
 * @param className - Additional CSS classes for the table
 * @param striped - Whether to apply striped rows
 * @param hoverable - Whether to apply hover effect on rows
 * @param bordered - Whether to show borders around cells
 * @param compact - Whether to use compact spacing
 * @param loading - Whether the table is in loading state
 * @param emptyMessage - Message to display when there's no data
 * @param sortable - Whether the table supports sorting
 * @param stickyHeader - Whether to make the header sticky
 * @param caption - Optional caption for the table
 * @param headerPosition - Position of header cells ('top' or 'left')
 * @param onRowClick - Callback for when a row is clicked
 * @param rowClassName - Class name for rows (string or function)
 * @param rowKey - Property or function to generate unique keys for rows
 */
function Table<T extends Record<string, any>>({ 
  columns, 
  data, 
  className = '',
  striped = false,
  hoverable = false,
  bordered = false,
  compact = false,
  loading = false,
  emptyMessage = 'No data available',
  sortable = true,
  stickyHeader = false,
  caption,
  headerPosition = 'top',
  onRowClick,
  rowClassName,
  rowKey,
}: TableProps<T>) {
  // State for sorting
  const [sortConfig, setSortConfig] = useState<{
    key: keyof T | null;
    direction: 'asc' | 'desc';
  }>({ key: null, direction: 'asc' });

  // Handle column sort
  const handleSort = (accessor: keyof T) => {
    if (!sortable) return;
    
    let direction: 'asc' | 'desc' = 'asc';
    
    if (sortConfig.key === accessor) {
      direction = sortConfig.direction === 'asc' ? 'desc' : 'asc';
    }
    
    setSortConfig({ key: accessor, direction });
  };

  // Generate the sorted data based on sort config
  const sortedData = useMemo(() => {
    if (!sortConfig.key) return data;
    
    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key as keyof T];
      const bValue = b[sortConfig.key as keyof T];
      
      if (aValue === bValue) return 0;
      
      // Handle different data types
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortConfig.direction === 'asc' 
          ? aValue.localeCompare(bValue) 
          : bValue.localeCompare(aValue);
      }
      
      return sortConfig.direction === 'asc' 
        ? (aValue < bValue ? -1 : 1) 
        : (bValue < aValue ? -1 : 1);
    });
  }, [data, sortConfig]);

  // Generate row key
  const getRowKey = (row: T, index: number): string => {
    if (rowKey) {
      if (typeof rowKey === 'function') {
        return rowKey(row);
      }
      return String(row[rowKey]);
    }
    return index.toString();
  };

  // Get row class name
  const getRowClassName = (row: T, index: number): string => {
    let baseClasses = [
      hoverable ? 'hover:bg-gray-50 dark:hover:bg-gray-800' : '',
      striped && index % 2 ? 'bg-gray-50 dark:bg-gray-800' : '',
      onRowClick ? 'cursor-pointer' : '',
    ].filter(Boolean).join(' ');
    
    if (rowClassName) {
      const customClass = typeof rowClassName === 'function' 
        ? rowClassName(row) 
        : rowClassName;
      
      baseClasses = `${baseClasses} ${customClass}`.trim();
    }
    
    return baseClasses;
  };

  // Get cell content
  const getCellContent = (row: T, column: TableColumn<T>) => {
    if (typeof column.accessor === 'function') {
      return column.accessor(row);
    }
    
    return row[column.accessor];
  };

  // Table classes
  const tableClasses = [
    'w-full',
    'table-auto',
    bordered ? 'border-collapse' : 'border-separate',
    className,
  ].filter(Boolean).join(' ');

  // Cell classes
  const cellClasses = [
    'px-4',
    compact ? 'py-2' : 'py-3',
    bordered ? 'border dark:border-gray-700' : '',
  ].filter(Boolean).join(' ');

  // Header classes
  const headerClasses = [
    'px-4',
    compact ? 'py-2' : 'py-3',
    'font-medium',
    'text-left',
    'text-gray-700 dark:text-gray-300',
    bordered ? 'border dark:border-gray-700' : 'border-b dark:border-gray-700',
    stickyHeader ? 'sticky top-0 bg-white dark:bg-gray-900 z-10' : '',
  ].filter(Boolean).join(' ');

  return (
    <div className="w-full overflow-x-auto">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white dark:bg-gray-900 bg-opacity-75 dark:bg-opacity-75 z-10">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}
      
      <table className={tableClasses}>
        {caption && (
          <caption className="text-sm text-gray-600 dark:text-gray-400 p-2 text-left">
            {caption}
          </caption>
        )}
        
        {headerPosition === 'top' && (
          <thead>
            <tr>
              {columns.map((column, colIndex) => (
                <th 
                  key={colIndex} 
                  className={`${headerClasses} ${column.headerClassName || ''}`}
                  onClick={() => {
                    if (column.sortable !== false && typeof column.accessor !== 'function') {
                      handleSort(column.accessor as keyof T);
                    }
                  }}
                  style={{
                    cursor: column.sortable !== false && typeof column.accessor !== 'function' && sortable ? 'pointer' : 'default',
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span>{column.header}</span>
                    
                    {column.sortable !== false && 
                     typeof column.accessor !== 'function' && 
                     sortable && 
                     sortConfig.key === column.accessor && (
                      <span className="ml-1">
                        {sortConfig.direction === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
        )}
        
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {sortedData.length > 0 ? (
            sortedData.map((row, rowIndex) => (
              <tr 
                key={getRowKey(row, rowIndex)}
                className={getRowClassName(row, rowIndex)}
                onClick={() => onRowClick && onRowClick(row)}
              >
                {columns.map((column, colIndex) => {
                  if (headerPosition === 'left' && colIndex === 0) {
                    return (
                      <th 
                        key={colIndex} 
                        className={`${headerClasses} ${column.headerClassName || ''}`}
                      >
                        {getCellContent(row, column)}
                      </th>
                    );
                  }
                  
                  return (
                    <td 
                      key={colIndex} 
                      className={`${cellClasses} ${column.cellClassName || ''}`}
                    >
                      {getCellContent(row, column)}
                    </td>
                  );
                })}
              </tr>
            ))
          ) : (
            <tr>
              <td 
                colSpan={columns.length} 
                className="px-4 py-8 text-center text-gray-500 dark:text-gray-400"
              >
                {emptyMessage}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

/**
 * Example component to showcase the Table with different configurations and data
 */
const TableExample: React.FC = () => {
  // Sample data for the table
  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Inactive' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor', status: 'Active' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'User', status: 'Active' },
    { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'Moderator', status: 'Inactive' },
  ];

  // Define user type for strong typing
  type UserData = typeof users[0];

  // Column definitions
  const columns: TableColumn<UserData>[] = [
    { 
      header: 'ID', 
      accessor: 'id',
      sortable: true,
    },
    { 
      header: 'Name', 
      accessor: 'name',
      sortable: true,
    },
    { 
      header: 'Email', 
      accessor: 'email',
      sortable: true,
    },
    { 
      header: 'Role', 
      accessor: 'role',
      sortable: true,
    },
    { 
      header: 'Status', 
      accessor: (row: UserData) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          row.status === 'Active' 
            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
        }`}>
          {row.status}
        </span>
      ),
      sortable: false,
    },
    {
      header: 'Actions',
      accessor: (row: UserData) => (
        <div className="flex space-x-2">
          <button className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
            Edit
          </button>
          <button className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300">
            Delete
          </button>
        </div>
      ),
      sortable: false,
    }
  ];

  // Track table options state
  const [options, setOptions] = useState({
    striped: true,
    hoverable: true,
    bordered: false,
    compact: false,
    loading: false,
    stickyHeader: false,
  });

  // Toggle an option
  const toggleOption = (option: keyof typeof options) => {
    setOptions(prev => ({
      ...prev,
      [option]: !prev[option],
    }));
  };

  // Define extended user type for sample data
  interface ExtendedUserData extends UserData {
    lastLogin?: string;
  }

  // Sample row click handler
  const handleRowClick = (row: UserData) => {
    console.log('Row clicked:', row);
  };

  // Generate sample data with more rows for the second example
  const generateSampleData = (count: number): ExtendedUserData[] => {
    const data: ExtendedUserData[] = [];
    const roles = ['User', 'Admin', 'Editor', 'Viewer', 'Moderator'];
    const statuses = ['Active', 'Inactive', 'Pending', 'Suspended'];
    
    for (let i = 1; i <= count; i++) {
      data.push({
        id: i,
        name: `User ${i}`,
        email: `user${i}@example.com`,
        role: roles[Math.floor(Math.random() * roles.length)],
        status: statuses[Math.floor(Math.random() * statuses.length)],
        lastLogin: new Date(Date.now() - Math.floor(Math.random() * 30) * 86400000).toLocaleDateString(),
      });
    }
    
    return data;
  };

  // Calculate dynamic row class for the third example
  const getRowClass = (row: ExtendedUserData): string => {
    if (row.status === 'Suspended') return 'bg-red-50 dark:bg-red-900 dark:bg-opacity-20';
    if (row.status === 'Pending') return 'bg-yellow-50 dark:bg-yellow-900 dark:bg-opacity-20';
    return '';
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow space-y-8">
      <h2 className="text-xl font-semibold mb-4">Table Examples</h2>
      
      {/* Configuration Controls */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-3">Table Options</h3>
        <div className="flex flex-wrap gap-4">
          {Object.entries(options).map(([key, value]) => (
            <label key={key} className="inline-flex items-center">
              <input
                type="checkbox"
                checked={value}
                onChange={() => toggleOption(key as keyof typeof options)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="ml-2 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
            </label>
          ))}
        </div>
      </div>
      
      {/* Basic Table Example */}
      <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
        <h3 className="text-lg font-medium mb-4">Basic Table</h3>
        <Table
          columns={columns}
          data={users}
          striped={options.striped}
          hoverable={options.hoverable}
          bordered={options.bordered}
          compact={options.compact}
          loading={options.loading}
          stickyHeader={options.stickyHeader}
          onRowClick={handleRowClick}
          caption="Table 1: User Information"
        />
      </div>
      
      {/* Table with Many Rows and Sticky Header */}
      <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
        <h3 className="text-lg font-medium mb-4">Table with Many Rows</h3>
        <div className="h-80 overflow-y-auto">
          <Table
            columns={columns}
            data={generateSampleData(50)}
            striped
            hoverable
            stickyHeader
          />
        </div>
      </div>
      
      {/* Table with Row Styles Based on Data */}
      <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
        <h3 className="text-lg font-medium mb-4">Table with Conditional Row Styling</h3>
        <Table
          columns={columns}
          data={generateSampleData(10)}
          rowClassName={getRowClass}
          bordered
        />
      </div>
      
      {/* Table with Left Headers */}
      <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
        <h3 className="text-lg font-medium mb-4">Table with Left Headers</h3>
        {/* Define property data type */}
        {(() => {
          type PropertyData = {
            property: string;
            value: string;
            description: string;
          };
          
          const propertyColumns: TableColumn<PropertyData>[] = [
            { header: 'Property', accessor: 'property' },
            { header: 'Value', accessor: 'value' },
            { header: 'Description', accessor: 'description' },
          ];
          
          const propertyData: PropertyData[] = [
            { property: 'Name', value: 'Product X', description: 'Official product name' },
            { property: 'Category', value: 'Electronics', description: 'Product category in catalog' },
            { property: 'Price', value: '$299.99', description: 'Retail price before tax' },
            { property: 'Stock', value: '143 units', description: 'Current inventory count' },
            { property: 'Rating', value: '4.5/5', description: 'Average customer rating' },
          ];
          
          return (
            <Table
              columns={propertyColumns}
              data={propertyData}
              headerPosition="left"
              bordered
            />
          );
        })()}
      </div>
      
      {/* Empty Table */}
      <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
        <h3 className="text-lg font-medium mb-4">Empty Table</h3>
        <Table
          columns={columns}
          data={[] as UserData[]}
          emptyMessage="No users found. Try adjusting your filters."
          striped
          hoverable
        />
      </div>
    </div>
  );
};

export default TableExample;