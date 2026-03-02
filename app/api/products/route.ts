import { getProducts } from '@/lib/mock-data'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const products = getProducts()
    return NextResponse.json({
      success: true,
      data: products,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    // In a real app, this would save to database
    console.log('New product:', data)
    return NextResponse.json(
      {
        success: true,
        message: 'Product created successfully',
        data: { id: Math.random().toString(36), ...data },
      },
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create product' },
      { status: 500 }
    )
  }
}
