import type { Item } from '@/generated/prisma/client'
import Image from 'next/image'
import { GridListItem } from 'react-aria-components'
import { ItemContent, ItemDescription, ItemHeader, ItemTitle, itemVariants } from '@/components/ui/item'
import { Skeleton } from '@/components/ui/skeleton'

export const ItemMenu = ({ item, onAction }: { item: Item; onAction: () => void }) => {
    return (
        <GridListItem
            className={itemVariants({
                variant: 'outline',
                size: 'sm',
                className: 'cursor-pointer'
            })}
            key={item.id}
            onAction={onAction}
            textValue={item.name}
        >
            <ItemHeader>
                {item?.image ? (
                    <Image
                        alt={item.name}
                        className='aspect-square w-full object-cover'
                        height={256}
                        src={item?.image || ''}
                        width={256}
                    />
                ) : (
                    <Skeleton className='aspect-square w-full' />
                )}
            </ItemHeader>
            <ItemContent>
                <ItemTitle className='line-clamp-1 w-full justify-center text-center'>{item.name}</ItemTitle>
                <ItemDescription className='text-center'>
                    {item.stock} {item.unit}
                </ItemDescription>
            </ItemContent>
        </GridListItem>
    )
}
