'use client';

import React, { useState } from 'react';

interface ToggleSwitchProps {
  initialState?: boolean;
  label?: string;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  onToggle?: (isOn: boolean) => void;
  className?: string;
}

/**
 * Toggle Switch Component
 * 
 * A visual control that allows users to toggle between two states (on/off) with a sliding action.
 * 
 * @param initialState - Initial state of the toggle (true = on, false = off)
 * @param label - Optional label text to display next to the toggle
 * @param disabled - Whether the toggle is disabled
 * @param size - Size of the toggle switch (sm, md, lg)
 * @param onToggle - Callback function triggered when the toggle state changes
 * @param className - Additional CSS classes
 */
const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  initialState = false,
  label,
  disabled = false,
  size = 'md',
  onToggle,
  className = ''
}) => {
  const [isOn, setIsOn] = useState(initialState);

  // Toggle switch dimensions based on size
  const dimensions = {
    sm: {
      track: 'w-8 h-4',
      thumb: 'w-3 h-3',
      translateX: 'translate-x-4',
      label: 'text-sm'
    },
    md: {
      track: 'w-11 h-6',
      thumb: 'w-5 h-5',
      translateX: 'translate-x-5',
      label: 'text-base'
    },
    lg: {
      track: 'w-14 h-7',
      thumb: 'w-6 h-6',
      translateX: 'translate-x-7',
      label: 'text-lg'
    }
  };

  const handleToggle = () => {
    if (!disabled) {
      const newState = !isOn;
      setIsOn(newState);
      onToggle?.(newState);
    }
  };

  return (
    <div className={`inline-flex items-center ${className}`}>
      <button
        type="button"
        className={`
          relative inline-flex flex-shrink-0 items-center 
          ${dimensions[size].track} 
          rounded-full 
          ${isOn 
            ? 'bg-blue-500 dark:bg-blue-600' 
            : 'bg-gray-300 dark:bg-gray-600'
          }
          ${disabled 
            ? 'opacity-50 cursor-not-allowed' 
            : 'cursor-pointer'
          }
          transition-colors ease-in-out duration-300
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        `}
        onClick={handleToggle}
        aria-pressed={isOn}
        aria-label={label || 'Toggle'}
        aria-disabled={disabled}
        disabled={disabled}
      >
        <span className="sr-only">{label || 'Toggle'}</span>
        <span
          className={`
            ${dimensions[size].thumb}
            ${isOn ? dimensions[size].translateX : 'translate-x-0.5'} 
            rounded-full bg-white dark:bg-gray-200
            transform transition-transform duration-300 ease-in-out
            shadow-md
          `}
        />
      </button>
      {label && (
        <span className={`ml-3 ${dimensions[size].label} ${disabled ? 'opacity-50' : ''}`}>
          {label}
        </span>
      )}
    </div>
  );
};

// Example usage demonstration component
const ToggleSwitchExample: React.FC = () => {
  return (
    <div className="flex flex-col space-y-8 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
      {/* Basic toggle switches in different states */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Basic Toggle Switches</h3>
        <div className="flex flex-col space-y-3">
          <ToggleSwitch label="Inactive Toggle" />
          <ToggleSwitch label="Active Toggle" initialState={true} />
          <ToggleSwitch label="Disabled Toggle" disabled />
          <ToggleSwitch label="Disabled Active Toggle" initialState={true} disabled />
        </div>
      </div>

      {/* Different sizes */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Toggle Switch Sizes</h3>
        <div className="flex flex-col space-y-3">
          <ToggleSwitch label="Small Toggle" size="sm" />
          <ToggleSwitch label="Medium Toggle (Default)" size="md" />
          <ToggleSwitch label="Large Toggle" size="lg" />
        </div>
      </div>

      {/* Interactive example */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Interactive Example</h3>
        <div className="flex flex-col space-y-3">
          <InteractiveToggle />
        </div>
      </div>
    </div>
  );
};

// Interactive toggle with state display
const InteractiveToggle: React.FC = () => {
  const [isOn, setIsOn] = useState(false);
  
  return (
    <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md">
      <div className="mb-4 flex justify-between items-center">
        <ToggleSwitch 
          label={`Status: ${isOn ? 'ON' : 'OFF'}`} 
          initialState={isOn}
          onToggle={setIsOn}
        />
        <span className="px-3 py-1 rounded-full text-sm font-medium" 
          style={{ 
            color: isOn ? '#fff' : '#374151',
            background: isOn ? '#10B981' : '#E5E7EB',
          }}
        >
          {isOn ? 'Active' : 'Inactive'}
        </span>
      </div>
      <div className={`
        transition-all duration-500 ease-in-out
        ${isOn ? 'opacity-100' : 'opacity-40'}
      `}>
        <p className="text-sm">
          This content reacts to the toggle state. When active, it appears at full opacity.
          When inactive, it appears faded.
        </p>
      </div>
    </div>
  );
};

export default ToggleSwitchExample;
