import { Providers } from '@/components/providers'
import './globals.css'
import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { headers } from 'next/headers'

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

export default async function RootLayout({
    children,
    modal
}: Readonly<{
    children: React.ReactNode
    modal: React.ReactNode
}>) {
    const acceptLanguage = (await headers()).get('accept-language')
    const lang = acceptLanguage?.split(/[,;]/)[0] || 'id-ID'

    return (
        <html className={`${fontSans.variable} ${fontMono.variable}`} lang={lang} suppressHydrationWarning>
            <body className='font-sans antialiased'>
                <Providers attribute='class' defaultTheme='system' disableTransitionOnChange enableSystem>
                    {children}
                    {modal}
                </Providers>
            </body>
        </html>
    )
}
