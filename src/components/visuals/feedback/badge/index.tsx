'use client';

import React from 'react';

// Types for the Badge component
type BadgeVariant = 'default' | 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
type BadgeSize = 'small' | 'medium' | 'large';
type BadgeShape = 'square' | 'rounded' | 'pill';

interface BadgeProps {
  children?: React.ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  shape?: BadgeShape;
  className?: string;
  dot?: boolean;
  icon?: React.ReactNode;
  count?: number;
  maxCount?: number;
  showZero?: boolean;
  invisible?: boolean;
  onClick?: () => void;
  outline?: boolean;
  removable?: boolean;
  onRemove?: () => void;
}

/**
 * Badge Component
 * 
 * A small visual indicator used to highlight information, counts, or status.
 * 
 * @param children - Content to display in the badge
 * @param variant - Visual style variant of the badge
 * @param size - Size variant of the badge
 * @param shape - Shape of the badge (square, rounded, pill)
 * @param className - Additional CSS class for the badge
 * @param dot - Whether to display the badge as a dot without content
 * @param icon - Optional icon to display in the badge
 * @param count - Number to display in the badge
 * @param maxCount - Maximum number to display before showing "+"
 * @param showZero - Whether to display the badge when count is zero
 * @param invisible - Whether to hide the badge
 * @param onClick - Callback when the badge is clicked
 * @param outline - Whether to display the badge with an outline style
 * @param removable - Whether to show a remove button
 * @param onRemove - Callback when the remove button is clicked
 */
const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'medium',
  shape = 'pill',
  className = '',
  dot = false,
  icon,
  count,
  maxCount = 99,
  showZero = false,
  invisible = false,
  onClick,
  outline = false,
  removable = false,
  onRemove,
}) => {
  // Don't render if invisible or if count is 0 and showZero is false
  if (invisible || (count === 0 && !showZero && count !== undefined)) {
    return null;
  }
  
  // Determine the content to display
  const getContent = () => {
    if (dot) return null;
    if (count !== undefined) {
      if (count > maxCount) {
        return `${maxCount}+`;
      }
      return count;
    }
    return children;
  };
  
  // Get variant-specific classes for background and text
  const getVariantClasses = () => {
    if (outline) {
      switch (variant) {
        case 'primary':
          return 'bg-transparent text-blue-500 border border-blue-500 dark:text-blue-400 dark:border-blue-400';
        case 'secondary':
          return 'bg-transparent text-gray-500 border border-gray-500 dark:text-gray-400 dark:border-gray-400';
        case 'success':
          return 'bg-transparent text-green-500 border border-green-500 dark:text-green-400 dark:border-green-400';
        case 'danger':
          return 'bg-transparent text-red-500 border border-red-500 dark:text-red-400 dark:border-red-400';
        case 'warning':
          return 'bg-transparent text-amber-500 border border-amber-500 dark:text-amber-400 dark:border-amber-400';
        case 'info':
          return 'bg-transparent text-blue-400 border border-blue-400 dark:text-blue-300 dark:border-blue-300';
        case 'default':
        default:
          return 'bg-transparent text-gray-600 border border-gray-600 dark:text-gray-300 dark:border-gray-300';
      }
    } else {
      switch (variant) {
        case 'primary':
          return 'bg-blue-500 text-white dark:bg-blue-600';
        case 'secondary':
          return 'bg-gray-500 text-white dark:bg-gray-600';
        case 'success':
          return 'bg-green-500 text-white dark:bg-green-600';
        case 'danger':
          return 'bg-red-500 text-white dark:bg-red-600';
        case 'warning':
          return 'bg-amber-500 text-white dark:bg-amber-600';
        case 'info':
          return 'bg-blue-400 text-white dark:bg-blue-500';
        case 'default':
        default:
          return 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
      }
    }
  };
  
  // Get size-specific classes
  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return dot ? 'w-2 h-2' : 'text-xs px-1.5 py-0.5 min-w-4 h-4';
      case 'large':
        return dot ? 'w-4 h-4' : 'text-sm px-3 py-1 min-w-6 h-6';
      case 'medium':
      default:
        return dot ? 'w-3 h-3' : 'text-xs px-2 py-0.5 min-w-5 h-5';
    }
  };
  
  // Get shape-specific classes
  const getShapeClasses = () => {
    switch (shape) {
      case 'square':
        return '';
      case 'rounded':
        return 'rounded';
      case 'pill':
      default:
        return 'rounded-full';
    }
  };
  
  // Generate the badge classes
  const badgeClasses = `
    ${getVariantClasses()}
    ${getSizeClasses()}
    ${getShapeClasses()}
    inline-flex items-center justify-center font-medium
    ${onClick ? 'cursor-pointer hover:opacity-80' : ''}
    ${className}
  `.trim();
  
  // Handle click event
  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      e.stopPropagation();
      onClick();
    }
  };
  
  // Handle remove event
  const handleRemove = (e: React.MouseEvent) => {
    if (onRemove) {
      e.stopPropagation();
      onRemove();
    }
  };
  
  // Standalone badge (not attached to children)
  if (!children || dot) {
    return (
      <span className={badgeClasses} onClick={handleClick}>
        {icon && <span className="mr-1">{icon}</span>}
        {getContent()}
        {removable && (
          <button 
            className="ml-1.5 text-xs hover:text-opacity-80 focus:outline-none" 
            onClick={handleRemove}
            aria-label="Remove"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        )}
      </span>
    );
  }
  
  // Badge attached to children component
  return (
    <div className="relative inline-flex">
      {children}
      <span 
        className={`absolute ${dot ? '-top-1 -right-1' : '-top-2 -right-2'} ${badgeClasses}`}
        onClick={handleClick}
      >
        {icon && !dot && <span className="mr-1">{icon}</span>}
        {getContent()}
        {removable && !dot && (
          <button 
            className="ml-1 text-xs hover:text-opacity-80 focus:outline-none" 
            onClick={handleRemove}
            aria-label="Remove"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        )}
      </span>
    </div>
  );
};

// Example component to showcase the Badge
const BadgeExample: React.FC = () => {
  // State for demo controls
  const [variant, setVariant] = React.useState<BadgeVariant>('default');
  const [size, setSize] = React.useState<BadgeSize>('medium');
  const [shape, setShape] = React.useState<BadgeShape>('pill');
  const [outline, setOutline] = React.useState(false);
  const [count, setCount] = React.useState(5);
  const [showRemovable, setShowRemovable] = React.useState(false);
  
  // Handle remove badge
  const handleRemove = () => {
    alert('Badge removed!');
  };
  
  // Handle click on badge
  const handleClick = () => {
    alert('Badge clicked!');
  };
  
  // Increment count value
  const incrementCount = () => {
    setCount(prev => prev + 1);
  };
  
  // Decrement count value
  const decrementCount = () => {
    setCount(prev => Math.max(0, prev - 1));
  };
  
  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow space-y-8">
      <h2 className="text-xl font-semibold mb-4">Badge Examples</h2>
      
      {/* Configuration Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Variant */}
        <div>
          <h3 className="text-sm font-medium mb-2">Variant</h3>
          <div className="flex flex-wrap gap-2">
            {(['default', 'primary', 'secondary', 'success', 'danger', 'warning', 'info'] as BadgeVariant[]).map((v) => (
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
        
        {/* Size */}
        <div>
          <h3 className="text-sm font-medium mb-2">Size</h3>
          <div className="flex space-x-2">
            {(['small', 'medium', 'large'] as BadgeSize[]).map((s) => (
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
        
        {/* Shape */}
        <div>
          <h3 className="text-sm font-medium mb-2">Shape</h3>
          <div className="flex space-x-2">
            {(['pill', 'rounded', 'square'] as BadgeShape[]).map((s) => (
              <button
                key={s}
                onClick={() => setShape(s)}
                className={`
                  px-3 py-1 text-sm rounded-md
                  ${shape === s
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}
                `}
              >
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>
        </div>
        
        {/* Counts */}
        <div>
          <h3 className="text-sm font-medium mb-2">Count</h3>
          <div className="flex items-center space-x-2">
            <button
              onClick={decrementCount}
              className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md"
            >
              -
            </button>
            <span>{count}</span>
            <button
              onClick={incrementCount}
              className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md"
            >
              +
            </button>
          </div>
        </div>
        
        {/* Options */}
        <div className="md:col-span-2">
          <h3 className="text-sm font-medium mb-2">Options</h3>
          <div className="flex flex-wrap gap-4">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={outline}
                onChange={() => setOutline(!outline)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="ml-2">Outline</span>
            </label>
            
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={showRemovable}
                onChange={() => setShowRemovable(!showRemovable)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="ml-2">Removable</span>
            </label>
          </div>
        </div>
      </div>
      
      {/* Badge Previews */}
      <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
        <h3 className="text-lg font-medium mb-4">Badge Preview</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Basic Badges */}
          <div className="space-y-6">
            <h4 className="text-md font-medium mb-4">Basic Badges</h4>
            
            <div className="flex flex-wrap gap-4">
              <Badge 
                variant={variant} 
                size={size} 
                shape={shape} 
                outline={outline}
                removable={showRemovable}
                onRemove={handleRemove}
                onClick={handleClick}
              >
                Badge
              </Badge>
              
              <Badge 
                variant={variant} 
                size={size} 
                shape={shape} 
                outline={outline}
                count={count}
                maxCount={99}
                removable={showRemovable}
                onRemove={handleRemove}
                onClick={handleClick}
              />
              
              <Badge 
                variant={variant} 
                size={size} 
                shape={shape} 
                outline={outline}
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                }
                removable={showRemovable}
                onRemove={handleRemove}
                onClick={handleClick}
              >
                New
              </Badge>
              
              <Badge 
                variant={variant} 
                size={size} 
                dot={true} 
                shape={shape} 
                outline={outline}
                onClick={handleClick}
              />
            </div>
          </div>
          
          {/* Badges with Elements */}
          <div className="space-y-6">
            <h4 className="text-md font-medium mb-4">Badges with Elements</h4>
            
            <div className="flex flex-wrap gap-6">
              {/* Badge with Button */}
              <div>
                <Badge 
                  variant={variant === 'default' ? 'primary' : variant} 
                  size={size} 
                  shape={shape} 
                  count={count} 
                  outline={outline}
                  onClick={handleClick}
                >
                  <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-md">
                    Notifications
                  </button>
                </Badge>
              </div>
              
              {/* Badge with Icon */}
              <div>
                <Badge 
                  variant={variant === 'default' ? 'danger' : variant} 
                  size={size} 
                  shape={shape} 
                  count={count} 
                  outline={outline}
                  onClick={handleClick}
                >
                  <span className="inline-block p-2 bg-gray-100 dark:bg-gray-700 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                  </span>
                </Badge>
              </div>
              
              {/* Badge with Dot */}
              <div>
                <Badge 
                  variant={variant === 'default' ? 'success' : variant} 
                  size={size} 
                  dot={true} 
                  shape={shape}
                  outline={outline}
                  onClick={handleClick}
                >
                  <div className="h-10 w-10 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
                    <span className="text-gray-700 dark:text-gray-200 font-medium">JD</span>
                  </div>
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Badge Variants */}
      <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
        <h3 className="text-lg font-medium mb-4">All Badge Variants</h3>
        
        <div className="flex flex-wrap gap-3">
          {(['default', 'primary', 'secondary', 'success', 'danger', 'warning', 'info'] as BadgeVariant[]).map((v) => (
            <Badge 
              key={v} 
              variant={v} 
              size={size} 
              shape={shape}
              outline={outline}
            >
              {v.charAt(0).toUpperCase() + v.slice(1)}
            </Badge>
          ))}
        </div>
      </div>
      
      {/* Common Use Cases */}
      <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
        <h3 className="text-lg font-medium mb-4">Common Use Cases</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Status Badges */}
          <div className="space-y-3">
            <h4 className="text-md font-medium mb-2">Status Badges</h4>
            
            <div className="space-y-2">
              <div className="flex items-center">
                <Badge variant="success" size="small" className="mr-2">Active</Badge>
                <span>User account is active and in good standing</span>
              </div>
              <div className="flex items-center">
                <Badge variant="warning" size="small" className="mr-2">Pending</Badge>
                <span>Awaiting verification or approval</span>
              </div>
              <div className="flex items-center">
                <Badge variant="danger" size="small" className="mr-2">Blocked</Badge>
                <span>Account has been temporarily suspended</span>
              </div>
              <div className="flex items-center">
                <Badge variant="secondary" size="small" className="mr-2">Inactive</Badge>
                <span>Account has been inactive for 30+ days</span>
              </div>
            </div>
          </div>
          
          {/* Notification Badges */}
          <div className="space-y-3">
            <h4 className="text-md font-medium mb-2">Notification Indicators</h4>
            
            <div className="flex items-center space-x-8">
              <Badge count={3} variant="primary" shape="pill">
                <button className="p-2 bg-gray-100 dark:bg-gray-700 rounded-md">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </button>
              </Badge>
              
              <Badge count={12} variant="danger" shape="pill">
                <button className="p-2 bg-gray-100 dark:bg-gray-700 rounded-md">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </button>
              </Badge>
              
              <Badge dot variant="success" shape="pill">
                <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
                  <span className="font-medium">ON</span>
                </div>
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BadgeExample;
