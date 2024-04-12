'use client'
import { Sidebar } from '@/components/containers/sidebar/sidebar'
import SidebarItem from '@/components/containers/sidebar/sidebar-item'
import { useSidebar } from '@/lib/hooks/use-sidebar'

export default function Home() {
  const { toggleSidebar, isSidebarOpen, isLoading } = useSidebar()
  const dataState = isSidebarOpen && !isLoading ? 'open' : 'closed'

  return (
    <div className='flex relative min-h-screen w-full overflow-x-hidden z-0'>
      <Sidebar className='min-h-screen z-30 hidden  border-r bg-muted duration-300 ease-in-out data-[state=closed]:w-0 data-[state=closed]:hidden lg:flex w-[300px] bg-gray-50'>
        {/* @ts-ignore */}
        <SidebarItem />
      </Sidebar>
      <div className='relative flex h-full max-w-full flex-1 flex-col overflow-hidden'>
        <main className='relative h-full w-full flex-1 overflow-auto transition-width'>
          <div className='relative bg-white flex flex-1 min-h-screen max-w-full overflow-hidden'>
            <div
              data-state={dataState}
              className='hidden lg:flex fixed left-0 top-1/2 z-40 w-8 h-[72px] translate-x-[300px] data-[state=closed]:translate-x-0 data-[state=closed]:rotate-180'
            >
              <button
                onClick={() => {
                  toggleSidebar()
                }}
                className='size-full flex flex-col items-center justify-center group'
              >
                <div
                  data-state={dataState}
                  className='bg-gray-600 h-3.5 translate-y-1 w-1 rounded-sm data-[state=closed]:rotate-[30deg] group-hover:rotate-[30deg] group-hover:bg-black '
                ></div>
                <div
                  data-state={dataState}
                  className='bg-gray-600 h-3.5 w-1 -traslate-y-1 rounded-sm data-[state=closed]:rotate-[-30deg] group-hover:rotate-[-30deg] group-hover:bg-black '
                ></div>
              </button>
            </div>
            <div className='p-8 w-full min-h-screen flex items-center justify-center'>
              Hii
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
