/**
 * Rating Component Index
 * 
 * Demonstrates different types of rating components used for collecting user feedback
 * and displaying ratings in various contexts.
 */
'use client';

import React, { useState } from 'react';
import Rating from './Rating';

const RatingDemo: React.FC = () => {
  const [basicRating, setBasicRating] = useState<number>(3);
  const [halfRating, setHalfRating] = useState<number>(3.5);
  const [readOnlyRating, setReadOnlyRating] = useState<number>(4.5);
  const [feedbackRating, setFeedbackRating] = useState<number>(0);
  const [customRating, setCustomRating] = useState<number>(2);
  
  // Feedback message based on rating
  const getFeedbackMessage = (rating: number) => {
    if (rating === 0) return 'Rate your experience';
    if (rating <= 1) return 'We\'re sorry to hear that!';
    if (rating <= 2) return 'We\'ll try to do better';
    if (rating <= 3) return 'Thanks for your feedback';
    if (rating <= 4) return 'We\'re glad you enjoyed it!';
    return 'Excellent! Thank you!';
  };
  
  // Custom heart filled icon
  const CustomHeartFilled = (
    <span className="text-pink-500">
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    </span>
  );
  
  // Custom heart empty icon
  const CustomHeartEmpty = (
    <span className="text-gray-300 dark:text-gray-600">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    </span>
  );
  
  return (
    <div className="space-y-12">
      <div>
        <h2 className="text-xl font-semibold mb-4">Rating</h2>
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          A rating component allows users to provide feedback or rate items on a numerical scale,
          typically displayed as stars, hearts, or other visual indicators. Ratings are commonly
          used in reviews, surveys, and product evaluations.
        </p>
        
        <div className="space-y-8">
          {/* Basic Rating */}
          <div>
            <h3 className="text-lg font-medium mb-3">Basic Rating</h3>
            <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
              <div className="mb-4">
                <Rating 
                  value={basicRating} 
                  onChange={setBasicRating} 
                  showValue
                />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Current rating: {basicRating} out of 5
              </p>
            </div>
          </div>
          
          {/* Half Rating */}
          <div>
            <h3 className="text-lg font-medium mb-3">Half Rating</h3>
            <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
              <div className="mb-4">
                <Rating 
                  value={halfRating} 
                  onChange={setHalfRating} 
                  allowHalf
                  showValue
                />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Allows selecting half-star values, current rating: {halfRating}
              </p>
            </div>
          </div>
          
          {/* Read-only Rating */}
          <div>
            <h3 className="text-lg font-medium mb-3">Read-only Rating</h3>
            <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
              <div className="flex items-center space-x-4">
                <Rating 
                  value={readOnlyRating} 
                  readOnly
                  allowHalf
                />
                <span className="text-gray-700 dark:text-gray-300">
                  4.5 out of 5
                </span>
              </div>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Read-only rating used for displaying ratings without user interaction
              </p>
            </div>
          </div>
          
          {/* Different Sizes */}
          <div>
            <h3 className="text-lg font-medium mb-3">Size Variants</h3>
            <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 space-y-4">
              <div>
                <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">Small</p>
                <Rating 
                  value={3} 
                  readOnly
                  size="small"
                />
              </div>
              <div>
                <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">Medium (Default)</p>
                <Rating 
                  value={3} 
                  readOnly
                  size="medium"
                />
              </div>
              <div>
                <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">Large</p>
                <Rating 
                  value={3} 
                  readOnly
                  size="large"
                />
              </div>
            </div>
          </div>
          
          {/* Different Icons */}
          <div>
            <h3 className="text-lg font-medium mb-3">Icon Variants</h3>
            <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 space-y-4">
              <div>
                <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">Stars (Default)</p>
                <Rating 
                  value={3.5} 
                  readOnly
                  allowHalf
                  icon="star"
                />
              </div>
              <div>
                <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">Hearts</p>
                <Rating 
                  value={3.5} 
                  readOnly
                  allowHalf
                  icon="heart"
                />
              </div>
              <div>
                <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">Circles</p>
                <Rating 
                  value={3.5} 
                  readOnly
                  allowHalf
                  icon="circle"
                />
              </div>
              <div>
                <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">Custom Icons</p>
                <Rating 
                  value={3.5} 
                  readOnly
                  allowHalf
                  icon="custom"
                  customFilledIcon={CustomHeartFilled}
                  customEmptyIcon={CustomHeartEmpty}
                />
              </div>
            </div>
          </div>
          
          {/* Feedback Pattern */}
          <div>
            <h3 className="text-lg font-medium mb-3">Feedback Pattern</h3>
            <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
              <div className="text-center space-y-4">
                <p className="font-medium">How was your experience?</p>
                <div className="flex justify-center">
                  <Rating 
                    value={feedbackRating} 
                    onChange={setFeedbackRating} 
                    size="large"
                    spacing="medium"
                  />
                </div>
                <p className={`text-${feedbackRating > 3 ? 'green' : feedbackRating > 0 ? 'blue' : 'gray'}-500 font-medium`}>
                  {getFeedbackMessage(feedbackRating)}
                </p>
                {feedbackRating > 0 && (
                  <button 
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    onClick={() => setFeedbackRating(0)}
                  >
                    Reset
                  </button>
                )}
              </div>
            </div>
          </div>
          
          {/* Custom Rating */}
          <div>
            <h3 className="text-lg font-medium mb-3">Custom Styling</h3>
            <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
              <Rating 
                value={customRating} 
                onChange={setCustomRating} 
                max={10}
                activeColor="text-purple-500"
                inactiveColor="text-gray-300"
                showValue
                spacing="medium"
              />
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                A 10-star rating with custom purple color
              </p>
            </div>
          </div>
          
          {/* Direction Variants */}
          <div>
            <h3 className="text-lg font-medium mb-3">Direction Variants</h3>
            <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 space-y-4">
              <div>
                <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">Left to Right (Default)</p>
                <Rating 
                  value={3} 
                  readOnly
                  direction="ltr"
                />
              </div>
              <div>
                <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">Right to Left</p>
                <Rating 
                  value={3} 
                  readOnly
                  direction="rtl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-3">Common Use Cases</h3>
        <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
          <li>Product and service reviews</li>
          <li>Customer satisfaction surveys</li>
          <li>User feedback forms</li>
          <li>App store ratings</li>
          <li>Content quality ratings (articles, videos, etc.)</li>
          <li>Displaying aggregated user ratings</li>
        </ul>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-3">Technical Details</h3>
        <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <dt className="font-medium text-gray-900 dark:text-white">Alternative Names</dt>
            <dd className="mt-1 text-gray-700 dark:text-gray-300">Star Rating, Review Stars, Rate Input, Feedback Stars</dd>
          </div>
          <div>
            <dt className="font-medium text-gray-900 dark:text-white">Related Components</dt>
            <dd className="mt-1 text-gray-700 dark:text-gray-300">Input, Slider, Like Button, Feedback Form</dd>
          </div>
          <div>
            <dt className="font-medium text-gray-900 dark:text-white">Implementation</dt>
            <dd className="mt-1 text-gray-700 dark:text-gray-300">Uses React Hooks for state management and Tailwind CSS for styling</dd>
          </div>
          <div>
            <dt className="font-medium text-gray-900 dark:text-white">Accessibility</dt>
            <dd className="mt-1 text-gray-700 dark:text-gray-300">Uses proper aria-checked and radiogroup roles for screen reader support</dd>
          </div>
        </dl>
      </div>
    </div>
  );
};

export default RatingDemo;
