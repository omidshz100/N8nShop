'use client';

import { useState } from 'react';
import { ProductForm } from '@/components/ProductForm';
import { ProductList } from '@/components/ProductList';
import { Plus, Package } from 'lucide-react';

export default function AdminPage() {
  const [showForm, setShowForm] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleProductAdded = () => {
    setShowForm(false);
    setRefreshTrigger(prev => prev + 1); // Trigger refresh of product list
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Package className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Product Management</h1>
                <p className="text-gray-600">Add and manage your N8N automation products</p>
              </div>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
            >
              <Plus className="w-5 h-5" />
              Add Product
            </button>
          </div>
        </div>

        {/* Product Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <ProductForm 
                onClose={() => setShowForm(false)}
                onProductAdded={handleProductAdded}
              />
            </div>
          </div>
        )}

        {/* Product List */}
        <ProductList refreshTrigger={refreshTrigger} />
      </div>
    </div>
  );
}
