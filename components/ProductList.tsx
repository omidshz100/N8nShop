'use client';

import { useState, useEffect } from 'react';
import { Edit, Trash2, Eye, DollarSign, Clock, Target, Star, TrendingUp } from 'lucide-react';
import type { Product } from '@/lib/products';
import { ProductEditModal } from './ProductEditModal';

interface ProductListProps {
  refreshTrigger: number;
}

export function ProductList({ refreshTrigger }: ProductListProps) {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    loadProducts();
  }, [refreshTrigger]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/products');
      const result = await response.json();
      
      if (result.success) {
        setAllProducts(result.data);
      } else {
        console.error('Failed to load products:', result.error);
        setAllProducts([]);
      }
    } catch (error) {
      console.error('Error loading products:', error);
      setAllProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditingProduct(null);
  };

  const handleSaveProduct = () => {
    loadProducts(); // Refresh the product list
  };

  const handleDeleteProduct = async (productId: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      try {
        const response = await fetch(`/api/products/${productId}`, {
          method: 'DELETE',
        });
        
        const result = await response.json();
        
        if (result.success) {
          // Reload products after successful deletion
          loadProducts();
        } else {
          alert(`Error: ${result.error}`);
        }
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('Error deleting product. Please try again.');
      }
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const isCustomProduct = (productId: string) => {
    return productId.startsWith('product-');
  };

  const canDeleteProduct = (product: Product) => {
    // Can delete if it's a custom product OR if it's an edited default product in database
    return isCustomProduct(product.id);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">All Products</h2>
        <p className="text-gray-600">
          Total: {allProducts.length} products
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
            {/* Product Image */}
            <div className="relative">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-40 object-cover"
              />
              {product.popular && (
                <div className="absolute top-2 left-2">
                  <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    Popular
                  </span>
                </div>
              )}
              {product.featured && (
                <div className="absolute top-2 right-2">
                  <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                    <Star className="w-3 h-3" />
                    Featured
                  </span>
                </div>
              )}
              {isCustomProduct(product.id) ? (
                <div className="absolute bottom-2 left-2">
                  <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                    Custom
                  </span>
                </div>
              ) : (
                <div className="absolute bottom-2 left-2">
                  <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                    Default
                  </span>
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${getDifficultyColor(product.difficulty)}`}>
                  <Target className="w-3 h-3 inline mr-1" />
                  {product.difficulty}
                </span>
                <span className="text-xs text-gray-500 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {product.setupTime}
                </span>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2">
                {product.title}
              </h3>
              
              <p className="text-sm text-gray-500 mb-2">{product.category}</p>
              
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                {product.short}
              </p>

              <div className="flex items-center justify-between mb-4">
                <div className="text-xl font-bold text-gray-900 flex items-center">
                  <DollarSign className="w-4 h-4" />
                  {product.price}
                  <span className="text-sm font-normal text-gray-500 ml-1">
                    {product.currency}
                  </span>
                </div>
                <div className="text-sm text-gray-500">
                  {product.features.length} features
                </div>
              </div>

              {/* Tags */}
              {product.tags.length > 0 && (
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {product.tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                    {product.tags.length > 3 && (
                      <span className="text-xs text-gray-400">
                        +{product.tags.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-sm bg-blue-50 text-blue-600 hover:bg-blue-100 rounded transition-colors"
                  onClick={() => window.open(`/`, '_blank')}
                >
                  <Eye className="w-4 h-4" />
                  View
                </button>
                
                <button
                  className="flex items-center justify-center gap-1 px-3 py-2 text-sm bg-gray-50 text-gray-600 hover:bg-gray-100 rounded transition-colors"
                  onClick={() => handleEditProduct(product)}
                >
                  <Edit className="w-4 h-4" />
                </button>
                
                {canDeleteProduct(product) && (
                  <button
                    className="flex items-center justify-center gap-1 px-3 py-2 text-sm bg-red-50 text-red-600 hover:bg-red-100 rounded transition-colors"
                    onClick={() => handleDeleteProduct(product.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {allProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No products found.</p>
          <p className="text-gray-400 text-sm mt-2">Add your first product to get started!</p>
        </div>
      )}

      {/* Edit Modal */}
      <ProductEditModal
        product={editingProduct}
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        onSave={handleSaveProduct}
      />
    </div>
  );
}
