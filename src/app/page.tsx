'use client'
import { Sidebar } from '@/components/containers/sidebar/sidebar'
import SidebarItem from '@/components/containers/sidebar/sidebar-item'
import Toggle from '@/components/containers/sidebar/sidebar-toggle'
import Card from '@/components/ui/card'

export default function Home() {
  return (
    <div className='flex relative min-h-full w-full z-0 '>
      <Sidebar className='min-h-screen z-30 hidden  border-r bg-muted duration-300 ease-in-out data-[state=closed]:w-0 data-[state=closed]:hidden lg:flex w-[300px] bg-gray-50'>
        {/* @ts-ignore */}
        <SidebarItem />
      </Sidebar>
      <main className='relative min-h-screen w-full flex flex-col flex-1 transition-width pb-4 px-4 lg:px-16 '>
        <Toggle />
        <div className='flex-col lg:pt-4'>
          <h1 className='font-bold text-2xl'>Your Submitted Applications</h1>
          <h1 className='text-bold text-gray-500'>15 TOTAL APPLICATIONS</h1>
          <div className='bg-gray-300 h-[1px] lg:mt-2'></div>
        </div>
        <div className='relative  focus-within:z-10 mt-4'>
          <input
            className='block h-11 w-full rounded-md bg-gray-100 border-gray-500 pl-10 text-base leading-5 transition focus:border-sky-300 focus:outline-none focus:ring-4 focus:ring-sky-300'
            data-testid='custom-search'
            placeholder='Search for roles or companies'
            type='search'
          ></input>
        </div>
        <div className='flex-1 mt-4 overflow-y-scroll'>
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </main>
    </div>
  )
}
