import { notFound } from 'next/navigation';
import Link from 'next/link';
import { visuals } from '@/data/visuals';
import VisualComponentDisplay from '@/components/VisualComponentDisplay';

export function generateStaticParams() {
  return visuals.map(visual => ({
    category: visual.category,
    slug: visual.slug,
  }));
}

export default function ComponentDetailPage({ 
  params 
}: { 
  params: { category: string; slug: string } 
}) {
  const visual = visuals.find(v => 
    v.category === params.category && v.slug === params.slug
  );
  
  if (!visual) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Breadcrumb Navigation */}
      <nav className="mb-8 text-sm">
        <ol className="flex items-center space-x-2">
          <li>
            <Link href="/" className="text-blue-600 dark:text-blue-400 hover:underline">
              Home
            </Link>
          </li>
          <li className="text-foreground/60">›</li>
          <li>
            <Link 
              href={`/categories/${visual.category}`}
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              {visual.category.charAt(0).toUpperCase() + visual.category.slice(1)}
            </Link>
          </li>
          <li className="text-foreground/60">›</li>
          <li className="text-foreground/60">{visual.name}</li>
        </ol>
      </nav>
      
      {/* Component Header */}
      <header className="mb-10">
        <h1 className="text-4xl font-bold mb-4">{visual.name}</h1>
        
        {visual.altNames && visual.altNames.length > 0 && (
          <div className="text-lg text-foreground/60 mb-6">
            Also known as: {visual.altNames.join(', ')}
          </div>
        )}
        
        <p className="text-xl text-foreground/80 max-w-3xl">
          {visual.description}
        </p>
      </header>
      
      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-10">
        {visual.tags.map(tag => (
          <span 
            key={tag}
            className="inline-block text-sm bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-foreground/70"
          >
            {tag}
          </span>
        ))}
      </div>
      
      {/* Visual Component Demo */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6">Visual Example</h2>
        <VisualComponentDisplay componentPath={`visuals/${visual.category}/${visual.slug}`} />
      </section>
      
      {/* Related Components Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">Related Components</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {visuals
            .filter(v => 
              v.category === visual.category && 
              v.slug !== visual.slug
            )
            .slice(0, 3)
            .map(relatedVisual => (
              <Link 
                key={relatedVisual.slug}
                href={`/categories/${relatedVisual.category}/${relatedVisual.slug}`}
                className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <h3 className="font-semibold mb-2">{relatedVisual.name}</h3>
                <p className="text-sm text-foreground/70 line-clamp-2">
                  {relatedVisual.description}
                </p>
              </Link>
            ))}
        </div>
      </section>
    </div>
  );
}
