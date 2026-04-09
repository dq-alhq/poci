'use client'
import { IconDeviceFloppy } from '@tabler/icons-react'
import { useActionState } from 'react'
import { FileUpload } from '@/components/file-upload'
import { Button } from '@/components/ui/button'
import { Field, Form } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { NumberField, NumberInput } from '@/components/ui/number-field'
import { Switch } from '@/components/ui/switch'
import { TextField } from '@/components/ui/text-field'
import { createProduct } from '@/server/services/products.service'

export default function ProductForm() {
    const [state, action, pending] = useActionState(createProduct, null)

    return (
        <Form action={action} className='grid gap-4 py-6 lg:grid-cols-[auto_1fr]' validationErrors={state?.error}>
            <div className='aspect-square'>
                <FileUpload />
            </div>
            <Field.Set>
                <div className='grid gap-4 lg:grid-cols-3'>
                    <TextField autoFocus className='lg:col-span-2' name='name'>
                        <Field.Label>Nama</Field.Label>
                        <Input />
                        <Field.Error />
                    </TextField>
                    <TextField defaultValue='pcs' name='unit'>
                        <Field.Label>Unit</Field.Label>
                        <Input />
                        <Field.Error />
                    </TextField>
                </div>
                <div className='grid grid-cols-2 gap-4'>
                    <NumberField name='buyPrice'>
                        <Field.Label>Harga Beli</Field.Label>
                        <NumberInput />
                        <Field.Error />
                    </NumberField>
                    <NumberField name='sellPrice'>
                        <Field.Label>Harga Jual</Field.Label>
                        <NumberInput />
                        <Field.Error />
                    </NumberField>
                </div>
                <Switch name='isProduct'>Produk Dijual</Switch>
                <Button isPending={pending} type='submit'>
                    <IconDeviceFloppy />
                    {pending ? 'Menyimpan...' : 'Simpan'}
                </Button>
            </Field.Set>
        </Form>
    )
}
