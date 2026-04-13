import type { Metadata } from 'next'
import { Suspense } from 'react'
import { getUserById } from '@/server/services/users.service'
import { UserDetails } from './user-details'

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const { id } = await params
    const user = await getUserById(id)
    return {
        title: user?.name || 'User'
    }
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params

    return (
        <div className='space-y-4 px-4 lg:px-6'>
            <Suspense fallback={<div>Loading...</div>}>
                <UserDetails id={id} />
            </Suspense>
        </div>
    )
}
