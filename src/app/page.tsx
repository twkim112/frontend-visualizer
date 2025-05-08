import Link from 'next/link';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="py-16 mb-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Frontend Visualizer</h1>
        <p className="text-xl text-foreground/80 max-w-3xl mx-auto mb-10">
          A visual dictionary for UI components and effects. Find the technical name for that visual element you're thinking of but can't quite describe.  
        </p>
        
        <div className="flex flex-wrap gap-4 justify-center">
          <Link 
            href="/categories/navigation" 
            className="px-6 py-3 bg-foreground text-background rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            Browse Components
          </Link>
          
          <Link 
            href="/about" 
            className="px-6 py-3 border border-foreground/20 rounded-lg font-medium hover:border-foreground/40 transition-colors"
          >
            Learn More
          </Link>
        </div>
      </section>
      
      {/* Category Previews */}
      <section>
        <h2 className="text-2xl font-bold mb-8 text-center">Explore Categories</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Navigation Category */}
          <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 hover:shadow-md transition-shadow">
            <h3 className="text-xl font-semibold mb-3">Navigation</h3>
            <p className="text-foreground/70 mb-4">Menus, tabs, breadcrumbs, and other navigation patterns.</p>
            <Link 
              href="/categories/navigation" 
              className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
            >
              View Navigation Elements →
            </Link>
          </div>
          
          {/* Input Category */}
          <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 hover:shadow-md transition-shadow">
            <h3 className="text-xl font-semibold mb-3">Input Controls</h3>
            <p className="text-foreground/70 mb-4">Buttons, form elements, and interactive controls.</p>
            <Link 
              href="/categories/input" 
              className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
            >
              View Input Elements →
            </Link>
          </div>
          
          {/* Animation Category */}
          <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 hover:shadow-md transition-shadow">
            <h3 className="text-xl font-semibold mb-3">Animations & Effects</h3>
            <p className="text-foreground/70 mb-4">Transitions, hover effects, and visual animations.</p>
            <Link 
              href="/categories/animation" 
              className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
            >
              View Animation Elements →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
