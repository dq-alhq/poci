import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import AppNavbar from '@/components/app-navbar'
import { Container } from '@/components/ui/container'
import { auth } from '@/lib/auth'

export default async function layout({
    children
}: Readonly<{
    children: React.ReactNode
}>) {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session?.user) {
        redirect('/login')
    }

    return (
        <>
            <AppNavbar />
            <div className='flex flex-1 flex-col'>
                <div className='@container/main flex flex-1 flex-col gap-2'>
                    <Container className='flex flex-col gap-4 py-4 md:gap-6 md:py-6'>{children}</Container>
                </div>
            </div>
        </>
    )
}
