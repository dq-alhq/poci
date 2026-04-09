'use client'

import type { Outlet } from '@/generated/prisma/client'
import { GridListItem } from 'react-aria-components'
import { ItemContent, ItemDescription, ItemHeader, ItemTitle, itemVariants } from '@/components/ui/item'
import { OutletMap } from './outlet-map'

export const OutletCard = ({ outlet }: { outlet: Outlet }) => {
    return (
        <GridListItem
            className={itemVariants({
                variant: 'outline',
                size: 'sm',
                className: 'cursor-pointer'
            })}
            href={`/dashboard/outlet/${outlet.id}`}
            textValue={`${outlet.name} ${outlet.location}`}
        >
            <ItemHeader>
                <OutletMap lat={parseFloat(outlet.latitude!)} lng={parseFloat(outlet.longitude!)} />
            </ItemHeader>
            <ItemContent>
                <ItemTitle>{outlet.name}</ItemTitle>
                <ItemDescription>{outlet.location}</ItemDescription>
            </ItemContent>
        </GridListItem>
    )
}
