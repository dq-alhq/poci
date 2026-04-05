'use client'

import type { PropsWithChildren } from 'react'
import Image from 'next/image'
import { GridList, GridListHeader, GridListItem, GridListSection } from 'react-aria-components'
import { ItemContent, ItemDescription, ItemHeader, ItemTitle, itemVariants } from '@/components/ui/item'

export const ItemCard = ({ item }: { item: any }) => {
    return (
        <GridListItem
            className={itemVariants({
                variant: 'outline'
            })}
            textValue={item.title}
        >
            <ItemHeader>
                <Image
                    alt={item.title}
                    className='aspect-square w-full rounded-sm object-cover'
                    height={128}
                    src={item.thumbnail}
                    width={128}
                />
            </ItemHeader>
            <ItemContent>
                <ItemTitle>{item.title}</ItemTitle>
                <ItemDescription>{item.category}</ItemDescription>
            </ItemContent>
        </GridListItem>
    )
}

export const ItemGroup = ({ children }: PropsWithChildren) => {
    return (
        <GridList aria-label='Item Group' className='space-y-6' layout='grid'>
            {children}
        </GridList>
    )
}

export const ItemGroupHeader = ({ children }: PropsWithChildren) => {
    return <GridListHeader className='col-span-full font-bold text-lg'>{children}</GridListHeader>
}

export const ItemGroupSection = ({ children }: PropsWithChildren) => {
    return (
        <GridListSection className='grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6'>
            {children}
        </GridListSection>
    )
}
