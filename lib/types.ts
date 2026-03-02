// Product/Inventory Types
export interface Product {
  id: string
  name: string
  sku: string
  quantity: number
  price: number
  category: string
  lastUpdated: string
  status: 'in-stock' | 'low-stock' | 'out-of-stock'
}

// Order Types
export interface Order {
  id: string
  orderNumber: string
  date: string
  status: 'pending' | 'processing' | 'completed' | 'cancelled'
  items: OrderItem[]
  total: number
  customer: string
  source: 'whatsapp' | 'web' | 'api'
}

export interface OrderItem {
  productId: string
  productName: string
  quantity: number
  price: number
}

// WhatsApp Message Types
export interface Message {
  id: string
  conversationId: string
  sender: 'user' | 'bot'
  content: string
  timestamp: string
  status: 'sent' | 'delivered' | 'read'
}

export interface Conversation {
  id: string
  phoneNumber: string
  contactName: string
  lastMessage: string
  lastMessageTime: string
  unreadCount: number
  messages: Message[]
}

// Google Sheets Integration
export interface SheetRow {
  id: string
  [key: string]: unknown
}

// Statistics
export interface DashboardStats {
  totalProducts: number
  totalOrders: number
  activeConversations: number
  revenue: number
  inventoryValue: number
  lastSync: string
}

// Webhook/Token Types
export interface WebhookToken {
  token: string
  expiresAt: string
  secret: string
}

export interface WebhookPayload {
  event: 'message.received' | 'order.created' | 'inventory.updated'
  data: unknown
  timestamp: string
  signature: string
}
