'use client'
import type { Key } from 'react-aria-components'
import type { Item, Product, ProductItem } from '@/generated/prisma/client'
import { IconDeviceFloppy, IconPlus, IconTrash } from '@tabler/icons-react'
import { useRouter } from 'next/navigation'
import { type FormEvent, useState, useTransition } from 'react'
import { toast } from 'sonner'
import { FileUpload } from '@/components/file-upload'
import { Button } from '@/components/ui/button'
import { Field, Form } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { NumberField, NumberInput } from '@/components/ui/number-field'
import { Select } from '@/components/ui/select'
import { TextField } from '@/components/ui/text-field'
import { upsertProduct } from '@/server/services/products.service'

export default function ProductForm({
    product,
    items
}: {
    product?: Product & { productItems: ProductItem[] }
    items: Item[]
}) {
    const router = useRouter()
    const [pending, startTransition] = useTransition()
    const [errors, setErrors] = useState<Record<string, string>>()

    const [name, setName] = useState<string>(product?.name || '')
    const [price, setPrice] = useState<number>(product?.price || 0)
    const [image, setImage] = useState<string>(product?.image || '')

    const [productItems, setProductItems] = useState<{ itemId: string; quantity: number }[]>(
        product?.productItems.map((item) => ({ itemId: item.itemId, quantity: item.qty })) || []
    )

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        startTransition(async () => {
            const res = await upsertProduct({
                id: product?.id,
                name,
                price,
                image,
                productItems: productItems.map((item) => ({
                    itemId: item.itemId,
                    qty: item.quantity
                }))
            })
            if (res.error) {
                setErrors(res.error)
                return
            }
            if (res.success) {
                toast.success('Produk berhasil disimpan')
                router.push('/dashboard/produk')
            }
        })
    }

    return (
        <Form className='grid gap-4 py-6 lg:grid-cols-[auto_1fr]' onSubmit={onSubmit} validationErrors={errors}>
            <div className='aspect-square'>
                <FileUpload defaultValue={image} name='image' onChange={setImage} />
            </div>
            <Field.Set>
                <input name='id' type='hidden' value={product?.id} />
                <TextField autoFocus name='name' onChange={setName} value={name}>
                    <Field.Label>Nama</Field.Label>
                    <Input />
                    <Field.Error />
                </TextField>
                <NumberField name='price' onChange={setPrice} value={price}>
                    <Field.Label>Harga</Field.Label>
                    <NumberInput />
                    <Field.Error />
                </NumberField>
            </Field.Set>
            <div className='col-span-full space-y-4'>
                {productItems.map((item, index) => (
                    <div className='flex items-end gap-4' key={index}>
                        <Select
                            className='col-span-2'
                            name={`productItems[${item.itemId}].itemId`}
                            onChange={(e: Key | null) =>
                                setProductItems((prev) =>
                                    prev.map((i) => (i.itemId === item.itemId ? { ...i, itemId: e!.toString() } : i))
                                )
                            }
                            value={item.itemId}
                        >
                            <Field.Label>Bahan</Field.Label>
                            <Select.Trigger>
                                <Select.Value />
                            </Select.Trigger>
                            <Field.Error />
                            <Select.Content isSearchable items={items}>
                                {(item) => <Select.Item id={item.id}>{item.name}</Select.Item>}
                            </Select.Content>
                        </Select>
                        <NumberField
                            name={`productItems[${item.itemId}].quantity`}
                            onChange={(e) =>
                                setProductItems((prev) =>
                                    prev.map((i) => (i.itemId === item.itemId ? { ...i, quantity: Number(e) } : i))
                                )
                            }
                            value={item.quantity}
                        >
                            <Field.Label>Qty</Field.Label>
                            <NumberInput />
                            <Field.Error />
                        </NumberField>
                        <Button
                            onPress={() => setProductItems((prev) => prev.filter((i) => i.itemId !== item.itemId))}
                            size='icon'
                            type='button'
                            variant='destructive'
                        >
                            <IconTrash />
                        </Button>
                    </div>
                ))}
                <Button
                    className='w-full'
                    onPress={() => setProductItems([...productItems, { itemId: '', quantity: 0 }])}
                    type='button'
                    variant='outline'
                >
                    <IconPlus />
                    Tambah Bahan
                </Button>
            </div>

            <Button isPending={pending} type='submit'>
                <IconDeviceFloppy />
                {pending ? 'Menyimpan...' : 'Simpan'}
            </Button>
        </Form>
    )
}
