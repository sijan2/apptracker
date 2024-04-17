'use client'

import React, { createContext, useContext, useState } from 'react'

// Define the context
const EmailContext = createContext({})

interface SidebarProviderProps {
  children: React.ReactNode
}

export function EmailProvider({ children }: SidebarProviderProps) {
  const [emailData, setEmailData] = useState({ company: '', status: '' })

  return (
    <EmailContext.Provider value={{ emailData, setEmailData }}>
      {children}
    </EmailContext.Provider>
  )
}

export const useEmailData = () => useContext(EmailContext)
