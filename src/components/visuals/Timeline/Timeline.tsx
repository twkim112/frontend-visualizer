/**
 * Timeline Component
 * 
 * A vertical or horizontal representation of a sequence of events or milestones,
 * often used to display a chronological progression or workflow.
 */
'use client';

import React from 'react';

// Types for timeline data
export interface TimelineItem {
  id: string | number;
  title: React.ReactNode;
  content?: React.ReactNode;
  date?: string;
  icon?: React.ReactNode;
  status?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'current';
  extra?: React.ReactNode;
}

export interface TimelineProps {
  /** Array of timeline items to display */
  items: TimelineItem[];
  /** Timeline orientation - vertical or horizontal */
  orientation?: 'vertical' | 'horizontal';
  /** Whether to alternate items (left and right) in vertical mode */
  alternate?: boolean;
  /** Whether to show connector lines */
  showConnectors?: boolean;
  /** Position mode for vertical timelines */
  position?: 'left' | 'right' | 'alternate';
  /** Whether to reverse the items order */
  reverse?: boolean;
  /** Custom width for the timeline (applies to vertical timelines) */
  width?: string;
  /** Size of the timeline component */
  size?: 'small' | 'medium' | 'large';
  /** Whether to show the timeline with a scrollbar (horizontal only) */
  scrollable?: boolean;
  /** Additional CSS class */
  className?: string;
  /** Callback when a timeline item is clicked */
  onItemClick?: (item: TimelineItem) => void;
}

/**
 * Timeline Component
 * 
 * A vertical or horizontal representation of a sequence of events or milestones,
 * often used to display a chronological progression or workflow.
 */
const Timeline: React.FC<TimelineProps> = ({
  items = [],
  orientation = 'vertical',
  alternate = false,
  showConnectors = true,
  position = 'left',
  reverse = false,
  width = 'auto',
  size = 'medium',
  scrollable = false,
  className = '',
  onItemClick,
}) => {
  // Prepare items with correct order
  const timelineItems = [...items];
  if (reverse) {
    timelineItems.reverse();
  }
  
  // Named constants for style variations (following readability principles)
  const SIZE_CLASSES = {
    small: {
      dot: 'w-3 h-3',
      content: 'text-sm',
      spacing: orientation === 'vertical' ? 'gap-2' : 'gap-3',
      padding: 'p-2',
    },
    medium: {
      dot: 'w-4 h-4',
      content: 'text-base',
      spacing: orientation === 'vertical' ? 'gap-4' : 'gap-6',
      padding: 'p-3',
    },
    large: {
      dot: 'w-5 h-5',
      content: 'text-lg',
      spacing: orientation === 'vertical' ? 'gap-6' : 'gap-9',
      padding: 'p-4',
    }
  };
  
  const STATUS_CLASSES = {
    default: 'bg-gray-400 dark:bg-gray-500',
    success: 'bg-green-500 dark:bg-green-400',
    warning: 'bg-yellow-500 dark:bg-yellow-400',
    error: 'bg-red-500 dark:bg-red-400',
    info: 'bg-blue-500 dark:bg-blue-400',
    current: 'bg-indigo-500 dark:bg-indigo-400 animate-pulse',
  };
  
  // Apply size classes
  const sizeClass = SIZE_CLASSES[size];
  
  const renderTimelineDot = (item: TimelineItem) => {
    const statusClass = STATUS_CLASSES[item.status || 'default'];
    
    return (
      <div className={`rounded-full flex items-center justify-center z-10 ${sizeClass.dot} ${statusClass}`}>
        {item.icon && (
          <span className="text-white">
            {item.icon}
          </span>
        )}
      </div>
    );
  };
  
  const renderVerticalTimeline = () => {
    return (
      <div className={`relative ${className}`} style={{ width }}>
        {showConnectors && (
          <div 
            className={`absolute inset-y-0 ${position === 'right' ? 'right-0 mr-1.5' : position === 'left' ? 'left-0 ml-1.5' : 'left-1/2 -ml-0.5'} w-0.5 bg-gray-200 dark:bg-gray-700`}
          />
        )}
        
        <div className={`relative ${sizeClass.spacing}`}>
          {timelineItems.map((item, index) => {
            // If using alternate positioning, determine the side
            const side = alternate 
              ? index % 2 === 0 ? 'left' : 'right'
              : position;
              
            return (
              <div 
                key={item.id} 
                className={`relative flex ${side === 'right' ? 'flex-row-reverse' : side === 'left' ? 'flex-row' : index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                onClick={() => onItemClick && onItemClick(item)}
              >
                {/* Dot */}
                <div className="flex-none flex items-center">
                  {renderTimelineDot(item)}
                </div>
                
                {/* Content */}
                <div className={`flex-grow ${side === 'right' ? 'pr-4' : 'pl-4'} ${onItemClick ? 'cursor-pointer' : ''}`}>
                  <div className={`${sizeClass.padding} rounded-md bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700`}>
                    {item.date && (
                      <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                        {item.date}
                      </div>
                    )}
                    <div className={`font-medium ${sizeClass.content}`}>
                      {item.title}
                    </div>
                    {item.content && (
                      <div className="mt-1 text-gray-600 dark:text-gray-300">
                        {item.content}
                      </div>
                    )}
                    {item.extra && (
                      <div className="mt-2">
                        {item.extra}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };
  
  const renderHorizontalTimeline = () => {
    return (
      <div className={`relative ${className} ${scrollable ? 'overflow-x-auto' : ''}`}>
        {showConnectors && (
          <div className="absolute top-1/2 left-0 right-0 h-0.5 -translate-y-1/2 bg-gray-200 dark:bg-gray-700" />
        )}
        
        <div className={`relative flex ${sizeClass.spacing} ${scrollable ? 'min-w-max' : 'justify-between'}`}>
          {timelineItems.map((item) => (
            <div 
              key={item.id} 
              className="flex flex-col items-center"
              onClick={() => onItemClick && onItemClick(item)}
            >
              {/* Dot */}
              <div className="flex-none mb-2">
                {renderTimelineDot(item)}
              </div>
              
              {/* Content */}
              <div className={`${sizeClass.padding} rounded-md bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 ${onItemClick ? 'cursor-pointer' : ''}`}>
                {item.date && (
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-1 text-center">
                    {item.date}
                  </div>
                )}
                <div className={`font-medium text-center ${sizeClass.content}`}>
                  {item.title}
                </div>
                {item.content && (
                  <div className="mt-1 text-gray-600 dark:text-gray-300 text-center">
                    {item.content}
                  </div>
                )}
                {item.extra && (
                  <div className="mt-2 text-center">
                    {item.extra}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  return orientation === 'vertical' ? renderVerticalTimeline() : renderHorizontalTimeline();
};

export default Timeline;
