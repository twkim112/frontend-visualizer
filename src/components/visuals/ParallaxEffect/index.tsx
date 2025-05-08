/**
 * Parallax Effect Component Index
 * 
 * Demonstrates the parallax scrolling effect that creates depth and immersion
 */
'use client';

import React from 'react';
import ParallaxEffect, { ParallaxEffectProps } from './ParallaxEffect';

const ParallaxEffectDemo: React.FC = () => {
  // Sample image URLs - in a real implementation, these would be local images
  const mountainsBackground = "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80";
  const cloudsMidground = "https://images.unsplash.com/photo-1534088568595-a066f410bcda?auto=format&fit=crop&w=1200&q=80&opacity=0.6";
  const treeForeground = "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1200&q=80&opacity=0.8";
  
  return (
    <div className="space-y-12">
      <div>
        <h2 className="text-xl font-semibold mb-4">Parallax Scrolling Effect</h2>
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          Creates an illusion of depth by moving background and foreground layers at different speeds during scrolling.
          This technique adds a sense of immersion and interactivity to the user interface.
        </p>
        
        {/* Demo instructions */}
        <div className="p-4 mb-8 bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 rounded-lg">
          <p className="text-blue-800 dark:text-blue-200 font-medium">
            Scroll up and down to see the parallax effect in action. Notice how different layers move at different speeds.
          </p>
        </div>
        
        <div className="h-[700px] flex flex-col space-y-8">
          {/* First parallax section */}
          <ParallaxEffect 
            backgroundImage={mountainsBackground}
            height="400px"
            className="rounded-lg shadow-lg"
          >
            <div className="text-center p-6 bg-black/30 backdrop-blur-sm rounded-lg text-white">
              <h3 className="text-3xl font-bold mb-2">Single Layer Parallax</h3>
              <p className="text-lg">Background moves at a different speed than the page</p>
            </div>
          </ParallaxEffect>
          
          {/* Second parallax section with multiple layers */}
          <ParallaxEffect 
            backgroundImage={mountainsBackground}
            midgroundImage={cloudsMidground}
            foregroundImage={treeForeground}
            height="400px"
            className="rounded-lg shadow-lg"
          >
            <div className="text-center p-6 bg-black/30 backdrop-blur-sm rounded-lg text-white">
              <h3 className="text-3xl font-bold mb-2">Multi-Layer Parallax</h3>
              <p className="text-lg">Multiple layers moving at different speeds</p>
            </div>
          </ParallaxEffect>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-3">Common Use Cases</h3>
        <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
          <li>Hero sections on websites to create a captivating introduction</li>
          <li>Storytelling and narrative websites to increase immersion</li>
          <li>Product showcases to add visual interest and depth</li>
          <li>Landing pages to make a memorable impression</li>
          <li>Digital portfolios to showcase creativity</li>
        </ul>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-3">Technical Details</h3>
        <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <dt className="font-medium text-gray-900 dark:text-white">Alternative Names</dt>
            <dd className="mt-1 text-gray-700 dark:text-gray-300">Parallax Effect, Multi-layer Scrolling, Depth Scrolling</dd>
          </div>
          <div>
            <dt className="font-medium text-gray-900 dark:text-white">Implementation</dt>
            <dd className="mt-1 text-gray-700 dark:text-gray-300">Uses window scroll events and CSS transforms</dd>
          </div>
          <div>
            <dt className="font-medium text-gray-900 dark:text-white">Performance Considerations</dt>
            <dd className="mt-1 text-gray-700 dark:text-gray-300">Can impact performance if many layers or complex graphics are used</dd>
          </div>
          <div>
            <dt className="font-medium text-gray-900 dark:text-white">Accessibility Note</dt>
            <dd className="mt-1 text-gray-700 dark:text-gray-300">Should respect user reduced motion preferences</dd>
          </div>
        </dl>
      </div>
    </div>
  );
};

export default ParallaxEffectDemo;
