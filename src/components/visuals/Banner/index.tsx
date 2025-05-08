'use client';

import React from 'react';

interface BannerProps {
  /** Main banner content */
  children: React.ReactNode;
  /** Optional banner title */
  title?: string;
  /** Optional banner action/button */
  action?: React.ReactNode;
  /** Banner appearance variant */
  variant?: 'default' | 'info' | 'success' | 'warning' | 'error';
  /** Whether the banner has a close button */
  dismissible?: boolean;
  /** Callback when the banner is dismissed */
  onDismiss?: () => void;
  /** Additional CSS classes */
  className?: string;
  /** Icon to display (optional) */
  icon?: React.ReactNode;
  /** Banner position - full width or sticky to top/bottom */
  position?: 'default' | 'sticky-top' | 'sticky-bottom';
}

/**
 * Banner - A full-width information or action component
 * 
 * Banners are prominent, full-width messages that appear at the top, bottom,
 * or within a page to communicate important information. They often include
 * a message, optional title, and sometimes actions that users can take.
 * 
 * Common uses include announcements, system alerts, promotional offers,
 * onboarding messages, and cookie consent notices.
 */
const Banner: React.FC<BannerProps> = ({
  children,
  title,
  action,
  variant = 'default',
  dismissible = false,
  onDismiss,
  className = '',
  icon,
  position = 'default',
}) => {
  // Variant styling
  const variantClasses = {
    default: 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200',
    info: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200',
    success: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-800 dark:text-green-200',
    warning: 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-200',
    error: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200',
  }[variant];

  // Position classes
  const positionClasses = {
    default: '',
    'sticky-top': 'sticky top-0 z-50',
    'sticky-bottom': 'sticky bottom-0 z-50',
  }[position];

  return (
    <div 
      className={`
        w-full px-4 py-3 border-b ${variant !== 'default' ? 'border-l-4' : ''}
        shadow-sm ${variantClasses} ${positionClasses} ${className}
      `}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-start">
          {icon && (
            <div className="flex-shrink-0 mr-3">
              {icon}
            </div>
          )}
          <div>
            {title && (
              <h3 className="text-sm font-medium mb-1">{title}</h3>
            )}
            <div className="text-sm">{children}</div>
          </div>
        </div>
        <div className="flex items-center space-x-2 ml-4">
          {action && (
            <div className="flex-shrink-0">
              {action}
            </div>
          )}
          {dismissible && (
            <button
              type="button"
              className="inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent"
              onClick={onDismiss}
              aria-label="Dismiss banner"
            >
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Banner;
