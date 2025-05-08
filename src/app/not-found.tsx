import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[60vh]">
      <h1 className="text-4xl md:text-5xl font-bold mb-6">404</h1>
      <h2 className="text-2xl md:text-3xl font-semibold mb-6">Page Not Found</h2>
      
      <p className="text-lg text-foreground/70 mb-8 text-center max-w-md">
        The page you're looking for doesn't exist or has been moved.
      </p>
      
      <div className="flex gap-4">
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
          Browse Components
        </Link>
      </div>
    </div>
  );
}
