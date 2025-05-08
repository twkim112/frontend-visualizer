import { visuals } from '@/data/visuals';
import VisualCard from '@/components/VisualCard';

export default function ContentCategoryPage() {
  const contentVisuals = visuals.filter(visual => visual.category === 'content');
  
  return (
    <div className="container mx-auto px-4 py-12">
      <header className="mb-12">
        <h1 className="text-3xl font-bold mb-4">Content Organization</h1>
        <p className="text-foreground/80 text-lg max-w-3xl">
          Content organization elements structure and present information to users in a clear, digestible format.
          These components help with information hierarchy, grouping related content, and improving scannability.
        </p>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {contentVisuals.map((visual) => (
          <VisualCard key={visual.slug} visual={visual} />
        ))}
      </div>
    </div>
  );
}
