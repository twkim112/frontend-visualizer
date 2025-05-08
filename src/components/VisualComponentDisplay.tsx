'use client';

// No React hooks needed for this component
import dynamic from 'next/dynamic';

interface VisualComponentDisplayProps {
  componentPath: string;
}

export default function VisualComponentDisplay({ componentPath }: VisualComponentDisplayProps) {
  // Dynamic import of the visual component
  const VisualComponent = dynamic(() => import(`@/components/${componentPath}`), {
    loading: () => <div className="h-60 w-full flex items-center justify-center">Loading component...</div>,
    ssr: false, // This is now fine since we're in a client component
  });

  return (
    <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-8 bg-white dark:bg-gray-950">
      <VisualComponent />
    </div>
  );
}
