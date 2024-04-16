import { Icons } from '@/components/icons'

interface AuthLayoutProps {
  children: React.ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className='container grid h-screen w-screen flex-col items-center justify-center lg:max-w-none lg:grid-cols-3 lg:px-0'>
      {children}
      <div className='hidden h-full  lg:flex lg:flex-col lg:items-start  lg:col-span-1 '>
        <div className='w-[1px] bg-black h-1/2' />
        <div className='flex flex-row items-center -translate-x-6 space-x-2 justify-center text-black'>
          <Icons.logo className='my-6 size-12' />
          <h1 className='text-xl font-mono'>Application Tracker</h1>
        </div>
        <div className='w-[1px] bg-gray-400 h-1/2' />
      </div>
    </div>
  )
}
