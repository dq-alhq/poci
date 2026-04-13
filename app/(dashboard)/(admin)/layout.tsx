import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'

export default async function Layout({ children }: { children: React.ReactNode }) {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    if (!session || !session?.user) {
        return redirect('/login')
    }
    if (session.user.role !== 'admin') {
        return redirect('/dashboard')
    }

    return children
}
