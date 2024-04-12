import { useSidebar } from '@/lib/hooks/use-sidebar'
import React from 'react'

function Toggle() {
  const { toggleSidebar, isSidebarOpen, isLoading } = useSidebar()
  const dataState = isSidebarOpen && !isLoading ? 'open' : 'closed'
  return (
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
  )
}

export default Toggle
