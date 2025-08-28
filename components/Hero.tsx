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
    <section id="home" className="pt-16 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Automated n8n Workflows
            <span className="block text-blue-600">for Your Business</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Choose from 100+ ready-to-use n8n workspaces that integrate your favorite tools. 
            Install, configure, and launch powerful automations in minutes, not weeks. From CRM sync to e-commerce automation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => handleScrollTo('#catalog')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold flex items-center gap-2 transition-colors text-lg"
            >
              Browse Workspaces
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleScrollTo('#contact')}
              className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-8 py-3 rounded-lg font-semibold flex items-center gap-2 transition-colors text-lg"
            >
              <Play className="w-5 h-5" />
              Learn More
            </button>
          </div>
        </div>
        
  {/* Image removed as requested */}
      </div>
    </section>
  );
}