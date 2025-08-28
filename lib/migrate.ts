// Data migration utility to move localStorage data to SQLite database
// Run this in the browser console on the admin page to migrate existing data

import type { Product } from './products';

export function migrateLocalStorageToDatabase() {
  const customProducts: Product[] = JSON.parse(localStorage.getItem('custom-products') || '[]');
  
  if (customProducts.length === 0) {
    console.log('No custom products found in localStorage');
    return;
  }
  
  console.log(`Found ${customProducts.length} products in localStorage, migrating...`);
  
  // Migrate each product
  customProducts.forEach(async (product: Product, index: number) => {
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });
      
      const result = await response.json();
      
      if (result.success) {
        console.log(`✓ Migrated product ${index + 1}: ${product.title}`);
      } else {
        console.error(`✗ Failed to migrate product ${index + 1}: ${result.error}`);
      }
    } catch (error) {
      console.error(`✗ Error migrating product ${index + 1}:`, error);
    }
  });
  
  // Clear localStorage after successful migration
  setTimeout(() => {
    localStorage.removeItem('custom-products');
    console.log('Migration complete! Cleared localStorage.');
    console.log('Please refresh the page to see migrated products.');
  }, 2000);
}

// Expose to window for easy access
if (typeof window !== 'undefined') {
  (window as any).migrateLocalStorageToDatabase = migrateLocalStorageToDatabase;
}
