'use client'

import type { Product } from '@/generated/prisma/client'
import { IconShoppingCart, IconTrash } from '@tabler/icons-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useActionState, useEffect, useState } from 'react'
import { toast } from 'sonner'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Dialog } from '@/components/ui/dialog'
import { Field, Form } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Item, itemVariants } from '@/components/ui/item'
import { NumberField, NumberInputSm } from '@/components/ui/number-field'
import { TextField } from '@/components/ui/text-field'
import { formatRupiah } from '@/lib/utils'
import { getProductsByIds } from '@/server/repositories/items.repository'
import { createPurchase } from '@/server/services/purchase.service'

export const CartForm = () => {
    const [items, setItems] = useState<Record<string, number>>({})
    const [products, setProducts] = useState<Product[]>([])
    const router = useRouter()

    useEffect(() => {
        const items = localStorage.getItem('items') || '{}'
        getProducts(JSON.parse(items))
        setItems(JSON.parse(items))
    }, [])

    const getProducts = async (ids: Record<string, number>) => {
        const products = await getProductsByIds(Object.keys(ids))
        setProducts(products)
    }

    const removeProduct = (id: string) => {
        setProducts(products.filter((p) => p.id !== id))
        setItems(Object.fromEntries(Object.entries(items).filter(([k]) => k !== id)))
        if (typeof window !== 'undefined') {
            localStorage.setItem(
                'items',
                JSON.stringify(Object.fromEntries(Object.entries(items).filter(([k]) => k !== id)))
            )
        }
    }

    const [state, action, pending] = useActionState(createPurchase, null)

    useEffect(() => {
        if (state?.success) {
            toast.success(state.message || 'Pembelanjaan berhasil')
            router.push('/dashboard/pembelanjaan')
        } else if (state?.error) {
            toast.error(state?.message || 'Pembelanjaan gagal')
        }
    }, [state])

    const sum = (array: number[]) => array.reduce((acc, cur) => acc + cur, 0)

    return (
        <Form action={action} validationErrors={state?.error}>
            <Field.Set>
                <TextField name='title'>
                    <Field.Label>Judul</Field.Label>
                    <Input placeholder='Pembelanjaan #1' />
                    <Field.Error />
                </TextField>
                <Item.Group className='grid gap-2 lg:grid-cols-3'>
                    {products?.map((product) => (
                        <div className={itemVariants({ variant: 'outline', className: 'relative' })} key={product.id}>
                            <Item.Media className='size-20' variant='image'>
                                <Image
                                    alt={product.name}
                                    className='object-cover'
                                    height={64}
                                    src={product.image || ''}
                                    width={64}
                                />
                            </Item.Media>
                            <Item.Content>
                                <Item.Title className='line-clamp-1'>{product.name}</Item.Title>
                                <Item.Description className='flex w-full items-center gap-1'>
                                    <span className='whitespace-nowrap'>Harga: {formatRupiah(product.buyPrice)}</span>
                                    <input
                                        aria-label='price'
                                        className='w-full outline-hidden'
                                        defaultValue={product.buyPrice}
                                        name={`price-${product.id}`}
                                        type='hidden'
                                    />
                                </Item.Description>
                                <NumberField
                                    aria-label='Qty'
                                    className='max-w-32 lg:max-w-64'
                                    minValue={0}
                                    name={`qty-${product.id}`}
                                    onChange={(value) => setItems({ ...items, [product.id]: value })}
                                    orientation='horizontal'
                                    value={items[product.id]}
                                >
                                    <NumberInputSm />
                                    <Field.Error />
                                </NumberField>
                                {items[product.id] && (
                                    <Item.Description className='flex w-full items-center gap-1'>
                                        <span className='whitespace-nowrap'>
                                            Subtotal: {formatRupiah(product.buyPrice * Number(items[product.id]))}
                                        </span>
                                        <input
                                            aria-label='subtotal'
                                            className='w-full outline-hidden'
                                            name={`subtotal-${product.id}`}
                                            type='hidden'
                                            value={product.buyPrice * Number(items[product.id])}
                                        />
                                    </Item.Description>
                                )}
                            </Item.Content>
                            <Item.Actions className='absolute top-2 right-2'>
                                <Dialog>
                                    <Button size='icon-sm' variant='destructive'>
                                        <IconTrash />
                                    </Button>
                                    <Dialog.Content>
                                        <Dialog.Header>
                                            <Dialog.Title>Yakin Hapus</Dialog.Title>
                                            <Dialog.Description>
                                                Apakah anda yakin ingin menghapus {product.name}?
                                            </Dialog.Description>
                                        </Dialog.Header>
                                        <Dialog.Body>
                                            <Button onPress={() => removeProduct(product.id)} variant='destructive'>
                                                <IconTrash /> Hapus
                                            </Button>
                                        </Dialog.Body>
                                    </Dialog.Content>
                                </Dialog>
                            </Item.Actions>
                        </div>
                    ))}
                </Item.Group>
                {products.length > 0 && (
                    <div className='flex justify-end'>
                        <Badge className='text-xl'>
                            Total:{' '}
                            {formatRupiah(
                                sum(
                                    Object.keys(items).map(
                                        (id) => (products.find((p) => p.id === id)?.buyPrice || 0) * items[id]
                                    )
                                )
                            )}
                        </Badge>
                        <input
                            name='total'
                            type='hidden'
                            value={sum(
                                Object.keys(items).map(
                                    (id) => (products.find((p) => p.id === id)?.buyPrice || 0) * items[id]
                                )
                            )}
                        />
                    </div>
                )}
                <input name='type' type='hidden' value={'ITEM'} />
                <Button isPending={pending} type='submit'>
                    <IconShoppingCart />
                    Simpan
                </Button>
            </Field.Set>
        </Form>
    )
}
