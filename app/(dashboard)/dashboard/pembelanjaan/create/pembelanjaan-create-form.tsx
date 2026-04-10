'use client'

import type { PurchaseItem } from '@/generated/prisma/client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Field, Form } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { NumberField, NumberInput } from '@/components/ui/number-field'
import { Radio, RadioGroup } from '@/components/ui/radio'
import { TextField } from '@/components/ui/text-field'
import { PurchaseType } from '@/generated/prisma/enums'

export const PembelanjaanCreateForm = () => {
    const [type, setType] = useState<PurchaseType>('ITEM')
    const [items, setItems] = useState<PurchaseItem[]>([])
    return (
        <Form className='space-y-4'>
            <Field.Set>
                <TextField autoFocus name='supplier'>
                    <Field.Label>Supplier</Field.Label>
                    <Input />
                    <Field.Error />
                </TextField>
                <TextField name='title'>
                    <Field.Label>Judul</Field.Label>
                    <Input />
                    <Field.Error />
                </TextField>
                <RadioGroup name='type' onChange={(e) => setType(e as PurchaseType)} value={type}>
                    <Field.Label>Tipe Pembelanjaan</Field.Label>
                    <Radio value={PurchaseType.ITEM}>Belanja Barang</Radio>
                    <Radio value={PurchaseType.SERVICE}>Pembayaran Layanan</Radio>
                </RadioGroup>

                {type === PurchaseType.ITEM && (
                    <>
                        {items.map((item, index) => (
                            <div className='grid grid-cols-3 gap-4' key={index}>
                                <TextField key={index} name={`item[${index}].productId`}>
                                    <Field.Label>Produk</Field.Label>
                                    <Input />
                                    <Field.Error />
                                </TextField>
                                <NumberField key={index} name={`item[${index}].qty`}>
                                    <Field.Label>Jumlah</Field.Label>
                                    <NumberInput />
                                    <Field.Error />
                                </NumberField>
                                <NumberField key={index} name={`item[${index}].price`}>
                                    <Field.Label>Harga</Field.Label>
                                    <NumberInput />
                                    <Field.Error />
                                </NumberField>
                            </div>
                        ))}
                        <Button onPress={() => setItems((prev: any) => [...prev, { productId: '', qty: 1, price: 0 }])}>
                            Tambah Item
                        </Button>
                    </>
                )}

                <NumberField name='total'>
                    <Field.Label>Total</Field.Label>
                    <NumberInput />
                    <Field.Error />
                </NumberField>
            </Field.Set>
        </Form>
    )
}
