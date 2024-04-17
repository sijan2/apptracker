'use client'
import { useEmailData } from '@/lib/hooks/use-email'
import scanEmail from '@/lib/utils/fetchMessages'
import React, { useEffect } from 'react'

function Email() {
  const { token } = sessionStorage
  const user = JSON.parse(sessionStorage.getItem('user') as string)
  const { emailData, setEmailData } = useEmailData()

  async function handleScanEmail() {
    const fetchedMessages = await scanEmail(
      token,
      user.user_metadata.provider_id
    )
    setEmailData(fetchedMessages)
    localStorage.setItem('emailData', JSON.stringify(fetchedMessages))
    localStorage.setItem('hasFetchedData', 'true')
  }

  useEffect(() => {
    // Attempt to load data from local storage
    const storedData = localStorage.getItem('emailData')
    const hasFetchedData = localStorage.getItem('hasFetchedData')

    if (storedData && hasFetchedData) {
      // If data is already fetched, use it from local storage
      setEmailData(JSON.parse(storedData))
    } else if (user.user_metadata.provider_id && token) {
      //  user is logging in for the first time
      handleScanEmail()
    }
  }, [])

  const hasFetchedData = localStorage.getItem('hasFetchedData')

  return (
    <div className='flex min-h-screen items-center justify-center'>
      <button
        onClick={() => {
          if (!hasFetchedData) {
            handleScanEmail()
          }
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
