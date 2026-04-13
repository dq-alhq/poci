import { Suspense } from 'react'
import EndShift from '@/app/(app)/[shiftId]/end-shift'

export default async function EndShiftPage({ params }: { params: Promise<{ shiftId: string }> }) {
    const { shiftId } = await params

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <EndShift shiftId={Number(shiftId)} />
        </Suspense>
    )
}
