'use client';

import React, { useState, useEffect } from 'react';

// Types for the Table component
type TableVariant = 'simple' | 'striped' | 'bordered' | 'hoverable';
type TableSize = 'small' | 'medium' | 'large';
type SortDirection = 'asc' | 'desc' | null;

interface Column {
  key: string;
  header: React.ReactNode;
  width?: string;
  sortable?: boolean;
  render?: (value: any, row: any, index: number) => React.ReactNode;
}

interface TableProps {
  columns: Column[];
  data: any[];
  variant?: TableVariant;
  size?: TableSize;
  className?: string;
  headerClassName?: string;
  rowClassName?: string;
  cellClassName?: string;
  bordered?: boolean;
  striped?: boolean;
  hoverable?: boolean;
  sortable?: boolean;
  responsive?: boolean;
  emptyText?: React.ReactNode;
  loading?: boolean;
  onRowClick?: (row: any, index: number) => void;
}

/**
 * Table Component
 * 
 * A structured grid of rows and columns for organizing and displaying structured data.
 * 
 * @param columns - Array of column definitions with header text and data keys
 * @param data - Array of data objects to display in the table
 * @param variant - Visual style variant of the table
 * @param size - Size variant controlling padding and text size
 * @param className - Additional CSS class for the table container
 * @param headerClassName - Additional CSS class for the table header
 * @param rowClassName - Additional CSS class for the table rows
 * @param cellClassName - Additional CSS class for the table cells
 * @param bordered - Whether to show borders around cells
 * @param striped - Whether to use alternating row backgrounds
 * @param hoverable - Whether rows highlight on hover
 * @param sortable - Whether columns can be sorted
 * @param responsive - Whether the table has horizontal scrolling on small screens
 * @param emptyText - Text to display when there is no data
 * @param loading - Whether the table is in a loading state
 * @param onRowClick - Callback function when a row is clicked
 */
const Table: React.FC<TableProps> = ({
  columns,
  data,
  variant = 'simple',
  size = 'medium',
  className = '',
  headerClassName = '',
  rowClassName = '',
  cellClassName = '',
  bordered = false,
  striped = false,
  hoverable = false,
  sortable = false,
  responsive = true,
  emptyText = 'No data available',
  loading = false,
  onRowClick,
}) => {
  // Apply variant properties
  useEffect(() => {
    if (variant === 'bordered') bordered = true;
    if (variant === 'striped') striped = true;
    if (variant === 'hoverable') hoverable = true;
  }, [variant]);
  
  // State for sorting
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: SortDirection }>({
    key: '',
    direction: null,
  });
  
  // Handle column sorting
  const handleSort = (key: string) => {
    if (!sortable) return;
    
    let direction: SortDirection = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    } else if (sortConfig.key === key && sortConfig.direction === 'desc') {
      direction = null;
    }
    
    setSortConfig({ key, direction });
  };
  
  // Sort data based on sort configuration
  const sortedData = React.useMemo(() => {
    if (!sortConfig.direction) return data;
    
    return [...data].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [data, sortConfig]);
  
  // Get size classes
  const getSizeClasses = () => {
    switch (size) {
      case 'small': return 'text-xs p-1';
      case 'medium': return 'text-sm p-2';
      case 'large': return 'text-base p-3';
      default: return 'text-sm p-2';
    }
  };
  
  // Render sort indicator
  const renderSortIndicator = (column: Column) => {
    if (!sortable || !column.sortable) return null;
    
    if (sortConfig.key !== column.key) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
        </svg>
      );
    }
    
    if (sortConfig.direction === 'asc') {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </svg>
      );
    }
    
    if (sortConfig.direction === 'desc') {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      );
    }
    
    return null;
  };
  
  // Empty state
  if (!loading && (!data || data.length === 0)) {
    return (
      <div className="text-center py-10 text-gray-500 dark:text-gray-400">
        {emptyText}
      </div>
    );
  }
  
  // Loading state
  if (loading) {
    return (
      <div className="text-center py-10">
        <div className="inline-block animate-spin h-8 w-8 border-2 border-gray-300 dark:border-gray-600 border-t-blue-500 rounded-full"></div>
        <p className="mt-2 text-gray-500 dark:text-gray-400">Loading data...</p>
      </div>
    );
  }
  
  // Table component
  return (
    <div className={`${responsive ? 'overflow-x-auto' : ''} ${className}`}>
      <table className={`w-full ${bordered ? 'border border-gray-200 dark:border-gray-700' : ''}`}>
        <thead className={`bg-gray-50 dark:bg-gray-800 ${headerClassName}`}>
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                className={`
                  text-left font-medium text-gray-600 dark:text-gray-300
                  ${getSizeClasses()}
                  ${bordered ? 'border border-gray-200 dark:border-gray-700' : 'border-b border-gray-200 dark:border-gray-700'}
                  ${column.sortable && sortable ? 'cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700' : ''}
                  ${column.width ? column.width : ''}
                `}
                onClick={() => column.sortable && sortable && handleSort(column.key)}
              >
                <div className="flex items-center space-x-1">
                  <span>{column.header}</span>
                  {column.sortable && sortable && (
                    <span className="ml-1">{renderSortIndicator(column)}</span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        
        <tbody>
          {sortedData.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={`
                ${striped && rowIndex % 2 !== 0 ? 'bg-gray-50 dark:bg-gray-800' : ''}
                ${hoverable ? 'hover:bg-gray-100 dark:hover:bg-gray-700' : ''}
                ${onRowClick ? 'cursor-pointer' : ''}
                ${rowClassName}
              `}
              onClick={() => onRowClick && onRowClick(row, rowIndex)}
            >
              {columns.map((column, colIndex) => (
                <td
                  key={colIndex}
                  className={`
                    ${getSizeClasses()}
                    ${bordered ? 'border border-gray-200 dark:border-gray-700' : 'border-b border-gray-200 dark:border-gray-700'}
                    ${cellClassName}
                  `}
                >
                  {column.render
                    ? column.render(row[column.key], row, rowIndex)
                    : row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Example component to showcase the Table
const TableExample: React.FC = () => {
  // Demo state
  const [variant, setVariant] = useState<TableVariant>('simple');
  const [size, setSize] = useState<TableSize>('medium');
  const [bordered, setBordered] = useState(false);
  const [striped, setStriped] = useState(false);
  const [hoverable, setHoverable] = useState(false);
  const [sortable, setSortable] = useState(true);
  const [loading, setLoading] = useState(false);
  
  // Set variant options
  useEffect(() => {
    switch (variant) {
      case 'bordered':
        setBordered(true);
        setStriped(false);
        setHoverable(false);
        break;
      case 'striped':
        setBordered(false);
        setStriped(true);
        setHoverable(false);
        break;
      case 'hoverable':
        setBordered(false);
        setStriped(false);
        setHoverable(true);
        break;
      default:
        setBordered(false);
        setStriped(false);
        setHoverable(false);
    }
  }, [variant]);
  
  // Sample columns
  const columns = [
    {
      key: 'id',
      header: 'ID',
      width: 'w-16',
      sortable: true,
    },
    {
      key: 'name',
      header: 'Name',
      sortable: true,
    },
    {
      key: 'email',
      header: 'Email',
      sortable: true,
    },
    {
      key: 'role',
      header: 'Role',
      sortable: true,
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (value: string) => (
        <span className={`
          inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
          ${value === 'Active' 
            ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' 
            : 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'}
        `}>
          {value}
        </span>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      render: () => (
        <div className="flex space-x-2">
          <button className="text-blue-500 hover:text-blue-700">Edit</button>
          <button className="text-red-500 hover:text-red-700">Delete</button>
        </div>
      ),
    },
  ];
  
  // Sample data
  const data = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Developer', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Designer', status: 'Active' },
    { id: 3, name: 'Robert Johnson', email: 'robert@example.com', role: 'Manager', status: 'Inactive' },
    { id: 4, name: 'Emily Davis', email: 'emily@example.com', role: 'Developer', status: 'Active' },
    { id: 5, name: 'Michael Wilson', email: 'michael@example.com', role: 'Designer', status: 'Inactive' },
  ];
  
  // Row click handler
  const handleRowClick = (row: any) => {
    alert(`Clicked on ${row.name}`);
  };
  
  // Toggle loading state demo
  const toggleLoading = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };
  
  return (
    <div className="space-y-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Table Demo</h2>
      
      {/* Configuration Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Variant Selection */}
        <div>
          <label className="block text-sm font-medium mb-1">Variant</label>
          <div className="flex flex-wrap gap-2">
            {(['simple', 'bordered', 'striped', 'hoverable'] as TableVariant[]).map((v) => (
              <button
                key={v}
                onClick={() => setVariant(v)}
                className={`
                  px-3 py-1 text-sm rounded-md
                  ${variant === v
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}
                `}
              >
                {v.charAt(0).toUpperCase() + v.slice(1)}
              </button>
            ))}
          </div>
        </div>
        
        {/* Size Selection */}
        <div>
          <label className="block text-sm font-medium mb-1">Size</label>
          <div className="flex space-x-2">
            {(['small', 'medium', 'large'] as TableSize[]).map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={`
                  px-3 py-1 text-sm rounded-md
                  ${size === s
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}
                `}
              >
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>
        </div>
        
        {/* Options */}
        <div className="md:col-span-2 flex flex-wrap gap-6">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={sortable}
              onChange={(e) => setSortable(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <span>Sortable</span>
          </label>
          
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={bordered}
              onChange={(e) => {
                setBordered(e.target.checked);
                if (e.target.checked) setVariant('bordered');
                else if (variant === 'bordered') setVariant('simple');
              }}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <span>Bordered</span>
          </label>
          
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={striped}
              onChange={(e) => {
                setStriped(e.target.checked);
                if (e.target.checked) setVariant('striped');
                else if (variant === 'striped') setVariant('simple');
              }}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <span>Striped</span>
          </label>
          
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={hoverable}
              onChange={(e) => {
                setHoverable(e.target.checked);
                if (e.target.checked) setVariant('hoverable');
                else if (variant === 'hoverable') setVariant('simple');
              }}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <span>Hoverable</span>
          </label>
          
          <button
            onClick={toggleLoading}
            className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            Toggle Loading State
          </button>
        </div>
      </div>
      
      {/* Table Example */}
      <div>
        <h3 className="text-lg font-medium mb-3">Basic Table</h3>
        <Table
          columns={columns}
          data={data}
          variant={variant}
          size={size}
          bordered={bordered}
          striped={striped}
          hoverable={hoverable}
          sortable={sortable}
          loading={loading}
          onRowClick={handleRowClick}
        />
      </div>
      
      {/* Common Use Cases */}
      <div className="pt-6 mt-6 border-t border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-medium mb-4">Common Use Cases</h3>
        
        <div className="space-y-8">
          {/* Simple Data Table */}
          <div>
            <h4 className="text-md font-medium mb-2">Simple Data Table</h4>
            <Table
              columns={[
                { key: 'id', header: 'ID', width: 'w-16' },
                { key: 'name', header: 'Name' },
                { key: 'value', header: 'Value' },
              ]}
              data={[
                { id: 1, name: 'Item 1', value: 42 },
                { id: 2, name: 'Item 2', value: 18 },
                { id: 3, name: 'Item 3', value: 95 },
              ]}
              variant="simple"
              size="small"
            />
          </div>
          
          {/* Data Grid with Custom Rendering */}
          <div>
            <h4 className="text-md font-medium mb-2">Data Grid with Progress</h4>
            <Table
              columns={[
                { key: 'project', header: 'Project' },
                { key: 'status', header: 'Status' },
                {
                  key: 'progress',
                  header: 'Progress',
                  render: (value: number) => (
                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                      <div
                        className="bg-blue-600 h-2.5 rounded-full"
                        style={{ width: `${value}%` }}
                      ></div>
                    </div>
                  ),
                },
                {
                  key: 'priority',
                  header: 'Priority',
                  render: (value: string) => {
                    const colors = {
                      high: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
                      medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
                      low: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
                    };
                    const color = colors[value as keyof typeof colors] || '';
                    return (
                      <span className={`px-2 py-1 text-xs rounded-full ${color}`}>
                        {value}
                      </span>
                    );
                  },
                },
              ]}
              data={[
                { project: 'Website Redesign', status: 'In Progress', progress: 75, priority: 'high' },
                { project: 'Mobile App', status: 'Planning', progress: 25, priority: 'medium' },
                { project: 'API Integration', status: 'Completed', progress: 100, priority: 'low' },
              ]}
              variant="bordered"
              size="medium"
            />
          </div>
          
          {/* Responsive Table */}
          <div>
            <h4 className="text-md font-medium mb-2">Responsive Table</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Resize your window to see the table adapt with horizontal scrolling.</p>
            <div className="max-w-md">
              <Table
                columns={[
                  { key: 'name', header: 'Name' },
                  { key: 'email', header: 'Email' },
                  { key: 'phone', header: 'Phone' },
                  { key: 'location', header: 'Location' },
                  { key: 'department', header: 'Department' },
                ]}
                data={[
                  { name: 'John Doe', email: 'john@example.com', phone: '(555) 123-4567', location: 'New York', department: 'Engineering' },
                  { name: 'Jane Smith', email: 'jane@example.com', phone: '(555) 765-4321', location: 'San Francisco', department: 'Design' },
                ]}
                variant="striped"
                responsive={true}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableExample;
