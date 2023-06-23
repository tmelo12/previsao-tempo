'use client'
import './globals.css'
import { Inter } from 'next/font/google'
import { QueryClientProvider } from 'react-query'
import { queryClient } from '@/services/queryClient'

const inter = Inter({ subsets: ['latin'] })
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <QueryClientProvider client={queryClient}>

        <body className={inter.className}>{children}</body>
      </QueryClientProvider>
    </html>
  )
}
