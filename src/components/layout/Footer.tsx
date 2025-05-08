export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-background border-t border-gray-200 dark:border-gray-800 mt-auto py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-foreground/70">
              &copy; {currentYear} Frontend Visualizer - A visual dictionary for UI components
            </p>
          </div>
          
          <div className="flex space-x-6">
            <a 
              href="#" 
              className="text-sm text-foreground/70 hover:text-foreground transition-colors"
            >
              About
            </a>
            <a 
              href="#" 
              className="text-sm text-foreground/70 hover:text-foreground transition-colors"
            >
              Contribute
            </a>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-sm text-foreground/70 hover:text-foreground transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
