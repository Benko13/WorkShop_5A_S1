import React from "react"
import type { Metadata, Viewport } from 'next'
import { Roboto_Mono, Black_Ops_One } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { CartProvider } from '@/lib/cart-context'
import { CartSheet } from '@/components/cart-sheet'
import './globals.css'

const _robotoMono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-roboto-mono',
})

const _blackOpsOne = Black_Ops_One({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-black-ops',
})

export const metadata: Metadata = {
  title: 'ARTS ET SHOP | Cartes, Figurines & Accessoires Manga',
  description:
    'Votre boutique en ligne pour cartes de collection, figurines, statuettes et accessoires du monde Manga et Japanimation. Livraison en France.',
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
    generator: 'v0.app'
}

export const viewport: Viewport = {
  themeColor: '#111111',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <body
        className={`${_robotoMono.variable} ${_blackOpsOne.variable} font-mono antialiased`}
      >
        <CartProvider>
          {children}
          <CartSheet />
        </CartProvider>
        <Analytics />
      </body>
    </html>
  )
}
