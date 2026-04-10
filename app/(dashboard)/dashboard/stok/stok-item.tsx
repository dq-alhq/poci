'use client'

import type { Product } from '@/generated/prisma/client'
import { IconMinus, IconPlus } from '@tabler/icons-react'
import Image from 'next/image'
import { useState } from 'react'
import { GridListItem } from 'react-aria-components'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { FieldSet } from '@/components/ui/field'
import { InputGroup } from '@/components/ui/input'
import { ItemContent, ItemDescription, ItemHeader, ItemTitle, itemVariants } from '@/components/ui/item'
import { Popover } from '@/components/ui/popover'
import { TransferType } from '@/generated/prisma/enums'
import { modifyStock } from '@/server/services/products.service'

export const StokItem = ({ product }: { product: Product }) => {
    const [stock, setStock] = useState<number>(0)
    const [type, _setType] = useState<TransferType>(TransferType.IN)
    const handleStockChange = async () => {
        const res = await modifyStock(product.id, stock, type)
        if (res.success) {
            toast.success(res.message)
        } else toast.error(res.message)
    }
    return (
        <GridListItem
            className={itemVariants({
                variant: 'outline',
                size: 'sm',
                className: 'cursor-pointer'
            })}
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
                <ItemTitle className='line-clamp-1 w-full justify-center text-center'>{product.name}</ItemTitle>
                <ItemDescription className='text-center'>
                    {product.qty} {product.unit}
                </ItemDescription>
                <Popover>
                    <Button variant='default'>Tambah Stok</Button>
                    <Popover.Content>
                        <FieldSet>
                            <InputGroup>
                                <InputGroup.Addon>
                                    <InputGroup.Button
                                        onPress={() => setStock(Math.max(0, stock - 1))}
                                        variant='default'
                                    >
                                        <IconMinus />
                                    </InputGroup.Button>
                                </InputGroup.Addon>
                                <InputGroup.Input
                                    className='text-center'
                                    onChange={(e) => setStock(Number(e.target.value))}
                                    value={stock}
                                />
                                <InputGroup.Addon align={'inline-end'}>
                                    <InputGroup.Button onPress={() => setStock(stock + 1)} variant='default'>
                                        <IconPlus />
                                    </InputGroup.Button>
                                </InputGroup.Addon>
                            </InputGroup>
                            {stock > 0 && (
                                <Button className='w-full' onPress={handleStockChange}>
                                    Simpan
                                </Button>
                            )}
                        </FieldSet>
                    </Popover.Content>
                </Popover>
                <Popover>
                    <Button variant='destructive'>Barang Rusak</Button>
                    <Popover.Content>
                        <FieldSet>
                            <InputGroup>
                                <InputGroup.Addon>
                                    <InputGroup.Button
                                        onPress={() => setStock(Math.max(0, stock - 1))}
                                        variant='default'
                                    >
                                        <IconMinus />
                                    </InputGroup.Button>
                                </InputGroup.Addon>
                                <InputGroup.Input
                                    className='text-center'
                                    onChange={(e) => setStock(Number(e.target.value))}
                                    value={stock}
                                />
                                <InputGroup.Addon align={'inline-end'}>
                                    <InputGroup.Button onPress={() => setStock(stock + 1)} variant='default'>
                                        <IconPlus />
                                    </InputGroup.Button>
                                </InputGroup.Addon>
                            </InputGroup>
                            {stock > 0 && (
                                <Button className='w-full' onPress={handleStockChange}>
                                    Simpan
                                </Button>
                            )}
                        </FieldSet>
                    </Popover.Content>
                </Popover>
            </ItemContent>
        </GridListItem>
    )
}
