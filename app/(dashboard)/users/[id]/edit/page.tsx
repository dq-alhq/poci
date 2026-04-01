import type { User } from '@/generated/prisma/client'
import { headers } from 'next/headers'
import Heading from '@/components/heading'
import { auth } from '@/lib/auth'
import { UserForm } from '../../form'

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
        <div className='space-y-4 px-4 lg:px-6'>
            <Heading description='Fill the form below' title='Update User' />
            <UserForm user={user as User} />
        </div>
    )
}
