'use client'
import { useEmailData } from '@/lib/hooks/use-email'
import scanEmail from '@/lib/utils/fetchMessages'
import React, { useEffect } from 'react'

function Email() {
  const { token } = sessionStorage
  const user = JSON.parse(sessionStorage.getItem('user') as string)
  const { emailData, setEmailData } = useEmailData()

  // useEffect(() => {
  //   const firstTimeUser = localStorage.getItem('firstTimeUser')
  //   const storedData = localStorage.getItem('emailData')
  //   if (storedData && firstTimeUser === 'true') {
  //     setEmailData(JSON.parse(storedData))
  //   } else if (firstTimeUser) {
  //     handleScanEmail()
  //     localStorage.setItem('firstTimeUser', 'true')
  //   }
  // }, [])

  useEffect(() => {
    const firstTimeUser = localStorage.getItem('firstTimeUser')
    if (!firstTimeUser) {
      handleScanEmail()
      localStorage.setItem('firstTimeUser', 'true')
    }
  }, [])
  async function handleScanEmail() {
    const fetchedMessages = await scanEmail(
      token,
      user.user_metadata.provider_id
    )
    console.log(fetchedMessages)
    setEmailData(fetchedMessages)
    localStorage.setItem('emailData', JSON.stringify(fetchedMessages))
  }

  useEffect(() => {
    const firstTimeUser = localStorage.getItem('firstTimeUser')
    const storedData = localStorage.getItem('emailData')
    if (storedData && firstTimeUser === 'true') {
      setEmailData(JSON.parse(storedData))
    }
  }, [])

  return (
    <div className="flex min-h-screen items-center justify-center">
      <button
        onClick={() => {
          handleScanEmail()
        }}
      >
        Scan Email
      </button>
      <div>
        {emailData?.map((e, index) => (
          <div key={index}>
            <div>{e.company}</div>
            <div>{e.status}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Email
