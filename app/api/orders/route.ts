import { getOrders } from '@/lib/mock-data'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const orders = getOrders()
    const statusFilter = request.nextUrl.searchParams.get('status')
    
    const filteredOrders = statusFilter
      ? orders.filter(order => order.status === statusFilter)
      : orders

    return NextResponse.json({
      success: true,
      data: filteredOrders,
      total: filteredOrders.length,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch orders' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    // In a real app, this would save to database
    console.log('New order:', data)
    return NextResponse.json(
      {
        success: true,
        message: 'Order created successfully',
        data: {
          id: Math.random().toString(36),
          orderNumber: `ORD-${Date.now()}`,
          ...data,
        },
      },
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create order' },
      { status: 500 }
    )
  }
}
