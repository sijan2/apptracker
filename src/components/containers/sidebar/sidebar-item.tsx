import { ChevronUpIcon, ModulzLogoIcon, SunIcon } from '@radix-ui/react-icons'
import React from 'react'

function SidebarItem() {
  return (
    <div className='min-h-screen flex flex-col justify-between overflow-hidden'>
      <div className='h-20 flex flex-col justify-between'>
        <div className='flex flex-1 p-4 items-center justify-between'>
          <button>
            <ModulzLogoIcon width={24} height={24} />
          </button>

          <button className='mr-10 lg:mr-0'>
            <SunIcon width={24} height={24} />
          </button>
        </div>
        <div className='bg-gray-300 h-[1px]'></div>
      </div>
      <nav className='flex-1 min-h-[300px]'></nav>
      <div className='h-20 cursor-pointer'>
        <div className='bg-gray-300 h-[1px]'></div>
        <div className='flex items-center justify-between p-2 '>
          <div className='flex items-center justify-between space-x-2'>
            <div className='h-16 w-16 rounded-md bg-red-200 flex items-center justify-center'>
              S M
            </div>
            <h1 className='font-bold'>Sijan</h1>
          </div>

          <ChevronUpIcon width={24} height={24} />
        </div>
      </div>
    </div>
  )
}

export default SidebarItem
