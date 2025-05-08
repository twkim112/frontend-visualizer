'use client';

import React, { useState } from 'react';
import styles from './styles.module.css';

interface PulseAnimationProps {
  children: React.ReactNode;
  color?: string;
  duration?: number;
  size?: 'sm' | 'md' | 'lg';
  intensity?: 'subtle' | 'medium' | 'strong';
  active?: boolean;
  className?: string;
}

/**
 * Pulse Animation Component
 * 
 * A CSS animation that creates a pulsing effect by alternating between scaling up and down
 * or changing opacity.
 * 
 * @param children - The content to apply the pulse animation to
 * @param color - Color of the pulse effect (default: blue)
 * @param duration - Animation duration in seconds
 * @param size - Size of the ripple effect
 * @param intensity - Intensity of the pulse effect
 * @param active - Whether the animation is active
 * @param className - Additional CSS classes
 */
const PulseAnimation: React.FC<PulseAnimationProps> = ({
  children,
  color = 'blue',
  duration = 2,
  size = 'md',
  intensity = 'medium',
  active = true,
  className = ''
}) => {
  // Map props to CSS module classes
  const getColorClass = () => {
    switch (color) {
      case 'red': return styles.colorRed;
      case 'green': return styles.colorGreen;
      case 'purple': return styles.colorPurple;
      case 'orange': return styles.colorOrange;
      case 'pink': return styles.colorPink;
      case 'blue':
      default: return styles.colorBlue;
    }
  };

  const getSizeClass = () => {
    switch (size) {
      case 'sm': return styles.sizeSm;
      case 'lg': return styles.sizeLg;
      case 'md':
      default: return styles.sizeMd;
    }
  };

  const getIntensityClass = () => {
    switch (intensity) {
      case 'subtle': return styles.pulseSubtle;
      case 'strong': return styles.pulseStrong;
      case 'medium':
      default: return styles.pulseMedium;
    }
  };

  return (
    <div className={`relative inline-flex justify-center items-center ${className}`}>
      {active && (
        <span
          className={`${styles.ripple} ${getColorClass()} ${getSizeClass()} ${getIntensityClass()}`}
          style={{ 
            animationDuration: `${duration}s`
          }}
        />
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

// Example component to showcase different pulse animations
const PulseAnimationExample: React.FC = () => {
  const [activeDemo, setActiveDemo] = useState('basic');

  const buttonStyle = "px-4 py-2 rounded-lg font-medium";
  const activeButtonStyle = "bg-blue-500 text-white";
  const inactiveButtonStyle = "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300";

  return (
    <div className="flex flex-col space-y-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
      {/* Demo selector */}
      <div className="flex space-x-2 justify-center">
        <button 
          className={`${buttonStyle} ${activeDemo === 'basic' ? activeButtonStyle : inactiveButtonStyle}`}
          onClick={() => setActiveDemo('basic')}
        >
          Basic Examples
        </button>
        <button 
          className={`${buttonStyle} ${activeDemo === 'interactive' ? activeButtonStyle : inactiveButtonStyle}`}
          onClick={() => setActiveDemo('interactive')}
        >
          Interactive Demo
        </button>
      </div>

      {/* Basic examples showcase */}
      {activeDemo === 'basic' && (
        <div className="space-y-8">
          {/* Different colors */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Color Variants</h3>
            <div className="flex flex-wrap justify-center gap-6">
              {['blue', 'red', 'green', 'purple', 'orange', 'pink'].map((color) => (
                <PulseAnimation 
                  key={color} 
                  color={color as any}
                  className="py-2"
                >
                  <div className={`w-12 h-12 rounded-full bg-${color}-500 flex items-center justify-center text-white`}>
                    <span className="font-medium">{color.charAt(0).toUpperCase()}</span>
                  </div>
                </PulseAnimation>
              ))}
            </div>
          </div>

          {/* Different intensities */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Intensity Variants</h3>
            <div className="flex flex-wrap justify-center gap-8">
              {['subtle', 'medium', 'strong'].map((intensity) => (
                <div key={intensity} className="flex flex-col items-center space-y-2">
                  <PulseAnimation 
                    intensity={intensity as any}
                    className="py-2"
                  >
                    <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white">
                      <span className="text-xl">•</span>
                    </div>
                  </PulseAnimation>
                  <span className="text-sm text-gray-600 dark:text-gray-400 capitalize">{intensity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Different sizes */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Size Variants</h3>
            <div className="flex flex-wrap justify-center gap-8">
              {['sm', 'md', 'lg'].map((size) => (
                <div key={size} className="flex flex-col items-center space-y-2">
                  <PulseAnimation 
                    size={size as any}
                    className="py-2"
                  >
                    <div className={`
                      ${size === 'sm' ? 'w-8 h-8' : size === 'md' ? 'w-12 h-12' : 'w-16 h-16'} 
                      rounded-full bg-blue-500 flex items-center justify-center text-white
                    `}>
                      <span className="font-medium">{size}</span>
                    </div>
                  </PulseAnimation>
                  <span className="text-sm text-gray-600 dark:text-gray-400 uppercase">{size}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Interactive demo */}
      {activeDemo === 'interactive' && (
        <InteractivePulseDemo />
      )}
    </div>
  );
};

// Interactive demo component with controls
const InteractivePulseDemo: React.FC = () => {
  const [color, setColor] = useState('blue');
  const [duration, setDuration] = useState(2);
  const [size, setSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [intensity, setIntensity] = useState<'subtle' | 'medium' | 'strong'>('medium');
  const [active, setActive] = useState(true);

  return (
    <div className="space-y-6">
      <div className="flex justify-center py-8">
        <PulseAnimation 
          color={color as any}
          duration={duration}
          size={size}
          intensity={intensity}
          active={active}
        >
          <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-gray-600 dark:text-gray-300">
              <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
            </svg>
          </div>
        </PulseAnimation>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Color control */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Color</label>
          <div className="flex flex-wrap gap-2">
            {/* Using explicit color classes instead of dynamic ones */}
            <button
              className={`w-8 h-8 rounded-full bg-blue-500 ${color === 'blue' ? 'ring-2 ring-offset-2 ring-gray-400 dark:ring-gray-600' : ''}`}
              onClick={() => setColor('blue')}
              aria-label="Set color to blue"
            />
            <button
              className={`w-8 h-8 rounded-full bg-red-500 ${color === 'red' ? 'ring-2 ring-offset-2 ring-gray-400 dark:ring-gray-600' : ''}`}
              onClick={() => setColor('red')}
              aria-label="Set color to red"
            />
            <button
              className={`w-8 h-8 rounded-full bg-green-500 ${color === 'green' ? 'ring-2 ring-offset-2 ring-gray-400 dark:ring-gray-600' : ''}`}
              onClick={() => setColor('green')}
              aria-label="Set color to green"
            />
            <button
              className={`w-8 h-8 rounded-full bg-purple-500 ${color === 'purple' ? 'ring-2 ring-offset-2 ring-gray-400 dark:ring-gray-600' : ''}`}
              onClick={() => setColor('purple')}
              aria-label="Set color to purple"
            />
            <button
              className={`w-8 h-8 rounded-full bg-orange-500 ${color === 'orange' ? 'ring-2 ring-offset-2 ring-gray-400 dark:ring-gray-600' : ''}`}
              onClick={() => setColor('orange')}
              aria-label="Set color to orange"
            />
            <button
              className={`w-8 h-8 rounded-full bg-pink-500 ${color === 'pink' ? 'ring-2 ring-offset-2 ring-gray-400 dark:ring-gray-600' : ''}`}
              onClick={() => setColor('pink')}
              aria-label="Set color to pink"
            />
          </div>
        </div>

        {/* Duration control */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <label className="text-sm font-medium">Duration: {duration}s</label>
          </div>
          <input
            type="range"
            min="0.5"
            max="5"
            step="0.5"
            value={duration}
            onChange={(e) => setDuration(parseFloat(e.target.value))}
            className="w-full"
          />
        </div>

        {/* Size control */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Size</label>
          <div className="flex gap-3">
            {['sm', 'md', 'lg'].map((s) => (
              <button
                key={s}
                className={`
                  px-3 py-1.5 rounded-md
                  ${size === s 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}
                `}
                onClick={() => setSize(s as any)}
              >
                {s.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Intensity control */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Intensity</label>
          <div className="flex gap-3">
            {['subtle', 'medium', 'strong'].map((i) => (
              <button
                key={i}
                className={`
                  px-3 py-1.5 rounded-md
                  ${intensity === i 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}
                `}
                onClick={() => setIntensity(i as any)}
              >
                {i.charAt(0).toUpperCase() + i.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Toggle animation */}
        <div className="col-span-1 md:col-span-2 flex justify-center">
          <button
            className={`
              px-4 py-2 rounded-md font-medium
              ${active 
                ? 'bg-red-500 hover:bg-red-600 text-white' 
                : 'bg-green-500 hover:bg-green-600 text-white'}
              transition-colors
            `}
            onClick={() => setActive(!active)}
          >
            {active ? 'Stop Animation' : 'Start Animation'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PulseAnimationExample;
