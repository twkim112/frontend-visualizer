/**
 * Slider Component
 * 
 * A control that allows users to select a value from a range by dragging a handle along a track.
 */
'use client';

import React, { useState, useRef, useEffect } from 'react';

export interface SliderProps {
  /** Minimum value of the slider */
  min?: number;
  /** Maximum value of the slider */
  max?: number;
  /** Current value of the slider */
  value?: number;
  /** Default value when uncontrolled */
  defaultValue?: number;
  /** Step size for value changes */
  step?: number;
  /** Whether the slider is disabled */
  disabled?: boolean;
  /** Size variant */
  size?: 'small' | 'medium' | 'large';
  /** Color of the slider track */
  trackColor?: string;
  /** Color of the slider thumb */
  thumbColor?: string;
  /** Whether to show value tooltip */
  showTooltip?: boolean;
  /** Whether to show min/max labels */
  showLabels?: boolean;
  /** Whether to show value label */
  showValue?: boolean;
  /** Additional CSS class */
  className?: string;
  /** Callback when value changes */
  onChange?: (value: number) => void;
  /** Callback when user starts dragging */
  onDragStart?: () => void;
  /** Callback when user stops dragging */
  onDragEnd?: () => void;
}

const Slider: React.FC<SliderProps> = ({
  min = 0,
  max = 100,
  value,
  defaultValue = 0,
  step = 1,
  disabled = false,
  size = 'medium',
  trackColor,
  thumbColor,
  showTooltip = false,
  showLabels = false,
  showValue = false,
  className = '',
  onChange,
  onDragStart,
  onDragEnd,
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [isDragging, setIsDragging] = useState(false);
  const [showTooltipValue, setShowTooltipValue] = useState(showTooltip);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Use controlled or uncontrolled value
  const currentValue = value !== undefined ? value : internalValue;
  
  // Calculate percentage for positioning
  const percentage = ((currentValue - min) / (max - min)) * 100;
  
  // Size classes
  const sizeClasses = {
    small: 'h-1 rounded-sm',
    medium: 'h-2 rounded-md',
    large: 'h-3 rounded-lg',
  };
  
  const thumbSizeClasses = {
    small: 'w-3 h-3',
    medium: 'w-4 h-4',
    large: 'w-5 h-5',
  };
  
  // Handle click on track
  const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled) return;
    
    const rect = sliderRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    const clickPositionX = e.clientX - rect.left;
    const sliderWidth = rect.width;
    const newPercentage = (clickPositionX / sliderWidth) * 100;
    const newValue = Math.round((newPercentage / 100) * (max - min) / step) * step + min;
    const clampedValue = Math.min(Math.max(newValue, min), max);
    
    if (value === undefined) {
      setInternalValue(clampedValue);
    }
    
    onChange?.(clampedValue);
  };
  
  // Handle drag start
  const handleDragStart = () => {
    if (disabled) return;
    setIsDragging(true);
    setShowTooltipValue(true);
    onDragStart?.();
  };
  
  // Handle drag end
  const handleDragEnd = () => {
    if (disabled) return;
    setIsDragging(false);
    if (!showTooltip) {
      setShowTooltipValue(false);
    }
    onDragEnd?.();
  };
  
  // Set up event listeners for dragging
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || disabled || !sliderRef.current) return;
      
      const rect = sliderRef.current.getBoundingClientRect();
      const sliderWidth = rect.width;
      const mouseX = e.clientX - rect.left;
      const newPercentage = (mouseX / sliderWidth) * 100;
      const clampedPercentage = Math.min(Math.max(newPercentage, 0), 100);
      const newValue = Math.round((clampedPercentage / 100) * (max - min) / step) * step + min;
      const clampedValue = Math.min(Math.max(newValue, min), max);
      
      if (value === undefined) {
        setInternalValue(clampedValue);
      }
      
      onChange?.(clampedValue);
    };
    
    const handleMouseUp = () => {
      handleDragEnd();
    };
    
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, disabled, min, max, step, value, onChange, onDragEnd]);
  
  return (
    <div className={`relative w-full ${className}`}>
      {/* Min/Max labels */}
      {showLabels && (
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>{min}</span>
          <span>{max}</span>
        </div>
      )}
      
      {/* Slider track */}
      <div
        ref={sliderRef}
        className={`w-full ${sizeClasses[size]} bg-gray-200 dark:bg-gray-700 cursor-pointer`}
        onClick={handleTrackClick}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={currentValue}
        role="slider"
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : 0}
      >
        {/* Filled track */}
        <div
          className={`h-full ${trackColor || 'bg-blue-500'} rounded-l-full`}
          style={{ width: `${percentage}%` }}
        ></div>
        
        {/* Thumb */}
        <div
          className={`absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2 ${
            thumbSizeClasses[size]
          } rounded-full ${thumbColor || 'bg-blue-500'} shadow-md cursor-grab ${
            isDragging ? 'cursor-grabbing' : ''
          } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          style={{ left: `${percentage}%` }}
          onMouseDown={handleDragStart}
          onTouchStart={handleDragStart}
        >
          {/* Tooltip */}
          {showTooltipValue && (
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded whitespace-nowrap">
              {currentValue}
            </div>
          )}
        </div>
      </div>
      
      {/* Value label */}
      {showValue && (
        <div className="mt-1 text-sm text-gray-700 dark:text-gray-300">
          {currentValue}
        </div>
      )}
    </div>
  );
};

export default Slider;
