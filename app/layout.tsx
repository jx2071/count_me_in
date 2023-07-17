import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from './Navbar'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Count Me In',
  description: 'An acitivities discovery and teaming up app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
      <link rel="icon" href="/logo.png" />
      </head>
      <body className={inter.className}>
        <Navbar />
        {children}</body>
    </html>
  )
}
