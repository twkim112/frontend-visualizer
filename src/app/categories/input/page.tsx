import { visuals } from '@/data/visuals';
import VisualCard from '@/components/VisualCard';

export default function InputCategoryPage() {
  const inputVisuals = visuals.filter(visual => visual.category === 'input');
  
  return (
    <div className="container mx-auto px-4 py-12">
      <header className="mb-12">
        <h1 className="text-3xl font-bold mb-4">Input Controls</h1>
        <p className="text-foreground/80 text-lg max-w-3xl">
          Input controls allow users to interact with and provide data to applications.
          These components facilitate user actions, selections, and data entry across digital interfaces.
        </p>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {inputVisuals.map((visual) => (
          <VisualCard key={visual.slug} visual={visual} />
        ))}
      </div>
    </div>
  );
}
