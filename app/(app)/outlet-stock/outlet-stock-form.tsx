'use client'

import type { Item } from '@/generated/prisma/client'
import { IconDeviceFloppy, IconMinus, IconPlus } from '@tabler/icons-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { FieldSet } from '@/components/ui/field'
import { InputGroup } from '@/components/ui/input'
import { ItemContent, ItemDescription, ItemGroup, ItemHeader, ItemTitle, itemVariants } from '@/components/ui/item'
import { NumberField } from '@/components/ui/number-field'
import { Skeleton } from '@/components/ui/skeleton'
import { addOutletStock } from '@/server/services/outlet-stock.service'

export function OutletStockForm({ items, outletId }: { items: Item[]; outletId: string }) {
    const [loading, startTransition] = useTransition()
    const [stocks, setStocks] = useState<Record<string, number>>({})
    const router = useRouter()

    const onSave = async () => {
        startTransition(async () => {
            const { success, message } = await addOutletStock({
                items: Object.entries(stocks).map(([itemId, stock]) => ({ itemId, stock, outletId }))
            })
            if (!success) {
                toast.error(message ?? 'Gagal menambahkan stok ke outlet')
            }
            if (success) {
                toast.success(message ?? 'Stok berhasil ditambahkan ke outlet')
                router.push('/')
            }
        })
    }

    return (
        <div className='space-y-6'>
            <ItemGroup className='grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
                {items.map((item) => (
                    <div
                        className={itemVariants({
                            variant: 'outline',
                            size: 'sm',
                            className: 'cursor-pointer'
                        })}
                        key={item.id}
                    >
                        <ItemHeader>
                            {item.image ? (
                                <Image
                                    alt={item.name}
                                    className='aspect-square w-full object-cover'
                                    height={256}
                                    src={item.image}
                                    width={256}
                                />
                            ) : (
                                <Skeleton className='aspect-square w-full object-cover' />
                            )}
                        </ItemHeader>
                        <ItemContent>
                            <ItemTitle className='line-clamp-1 w-full justify-center text-center'>
                                {item.name}
                            </ItemTitle>
                            <ItemDescription className='text-center'>
                                {item.stock} {item.unit}
                            </ItemDescription>
                        </ItemContent>
                        <FieldSet>
                            <NumberField
                                aria-label={`Jumlah ${item.name}`}
                                maxValue={item.stock}
                                minValue={0}
                                name={`qty-${item.id}`}
                                onChange={(value) => setStocks({ ...stocks, [item.id]: value })}
                                value={stocks[item.id]}
                            >
                                <InputGroup>
                                    <InputGroup.Addon>
                                        <InputGroup.Button slot='decrement' variant='default'>
                                            <IconMinus />
                                        </InputGroup.Button>
                                    </InputGroup.Addon>
                                    <InputGroup.Input className='text-center' />
                                    <InputGroup.Addon align={'inline-end'}>
                                        <InputGroup.Button slot='increment' variant='default'>
                                            <IconPlus />
                                        </InputGroup.Button>
                                    </InputGroup.Addon>
                                </InputGroup>
                            </NumberField>
                            <input name={`price-${item.id}`} type='hidden' value={item.price} />
                        </FieldSet>
                    </div>
                ))}
            </ItemGroup>

            <Button className='w-full' isPending={loading} onPress={onSave} type='submit'>
                <IconDeviceFloppy />
                Simpan
            </Button>
        </div>
    )
}
