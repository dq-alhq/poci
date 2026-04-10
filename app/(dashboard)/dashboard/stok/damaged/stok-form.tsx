'use client'

import type { Product } from '@/generated/prisma/client'
import { IconDeviceFloppy, IconMinus, IconPlus } from '@tabler/icons-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useActionState, useEffect } from 'react'
import { FieldError, GridListItem } from 'react-aria-components'
import { toast } from 'sonner'
import { ItemGroup, ItemGroupSection } from '@/components/item-card'
import { Button } from '@/components/ui/button'
import { FieldLabel, FieldSet, Form } from '@/components/ui/field'
import { InputGroup, Textarea } from '@/components/ui/input'
import { ItemContent, ItemDescription, ItemHeader, ItemTitle, itemVariants } from '@/components/ui/item'
import { NumberField } from '@/components/ui/number-field'
import { TextField } from '@/components/ui/text-field'
import { updateStock } from '@/server/services/products.service'

export function StokForm({ items }: { items: Product[] }) {
    const [state, action, pending] = useActionState(updateStock, null)

    const router = useRouter()

    useEffect(() => {
        if (state?.success) {
            toast.success(state.message || 'Stok Rusak berhasil disimpan')
            router.push('/dashboard/stok')
        } else if (state?.error) {
            toast.error(state.message || 'Stok Rusak gagal disimpan')
        }
    }, [state])

    return (
        <Form action={action} className='space-y-4' validationErrors={state?.error}>
            <input name='type' type='hidden' value={'DAMAGED'} />
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
                                        <InputGroup.Input className='text-center' name={`${product.id}`} />
                                        <InputGroup.Addon align={'inline-end'}>
                                            <InputGroup.Button slot='increment' variant='default'>
                                                <IconPlus />
                                            </InputGroup.Button>
                                        </InputGroup.Addon>
                                    </InputGroup>
                                    <FieldError />
                                </NumberField>
                            </FieldSet>
                        </GridListItem>
                    ))}
                </ItemGroupSection>
            </ItemGroup>

            <TextField name='note'>
                <FieldLabel>Catatan</FieldLabel>
                <Textarea />
                <FieldError />
            </TextField>

            <Button className='w-full' isPending={pending} type='submit'>
                <IconDeviceFloppy />
                Simpan
            </Button>
        </Form>
    )
}
