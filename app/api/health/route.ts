import { getDashboardStats } from '@/lib/mock-data'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const stats = getDashboardStats()

    return NextResponse.json({
      success: true,
      status: 'healthy',
      stats: {
        totalProducts: stats.totalProducts,
        totalOrders: stats.totalOrders,
        activeConversations: stats.activeConversations,
      },
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        status: 'unhealthy',
        error: 'System health check failed',
      },
      { status: 503 }
    )
  }
}
