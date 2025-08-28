import { NextRequest, NextResponse } from 'next/server';
import { productOperations } from '@/lib/database';
import { products as defaultProducts } from '@/lib/products';

// Force dynamic rendering for this API route
export const dynamic = 'force-dynamic';

interface RouteParams {
  params: {
    id: string;
  };
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = params;
    
    // First check database (prioritize database over defaults)
    const dbProduct = productOperations.getById(id);
    if (dbProduct) {
      return NextResponse.json({
        success: true,
        data: dbProduct
      });
    }
    
    // Then check default products
    const defaultProduct = defaultProducts.find(p => p.id === id);
    if (defaultProduct) {
      return NextResponse.json({
        success: true,
        data: defaultProduct
      });
    }
    
    return NextResponse.json(
      { success: false, error: 'Product not found' },
      { status: 404 }
    );
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = params;
    const body = await request.json();
    
    // Check if it's a default product that we need to override
    const defaultProduct = defaultProducts.find(p => p.id === id);
    
    if (defaultProduct) {
      // For default products, create a complete product object and upsert it
      const completeProduct = {
        ...defaultProduct,
        ...body,
        id: id // Ensure we keep the original ID
      };
      
      const updatedProduct = productOperations.upsert(id, completeProduct);
      
      if (!updatedProduct) {
        return NextResponse.json(
          { success: false, error: 'Failed to update product' },
          { status: 500 }
        );
      }
      
      return NextResponse.json({
        success: true,
        data: updatedProduct
      });
    } else {
      // For custom products, just update normally
      const updatedProduct = productOperations.update(id, body);
      
      if (!updatedProduct) {
        return NextResponse.json(
          { success: false, error: 'Product not found or update failed' },
          { status: 404 }
        );
      }
      
      return NextResponse.json({
        success: true,
        data: updatedProduct
      });
    }
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update product' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = params;
    
    // Check if product exists in database
    const dbProduct = productOperations.getById(id);
    if (dbProduct) {
      // Delete from database
      const deleted = productOperations.delete(id);
      
      if (!deleted) {
        return NextResponse.json(
          { success: false, error: 'Failed to delete product' },
          { status: 500 }
        );
      }
      
      return NextResponse.json({
        success: true,
        message: 'Product deleted successfully'
      });
    }
    
    // If it's a default product that hasn't been customized, don't allow deletion
    const defaultProduct = defaultProducts.find(p => p.id === id);
    if (defaultProduct) {
      return NextResponse.json(
        { success: false, error: 'Cannot delete default products. Edit them to create a custom version first.' },
        { status: 403 }
      );
    }
    
    return NextResponse.json(
      { success: false, error: 'Product not found' },
      { status: 404 }
    );
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete product' },
      { status: 500 }
    );
  }
}
