import { Suspense } from 'react'
import { StartShift } from './start-shift'

export default function Page() {
    return (
        <div>
            <Suspense fallback={<div>Loading...</div>}>
                <StartShift />
            </Suspense>
        </div>
    )
}
