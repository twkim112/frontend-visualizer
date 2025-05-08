/**
 * Color Picker Component Index
 * 
 * Main export for the Color Picker component
 */
'use client';

import React from 'react';
import ColorPicker, { ColorPickerProps } from './ColorPicker';

const ColorPickerDemo: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold mb-4">Color Picker</h2>
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          A specialized input control allowing users to select a color value visually.
          Provides various interfaces for color selection including sliders, swatches, and hex input.
        </p>

        <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
          <ColorPicker />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-3">Common Use Cases</h3>
        <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
          <li>Customization interfaces for themes and styles</li>
          <li>Design tools and visual editors</li>
          <li>Personalization settings</li>
          <li>Data visualization color selection</li>
        </ul>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-3">Technical Details</h3>
        <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <dt className="font-medium text-gray-900 dark:text-white">Alternative Names</dt>
            <dd className="mt-1 text-gray-700 dark:text-gray-300">Color Selector, Color Chooser, Color Palette</dd>
          </div>
          <div>
            <dt className="font-medium text-gray-900 dark:text-white">Related Components</dt>
            <dd className="mt-1 text-gray-700 dark:text-gray-300">Slider, Input Field, Popover</dd>
          </div>
          <div>
            <dt className="font-medium text-gray-900 dark:text-white">Implementation</dt>
            <dd className="mt-1 text-gray-700 dark:text-gray-300">Uses React state, CSS gradients, and HTML5 color input</dd>
          </div>
          <div>
            <dt className="font-medium text-gray-900 dark:text-white">Accessibility</dt>
            <dd className="mt-1 text-gray-700 dark:text-gray-300">Supports keyboard navigation and provides visual feedback</dd>
          </div>
        </dl>
      </div>
    </div>
  );
};

export default ColorPickerDemo;
