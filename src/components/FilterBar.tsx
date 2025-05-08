'use client';

import React from 'react';
import { Visual } from '@/data/visuals';

type Category = 'all' | Visual['category'];

interface FilterBarProps {
  categories: { id: Category; label: string }[];
  selectedCategory: Category;
  onCategoryChange: (category: Category) => void;
  tags: string[];
  selectedTags: string[];
  onTagToggle: (tag: string) => void;
  className?: string;
}

const FilterBar: React.FC<FilterBarProps> = ({
  categories,
  selectedCategory,
  onCategoryChange,
  tags,
  selectedTags,
  onTagToggle,
  className = '',
}) => {
  return (
    <div className={`space-y-4 ${className}`}>
      <div className="space-y-2">
        <h3 className="font-medium text-sm text-gray-500 dark:text-gray-400">Categories</h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
                selectedCategory === category.id
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {tags.length > 0 && (
        <div className="space-y-2">
          <h3 className="font-medium text-sm text-gray-500 dark:text-gray-400">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => onTagToggle(tag)}
                className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
                  selectedTags.includes(tag)
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterBar;
