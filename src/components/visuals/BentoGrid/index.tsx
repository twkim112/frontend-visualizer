'use client';

import React from 'react';

interface BentoGridItemProps {
  title?: string;
  content?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
}

/**
 * BentoGridItem - An individual cell in a Bento Grid layout
 */
const BentoGridItem: React.FC<BentoGridItemProps> = ({
  title,
  content,
  className = '',
  children,
  size = 'medium',
}) => {
  // Determine sizing classes based on the size prop
  const sizeClasses = {
    small: 'col-span-1 row-span-1',
    medium: 'col-span-1 row-span-1 md:col-span-1 md:row-span-1',
    large: 'col-span-1 row-span-1 md:col-span-2 md:row-span-2',
  }[size];

  return (
    <div 
      className={`
        ${sizeClasses}
        rounded-xl border border-gray-200 dark:border-gray-800 
        bg-white dark:bg-gray-900 p-4 shadow-sm 
        hover:shadow-md transition-shadow duration-300
        overflow-hidden
        ${className}
      `}
    >
      {title && (
        <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
          {title}
        </h3>
      )}
      {content || children}
    </div>
  );
};

interface BentoGridProps {
  children: React.ReactNode;
  className?: string;
  columns?: number;
  gap?: 'small' | 'medium' | 'large';
}

/**
 * BentoGrid - A modern layout structure that arranges content in an asymmetrical grid pattern
 * 
 * Commonly used for dashboards, homepages, and content showcases, the Bento Grid (named after
 * Japanese lunch boxes) arranges content blocks in a visually interesting, non-uniform layout.
 * 
 * Each cell can contain different types of content and vary in size, creating a visually
 * dynamic presentation while maintaining overall harmony.
 */
const BentoGrid: React.FC<BentoGridProps> = ({
  children,
  className = '',
  columns = 3,
  gap = 'medium',
}) => {
  // Map gap size to Tailwind classes
  const gapClasses = {
    small: 'gap-2',
    medium: 'gap-4',
    large: 'gap-6',
  }[gap];

  // Set the grid column configuration based on the columns prop
  const gridCols = `grid-cols-1 md:grid-cols-${Math.min(columns, 6)}`;

  return (
    <div className={`grid ${gridCols} ${gapClasses} ${className}`}>
      {children}
    </div>
  );
};

// Export both components with BentoGrid as the default
export { BentoGridItem };
export default BentoGrid;
