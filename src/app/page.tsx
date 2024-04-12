'use client'
import { Sidebar } from '@/components/containers/sidebar/sidebar'
import SidebarItem from '@/components/containers/sidebar/sidebar-item'
import Toggle from '@/components/containers/sidebar/sidebar-toggle'
import { useSidebar } from '@/lib/hooks/use-sidebar'

export default function Home() {
  return (
    <div className='flex relative min-h-full w-full z-0'>
      <Sidebar className='min-h-screen z-30 hidden  border-r bg-muted duration-300 ease-in-out data-[state=closed]:w-0 data-[state=closed]:hidden lg:flex w-[300px] bg-gray-50'>
        {/* @ts-ignore */}
        <SidebarItem />
      </Sidebar>
      <div className='relative flex h-full max-w-full flex-1 flex-col overflow-hidden'>
        <main className='relative min-h-screen w-full flex flex-1 overflow-auto transition-width items-center justify-center'>
          <Toggle />
          Hiiiii
        </main>
      </div>
    </div>
  )
}
