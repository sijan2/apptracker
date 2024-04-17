'use client'

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

interface EmailData {
  company: string
  status: string
}

interface EmailContextType {
  emailData: EmailData[] | undefined
  setEmailData: React.Dispatch<React.SetStateAction<EmailData[] | undefined>>
}

// Define the context
const EmailContext = createContext<EmailContextType | undefined>(undefined)

interface SidebarProviderProps {
  children: React.ReactNode
}

export function EmailProvider({ children }: SidebarProviderProps) {
  const [emailData, setEmailData] = useState<EmailData[] | undefined>(undefined)
  const value = useMemo(() => ({ emailData, setEmailData }), [emailData])

  return <EmailContext.Provider value={value}>{children}</EmailContext.Provider>
}
export const useEmailData = () => {
  const context = useContext(EmailContext)
  if (!context) {
    throw new Error('useEmailData must be used within a EmailProvider')
  }
  return context
}
