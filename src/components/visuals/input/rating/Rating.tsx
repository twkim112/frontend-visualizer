/**
 * Rating Component
 * 
 * An interactive component that allows users to provide a rating on a numeric scale,
 * often visualized as stars, hearts, or other symbols.
 */
'use client';

import React, { useState, useEffect } from 'react';

export interface RatingProps {
  /** Maximum rating value (number of stars/icons) */
  max?: number;
  /** Current rating value */
  value?: number;
  /** Initial rating when component is uncontrolled */
  defaultValue?: number;
  /** Whether user can interact with the rating component */
  readOnly?: boolean;
  /** Whether to disable the rating component */
  disabled?: boolean;
  /** Direction of the rating component */
  direction?: 'ltr' | 'rtl';
  /** Icon size */
  size?: 'small' | 'medium' | 'large';
  /** Whether to show the rating values as numbers */
  showValue?: boolean;
  /** Icon set to use */
  icon?: 'star' | 'heart' | 'circle' | 'custom';
  /** Custom filled icon element (when icon="custom") */
  customFilledIcon?: React.ReactNode;
  /** Custom empty icon element (when icon="custom") */
  customEmptyIcon?: React.ReactNode;
  /** Color for the active/filled state */
  activeColor?: string;
  /** Color for the inactive/empty state */
  inactiveColor?: string;
  /** Whether to allow half ratings */
  allowHalf?: boolean;
  /** Whether to allow clearing the rating by clicking the active icon */
  clearable?: boolean;
  /** Space between icons */
  spacing?: 'none' | 'small' | 'medium' | 'large';
  /** Callback when rating changes */
  onChange?: (value: number) => void;
  /** Callback when mouse enters an icon */
  onHoverChange?: (value: number) => void;
  /** Additional CSS class */
  className?: string;
  /** Label for accessibility */
  label?: string;
}

/**
 * Rating Component
 * 
 * An interactive component allowing users to rate on a numeric scale
 * using icons like stars, hearts or circles.
 */
const Rating: React.FC<RatingProps> = ({
  max = 5,
  value,
  defaultValue = 0,
  readOnly = false,
  disabled = false,
  direction = 'ltr',
  size = 'medium',
  showValue = false,
  icon = 'star',
  customFilledIcon,
  customEmptyIcon,
  activeColor,
  inactiveColor,
  allowHalf = false,
  clearable = false,
  spacing = 'small',
  onChange,
  onHoverChange,
  className = '',
  label = 'Rating',
}) => {
  // State for controlled and uncontrolled modes
  const [internalValue, setInternalValue] = useState<number>(value !== undefined ? value : defaultValue);
  const [hoverValue, setHoverValue] = useState<number>(-1);
  
  // Update internal value when prop changes (controlled mode)
  useEffect(() => {
    if (value !== undefined) {
      setInternalValue(value);
    }
  }, [value]);
  
  // Named constants for better readability
  const SIZE_CLASSES = {
    small: {
      icon: 'w-4 h-4',
      text: 'text-sm',
      container: 'h-4',
    },
    medium: {
      icon: 'w-6 h-6',
      text: 'text-base',
      container: 'h-6',
    },
    large: {
      icon: 'w-8 h-8',
      text: 'text-lg',
      container: 'h-8',
    },
  };
  
  const SPACING_CLASSES = {
    none: 'space-x-0',
    small: 'space-x-1',
    medium: 'space-x-2',
    large: 'space-x-3',
  };
  
  const ACTIVE_COLORS = {
    star: 'text-yellow-400',
    heart: 'text-red-500',
    circle: 'text-blue-500',
    custom: '',
  };
  
  const INACTIVE_COLORS = {
    star: 'text-gray-300 dark:text-gray-600',
    heart: 'text-gray-300 dark:text-gray-600',
    circle: 'text-gray-300 dark:text-gray-600',
    custom: '',
  };
  
  // Resolve style classes
  const sizeClass = SIZE_CLASSES[size];
  const spacingClass = SPACING_CLASSES[spacing];
  const activeColorClass = activeColor || ACTIVE_COLORS[icon];
  const inactiveColorClass = inactiveColor || INACTIVE_COLORS[icon];
  
  // Event handlers
  const handleMouseMove = (event: React.MouseEvent<HTMLSpanElement>, index: number) => {
    if (readOnly || disabled) return;
    
    if (allowHalf) {
      const rect = event.currentTarget.getBoundingClientRect();
      const isHalfSelected = (event.clientX - rect.left) < rect.width / 2;
      setHoverValue(isHalfSelected ? index + 0.5 : index + 1);
    } else {
      setHoverValue(index + 1);
    }
    
    if (onHoverChange) {
      onHoverChange(allowHalf ? (hoverValue === index + 0.5 ? index + 0.5 : index + 1) : index + 1);
    }
  };
  
  const handleMouseLeave = () => {
    if (readOnly || disabled) return;
    setHoverValue(-1);
    if (onHoverChange) {
      onHoverChange(0);
    }
  };
  
  const handleClick = (index: number, event: React.MouseEvent<HTMLSpanElement>) => {
    if (readOnly || disabled) return;
    
    let newValue: number;
    
    if (allowHalf) {
      const rect = event.currentTarget.getBoundingClientRect();
      const isHalfSelected = (event.clientX - rect.left) < rect.width / 2;
      newValue = isHalfSelected ? index + 0.5 : index + 1;
    } else {
      newValue = index + 1;
    }
    
    // Clear rating when clicking the same value
    if (clearable && newValue === internalValue) {
      newValue = 0;
    }
    
    setInternalValue(newValue);
    
    if (onChange) {
      onChange(newValue);
    }
  };
  
  // Render the appropriate icon based on type
  const renderIcon = (filled: boolean) => {
    if (icon === 'custom') {
      return filled ? customFilledIcon : customEmptyIcon;
    }
    
    switch (icon) {
      case 'heart':
        return (
          <svg 
            viewBox="0 0 24 24" 
            fill={filled ? 'currentColor' : 'none'} 
            stroke={filled ? 'currentColor' : 'currentColor'} 
            strokeWidth="2"
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        );
      case 'circle':
        return (
          <svg 
            viewBox="0 0 24 24" 
            fill={filled ? 'currentColor' : 'none'} 
            stroke={filled ? 'currentColor' : 'currentColor'} 
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="10" />
            {filled && <circle cx="12" cy="12" r="5" />}
          </svg>
        );
      case 'star':
      default:
        return (
          <svg 
            viewBox="0 0 24 24" 
            fill={filled ? 'currentColor' : 'none'} 
            stroke="currentColor" 
            strokeWidth="2"
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        );
    }
  };
  
  // Determine if an icon should be shown as filled, half-filled, or empty
  const getIconStatus = (index: number) => {
    const currentValue = hoverValue >= 0 ? hoverValue : internalValue;
    
    if (allowHalf) {
      if (index + 0.5 === currentValue) return 'half';
      if (index < currentValue) return 'filled';
    } else {
      if (index < currentValue) return 'filled';
    }
    
    return 'empty';
  };
  
  // Render the half-filled icon (only used when allowHalf is true)
  const renderHalfIcon = (index: number) => {
    return (
      <div className="relative">
        <div className="absolute inset-0 overflow-hidden w-1/2">
          <div className={`w-full ${activeColorClass}`}>
            {renderIcon(true)}
          </div>
        </div>
        <div className={`${inactiveColorClass}`}>
          {renderIcon(false)}
        </div>
      </div>
    );
  };
  
  // Create array of indices for rendering
  const indices = Array.from({ length: max }, (_, i) => i);
  
  return (
    <div 
      className={`
        inline-flex items-center
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${direction === 'rtl' ? 'flex-row-reverse' : 'flex-row'}
        ${className}
      `}
      aria-disabled={disabled}
      role="radiogroup"
      aria-label={label}
    >
      <div className={`flex ${spacingClass} ${direction === 'rtl' ? 'flex-row-reverse' : 'flex-row'}`}>
        {indices.map((index) => {
          const status = getIconStatus(index);
          
          return (
            <span
              key={index}
              className={`
                cursor-${readOnly || disabled ? 'default' : 'pointer'}
                ${sizeClass.icon}
                ${status === 'filled' ? activeColorClass : status === 'half' ? '' : inactiveColorClass}
                transition-colors duration-150
              `}
              onMouseMove={readOnly ? undefined : (e) => handleMouseMove(e, index)}
              onMouseLeave={readOnly ? undefined : handleMouseLeave}
              onClick={readOnly ? undefined : (e) => handleClick(index, e)}
              role="radio"
              aria-checked={index < internalValue ? 'true' : 'false'}
              aria-label={`${index + 1} star${index !== 0 ? 's' : ''}`}
              tabIndex={readOnly ? -1 : 0}
            >
              {status === 'half' ? renderHalfIcon(index) : renderIcon(status === 'filled')}
            </span>
          );
        })}
      </div>
      
      {showValue && (
        <span className={`ml-2 ${sizeClass.text} font-medium text-gray-700 dark:text-gray-300`}>
          {internalValue}
        </span>
      )}
    </div>
  );
};

export default Rating;
