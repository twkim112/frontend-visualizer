import Link from 'next/link';

export const metadata = {
  title: 'About | Frontend Visualizer',
  description: 'Learn about the Frontend Visualizer project, its purpose and vision',
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-8">About Frontend Visualizer</h1>
      
      <div className="prose dark:prose-invert prose-lg max-w-none">
        <p className="lead text-xl mb-6">
          Frontend Visualizer aims to bridge the gap between visual concepts and technical terminology in web development.
        </p>
        
        <h2 className="text-2xl font-bold mt-10 mb-4">Our Vision</h2>
        <p>
          Frontend Visualizer is an intuitive, static web-based catalog designed to empower &quot;vibe coders,&quot; designers, and developers who think visually. 
          The core mission is to bridge the often challenging gap between a conceptual visual idea for a user interface element or effect and its corresponding 
          technical name or classification.
        </p>
        
        <h2 className="text-2xl font-bold mt-10 mb-4">The Problem We're Solving</h2>
        <p>
          Many individuals know what they want a feature to look or feel like but may struggle to find the correct terminology to search for examples, 
          tutorials, or implementations. This project serves as a comprehensive visual dictionary, showcasing a wide array of frontend UI components, 
          interactive visual effects, and common interaction patterns.
        </p>
        
        <h2 className="text-2xl font-bold mt-10 mb-4">How It Works</h2>
        <p>
          Each item in the Frontend Visualizer is presented clearly with an emphasis on its visual appearance, allowing users to browse, discover, 
          and identify elements by sight. The catalog includes:
        </p>
        <ul>
          <li>Clear visual examples of each component</li>
          <li>Proper technical names and common aliases</li>
          <li>Brief descriptions of purpose and usage</li>
          <li>Categorization and tagging for easier discovery</li>
        </ul>
        
        <h2 className="text-2xl font-bold mt-10 mb-4">Future Development</h2>
        <p>
          The Frontend Visualizer is continuously evolving. Future enhancements may include:
        </p>
        <ul>
          <li>Expanded catalog with more components and effects</li>
          <li>Interactive examples where users can tweak parameters</li>
          <li>Code snippets for implementing components</li>
          <li>Advanced search capabilities</li>
          <li>Community contributions</li>
        </ul>
        
        <div className="mt-10 flex justify-center">
          <Link 
            href="/" 
            className="px-6 py-3 bg-foreground text-background rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            Explore the Catalog
          </Link>
        </div>
      </div>
    </div>
  );
}
