/**
 * Pagination Component
 * 
 * A navigation component that provides a series of links to navigate through
 * multiple pages of content, typically used for long lists or search results.
 */
'use client';

import React, { useState, useEffect } from 'react';

export interface PaginationProps {
  /** Total number of pages */
  totalPages: number;
  /** Current active page (1-based) */
  currentPage?: number;
  /** Called when page is changed */
  onPageChange?: (page: number) => void;
  /** Maximum number of page buttons to show */
  maxVisiblePages?: number;
  /** Whether to show first/last page buttons */
  showFirstLastButtons?: boolean;
  /** Whether to show previous/next buttons */
  showPrevNextButtons?: boolean;
  /** Custom labels for navigation buttons */
  labels?: {
    first?: string;
    last?: string;
    previous?: string;
    next?: string;
  };
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Style variant */
  variant?: 'outline' | 'solid' | 'minimal';
  /** Whether to use rounded corners */
  rounded?: boolean;
  /** Whether to center the pagination */
  centered?: boolean;
  /** Additional CSS class */
  className?: string;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage = 1,
  onPageChange,
  maxVisiblePages = 5,
  showFirstLastButtons = true,
  showPrevNextButtons = true,
  labels = {
    first: '«',
    last: '»',
    previous: '‹',
    next: '›',
  },
  size = 'md',
  variant = 'outline',
  rounded = true,
  centered = false,
  className = '',
}) => {
  // State for internal page tracking
  const [page, setPage] = useState(currentPage);
  
  // Update internal state when prop changes
  useEffect(() => {
    setPage(currentPage);
  }, [currentPage]);
  
  // Named constants for styling options (following readability principles)
  const SIZE_STYLES = {
    sm: 'h-8 min-w-8 text-sm',
    md: 'h-10 min-w-10 text-base',
    lg: 'h-12 min-w-12 text-lg',
  };
  
  const VARIANT_STYLES = {
    outline: {
      container: 'border border-gray-300 dark:border-gray-600 divide-x divide-gray-300 dark:divide-gray-600',
      button: 'border-0',
      active: 'bg-blue-50 text-blue-600 dark:bg-blue-900 dark:text-blue-300',
      hover: 'hover:bg-gray-50 dark:hover:bg-gray-700',
      disabled: 'opacity-50 cursor-not-allowed',
    },
    solid: {
      container: 'shadow-sm',
      button: 'border border-gray-300 dark:border-gray-600 mx-0.5',
      active: 'bg-blue-600 text-white border-blue-600 dark:bg-blue-700 dark:border-blue-700',
      hover: 'hover:bg-gray-100 dark:hover:bg-gray-700',
      disabled: 'opacity-50 cursor-not-allowed',
    },
    minimal: {
      container: '',
      button: 'mx-0.5',
      active: 'font-bold text-blue-600 dark:text-blue-400 underline underline-offset-2',
      hover: 'hover:text-gray-700 dark:hover:text-gray-300',
      disabled: 'opacity-50 cursor-not-allowed',
    },
  };
  
  const ROUNDED_STYLES = {
    true: {
      container: variant === 'outline' ? 'rounded-lg overflow-hidden' : '',
      button: variant === 'outline' ? '' : 'rounded-lg',
      firstButton: variant === 'outline' ? 'rounded-l-lg' : 'rounded-lg',
      lastButton: variant === 'outline' ? 'rounded-r-lg' : 'rounded-lg',
    },
    false: {
      container: '',
      button: '',
      firstButton: '',
      lastButton: '',
    },
  };
  
  // Calculate visible page range
  const getVisiblePageNumbers = () => {
    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    
    // Calculate half of max pages to show on each side of current page
    const halfVisible = Math.floor(maxVisiblePages / 2);
    
    // Starting page
    let startPage = Math.max(page - halfVisible, 1);
    
    // Ending page
    let endPage = startPage + maxVisiblePages - 1;
    
    // Adjust if we're near the end
    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(endPage - maxVisiblePages + 1, 1);
    }
    
    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  };
  
  // Handle page change
  const handlePageChange = (newPage: number) => {
    if (newPage === page) return;
    if (newPage < 1 || newPage > totalPages) return;
    
    setPage(newPage);
    if (onPageChange) {
      onPageChange(newPage);
    }
  };
  
  // Get visible page numbers
  const visiblePages = getVisiblePageNumbers();
  
  // Generate appropriate class for the current styles
  const variantStyle = VARIANT_STYLES[variant];
  const sizeStyle = SIZE_STYLES[size];
  const roundedStyle = ROUNDED_STYLES[rounded ? 'true' : 'false'];
  
  // Class for a page button
  const getButtonClass = (isActive: boolean, isDisabled: boolean, isFirstLast: boolean = false) => {
    return `
      flex items-center justify-center ${sizeStyle}
      ${variantStyle.button}
      ${isDisabled ? variantStyle.disabled : isActive ? variantStyle.active : variantStyle.hover}
      ${isFirstLast ? '' : roundedStyle.button}
      focus:z-10 focus:outline-none focus:ring-2 focus:ring-blue-500
      transition-colors duration-200
    `;
  };

  return (
    <nav
      className={`${centered ? 'flex justify-center' : ''} ${className}`}
      aria-label="Pagination"
    >
      <div
        className={`inline-flex ${variantStyle.container} ${roundedStyle.container}`}
      >
        {/* First page button */}
        {showFirstLastButtons && (
          <button
            onClick={() => handlePageChange(1)}
            disabled={page === 1}
            className={`${getButtonClass(false, page === 1, true)} ${roundedStyle.firstButton}`}
            aria-label="Go to first page"
          >
            {labels.first}
          </button>
        )}
        
        {/* Previous page button */}
        {showPrevNextButtons && (
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
            className={`${getButtonClass(false, page === 1)}`}
            aria-label="Go to previous page"
          >
            {labels.previous}
          </button>
        )}
        
        {/* Page numbers */}
        {visiblePages.map((pageNum) => (
          <button
            key={pageNum}
            onClick={() => handlePageChange(pageNum)}
            className={`${getButtonClass(pageNum === page, false)}`}
            aria-current={pageNum === page ? 'page' : undefined}
            aria-label={`Page ${pageNum}`}
          >
            {pageNum}
          </button>
        ))}
        
        {/* Next page button */}
        {showPrevNextButtons && (
          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
            className={`${getButtonClass(false, page === totalPages)}`}
            aria-label="Go to next page"
          >
            {labels.next}
          </button>
        )}
        
        {/* Last page button */}
        {showFirstLastButtons && (
          <button
            onClick={() => handlePageChange(totalPages)}
            disabled={page === totalPages}
            className={`${getButtonClass(false, page === totalPages, true)} ${roundedStyle.lastButton}`}
            aria-label="Go to last page"
          >
            {labels.last}
          </button>
        )}
      </div>
    </nav>
  );
};

export default Pagination;
