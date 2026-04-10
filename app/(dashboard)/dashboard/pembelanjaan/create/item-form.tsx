'use client'

import type { Product } from '@/generated/prisma/client'
import { IconDeviceFloppy, IconMinus, IconPlus } from '@tabler/icons-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useActionState, useEffect } from 'react'
import { GridListItem } from 'react-aria-components'
import { toast } from 'sonner'
import { ItemGroup, ItemGroupSection } from '@/components/item-card'
import { Button } from '@/components/ui/button'
import { FieldSet, Form } from '@/components/ui/field'
import { InputGroup } from '@/components/ui/input'
import { ItemContent, ItemDescription, ItemHeader, ItemTitle, itemVariants } from '@/components/ui/item'
import { NumberField } from '@/components/ui/number-field'
import { addToCart } from '@/server/services/cart.service'

export function ItemForm({ items }: { items: Product[] }) {
    const [state, action, pending] = useActionState(addToCart, null)

    const router = useRouter()

    useEffect(() => {
        if (state?.success) {
            toast.success(state.message || 'Item berhasil ditambahkan')
            router.push('/dashboard/pembelanjaan/create/cart')
        } else if (state?.error) {
            toast.error(state?.error || 'Item gagal ditambahkan')
        }
    }, [state])

    return (
        <Form action={action} className='space-y-4' validationErrors={state?.error}>
            <ItemGroup>
                <ItemGroupSection>
                    {items.map((product) => (
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

            <Button className='w-full' isPending={pending} type='submit'>
                <IconDeviceFloppy />
                Simpan
            </Button>
        </Form>
    )
}
