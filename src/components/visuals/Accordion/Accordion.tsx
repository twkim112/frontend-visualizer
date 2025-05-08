/**
 * Accordion Component
 * 
 * A vertically stacked set of interactive headings that reveal or hide associated content panels.
 * Used to toggle the visibility of content sections, reducing visual clutter and organizing information.
 */
'use client';

import React, { useState, useRef, useEffect } from 'react';

export interface AccordionItemProps {
  /** Unique identifier for the accordion item */
  id: string;
  /** Title displayed in the header */
  title: React.ReactNode;
  /** Content to be shown/hidden */
  content: React.ReactNode;
  /** Whether the item is initially expanded */
  defaultExpanded?: boolean;
  /** Optional icon to display next to the title */
  icon?: React.ReactNode;
  /** Additional custom class for the item header */
  headerClassName?: string;
  /** Additional custom class for the item content */
  contentClassName?: string;
  /** Optional callback for expansion state changes */
  onToggle?: (expanded: boolean) => void;
  /** Whether the item is disabled */
  disabled?: boolean;
}

export interface AccordionProps {
  /** Array of accordion items */
  items: AccordionItemProps[];
  /** Whether multiple items can be expanded simultaneously */
  allowMultiple?: boolean;
  /** Whether to initially expand all items */
  expandAll?: boolean;
  /** Whether to collapse other items when one is expanded */
  collapseOthers?: boolean;
  /** Visual style variant */
  variant?: 'default' | 'bordered' | 'minimal';
  /** Size variant */
  size?: 'small' | 'medium' | 'large';
  /** Icon position in headers */
  iconPosition?: 'left' | 'right';
  /** Animation duration in milliseconds */
  animationDuration?: number;
  /** Additional CSS class for the accordion */
  className?: string;
  /** Custom icon for the expand/collapse indicator */
  customExpandIcon?: (isExpanded: boolean) => React.ReactNode;
}

/**
 * AccordionItem - Individual expandable section
 */
const AccordionItem: React.FC<{
  item: AccordionItemProps;
  isExpanded: boolean;
  onToggle: () => void;
  variant: 'default' | 'bordered' | 'minimal';
  size: 'small' | 'medium' | 'large';
  iconPosition: 'left' | 'right';
  animationDuration: number;
  customExpandIcon?: (isExpanded: boolean) => React.ReactNode;
  isLastItem: boolean;
}> = ({
  item,
  isExpanded,
  onToggle,
  variant,
  size,
  iconPosition,
  animationDuration,
  customExpandIcon,
  isLastItem,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState<number | 'auto'>(0);
  
  // Set the content height whenever expansion state changes
  useEffect(() => {
    if (!contentRef.current) return;
    
    if (isExpanded) {
      // Get the scrollHeight of the content
      const height = contentRef.current.scrollHeight;
      setContentHeight(height);
      
      // After animation completes, set height to auto to handle content changes
      const timer = setTimeout(() => {
        setContentHeight('auto');
      }, animationDuration);
      
      return () => clearTimeout(timer);
    } else {
      // Set the current height before collapsing for smooth animation
      if (contentRef.current.style.height !== '0px') {
        const height = contentRef.current.scrollHeight;
        setContentHeight(height);
        
        // Force a reflow to ensure the browser registers the height
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        contentRef.current.offsetHeight;
        
        // Now set height to 0 to trigger animation
        setTimeout(() => {
          setContentHeight(0);
        }, 10);
      } else {
        setContentHeight(0);
      }
    }
  }, [isExpanded, animationDuration]);
  
  // Named constants for size variants
  const SIZE_CLASSES = {
    small: {
      header: 'py-2 px-3 text-sm',
      content: 'p-3 text-sm',
    },
    medium: {
      header: 'py-3 px-4 text-base',
      content: 'p-4',
    },
    large: {
      header: 'py-4 px-5 text-lg',
      content: 'p-5',
    },
  };
  
  // Named constants for variants
  const VARIANT_CLASSES = {
    default: {
      container: 'bg-white dark:bg-gray-800 rounded-md shadow-sm',
      header: 'bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600',
      headerBorder: isLastItem || !isExpanded ? '' : 'border-b border-gray-200 dark:border-gray-600',
      content: 'bg-white dark:bg-gray-800',
    },
    bordered: {
      container: 'border border-gray-200 dark:border-gray-700 rounded-md',
      header: 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700',
      headerBorder: isLastItem || !isExpanded ? '' : 'border-b border-gray-200 dark:border-gray-700',
      content: 'bg-white dark:bg-gray-800',
    },
    minimal: {
      container: '',
      header: 'hover:bg-gray-50 dark:hover:bg-gray-800',
      headerBorder: isLastItem || !isExpanded ? '' : 'border-b border-gray-200 dark:border-gray-700',
      content: '',
    },
  };
  
  // Get classes based on configuration
  const sizeClass = SIZE_CLASSES[size];
  const variantClass = VARIANT_CLASSES[variant];
  
  // Default expand/collapse icon
  const renderExpandIcon = () => {
    if (customExpandIcon) {
      return customExpandIcon(isExpanded);
    }
    
    return (
      <svg 
        className={`w-5 h-5 transition-transform duration-200 ${isExpanded ? 'transform rotate-180' : ''}`}
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M19 9l-7 7-7-7" 
        />
      </svg>
    );
  };
  
  return (
    <div className={`${variantClass.container} overflow-hidden`}>
      <button
        type="button"
        onClick={() => {
          if (!item.disabled) {
            onToggle();
            item.onToggle?.(isExpanded);
          }
        }}
        className={`
          w-full flex items-center justify-between
          ${sizeClass.header}
          ${variantClass.header}
          ${variantClass.headerBorder}
          ${item.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          focus:outline-none focus:ring-2 focus:ring-blue-500
          transition-colors duration-200
          ${item.headerClassName || ''}
        `}
        aria-expanded={isExpanded}
        aria-controls={`accordion-content-${item.id}`}
        disabled={item.disabled}
      >
        <div className={`flex items-center ${iconPosition === 'left' ? 'flex-row' : 'flex-row-reverse'}`}>
          {item.icon && (
            <span className={`flex-shrink-0 ${iconPosition === 'left' ? 'mr-3' : 'ml-3'}`}>
              {item.icon}
            </span>
          )}
          <span className="font-medium">{item.title}</span>
        </div>
        
        <span className={`flex-shrink-0 ${iconPosition === 'left' ? 'ml-2' : 'mr-2'} text-gray-500 dark:text-gray-400`}>
          {renderExpandIcon()}
        </span>
      </button>
      
      <div
        ref={contentRef}
        id={`accordion-content-${item.id}`}
        role="region"
        aria-labelledby={`accordion-header-${item.id}`}
        className={`overflow-hidden transition-all duration-${animationDuration}`}
        style={{
          height: isExpanded ? (contentHeight === 'auto' ? 'auto' : `${contentHeight}px`) : '0px',
          opacity: isExpanded ? 1 : 0,
          visibility: (contentHeight === 0 && !isExpanded) ? 'hidden' : 'visible',
        }}
      >
        <div className={`${sizeClass.content} ${item.contentClassName || ''}`}>
          {item.content}
        </div>
      </div>
    </div>
  );
};

/**
 * Accordion Component
 * 
 * A vertically stacked set of interactive headings that reveal or hide associated content panels.
 * Used to toggle the visibility of content sections, reducing visual clutter and organizing information.
 */
const Accordion: React.FC<AccordionProps> = ({
  items,
  allowMultiple = false,
  expandAll = false,
  collapseOthers = true,
  variant = 'default',
  size = 'medium',
  iconPosition = 'right',
  animationDuration = 300,
  className = '',
  customExpandIcon,
}) => {
  // Convert animation duration to rounded number for class
  const animationClass = Math.round(animationDuration / 100) * 100;
  
  // Initialize expanded state array based on props
  const [expandedItems, setExpandedItems] = useState<boolean[]>(() => {
    return items.map(item => expandAll || item.defaultExpanded || false);
  });
  
  // Update expanded state when an item is toggled
  const handleToggle = (index: number) => {
    setExpandedItems(prev => {
      const newState = [...prev];
      
      // If allowMultiple is false, close other items
      if (!allowMultiple && collapseOthers) {
        for (let i = 0; i < newState.length; i++) {
          newState[i] = false;
        }
      }
      
      // Toggle the clicked item
      newState[index] = !prev[index];
      return newState;
    });
  };
  
  return (
    <div 
      className={`divide-y divide-gray-200 dark:divide-gray-700 space-y-2 ${className}`} 
      role="presentation"
    >
      {items.map((item, index) => (
        <AccordionItem
          key={item.id}
          item={item}
          isExpanded={expandedItems[index]}
          onToggle={() => handleToggle(index)}
          variant={variant}
          size={size}
          iconPosition={iconPosition}
          animationDuration={animationDuration}
          customExpandIcon={customExpandIcon}
          isLastItem={index === items.length - 1}
        />
      ))}
    </div>
  );
};

export default Accordion;
