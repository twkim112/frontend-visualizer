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

export default CardFlip;
