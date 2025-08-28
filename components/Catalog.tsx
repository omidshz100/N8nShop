'use client';

import { useState, useEffect } from 'react';
import { ProductFilters } from './ProductFilters';
import { ProductGrid } from './ProductGrid';
import type { Product } from '@/lib/products';

export function Catalog() {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [showPopularOnly, setShowPopularOnly] = useState(false);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 200 });
  const [loading, setLoading] = useState(true);

  // Load all products from API on component mount
  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const response = await fetch('/api/products');
      const result = await response.json();
      
      if (result.success) {
        setAllProducts(result.data);
        setFilteredProducts(result.data);
      } else {
        console.error('Failed to load products:', result.error);
      }
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let filtered = allProducts;

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.short.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
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
  }, [allProducts, selectedCategory, searchQuery, selectedDifficulty, showPopularOnly, priceRange]);

  if (loading) {
    return (
      <section id="catalog" className="pt-6 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-gray-600">Loading products...</span>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="catalog" className="pt-6 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Catalog header section removed as requested */}

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