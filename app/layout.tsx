import { Providers } from '@/components/providers'
import './globals.css'
import type { Metadata } from 'next'
import localFont from 'next/font/local'

const fontSans = localFont({
    src: './fonts/InstrumentSans.ttf',
    variable: '--font-instrument-sans'
})

const fontMono = localFont({
    src: './fonts/JetbrainsMono.ttf',
    variable: '--font-jetbrains-mono'
})

export const metadata: Metadata = {
    title: 'Nextjs Starter',
    description: 'Nextjs, Prisma, Better Auth, HQ UI'
}

export default function RootLayout({
    children,
    modal
}: Readonly<{
    children: React.ReactNode
    modal: React.ReactNode
}>) {
    return (
        <html className={`${fontSans.variable} ${fontMono.variable}`} lang='en' suppressHydrationWarning>
            <body className='font-sans antialiased'>
                <Providers attribute='class' defaultTheme='system' disableTransitionOnChange enableSystem>
                    {children}
                    {modal}
                </Providers>
            </body>
        </html>
    )
}
