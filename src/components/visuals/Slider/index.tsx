/**
 * Slider Component Index
 * 
 * Demonstrates different types of sliders used for selecting values from a continuous range.
 */
'use client';

import React, { useState } from 'react';
import Slider from './Slider';

const SliderDemo: React.FC = () => {
  const [basicValue, setBasicValue] = useState<number>(50);
  const [rangeValue, setRangeValue] = useState<number>(75);
  const [steppedValue, setSteppedValue] = useState<number>(25);
  const [customValue, setCustomValue] = useState<number>(40);
  
  return (
    <div className="space-y-12">
      <div>
        <h2 className="text-xl font-semibold mb-4">Slider</h2>
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          A slider allows users to select a value from a continuous range or set of discrete values
          by moving a handle along a track. Sliders are commonly used for adjusting settings such as
          volume, brightness, or filtering data by a range.
        </p>
        
        <div className="space-y-8">
          {/* Basic Slider */}
          <div>
            <h3 className="text-lg font-medium mb-3">Basic Slider</h3>
            <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
              <div className="mb-4 max-w-lg">
                <Slider 
                  value={basicValue} 
                  onChange={setBasicValue} 
                  showValue
                />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                A simple slider that allows selection from a range of 0-100
              </p>
            </div>
          </div>
          
          {/* Slider with Labels */}
          <div>
            <h3 className="text-lg font-medium mb-3">Slider with Labels</h3>
            <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
              <div className="mb-4 max-w-lg">
                <Slider 
                  value={rangeValue} 
                  onChange={setRangeValue} 
                  showLabels
                  showValue
                />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                A slider with min/max labels and value display
              </p>
            </div>
          </div>
          
          {/* Stepped Slider */}
          <div>
            <h3 className="text-lg font-medium mb-3">Stepped Slider</h3>
            <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
              <div className="mb-4 max-w-lg">
                <Slider 
                  value={steppedValue} 
                  onChange={setSteppedValue} 
                  min={0}
                  max={100}
                  step={5}
                  showValue
                  showTooltip
                />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                A slider with step increment of 5 and tooltip display
              </p>
            </div>
          </div>
          
          {/* Different Sizes */}
          <div>
            <h3 className="text-lg font-medium mb-3">Size Variants</h3>
            <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 space-y-6">
              <div>
                <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">Small</p>
                <div className="max-w-lg">
                  <Slider 
                    value={30} 
                    size="small"
                  />
                </div>
              </div>
              <div>
                <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">Medium (Default)</p>
                <div className="max-w-lg">
                  <Slider 
                    value={50} 
                    size="medium"
                  />
                </div>
              </div>
              <div>
                <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">Large</p>
                <div className="max-w-lg">
                  <Slider 
                    value={70} 
                    size="large"
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Custom Styling */}
          <div>
            <h3 className="text-lg font-medium mb-3">Custom Styling</h3>
            <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
              <div className="mb-4 max-w-lg">
                <Slider 
                  value={customValue} 
                  onChange={setCustomValue} 
                  trackColor="bg-purple-500"
                  thumbColor="bg-purple-600"
                  showValue
                  showTooltip
                />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                A slider with custom purple styling
              </p>
            </div>
          </div>
          
          {/* Disabled Slider */}
          <div>
            <h3 className="text-lg font-medium mb-3">Disabled State</h3>
            <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
              <div className="mb-4 max-w-lg">
                <Slider 
                  value={60} 
                  disabled
                  showValue
                />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                A disabled slider that cannot be interacted with
              </p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-3">Common Use Cases</h3>
        <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
          <li>Volume or brightness controls</li>
          <li>Time scrubbing in media players</li>
          <li>Price range filters in e-commerce</li>
          <li>Image editing tool adjustments</li>
          <li>Setting numeric parameters in forms</li>
          <li>Data visualization range selectors</li>
        </ul>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-3">Technical Details</h3>
        <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <dt className="font-medium text-gray-900 dark:text-white">Alternative Names</dt>
            <dd className="mt-1 text-gray-700 dark:text-gray-300">Range Input, Track Bar, Range Slider, Scroller</dd>
          </div>
          <div>
            <dt className="font-medium text-gray-900 dark:text-white">Related Components</dt>
            <dd className="mt-1 text-gray-700 dark:text-gray-300">Progress Bar, Range Input, Number Input</dd>
          </div>
          <div>
            <dt className="font-medium text-gray-900 dark:text-white">Implementation</dt>
            <dd className="mt-1 text-gray-700 dark:text-gray-300">Uses React Hooks for state management and drag handling</dd>
          </div>
          <div>
            <dt className="font-medium text-gray-900 dark:text-white">Accessibility</dt>
            <dd className="mt-1 text-gray-700 dark:text-gray-300">Uses proper ARIA attributes and keyboard navigation</dd>
          </div>
        </dl>
      </div>
    </div>
  );
};

export default SliderDemo;
