'use client';

import { useState, useEffect } from 'react';
import { ProductFilters } from './ProductFilters';
import { ProductGrid } from './ProductGrid';
import { 
  products, 
  getProductsByCategory, 
  searchProducts, 
  getProductsByDifficulty,
  getProductsByPriceRange,
  getPopularProducts 
} from '@/lib/products';
import type { Product } from '@/lib/products';

export function Catalog() {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [showPopularOnly, setShowPopularOnly] = useState(false);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 200 });

  useEffect(() => {
    let filtered = products;

    // Apply search filter
    if (searchQuery) {
      filtered = searchProducts(searchQuery);
    }

    // Apply category filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Apply difficulty filter
    if (selectedDifficulty !== 'All') {
      filtered = filtered.filter(product => product.difficulty === selectedDifficulty);
    }

    // Apply price range filter
    filtered = filtered.filter(product => 
      product.price >= priceRange.min && product.price <= priceRange.max
    );

    // Apply popular filter
    if (showPopularOnly) {
      filtered = filtered.filter(product => product.popular);
    }

    setFilteredProducts(filtered);
  }, [selectedCategory, searchQuery, selectedDifficulty, showPopularOnly, priceRange]);

  return (
    <section id="catalog" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            n8n Workspace Catalog
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose from our extensive collection of {products.length}+ production-ready n8n workflows. 
            Each workspace includes complete documentation, setup guides, and 30-day support.
          </p>
        </div>

        <ProductFilters
          onCategoryChange={setSelectedCategory}
          onSearchChange={setSearchQuery}
          onDifficultyChange={setSelectedDifficulty}
          onPriceRangeChange={(min, max) => setPriceRange({ min, max })}
          onShowPopularOnly={setShowPopularOnly}
          selectedCategory={selectedCategory}
          searchQuery={searchQuery}
          selectedDifficulty={selectedDifficulty}
          showPopularOnly={showPopularOnly}
          priceRange={priceRange}
        />

        <ProductGrid products={filteredProducts} itemsPerPage={12} />
      </div>
    </section>
  );
}