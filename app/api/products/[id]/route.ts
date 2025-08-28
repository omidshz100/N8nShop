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
    
    // First check default products
    const defaultProduct = defaultProducts.find(p => p.id === id);
    if (defaultProduct) {
      return NextResponse.json({
        success: true,
        data: defaultProduct
      });
    }
    
    // Then check database
    const dbProduct = productOperations.getById(id);
    if (dbProduct) {
      return NextResponse.json({
        success: true,
        data: dbProduct
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
    
    // Only allow updating custom products (not default ones)
    if (!id.startsWith('product-')) {
      return NextResponse.json(
        { success: false, error: 'Cannot update default products' },
        { status: 403 }
      );
    }
    
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
    
    // Only allow deleting custom products (not default ones)
    if (!id.startsWith('product-')) {
      return NextResponse.json(
        { success: false, error: 'Cannot delete default products' },
        { status: 403 }
      );
    }
    
    const deleted = productOperations.delete(id);
    
    if (!deleted) {
      return NextResponse.json(
        { success: false, error: 'Product not found or delete failed' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete product' },
      { status: 500 }
    );
  }
}
