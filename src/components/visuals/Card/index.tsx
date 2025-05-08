/**
 * Card Component
 * 
 * A container for displaying related content, typically with a title, body, and sometimes an image or actions.
 * Cards are often used in grid layouts to present collections of similar content.
 */
export default function Card() {
  return (
    <div className="space-y-6">
      {/* Basic Card */}
      <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md border border-gray-200 dark:border-gray-700 max-w-sm">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Card Title
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            This is a basic card component with a title and content. Cards are versatile containers for related information.
          </p>
          <button className="text-blue-600 dark:text-blue-400 hover:underline font-medium text-sm">
            Learn More →
          </button>
        </div>
      </div>
      
      {/* Card with Image */}
      <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md border border-gray-200 dark:border-gray-700 max-w-sm">
        <div className="h-48 bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center">
          <svg className="h-20 w-20 text-white opacity-75" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Card with Image
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Cards often include images to provide visual context for the content they contain.
          </p>
          <div className="flex justify-end">
            <button className="bg-blue-600 text-white px-4 py-1.5 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors">
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
