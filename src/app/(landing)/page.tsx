'use client'
import fetchMessages from '@/lib/utils/fetchMessages'
import { supabase } from '@/supabase/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import React, { useEffect } from 'react'

export default function Landing() {
  const { token } = sessionStorage
  const user = JSON.parse(sessionStorage.getItem('user') as string)
  const router = useRouter()

  async function handleFetchMessages() {
    try {
      const fetchedMessages = await fetchMessages(
        token,
        user.user_metadata.provider_id
      )
    } catch (error) {
      console.error(error)
    } finally {
    }
  }

  useEffect(() => {
    supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN') {
        if (session) {
          sessionStorage.setItem('token', session?.provider_token as string)
          sessionStorage.setItem('user', JSON.stringify(session?.user))

          router.push('/dashboard')
        } else {
          console.log('error', 'Error logging in')
        }
      } else if (event === 'SIGNED_OUT') {
        sessionStorage.clear()
        router.push('/login')
      }
    })
  })

  return (
    <div className='min-h-screen flex items-center justify-center space-x-2'>
      <Link
        className='flex rounded-lg bg-black text-white font-semibold h-12 w-24 items-center justify-center'
        href={'/dashboard'}
      >
        Dashboard
      </Link>
      <Link
        className='flex rounded-lg bg-black text-white font-semibold h-12 w-24 items-center justify-center'
        href={'/login'}
      >
        Login
      </Link>
    </div>
  )
}
