import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { UserProvider } from '@/lib/user-context'
import { CustomCursor } from '@/components/CustomCursor'
import { CursorAnimation } from "@/components/cursor-animation";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CustomCursor /> {/* This activates the ribbon globally */}
        {children}
      </body>
    </html>
  );
}
        <CursorAnimation /> {/* Place it here, outside the main content */}
        {children}
      </body>
    </html>
  );
}

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
      <body className="font-sans antialiased">
        <UserProvider>
          <CustomCursor />
          {children}
        </UserProvider>
        <Analytics />
      </body>
    </html>
  )
}
