'use client'

import type { Product } from '@/generated/prisma/client'
import { IconDeviceFloppy } from '@tabler/icons-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { FieldSet } from '@/components/ui/field'
import { ItemContent, ItemDescription, ItemGroup, ItemHeader, ItemTitle, itemVariants } from '@/components/ui/item'
import { NumberField, NumberInputSm } from '@/components/ui/number-field'
import { Skeleton } from '@/components/ui/skeleton'
import { formatRupiah } from '@/lib/utils'
import { createSales } from '@/server/services/sales.service'

export function SalesForm({ products, shiftId, outletId }: { products: Product[]; shiftId: string; outletId: string }) {
    const [loading, startTransition] = useTransition()
    const [stocks, setStocks] = useState<Record<string, number>>({})
    const router = useRouter()

    const onSave = async () => {
        startTransition(async () => {
            const { success, message } = await createSales({
                shiftId: Number(shiftId),
                outletId,
                total: Object.values(stocks).reduce((total, qty) => total + qty, 0),
                items: Object.entries(stocks).map(([productId, qty]) => ({
                    productId,
                    qty,
                    price: Number(products.find((product) => product.id === productId)?.price)
                }))
            })
            if (!success) {
                toast.error(message ?? 'Gagal menyimpan penjualan')
            }
            if (success) {
                toast.success(message)
                router.push('/')
            }
        })
    }

    return (
        <div className='space-y-6'>
            <ItemGroup className='grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
                {products.map((product) => (
                    <div
                        className={itemVariants({
                            variant: 'outline',
                            size: 'sm',
                            className: 'cursor-pointer'
                        })}
                        key={product.id}
                    >
                        <ItemHeader>
                            {product.image ? (
                                <Image
                                    alt={product.name}
                                    className='aspect-square w-full object-cover'
                                    height={256}
                                    src={product.image}
                                    width={256}
                                />
                            ) : (
                                <Skeleton className='aspect-square w-full object-cover' />
                            )}
                        </ItemHeader>
                        <ItemContent>
                            <ItemTitle className='line-clamp-1 w-full justify-center text-center'>
                                {product.name}
                            </ItemTitle>
                            <ItemDescription className='text-center'>{formatRupiah(product.price)}</ItemDescription>
                        </ItemContent>
                        <FieldSet>
                            <NumberField
                                aria-label={`Jumlah ${product.name}`}
                                minValue={0}
                                name={`qty-${product.id}`}
                                onChange={(value) => setStocks({ ...stocks, [product.id]: value })}
                                value={stocks[product.id] || 0}
                            >
                                <NumberInputSm />
                            </NumberField>
                            <input name={`price-${product.id}`} type='hidden' value={product.price} />
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
