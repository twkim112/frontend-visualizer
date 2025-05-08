import { visuals } from '@/data/visuals';
import VisualCard from '@/components/VisualCard';

export default function FeedbackCategoryPage() {
  const feedbackVisuals = visuals.filter(visual => visual.category === 'feedback');
  
  return (
    <div className="container mx-auto px-4 py-12">
      <header className="mb-12">
        <h1 className="text-3xl font-bold mb-4">Feedback Elements</h1>
        <p className="text-foreground/80 text-lg max-w-3xl">
          Feedback elements communicate information, status, warnings, errors, or confirmations to users.
          These components help users understand the application state and the results of their actions.
        </p>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {feedbackVisuals.map((visual) => (
          <VisualCard key={visual.slug} visual={visual} />
        ))}
      </div>
    </div>
  );
}
