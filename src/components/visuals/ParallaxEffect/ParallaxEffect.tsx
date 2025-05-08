/**
 * Parallax Effect Component
 * 
 * A component that creates an illusion of depth by moving multiple layers at different speeds during scrolling.
 * This technique creates a sense of immersion and visual interest in the interface.
 */
'use client';

import React, { useRef, useState, useEffect } from 'react';

export interface ParallaxEffectProps {
  backgroundImage: string;
  midgroundImage?: string;
  foregroundImage?: string;
  children?: React.ReactNode;
  height?: string;
  className?: string;
}

const ParallaxEffect: React.FC<ParallaxEffectProps> = ({
  backgroundImage,
  midgroundImage,
  foregroundImage,
  children,
  height = '500px',
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  
  // Calculate how far the element is from the top of the viewport
  const getScrollPosition = () => {
    if (!containerRef.current) return 0;
    
    const rect = containerRef.current.getBoundingClientRect();
    // Value is between -1 (element is below viewport) and 1 (element is above viewport)
    // 0 means the element is centered in viewport
    return rect.top / window.innerHeight;
  };
  
  // Update scroll position on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(getScrollPosition());
    };
    
    // Set initial position
    handleScroll();
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Calculate parallax offsets for each layer
  const backgroundOffset = scrollPosition * 20; // Slowest moving
  const midgroundOffset = scrollPosition * 40; // Medium speed
  const foregroundOffset = scrollPosition * 70; // Fastest moving
  
  return (
    <div 
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      style={{ height }}
    >
      {/* Background layer (slowest) */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{ 
          backgroundImage: `url(${backgroundImage})`,
          transform: `translateY(${backgroundOffset}px)`,
        }}
      />
      
      {/* Midground layer (medium speed) - Optional */}
      {midgroundImage && (
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{ 
            backgroundImage: `url(${midgroundImage})`,
            transform: `translateY(${midgroundOffset}px)`,
          }}
        />
      )}
      
      {/* Foreground layer (fastest) - Optional */}
      {foregroundImage && (
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{ 
            backgroundImage: `url(${foregroundImage})`,
            transform: `translateY(${foregroundOffset}px)`,
          }}
        />
      )}
      
      {/* Content layer */}
      <div className="absolute inset-0 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
};

export default ParallaxEffect;
