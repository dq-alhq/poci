import { headers } from 'next/headers'
import { AppSidebar } from '@/components/app-sidebar'
import { AppSidebarHeader } from '@/components/app-sidebar-header'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { auth } from '@/lib/auth' // path to your Better Auth server instance

export default async function layout({
    children
    // modal
}: Readonly<{
    children: React.ReactNode
    // modal: React.ReactNode
}>) {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session?.user) {
        return
    }

    return (
        <SidebarProvider
            style={
                {
                    '--sidebar-width': 'calc(var(--spacing) * 72)',
                    '--header-height': 'calc(var(--spacing) * 14)'
                } as React.CSSProperties
            }
        >
            <AppSidebar user={session?.user} variant='inset' />
            <SidebarInset>
                <AppSidebarHeader />
                <div className='flex flex-1 flex-col'>
                    <div className='@container/main flex flex-1 flex-col gap-2'>
                        <div className='flex flex-col gap-4 py-4 md:gap-6 md:py-6'>
                            {children}
                            {/* {modal} */}
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
