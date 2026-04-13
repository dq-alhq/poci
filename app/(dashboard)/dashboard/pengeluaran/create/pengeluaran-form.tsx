'use client'

import type { Item } from '@/generated/prisma/client'
import { IconDeviceFloppy, IconPlus, IconTrash } from '@tabler/icons-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { type FormEvent, useState, useTransition } from 'react'
import { FieldError } from 'react-aria-components'
import { toast } from 'sonner'
import { ItemGroup, ItemGroupHeader, ItemGroupSection } from '@/components/item-card'
import { ItemMenu } from '@/components/item-menu'
import { Autocomplete } from '@/components/ui/autocomplete'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ComboBox } from '@/components/ui/combo-box'
import { Drawer } from '@/components/ui/drawer'
import { Field, Form } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import {
    ItemActions,
    ItemContent,
    ItemMedia,
    ItemTitle,
    itemVariants,
    ItemGroup as NativeItemGroup
} from '@/components/ui/item'
import { NumberField, NumberInput, NumberInputSm } from '@/components/ui/number-field'
import { Radio, RadioGroup } from '@/components/ui/radio'
import { SearchField, SearchInput } from '@/components/ui/search-field'
import { Skeleton } from '@/components/ui/skeleton'
import { authClient } from '@/lib/auth-client'
import { formatRupiah } from '@/lib/utils'
import { createPurchase } from '@/server/services/purchase.service'

const options = ['Pembayaran Listrik', 'Gaji Pegawai', 'Cetak Menu', 'Pembelian Alat', 'Perbaikan Alat']

export const PengeluaranForm = ({ items }: { items: Item[] }) => {
    const { data: session } = authClient.useSession()
    const router = useRouter()
    const [errors, setErrors] = useState<Record<string, string>>({})
    const [pending, startTransition] = useTransition()
    const [openDialog, setOpenDialog] = useState(false)

    const [type, setType] = useState<'stok' | 'others' | 'es-batu'>('others')

    const [title, setTitle] = useState<string>('')
    const [total, setTotal] = useState<number>(0)
    const [stocks, setStocks] = useState<{ itemId: string; qty: number; price: number }[]>([])

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setErrors({})
        startTransition(async () => {
            const { success, error, message } = await createPurchase({
                title: type === 'stok' ? 'Belanja Stok' : type === 'es-batu' ? 'Beli Es Batu' : title,
                total: type === 'stok' ? stocks.reduce((total, stock) => total + stock.price * stock.qty, 0) : total,
                items:
                    type === 'stok'
                        ? stocks.map((stock) => ({
                              itemId: stock.itemId,
                              qty: stock.qty,
                              price: stock.price
                          }))
                        : type === 'es-batu'
                          ? [
                                {
                                    itemId: 'es-batu',
                                    qty: Math.floor(total / 4000),
                                    price: 4000
                                }
                            ]
                          : []
            })
            if (success) {
                toast.success(message ?? 'Pengeluaran berhasil dibuat')
                router.push('/dashboard/pengeluaran')
            } else if (error) {
                setErrors(error)
                toast.error('Pengeluaran gagal dibuat')
            }
        })
    }

    return (
        <Form onSubmit={onSubmit} validationErrors={errors}>
            <Field.Set>
                <RadioGroup
                    aria-label='Type'
                    onChange={(e) => setType(e as 'stok' | 'others')}
                    orientation='horizontal'
                    value={type}
                >
                    <Radio isDisabled={session?.user.role !== 'admin'} value='stok'>
                        Belanja Stok
                    </Radio>
                    <Radio value='es-batu'>Es Batu</Radio>
                    <Radio value='others'>Lainnya</Radio>
                </RadioGroup>
                <div className='grid items-start gap-4 lg:grid-cols-3'>
                    <ComboBox
                        allowsCustomValue
                        className='lg:col-span-2'
                        inputValue={type === 'stok' ? 'Belanja Stok' : type === 'es-batu' ? 'Beli Es Batu' : title}
                        isReadOnly={type === 'stok' || type === 'es-batu'}
                        name='title'
                        onInputChange={setTitle}
                    >
                        <Field.Label>Judul</Field.Label>
                        <ComboBox.Input placeholder='Silakan pilih atau isi sendiri' />
                        <ComboBox.Content items={options.map((opt) => ({ id: opt, name: opt }))}>
                            {(option) => <ComboBox.Item id={option.id}>{option.name}</ComboBox.Item>}
                        </ComboBox.Content>
                    </ComboBox>
                    <NumberField
                        isReadOnly={type === 'stok'}
                        minValue={0}
                        name='total'
                        onChange={setTotal}
                        validate={(e) => (e <= 0 ? 'Total harus positif' : true)}
                        value={
                            type === 'stok'
                                ? stocks.reduce((total, stock) => total + stock.price * stock.qty, 0)
                                : total
                        }
                    >
                        <Field.Label>Total</Field.Label>
                        <NumberInputSm />
                        <Field.Error />
                    </NumberField>
                    {type === 'stok' && (
                        <div className='col-span-full space-y-4'>
                            <Drawer isOpen={openDialog} onOpenChange={setOpenDialog}>
                                <Button>
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
                                                    <ItemGroupHeader>Bahan</ItemGroupHeader>
                                                    {items
                                                        .filter(
                                                            (item) => !stocks.find((stock) => stock.itemId === item.id)
                                                        )
                                                        .filter((item) => item.id.includes('bubuk'))
                                                        .map((item) => (
                                                            <ItemMenu
                                                                item={item}
                                                                key={item.id}
                                                                onAction={() => {
                                                                    setStocks((prev) => [
                                                                        ...prev,
                                                                        { itemId: item.id, qty: 1, price: item.price }
                                                                    ])
                                                                    setOpenDialog(false)
                                                                }}
                                                            />
                                                        ))}
                                                    <ItemGroupHeader>Cup</ItemGroupHeader>
                                                    {items
                                                        .filter(
                                                            (item) => !stocks.find((stock) => stock.itemId === item.id)
                                                        )
                                                        .filter((item) => item.id.includes('cup'))
                                                        .map((item) => (
                                                            <ItemMenu
                                                                item={item}
                                                                key={item.id}
                                                                onAction={() => {
                                                                    setStocks((prev) => [
                                                                        ...prev,
                                                                        { itemId: item.id, qty: 1, price: item.price }
                                                                    ])
                                                                    setOpenDialog(false)
                                                                }}
                                                            />
                                                        ))}
                                                    <ItemGroupHeader>Lainnya</ItemGroupHeader>
                                                    {items
                                                        .filter(
                                                            (item) => !stocks.find((stock) => stock.itemId === item.id)
                                                        )
                                                        .filter(
                                                            (item) =>
                                                                !item.id.includes('bubuk') && !item.id.includes('cup')
                                                        )
                                                        .map((item) => (
                                                            <ItemMenu
                                                                item={item}
                                                                key={item.id}
                                                                onAction={() => {
                                                                    setStocks((prev) => [
                                                                        ...prev,
                                                                        { itemId: item.id, qty: 1, price: item.price }
                                                                    ])
                                                                    setOpenDialog(false)
                                                                }}
                                                            />
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
                                    .map((item, i) => {
                                        const stock = stocks.find((stock) => stock.itemId === item.id)
                                        if (!stock) return null
                                        return (
                                            <div
                                                className={itemVariants({
                                                    variant: 'outline',
                                                    size: 'sm',
                                                    className: 'relative'
                                                })}
                                                key={i}
                                            >
                                                <ItemMedia className='size-20' variant='image'>
                                                    {item?.image ? (
                                                        <Image
                                                            alt={item.name}
                                                            className='object-cover'
                                                            height={256}
                                                            src={item?.image}
                                                            width={256}
                                                        />
                                                    ) : (
                                                        <Skeleton className='aspect-square w-full' />
                                                    )}
                                                </ItemMedia>
                                                <ItemContent>
                                                    <ItemTitle className='line-clamp-1 font-bold'>
                                                        {item.name}
                                                    </ItemTitle>
                                                    <div className='my-1 grid grid-cols-2 gap-2'>
                                                        <NumberField
                                                            aria-label='Price'
                                                            className='gap-1'
                                                            minValue={0}
                                                            onChange={(value) =>
                                                                setStocks(
                                                                    stocks.map((stock) =>
                                                                        stock.itemId === item.id
                                                                            ? { ...stock, price: value }
                                                                            : stock
                                                                    )
                                                                )
                                                            }
                                                            orientation='horizontal'
                                                            value={stock?.price}
                                                        >
                                                            <Field.Label>Rp</Field.Label>
                                                            <Input tabIndex={-1} />
                                                            <FieldError />
                                                        </NumberField>
                                                        <NumberField
                                                            aria-label='Qty'
                                                            className='gap-1'
                                                            minValue={0}
                                                            onChange={(value) =>
                                                                setStocks(
                                                                    stocks.map((stock) =>
                                                                        stock.itemId === item.id
                                                                            ? { ...stock, qty: value }
                                                                            : stock
                                                                    )
                                                                )
                                                            }
                                                            orientation='horizontal'
                                                            value={stock?.qty}
                                                        >
                                                            <Field.Label>Qty</Field.Label>
                                                            <NumberInput />
                                                            <FieldError />
                                                        </NumberField>
                                                    </div>
                                                    <div className='flex items-center justify-end gap-1'>
                                                        <span className='text-sm'>Subtotal</span>
                                                        <Badge>{formatRupiah(stock?.price * stock?.qty)}</Badge>
                                                    </div>
                                                </ItemContent>

                                                <ItemActions className='absolute top-2 left-2'>
                                                    <Button
                                                        className='bg-destructive/60'
                                                        excludeFromTabOrder
                                                        onPress={() =>
                                                            setStocks(
                                                                stocks.filter((stock) => stock.itemId !== item.id)
                                                            )
                                                        }
                                                        size='icon-sm'
                                                    >
                                                        <IconTrash />
                                                    </Button>
                                                </ItemActions>
                                            </div>
                                        )
                                    })}
                            </NativeItemGroup>
                        </div>
                    )}
                </div>
                <Button isPending={pending} type='submit'>
                    <IconDeviceFloppy />
                    Simpan
                </Button>
            </Field.Set>
        </Form>
    )
}
