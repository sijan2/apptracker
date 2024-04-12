/* eslint-disable @next/next/no-img-element */
import * as React from 'react'
import { SidebarMobile } from '../sidebar/mobile-sidebar'
import SidebarItem from '../sidebar/sidebar-item'

export function Header() {
  return (
    <header className='lg:hidden sticky top-0 z-50 flex items-center justify-between w-full h-16 px-4 shrink-0 bg-transparent bg-gradient-to-b from-background/10 via-background/50 to-background/80 backdrop-blur-xl'>
      <SidebarMobile>
        <SidebarItem />
      </SidebarMobile>
    </header>
  )
}
