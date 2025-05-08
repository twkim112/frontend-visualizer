import { visuals } from '@/data/visuals';
import VisualCard from '@/components/VisualCard';

export default function NavigationCategoryPage() {
  const navigationVisuals = visuals.filter(visual => visual.category === 'navigation');
  
  return (
    <div className="container mx-auto px-4 py-12">
      <header className="mb-12">
        <h1 className="text-3xl font-bold mb-4">Navigation Elements</h1>
        <p className="text-foreground/80 text-lg max-w-3xl">
          Navigation systems guide users through the different sections, pages, or views of a digital product.
          These components help users understand where they are, where they can go, and how to get back.
        </p>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {navigationVisuals.map((visual) => (
          <VisualCard key={visual.slug} visual={visual} />
        ))}
      </div>
    </div>
  );
}
