'use client';

import Link from 'next/link';
import { ArrowRight, Play } from 'lucide-react';

export function Hero() {
  const handleScrollTo = (elementId: string) => {
    const element = document.querySelector(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="pt-4 pb-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto text-center">
        <div className="flex flex-col sm:flex-row justify-center items-center gap-3">
          <span className="text-base sm:text-lg text-gray-700 font-medium">Ready-to-use automations for your business. Fast setup, instant results.</span>
          <button
            onClick={() => handleScrollTo('#contact')}
            className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-2 rounded-lg font-semibold flex items-center gap-2 transition-colors text-base"
          >
            Contact
          </button>
        </div>
      </div>
    </section>
  );
}