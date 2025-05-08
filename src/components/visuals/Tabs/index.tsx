/**
 * Tabs Component
 * 
 * Interactive elements styled as physical tabs that allow users to switch 
 * between different content views or sections within the same context without a full page reload.
 */
'use client';

import { useState } from 'react';

export default function Tabs() {
  const [activeTab, setActiveTab] = useState(0);
  
  const tabs = [
    { label: 'Overview', content: 'This is the overview tab content. It typically provides a summary or introduction to the subject matter.' },
    { label: 'Features', content: 'This tab lists the key features and capabilities of the product or service being described.' },
    { label: 'Specifications', content: 'Technical details and specifications are provided here for users who need detailed information.' },
  ];
  
  return (
    <div className="w-full">
      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200 dark:border-gray-700">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === index
                ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
            }`}
            onClick={() => setActiveTab(index)}
            aria-selected={activeTab === index}
            role="tab"
            aria-controls={`tabpanel-${index}`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      
      {/* Tab Content Panels */}
      <div className="py-4">
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={`${activeTab === index ? 'block' : 'hidden'}`}
            id={`tabpanel-${index}`}
            role="tabpanel"
            aria-labelledby={`tab-${index}`}
          >
            <p className="text-gray-700 dark:text-gray-300">
              {tab.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
