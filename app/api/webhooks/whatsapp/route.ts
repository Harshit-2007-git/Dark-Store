import { verifySignature } from '@/lib/webhook'
import { NextRequest, NextResponse } from 'next/server'

// Store valid tokens (in a real app, this would be in database)
const VALID_TOKENS = new Set<string>()

export async function POST(request: NextRequest) {
  try {
    const token = request.nextUrl.searchParams.get('token')
    const signature = request.headers.get('x-hub-signature-256')

    if (!token) {
      return NextResponse.json(
        { success: false, error: 'Missing authentication token' },
        { status: 401 }
      )
    }

    const body = await request.text()

    // In a real app, you would:
    // 1. Look up the token's secret from database
    // 2. Verify the signature
    // 3. Process the webhook

    console.log('Webhook received:', {
      token,
      signature,
      body: JSON.parse(body),
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json({
      success: true,
      message: 'Webhook processed successfully',
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to process webhook' },
      { status: 500 }
    )
  }
}

// Webhook verification endpoint
export async function GET(request: NextRequest) {
  try {
    const mode = request.nextUrl.searchParams.get('hub.mode')
    const token = request.nextUrl.searchParams.get('hub.verify_token')
    const challenge = request.nextUrl.searchParams.get('hub.challenge')

    if (mode === 'subscribe' && token === 'your_verify_token') {
      console.log('Webhook verified')
      return new NextResponse(challenge)
    }

    return NextResponse.json(
      { error: 'Webhook verification failed' },
      { status: 403 }
    )
  } catch (error) {
    return NextResponse.json(
      { error: 'Webhook verification error' },
      { status: 500 }
    )
  }
}
