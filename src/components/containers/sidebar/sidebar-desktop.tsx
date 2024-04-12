import React from 'react'
import { Sidebar } from './sidebar'
import SidebarItem from './sidebar-item'

function SidebarDesktop() {
  return (
    <Sidebar className='min-h-screen hidden  border-r bg-muted duration-300 ease-in-out data-[state=closed]:w-0 data-[state=closed]:hidden lg:flex w-[300px] bg-gray-50'>
      {/* @ts-ignore */}
      <SidebarItem />
    </Sidebar>
  )
}

export default SidebarDesktop
