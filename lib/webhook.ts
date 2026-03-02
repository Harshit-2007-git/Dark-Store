import crypto from 'crypto'

// Generate HMAC SHA256 signature
export function generateSignature(payload: string, secret: string): string {
  return crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex')
}

// Verify webhook signature
export function verifySignature(payload: string, signature: string, secret: string): boolean {
  const expectedSignature = generateSignature(payload, secret)
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  )
}

// Generate a random webhook token
export function generateWebhookToken(): {
  token: string
  secret: string
  expiresAt: string
} {
  const token = crypto.randomBytes(32).toString('hex')
  const secret = crypto.randomBytes(32).toString('hex')
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 hours

  return { token, secret, expiresAt }
}

// Format webhook URL with token
export function formatWebhookUrl(baseUrl: string, token: string): string {
  return `${baseUrl}/api/webhooks/whatsapp?token=${token}`
}
