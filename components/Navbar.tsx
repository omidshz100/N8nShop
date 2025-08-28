'use client';

import { useState, useEffect } from 'react';
import { useCart } from './CartContext';
import { Menu, X, ShoppingCart } from 'lucide-react';
import Link from 'next/link';

const navigationItems = [
  { name: 'Home', href: '#home' },
  { name: 'How It Works', href: '#steps' },
  { name: 'Catalog', href: '#catalog' },
  { name: 'FAQ', href: '#faq' },
  { name: 'Contact', href: '#contact' }
];

export function Navbar() {
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cart } = useCart();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: '-80px 0px -80px 0px'
      }
    );

    navigationItems.forEach(({ href }) => {
      const element = document.querySelector(href);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-sm border-b border-gray-200 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-gray-900">
              n8n Workspaces
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navigationItems.map(({ name, href }) => (
                <button
                  key={name}
                  onClick={() => handleNavClick(href)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeSection === href.substring(1)
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  {name}
                </button>
              ))}
            </div>
          </div>

          <div className="hidden md:flex items-center">
            <button className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors">
              <ShoppingCart className="w-5 h-5" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-semibold leading-none text-white bg-blue-600 rounded-full">
                  {cart.length}
                </span>
              )}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-b border-gray-200">
            {navigationItems.map(({ name, href }) => (
              <button
                key={name}
                onClick={() => handleNavClick(href)}
                className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left transition-colors ${
                  activeSection === href.substring(1)
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                {name}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}