import { Suspense } from 'react'
import { Homepage } from './homepage'

export default function Page() {
    return (
        <div>
            <Suspense fallback={<div>Loading...</div>}>
                <Homepage />
            </Suspense>
        </div>
    )
}
