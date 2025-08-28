import { NextRequest, NextResponse } from 'next/server';
import { productOperations } from '@/lib/database';
import { products as defaultProducts, type Product } from '@/lib/products';

// Force dynamic rendering for this API route
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    
    // Get products from database
    let dbProducts: Product[] = [];
    try {
      dbProducts = search ? productOperations.search(search) : productOperations.getAll();
    } catch (error) {
      console.error('Database error:', error);
      // Fallback to default products if database fails
      dbProducts = [];
    }
    
    // Create a map of database products by ID for quick lookup
    const dbProductsMap = new Map(dbProducts.map(p => [p.id, p]));
    
    // Replace default products with database versions if they exist, maintaining order
    const mergedProducts = defaultProducts.map(defaultProduct => {
      // If this default product has been edited (exists in database), use the database version
      return dbProductsMap.get(defaultProduct.id) || defaultProduct;
    });
    
    // Add any remaining database products that don't override default products
    const customProducts = dbProducts.filter(dbProduct => 
      !defaultProducts.some(defaultProduct => defaultProduct.id === dbProduct.id)
    );
    
    // Combine: default products (with database overrides in place) + custom products
    const allProducts = [...mergedProducts, ...customProducts];
    
    // Apply search filter if needed
    const finalProducts = search 
      ? allProducts.filter(product => 
          product.title.toLowerCase().includes(search.toLowerCase()) ||
          product.short.toLowerCase().includes(search.toLowerCase()) ||
          product.category.toLowerCase().includes(search.toLowerCase())
        )
      : allProducts;
    
    return NextResponse.json({
      success: true,
      data: finalProducts
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const requiredFields = ['title', 'price', 'short', 'category', 'difficulty', 'setupTime'];
    const missingFields = requiredFields.filter(field => !body[field]);
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { 
          success: false, 
          error: `Missing required fields: ${missingFields.join(', ')}` 
        },
        { status: 400 }
      );
    }
    
    // Create product in database
    const newProduct = productOperations.create({
      title: body.title,
      price: parseFloat(body.price),
      currency: body.currency || 'USD',
      short: body.short,
      features: body.features || [],
      image: body.image || '',
      stripeUrl: body.stripeUrl || '',
      category: body.category,
      tags: body.tags || [],
      difficulty: body.difficulty,
      setupTime: body.setupTime,
      popular: Boolean(body.popular),
      featured: Boolean(body.featured)
    });
    
    return NextResponse.json({
      success: true,
      data: newProduct
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create product' },
      { status: 500 }
    );
  }
}
