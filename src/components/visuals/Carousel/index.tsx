'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';

// Types for the Carousel component
interface CarouselProps {
  slides: React.ReactNode[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showArrows?: boolean;
  showDots?: boolean;
  infinite?: boolean;
  transitionDuration?: number;
  className?: string;
  slideClassName?: string;
  arrowClassName?: string;
  dotClassName?: string;
  initialSlide?: number;
  onChange?: (currentIndex: number) => void;
}

// Animation timing constants
const TRANSITION_DURATION_DEFAULT_MS = 300;
const AUTO_PLAY_INTERVAL_DEFAULT_MS = 5000;

/**
 * Carousel Component
 * 
 * A slideshow component for cycling through elements, images or slides of content.
 * 
 * @param slides - Array of React nodes to display as slides
 * @param autoPlay - Whether the carousel automatically advances to the next slide
 * @param autoPlayInterval - Time in milliseconds between slide transitions when autoPlay is true
 * @param showArrows - Whether to show navigation arrows
 * @param showDots - Whether to show navigation dots
 * @param infinite - Whether the carousel should loop infinitely
 * @param transitionDuration - Duration of the slide transition animation in milliseconds
 * @param className - Additional CSS class for the carousel container
 * @param slideClassName - Additional CSS class for each slide
 * @param arrowClassName - Additional CSS class for the navigation arrows
 * @param dotClassName - Additional CSS class for the navigation dots
 * @param initialSlide - Index of the slide to show initially
 * @param onChange - Callback function that runs when the active slide changes
 */
const Carousel: React.FC<CarouselProps> = ({
  slides,
  autoPlay = false,
  autoPlayInterval = AUTO_PLAY_INTERVAL_DEFAULT_MS,
  showArrows = true,
  showDots = true,
  infinite = true,
  transitionDuration = TRANSITION_DURATION_DEFAULT_MS,
  className = '',
  slideClassName = '',
  arrowClassName = '',
  dotClassName = '',
  initialSlide = 0,
  onChange,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialSlide);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  
  // Total number of slides
  const totalSlides = slides.length;
  
  // Go to a specific slide
  const goToSlide = useCallback((index: number) => {
    // Don't proceed if currently transitioning
    if (isTransitioning) return;
    
    // Handle boundaries
    let newIndex = index;
    
    if (!infinite) {
      // Clamp index to valid range if not infinite
      newIndex = Math.max(0, Math.min(index, totalSlides - 1));
    } else {
      // Wrap around if infinite
      if (index < 0) {
        newIndex = totalSlides - 1;
      } else if (index >= totalSlides) {
        newIndex = 0;
      }
    }
    
    // Only update if actually changing slides
    if (newIndex !== currentIndex) {
      setIsTransitioning(true);
      setCurrentIndex(newIndex);
      onChange?.(newIndex);
      
      // Reset transitioning state after animation completes
      setTimeout(() => {
        setIsTransitioning(false);
      }, transitionDuration);
    }
  }, [currentIndex, infinite, isTransitioning, onChange, totalSlides, transitionDuration]);
  
  // Go to the next slide
  const nextSlide = useCallback(() => {
    if (!infinite && currentIndex === totalSlides - 1) return;
    goToSlide(currentIndex + 1);
  }, [currentIndex, goToSlide, infinite, totalSlides]);
  
  // Go to the previous slide
  const prevSlide = useCallback(() => {
    if (!infinite && currentIndex === 0) return;
    goToSlide(currentIndex - 1);
  }, [currentIndex, goToSlide, infinite]);
  
  // Set up autoplay
  useEffect(() => {
    if (autoPlay && !isPaused) {
      intervalRef.current = setInterval(() => {
        nextSlide();
      }, autoPlayInterval);
    }
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [autoPlay, autoPlayInterval, isPaused, nextSlide]);
  
  // Handle touch events for swipe functionality
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
    setIsPaused(true); // Pause autoplay while touching
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.touches[0].clientX);
  };
  
  const handleTouchEnd = () => {
    setIsPaused(false); // Resume autoplay
    
    // Minimum distance required to register as a swipe
    const SWIPE_THRESHOLD = 50;
    
    if (touchStartX - touchEndX > SWIPE_THRESHOLD) {
      // Swipe left, go to next slide
      nextSlide();
    } else if (touchEndX - touchStartX > SWIPE_THRESHOLD) {
      // Swipe right, go to previous slide
      prevSlide();
    }
  };
  
  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (document.activeElement === carouselRef.current) {
        switch (e.key) {
          case 'ArrowLeft':
            e.preventDefault();
            prevSlide();
            break;
          case 'ArrowRight':
            e.preventDefault();
            nextSlide();
            break;
        }
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [nextSlide, prevSlide]);
  
  // Pause autoplay when hovering over carousel
  const handleMouseEnter = () => {
    setIsPaused(true);
  };
  
  const handleMouseLeave = () => {
    setIsPaused(false);
  };
  
  // Stop transition animation when window is not visible
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsPaused(true);
      } else {
        setIsPaused(false);
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);
  
  // Render the carousel
  return (
    <div 
      className={`relative overflow-hidden ${className}`}
      ref={carouselRef}
      tabIndex={0}
      aria-roledescription="carousel"
      aria-label="Image carousel"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slides */}
      <div 
        className="flex transition-transform ease-in-out"
        style={{ 
          transform: `translateX(-${currentIndex * 100}%)`,
          transitionDuration: `${transitionDuration}ms`,
        }}
        aria-live="polite"
      >
        {slides.map((slide, index) => (
          <div 
            key={index}
            className={`flex-shrink-0 flex-grow-0 w-full ${slideClassName}`}
            aria-hidden={index !== currentIndex}
            role="group"
            aria-roledescription="slide"
            aria-label={`Slide ${index + 1} of ${totalSlides}`}
          >
            {slide}
          </div>
        ))}
      </div>
      
      {/* Navigation Arrows */}
      {showArrows && (
        <>
          <button
            className={`absolute left-2 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 rounded-full p-2 shadow-md z-10 focus:outline-none focus:ring-2 focus:ring-blue-500 ${!infinite && currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'opacity-80 hover:opacity-100'} ${arrowClassName}`}
            onClick={prevSlide}
            disabled={!infinite && currentIndex === 0}
            aria-label="Previous slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            className={`absolute right-2 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 rounded-full p-2 shadow-md z-10 focus:outline-none focus:ring-2 focus:ring-blue-500 ${!infinite && currentIndex === totalSlides - 1 ? 'opacity-50 cursor-not-allowed' : 'opacity-80 hover:opacity-100'} ${arrowClassName}`}
            onClick={nextSlide}
            disabled={!infinite && currentIndex === totalSlides - 1}
            aria-label="Next slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}
      
      {/* Navigation Dots */}
      {showDots && totalSlides > 1 && (
        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${index === currentIndex ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400'} ${dotClassName}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === currentIndex ? 'true' : 'false'}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// Example component to showcase the Carousel
const CarouselExample: React.FC = () => {
  // Sample images for the demo
  const sampleImages = [
    '/placeholder1.jpg',
    '/placeholder2.jpg',
    '/placeholder3.jpg',
    '/placeholder4.jpg',
  ];
  
  // Placeholder slide if images aren't available
  const placeholderSlides = [
    { bg: 'bg-blue-300', title: 'First Slide', subtitle: 'This is a carousel slide' },
    { bg: 'bg-green-300', title: 'Second Slide', subtitle: 'Swipe or use arrows to navigate' },
    { bg: 'bg-yellow-300', title: 'Third Slide', subtitle: 'Dots can be used for direct navigation' },
    { bg: 'bg-red-300', title: 'Fourth Slide', subtitle: 'Autoplay cycles through slides automatically' },
  ];
  
  // State for carousel options
  const [autoPlay, setAutoPlay] = useState(true);
  const [autoPlayInterval, setAutoPlayInterval] = useState(5000);
  const [showArrows, setShowArrows] = useState(true);
  const [showDots, setShowDots] = useState(true);
  const [infinite, setInfinite] = useState(true);
  const [transitionDuration, setTransitionDuration] = useState(300);
  const [currentCustomSlide, setCurrentCustomSlide] = useState(0);
  
  // Create simple content slides
  const contentSlides = placeholderSlides.map((slide, index) => (
    <div
      key={index}
      className={`w-full h-64 flex flex-col items-center justify-center text-center p-6 ${slide.bg}`}
    >
      <h3 className="text-xl font-semibold mb-2">{slide.title}</h3>
      <p>{slide.subtitle}</p>
      <div className="mt-4 text-lg font-bold">Slide {index + 1}</div>
    </div>
  ));
  
  // Create image slides
  const imageSlides = sampleImages.map((image, index) => (
    <div key={index} className="w-full h-64 relative">
      <div
        className={`w-full h-full bg-gray-200 flex items-center justify-center ${placeholderSlides[index].bg}`}
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
          <div className="text-white text-center">
            <h3 className="text-xl font-semibold mb-2">{placeholderSlides[index].title}</h3>
            <p>{placeholderSlides[index].subtitle}</p>
          </div>
        </div>
      </div>
    </div>
  ));
  
  // Card-style slides for a more complex example
  const cardSlides = [
    <div key="card1" className="p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="bg-blue-500 h-32 w-full"></div>
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-2">Product Feature</h3>
          <p className="text-gray-600 dark:text-gray-300">Discover our latest features and improvements.</p>
          <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Learn More</button>
        </div>
      </div>
    </div>,
    <div key="card2" className="p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="bg-green-500 h-32 w-full"></div>
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-2">Testimonials</h3>
          <p className="text-gray-600 dark:text-gray-300">See what our customers are saying about us.</p>
          <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Read More</button>
        </div>
      </div>
    </div>,
    <div key="card3" className="p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="bg-purple-500 h-32 w-full"></div>
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-2">Special Offers</h3>
          <p className="text-gray-600 dark:text-gray-300">Limited time offers and discounts available now.</p>
          <button className="mt-4 px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600">View Offers</button>
        </div>
      </div>
    </div>,
  ];
  
  // Multi-item slides (for a row of items)
  const multiItemSlide = (
    <div className="grid grid-cols-3 gap-4 p-4">
      {[1, 2, 3].map((item) => (
        <div key={item} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <div className={`w-full h-20 mb-3 rounded ${item === 1 ? 'bg-blue-300' : item === 2 ? 'bg-pink-300' : 'bg-yellow-300'}`}></div>
          <h4 className="font-medium mb-1">Item {item}</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">Description for item {item}</p>
        </div>
      ))}
    </div>
  );
  
  // Custom slides with different content
  const customSlides = [
    contentSlides[0],
    imageSlides[1],
    cardSlides[0],
    multiItemSlide,
  ];
  
  return (
    <div className="space-y-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Carousel Demo</h2>
      
      {/* Configuration Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={autoPlay}
              onChange={(e) => setAutoPlay(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <span>Auto Play</span>
          </label>
        </div>
        
        <div>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={infinite}
              onChange={(e) => setInfinite(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <span>Infinite Loop</span>
          </label>
        </div>
        
        <div>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showArrows}
              onChange={(e) => setShowArrows(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <span>Show Arrows</span>
          </label>
        </div>
        
        <div>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showDots}
              onChange={(e) => setShowDots(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <span>Show Dots</span>
          </label>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Auto Play Interval ({autoPlayInterval}ms)</label>
          <input
            type="range"
            min={1000}
            max={10000}
            step={1000}
            value={autoPlayInterval}
            onChange={(e) => setAutoPlayInterval(parseInt(e.target.value))}
            className="w-full"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Transition Duration ({transitionDuration}ms)</label>
          <input
            type="range"
            min={100}
            max={1000}
            step={100}
            value={transitionDuration}
            onChange={(e) => setTransitionDuration(parseInt(e.target.value))}
            className="w-full"
          />
        </div>
      </div>
      
      {/* Basic Carousel */}
      <div>
        <h3 className="text-lg font-medium mb-3">Basic Example</h3>
        <Carousel
          slides={contentSlides}
          autoPlay={autoPlay}
          autoPlayInterval={autoPlayInterval}
          showArrows={showArrows}
          showDots={showDots}
          infinite={infinite}
          transitionDuration={transitionDuration}
          className="rounded-lg overflow-hidden shadow-lg"
        />
      </div>
      
      {/* Image/Card Examples */}
      <div className="pt-6 mt-6 border-t border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-medium mb-4">Common Use Cases</h3>
        
        <div className="space-y-8">
          {/* Card Carousel */}
          <div>
            <h4 className="text-md font-medium mb-2">Product Cards Carousel</h4>
            <Carousel
              slides={cardSlides}
              autoPlay={false}
              showArrows={true}
              showDots={true}
              infinite={true}
              className="rounded-lg overflow-hidden"
            />
          </div>
          
          {/* Content Showcase */}
          <div>
            <h4 className="text-md font-medium mb-2">Mixed Content Showcase</h4>
            <Carousel
              slides={customSlides}
              autoPlay={true}
              showArrows={true}
              showDots={true}
              infinite={true}
              onChange={setCurrentCustomSlide}
              className="rounded-lg overflow-hidden shadow-lg"
            />
            <div className="mt-2 text-center text-sm">
              Current slide: {currentCustomSlide + 1} of {customSlides.length}
            </div>
          </div>
        </div>
      </div>
      
      {/* Accessibility Notes */}
      <div className="pt-6 mt-6 border-t border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-medium mb-2">Accessibility Features</h3>
        <ul className="list-disc pl-5 space-y-1 text-sm">
          <li>Keyboard navigation support (use arrow keys when carousel is focused)</li>
          <li>Proper ARIA attributes for screen readers</li>
          <li>Focus management for interactive elements</li>
          <li>Pauses autoplay on hover, focus, or when tab is inactive</li>
          <li>Touch gesture support for mobile devices</li>
        </ul>
      </div>
    </div>
  );
};

export default CarouselExample;
