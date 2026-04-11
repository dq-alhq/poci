'use client'

import type { Item } from '@/generated/prisma/client'
import { IconDeviceFloppy, IconPlus, IconTrash } from '@tabler/icons-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { type FormEvent, useState, useTransition } from 'react'
import { FieldError, GridListItem } from 'react-aria-components'
import { toast } from 'sonner'
import { ItemGroup, ItemGroupSection } from '@/components/item-card'
import { Autocomplete } from '@/components/ui/autocomplete'
import { Button } from '@/components/ui/button'
import { Drawer } from '@/components/ui/drawer'
import { FieldLabel, Form } from '@/components/ui/field'
import { Textarea } from '@/components/ui/input'
import {
    ItemActions,
    ItemContent,
    ItemDescription,
    ItemHeader,
    ItemMedia,
    ItemTitle,
    itemVariants,
    ItemGroup as NativeItemGroup
} from '@/components/ui/item'
import { NumberField, NumberInputSm } from '@/components/ui/number-field'
import { SearchField, SearchInput } from '@/components/ui/search-field'
import { Skeleton } from '@/components/ui/skeleton'
import { TextField } from '@/components/ui/text-field'
import { updateStock } from '@/server/services/item.service'

export function StokForm({ items }: { items: Item[] }) {
    const [openDialog, setOpenDialog] = useState(false)
    const [errors, setErrors] = useState<Record<string, string>>({})
    const [stocks, setStocks] = useState<{ itemId: string; quantity: number }[]>([])
    const [note, setNote] = useState('')

    const router = useRouter()

    const [pending, startTransition] = useTransition()

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (stocks.length === 0) {
            setErrors({ note: 'Silakan pilih item' })
            return
        }
        startTransition(async () => {
            const { success, error, message } = await updateStock({
                note,
                items: stocks.map((stock) => ({ itemId: stock.itemId, qty: stock.quantity })),
                type: 'DAMAGED'
            })
            if (error) {
                setErrors({ note: error.message })
                toast.error(error)
                return
            }
            if (success) {
                toast.success(message || 'Stok berhasil ditambahkan')
            }
            setErrors({})
            router.push('/dashboard/stok')
        })
    }

    return (
        <Form className='space-y-4' onSubmit={onSubmit} validationErrors={errors}>
            <Drawer isOpen={openDialog} onOpenChange={setOpenDialog}>
                <Button onPress={() => setOpenDialog(true)}>
                    <IconPlus />
                    Tambah Item
                </Button>
                <Drawer.Content>
                    <Drawer.Header>
                        <Drawer.Title>Tambah Item</Drawer.Title>
                        <Drawer.Description>Silakan pilih item</Drawer.Description>
                    </Drawer.Header>
                    <Drawer.Body>
                        <Autocomplete>
                            <SearchField aria-label='Cari' className='mb-4'>
                                <SearchInput placeholder='Cari item' />
                            </SearchField>
                            <ItemGroup>
                                <ItemGroupSection className='sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3'>
                                    {items
                                        .filter((item) => !stocks.find((stock) => stock.itemId === item.id))
                                        .map((item) => (
                                            <GridListItem
                                                className={itemVariants({
                                                    variant: 'outline',
                                                    size: 'sm',
                                                    className: 'cursor-pointer'
                                                })}
                                                key={item.id}
                                                onAction={() => {
                                                    setStocks((prev) => [...prev, { itemId: item.id, quantity: 0 }])
                                                    setOpenDialog(false)
                                                }}
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
                                                    <ItemTitle className='line-clamp-1 w-full justify-center text-center'>
                                                        {item.name}
                                                    </ItemTitle>
                                                    <ItemDescription className='text-center'>
                                                        {item.stock} {item.unit}
                                                    </ItemDescription>
                                                </ItemContent>
                                            </GridListItem>
                                        ))}
                                </ItemGroupSection>
                            </ItemGroup>
                        </Autocomplete>
                    </Drawer.Body>
                </Drawer.Content>
            </Drawer>

            <NativeItemGroup className='grid gap-2 lg:grid-cols-3'>
                {items
                    .filter((item) => stocks.find((stock) => stock.itemId === item.id))
                    .map((item, i) => (
                        <div className={itemVariants({ variant: 'outline', className: 'relative' })} key={i}>
                            <ItemMedia className='size-20' variant='image'>
                                {item?.image ? (
                                    <Image
                                        alt={item.name}
                                        className='object-cover'
                                        height={64}
                                        src={item?.image}
                                        width={64}
                                    />
                                ) : (
                                    <Skeleton className='aspect-square w-full' />
                                )}
                            </ItemMedia>
                            <ItemContent>
                                <ItemTitle className='line-clamp-1'>{item.name}</ItemTitle>
                                <NumberField
                                    aria-label='Qty'
                                    className='max-w-32 lg:max-w-64'
                                    minValue={0}
                                    onChange={(value) =>
                                        setStocks(
                                            stocks.map((stock) =>
                                                stock.itemId === item.id ? { ...stock, quantity: value } : stock
                                            )
                                        )
                                    }
                                    orientation='horizontal'
                                    value={stocks.find((stock) => stock.itemId === item.id)?.quantity || 0}
                                >
                                    <NumberInputSm />
                                    <FieldError />
                                </NumberField>
                            </ItemContent>
                            <ItemActions className='absolute top-2 right-2'>
                                <Button size='icon-sm' variant='destructive'>
                                    <IconTrash />
                                </Button>
                            </ItemActions>
                        </div>
                    ))}
            </NativeItemGroup>

            <TextField name='note' onChange={setNote} value={note}>
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
