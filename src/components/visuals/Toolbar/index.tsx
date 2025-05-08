'use client';

import React from 'react';

interface ToolbarItemProps {
  /** The content of the toolbar item */
  children: React.ReactNode;
  /** Optional class name for additional styling */
  className?: string;
  /** Whether the item is disabled */
  disabled?: boolean;
  /** Optional click handler */
  onClick?: () => void;
  /** Visual variant of the toolbar item */
  variant?: 'default' | 'active' | 'highlight';
}

/**
 * ToolbarItem - An individual action button or control within a toolbar
 */
const ToolbarItem: React.FC<ToolbarItemProps> = ({
  children,
  className = '',
  disabled = false,
  onClick,
  variant = 'default',
}) => {
  // Define variant classes
  const variantClasses = {
    default: 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800',
    active: 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20',
    highlight: 'text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800',
  }[variant];

  return (
    <button
      type="button"
      className={`
        px-3 py-2 rounded-md text-sm font-medium
        ${variantClasses}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
        transition-colors
        ${className}
      `}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

interface ToolbarProps {
  /** The content of the toolbar, typically ToolbarItem components */
  children: React.ReactNode;
  /** Optional class name for additional styling */
  className?: string;
  /** The orientation of the toolbar */
  orientation?: 'horizontal' | 'vertical';
  /** Whether to add a responsive design that stacks on mobile */
  responsive?: boolean;
}

/**
 * Toolbar - A container for a set of related actions or controls
 * 
 * Toolbars group a set of actions or controls in a horizontal or vertical bar,
 * providing quick access to frequently used functions. They are commonly used
 * in content creation interfaces, document editors, and admin panels.
 * 
 * Toolbars typically contain buttons, dropdowns, separators, and other interactive elements.
 */
const Toolbar: React.FC<ToolbarProps> = ({
  children,
  className = '',
  orientation = 'horizontal',
  responsive = true,
}) => {
  // Set orientation classes
  const orientationClasses = orientation === 'horizontal' 
    ? 'flex-row space-x-1'
    : 'flex-col space-y-1';

  // Add responsive classes if needed
  const responsiveClasses = responsive && orientation === 'horizontal'
    ? 'flex-col space-y-1 space-x-0 sm:flex-row sm:space-x-1 sm:space-y-0'
    : orientationClasses;

  return (
    <div 
      role="toolbar"
      className={`
        flex items-center 
        ${responsive ? responsiveClasses : orientationClasses}
        bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800
        rounded-lg p-1 shadow-sm
        ${className}
      `}
    >
      {children}
    </div>
  );
};

// Add a Divider component for separating toolbar items
const ToolbarDivider: React.FC<{ orientation?: 'horizontal' | 'vertical', className?: string }> = ({ 
  orientation = 'horizontal',
  className = ''
}) => {
  const dividerClasses = orientation === 'horizontal'
    ? 'h-5 w-px mx-1'
    : 'w-full h-px my-1';

  return (
    <div 
      className={`
        ${dividerClasses} 
        bg-gray-200 dark:bg-gray-700
        ${className}
      `}
    />
  );
};

// Export components
export { ToolbarItem, ToolbarDivider };
export default Toolbar;
