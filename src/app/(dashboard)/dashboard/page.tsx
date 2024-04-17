'use client'
import { Header } from '@/components/containers/header/header'
import Search from '@/components/containers/search/searchbar'
import SidebarDesktop from '@/components/containers/sidebar/sidebar-desktop'
import Toggle from '@/components/containers/sidebar/sidebar-toggle'
import Card from '@/components/ui/card'

export default function Dashboard() {
  return (
    <>
      <Header />
      <div className='flex relative min-h-full w-full z-0'>
        <SidebarDesktop />
        <main className='relative min-h-screen w-full flex flex-col flex-1 transition-width pb-4 px-4 lg:px-16'>
          <Toggle />
          <div className='flex-col lg:pt-4'>
            <h1 className='font-semibold text-gray-800 text-2xl'>
              Your Submitted Applications
            </h1>
            <h1 className='text-bold text-gray-500'>15 TOTAL APPLICATIONS</h1>
            <div className='bg-gray-300 h-[1px] lg:mt-2'></div>
          </div>
          <Search />
          <div className='flex-1 mt-4 lg:max-h-screen scrollbar-none lg:pb-48 lg:overflow-y-scroll'>
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
          </div>
        </main>
      </div>
    </>
  )
}
