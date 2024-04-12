'use client'

import * as React from 'react'
// import { ThemeProvider as NextThemesProvider } from 'next-themes'

import { SidebarProvider } from '@/lib/hooks/use-sidebar'

interface SidebarProviderProps {
  children: React.ReactNode
}

export function Providers({ children }: SidebarProviderProps) {
  return <SidebarProvider>{children}</SidebarProvider>
}
