'use client';

import React, { useState, useRef, useEffect } from 'react';

// Types for the Slider component
type SliderSize = 'small' | 'medium' | 'large';
type SliderVariant = 'default' | 'filled' | 'gradient';
type SliderLabelPosition = 'top' | 'bottom' | 'left' | 'right';

interface SliderProps {
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  onChangeComplete?: (value: number) => void;
  disabled?: boolean;
  size?: SliderSize;
  variant?: SliderVariant;
  trackColor?: string;
  thumbColor?: string;
  showLabels?: boolean;
  labelPosition?: SliderLabelPosition;
  labelFormat?: (value: number) => string;
  marks?: Array<{ value: number; label?: React.ReactNode }>;
  showValue?: boolean;
  className?: string;
  tooltipClassName?: string;
  showTooltip?: boolean | 'always';
  vertical?: boolean;
  aria?: Record<string, string>;
}

/**
 * Slider Component
 * 
 * An interactive control allowing users to select a value or range by dragging a handle along a track.
 * 
 * @param min - Minimum value of the slider
 * @param max - Maximum value of the slider
 * @param step - Step increment value
 * @param value - Controlled value of the slider
 * @param defaultValue - Default value for uncontrolled component
 * @param onChange - Callback when value changes during drag
 * @param onChangeComplete - Callback when drag completes
 * @param disabled - Whether the slider is disabled
 * @param size - Size variant of the slider
 * @param variant - Visual variant of the slider
 * @param trackColor - Color of the slider track
 * @param thumbColor - Color of the slider thumb
 * @param showLabels - Whether to show min/max labels
 * @param labelPosition - Position of the labels
 * @param labelFormat - Custom formatting for labels and tooltip
 * @param marks - Array of mark points to display on the track
 * @param showValue - Whether to display current value
 * @param className - Additional CSS classes for the slider container
 * @param tooltipClassName - Additional CSS classes for the tooltip
 * @param showTooltip - When to show the tooltip
 * @param vertical - Whether the slider is vertical
 * @param aria - Additional ARIA attributes for accessibility
 */
const Slider: React.FC<SliderProps> = ({
  min = 0,
  max = 100,
  step = 1,
  value: controlledValue,
  defaultValue = 0,
  onChange,
  onChangeComplete,
  disabled = false,
  size = 'medium',
  variant = 'default',
  trackColor,
  thumbColor,
  showLabels = false,
  labelPosition = 'bottom',
  labelFormat = (value: number) => value.toString(),
  marks = [],
  showValue = false,
  className = '',
  tooltipClassName = '',
  showTooltip = false,
  vertical = false,
  aria = {},
}) => {
  // Use internal state for uncontrolled component
  const [internalValue, setInternalValue] = useState<number>(
    controlledValue !== undefined ? controlledValue : defaultValue
  );
  
  // Track element reference for calculations
  const trackRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef<boolean>(false);
  const [showValueTooltip, setShowValueTooltip] = useState<boolean>(showTooltip === 'always');
  
  // Update internal value when controlled value changes
  useEffect(() => {
    if (controlledValue !== undefined) {
      setInternalValue(controlledValue);
    }
  }, [controlledValue]);

  // Get the current value (controlled or uncontrolled)
  const value = controlledValue !== undefined ? controlledValue : internalValue;
  
  // Calculate percent value for styling
  const percentValue = ((value - min) / (max - min)) * 100;
  
  // Get size-specific classes
  const getSizeClasses = () => {
    switch (size) {
      case 'small': return {
        track: 'h-1',
        thumb: 'h-3 w-3',
        thumbOffset: '-4px',
      };
      case 'large': return {
        track: 'h-3',
        thumb: 'h-6 w-6',
        thumbOffset: '-8px',
      };
      default: return {
        track: 'h-2',
        thumb: 'h-5 w-5',
        thumbOffset: '-6px',
      };
    }
  };
  
  // Get variant-specific classes
  const getVariantClasses = () => {
    switch (variant) {
      case 'filled':
        return {
          track: 'bg-gray-200 dark:bg-gray-700',
          filled: trackColor || 'bg-blue-500 dark:bg-blue-400',
          thumb: thumbColor || 'bg-white dark:bg-gray-200 border-blue-500 dark:border-blue-400',
        };
      case 'gradient':
        return {
          track: 'bg-gray-200 dark:bg-gray-700',
          filled: trackColor || 'bg-gradient-to-r from-blue-400 to-purple-500 dark:from-blue-500 dark:to-purple-600',
          thumb: thumbColor || 'bg-white dark:bg-gray-200 border-purple-500 dark:border-purple-400',
        };
      default:
        return {
          track: 'bg-gray-200 dark:bg-gray-700',
          filled: trackColor || 'bg-blue-500 dark:bg-blue-400',
          thumb: thumbColor || 'bg-white dark:bg-gray-200 border-blue-500 dark:border-blue-400',
        };
    }
  };

  // Handle mouse and touch events
  const handleInteraction = (clientPosition: number) => {
    if (disabled || !trackRef.current) return;
    
    const rect = trackRef.current.getBoundingClientRect();
    const position = vertical
      ? rect.bottom - clientPosition
      : clientPosition - rect.left;
    
    const length = vertical ? rect.height : rect.width;
    let percentage = Math.max(0, Math.min(1, position / length));
    
    // Calculate new value based on min, max and step
    let newValue = min + Math.round((percentage * (max - min)) / step) * step;
    
    // Constrain to min/max
    newValue = Math.max(min, Math.min(max, newValue));
    
    // Update internal state and trigger onChange
    setInternalValue(newValue);
    onChange?.(newValue);
  };
  
  // Mouse event handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (disabled) return;
    
    isDragging.current = true;
    handleInteraction(vertical ? e.clientY : e.clientX);
    
    // Show tooltip while dragging
    if (showTooltip && showTooltip !== 'always') {
      setShowValueTooltip(true);
    }
    
    // Add window event listeners for drag
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };
  
  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging.current) return;
    handleInteraction(vertical ? e.clientY : e.clientX);
  };
  
  const handleMouseUp = () => {
    if (!isDragging.current) return;
    
    isDragging.current = false;
    
    // Hide tooltip when not always showing
    if (showTooltip && showTooltip !== 'always') {
      setShowValueTooltip(false);
    }
    
    // Trigger onChangeComplete callback
    onChangeComplete?.(controlledValue !== undefined ? controlledValue : internalValue);
    
    // Remove window event listeners
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
  };
  
  // Touch event handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (disabled) return;
    
    isDragging.current = true;
    handleInteraction(vertical ? e.touches[0].clientY : e.touches[0].clientX);
    
    // Show tooltip while dragging
    if (showTooltip && showTooltip !== 'always') {
      setShowValueTooltip(true);
    }
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current) return;
    handleInteraction(vertical ? e.touches[0].clientY : e.touches[0].clientX);
  };
  
  const handleTouchEnd = () => {
    if (!isDragging.current) return;
    
    isDragging.current = false;
    
    // Hide tooltip when not always showing
    if (showTooltip && showTooltip !== 'always') {
      setShowValueTooltip(false);
    }
    
    // Trigger onChangeComplete callback
    onChangeComplete?.(controlledValue !== undefined ? controlledValue : internalValue);
  };
  
  // Keyboard event handler for accessibility
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;
    
    let newValue = value;
    
    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowUp':
        newValue = Math.min(max, value + step);
        break;
      case 'ArrowLeft':
      case 'ArrowDown':
        newValue = Math.max(min, value - step);
        break;
      case 'Home':
        newValue = min;
        break;
      case 'End':
        newValue = max;
        break;
      default:
        return;
    }
    
    if (newValue !== value) {
      e.preventDefault();
      setInternalValue(newValue);
      onChange?.(newValue);
      onChangeComplete?.(newValue);
    }
  };
  
  // Get style classes based on component properties
  const sizeClasses = getSizeClasses();
  const variantClasses = getVariantClasses();
  
  // Generate accessible label
  const ariaLabel = aria['aria-label'] || `Slider with value ${value} from range ${min} to ${max}`;
  
  // For horizontal or vertical orientation
  const orientationStyles = vertical
    ? {
        container: 'flex-row h-64',
        track: 'h-full w-2',
        filled: 'bottom-0 w-full',
        thumb: 'left-1/2 -translate-x-1/2',
        thumbPosition: { bottom: `${percentValue}%` },
        markPosition: (markValue: number) => ({ bottom: `${((markValue - min) / (max - min)) * 100}%` }),
      }
    : {
        container: 'flex-col',
        track: 'w-full',
        filled: 'left-0 h-full',
        thumb: 'top-1/2 -translate-y-1/2',
        thumbPosition: { left: `${percentValue}%` },
        markPosition: (markValue: number) => ({ left: `${((markValue - min) / (max - min)) * 100}%` }),
      };

  // Label positioning
  const labelPositionStyles = {
    top: 'mb-2',
    bottom: 'mt-2',
    left: 'mr-3',
    right: 'ml-3'
  };
  
  return (
    <div 
      className={`flex ${vertical ? 'items-center' : 'w-full'} ${orientationStyles.container} ${className}`}
      aria-disabled={disabled}
    >
      {/* Min Label */}
      {showLabels && (labelPosition === 'left' || labelPosition === 'top') && (
        <div className={`text-sm text-gray-600 dark:text-gray-400 ${labelPositionStyles[labelPosition]}`}>
          {labelFormat(min)}
        </div>
      )}
      
      {/* Slider Track */}
      <div 
        className={`relative ${orientationStyles.track} ${sizeClasses.track} ${variantClasses.track} rounded-full cursor-pointer ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        ref={trackRef}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        role="presentation"
      >
        {/* Filled Track */}
        <div
          className={`absolute ${orientationStyles.filled} ${variantClasses.filled} rounded-full`}
          style={{
            [vertical ? 'height' : 'width']: `${percentValue}%`,
          }}
        />
        
        {/* Track Marks */}
        {marks.map((mark, index) => (
          <div
            key={index}
            className="absolute w-1 h-1 bg-gray-400 dark:bg-gray-500 rounded-full transform -translate-x-1/2 -translate-y-1/2"
            style={orientationStyles.markPosition(mark.value)}
            aria-hidden="true"
          >
            {mark.label && (
              <div 
                className={`absolute ${vertical ? '-left-7' : 'top-4'} transform ${vertical ? '' : '-translate-x-1/2'} text-xs text-gray-500 dark:text-gray-400`}
              >
                {mark.label}
              </div>
            )}
          </div>
        ))}
        
        {/* Thumb */}
        <div
          className={`absolute ${orientationStyles.thumb} ${sizeClasses.thumb} ${variantClasses.thumb} rounded-full border-2 focus:ring-2 focus:ring-blue-300 focus:outline-none shadow-md cursor-grab active:cursor-grabbing ${disabled ? 'cursor-not-allowed' : ''}`}
          style={orientationStyles.thumbPosition}
          role="slider"
          tabIndex={disabled ? -1 : 0}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value}
          aria-label={ariaLabel}
          aria-orientation={vertical ? 'vertical' : 'horizontal'}
          {...aria}
          onKeyDown={handleKeyDown}
        >
          {/* Tooltip */}
          {showTooltip && showValueTooltip && (
            <div 
              className={`absolute ${vertical ? 'left-7' : '-top-8'} -translate-x-1/2 px-2 py-1 bg-gray-800 dark:bg-gray-700 text-white text-xs rounded shadow-md whitespace-nowrap ${tooltipClassName}`}
            >
              {labelFormat(value)}
            </div>
          )}
        </div>
      </div>
      
      {/* Max Label */}
      {showLabels && (labelPosition === 'right' || labelPosition === 'bottom') && (
        <div className={`text-sm text-gray-600 dark:text-gray-400 ${labelPositionStyles[labelPosition]}`}>
          {labelFormat(max)}
        </div>
      )}
      
      {/* Value Display */}
      {showValue && (
        <div className="ml-3 min-w-[3rem] text-sm text-gray-700 dark:text-gray-300">
          {labelFormat(value)}
        </div>
      )}
    </div>
  );
};

// Example component to showcase Slider usage
const SliderExample: React.FC = () => {
  const [value, setValue] = useState<number>(50);
  const [rangeValue, setRangeValue] = useState<number>(500);
  const [size, setSize] = useState<SliderSize>('medium');
  const [variant, setVariant] = useState<SliderVariant>('default');
  const [vertical, setVertical] = useState<boolean>(false);
  const [showTooltip, setShowTooltip] = useState<boolean | 'always'>('always');
  
  // Price formatter for labels
  const priceFormatter = (val: number) => `$${val}`;
  
  // Demo marks for the slider
  const priceMarks = [
    { value: 0, label: '$0' },
    { value: 250, label: '$250' },
    { value: 500, label: '$500' },
    { value: 750, label: '$750' },
    { value: 1000, label: '$1000' },
  ];
  
  return (
    <div className="p-6 space-y-10 bg-white dark:bg-gray-800 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Slider Demo</h2>
      
      {/* Configuration Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Size Selection */}
        <div>
          <label className="block text-sm font-medium mb-1">Size</label>
          <div className="flex space-x-2">
            {(['small', 'medium', 'large'] as SliderSize[]).map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={`
                  px-3 py-1 text-sm rounded-md
                  ${size === s
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}
                `}
              >
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>
        </div>
        
        {/* Variant Selection */}
        <div>
          <label className="block text-sm font-medium mb-1">Variant</label>
          <div className="flex flex-wrap gap-2">
            {(['default', 'filled', 'gradient'] as SliderVariant[]).map((v) => (
              <button
                key={v}
                onClick={() => setVariant(v)}
                className={`
                  px-3 py-1 text-sm rounded-md
                  ${variant === v
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}
                `}
              >
                {v.charAt(0).toUpperCase() + v.slice(1)}
              </button>
            ))}
          </div>
        </div>
        
        {/* Options */}
        <div className="md:col-span-2 flex flex-wrap gap-6">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={vertical}
              onChange={(e) => setVertical(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <span>Vertical</span>
          </label>
          
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showTooltip === 'always'}
              onChange={(e) => setShowTooltip(e.target.checked ? 'always' : true)}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <span>Always Show Tooltip</span>
          </label>
        </div>
      </div>
      
      {/* Basic Slider Example */}
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-3">Basic Slider</h3>
          <div className="md:w-1/2">
            <Slider 
              value={value}
              onChange={setValue}
              size={size}
              variant={variant}
              showTooltip={showTooltip}
              vertical={vertical}
              showValue={true}
            />
            <div className="mt-2 text-sm text-gray-500">Current value: {value}</div>
          </div>
        </div>
        
        {/* Price Range Slider */}
        <div className="pt-8">
          <h3 className="text-lg font-medium mb-3">Price Range Slider (with marks)</h3>
          <div className="md:w-2/3">
            <Slider 
              min={0}
              max={1000}
              step={25}
              value={rangeValue}
              onChange={setRangeValue}
              size={size}
              variant={variant}
              marks={priceMarks}
              showLabels={true}
              labelFormat={priceFormatter}
              showTooltip={showTooltip}
              vertical={vertical}
            />
            <div className="mt-2 text-sm text-gray-500">Price: {priceFormatter(rangeValue)}</div>
          </div>
        </div>
      </div>
      
      {/* More Examples */}
      <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-medium mb-4">More Examples</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Custom Colors */}
          <div>
            <h4 className="text-md font-medium mb-2">Custom Colors</h4>
            <Slider
              defaultValue={60}
              trackColor="bg-green-500"
              thumbColor="bg-white border-green-500"
              showTooltip="always"
              tooltipClassName="bg-green-600"
            />
          </div>
          
          {/* Disabled Slider */}
          <div>
            <h4 className="text-md font-medium mb-2">Disabled Slider</h4>
            <Slider
              defaultValue={30}
              disabled={true}
            />
          </div>
          
          {/* Step Slider with Labels */}
          <div>
            <h4 className="text-md font-medium mb-2">Step Slider (increments of 20)</h4>
            <Slider
              min={0}
              max={100}
              step={20}
              defaultValue={40}
              showLabels={true}
              marks={[
                { value: 0 },
                { value: 20 },
                { value: 40 },
                { value: 60 },
                { value: 80 },
                { value: 100 },
              ]}
            />
          </div>
          
          {/* Labeled Slider */}
          <div>
            <h4 className="text-md font-medium mb-2">Temperature Slider</h4>
            <Slider
              min={0}
              max={100}
              defaultValue={72}
              labelFormat={(val) => `${val}°F`}
              showValue={true}
              variant="gradient"
              trackColor="bg-gradient-to-r from-blue-500 to-red-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SliderExample;
