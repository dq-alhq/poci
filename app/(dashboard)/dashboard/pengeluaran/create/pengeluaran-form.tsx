'use client'

import { IconMoneybagMinus } from '@tabler/icons-react'
import { useRouter } from 'next/navigation'
import { type FormEvent, useState, useTransition } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Field, Form } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { NumberField, NumberInputSm } from '@/components/ui/number-field'
import { TextField } from '@/components/ui/text-field'
import { createPurchase } from '@/server/services/purchase.service'

export const PengeluaranForm = () => {
    const [errors, setErrors] = useState<Record<string, string>>({})
    const [pending, startTransition] = useTransition()
    const router = useRouter()

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setErrors({})
        const formData = new FormData(e.target as HTMLFormElement)
        startTransition(async () => {
            const { success, error, message } = await createPurchase({
                title: formData.get('title') as string,
                total: Number(formData.get('total') as string)
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
                <div className='grid items-start gap-4 lg:grid-cols-3'>
                    <TextField className='lg:col-span-2' name='title'>
                        <Field.Label>Judul</Field.Label>
                        <Input placeholder='Pembayaran ...' />
                        <Field.Error />
                    </TextField>
                    <NumberField minValue={0} name='total' validate={(e) => (e <= 0 ? 'Total harus positif' : true)}>
                        <Field.Label>Total</Field.Label>
                        <NumberInputSm />
                        <Field.Error />
                    </NumberField>
                </div>
                <Button isPending={pending} type='submit'>
                    <IconMoneybagMinus />
                    Simpan
                </Button>
            </Field.Set>
        </Form>
    )
}
