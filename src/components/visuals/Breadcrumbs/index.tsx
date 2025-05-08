/**
 * Breadcrumbs Component
 * 
 * A secondary navigation that shows the user's current location within the site's hierarchy
 * and provides a trail of links to navigate back through the hierarchy.
 */
export default function Breadcrumbs() {
  return (
    <nav aria-label="Breadcrumb" className="w-full">
      <ol className="flex items-center space-x-2 text-sm">
        <li>
          <a 
            href="#" 
            className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
          >
            Home
          </a>
        </li>
        
        <li className="flex items-center">
          <span className="text-gray-500 mx-1">›</span>
          <a 
            href="#" 
            className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
          >
            Products
          </a>
        </li>
        
        <li className="flex items-center">
          <span className="text-gray-500 mx-1">›</span>
          <a 
            href="#" 
            className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
          >
            Electronics
          </a>
        </li>
        
        <li className="flex items-center">
          <span className="text-gray-500 mx-1">›</span>
          <span className="text-gray-800 dark:text-gray-200 font-medium" aria-current="page">
            Smartphones
          </span>
        </li>
      </ol>
    </nav>
  );
}
