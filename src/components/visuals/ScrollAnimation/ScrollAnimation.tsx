/**
 * ScrollAnimation Component
 * 
 * A component that triggers animations as elements enter the viewport during scrolling.
 * Demonstrates common scroll-triggered animation patterns used in modern web design.
 */
'use client';

import React, { useRef, useState, useEffect } from 'react';

export interface ScrollAnimationProps {
  children: React.ReactNode;
  animationType?: 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'zoom-in' | 'zoom-out';
  delay?: number;
  duration?: number;
  threshold?: number; // 0-1, percentage of element visible before triggering
  className?: string;
}

const ScrollAnimation: React.FC<ScrollAnimationProps> = ({
  children,
  animationType = 'fade-up',
  delay = 0,
  duration = 600,
  threshold = 0.2,
  className = '',
}) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  // Define animation properties based on type
  const getAnimationStyles = () => {
    const baseStyles = {
      opacity: 0,
      transform: 'none',
      transition: `opacity ${duration}ms ease, transform ${duration}ms ease`,
      transitionDelay: `${delay}ms`,
    };
    
    // Animation starting styles
    if (!isVisible) {
      switch (animationType) {
        case 'fade-up':
          return { ...baseStyles, transform: 'translateY(30px)' };
        case 'fade-down':
          return { ...baseStyles, transform: 'translateY(-30px)' };
        case 'fade-left':
          return { ...baseStyles, transform: 'translateX(30px)' };
        case 'fade-right':
          return { ...baseStyles, transform: 'translateX(-30px)' };
        case 'zoom-in':
          return { ...baseStyles, transform: 'scale(0.9)' };
        case 'zoom-out':
          return { ...baseStyles, transform: 'scale(1.1)' };
        default:
          return baseStyles;
      }
    }
    
    // Animation end styles (when visible)
    return {
      opacity: 1,
      transform: 'none',
      transition: `opacity ${duration}ms ease, transform ${duration}ms ease`,
      transitionDelay: `${delay}ms`,
    };
  };
  
  useEffect(() => {
    // Create IntersectionObserver to detect when element enters viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target); // Stop observing once visible
          }
        });
      },
      {
        root: null, // Use viewport as root
        rootMargin: '0px',
        threshold, // Trigger when threshold % of element is visible
      }
    );
    
    if (elementRef.current) {
      observer.observe(elementRef.current);
    }
    
    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [threshold]);
  
  return (
    <div
      ref={elementRef}
      style={getAnimationStyles()}
      className={className}
    >
      {children}
    </div>
  );
};

export default ScrollAnimation;
