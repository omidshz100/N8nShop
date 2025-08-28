'use client';

import { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { categories } from '@/lib/products';

interface ProductFiltersProps {
  onCategoryChange: (category: string) => void;
  onSearchChange: (query: string) => void;
  onDifficultyChange: (difficulty: string) => void;
  onPriceRangeChange: (min: number, max: number) => void;
  onShowPopularOnly: (show: boolean) => void;
  selectedCategory: string;
  searchQuery: string;
  selectedDifficulty: string;
  showPopularOnly: boolean;
  priceRange: { min: number; max: number };
}

export function ProductFilters({
  onCategoryChange,
  onSearchChange,
  onDifficultyChange,
  onPriceRangeChange,
  onShowPopularOnly,
  selectedCategory,
  searchQuery,
  selectedDifficulty,
  showPopularOnly,
  priceRange
}: ProductFiltersProps) {
  const [showFilters, setShowFilters] = useState(false);

  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  const clearFilters = () => {
    onCategoryChange('All');
    onSearchChange('');
    onDifficultyChange('All');
    onPriceRangeChange(0, 200);
    onShowPopularOnly(false);
  };

  const hasActiveFilters = selectedCategory !== 'All' || searchQuery !== '' || 
    selectedDifficulty !== 'All' || showPopularOnly || 
    priceRange.min !== 0 || priceRange.max !== 200;

  return (
    <div className="mb-8">
      {/* Search Bar */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search workspaces..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Filter Toggle Button */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <Filter className="w-4 h-4" />
          Filters
          {hasActiveFilters && (
            <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
              Active
            </span>
          )}
        </button>

        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <X className="w-4 h-4" />
            Clear all
          </button>
        )}
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="bg-gray-50 rounded-lg p-6 space-y-6">
          {/* Category Filter */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Category</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => onCategoryChange(category)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Difficulty Filter */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Difficulty</h3>
            <div className="flex flex-wrap gap-2">
              {difficulties.map((difficulty) => (
                <button
                  key={difficulty}
                  onClick={() => onDifficultyChange(difficulty)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedDifficulty === difficulty
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                  }`}
                >
                  {difficulty}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Price Range</h3>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">$</span>
                <input
                  type="number"
                  min="0"
                  max="200"
                  value={priceRange.min}
                  onChange={(e) => onPriceRangeChange(parseInt(e.target.value) || 0, priceRange.max)}
                  className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                />
              </div>
              <span className="text-gray-400">to</span>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">$</span>
                <input
                  type="number"
                  min="0"
                  max="200"
                  value={priceRange.max}
                  onChange={(e) => onPriceRangeChange(priceRange.min, parseInt(e.target.value) || 200)}
                  className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                />
              </div>
            </div>
          </div>

          {/* Popular Only Toggle */}
          <div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={showPopularOnly}
                onChange={(e) => onShowPopularOnly(e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700">Show popular only</span>
            </label>
          </div>
        </div>
      )}
    </div>
  );
}