import { getConversations } from '@/lib/mock-data'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const conversationId = request.nextUrl.searchParams.get('conversationId')
    const conversations = getConversations()

    if (conversationId) {
      const conversation = conversations.find(c => c.id === conversationId)
      if (!conversation) {
        return NextResponse.json(
          { success: false, error: 'Conversation not found' },
          { status: 404 }
        )
      }
      return NextResponse.json({
        success: true,
        data: conversation.messages,
        timestamp: new Date().toISOString(),
      })
    }

    return NextResponse.json({
      success: true,
      data: conversations,
      total: conversations.length,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch messages' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const { conversationId, content } = data

    if (!conversationId || !content) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // In a real app, this would save to database and send via WhatsApp
    console.log('New message:', data)

    return NextResponse.json(
      {
        success: true,
        message: 'Message sent successfully',
        data: {
          id: `msg-${Date.now()}`,
          conversationId,
          sender: 'bot',
          content,
          timestamp: new Date().toISOString(),
          status: 'sent',
        },
      },
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to send message' },
      { status: 500 }
    )
  }
}
