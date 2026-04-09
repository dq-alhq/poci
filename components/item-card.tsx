'use client'

import type { PropsWithChildren } from 'react'
import type { Product } from '@/generated/prisma/client'
import Image from 'next/image'
import { GridList, GridListHeader, GridListItem, GridListSection } from 'react-aria-components'
import { ItemContent, ItemDescription, ItemHeader, ItemTitle, itemVariants } from '@/components/ui/item'
import { cn, formatRupiah } from '@/lib/utils'

export const ItemCard = ({ product }: { product: Product }) => {
    return (
        <GridListItem
            className={itemVariants({
                variant: 'outline',
                size: 'sm',
                className: 'cursor-pointer'
            })}
            href={`/dashboard/produk/${product.id}`}
            textValue={product.name}
        >
            <ItemHeader>
                <Image
                    alt={product.name}
                    className='aspect-square w-full object-cover'
                    height={128}
                    src={product?.image || ''}
                    width={128}
                />
            </ItemHeader>
            <ItemContent>
                <ItemTitle>{product.name}</ItemTitle>
                <ItemDescription>
                    {formatRupiah(product.isProduct ? product.sellPrice! : product.buyPrice!)}
                </ItemDescription>
            </ItemContent>
        </GridListItem>
    )
}

export const ItemGroup = ({ children, className }: PropsWithChildren & { className?: string }) => {
    return (
        <GridList aria-label='Item Group' className={cn('space-y-6', className)} layout='grid'>
            {children}
        </GridList>
    )
}

export const ItemGroupHeader = ({ children }: PropsWithChildren) => {
    return <GridListHeader className='col-span-full font-bold text-lg'>{children}</GridListHeader>
}

export const ItemGroupSection = ({ children, className }: PropsWithChildren & { className?: string }) => {
    return (
        <GridListSection
            className={cn('grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6', className)}
        >
            {children}
        </GridListSection>
    )
}
