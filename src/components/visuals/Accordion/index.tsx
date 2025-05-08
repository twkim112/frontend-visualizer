'use client';

import React, { useState } from 'react';

// Types for the Accordion component
interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  isOpen?: boolean;
  onToggle?: () => void;
  titleClassName?: string;
  contentClassName?: string;
  iconPosition?: 'left' | 'right';
}

interface AccordionProps {
  items: Array<{ 
    title: string; 
    content: React.ReactNode;
    id: string;
  }>;
  allowMultiple?: boolean;
  defaultOpenIndexes?: number[];
  className?: string;
  itemClassName?: string;
  titleClassName?: string;
  contentClassName?: string;
  iconPosition?: 'left' | 'right';
}

/**
 * AccordionItem Component
 * 
 * A single expandable/collapsible section within an Accordion.
 * 
 * @param title - The header text for the accordion item
 * @param children - The content that will be shown/hidden
 * @param isOpen - Whether the accordion item is expanded
 * @param onToggle - Function called when the header is clicked
 * @param titleClassName - Additional CSS classes for the title
 * @param contentClassName - Additional CSS classes for the content
 * @param iconPosition - Position of the expand/collapse icon (left or right)
 */
const AccordionItem: React.FC<AccordionItemProps> = ({
  title,
  children,
  isOpen = false,
  onToggle,
  titleClassName = '',
  contentClassName = '',
  iconPosition = 'right'
}) => {
  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden">
      <button
        className={`w-full p-4 text-left flex items-center justify-between bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${titleClassName}`}
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        {iconPosition === 'left' && (
          <ChevronIcon isOpen={isOpen} className="mr-2" />
        )}
        <span className={`font-medium ${iconPosition === 'left' ? 'flex-grow' : ''}`}>{title}</span>
        {iconPosition === 'right' && (
          <ChevronIcon isOpen={isOpen} />
        )}
      </button>
      <div 
        className={`
          overflow-hidden transition-all duration-300 ease-in-out
          ${isOpen ? 'max-h-96' : 'max-h-0'}
          ${contentClassName}
        `}
        aria-hidden={!isOpen}
      >
        <div className="p-4 bg-white dark:bg-gray-800">
          {children}
        </div>
      </div>
    </div>
  );
};

// Chevron icon that rotates based on accordion state
const ChevronIcon: React.FC<{ isOpen: boolean; className?: string }> = ({ isOpen, className = '' }) => (
  <svg 
    className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''} ${className}`} 
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

/**
 * Accordion Component
 * 
 * A vertically stacked list of items where each item can be expanded or collapsed
 * to reveal or hide content associated with that item.
 * 
 * @param items - Array of objects with title and content for each accordion item
 * @param allowMultiple - Whether multiple sections can be open simultaneously
 * @param defaultOpenIndexes - Array of indexes that should be open by default
 * @param className - Additional CSS classes for the accordion container
 * @param itemClassName - Additional CSS classes for each accordion item
 * @param titleClassName - Additional CSS classes for accordion item titles
 * @param contentClassName - Additional CSS classes for accordion item content
 * @param iconPosition - Position of the expand/collapse icon (left or right)
 */
const Accordion: React.FC<AccordionProps> = ({ 
  items,
  allowMultiple = false,
  defaultOpenIndexes = [],
  className = '',
  itemClassName = '',
  titleClassName = '',
  contentClassName = '',
  iconPosition = 'right'
}) => {
  const [openIndexes, setOpenIndexes] = useState<number[]>(defaultOpenIndexes);
  
  const handleToggle = (index: number) => {
    if (allowMultiple) {
      // Toggle the clicked item while keeping others unchanged
      setOpenIndexes(prevOpenIndexes => 
        prevOpenIndexes.includes(index)
          ? prevOpenIndexes.filter(i => i !== index)
          : [...prevOpenIndexes, index]
      );
    } else {
      // Only allow one item to be open at a time
      setOpenIndexes(prevOpenIndexes => 
        prevOpenIndexes.includes(index) ? [] : [index]
      );
    }
  };
  
  return (
    <div className={`space-y-2 ${className}`}>
      {items.map((item, index) => (
        <AccordionItem
          key={item.id}
          title={item.title}
          isOpen={openIndexes.includes(index)}
          onToggle={() => handleToggle(index)}
          titleClassName={titleClassName}
          contentClassName={contentClassName}
          iconPosition={iconPosition}
        >
          {item.content}
        </AccordionItem>
      ))}
    </div>
  );
};

// Example component to showcase the Accordion
const AccordionExample: React.FC = () => {
  // Sample data for the accordion
  const defaultItems = [
    {
      id: '1',
      title: 'What is an Accordion component?',
      content: (
        <p>
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
        <div>
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
        <p>
          Properly implemented accordions should be accessible via keyboard navigation and work with screen readers.
          They should use appropriate ARIA attributes (aria-expanded, aria-controls) and respond to keyboard events.
          This implementation handles basic accessibility requirements.
        </p>
      )
    }
  ];
  
  // State for configuration options
  const [items, setItems] = useState(defaultItems);
  const [allowMultiple, setAllowMultiple] = useState(false);
  const [iconPosition, setIconPosition] = useState<'left' | 'right'>('right');
  
  // Add a new item to the accordion
  const addItem = () => {
    const newId = (items.length + 1).toString();
    setItems([
      ...items,
      {
        id: newId,
        title: `Accordion Item ${newId}`,
        content: <p>This is the content for accordion item {newId}. You can expand and collapse this section.</p>
      }
    ]);
  };
  
  // Reset to default items
  const resetItems = () => {
    setItems(defaultItems);
  };
  
  return (
    <div className="space-y-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Accordion Demo</h2>
      
      {/* Configuration Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={allowMultiple}
              onChange={(e) => setAllowMultiple(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <span>Allow Multiple Open Sections</span>
          </label>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Icon Position</label>
          <div className="flex space-x-4">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                checked={iconPosition === 'left'}
                onChange={() => setIconPosition('left')}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <span>Left</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                checked={iconPosition === 'right'}
                onChange={() => setIconPosition('right')}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <span>Right</span>
            </label>
          </div>
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="flex space-x-4 mb-6">
        <button
          onClick={addItem}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Add Item
        </button>
        <button
          onClick={resetItems}
          className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
        >
          Reset
        </button>
      </div>
      
      {/* Accordion Component */}
      <Accordion
        items={items}
        allowMultiple={allowMultiple}
        iconPosition={iconPosition}
        className="border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden"
      />
      
      {/* Usage Examples */}
      <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-medium mb-4">Common Use Cases</h3>
        
        <div className="space-y-6">
          {/* FAQ Example */}
          <div>
            <h4 className="text-md font-medium mb-2">Frequently Asked Questions</h4>
            <Accordion
              items={[
                {
                  id: 'faq1',
                  title: 'How do I reset my password?',
                  content: <p>Visit the login page and click "Forgot password" to receive a reset link via email.</p>
                },
                {
                  id: 'faq2',
                  title: 'What payment methods do you accept?',
                  content: <p>We accept all major credit cards, PayPal, and bank transfers.</p>
                }
              ]}
              allowMultiple={false}
            />
          </div>
          
          {/* Navigation Example */}
          <div>
            <h4 className="text-md font-medium mb-2">Navigation Menu</h4>
            <Accordion
              items={[
                {
                  id: 'nav1',
                  title: 'Products',
                  content: (
                    <ul className="space-y-1">
                      <li className="hover:text-blue-500 cursor-pointer">Software</li>
                      <li className="hover:text-blue-500 cursor-pointer">Hardware</li>
                      <li className="hover:text-blue-500 cursor-pointer">Services</li>
                    </ul>
                  )
                },
                {
                  id: 'nav2',
                  title: 'Resources',
                  content: (
                    <ul className="space-y-1">
                      <li className="hover:text-blue-500 cursor-pointer">Documentation</li>
                      <li className="hover:text-blue-500 cursor-pointer">Tutorials</li>
                      <li className="hover:text-blue-500 cursor-pointer">Support</li>
                    </ul>
                  )
                }
              ]}
              allowMultiple={true}
              iconPosition="left"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccordionExample;
