import Link from 'next/link';

export default function CategoryNotFound() {
  return (
    <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[60vh]">
      <h1 className="text-3xl md:text-4xl font-bold mb-6">Category Not Found</h1>
      
      <p className="text-lg text-foreground/70 mb-8 text-center max-w-md">
        The category you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      
      <div className="flex flex-wrap gap-4 justify-center">
        <Link 
          href="/"
          className="px-6 py-3 bg-foreground text-background rounded-lg font-medium hover:opacity-90 transition-opacity"
        >
          Go Home
        </Link>
        
        <Link 
          href="/categories/navigation"
          className="px-6 py-3 border border-foreground/20 rounded-lg font-medium hover:border-foreground/40 transition-colors"
        >
          Navigation Components
        </Link>
        
        <Link 
          href="/categories/input"
          className="px-6 py-3 border border-foreground/20 rounded-lg font-medium hover:border-foreground/40 transition-colors"
        >
          Input Components
        </Link>
      </div>
    </div>
  );
}
