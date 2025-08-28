import Database from 'better-sqlite3';
import path from 'path';
import { Product } from './products';

// Database row interfaces
interface ProductRow {
  id: string;
  title: string;
  price: number;
  currency: string;
  short: string;
  features: string;
  image: string;
  stripe_url: string;
  category: string;
  tags: string;
  difficulty: string;
  setup_time: string;
  popular: number;
  featured: number;
  created_at: string;
  updated_at: string;
}

interface OrderRow {
  id: string;
  customer_email: string;
  customer_name: string;
  total_amount: number;
  currency: string;
  status: string;
  created_at: string;
  updated_at: string;
  items: string;
}

const DB_PATH = path.join(process.cwd(), 'data', 'shop.db');

// Initialize database
let db: Database.Database;

export function initDatabase() {
  try {
    // Check if we're running in a production environment (Vercel)
    const isProduction = process.env.NODE_ENV === 'production' || process.env.VERCEL === '1';
    
    console.log('Environment check:', {
      NODE_ENV: process.env.NODE_ENV,
      VERCEL: process.env.VERCEL,
      isProduction
    });
    
    if (isProduction) {
      // Use in-memory database for production (Vercel)
      console.log('Production environment detected, using in-memory database');
      db = new Database(':memory:');
    } else {
      // Use file-based database for development
      const fs = require('fs');
      const dataDir = path.dirname(DB_PATH);
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }
      db = new Database(DB_PATH);
    }
    
    // Enable foreign keys
    db.pragma('foreign_keys = ON');
    
    // Create tables
    createTables();
    
    console.log('Database initialized successfully');
    return db;
  } catch (error) {
    console.error('Failed to initialize database:', error);
    throw error;
  }
}

function createTables() {
  // Products table
  db.exec(`
    CREATE TABLE IF NOT EXISTS products (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      price REAL NOT NULL,
      currency TEXT DEFAULT 'USD',
      short TEXT,
      features TEXT, -- JSON array as string
      image TEXT,
      stripe_url TEXT,
      category TEXT,
      tags TEXT, -- JSON array as string
      difficulty TEXT,
      setup_time TEXT,
      popular BOOLEAN DEFAULT 0,
      featured BOOLEAN DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Orders table
  db.exec(`
    CREATE TABLE IF NOT EXISTS orders (
      id TEXT PRIMARY KEY,
      customer_email TEXT,
      customer_name TEXT,
      total_amount REAL NOT NULL,
      currency TEXT DEFAULT 'USD',
      status TEXT DEFAULT 'pending',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Order items table
  db.exec(`
    CREATE TABLE IF NOT EXISTS order_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_id TEXT NOT NULL,
      product_id TEXT NOT NULL,
      quantity INTEGER NOT NULL,
      price REAL NOT NULL,
      FOREIGN KEY (order_id) REFERENCES orders(id),
      FOREIGN KEY (product_id) REFERENCES products(id)
    )
  `);

  // Create indexes for better performance
  db.exec(`
    CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
    CREATE INDEX IF NOT EXISTS idx_products_difficulty ON products(difficulty);
    CREATE INDEX IF NOT EXISTS idx_products_featured ON products(featured);
    CREATE INDEX IF NOT EXISTS idx_products_popular ON products(popular);
    CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
    CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at);
  `);
}

export function getDatabase() {
  if (!db) {
    return initDatabase();
  }
  return db;
}

// Product operations
export const productOperations = {
  // Get all products
  getAll: () => {
    const db = getDatabase();
    const stmt = db.prepare(`
      SELECT * FROM products 
      ORDER BY created_at DESC
    `);
    const rows = stmt.all() as ProductRow[];
    return rows.map(row => ({
      ...row,
      stripeUrl: row.stripe_url,
      setupTime: row.setup_time,
      features: JSON.parse(row.features || '[]'),
      tags: JSON.parse(row.tags || '[]'),
      popular: Boolean(row.popular),
      featured: Boolean(row.featured)
    })) as Product[];
  },

  // Get product by ID
  getById: (id: string) => {
    const db = getDatabase();
    const stmt = db.prepare('SELECT * FROM products WHERE id = ?');
    const row = stmt.get(id) as ProductRow | undefined;
    if (!row) return null;
    
    return {
      ...row,
      stripeUrl: row.stripe_url,
      setupTime: row.setup_time,
      features: JSON.parse(row.features || '[]'),
      tags: JSON.parse(row.tags || '[]'),
      popular: Boolean(row.popular),
      featured: Boolean(row.featured)
    } as Product;
  },

  // Create new product
  create: (product: Omit<Product, 'id'>) => {
    const db = getDatabase();
    const id = `product-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    const stmt = db.prepare(`
      INSERT INTO products (
        id, title, price, currency, short, features, image, 
        stripe_url, category, tags, difficulty, setup_time, 
        popular, featured
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    
    const result = stmt.run(
      id,
      product.title,
      product.price,
      product.currency,
      product.short,
      JSON.stringify(product.features),
      product.image,
      product.stripeUrl,
      product.category,
      JSON.stringify(product.tags),
      product.difficulty,
      product.setupTime,
      product.popular ? 1 : 0,
      product.featured ? 1 : 0
    );
    
    return { id, ...product };
  },

  // Update product
  update: (id: string, product: Partial<Product>) => {
    try {
      const db = getDatabase();
      console.log('Updating product:', { id, product });
      
      const fields = [];
      const values = [];
      
      if (product.title !== undefined) {
        fields.push('title = ?');
        values.push(product.title);
      }
      if (product.price !== undefined) {
        fields.push('price = ?');
        values.push(product.price);
      }
      if (product.currency !== undefined) {
        fields.push('currency = ?');
        values.push(product.currency);
      }
      if (product.short !== undefined) {
        fields.push('short = ?');
        values.push(product.short);
      }
      if (product.features !== undefined) {
        fields.push('features = ?');
        values.push(JSON.stringify(product.features));
      }
      if (product.image !== undefined) {
        fields.push('image = ?');
        values.push(product.image);
      }
      if (product.stripeUrl !== undefined) {
        fields.push('stripe_url = ?');
        values.push(product.stripeUrl);
      }
      if (product.category !== undefined) {
        fields.push('category = ?');
        values.push(product.category);
      }
      if (product.tags !== undefined) {
        fields.push('tags = ?');
        values.push(JSON.stringify(product.tags));
      }
      if (product.difficulty !== undefined) {
        fields.push('difficulty = ?');
        values.push(product.difficulty);
      }
      if (product.setupTime !== undefined) {
        fields.push('setup_time = ?');
        values.push(product.setupTime);
      }
      if (product.popular !== undefined) {
        fields.push('popular = ?');
        values.push(product.popular ? 1 : 0);
      }
      if (product.featured !== undefined) {
        fields.push('featured = ?');
        values.push(product.featured ? 1 : 0);
      }
      
      if (fields.length === 0) {
        console.log('No fields to update');
        return null;
      }
      
      fields.push('updated_at = CURRENT_TIMESTAMP');
      values.push(id);
      
      const stmt = db.prepare(`
        UPDATE products 
        SET ${fields.join(', ')} 
        WHERE id = ?
      `);
      
      console.log('Executing update query:', { fields: fields.join(', '), values });
      const result = stmt.run(...values);
      console.log('Update result:', result);
      
      return result.changes > 0 ? productOperations.getById(id) : null;
    } catch (error) {
      console.error('Error in productOperations.update:', error);
      throw error;
    }
  },

  // Upsert (insert or update) product with specific ID
  upsert: (id: string, product: Product) => {
    const db = getDatabase();
    
    // Try to update first
    const existingProduct = productOperations.getById(id);
    if (existingProduct) {
      return productOperations.update(id, product);
    }
    
    // If doesn't exist, insert with the specified ID
    const stmt = db.prepare(`
      INSERT INTO products (
        id, title, price, currency, short, features, image, 
        stripe_url, category, tags, difficulty, setup_time, 
        popular, featured
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    
    const result = stmt.run(
      id, // Use the provided ID instead of generating one
      product.title,
      product.price,
      product.currency,
      product.short,
      JSON.stringify(product.features),
      product.image,
      product.stripeUrl,
      product.category,
      JSON.stringify(product.tags),
      product.difficulty,
      product.setupTime,
      product.popular ? 1 : 0,
      product.featured ? 1 : 0
    );
    
    return { ...product, id };
  },

  // Delete product
  delete: (id: string) => {
    const db = getDatabase();
    const stmt = db.prepare('DELETE FROM products WHERE id = ?');
    const result = stmt.run(id);
    return result.changes > 0;
  },

  // Search products
  search: (query: string) => {
    const db = getDatabase();
    const stmt = db.prepare(`
      SELECT * FROM products 
      WHERE title LIKE ? OR short LIKE ? OR category LIKE ?
      ORDER BY created_at DESC
    `);
    const searchTerm = `%${query}%`;
    const rows = stmt.all(searchTerm, searchTerm, searchTerm) as ProductRow[];
    return rows.map(row => ({
      ...row,
      stripeUrl: row.stripe_url,
      setupTime: row.setup_time,
      features: JSON.parse(row.features || '[]'),
      tags: JSON.parse(row.tags || '[]'),
      popular: Boolean(row.popular),
      featured: Boolean(row.featured)
    })) as Product[];
  }
};

// Order operations
export const orderOperations = {
  // Create new order
  create: (order: {
    customerEmail: string;
    customerName: string;
    items: Array<{ productId: string; quantity: number; price: number }>;
    totalAmount: number;
    currency?: string;
  }) => {
    const db = getDatabase();
    const orderId = `order-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    const transaction = db.transaction(() => {
      // Insert order
      const orderStmt = db.prepare(`
        INSERT INTO orders (id, customer_email, customer_name, total_amount, currency)
        VALUES (?, ?, ?, ?, ?)
      `);
      orderStmt.run(
        orderId,
        order.customerEmail,
        order.customerName,
        order.totalAmount,
        order.currency || 'USD'
      );
      
      // Insert order items
      const itemStmt = db.prepare(`
        INSERT INTO order_items (order_id, product_id, quantity, price)
        VALUES (?, ?, ?, ?)
      `);
      
      for (const item of order.items) {
        itemStmt.run(orderId, item.productId, item.quantity, item.price);
      }
    });
    
    transaction();
    return orderId;
  },

  // Get all orders
  getAll: () => {
    const db = getDatabase();
    const stmt = db.prepare(`
      SELECT o.*, 
             json_group_array(
               json_object(
                 'productId', oi.product_id,
                 'quantity', oi.quantity,
                 'price', oi.price
               )
             ) as items
      FROM orders o
      LEFT JOIN order_items oi ON o.id = oi.order_id
      GROUP BY o.id
      ORDER BY o.created_at DESC
    `);
    const rows = stmt.all() as OrderRow[];
    return rows.map(row => ({
      ...row,
      items: JSON.parse(row.items)
    }));
  },

  // Update order status
  updateStatus: (id: string, status: string) => {
    const db = getDatabase();
    const stmt = db.prepare(`
      UPDATE orders 
      SET status = ?, updated_at = CURRENT_TIMESTAMP 
      WHERE id = ?
    `);
    const result = stmt.run(status, id);
    return result.changes > 0;
  }
};

// Initialize database on import in Node.js environment
if (typeof window === 'undefined') {
  try {
    initDatabase();
  } catch (error) {
    console.warn('Database initialization skipped:', (error as Error).message);
  }
}
