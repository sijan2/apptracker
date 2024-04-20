'use client'
import { Header } from '@/components/containers/header/header'
import Search from '@/components/containers/search/searchbar'
import SidebarDesktop from '@/components/containers/sidebar/sidebar-desktop'
import Toggle from '@/components/containers/sidebar/sidebar-toggle'
import Card from '@/components/ui/card'
import { useEmailData } from '@/lib/hooks/use-email'
import scanEmail from '@/lib/utils/fetchMessages'
import { supabase } from '@/supabase/supabase'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Dashboard() {
  const router = useRouter()

  const { token } = sessionStorage
  const user = JSON.parse(sessionStorage.getItem('user') as string)
  const { emailData, setEmailData } = useEmailData()

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
  useEffect(() => {
    supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_OUT') {
        sessionStorage.clear()
        router.push('/login')
      }
    })
  }, [router])

  return (
    <>
      <Header />
      <div className="flex relative min-h-full w-full z-0">
        <SidebarDesktop />
        <main className="relative min-h-screen w-full flex flex-col flex-1 transition-width pb-4 px-4 lg:px-16">
          <Toggle />
          <div className="flex-col lg:pt-4">
            <h1 className="font-semibold text-gray-800 text-2xl">
              Your Submitted Applications
            </h1>
            <h1 className="text-bold text-gray-500">
              {emailData?.length} TOTAL APPLICATIONS
            </h1>
            <div className="bg-gray-300 h-[1px] lg:mt-2"></div>
          </div>
          <Search />
          <div className="flex-1 mt-4 lg:max-h-screen scrollbar-none lg:pb-48 lg:overflow-y-scroll">
            {emailData?.map((e, index) => (
              <Card key={index} company={e.company} status={e.status} />
            ))}
          </div>
        </main>
      </div>
    </>
  )
}
