/**
 * Badge Component
 * 
 * A small visual indicator used to highlight information, counts, or status.
 * Badges are typically used for notification counts, status indicators, or labels.
 */
'use client';

import React from 'react';

export type BadgeVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
export type BadgeSize = 'sm' | 'md' | 'lg';
export type BadgeShape = 'rounded' | 'pill';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  shape?: BadgeShape;
  removable?: boolean;
  onRemove?: () => void;
  className?: string;
}

// Map of variant to color classes
const VARIANT_STYLES = {
  primary: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  secondary: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
  success: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  danger: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
  warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  info: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300',
};

// Map of size to padding and font size
const SIZE_STYLES = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-0.5 text-sm',
  lg: 'px-3 py-1 text-base',
};

// Map of shape to border radius
const SHAPE_STYLES = {
  rounded: 'rounded',
  pill: 'rounded-full',
};

const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  shape = 'rounded',
  removable = false,
  onRemove,
  className = '',
}) => {
  // Named constants for style variants (following the readability principles)
  const VARIANT_STYLE = VARIANT_STYLES[variant];
  const SIZE_STYLE = SIZE_STYLES[size];
  const SHAPE_STYLE = SHAPE_STYLES[shape];
  
  // Handler for the remove button click
  const handleRemoveClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the badge click from propagating
    if (onRemove) {
      onRemove();
    }
  };

  return (
    <span
      className={`inline-flex items-center ${VARIANT_STYLE} ${SIZE_STYLE} ${SHAPE_STYLE} font-medium ${className}`}
    >
      {children}
      
      {removable && (
        <button
          type="button"
          onClick={handleRemoveClick}
          className={`ml-1.5 inline-flex items-center justify-center ${size === 'sm' ? 'w-3 h-3' : size === 'md' ? 'w-4 h-4' : 'w-5 h-5'} rounded-full hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-offset-gray-100`}
          aria-label="Remove"
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
    </span>
  );
};

export default Badge;
