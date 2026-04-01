import type { User } from '@/generated/prisma/client'
import { headers } from 'next/headers'
import { UserForm } from '@/app/(dashboard)/users/form'
import { InterceptModal } from '@/components/intercept-modal'
import { auth } from '@/lib/auth'

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const user = await auth.api.getUser({
        query: {
            id
        },
        headers: await headers()
    })

    if (!user) return null
    return (
        <InterceptModal description='Fill the form below' title='Update User'>
            <UserForm user={user as User} />
        </InterceptModal>
    )
}
