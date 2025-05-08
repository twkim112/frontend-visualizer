/**
 * ScrollAnimation Component Index
 * 
 * Demonstrates different scroll-triggered animation patterns and effects
 */
'use client';

import React from 'react';
import ScrollAnimation, { ScrollAnimationProps } from './ScrollAnimation';

const ScrollAnimationDemo: React.FC = () => {
  return (
    <div className="space-y-12">
      <div>
        <h2 className="text-xl font-semibold mb-4">Scroll-Triggered Animations</h2>
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          Animations that are triggered as elements enter the viewport during scrolling.
          These effects enhance user engagement by creating a dynamic, responsive feeling interface that reacts to user scrolling behavior.
        </p>
        
        {/* Demo instructions */}
        <div className="p-4 mb-8 bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 rounded-lg">
          <p className="text-blue-800 dark:text-blue-200 font-medium">Scroll down to see the animations in action</p>
        </div>
        
        <div className="h-[300px] overflow-y-auto border border-gray-200 dark:border-gray-700 rounded-lg p-4 relative">
          <div className="h-[200px] flex items-center justify-center">
            <p className="text-gray-400">↓ Scroll down to see animations ↓</p>
          </div>

          {/* Different animation types with 100px spacers between them */}
          <ScrollAnimation animationType="fade-up" className="p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg mb-6">
            <h3 className="font-medium text-lg mb-2">Fade Up Animation</h3>
            <p className="text-gray-600 dark:text-gray-300">Elements fade in and move upward as they enter the viewport.</p>
          </ScrollAnimation>
          
          <div className="h-[100px]"></div>
          
          <ScrollAnimation animationType="fade-down" className="p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg mb-6">
            <h3 className="font-medium text-lg mb-2">Fade Down Animation</h3>
            <p className="text-gray-600 dark:text-gray-300">Elements fade in and move downward as they enter the viewport.</p>
          </ScrollAnimation>
          
          <div className="h-[100px]"></div>
          
          <ScrollAnimation animationType="fade-left" className="p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg mb-6">
            <h3 className="font-medium text-lg mb-2">Fade Left Animation</h3>
            <p className="text-gray-600 dark:text-gray-300">Elements fade in and move from right to left as they enter the viewport.</p>
          </ScrollAnimation>
          
          <div className="h-[100px]"></div>
          
          <ScrollAnimation animationType="fade-right" className="p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg mb-6">
            <h3 className="font-medium text-lg mb-2">Fade Right Animation</h3>
            <p className="text-gray-600 dark:text-gray-300">Elements fade in and move from left to right as they enter the viewport.</p>
          </ScrollAnimation>
          
          <div className="h-[100px]"></div>
          
          <ScrollAnimation animationType="zoom-in" className="p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg mb-6">
            <h3 className="font-medium text-lg mb-2">Zoom In Animation</h3>
            <p className="text-gray-600 dark:text-gray-300">Elements fade in and scale up as they enter the viewport.</p>
          </ScrollAnimation>
          
          <div className="h-[100px]"></div>
          
          <ScrollAnimation animationType="zoom-out" className="p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg mb-6">
            <h3 className="font-medium text-lg mb-2">Zoom Out Animation</h3>
            <p className="text-gray-600 dark:text-gray-300">Elements fade in and scale down as they enter the viewport.</p>
          </ScrollAnimation>
          
          <div className="h-[100px]"></div>
          
          <ScrollAnimation 
            animationType="fade-up" 
            delay={300} 
            duration={800}
            className="p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg"
          >
            <h3 className="font-medium text-lg mb-2">Customized Animation</h3>
            <p className="text-gray-600 dark:text-gray-300">
              This element uses a 300ms delay and 800ms duration for a slower entrance effect.
            </p>
          </ScrollAnimation>
          
          <div className="h-[100px]"></div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-3">Common Use Cases</h3>
        <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
          <li>Long-form content pages to maintain user engagement</li>
          <li>Landing pages to create a dynamic, interactive feel</li>
          <li>Portfolios and showcases to gradually reveal content</li>
          <li>Product pages to highlight features sequentially</li>
          <li>Storytelling and narrative websites</li>
        </ul>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-3">Technical Details</h3>
        <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <dt className="font-medium text-gray-900 dark:text-white">Alternative Names</dt>
            <dd className="mt-1 text-gray-700 dark:text-gray-300">On-Scroll Animations, Scrollmation, Reveal on Scroll</dd>
          </div>
          <div>
            <dt className="font-medium text-gray-900 dark:text-white">Implementation</dt>
            <dd className="mt-1 text-gray-700 dark:text-gray-300">Uses Intersection Observer API and CSS transitions</dd>
          </div>
          <div>
            <dt className="font-medium text-gray-900 dark:text-white">Browser Support</dt>
            <dd className="mt-1 text-gray-700 dark:text-gray-300">Modern browsers with Intersection Observer support</dd>
          </div>
          <div>
            <dt className="font-medium text-gray-900 dark:text-white">Performance Considerations</dt>
            <dd className="mt-1 text-gray-700 dark:text-gray-300">Minimal impact on performance compared to scroll event listeners</dd>
          </div>
        </dl>
      </div>
    </div>
  );
};

export default ScrollAnimationDemo;
