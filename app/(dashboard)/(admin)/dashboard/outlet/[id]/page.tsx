import { Suspense } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { OutletDetails, OutletMapLocation } from './outlet-details'

export default async function OutletPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params

    return (
        <div className='grid gap-4 px-6 lg:grid-cols-[300px_1fr]'>
            <div className='aspect-square rounded-lg border shadow-sm'>
                <Suspense fallback={<Skeleton className='size-full' />}>
                    <OutletMapLocation id={id} />
                </Suspense>
            </div>
            <Suspense fallback={<Skeleton className='size-full' />}>
                <OutletDetails id={id} />
            </Suspense>
        </div>
    )
}
