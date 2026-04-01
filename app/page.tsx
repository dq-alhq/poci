import { IconChevronRight, IconLockSquareRoundedFilled, IconShieldCheckFilled } from '@tabler/icons-react'
import { headers } from 'next/headers'
import Link from 'next/link'
import { ModeToggle } from '@/components/mode-toggle'
import { buttonVariants } from '@/components/ui/button-group'
import { auth } from '@/lib/auth' // path to your Better Auth server instance

export default async function Page() {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    const { disableSignUp } = auth.options.emailAndPassword

    return (
        <div className='flex min-h-screen flex-col'>
            {/* Navigation */}
            <header className='border-b'>
                <div className='container flex h-16 items-center justify-between'>
                    <div className='flex items-center'>
                        <span className='font-bold text-xl'>HQ-UI Starter</span>
                    </div>
                    <nav className='flex items-center gap-6'>
                        <div className='flex items-center gap-2'>
                            <ModeToggle />
                            {session?.user ? (
                                <Link className={buttonVariants()} href='/dashboard'>
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link className={buttonVariants({ variant: 'outline' })} href='/login'>
                                        Log in
                                    </Link>
                                    {!disableSignUp && (
                                        <Link className={buttonVariants({ variant: 'outline' })} href='/register'>
                                            Register
                                        </Link>
                                    )}
                                </>
                            )}
                        </div>
                    </nav>
                </div>
            </header>

            {/* Hero section */}
            <section className='py-20'>
                <div className='container flex flex-col items-center gap-6 text-center'>
                    <IconShieldCheckFilled className='text-primary' size={64} />
                    <h1 className='max-w-3xl font-bold text-4xl tracking-tight md:text-6xl'>
                        {/* //Modern Authentication for Next.js Applications */}
                        Next.js + Better Auth + Prisma Starter Kit
                    </h1>
                    <p className='max-w-2xl text-lg text-muted-foreground'>
                        Better-Auth is a complete authentication solution for your Next.js projects, powered by Prisma
                        and styled with HQ UI components.
                    </p>
                    <div className='mt-4 flex gap-4'>
                        <Link
                            className={buttonVariants({ size: 'lg' })}
                            href='https://github.com/hq-kit/nextjs'
                            rel='noopener'
                            target='_blank'
                        >
                            Clone Repository <IconChevronRight size={18} />
                        </Link>
                        <Link className={buttonVariants({ size: 'lg', variant: 'outline' })} href='/login'>
                            Try Demo
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className='mt-auto border-t py-10'>
                <div className='container flex flex-col items-center justify-between gap-6 md:flex-row'>
                    <div className='flex items-center gap-2'>
                        <IconLockSquareRoundedFilled className='text-primary' size={20} />
                        <span className='font-bold'>HQ UI Starter</span>
                    </div>
                    <div className='flex gap-8'>
                        <a
                            className='text-muted-foreground text-sm hover:text-foreground'
                            href='https://github.com/hq-kit/nextjs'
                            rel='noopener'
                            target='_blank'
                        >
                            Github
                        </a>
                        <a
                            className='text-muted-foreground text-sm hover:text-foreground'
                            href='https://hq-ui.vercel.app'
                            rel='noopener'
                            target='_blank'
                        >
                            UI Kits
                        </a>
                        <a
                            className='text-muted-foreground text-sm hover:text-foreground'
                            href='https://x.com/dqalhq'
                            rel='noopener'
                            target='_blank'
                        >
                            Contact
                        </a>
                    </div>
                    <div className='text-muted-foreground text-sm'>© {new Date().getFullYear()} DQ Al Haqqi</div>
                </div>
            </footer>
        </div>
    )
}
