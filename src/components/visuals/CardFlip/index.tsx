/**
 * Card Flip Animation Component
 * 
 * A 3D animation effect where a card rotates to reveal content on its reverse side,
 * creating the illusion of flipping a physical card.
 */
'use client';

import React, { useState } from 'react';

interface CardFlipProps {
  /** Content for the front side of the card */
  front: React.ReactNode;
  /** Content for the back side of the card */
  back: React.ReactNode;
  /** Width of the card */
  width?: string;
  /** Height of the card */
  height?: string;
  /** Whether to flip on click instead of hover */
  flipOnClick?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Control flip state externally (optional) */
  isFlipped?: boolean;
  /** Handler for when the card flips (optional) */
  onFlip?: (flipped: boolean) => void;
}

/**
 * CardFlip - A 3D card flip animation component
 * 
 * This component creates a 3D flip effect between two sides of content.
 * The flip can be triggered by hover or click, and utilizes CSS 3D transforms
 * to create a realistic flipping animation.
 * 
 * Common uses include revealing additional information, creating interactive cards,
 * and providing visual interest to otherwise static content.
 */
const CardFlip: React.FC<CardFlipProps> = ({
  front,
  back,
  width = '300px',
  height = '200px',
  flipOnClick = false,
  className = '',
  isFlipped: controlledIsFlipped,
  onFlip,
}) => {
  // Internal flip state when not controlled externally
  const [internalIsFlipped, setInternalIsFlipped] = useState(false);
  
  // Use controlled state if provided, otherwise use internal state
  const isFlipped = controlledIsFlipped !== undefined ? controlledIsFlipped : internalIsFlipped;

  // Handle flip toggle
  const handleFlip = () => {
    if (flipOnClick) {
      const newFlippedState = !isFlipped;
      if (controlledIsFlipped === undefined) {
        setInternalIsFlipped(newFlippedState);
      }
      onFlip?.(newFlippedState);
    }
  };

  // Handle mouse enter/leave for hover effect
  const handleMouseEnter = () => {
    if (!flipOnClick && controlledIsFlipped === undefined) {
      setInternalIsFlipped(true);
      onFlip?.(true);
    }
  };

  const handleMouseLeave = () => {
    if (!flipOnClick && controlledIsFlipped === undefined) {
      setInternalIsFlipped(false);
      onFlip?.(false);
    }
  };

  return (
    <div 
      className={`card-flip-container ${className}`}
      style={{
        width,
        height,
        perspective: '1000px', // Add perspective to create 3D space
        cursor: flipOnClick ? 'pointer' : 'default',
      }}
      onClick={handleFlip}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div 
        className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}
        style={{
          transformStyle: 'preserve-3d',
          transition: 'transform 0.7s',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* Front of card */}
        <div 
          className="absolute w-full h-full backface-hidden"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            position: 'absolute',
            width: '100%',
            height: '100%',
          }}
        >
          {front}
        </div>
        
        {/* Back of card */}
        <div 
          className="absolute w-full h-full backface-hidden rotate-y-180"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            position: 'absolute',
            width: '100%',
            height: '100%',
          }}
        >
          {back}
        </div>
      </div>
    </div>
  );
};

/**
 * CardFlip Demo Component
 * 
 * This component demonstrates the card flip animation effect with various examples.
 */
export default function CardFlipDemo() {
  const [isFlipped, setIsFlipped] = useState(false);
  
  return (
    <div className="space-y-8">
      {/* Main interactive example */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Interactive Card Flip</h3>
          <button
            onClick={() => setIsFlipped(!isFlipped)}
            className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
          >
            {isFlipped ? 'Show Front' : 'Show Back'}
          </button>
        </div>
        
        <CardFlip
          isFlipped={isFlipped}
          onFlip={setIsFlipped}
          width="100%"
          height="220px"
          flipOnClick={true}
          front={
            <div className="w-full h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center p-6 text-white">
              <div className="text-center">
                <h3 className="text-xl font-bold mb-2">Front Side</h3>
                <p>Click on the card or use the button above to flip it</p>
              </div>
            </div>
          }
          back={
            <div className="w-full h-full bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center p-6 text-white">
              <div className="text-center">
                <h3 className="text-xl font-bold mb-2">Back Side</h3>
                <p>This is the reverse side of the card</p>
              </div>
            </div>
          }
        />
      </div>
      
      {/* Different interaction examples */}
      <div>
        <h3 className="text-lg font-medium mb-4">Interaction Methods</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Hover Flip */}
          <div className="space-y-2">
            <h4 className="text-base font-medium">Hover to Flip</h4>
            <CardFlip
              width="100%"
              height="180px"
              front={
                <div className="w-full h-full bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center p-4 border border-blue-200 dark:border-blue-800">
                  <div className="text-center">
                    <p className="font-medium">Hover over me</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">The card will flip on hover</p>
                  </div>
                </div>
              }
              back={
                <div className="w-full h-full bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center p-4 border border-green-200 dark:border-green-800">
                  <p className="text-center font-medium">Back side revealed on hover</p>
                </div>
              }
            />
          </div>
          
          {/* Click Flip */}
          <div className="space-y-2">
            <h4 className="text-base font-medium">Click to Flip</h4>
            <CardFlip
              width="100%"
              height="180px"
              flipOnClick={true}
              front={
                <div className="w-full h-full bg-amber-100 dark:bg-amber-900/20 rounded-lg flex items-center justify-center p-4 border border-amber-200 dark:border-amber-800">
                  <div className="text-center">
                    <p className="font-medium">Click me</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">The card will flip on click</p>
                  </div>
                </div>
              }
              back={
                <div className="w-full h-full bg-red-100 dark:bg-red-900/20 rounded-lg flex items-center justify-center p-4 border border-red-200 dark:border-red-800">
                  <p className="text-center font-medium">Click again to flip back</p>
                </div>
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
