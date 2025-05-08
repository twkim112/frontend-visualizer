'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';

// Popover placement options
type PopoverPlacement = 'top' | 'top-start' | 'top-end' | 'right' | 'right-start' | 'right-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end';
type TriggerType = 'click' | 'hover' | 'focus' | 'manual';
type PopoverSize = 'small' | 'medium' | 'large';

interface PopoverProps {
  /** Content that will trigger the popover */
  children: React.ReactNode;
  /** Content to display inside the popover */
  content: React.ReactNode;
  /** The preferred placement of the popover */
  placement?: PopoverPlacement;
  /** How the popover is triggered */
  trigger?: TriggerType;
  /** Whether the popover is currently visible (for manual control) */
  open?: boolean;
  /** Callback when popover visibility changes */
  onOpenChange?: (open: boolean) => void;
  /** Size of the popover */
  size?: PopoverSize;
  /** Whether the popover has an arrow pointing to the trigger */
  arrow?: boolean;
  /** Distance between the popover and the trigger element in pixels */
  offset?: number;
  /** Custom classes for the popover */
  className?: string;
  /** Whether to close the popover when clicking outside */
  closeOnOutsideClick?: boolean;
  /** Optional title for the popover */
  title?: React.ReactNode;
  /** Whether the popover can be dismissed by pressing escape */
  closeOnEscape?: boolean;
  /** Animation duration in ms */
  animationDuration?: number;
  /** ID for accessibility purposes */
  id?: string;
  /** Whether to enable/disable the popover */
  disabled?: boolean;
}

/**
 * Popover Component
 * 
 * A floating content panel that appears when a user interacts with a trigger element.
 * Used for contextual information, controls, or detailed content.
 * 
 * @param children - Content that will trigger the popover 
 * @param content - Content to display inside the popover
 * @param placement - The preferred placement of the popover
 * @param trigger - How the popover is triggered
 * @param open - Whether the popover is currently visible (for manual control)
 * @param onOpenChange - Callback when popover visibility changes
 * @param size - Size of the popover
 * @param arrow - Whether the popover has an arrow pointing to the trigger
 * @param offset - Distance between the popover and the trigger element in pixels
 * @param className - Custom classes for the popover
 * @param closeOnOutsideClick - Whether to close the popover when clicking outside
 * @param title - Optional title for the popover
 * @param closeOnEscape - Whether the popover can be dismissed by pressing escape
 * @param animationDuration - Animation duration in ms
 * @param id - ID for accessibility purposes
 * @param disabled - Whether to enable/disable the popover
 */
const Popover: React.FC<PopoverProps> = ({
  children,
  content,
  placement = 'bottom',
  trigger = 'click',
  open: controlledOpen,
  onOpenChange,
  size = 'medium',
  arrow = true,
  offset = 8,
  className = '',
  closeOnOutsideClick = true,
  title,
  closeOnEscape = true,
  animationDuration = 200,
  id,
  disabled = false,
}) => {
  // State to track if the popover is open
  const [isOpen, setIsOpen] = useState(controlledOpen || false);
  
  // Refs for the trigger and popover elements
  const triggerRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  
  // Generate unique ID for accessibility attributes
  const uniqueId = useRef(`popover-${id || Math.random().toString(36).substring(2, 9)}`);
  
  // State for popover position
  const [position, setPosition] = useState({ top: 0, left: 0 });
  
  // Check if component is controlled or uncontrolled
  const isControlled = controlledOpen !== undefined;
  const openState = isControlled ? controlledOpen : isOpen;
  
  // Function to position the popover based on trigger element and placement
  const positionPopover = useCallback(() => {
    if (!triggerRef.current || !popoverRef.current) return;
    
    const triggerRect = triggerRef.current.getBoundingClientRect();
    const popoverRect = popoverRef.current.getBoundingClientRect();
    
    const scrollX = window.scrollX || document.documentElement.scrollLeft;
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    
    let top = 0;
    let left = 0;
    
    // Position based on placement
    switch (placement) {
      // Top placements
      case 'top':
        top = triggerRect.top - popoverRect.height - offset + scrollY;
        left = triggerRect.left + (triggerRect.width / 2) - (popoverRect.width / 2) + scrollX;
        break;
      case 'top-start':
        top = triggerRect.top - popoverRect.height - offset + scrollY;
        left = triggerRect.left + scrollX;
        break;
      case 'top-end':
        top = triggerRect.top - popoverRect.height - offset + scrollY;
        left = triggerRect.right - popoverRect.width + scrollX;
        break;
      
      // Right placements
      case 'right':
        top = triggerRect.top + (triggerRect.height / 2) - (popoverRect.height / 2) + scrollY;
        left = triggerRect.right + offset + scrollX;
        break;
      case 'right-start':
        top = triggerRect.top + scrollY;
        left = triggerRect.right + offset + scrollX;
        break;
      case 'right-end':
        top = triggerRect.bottom - popoverRect.height + scrollY;
        left = triggerRect.right + offset + scrollX;
        break;
      
      // Bottom placements
      case 'bottom':
        top = triggerRect.bottom + offset + scrollY;
        left = triggerRect.left + (triggerRect.width / 2) - (popoverRect.width / 2) + scrollX;
        break;
      case 'bottom-start':
        top = triggerRect.bottom + offset + scrollY;
        left = triggerRect.left + scrollX;
        break;
      case 'bottom-end':
        top = triggerRect.bottom + offset + scrollY;
        left = triggerRect.right - popoverRect.width + scrollX;
        break;
      
      // Left placements
      case 'left':
        top = triggerRect.top + (triggerRect.height / 2) - (popoverRect.height / 2) + scrollY;
        left = triggerRect.left - popoverRect.width - offset + scrollX;
        break;
      case 'left-start':
        top = triggerRect.top + scrollY;
        left = triggerRect.left - popoverRect.width - offset + scrollX;
        break;
      case 'left-end':
        top = triggerRect.bottom - popoverRect.height + scrollY;
        left = triggerRect.left - popoverRect.width - offset + scrollX;
        break;
      
      default:
        // Default to bottom
        top = triggerRect.bottom + offset + scrollY;
        left = triggerRect.left + (triggerRect.width / 2) - (popoverRect.width / 2) + scrollX;
    }
    
    // Boundary checking to keep popover within viewport
    // Viewport dimensions
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // Adjust if popover extends beyond right edge
    if (left + popoverRect.width > viewportWidth - 10) {
      left = viewportWidth - popoverRect.width - 10;
    }
    
    // Adjust if popover extends beyond left edge
    if (left < 10) {
      left = 10;
    }
    
    // Adjust if popover extends beyond bottom edge
    if (top + popoverRect.height > viewportHeight + scrollY - 10) {
      // If it's a bottom placement, flip to top
      if (placement.startsWith('bottom')) {
        top = triggerRect.top - popoverRect.height - offset + scrollY;
      } else {
        // Otherwise, just adjust to fit
        top = viewportHeight + scrollY - popoverRect.height - 10;
      }
    }
    
    // Adjust if popover extends beyond top edge
    if (top < scrollY + 10) {
      // If it's a top placement, flip to bottom
      if (placement.startsWith('top')) {
        top = triggerRect.bottom + offset + scrollY;
      } else {
        // Otherwise, just adjust to fit
        top = scrollY + 10;
      }
    }
    
    setPosition({ top, left });
  }, [offset, placement]);
  
  // Function to safely set open state for both controlled and uncontrolled modes
  const setOpenState = useCallback((nextOpen: boolean) => {
    if (!isControlled) {
      setIsOpen(nextOpen);
    }
    
    if (onOpenChange) {
      onOpenChange(nextOpen);
    }
    
    // Position the popover when opening
    if (nextOpen) {
      setTimeout(positionPopover, 0);
    }
  }, [isControlled, onOpenChange, positionPopover]);
  
  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (openState) {
        positionPopover();
      }
    };
    
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleResize, true);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleResize, true);
    };
  }, [openState, positionPopover]);
  
  // Position the popover whenever it opens
  useEffect(() => {
    if (openState) {
      positionPopover();
    }
  }, [openState, positionPopover]);
  
  // Handle escape key for closing
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (closeOnEscape && openState && event.key === 'Escape') {
        setOpenState(false);
      }
    };
    
    if (openState) {
      document.addEventListener('keydown', handleEscapeKey);
      return () => document.removeEventListener('keydown', handleEscapeKey);
    }
  }, [openState, closeOnEscape, setOpenState]);
  
  // Handle clicks outside for closing
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (!closeOnOutsideClick || !openState) return;
      
      const target = event.target as Node;
      if (
        popoverRef.current && 
        triggerRef.current && 
        !popoverRef.current.contains(target) && 
        !triggerRef.current.contains(target)
      ) {
        setOpenState(false);
      }
    };
    
    if (openState) {
      document.addEventListener('mousedown', handleOutsideClick);
      return () => document.removeEventListener('mousedown', handleOutsideClick);
    }
  }, [openState, closeOnOutsideClick, setOpenState]);
  
  // Event handlers based on trigger type
  const triggerHandlers = (() => {
    if (disabled) return {};
    
    switch (trigger) {
      case 'hover':
        return {
          onMouseEnter: () => setOpenState(true),
          onMouseLeave: () => setOpenState(false),
        };
      case 'focus':
        return {
          onFocus: () => setOpenState(true),
          onBlur: () => setOpenState(false),
        };
      case 'click':
        return {
          onClick: () => setOpenState(!openState),
        };
      case 'manual':
      default:
        return {};
    }
  })();
  
  // Determine size classes
  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return 'p-2 max-w-xs';
      case 'large':
        return 'p-4 max-w-lg';
      case 'medium':
      default:
        return 'p-3 max-w-sm';
    }
  };
  
  // Get proper arrow class based on placement
  const getArrowClass = () => {
    if (!arrow) return '';
    
    if (placement.startsWith('top')) {
      return 'after:top-full after:border-t-gray-100 dark:after:border-t-gray-800 after:border-l-transparent after:border-r-transparent after:border-b-transparent';
    } else if (placement.startsWith('bottom')) {
      return 'after:bottom-full after:border-b-gray-100 dark:after:border-b-gray-800 after:border-l-transparent after:border-r-transparent after:border-t-transparent';
    } else if (placement.startsWith('left')) {
      return 'after:left-full after:border-l-gray-100 dark:after:border-l-gray-800 after:border-t-transparent after:border-r-transparent after:border-b-transparent';
    } else if (placement.startsWith('right')) {
      return 'after:right-full after:border-r-gray-100 dark:after:border-r-gray-800 after:border-t-transparent after:border-l-transparent after:border-b-transparent';
    }
    
    return '';
  };
  
  // Position the arrow based on placement
  const getArrowPosition = () => {
    if (!arrow) return '';
    
    if (placement === 'top') {
      return 'after:left-1/2 after:-ml-2';
    } else if (placement === 'top-start') {
      return 'after:left-4';
    } else if (placement === 'top-end') {
      return 'after:right-4';
    } else if (placement === 'bottom') {
      return 'after:left-1/2 after:-ml-2';
    } else if (placement === 'bottom-start') {
      return 'after:left-4';
    } else if (placement === 'bottom-end') {
      return 'after:right-4';
    } else if (placement === 'left') {
      return 'after:top-1/2 after:-mt-2';
    } else if (placement === 'left-start') {
      return 'after:top-4';
    } else if (placement === 'left-end') {
      return 'after:bottom-4';
    } else if (placement === 'right') {
      return 'after:top-1/2 after:-mt-2';
    } else if (placement === 'right-start') {
      return 'after:top-4';
    } else if (placement === 'right-end') {
      return 'after:bottom-4';
    }
    
    return '';
  };
  
  // Generate all the needed classes for the popover
  const popoverClasses = `
    ${getSizeClasses()}
    bg-white dark:bg-gray-800
    border border-gray-200 dark:border-gray-700
    rounded-lg shadow-lg
    z-50
    ${arrow ? 'after:absolute after:content-[""] after:border-8' : ''}
    ${getArrowClass()}
    ${getArrowPosition()}
    ${className}
  `.trim();
  
  return (
    <>
      {/* Trigger element */}
      <div 
        ref={triggerRef}
        className={`inline-block ${disabled ? 'cursor-not-allowed opacity-60' : ''}`}
        aria-describedby={openState ? uniqueId.current : undefined}
        {...triggerHandlers}
      >
        {children}
      </div>
      
      {/* Popover content */}
      {openState && (
        <div
          ref={popoverRef}
          id={uniqueId.current}
          role="tooltip"
          className={popoverClasses}
          style={{
            position: 'absolute',
            top: `${position.top}px`,
            left: `${position.left}px`,
            opacity: 1,
            transition: `opacity ${animationDuration}ms ease-in-out`,
          }}
        >
          {title && (
            <div className="border-b border-gray-200 dark:border-gray-700 pb-2 mb-2 font-medium">
              {title}
            </div>
          )}
          <div>{content}</div>
        </div>
      )}
    </>
  );
};

// Example component to showcase the Popover
const PopoverExample: React.FC = () => {
  const [controlledOpen, setControlledOpen] = useState(false);
  const [placement, setPlacement] = useState<PopoverPlacement>('bottom');
  const [trigger, setTrigger] = useState<TriggerType>('click');
  const [size, setSize] = useState<PopoverSize>('medium');
  const [showArrow, setShowArrow] = useState(true);
  const [showTitle, setShowTitle] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  
  // For manual trigger demo
  const toggleControlledPopover = () => {
    setControlledOpen(!controlledOpen);
  };
  
  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow space-y-8">
      <h2 className="text-xl font-semibold mb-4">Popover Examples</h2>
      
      {/* Configuration Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Placement */}
        <div>
          <h3 className="text-sm font-medium mb-2">Placement</h3>
          <div className="grid grid-cols-3 gap-2">
            {(['top', 'top-start', 'top-end', 'right', 'right-start', 'right-end', 'bottom', 'bottom-start', 'bottom-end', 'left', 'left-start', 'left-end'] as PopoverPlacement[]).map((p) => (
              <button
                key={p}
                onClick={() => setPlacement(p)}
                className={`
                  px-2 py-1 text-xs rounded-md truncate
                  ${placement === p
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}
                `}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
        
        {/* Trigger Type */}
        <div>
          <h3 className="text-sm font-medium mb-2">Trigger Type</h3>
          <div className="flex flex-wrap gap-2">
            {(['click', 'hover', 'focus', 'manual'] as TriggerType[]).map((t) => (
              <button
                key={t}
                onClick={() => setTrigger(t)}
                className={`
                  px-3 py-1 text-sm rounded-md
                  ${trigger === t
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}
                `}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>
        </div>
        
        {/* Size */}
        <div>
          <h3 className="text-sm font-medium mb-2">Size</h3>
          <div className="flex space-x-2">
            {(['small', 'medium', 'large'] as PopoverSize[]).map((s) => (
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
        <div>
          <h3 className="text-sm font-medium mb-2">Options</h3>
          <div className="flex flex-wrap gap-4">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={showArrow}
                onChange={() => setShowArrow(!showArrow)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="ml-2">Show Arrow</span>
            </label>
            
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={showTitle}
                onChange={() => setShowTitle(!showTitle)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="ml-2">Show Title</span>
            </label>
            
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={isDisabled}
                onChange={() => setIsDisabled(!isDisabled)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="ml-2">Disabled</span>
            </label>
          </div>
        </div>
        
        {/* Manual trigger control (only shown for manual trigger) */}
        {trigger === 'manual' && (
          <div className="col-span-2">
            <h3 className="text-sm font-medium mb-2">Manual Control</h3>
            <button
              onClick={toggleControlledPopover}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              {controlledOpen ? 'Close Popover' : 'Open Popover'}
            </button>
          </div>
        )}
      </div>
      
      {/* Popover Previews */}
      <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
        <h3 className="text-lg font-medium mb-6">Popover Preview</h3>
        
        <div className="grid place-items-center h-40">
          <Popover
            content={
              <div className="w-full">
                <p>This is a popover with {placement} placement and {trigger} trigger.</p>
                <p className="mt-2">Popover contents can include text, links, or any React component.</p>
              </div>
            }
            placement={placement}
            trigger={trigger}
            open={trigger === 'manual' ? controlledOpen : undefined}
            onOpenChange={trigger === 'manual' ? setControlledOpen : undefined}
            size={size}
            arrow={showArrow}
            title={showTitle ? 'Popover Title' : undefined}
            disabled={isDisabled}
          >
            <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-md">
              {isDisabled ? 'Disabled Trigger' : 'Trigger Popover'}
            </button>
          </Popover>
        </div>
      </div>
      
      {/* Common Use Cases */}
      <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
        <h3 className="text-lg font-medium mb-6">Common Use Cases</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Simple Tooltip */}
          <div className="flex flex-col items-center">
            <h4 className="text-md font-medium mb-4">Simple Tooltip</h4>
            <Popover
              content="This is a simple tooltip with minimal content."
              placement="top"
              trigger="hover"
              size="small"
              arrow={true}
            >
              <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                Hover Me
              </button>
            </Popover>
          </div>
          
          {/* Form Help */}
          <div className="flex flex-col items-center">
            <h4 className="text-md font-medium mb-4">Form Help</h4>
            <div className="relative w-full max-w-sm">
              <label className="block text-sm font-medium mb-1">
                Username
                <Popover
                  content="Username must be 3-16 characters and can contain letters, numbers, and underscores."
                  placement="top"
                  trigger="hover"
                  size="small"
                  arrow={true}
                >
                  <button className="ml-2 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-gray-400 rounded-full hover:bg-gray-500 focus:outline-none">
                    ?
                  </button>
                </Popover>
              </label>
              <input 
                type="text" 
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter username"
              />
            </div>
          </div>
          
          {/* Rich Content */}
          <div className="flex flex-col items-center">
            <h4 className="text-md font-medium mb-4">Rich Content</h4>
            <Popover
              content={
                <div>
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                      JD
                    </div>
                    <div className="ml-3">
                      <div className="font-medium">John Doe</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">john.doe@example.com</div>
                    </div>
                  </div>
                  <div className="flex space-x-2 mt-3">
                    <button className="px-3 py-1 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600">
                      Profile
                    </button>
                    <button className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm rounded-md hover:bg-gray-300 dark:hover:bg-gray-600">
                      Message
                    </button>
                  </div>
                </div>
              }
              placement="bottom"
              trigger="click"
              size="medium"
              arrow={true}
              title="User Profile"
            >
              <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-md">
                View Profile
              </button>
            </Popover>
          </div>
        </div>
      </div>
      
      {/* Example Usage Code */}
      <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
        <h3 className="text-lg font-medium mb-4">Usage Examples</h3>
        
        <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-auto">
          <pre className="text-sm">
            {`// Basic Usage
<Popover
  content="This is the popover content"
  placement="bottom"
  trigger="click"
>
  <button>Click Me</button>
</Popover>

// Advanced Usage
<Popover
  content={<CustomComponent />}
  placement="right"
  trigger="hover"
  size="large"
  arrow={true}
  title="Popover Title"
  closeOnOutsideClick={true}
  closeOnEscape={true}
>
  <button>Hover Me</button>
</Popover>`}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default PopoverExample;
