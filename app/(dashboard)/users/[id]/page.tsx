import { Suspense } from 'react'
import { UserDetails } from './user-details'

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
