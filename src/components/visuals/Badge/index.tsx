/**
 * Badge Component Index
 * 
 * Demonstrates different types of badges used for status indicators, counts, and labels
 */
'use client';

import React, { useState } from 'react';
import Badge, { BadgeProps } from './Badge';

const BadgeDemo: React.FC = () => {
  const [removableBadges, setRemovableBadges] = useState([
    'React', 'TypeScript', 'Next.js', 'Tailwind CSS'
  ]);
  
  const handleRemoveBadge = (index: number) => {
    setRemovableBadges(prev => prev.filter((_, i) => i !== index));
  };
  
  return (
    <div className="space-y-12">
      <div>
        <h2 className="text-xl font-semibold mb-4">Badge</h2>
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          A small visual indicator used to highlight information, counts, or status.
          Badges are typically used for notification counts, status indicators, or tags/labels.
        </p>
        
        <div className="space-y-8">
          {/* Basic Badge Variants */}
          <div>
            <h3 className="text-lg font-medium mb-3">Basic Badges</h3>
            <div className="flex flex-wrap gap-2 p-6 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
              <Badge variant="primary">Primary</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="danger">Danger</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="info">Info</Badge>
            </div>
          </div>
          
          {/* Badge Sizes */}
          <div>
            <h3 className="text-lg font-medium mb-3">Badge Sizes</h3>
            <div className="flex flex-wrap items-center gap-2 p-6 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
              <Badge size="sm">Small</Badge>
              <Badge size="md">Medium</Badge>
              <Badge size="lg">Large</Badge>
            </div>
          </div>
          
          {/* Badge Shapes */}
          <div>
            <h3 className="text-lg font-medium mb-3">Badge Shapes</h3>
            <div className="flex flex-wrap gap-2 p-6 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
              <Badge shape="rounded">Rounded</Badge>
              <Badge shape="pill">Pill Shape</Badge>
            </div>
          </div>
          
          {/* Notification Badges */}
          <div>
            <h3 className="text-lg font-medium mb-3">Notification Badges</h3>
            <div className="flex flex-wrap gap-4 p-6 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
              <div className="relative">
                <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-md">
                  Messages
                </button>
                <Badge 
                  variant="danger" 
                  size="sm" 
                  className="absolute -top-2 -right-2"
                >
                  8
                </Badge>
              </div>
              
              <div className="relative">
                <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-md">
                  Notifications
                </button>
                <Badge 
                  variant="primary" 
                  size="sm"
                  shape="pill"
                  className="absolute -top-2 -right-2"
                >
                  24
                </Badge>
              </div>
              
              <div className="relative inline-flex">
                <svg 
                  className="w-6 h-6 text-gray-500" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" 
                  />
                </svg>
                <Badge 
                  variant="danger" 
                  size="sm" 
                  className="absolute -top-1 -right-1 w-3 h-3 p-0"
                >
                  <span className="sr-only">Notification indicator</span>
                </Badge>
              </div>
            </div>
          </div>
          
          {/* Status Badges */}
          <div>
            <h3 className="text-lg font-medium mb-3">Status Badges</h3>
            <div className="flex flex-wrap gap-3 p-6 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
              <Badge variant="success">Active</Badge>
              <Badge variant="danger">Offline</Badge>
              <Badge variant="warning">Away</Badge>
              <Badge variant="info">In Review</Badge>
              <Badge variant="secondary">Draft</Badge>
              <Badge variant="primary">New</Badge>
            </div>
          </div>
          
          {/* Removable Badges (Tag-like) */}
          <div>
            <h3 className="text-lg font-medium mb-3">Removable Badges (Tags)</h3>
            <div className="flex flex-wrap gap-2 p-6 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
              {removableBadges.map((tag, index) => (
                <Badge 
                  key={tag} 
                  variant="secondary" 
                  shape="pill" 
                  removable 
                  onRemove={() => handleRemoveBadge(index)}
                >
                  {tag}
                </Badge>
              ))}
              {removableBadges.length === 0 && (
                <p className="text-sm text-gray-500">All tags have been removed. Refresh to reset.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-3">Common Use Cases</h3>
        <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
          <li>Notification counters on icons or buttons</li>
          <li>Status indicators (online/offline, active/inactive)</li>
          <li>Tags or labels for categorization</li>
          <li>Highlighting new or featured items</li>
          <li>Indicating counts or quantities</li>
          <li>Showing version numbers or release statuses</li>
        </ul>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-3">Technical Details</h3>
        <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <dt className="font-medium text-gray-900 dark:text-white">Alternative Names</dt>
            <dd className="mt-1 text-gray-700 dark:text-gray-300">Chip, Tag, Label, Pill</dd>
          </div>
          <div>
            <dt className="font-medium text-gray-900 dark:text-white">Related Components</dt>
            <dd className="mt-1 text-gray-700 dark:text-gray-300">Tag, Label, Pill, Chip</dd>
          </div>
          <div>
            <dt className="font-medium text-gray-900 dark:text-white">Implementation</dt>
            <dd className="mt-1 text-gray-700 dark:text-gray-300">Uses Tailwind CSS for styling and supports light/dark mode</dd>
          </div>
          <div>
            <dt className="font-medium text-gray-900 dark:text-white">Accessibility</dt>
            <dd className="mt-1 text-gray-700 dark:text-gray-300">Uses semantic HTML and provides proper aria-labels for interactive elements</dd>
          </div>
        </dl>
      </div>
    </div>
  );
};

export default BadgeDemo;
