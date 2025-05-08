import { visuals } from '@/data/visuals';
import VisualCard from '@/components/VisualCard';

export default function AnimationCategoryPage() {
  const animationVisuals = visuals.filter(visual => visual.category === 'animation');
  
  return (
    <div className="container mx-auto px-4 py-12">
      <header className="mb-12">
        <h1 className="text-3xl font-bold mb-4">Animations & Effects</h1>
        <p className="text-foreground/80 text-lg max-w-3xl">
          Animations and visual effects add motion, interactivity, and visual feedback to user interfaces.
          These elements enhance user experience, guide attention, and provide context for state changes.
        </p>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {animationVisuals.map((visual) => (
          <VisualCard key={visual.slug} visual={visual} />
        ))}
      </div>
    </div>
  );
}
