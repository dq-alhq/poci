'use client'

import dynamic from 'next/dynamic'
import { useMemo } from 'react'
import { Skeleton } from '@/components/ui/skeleton'

interface Props {
    lat: number
    lng: number
}

export const OutletMap = ({ lat, lng }: Props) => {
    const MapComponent = useMemo(
        () =>
            dynamic(() => import('@/components/map'), {
                loading: () => <Skeleton className='aspect-square size-full object-cover' />,
                ssr: false
            }),
        []
    )
    return <MapComponent lat={lat} lng={lng} />
}
