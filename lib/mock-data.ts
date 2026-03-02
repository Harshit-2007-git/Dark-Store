import { Product, Order, Conversation, Message, DashboardStats } from './types'

// Mock Products
export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Premium Coffee Beans',
    sku: 'COFFEE-001',
    quantity: 145,
    price: 12.99,
    category: 'Beverages',
    lastUpdated: new Date().toISOString(),
    status: 'in-stock',
  },
  {
    id: '2',
    name: 'Organic Pasta',
    sku: 'PASTA-001',
    quantity: 8,
    price: 5.49,
    category: 'Grains',
    lastUpdated: new Date().toISOString(),
    status: 'low-stock',
  },
  {
    id: '3',
    name: 'Fresh Milk',
    sku: 'MILK-001',
    quantity: 0,
    price: 3.99,
    category: 'Dairy',
    lastUpdated: new Date().toISOString(),
    status: 'out-of-stock',
  },
  {
    id: '4',
    name: 'Whole Wheat Bread',
    sku: 'BREAD-001',
    quantity: 52,
    price: 4.99,
    category: 'Bakery',
    lastUpdated: new Date().toISOString(),
    status: 'in-stock',
  },
  {
    id: '5',
    name: 'Extra Virgin Olive Oil',
    sku: 'OIL-001',
    quantity: 23,
    price: 14.99,
    category: 'Oils',
    lastUpdated: new Date().toISOString(),
    status: 'in-stock',
  },
  {
    id: '6',
    name: 'Almond Butter',
    sku: 'BUTTER-001',
    quantity: 15,
    price: 8.99,
    category: 'Spreads',
    lastUpdated: new Date().toISOString(),
    status: 'low-stock',
  },
]

// Mock Orders
export const mockOrders: Order[] = [
  {
    id: '1',
    orderNumber: 'ORD-2026-001',
    date: new Date(Date.now() - 3600000).toISOString(),
    status: 'completed',
    items: [
      { productId: '1', productName: 'Premium Coffee Beans', quantity: 2, price: 12.99 },
      { productId: '4', productName: 'Whole Wheat Bread', quantity: 1, price: 4.99 },
    ],
    total: 30.97,
    customer: 'John Doe',
    source: 'whatsapp',
  },
  {
    id: '2',
    orderNumber: 'ORD-2026-002',
    date: new Date(Date.now() - 7200000).toISOString(),
    status: 'processing',
    items: [
      { productId: '5', productName: 'Extra Virgin Olive Oil', quantity: 1, price: 14.99 },
      { productId: '6', productName: 'Almond Butter', quantity: 2, price: 8.99 },
    ],
    total: 32.97,
    customer: 'Jane Smith',
    source: 'whatsapp',
  },
  {
    id: '3',
    orderNumber: 'ORD-2026-003',
    date: new Date(Date.now() - 10800000).toISOString(),
    status: 'pending',
    items: [
      { productId: '1', productName: 'Premium Coffee Beans', quantity: 5, price: 12.99 },
    ],
    total: 64.95,
    customer: 'Bob Johnson',
    source: 'whatsapp',
  },
]

// Mock Conversations
export const mockConversations: Conversation[] = [
  {
    id: '1',
    phoneNumber: '+1-555-0101',
    contactName: 'John Doe',
    lastMessage: 'Perfect! I received the delivery. Thanks!',
    lastMessageTime: new Date(Date.now() - 1800000).toISOString(),
    unreadCount: 0,
    messages: [
      {
        id: '1-1',
        conversationId: '1',
        sender: 'user',
        content: 'Hi, do you have coffee beans in stock?',
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        status: 'read',
      },
      {
        id: '1-2',
        conversationId: '1',
        sender: 'bot',
        content: 'Yes! We have Premium Coffee Beans available. Would you like to order?',
        timestamp: new Date(Date.now() - 7000000).toISOString(),
        status: 'read',
      },
      {
        id: '1-3',
        conversationId: '1',
        sender: 'user',
        content: 'Yes, please. 2 packages.',
        timestamp: new Date(Date.now() - 6800000).toISOString(),
        status: 'read',
      },
      {
        id: '1-4',
        conversationId: '1',
        sender: 'bot',
        content: 'Great! Order confirmed. Your order #ORD-2026-001 is being prepared.',
        timestamp: new Date(Date.now() - 6600000).toISOString(),
        status: 'read',
      },
      {
        id: '1-5',
        conversationId: '1',
        sender: 'user',
        content: 'Perfect! I received the delivery. Thanks!',
        timestamp: new Date(Date.now() - 1800000).toISOString(),
        status: 'read',
      },
    ],
  },
  {
    id: '2',
    phoneNumber: '+1-555-0102',
    contactName: 'Jane Smith',
    lastMessage: 'When will the order be ready?',
    lastMessageTime: new Date(Date.now() - 600000).toISOString(),
    unreadCount: 1,
    messages: [
      {
        id: '2-1',
        conversationId: '2',
        sender: 'user',
        content: 'Hi! I want to order some olive oil and almond butter.',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        status: 'read',
      },
      {
        id: '2-2',
        conversationId: '2',
        sender: 'bot',
        content: 'Perfect! We have both items. How much would you like?',
        timestamp: new Date(Date.now() - 3400000).toISOString(),
        status: 'read',
      },
      {
        id: '2-3',
        conversationId: '2',
        sender: 'user',
        content: '1 bottle of olive oil and 2 jars of almond butter, please.',
        timestamp: new Date(Date.now() - 3200000).toISOString(),
        status: 'read',
      },
      {
        id: '2-4',
        conversationId: '2',
        sender: 'bot',
        content: 'Order #ORD-2026-002 confirmed! Total: $32.97',
        timestamp: new Date(Date.now() - 3000000).toISOString(),
        status: 'read',
      },
      {
        id: '2-5',
        conversationId: '2',
        sender: 'user',
        content: 'When will the order be ready?',
        timestamp: new Date(Date.now() - 600000).toISOString(),
        status: 'delivered',
      },
    ],
  },
  {
    id: '3',
    phoneNumber: '+1-555-0103',
    contactName: 'Bob Johnson',
    lastMessage: 'Do you have bulk pricing?',
    lastMessageTime: new Date(Date.now() - 300000).toISOString(),
    unreadCount: 1,
    messages: [
      {
        id: '3-1',
        conversationId: '3',
        sender: 'user',
        content: 'Hi! I need to order large quantities of coffee beans.',
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        status: 'read',
      },
      {
        id: '3-2',
        conversationId: '3',
        sender: 'bot',
        content: 'Sure! How much coffee would you like?',
        timestamp: new Date(Date.now() - 7000000).toISOString(),
        status: 'read',
      },
      {
        id: '3-3',
        conversationId: '3',
        sender: 'user',
        content: 'About 5 kg. Do you have bulk pricing?',
        timestamp: new Date(Date.now() - 300000).toISOString(),
        status: 'delivered',
      },
    ],
  },
]

// Mock Dashboard Stats
export const mockDashboardStats: DashboardStats = {
  totalProducts: mockProducts.length,
  totalOrders: mockOrders.length,
  activeConversations: mockConversations.length,
  revenue: 128.89,
  inventoryValue: 1245.67,
  lastSync: new Date(Date.now() - 600000).toISOString(),
}

// Utility function to get stats
export function getDashboardStats(): DashboardStats {
  return {
    ...mockDashboardStats,
    lastSync: new Date().toISOString(),
  }
}

// Utility function to get products
export function getProducts(): Product[] {
  return [...mockProducts]
}

// Utility function to get orders
export function getOrders(): Order[] {
  return [...mockOrders]
}

// Utility function to get conversations
export function getConversations(): Conversation[] {
  return [...mockConversations]
}

// Utility function to get a single conversation
export function getConversation(id: string): Conversation | undefined {
  return mockConversations.find(conv => conv.id === id)
}
