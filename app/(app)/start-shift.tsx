import { headers } from 'next/headers'
import { Suspense } from 'react'
import { auth } from '@/lib/auth'
import { getCurrentOpenShift, getOutlets } from '@/server/repositories/shift.repository'
import { OutletStock } from './outlet-stock'
import { ShiftModal } from './shift-modal'

export const StartShift = async () => {
    const outlets = await getOutlets()
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session?.user?.id) {
        return null
    }

    const currentShift = await getCurrentOpenShift(session?.user?.id)

    return currentShift ? (
        <div>
            <Suspense fallback={<div>Loading...</div>}>
                <OutletStock outletId={currentShift.outletId} />
            </Suspense>
        </div>
    ) : (
        <ShiftModal outlets={outlets} user={session?.user} />
    )
}
