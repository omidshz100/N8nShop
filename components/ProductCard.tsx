'use client';

import { useState } from 'react';
import { useCart } from './CartContext';
import { ExternalLink, Info, Clock, Star, TrendingUp } from 'lucide-react';
import { ProductModal } from './ProductModal';
import type { Product } from '@/lib/products';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addToCart } = useCart();

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 h-full flex flex-col relative">
        {product.popular && (
          <div className="absolute top-2 left-2 z-10">
            <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              Popular
            </span>
          </div>
        )}
        {product.featured && (
          <div className="absolute top-2 right-2 z-10">
            <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
              <Star className="w-3 h-3" />
              Featured
            </span>
          </div>
        )}
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-48 object-cover"
        />
        <div className="p-6 flex-1 flex flex-col">
          <div className="flex items-center gap-2 mb-2">
            <span className={`text-xs px-2 py-1 rounded-full font-medium ${getDifficultyColor(product.difficulty)}`}>
              {product.difficulty}
            </span>
            <span className="text-xs text-gray-500 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {product.setupTime}
            </span>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{product.title}</h3>
          <p className="text-sm text-gray-500 mb-2">{product.category}</p>
          <p className="text-gray-600 mb-4 flex-1">{product.short}</p>
          <div className="text-2xl font-bold text-gray-900 mb-4">
            ${product.price} <span className="text-sm font-normal text-gray-500">{product.currency}</span>
          </div>
          <div className="space-y-2">
            <button
              className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <Info className="w-4 h-4" />
              More Details
            </button>
          </div>
        </div>
      </div>

      <ProductModal
        product={product}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}