'use client'

import type { Product } from '@/generated/prisma/client'
import { IconDeviceFloppy } from '@tabler/icons-react'
import { useRouter } from 'next/navigation'
import { useActionState, useEffect } from 'react'
import { toast } from 'sonner'
import { FileUpload } from '@/components/file-upload'
import { Button } from '@/components/ui/button'
import { Field, Form } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { NumberField, NumberInput } from '@/components/ui/number-field'
import { Switch } from '@/components/ui/switch'
import { TextField } from '@/components/ui/text-field'
import { upsertProduct } from '@/server/services/products.service'

export default function EditProdukForm({ product }: { product: Product | null }) {
    const [state, action, pending] = useActionState(upsertProduct, null)
    const router = useRouter()

    useEffect(() => {
        if (state?.success) {
            toast.success(state?.message || 'Produk berhasil diupdate')
            router.push('/dashboard/produk')
        } else if (state?.error) {
            toast.error(state?.message || 'Produk gagal diupdate')
            router.refresh()
        }
    }, [state])

    return (
        <Form action={action} className='grid gap-4 py-6 lg:grid-cols-[auto_1fr]' validationErrors={state?.error}>
            <div className='aspect-square'>
                <FileUpload defaultValue={product?.image || ''} name='image' />
            </div>
            <Field.Set>
                <div className='grid gap-4 lg:grid-cols-3'>
                    <input name='id' type='hidden' value={product?.id} />
                    <TextField autoFocus className='lg:col-span-2' defaultValue={product?.name} name='name'>
                        <Field.Label>Nama</Field.Label>
                        <Input />
                        <Field.Error />
                    </TextField>
                    <TextField defaultValue={product?.unit} name='unit'>
                        <Field.Label>Unit</Field.Label>
                        <Input />
                        <Field.Error />
                    </TextField>
                </div>
                <div className='grid grid-cols-2 gap-4'>
                    <NumberField defaultValue={product?.buyPrice} name='buyPrice'>
                        <Field.Label>Harga Beli</Field.Label>
                        <NumberInput />
                        <Field.Error />
                    </NumberField>
                    <NumberField defaultValue={product?.sellPrice} name='sellPrice'>
                        <Field.Label>Harga Jual</Field.Label>
                        <NumberInput />
                        <Field.Error />
                    </NumberField>
                </div>
                <Switch defaultSelected={product?.isProduct} name='isProduct'>
                    Produk Dijual
                </Switch>
                <Button isPending={pending} type='submit'>
                    <IconDeviceFloppy />
                    {pending ? 'Menyimpan...' : 'Simpan'}
                </Button>
            </Field.Set>
        </Form>
    )
}
