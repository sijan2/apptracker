'use client'

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

import { Button } from '@/components/ui/button'
import { Sidebar } from './sidebar'

interface SidebarMobileProps {
  children: React.ReactNode
}

export function SidebarMobile({ children }: SidebarMobileProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='ghost' className='-ml-2 flex size-9 p-0 lg:hidden'>
          <div className='size-6 bg-green-100' />
          <span className='sr-only'>Toggle Sidebar</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side='left'
        className='inset-y-0 flex h-auto w-[300px] flex-col p-0'
      >
        <Sidebar className='flex'>{children}</Sidebar>
      </SheetContent>
    </Sheet>
  )
}
