/**
 * Button Component
 * 
 * An interactive element that triggers an action when clicked.
 * Buttons are one of the most fundamental UI controls for user interaction.
 */
'use client';

export default function Button() {
  return (
    <div className="flex flex-col gap-6 items-start">
      {/* Primary Button */}
      <div className="space-y-2 w-full">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Primary</h3>
        <div className="flex flex-wrap gap-4">
          <button 
            className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            onClick={() => console.log('Primary button clicked')}
          >
            Primary Button
          </button>
          
          <button 
            className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md opacity-70 cursor-not-allowed"
            disabled
          >
            Disabled
          </button>
        </div>
      </div>
      
      {/* Secondary Button */}
      <div className="space-y-2 w-full">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Secondary</h3>
        <div className="flex flex-wrap gap-4">
          <button 
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white font-medium rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-colors"
            onClick={() => console.log('Secondary button clicked')}
          >
            Secondary Button
          </button>
          
          <button 
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 font-medium rounded-md cursor-not-allowed"
            disabled
          >
            Disabled
          </button>
        </div>
      </div>
      
      {/* Outline Button */}
      <div className="space-y-2 w-full">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Outline</h3>
        <div className="flex flex-wrap gap-4">
          <button 
            className="px-4 py-2 border border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400 font-medium rounded-md hover:bg-blue-50 dark:hover:bg-blue-900/20 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            onClick={() => console.log('Outline button clicked')}
          >
            Outline Button
          </button>
          
          <button 
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-400 dark:text-gray-500 font-medium rounded-md cursor-not-allowed"
            disabled
          >
            Disabled
          </button>
        </div>
      </div>
    </div>
  );
}
