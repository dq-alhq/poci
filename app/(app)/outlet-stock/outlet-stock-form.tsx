'use client'

import type { Product } from '@/generated/prisma/client'
import { IconDeviceFloppy, IconMinus, IconPlus } from '@tabler/icons-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { GridListItem } from 'react-aria-components'
import { toast } from 'sonner'
import { ItemGroup, ItemGroupSection } from '@/components/item-card'
import { Button } from '@/components/ui/button'
import { FieldSet } from '@/components/ui/field'
import { InputGroup } from '@/components/ui/input'
import { ItemContent, ItemDescription, ItemHeader, ItemTitle, itemVariants } from '@/components/ui/item'
import { NumberField } from '@/components/ui/number-field'
import { addOutletStock } from '@/server/services/outlet-stock.service'

export function OutletStockForm({ products, outletId }: { products: Product[]; outletId: string }) {
    const [loading, setLoading] = useState(false)
    const [items, setItems] = useState<Record<string, number>>({})
    const router = useRouter()

    const onSave = async () => {
        setLoading(true)
        const { success, message } = await addOutletStock({
            items: Object.entries(items).map(([productId, qty]) => ({ productId, qty, outletId }))
        })
        if (!success) {
            setLoading(false)
            return
        }
        if (success) {
            toast.success(message)
            router.push('/')
            setLoading(false)
        }
    }

    return (
        <div className='space-y-6'>
            <ItemGroup>
                <ItemGroupSection>
                    {products.map((product) => (
                        <GridListItem
                            className={itemVariants({
                                variant: 'outline',
                                size: 'sm',
                                className: 'cursor-pointer'
                            })}
                            key={product.id}
                            textValue={product.name}
                        >
                            <ItemHeader>
                                <Image
                                    alt={product.name}
                                    className='aspect-square w-full object-cover'
                                    height={256}
                                    src={product?.image || ''}
                                    width={256}
                                />
                            </ItemHeader>
                            <ItemContent>
                                <ItemTitle className='line-clamp-1 w-full justify-center text-center'>
                                    {product.name}
                                </ItemTitle>
                                <ItemDescription className='text-center'>
                                    {product.qty} {product.unit}
                                </ItemDescription>
                            </ItemContent>
                            <FieldSet>
                                <NumberField
                                    aria-label={`Jumlah ${product.name}`}
                                    minValue={0}
                                    name={`qty-${product.id}`}
                                    onChange={(value) => setItems({ ...items, [product.id]: value })}
                                    value={items[product.id]}
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
                                <input name={`price-${product.id}`} type='hidden' value={product.buyPrice} />
                            </FieldSet>
                        </GridListItem>
                    ))}
                </ItemGroupSection>
            </ItemGroup>

            <Button className='w-full' isPending={loading} onPress={onSave} type='submit'>
                <IconDeviceFloppy />
                Simpan
            </Button>
        </div>
    )
}
