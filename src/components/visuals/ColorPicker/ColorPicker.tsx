/**
 * Color Picker Component
 * 
 * A specialized input control allowing users to select a color value visually.
 * Provides various interfaces for color selection including sliders, swatches, and hex input.
 */
'use client';

import React, { useState } from 'react';

export interface ColorPickerProps {
  initialColor?: string;
  onChange?: (color: string) => void;
  className?: string;
}

const ColorPicker: React.FC<ColorPickerProps> = ({
  initialColor = '#3b82f6',
  onChange,
  className = '',
}) => {
  const [selectedColor, setSelectedColor] = useState(initialColor);
  const [showPalette, setShowPalette] = useState(false);

  // Common color palette
  const colorPalette = [
    '#ef4444', '#f97316', '#f59e0b', '#eab308', '#84cc16', 
    '#22c55e', '#10b981', '#14b8a6', '#06b6d4', '#0ea5e9', 
    '#3b82f6', '#6366f1', '#8b5cf6', '#a855f7', '#d946ef',
    '#ec4899', '#f43f5e', '#ffffff', '#a1a1aa', '#71717a', 
    '#52525b', '#3f3f46', '#27272a', '#18181b', '#000000',
  ];

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
    if (onChange) {
      onChange(color);
    }
  };

  return (
    <div className={`flex flex-col space-y-4 ${className}`}>
      {/* Color preview and hex input */}
      <div className="flex items-center space-x-3">
        <div 
          className="h-10 w-10 rounded-full border border-gray-300 cursor-pointer"
          style={{ backgroundColor: selectedColor }}
          onClick={() => setShowPalette(!showPalette)}
        />
        
        <input
          type="text"
          value={selectedColor}
          onChange={(e) => handleColorChange(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-28"
        />

        <input
          type="color"
          value={selectedColor}
          onChange={(e) => handleColorChange(e.target.value)}
          className="h-10 w-10 cursor-pointer"
        />
      </div>

      {/* Color palette/swatches */}
      {showPalette && (
        <div className="grid grid-cols-5 gap-2 p-2 border border-gray-200 rounded-md bg-white shadow-md">
          {colorPalette.map((color) => (
            <div
              key={color}
              className="h-6 w-6 rounded-full cursor-pointer transform transition-transform hover:scale-110 hover:shadow-md"
              style={{ backgroundColor: color }}
              onClick={() => {
                handleColorChange(color);
                setShowPalette(false);
              }}
            />
          ))}
        </div>
      )}

      {/* RGB sliders */}
      <div className="space-y-2">
        {['Red', 'Green', 'Blue'].map((label, index) => {
          // Convert hex to RGB components
          let hexValue = selectedColor.replace('#', '');
          if (hexValue.length === 3) {
            hexValue = hexValue.split('').map(char => char + char).join('');
          }
          
          const red = parseInt(hexValue.substring(0, 2), 16);
          const green = parseInt(hexValue.substring(2, 4), 16);
          const blue = parseInt(hexValue.substring(4, 6), 16);
          
          const rgbValues = [red, green, blue];
          const value = rgbValues[index];
          
          // Get colors for the gradient
          let gradientStart = '#000000';
          let gradientEnd = '#ff0000';
          if (label === 'Green') {
            gradientStart = '#000000';
            gradientEnd = '#00ff00';
          } else if (label === 'Blue') {
            gradientStart = '#000000';
            gradientEnd = '#0000ff';
          }
          
          return (
            <div key={label} className="flex items-center space-x-2">
              <span className="w-12 text-sm">{label}</span>
              <input
                type="range"
                min="0"
                max="255"
                value={value}
                onChange={(e) => {
                  const newValue = parseInt(e.target.value);
                  let newRgb = [...rgbValues];
                  newRgb[index] = newValue;
                  
                  const newColor = `#${newRgb.map(val => {
                    const hex = val.toString(16);
                    return hex.length === 1 ? '0' + hex : hex;
                  }).join('')}`;
                  
                  handleColorChange(newColor);
                }}
                className="flex-1 h-4 appearance-none bg-gradient-to-r rounded-md cursor-pointer"
                style={{
                  backgroundImage: `linear-gradient(to right, ${gradientStart}, ${gradientEnd})`
                }}
              />
              <span className="w-8 text-sm text-right">{value}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ColorPicker;
