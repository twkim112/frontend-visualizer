/**
 * Timeline Component Index
 * 
 * Demonstrates different variations of timeline components used to represent
 * chronological sequences, workflows, and historical events.
 */
'use client';

import React, { useState } from 'react';
import Timeline, { TimelineItem } from './Timeline';

// Mock data for the timeline examples
const historyEvents: TimelineItem[] = [
  {
    id: 1,
    title: 'World Wide Web Created',
    date: '1989',
    content: 'Tim Berners-Lee invents the World Wide Web while at CERN.',
    status: 'default',
  },
  {
    id: 2,
    title: 'First Web Browser',
    date: '1990',
    content: 'The first web browser, WorldWideWeb (later renamed Nexus), is developed.',
    status: 'default',
  },
  {
    id: 3,
    title: 'JavaScript Released',
    date: '1995',
    content: 'Netscape introduces JavaScript, revolutionizing web interactivity.',
    status: 'info',
  },
  {
    id: 4,
    title: 'CSS Introduced',
    date: '1996',
    content: 'Cascading Style Sheets (CSS) becomes a W3C recommendation.',
    status: 'default',
  },
  {
    id: 5,
    title: 'Modern Era Begins',
    date: '2005-2010',
    content: 'AJAX, jQuery, and modern JavaScript frameworks emerge.',
    status: 'success',
  },
  {
    id: 6,
    title: 'Present Day',
    date: '2023',
    content: 'Modern frameworks like React, Vue, and Angular dominate frontend development.',
    status: 'current',
  },
];

const projectStages: TimelineItem[] = [
  {
    id: 'planning',
    title: 'Planning Phase',
    content: 'Project scope definition and resource allocation',
    status: 'success',
    icon: <span className="text-xs">✓</span>,
    date: 'Week 1',
  },
  {
    id: 'design',
    title: 'Design Phase',
    content: 'UI/UX design and prototyping',
    status: 'success',
    icon: <span className="text-xs">✓</span>,
    date: 'Week 2-3',
  },
  {
    id: 'development',
    title: 'Development',
    content: 'Frontend and backend implementation',
    status: 'current',
    icon: <span className="text-xs">⚙</span>,
    date: 'Week 4-7',
  },
  {
    id: 'testing',
    title: 'Testing',
    content: 'QA and user acceptance testing',
    status: 'default',
    date: 'Week 8-9',
  },
  {
    id: 'deployment',
    title: 'Deployment',
    content: 'Release to production',
    status: 'default',
    date: 'Week 10',
  },
];

const orderStatus: TimelineItem[] = [
  {
    id: 'order',
    title: 'Order Placed',
    date: 'May 2, 2023',
    content: 'Order #12345 has been received',
    status: 'success',
    icon: <span className="text-xs">✓</span>,
  },
  {
    id: 'payment',
    title: 'Payment Confirmed',
    date: 'May 2, 2023',
    content: 'Payment of $129.99 has been processed',
    status: 'success',
    icon: <span className="text-xs">✓</span>,
  },
  {
    id: 'processing',
    title: 'Processing Order',
    date: 'May 3, 2023',
    content: 'Your order is being prepared for shipment',
    status: 'current',
    icon: <span className="text-xs">⚙</span>,
  },
  {
    id: 'shipping',
    title: 'Shipping',
    date: 'Pending',
    content: 'Your order will be shipped soon',
    status: 'default',
  },
  {
    id: 'delivery',
    title: 'Delivery',
    date: 'Estimated: May 7-9, 2023',
    content: 'Package will be delivered to your address',
    status: 'default',
  },
];

const TimelineDemo: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<TimelineItem | null>(null);
  
  const handleItemClick = (item: TimelineItem) => {
    setSelectedItem(item);
    // In a real app, you might do something with this selection
    setTimeout(() => setSelectedItem(null), 2000);
  };
  
  return (
    <div className="space-y-12">
      <div>
        <h2 className="text-xl font-semibold mb-4">Timeline</h2>
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          A timeline is a visual representation of a sequence of events or milestones arranged chronologically.
          Timelines are used to display historical events, project phases, order tracking, and any process
          that follows a sequential order.
        </p>
        
        <div className="space-y-10">
          {/* Basic Vertical Timeline */}
          <div>
            <h3 className="text-lg font-medium mb-3">Vertical Timeline</h3>
            <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
              <Timeline 
                items={historyEvents}
                orientation="vertical"
                showConnectors={true}
              />
            </div>
          </div>
          
          {/* Alternate Vertical Timeline */}
          <div>
            <h3 className="text-lg font-medium mb-3">Alternate Vertical Timeline</h3>
            <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
              <Timeline 
                items={projectStages}
                orientation="vertical"
                alternate={true}
                position="alternate"
              />
            </div>
          </div>
          
          {/* Horizontal Timeline */}
          <div>
            <h3 className="text-lg font-medium mb-3">Horizontal Timeline</h3>
            <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
              <Timeline 
                items={orderStatus}
                orientation="horizontal"
              />
            </div>
          </div>
          
          {/* Timeline Sizes */}
          <div>
            <h3 className="text-lg font-medium mb-3">Timeline Sizes</h3>
            <div className="space-y-8 p-6 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
              <div>
                <h4 className="text-md font-medium mb-3">Small</h4>
                <Timeline 
                  items={orderStatus.slice(0, 3)}
                  orientation="vertical"
                  size="small"
                />
              </div>
              
              <div>
                <h4 className="text-md font-medium mb-3">Medium (Default)</h4>
                <Timeline 
                  items={orderStatus.slice(0, 3)}
                  orientation="vertical"
                  size="medium"
                />
              </div>
              
              <div>
                <h4 className="text-md font-medium mb-3">Large</h4>
                <Timeline 
                  items={orderStatus.slice(0, 3)}
                  orientation="vertical"
                  size="large"
                />
              </div>
            </div>
          </div>
          
          {/* Interactive Timeline */}
          <div>
            <h3 className="text-lg font-medium mb-3">Interactive Timeline</h3>
            <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
              <div className="mb-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Click on a timeline item to select it
                </p>
                {selectedItem && (
                  <div className="mt-2 p-2 bg-blue-50 dark:bg-blue-900/20 rounded">
                    <p className="text-sm font-medium">Selected: {selectedItem.title}</p>
                  </div>
                )}
              </div>
              
              <Timeline 
                items={projectStages}
                orientation="horizontal"
                onItemClick={handleItemClick}
              />
            </div>
          </div>
          
          {/* Right-aligned Timeline */}
          <div>
            <h3 className="text-lg font-medium mb-3">Right-aligned Timeline</h3>
            <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
              <Timeline 
                items={historyEvents.slice(0, 4)}
                orientation="vertical"
                position="right"
              />
            </div>
          </div>
          
          {/* Scrollable Horizontal Timeline */}
          <div>
            <h3 className="text-lg font-medium mb-3">Scrollable Horizontal Timeline</h3>
            <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
              <Timeline 
                items={[...historyEvents, ...historyEvents.slice(0, 2)]}
                orientation="horizontal"
                scrollable={true}
              />
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-3">Common Use Cases</h3>
        <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
          <li>Displaying historical events or chronologies</li>
          <li>Visualizing project phases and progress</li>
          <li>Tracking order or delivery status</li>
          <li>Showing steps in a multi-stage process</li>
          <li>Illustrating user journeys or workflows</li>
          <li>Presenting milestone achievements in product development</li>
        </ul>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-3">Technical Details</h3>
        <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <dt className="font-medium text-gray-900 dark:text-white">Alternative Names</dt>
            <dd className="mt-1 text-gray-700 dark:text-gray-300">Chronology, History Line, Process Flow, Time-Series</dd>
          </div>
          <div>
            <dt className="font-medium text-gray-900 dark:text-white">Related Components</dt>
            <dd className="mt-1 text-gray-700 dark:text-gray-300">Stepper, Progress Indicator, Process Flow, Activity Feed</dd>
          </div>
          <div>
            <dt className="font-medium text-gray-900 dark:text-white">Implementation</dt>
            <dd className="mt-1 text-gray-700 dark:text-gray-300">Uses React with TypeScript and Tailwind CSS for styling</dd>
          </div>
          <div>
            <dt className="font-medium text-gray-900 dark:text-white">Accessibility</dt>
            <dd className="mt-1 text-gray-700 dark:text-gray-300">Semantic HTML structure with proper keyboard navigation support</dd>
          </div>
        </dl>
      </div>
    </div>
  );
};

export default TimelineDemo;
