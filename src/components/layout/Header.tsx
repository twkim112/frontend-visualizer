import Link from 'next/link';
import ThemeSwitcher from './ThemeSwitcher';
import SearchBar from '../SearchBar';

export default function Header() {
  return (
    <header className="bg-background border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex flex-col sm:flex-row items-center w-full md:w-auto gap-4">
          <Link href="/" className="text-2xl font-bold text-foreground hover:opacity-80 transition-opacity">
            Frontend Visualizer
          </Link>
          <div className="w-full sm:w-64 md:w-80">
            <SearchBar />
          </div>
        </div>
        
        <nav className="flex items-center">
          <ul className="flex space-x-6">
            <li>
              <Link href="/explore" className="text-foreground/80 hover:text-foreground transition-colors font-medium">
                Explore All
              </Link>
            </li>
            <li>
              <Link href="/categories/navigation" className="text-foreground/80 hover:text-foreground transition-colors">
                Navigation
              </Link>
            </li>
            <li>
              <Link href="/categories/input" className="text-foreground/80 hover:text-foreground transition-colors">
                Input
              </Link>
            </li>
            <li>
              <Link href="/categories/feedback" className="text-foreground/80 hover:text-foreground transition-colors">
                Feedback
              </Link>
            </li>
            <li>
              <Link href="/categories/content" className="text-foreground/80 hover:text-foreground transition-colors">
                Content
              </Link>
            </li>
            <li>
              <Link href="/categories/animation" className="text-foreground/80 hover:text-foreground transition-colors">
                Animation
              </Link>
            </li>
          </ul>
          <div className="ml-6">
            <ThemeSwitcher />
          </div>
        </nav>
      </div>
    </header>
  );
}
