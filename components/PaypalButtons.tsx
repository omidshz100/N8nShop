'use client';

import { useEffect, useRef, useState } from 'react';
import type { Product } from '@/lib/products';

declare global {
  interface Window {
    paypal: any;
  }
}

interface PaypalButtonsProps {
  product: Product;
  onSuccess: () => void;
  onError: (error: any) => void;
}

export function PaypalButtons({ product, onSuccess, onError }: PaypalButtonsProps) {
  const paypalRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadPayPalScript = () => {
      if (window.paypal) {
        setIsLoaded(true);
        return;
      }

      const script = document.createElement('script');
      script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || 'PAYPAL_CLIENT_ID'}&currency=USD&intent=capture`;
      script.addEventListener('load', () => setIsLoaded(true));
      script.addEventListener('error', (err) => onError(err));
      document.head.appendChild(script);
    };

    loadPayPalScript();
  }, [onError]);

  useEffect(() => {
    if (isLoaded && window.paypal && paypalRef.current) {
      paypalRef.current.innerHTML = '';
      
      window.paypal.Buttons({
        createOrder: (data: any, actions: any) => {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: product.price.toString(),
                currency_code: product.currency
              },
              description: product.title
            }]
          });
        },
        onApprove: async (data: any, actions: any) => {
          try {
            await actions.order.capture();
            onSuccess();
          } catch (error) {
            onError(error);
          }
        },
        onError: (err: any) => {
          onError(err);
        },
        style: {
          layout: 'vertical',
          color: 'blue',
          shape: 'rect',
          label: 'paypal'
        }
      }).render(paypalRef.current);
    }
  }, [isLoaded, product, onSuccess, onError]);

  return (
    <div className="w-full">
      <div ref={paypalRef} className="w-full"></div>
      {!isLoaded && (
        <div className="animate-pulse bg-gray-200 rounded h-12 w-full"></div>
      )}
    </div>
  );
}