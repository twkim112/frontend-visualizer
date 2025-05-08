'use client';

import React, { useState, useRef, useEffect } from 'react';

// Types for the Tooltip component
type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';
type TooltipTrigger = 'hover' | 'click' | 'focus';

interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  position?: TooltipPosition;
  trigger?: TooltipTrigger | TooltipTrigger[];
  delay?: number;
  className?: string;
  contentClassName?: string;
  arrow?: boolean;
  maxWidth?: number;
  disabled?: boolean;
}

/**
 * Tooltip Component
 * 
 * A small informational popup that appears when hovering over or focusing on an element,
 * providing additional context or explanation.
 * 
 * @param content - The content to show in the tooltip
 * @param children - The element that triggers the tooltip
 * @param position - The position of the tooltip relative to the trigger element
 * @param trigger - What action triggers the tooltip to appear (hover, click, focus)
 * @param delay - Delay in ms before showing the tooltip
 * @param className - Additional CSS class for the tooltip container
 * @param contentClassName - Additional CSS class for the tooltip content
 * @param arrow - Whether to show an arrow pointing to the trigger element
 * @param maxWidth - Maximum width of the tooltip in pixels
 * @param disabled - Whether the tooltip is disabled
 */
const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = 'top',
  trigger = 'hover',
  delay = 300,
  className = '',
  contentClassName = '',
  arrow = true,
  maxWidth = 200,
  disabled = false,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Convert trigger to array for consistent handling
  const triggers = Array.isArray(trigger) ? trigger : [trigger];
  
  // Calculate tooltip position based on trigger element position and dimensions
  const calculatePosition = () => {
    if (!triggerRef.current || !tooltipRef.current) return;
    
    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const scrollY = window.scrollY;
    const scrollX = window.scrollX;
    
    let top = 0;
    let left = 0;
    
    switch (position) {
      case 'top':
        top = triggerRect.top + scrollY - tooltipRect.height - 8;
        left = triggerRect.left + scrollX + (triggerRect.width / 2) - (tooltipRect.width / 2);
        break;
      case 'bottom':
        top = triggerRect.bottom + scrollY + 8;
        left = triggerRect.left + scrollX + (triggerRect.width / 2) - (tooltipRect.width / 2);
        break;
      case 'left':
        top = triggerRect.top + scrollY + (triggerRect.height / 2) - (tooltipRect.height / 2);
        left = triggerRect.left + scrollX - tooltipRect.width - 8;
        break;
      case 'right':
        top = triggerRect.top + scrollY + (triggerRect.height / 2) - (tooltipRect.height / 2);
        left = triggerRect.right + scrollX + 8;
        break;
    }
    
    // Ensure tooltip stays within viewport
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // Adjust horizontal position if tooltip would go off-screen
    if (left < 10) {
      left = 10;
    } else if (left + tooltipRect.width > viewportWidth - 10) {
      left = viewportWidth - tooltipRect.width - 10;
    }
    
    // Adjust vertical position if tooltip would go off-screen
    if (top < 10) {
      top = 10;
    } else if (top + tooltipRect.height > viewportHeight + scrollY - 10) {
      top = viewportHeight + scrollY - tooltipRect.height - 10;
    }
    
    setTooltipPosition({ top, left });
  };
  
  // Show the tooltip with delay
  const showTooltip = () => {
    if (disabled) return;
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
      // Calculate position after the tooltip is rendered
      setTimeout(calculatePosition, 0);
    }, delay);
  };
  
  // Hide the tooltip
  const hideTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsVisible(false);
  };
  
  // Toggle tooltip visibility (for click trigger)
  const toggleTooltip = () => {
    if (disabled) return;
    
    if (isVisible) {
      hideTooltip();
    } else {
      showTooltip();
    }
  };
  
  // Update position when window is resized
  useEffect(() => {
    if (isVisible) {
      window.addEventListener('resize', calculatePosition);
      window.addEventListener('scroll', calculatePosition);
    }
    
    return () => {
      window.removeEventListener('resize', calculatePosition);
      window.removeEventListener('scroll', calculatePosition);
    };
  }, [isVisible]);
  
  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);
  
  // Event handlers based on trigger type
  const eventHandlers = {
    ...(triggers.includes('hover') && {
      onMouseEnter: showTooltip,
      onMouseLeave: hideTooltip,
    }),
    ...(triggers.includes('focus') && {
      onFocus: showTooltip,
      onBlur: hideTooltip,
    }),
    ...(triggers.includes('click') && {
      onClick: toggleTooltip,
    }),
  };
  
  // Arrow position class based on tooltip position
  const getArrowClass = () => {
    switch (position) {
      case 'top': return 'after:border-t-gray-800 after:bottom-[-6px]';
      case 'bottom': return 'after:border-b-gray-800 after:top-[-6px]';
      case 'left': return 'after:border-l-gray-800 after:right-[-6px]';
      case 'right': return 'after:border-r-gray-800 after:left-[-6px]';
      default: return 'after:border-t-gray-800 after:bottom-[-6px]';
    }
  };
  
  // Position arrow correctly based on tooltip position
  const getArrowPositionStyle = () => {
    switch (position) {
      case 'top':
      case 'bottom':
        return 'after:left-1/2 after:-translate-x-1/2';
      case 'left':
      case 'right':
        return 'after:top-1/2 after:-translate-y-1/2';
      default:
        return 'after:left-1/2 after:-translate-x-1/2';
    }
  };
  
  return (
    <div 
      className={`inline-block relative ${className}`}
      ref={triggerRef}
      {...eventHandlers}
    >
      {/* Trigger element */}
      {children}
      
      {/* Tooltip element */}
      {isVisible && (
        <div
          ref={tooltipRef}
          className={`
            absolute z-50 px-3 py-2 text-sm text-white bg-gray-800 dark:bg-gray-900
            rounded shadow-lg transition-opacity duration-300
            ${arrow ? 'after:absolute after:content-[""] after:border-solid after:border-8 after:border-transparent' : ''}
            ${arrow ? getArrowClass() : ''}
            ${arrow ? getArrowPositionStyle() : ''}
            ${contentClassName}
          `}
          style={{
            top: tooltipPosition.top,
            left: tooltipPosition.left,
            maxWidth: `${maxWidth}px`,
          }}
          role="tooltip"
        >
          {content}
        </div>
      )}
    </div>
  );
};

// Example component to showcase the Tooltip
const TooltipExample: React.FC = () => {
  const [position, setPosition] = useState<TooltipPosition>('top');
  const [trigger, setTrigger] = useState<TooltipTrigger[]>(['hover']);
  const [delay, setDelay] = useState(300);
  const [arrow, setArrow] = useState(true);
  const [disabled, setDisabled] = useState(false);
  
  const handleTriggerChange = (triggerType: TooltipTrigger) => {
    setTrigger(prev => {
      if (prev.includes(triggerType)) {
        return prev.filter(t => t !== triggerType);
      } else {
        return [...prev, triggerType];
      }
    });
  };
  
  return (
    <div className="space-y-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Tooltip Demo</h2>
      
      {/* Configuration Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Position Selection */}
        <div>
          <label className="block text-sm font-medium mb-1">Position</label>
          <div className="grid grid-cols-2 gap-2">
            {['top', 'right', 'bottom', 'left'].map((pos) => (
              <button
                key={pos}
                onClick={() => setPosition(pos as TooltipPosition)}
                className={`
                  py-2 px-3 text-sm rounded-md
                  ${position === pos
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                  }
                `}
              >
                {pos}
              </button>
            ))}
          </div>
        </div>
        
        {/* Trigger Selection */}
        <div>
          <label className="block text-sm font-medium mb-1">Trigger</label>
          <div className="space-y-2">
            {['hover', 'click', 'focus'].map((trig) => (
              <label key={trig} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={trigger.includes(trig as TooltipTrigger)}
                  onChange={() => handleTriggerChange(trig as TooltipTrigger)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className="capitalize">{trig}</span>
              </label>
            ))}
          </div>
        </div>
        
        {/* Delay Slider */}
        <div>
          <label className="block text-sm font-medium mb-1">Delay ({delay}ms)</label>
          <input
            type="range"
            min={0}
            max={1000}
            step={100}
            value={delay}
            onChange={(e) => setDelay(parseInt(e.target.value))}
            className="w-full"
          />
        </div>
        
        {/* Other Options */}
        <div className="space-y-2">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={arrow}
              onChange={(e) => setArrow(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <span>Show Arrow</span>
          </label>
          
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={disabled}
              onChange={(e) => setDisabled(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <span>Disabled</span>
          </label>
        </div>
      </div>
      
      {/* Interactive Demo */}
      <div className="flex flex-col items-center justify-center space-y-8 py-12 border border-gray-200 dark:border-gray-700 rounded-lg">
        <h3 className="text-lg font-medium mb-2">Interactive Example</h3>
        
        <Tooltip
          content="This is a tooltip with configurable options!"
          position={position}
          trigger={trigger}
          delay={delay}
          arrow={arrow}
          disabled={disabled}
        >
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Hover, Click, or Focus Me
          </button>
        </Tooltip>
        
        <div className="text-sm text-center mt-4">
          Try interacting with the button based on your trigger settings
        </div>
      </div>
      
      {/* Common Use Cases */}
      <div className="pt-6 mt-6 border-t border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-medium mb-4">Common Use Cases</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Help Text */}
          <div className="flex items-center">
            <label className="mr-2">Username:</label>
            <input
              type="text"
              className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            />
            <Tooltip
              content="Username must be 3-16 characters and contain only letters, numbers, and underscores."
              position="right"
              arrow={true}
            >
              <button className="ml-2 text-gray-400 hover:text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </button>
            </Tooltip>
          </div>
          
          {/* Icon with Tooltip */}
          <div className="flex justify-center">
            <Tooltip
              content="Share this content"
              position="top"
              arrow={true}
            >
              <button className="p-2 text-gray-500 hover:text-blue-500 focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
              </button>
            </Tooltip>
          </div>
          
          {/* Abbreviated Content */}
          <div className="flex justify-center">
            <Tooltip
              content="This is the full text of a truncated element that would otherwise be too long to display in the available space."
              position="bottom"
              arrow={true}
              maxWidth={300}
            >
              <div className="max-w-[150px] truncate border border-gray-300 dark:border-gray-600 px-2 py-1 rounded">
                This is the full text of a truncated element that would otherwise be too long...
              </div>
            </Tooltip>
          </div>
        </div>
      </div>
      
      {/* Rich Content Example */}
      <div className="flex justify-center pt-6 mt-6 border-t border-gray-200 dark:border-gray-700">
        <Tooltip
          content={
            <div className="w-64">
              <h4 className="font-bold mb-1">Rich Tooltip Content</h4>
              <p className="mb-2">Tooltips can contain structured content, not just text.</p>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span>Active Status</span>
              </div>
            </div>
          }
          position="top"
          arrow={true}
          maxWidth={300}
          contentClassName="p-4"
        >
          <button className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400">
            Rich Content Example
          </button>
        </Tooltip>
      </div>
    </div>
  );
};

export default TooltipExample;
