'use client'

import { IconClock } from '@tabler/icons-react'
import { useRouter } from 'next/navigation'
import { useActionState, useEffect } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { DatePicker, DatePickerInput } from '@/components/ui/date-field'
import { Field, Form } from '@/components/ui/field'
import { PopoverContent } from '@/components/ui/popover'
import { Select } from '@/components/ui/select'
import { createShift } from '@/server/services/shift.service'

export const ShiftForm = ({
    outlets,
    users
}: {
    outlets: { id: string; name: string }[]
    users: { id: string; name: string }[]
}) => {
    const [state, action, pending] = useActionState(createShift, null)
    const router = useRouter()
    useEffect(() => {
        if (state?.success) {
            toast.success(state?.message ?? 'Shift berhasil dibuat')
            router.push('/dashboard/shift')
        } else if (state?.error) {
            toast.error(state?.error ?? 'Shift gagal dibuat')
        }
    }, [state])
    return (
        <Form action={action} validationErrors={state?.error}>
            <Field.Set>
                <Select name='outletId'>
                    <Field.Label>Outlet</Field.Label>
                    <Select.Trigger>
                        <Select.Value />
                    </Select.Trigger>
                    <Select.Content items={outlets}>
                        {(item) => <Select.Item id={item.id}>{item.name}</Select.Item>}
                    </Select.Content>
                </Select>
                <Select name='userId'>
                    <Field.Label>Penjaga</Field.Label>
                    <Select.Trigger>
                        <Select.Value />
                    </Select.Trigger>
                    <Select.Content items={users}>
                        {(item) => <Select.Item id={item.id}>{item.name}</Select.Item>}
                    </Select.Content>
                </Select>
                <DatePicker name='date'>
                    <Field.Label>Tanggal</Field.Label>
                    <DatePickerInput />
                    <PopoverContent className='w-auto p-0'>
                        <Calendar />
                    </PopoverContent>
                </DatePicker>

                <Button isPending={pending} type='submit'>
                    <IconClock />
                    Buat Shift
                </Button>
            </Field.Set>
        </Form>
    )
}
