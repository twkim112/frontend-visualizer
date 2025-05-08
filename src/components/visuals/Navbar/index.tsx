/**
 * Navbar Component
 * 
 * A horizontal bar typically placed at the top of a page containing navigation links, site branding,
 * and sometimes search functionality. This is one of the most common navigation patterns in web design.
 */
export default function Navbar() {
  return (
    <nav className="bg-white dark:bg-gray-800 shadow px-4 py-3 w-full">
      <div className="flex justify-between items-center">
        {/* Logo/Brand Area */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center">
            <span className="text-white font-bold text-xl">V</span>
          </div>
          <span className="font-semibold text-lg">Visualizer</span>
        </div>
        
        {/* Navigation Links - Desktop */}
        <div className="hidden md:flex items-center space-x-8">
          <a href="#" className="font-medium text-blue-600 dark:text-blue-400">Home</a>
          <a href="#" className="font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Components</a>
          <a href="#" className="font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Documentation</a>
          <a href="#" className="font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Resources</a>
        </div>
        
        {/* Action Buttons */}
        <div className="flex items-center space-x-3">
          <button className="hidden md:block px-4 py-1.5 text-sm font-medium border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            Log in
          </button>
          <button className="px-4 py-1.5 text-sm font-medium bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            Sign up
          </button>
        </div>
      </div>
    </nav>
  );
}
