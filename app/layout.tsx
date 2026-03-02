import GradientBlinds from "@/components/GradientBlinds";
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { UserProvider } from '@/lib/user-context'
import { CustomCursor } from '@/components/CustomCursor'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Dark Store Bridge - Inventory Management',
  description: 'Cyberpunk-themed inventory management system for dark stores. Sync with Google Sheets and manage WhatsApp conversations.',
  generator: 'v0.app',
  themeColor: '#0a1929',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className="font-sans antialiased bg-black overflow-x-hidden">
        <UserProvider>
          {/* NECESSARY CHANGE: Background Animation Layer */}
          <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden">
            <GradientBlinds
              gradientColors={['#0F1115', '#5227FF']}
              angle={0}
              noise={0.3}
              blindCount={12}
              blindMinWidth={50}
              spotlightRadius={0.5}
              spotlightSoftness={1}
              spotlightOpacity={1}
              mouseDampening={0.15}
              distortAmount={0}
              shineDirection="left"
              mixBlendMode="lighten"
            />
          </div>

          <CustomCursor />
          
          {/* NECESSARY CHANGE: Content wrapper to stay above background */}
          <main className="relative z-10">
            {children}
          </main>
          
          <Analytics />
        </UserProvider>
      </body>
    </html>
  )
}
