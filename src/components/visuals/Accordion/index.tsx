/**
 * Accordion Example Component
 * 
 * This file provides an example implementation of the Accordion component
 * for showcase purposes in the Frontend Visualizer
 */
'use client';

import React, { useState } from 'react';
import Accordion from './Accordion';

// Example component for showcasing the Accordion
const AccordionExample: React.FC = () => {
  // Sample data for the accordion
  const defaultItems = [
    {
      id: '1',
      title: 'What is an Accordion component?',
      content: (
        <p className="text-gray-700 dark:text-gray-300">
          An accordion is a vertically stacked list of items where each item can be expanded or collapsed
          to reveal or hide content. It's commonly used to display FAQs, nested navigation, or to
          organize content that would otherwise take up too much space.
        </p>
      )
    },
    {
      id: '2',
      title: 'When should I use an Accordion?',
      content: (
        <div className="text-gray-700 dark:text-gray-300">
          <p>Accordions are useful when:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>You have a lot of content to display in a limited space</li>
            <li>The content can be logically divided into sections</li>
            <li>Users may not need to see all content at once</li>
            <li>You want to reduce cognitive load by showing only relevant information</li>
          </ul>
        </div>
      )
    },
    {
      id: '3',
      title: 'What are the accessibility considerations?',
      content: (
        <p className="text-gray-700 dark:text-gray-300">
          Properly implemented accordions should be accessible via keyboard navigation and work with screen readers.
          They should use appropriate ARIA attributes (aria-expanded, aria-controls) and respond to keyboard events.
          This implementation handles basic accessibility requirements.
        </p>
      )
    }
  ];
  
  // State for configuration options
  const [items] = useState(defaultItems);
  const [allowMultiple, setAllowMultiple] = useState(false);
  const [iconPosition, setIconPosition] = useState<'left' | 'right'>('right');
  const [variant, setVariant] = useState<'default' | 'bordered' | 'minimal'>('default');
  
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4 mb-4">
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            checked={allowMultiple}
            onChange={(e) => setAllowMultiple(e.target.checked)}
            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
          />
          <span className="text-sm">Allow Multiple Open</span>
        </label>
        
        <div className="space-x-3">
          <select 
            value={variant}
            onChange={(e) => setVariant(e.target.value as any)}
            className="px-2 py-1 text-sm border border-gray-300 rounded text-gray-700 dark:text-gray-300 dark:bg-gray-700 dark:border-gray-600"
          >
            <option value="default">Default Style</option>
            <option value="bordered">Bordered Style</option>
            <option value="minimal">Minimal Style</option>
          </select>
          
          <select 
            value={iconPosition}
            onChange={(e) => setIconPosition(e.target.value as any)}
            className="px-2 py-1 text-sm border border-gray-300 rounded text-gray-700 dark:text-gray-300 dark:bg-gray-700 dark:border-gray-600"
          >
            <option value="right">Icon Right</option>
            <option value="left">Icon Left</option>
          </select>
        </div>
      </div>
      
      <Accordion
        items={items}
        allowMultiple={allowMultiple}
        iconPosition={iconPosition}
        variant={variant}
      />
    </div>
  );
};

// Export the example component as the default export
export default AccordionExample;

// Also export the actual Accordion component for use in other components
export { default as AccordionComponent } from './Accordion';
export * from './Accordion';
