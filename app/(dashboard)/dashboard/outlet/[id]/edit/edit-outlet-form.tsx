'use client'
import type { Outlet } from '@/generated/prisma/client'
import { IconDeviceFloppy } from '@tabler/icons-react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { useActionState, useEffect, useState } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Field, Form } from '@/components/ui/field'
import { Input, Textarea } from '@/components/ui/input'
import { NumberField, NumberInput } from '@/components/ui/number-field'
import { TextField } from '@/components/ui/text-field'
import { upsertOutlet } from '@/server/services/outlet.service'

const MapInput = dynamic(() => import('@/components/map-input'), { ssr: false })

export default function EditOutletForm({ data }: { data: Outlet }) {
    const [state, action, pending] = useActionState(upsertOutlet, null)
    const router = useRouter()

    const [position, setPosition] = useState<[number, number]>([
        parseFloat(data?.latitude || '-7.03601'),
        parseFloat(data?.longitude || '112.53161')
    ])

    useEffect(() => {
        if (state?.success) {
            toast.success(state?.message || 'Outlet berhasil diupdate')
            router.push('/dashboard/outlet')
        } else if (state?.error) {
            toast.error(state?.message || 'Outlet gagal diupdate')
            router.refresh()
        }
    }, [state])

    return (
        <Form action={action} className='grid gap-4 py-6 lg:grid-cols-[auto_1fr]' validationErrors={state?.error}>
            <div className='aspect-square'>
                {!Number.isNaN(position[0]) && !Number.isNaN(position[1]) && (
                    <MapInput onChange={setPosition} value={position} />
                )}
            </div>
            <Field.Set>
                <input defaultValue={data?.id} name='id' type='hidden' />
                <TextField autoFocus className='lg:col-span-2' defaultValue={data?.name} name='name'>
                    <Field.Label>Nama</Field.Label>
                    <Input />
                    <Field.Error />
                </TextField>
                <TextField defaultValue={data?.location || ''} name='location'>
                    <Field.Label>Lokasi</Field.Label>
                    <Textarea />
                    <Field.Error />
                </TextField>
                <div className='grid grid-cols-2 gap-4'>
                    <NumberField
                        defaultValue={parseFloat(data?.latitude || '0')}
                        formatOptions={{
                            style: 'decimal',
                            minimumFractionDigits: 6
                        }}
                        name='latitude'
                        onChange={(e) => setPosition([e, position[1]])}
                        value={position[0]}
                    >
                        <Field.Label>Latitude</Field.Label>
                        <NumberInput />
                        <Field.Error />
                    </NumberField>
                    <NumberField
                        defaultValue={parseFloat(data?.longitude || '0')}
                        formatOptions={{
                            style: 'decimal',

                            minimumFractionDigits: 6
                        }}
                        name='longitude'
                        onChange={(e) => setPosition([position[0], e])}
                        value={position[1]}
                    >
                        <Field.Label>Longitude</Field.Label>
                        <NumberInput />
                        <Field.Error />
                    </NumberField>
                </div>
                <Button isPending={pending} type='submit'>
                    <IconDeviceFloppy />
                    {pending ? 'Menyimpan...' : 'Simpan'}
                </Button>
            </Field.Set>
        </Form>
    )
}
