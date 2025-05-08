'use client';

import React, { useState, useEffect } from 'react';
import { visuals, Visual } from '@/data/visuals';
import VisualCard from '@/components/VisualCard';
import FilterBar from '@/components/FilterBar';

type Category = 'all' | Visual['category'];

export default function ExplorePage() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [filteredVisuals, setFilteredVisuals] = useState<Visual[]>(visuals);
  const [allTags, setAllTags] = useState<string[]>([]);

  // Get categories for the filter
  const categories = [
    { id: 'all' as Category, label: 'All Components' },
    { id: 'navigation' as Category, label: 'Navigation' },
    { id: 'input' as Category, label: 'Input' },
    { id: 'feedback' as Category, label: 'Feedback' },
    { id: 'content' as Category, label: 'Content' },
    { id: 'animation' as Category, label: 'Animation' }
  ];

  // Extract all unique tags from visuals on component mount
  useEffect(() => {
    const tags = new Set<string>();
    visuals.forEach(visual => {
      visual.tags.forEach(tag => tags.add(tag));
    });
    
    setAllTags(Array.from(tags).sort());
  }, []);

  // Apply filters when selected category or tags change
  useEffect(() => {
    let filtered = visuals;
    
    // Filter by category if not 'all'
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(visual => visual.category === selectedCategory);
    }
    
    // Filter by selected tags if any
    if (selectedTags.length > 0) {
      filtered = filtered.filter(visual => 
        selectedTags.every(tag => visual.tags.includes(tag))
      );
    }
    
    setFilteredVisuals(filtered);
  }, [selectedCategory, selectedTags]);

  const handleCategoryChange = (category: Category) => {
    setSelectedCategory(category);
  };

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prevTags => 
      prevTags.includes(tag)
        ? prevTags.filter(t => t !== tag)
        : [...prevTags, tag]
    );
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <header className="mb-12">
        <h1 className="text-3xl font-bold mb-4">Explore UI Components</h1>
        <p className="text-foreground/80 text-lg max-w-3xl">
          Browse, filter, and discover frontend UI components and animations. Use the filters below to narrow down by category and tags.
        </p>
      </header>
      
      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-64 lg:w-72 shrink-0">
          <FilterBar
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
            tags={allTags}
            selectedTags={selectedTags}
            onTagToggle={handleTagToggle}
            className="sticky top-24"
          />
        </aside>
        
        <div className="flex-1">
          <div className="mb-4">
            <p className="text-foreground/70">
              Showing {filteredVisuals.length} component{filteredVisuals.length === 1 ? '' : 's'}
            </p>
          </div>
          
          {filteredVisuals.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVisuals.map((visual) => (
                <VisualCard key={visual.slug} visual={visual} />
              ))}
            </div>
          ) : (
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 text-center">
              <h3 className="text-xl font-semibold mb-2">No components found</h3>
              <p className="text-foreground/70 mb-4">
                Try adjusting your filters to see more results.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedTags([]);
                }}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
