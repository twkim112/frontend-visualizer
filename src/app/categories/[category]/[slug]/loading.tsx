export default function ComponentLoading() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Breadcrumb Skeleton */}
      <div className="mb-8 flex items-center space-x-2">
        <div className="h-5 w-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        <div className="h-5 w-2 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        <div className="h-5 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        <div className="h-5 w-2 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        <div className="h-5 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
      </div>
      
      {/* Title Skeleton */}
      <div className="mb-4 h-8 w-64 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
      
      {/* Alt Names Skeleton */}
      <div className="mb-6 h-6 w-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
      
      {/* Description Skeleton */}
      <div className="mb-10 space-y-2">
        <div className="h-6 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        <div className="h-6 w-11/12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        <div className="h-6 w-4/5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
      </div>
      
      {/* Tags Skeleton */}
      <div className="mb-10 flex flex-wrap gap-2">
        <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
        <div className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
        <div className="h-6 w-24 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
      </div>
      
      {/* Visual Example Skeleton */}
      <div className="mb-16">
        <div className="mb-6 h-7 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-8">
          <div className="h-60 bg-gray-100 dark:bg-gray-900 rounded animate-pulse flex items-center justify-center">
            <div className="h-8 w-36 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
      
      {/* Related Components Skeleton */}
      <div>
        <div className="mb-6 h-7 w-40 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div 
              key={i}
              className="border border-gray-200 dark:border-gray-800 rounded-lg p-6"
            >
              <div className="h-6 w-32 mb-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              <div className="h-4 w-full mb-1 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              <div className="h-4 w-4/5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
