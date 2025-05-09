/**
 * Parallax Effect Component Index
 * 
 * Demonstrates the parallax scrolling effect that creates depth and immersion
 */
'use client';

import React, { useState, useEffect, useRef } from 'react';
import ParallaxEffect, { ParallaxEffectProps } from './ParallaxEffect';

// Interactive version of the parallax effect that responds to mouse movement
interface InteractiveParallaxDemoProps {
  backgroundImage: string;
  midgroundImage?: string;
  foregroundImage?: string;
}

const InteractiveParallaxDemo: React.FC<InteractiveParallaxDemoProps> = ({
  backgroundImage,
  midgroundImage,
  foregroundImage
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Smooth mouse tracking with requestAnimationFrame
  const requestRef = useRef<number>();
  const targetPositionRef = useRef({ x: 0, y: 0 });
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    // Calculate position as percentage (-0.5 to 0.5) centered around the middle
    const x = ((e.clientX - left) / width - 0.5);
    const y = ((e.clientY - top) / height - 0.5);
    
    targetPositionRef.current = { x, y };
  };
  
  // Handle touch events for mobile
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!containerRef.current || !e.touches[0]) return;
    
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = ((e.touches[0].clientX - left) / width - 0.5);
    const y = ((e.touches[0].clientY - top) / height - 0.5);
    
    targetPositionRef.current = { x, y };
  };
  
  // Animation loop for smooth movement
  const animate = (time: number) => {
    // Smooth interpolation toward target position (easing factor of 0.08 for gentle movement)
    setMousePosition(prev => ({
      x: prev.x + (targetPositionRef.current.x - prev.x) * 0.08,
      y: prev.y + (targetPositionRef.current.y - prev.y) * 0.08
    }));
    
    requestRef.current = requestAnimationFrame(animate);
  };
  
  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);
  
  return (
    <div 
      ref={containerRef}
      className="h-64 sm:h-80 relative overflow-hidden rounded-lg shadow-lg cursor-pointer"
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
    >
      {/* Background layer (slowest) */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center will-change-transform"
        style={{ 
          backgroundImage: `url(${backgroundImage})`,
          transform: `translate(${mousePosition.x * -5}px, ${mousePosition.y * -5}px) scale(1.05)`,
          transition: 'transform 0.1s ease-out',
        }}
      />
      
      {/* Midground layer (medium speed) - Optional */}
      {midgroundImage && (
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center will-change-transform"
          style={{ 
            backgroundImage: `url(${midgroundImage})`,
            transform: `translate(${mousePosition.x * -10}px, ${mousePosition.y * -10}px) scale(1.05)`,
            transition: 'transform 0.1s ease-out',
          }}
        />
      )}
      
      {/* Foreground layer (fastest) - Optional */}
      {foregroundImage && (
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center will-change-transform"
          style={{ 
            backgroundImage: `url(${foregroundImage})`,
            transform: `translate(${mousePosition.x * -15}px, ${mousePosition.y * -15}px) scale(1.05)`,
            transition: 'transform 0.1s ease-out',
          }}
        />
      )}
      
      {/* Content layer */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center p-6 bg-black/30 backdrop-blur-sm rounded-lg text-white max-w-md">
          <h3 className="text-2xl font-bold mb-2">Interactive Parallax</h3>
          <p>Move your mouse or finger across this area to see the parallax effect</p>
        </div>
      </div>
    </div>
  );
};

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
        
        {/* Interactive demo with manual control */}
        <div className="p-4 mb-8 bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 rounded-lg">
          <p className="text-blue-800 dark:text-blue-200 font-medium">
            Move your mouse/finger across the parallax demo to see the layers move at different speeds.
          </p>
        </div>
        
        {/* Interactive Parallax Demo with hover/drag effect */}
        <div className="mb-8">
          <InteractiveParallaxDemo 
            backgroundImage={mountainsBackground}
            midgroundImage={cloudsMidground}
            foregroundImage={treeForeground}
          />
        </div>
        
        {/* Static examples */}
        <h3 className="text-lg font-medium mb-4">Scrolling Parallax Examples</h3>
        <div className="h-96 overflow-y-auto mb-8 border border-gray-200 dark:border-gray-700 rounded-lg">
          <div className="h-[1000px] pt-4 relative">
            {/* First parallax section */}
            <div className="sticky top-4 mb-8">
              <ParallaxEffect 
                backgroundImage={mountainsBackground}
                height="300px"
                className="rounded-lg shadow-lg"
              >
                <div className="text-center p-6 bg-black/30 backdrop-blur-sm rounded-lg text-white">
                  <h3 className="text-2xl font-bold mb-2">Single Layer Parallax</h3>
                  <p>Background moves at a different speed than the page</p>
                </div>
              </ParallaxEffect>
            </div>
            
            {/* Second parallax section with multiple layers */}
            <div className="sticky top-72 mb-8">
              <ParallaxEffect 
                backgroundImage={mountainsBackground}
                midgroundImage={cloudsMidground}
                foregroundImage={treeForeground}
                height="300px"
                className="rounded-lg shadow-lg"
              >
                <div className="text-center p-6 bg-black/30 backdrop-blur-sm rounded-lg text-white">
                  <h3 className="text-2xl font-bold mb-2">Multi-Layer Parallax</h3>
                  <p>Multiple layers moving at different speeds</p>
                </div>
              </ParallaxEffect>
            </div>
          </div>
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
