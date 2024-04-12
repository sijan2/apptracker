import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/providers/providers'
import { Header } from '@/components/containers/header/header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Application Tracker',
  description: 'Application tracker using AI',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={`lg:overflow-hidden ${inter.className}`}>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  )
}
