import Link from 'next/link';
import { Visual } from '@/data/visuals';

interface VisualCardProps {
  visual: Visual;
}

export default function VisualCard({ visual }: VisualCardProps) {
  return (
    <Link 
      href={`/categories/${visual.category}/${visual.slug}`}
      className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 hover:shadow-md transition-shadow block"
    >
      <h3 className="text-xl font-semibold mb-2">{visual.name}</h3>
      
      {visual.altNames && visual.altNames.length > 0 && (
        <div className="text-sm text-foreground/60 mb-4">
          Also known as: {visual.altNames.join(', ')}
        </div>
      )}
      
      <p className="text-foreground/70 mb-4 line-clamp-2">
        {visual.description}
      </p>
      
      <div className="flex flex-wrap gap-2 mt-auto">
        {visual.tags.map((tag) => (
          <span 
            key={tag} 
            className="inline-block text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full text-foreground/70"
          >
            {tag}
          </span>
        ))}
      </div>
    </Link>
  );
}
