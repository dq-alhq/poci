'use client'

import type * as React from 'react'
import { useRouter } from 'next/navigation'
import { ThemeProvider, type ThemeProviderProps } from 'next-themes'
import { RouterProvider } from 'react-aria-components'
import { Toaster } from './ui/sonner'

declare module 'react-aria-components' {
    interface RouterConfig {
        routerOptions: NonNullable<Parameters<ReturnType<typeof useRouter>['push']>[1]>
    }
}

function ClientProvider({ children }: { children: React.ReactNode }) {
    const router = useRouter()

    return <RouterProvider navigate={router.push}>{children}</RouterProvider>
}

export function Providers({ children, ...props }: ThemeProviderProps) {
    return (
        <ClientProvider>
            <ThemeProvider {...props}>
                <Toaster richColors />
                {children}
            </ThemeProvider>
        </ClientProvider>
    )
}
