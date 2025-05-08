/**
 * HoverEffect Component
 * 
 * Visual changes triggered when a user's mouse cursor hovers over an interactive element,
 * providing feedback and indicating interactivity.
 */
export default function HoverEffect() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {/* Scale Hover Effect */}
      <div className="group">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Scale Effect</h3>
        <div className="w-full h-32 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg transform transition-transform duration-300 group-hover:scale-105 flex items-center justify-center text-white font-medium">
          Hover me
        </div>
      </div>

      {/* Shadow Hover Effect */}
      <div className="group">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Shadow Effect</h3>
        <div className="w-full h-32 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm transition-shadow duration-300 group-hover:shadow-xl flex items-center justify-center text-gray-700 dark:text-gray-300 font-medium">
          Hover me
        </div>
      </div>

      {/* Color Change Hover Effect */}
      <div className="group">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Color Change</h3>
        <div className="w-full h-32 bg-gray-100 dark:bg-gray-800 rounded-lg transition-colors duration-300 group-hover:bg-blue-100 dark:group-hover:bg-blue-900 flex items-center justify-center text-gray-700 dark:text-gray-300 group-hover:text-blue-700 dark:group-hover:text-blue-300 font-medium">
          Hover me
        </div>
      </div>

      {/* Border Hover Effect */}
      <div className="group">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Border Effect</h3>
        <div className="w-full h-32 bg-white dark:bg-gray-800 rounded-lg border-2 border-gray-200 dark:border-gray-700 transition-colors duration-300 group-hover:border-blue-500 flex items-center justify-center text-gray-700 dark:text-gray-300 font-medium">
          Hover me
        </div>
      </div>
    </div>
  );
}
