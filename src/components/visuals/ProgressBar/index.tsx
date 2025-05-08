'use client';

import React, { useState, useEffect } from 'react';

// Types for the Progress Bar component
interface ProgressBarProps {
  progress: number;
  color?: string;
  height?: number;
  rounded?: boolean;
  showPercentage?: boolean;
  animated?: boolean;
  striped?: boolean;
  className?: string;
  barClassName?: string;
  textClassName?: string;
}

/**
 * Progress Bar Component
 * 
 * A visual indicator that displays the completion progress of an operation, task, or workflow.
 * 
 * @param progress - The current progress value (0-100)
 * @param color - The color of the progress bar
 * @param height - The height of the progress bar in pixels
 * @param rounded - Whether to apply rounded corners
 * @param showPercentage - Whether to show the percentage text
 * @param animated - Whether to add a subtle animation to the progress bar
 * @param striped - Whether to add a striped pattern to the progress bar
 * @param className - Additional CSS class for the container element
 * @param barClassName - Additional CSS class for the progress bar element
 * @param textClassName - Additional CSS class for the percentage text
 */
const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  color = 'blue',
  height = 8,
  rounded = true,
  showPercentage = false,
  animated = false,
  striped = false,
  className = '',
  barClassName = '',
  textClassName = '',
}) => {
  // Ensure progress is within 0-100 range
  const validProgress = Math.min(Math.max(progress, 0), 100);
  
  // Determine color class based on the color prop
  const getColorClass = () => {
    switch (color) {
      case 'blue': return 'bg-blue-500';
      case 'green': return 'bg-green-500';
      case 'red': return 'bg-red-500';
      case 'yellow': return 'bg-yellow-500';
      case 'purple': return 'bg-purple-500';
      case 'indigo': return 'bg-indigo-500';
      case 'pink': return 'bg-pink-500';
      case 'gray': return 'bg-gray-500';
      default: return 'bg-blue-500';
    }
  };
  
  // Generate classes for the progress bar
  const progressBarClasses = [
    getColorClass(),
    'transition-all duration-300 ease-in-out h-full',
    rounded ? 'rounded-full' : '',
    striped ? 'progress-bar-striped' : '',
    striped && animated ? 'progress-bar-animated' : '',
    animated && !striped ? 'animate-pulse' : '',
    barClassName
  ].filter(Boolean).join(' ');
  
  return (
    <div className={`relative w-full ${className}`}>
      <div 
        className={`bg-gray-200 dark:bg-gray-700 overflow-hidden ${rounded ? 'rounded-full' : ''}`}
        style={{ height: `${height}px` }}
        role="progressbar"
        aria-valuenow={validProgress}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div 
          className={progressBarClasses}
          style={{ width: `${validProgress}%` }}
        >
          {/* Striping is handled via CSS pseudo-elements */}
        </div>
      </div>
      
      {showPercentage && (
        <div className={`text-center text-sm mt-1 ${textClassName}`}>
          {validProgress}%
        </div>
      )}
    </div>
  );
};

// Striped progress bar animation
const ProgressBarStripedAnimation = () => (
  <style jsx global>{`
    @keyframes moveStripes {
      0% { background-position: 0 0; }
      100% { background-position: 16px 0; }
    }
    
    /* Use pseudo-element for the striped appearance */
    .progress-bar-striped {
      position: relative;
      overflow: hidden;
    }
    
    .progress-bar-striped::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-image: linear-gradient(
        45deg,
        rgba(255, 255, 255, 0.15) 25%,
        transparent 25%,
        transparent 50%,
        rgba(255, 255, 255, 0.15) 50%,
        rgba(255, 255, 255, 0.15) 75%,
        transparent 75%,
        transparent
      );
      background-size: 16px 16px;
    }
    
    /* Animation for the striped pattern */
    .progress-bar-animated::before {
      animation: moveStripes 1s linear infinite;
    }
  `}</style>
);

// Example component to showcase the Progress Bar
const ProgressBarExample: React.FC = () => {
  const [autoProgress, setAutoProgress] = useState(0);
  const [manualProgress, setManualProgress] = useState(50);
  const [selectedColor, setSelectedColor] = useState('blue');
  const [height, setHeight] = useState(8);
  const [rounded, setRounded] = useState(true);
  const [showPercentage, setShowPercentage] = useState(true);
  const [animated, setAnimated] = useState(false);
  const [striped, setStriped] = useState(false);
  
  // Auto increment progress for the first progress bar
  useEffect(() => {
    const timer = setTimeout(() => {
      if (autoProgress < 100) {
        setAutoProgress(prev => Math.min(prev + 5, 100));
      } else {
        setAutoProgress(0);
      }
    }, 500);
    
    return () => clearTimeout(timer);
  }, [autoProgress]);
  
  // Available colors
  const colors = [
    { name: 'blue', value: 'blue' },
    { name: 'green', value: 'green' },
    { name: 'red', value: 'red' },
    { name: 'yellow', value: 'yellow' },
    { name: 'purple', value: 'purple' },
    { name: 'indigo', value: 'indigo' },
    { name: 'pink', value: 'pink' },
    { name: 'gray', value: 'gray' },
  ];
  
  return (
    <div className="space-y-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
      <ProgressBarStripedAnimation />
      
      <h2 className="text-xl font-semibold mb-4">Progress Bar Demo</h2>
      
      {/* Auto Progress Example */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">Auto Progress Example</h3>
        <ProgressBar 
          progress={autoProgress} 
          color="blue"
          height={8}
          rounded={true}
          showPercentage={true}
          striped={true}
          animated={true}
        />
      </div>
      
      {/* Interactive Progress Bar */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium mb-2">Interactive Example</h3>
        
        {/* Progress Value Slider */}
        <div>
          <label htmlFor="progress-slider" className="block text-sm font-medium mb-1">Progress ({manualProgress}%)</label>
          <input
            id="progress-slider"
            type="range"
            min={0}
            max={100}
            value={manualProgress}
            onChange={(e) => setManualProgress(parseInt(e.target.value))}
            className="w-full"
          />
        </div>
        
        {/* Color Selection */}
        <div>
          <label className="block text-sm font-medium mb-1">Color</label>
          <div className="grid grid-cols-4 gap-2 sm:grid-cols-8">
            {colors.map((color) => (
              <button
                key={color.value}
                className={`w-8 h-8 rounded-full bg-${color.value}-500 border-2 ${selectedColor === color.value ? 'border-black dark:border-white' : 'border-transparent'}`}
                onClick={() => setSelectedColor(color.value)}
                aria-label={`Select ${color.name} color`}
              />
            ))}
          </div>
        </div>
        
        {/* Height Selection */}
        <div>
          <label className="block text-sm font-medium mb-1">Height ({height}px)</label>
          <input
            type="range"
            min={4}
            max={16}
            value={height}
            onChange={(e) => setHeight(parseInt(e.target.value))}
            className="w-full"
          />
        </div>
        
        {/* Toggles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center">
            <input
              id="rounded-toggle"
              type="checkbox"
              checked={rounded}
              onChange={(e) => setRounded(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <label htmlFor="rounded-toggle" className="ml-2 text-sm">Rounded Corners</label>
          </div>
          
          <div className="flex items-center">
            <input
              id="percentage-toggle"
              type="checkbox"
              checked={showPercentage}
              onChange={(e) => setShowPercentage(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <label htmlFor="percentage-toggle" className="ml-2 text-sm">Show Percentage</label>
          </div>
          
          <div className="flex items-center">
            <input
              id="striped-toggle"
              type="checkbox"
              checked={striped}
              onChange={(e) => setStriped(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <label htmlFor="striped-toggle" className="ml-2 text-sm">Striped Pattern</label>
          </div>
          
          <div className="flex items-center">
            <input
              id="animated-toggle"
              type="checkbox"
              checked={animated}
              onChange={(e) => setAnimated(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <label htmlFor="animated-toggle" className="ml-2 text-sm">Animated</label>
          </div>
        </div>
        
        {/* Result */}
        <div className="mt-6">
          <h4 className="text-md font-medium mb-3">Result:</h4>
          <ProgressBar 
            progress={manualProgress} 
            color={selectedColor}
            height={height}
            rounded={rounded}
            showPercentage={showPercentage}
            animated={animated}
            striped={striped}
          />
        </div>
      </div>
      
      {/* Use Cases */}
      <div className="pt-6 mt-6 border-t border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-medium mb-4">Common Use Cases</h3>
        
        <div className="space-y-6">
          {/* Loading Progress */}
          <div>
            <h4 className="text-md font-medium mb-2">File Upload (25%)</h4>
            <ProgressBar 
              progress={25} 
              color="blue"
              height={8}
              rounded={true}
              showPercentage={true}
              striped={true}
              animated={true}
            />
          </div>
          
          {/* Completion Status */}
          <div>
            <h4 className="text-md font-medium mb-2">Task Completion (75%)</h4>
            <ProgressBar 
              progress={75} 
              color="green"
              height={10}
              rounded={true}
              showPercentage={true}
            />
          </div>
          
          {/* Error Status */}
          <div>
            <h4 className="text-md font-medium mb-2">Error Status (50%)</h4>
            <ProgressBar 
              progress={50} 
              color="red"
              height={8}
              rounded={true}
              showPercentage={true}
            />
          </div>
          
          {/* Multi-step Process */}
          <div>
            <h4 className="text-md font-medium mb-2">Multi-step Process (3/5 steps)</h4>
            <ProgressBar 
              progress={60} 
              color="indigo"
              height={12}
              rounded={false}
              showPercentage={false}
            />
            <div className="mt-2 text-sm text-center">Step 3 of 5</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBarExample;
