'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import { PaypalButtons } from './PaypalButtons';
import { Toast } from './Toast';
import type { Product } from '@/lib/products';
import Link from 'next/link';

interface ProductModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handlePaypalSuccess = () => {
    setToastMessage('Payment successful! Check your email for delivery instructions.');
    setShowToast(true);
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  const handlePaypalError = (error: any) => {
    setToastMessage('Payment failed. Please try again.');
    setShowToast(true);
    console.error('PayPal error:', error);
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose}></div>
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-xl font-semibold text-gray-900">{product.title}</h3>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="mb-6">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <p className="text-gray-600 mb-4">{product.short}</p>
                <div className="text-3xl font-bold text-gray-900 mb-6">
                  ${product.price} <span className="text-lg font-normal text-gray-500">{product.currency}</span>
                </div>
              </div>

              <div className="mb-8">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Features Include:</h4>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4">
                <button
                  className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold text-center transition-colors"
                  // TODO: Implement add to cart logic
                >
                  Add to Cart
                </button>
              </div>

              {showToast && (
                <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      <span className="text-green-800 font-medium">Payment Successful!</span>
                    </div>
                  </div>
                  <p className="text-green-700 mt-2 text-sm">
                    <Link href="/deliveries" className="underline hover:text-green-800">
                      View delivery instructions →
                    </Link>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Toast
        message={toastMessage}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
        type="success"
      />
    </>
  );
}