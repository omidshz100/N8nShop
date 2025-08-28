'use client';

import { useState } from 'react';
import { X, Upload, DollarSign, Clock, Target, Tag, Star } from 'lucide-react';
import type { Product } from '@/lib/products';

interface ProductFormProps {
  onClose: () => void;
  onProductAdded: () => void;
}

export function ProductForm({ onClose, onProductAdded }: ProductFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    currency: 'USD' as const,
    short: '',
    features: [''],
    image: '',
    stripeUrl: '',
    category: '',
    tags: [''],
    difficulty: 'Beginner' as 'Beginner' | 'Intermediate' | 'Advanced',
    setupTime: '',
    popular: false,
    featured: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleArrayInputChange = (index: number, value: string, field: 'features' | 'tags') => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const addArrayItem = (field: 'features' | 'tags') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeArrayItem = (index: number, field: 'features' | 'tags') => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate required fields
      if (!formData.title || !formData.price || !formData.short || !formData.category || !formData.difficulty || !formData.setupTime) {
        alert('Please fill in all required fields');
        return;
      }

      // Send to API
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formData.title,
          price: formData.price,
          currency: formData.currency,
          short: formData.short,
          features: formData.features.filter(f => f.trim() !== ''),
          image: formData.image,
          stripeUrl: formData.stripeUrl,
          category: formData.category,
          tags: formData.tags.filter(t => t.trim() !== ''),
          difficulty: formData.difficulty,
          setupTime: formData.setupTime,
          popular: formData.popular,
          featured: formData.featured
        }),
      });

      const result = await response.json();

      if (result.success) {
        onProductAdded();
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Error adding product. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Add New Product</h2>
        <button
          onClick={onClose}
          className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Salesforce to Slack Integration"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category *
            </label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., CRM & Sales"
            />
          </div>
        </div>

        {/* Price and Setup Time */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <DollarSign className="w-4 h-4 inline mr-1" />
              Price *
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              required
              min="0"
              step="0.01"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="29.99"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Target className="w-4 h-4 inline mr-1" />
              Difficulty
            </label>
            <select
              name="difficulty"
              value={formData.difficulty}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Clock className="w-4 h-4 inline mr-1" />
              Setup Time
            </label>
            <input
              type="text"
              name="setupTime"
              value={formData.setupTime}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., 15 minutes"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Short Description *
          </label>
          <textarea
            name="short"
            value={formData.short}
            onChange={handleInputChange}
            required
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Brief description of what this automation does..."
          />
        </div>

        {/* Image URL */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Upload className="w-4 h-4 inline mr-1" />
            Image URL
          </label>
          <input
            type="url"
            name="image"
            value={formData.image}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="https://example.com/image.jpg"
          />
        </div>

        {/* Stripe URL */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Stripe Payment URL
          </label>
          <input
            type="url"
            name="stripeUrl"
            value={formData.stripeUrl}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="https://buy.stripe.com/..."
          />
        </div>

        {/* Features */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Features
          </label>
          {formData.features.map((feature, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                value={feature}
                onChange={(e) => handleArrayInputChange(index, e.target.value, 'features')}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Feature description..."
              />
              {formData.features.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeArrayItem(index, 'features')}
                  className="px-3 py-2 text-red-600 hover:text-red-800"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayItem('features')}
            className="text-blue-600 hover:text-blue-800 text-sm"
          >
            + Add Feature
          </button>
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Tag className="w-4 h-4 inline mr-1" />
            Tags
          </label>
          {formData.tags.map((tag, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                value={tag}
                onChange={(e) => handleArrayInputChange(index, e.target.value, 'tags')}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Tag..."
              />
              {formData.tags.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeArrayItem(index, 'tags')}
                  className="px-3 py-2 text-red-600 hover:text-red-800"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayItem('tags')}
            className="text-blue-600 hover:text-blue-800 text-sm"
          >
            + Add Tag
          </button>
        </div>

        {/* Checkboxes */}
        <div className="flex gap-6">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="popular"
              checked={formData.popular}
              onChange={handleInputChange}
              className="mr-2"
            />
            <Star className="w-4 h-4 mr-1 text-orange-500" />
            Popular Product
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="featured"
              checked={formData.featured}
              onChange={handleInputChange}
              className="mr-2"
            />
            <Star className="w-4 h-4 mr-1 text-blue-500" />
            Featured Product
          </label>
        </div>

        {/* Submit Button */}
        <div className="flex gap-4 pt-4 border-t">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors disabled:opacity-50"
          >
            {isSubmitting ? 'Adding Product...' : 'Add Product'}
          </button>
        </div>
      </form>
    </div>
  );
}
