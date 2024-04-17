import Link from 'next/link'

import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { Icons } from '@/components/icons'
import { UserAuthForm } from '@/components/containers/auth/user-auth-form'

export const metadata = {
  title: 'Create an account',
  description: 'Create an account to get started.',
}

export default function RegisterPage() {
  return (
    <>
      <Link
        href='/login'
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'absolute left-4 top-4 md:left-10 md:top-8'
        )}
      >
        Login
      </Link>
      <div className='lg:p-8 lg:col-span-2'>
        <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
          <div className='flex flex-col space-y-2 text-center'>
            <Icons.logo className='lg:hidden mx-auto h-6 w-6' />
            <h1 className='text-2xl font-semibold tracking-tight'>
              Create an account
            </h1>
            <p className='text-sm text-muted-foreground'>
              Enter your email below to create your account
            </p>
          </div>
          <UserAuthForm />
          <p className='px-8 text-center text-sm text-muted-foreground'>
            By clicking continue, you agree to our{' '}
            <Link
              href='/terms'
              className='hover:text-brand underline underline-offset-4'
            >
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link
              href='/privacy'
              className='hover:text-brand underline underline-offset-4'
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </>
  )
}
