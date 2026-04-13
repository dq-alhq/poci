'use client'
import type { User } from '@/lib/auth'
import { IconClock } from '@tabler/icons-react'
import { useActionState, useEffect, useRef } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Dialog } from '@/components/ui/dialog'
import { Field, Form } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { TextField } from '@/components/ui/text-field'
import { startShift } from '@/server/services/shift.service'

export const StartShiftModal = ({ outlets, user }: { outlets: { id: string; name: string }[]; user?: User }) => {
    const [state, action, pending] = useActionState(startShift, null)
    const closeButtonRef = useRef<HTMLButtonElement>(null)
    useEffect(() => {
        if (state?.success) {
            toast.success(state?.message ?? 'Shift berhasil dimulai')
            closeButtonRef.current?.click()
        }
    }, [state?.success])
    return (
        <Dialog>
            <Button className='w-full'>
                <IconClock /> Mulai Shift
            </Button>
            <Dialog.Content>
                <Dialog.Header>
                    <Dialog.Title>Mulai Shift</Dialog.Title>
                    <Dialog.Description>Silakan konfirmasi shift</Dialog.Description>
                </Dialog.Header>
                <Form action={action} validationErrors={state?.error}>
                    <Dialog.Body>
                        <div className='space-y-4'>
                            <input defaultValue={user?.id} name='userId' type='hidden' />
                            <TextField defaultValue={user?.name} isReadOnly name='username'>
                                <Field.Label>Penjaga</Field.Label>
                                <Input />
                                <Field.Error />
                            </TextField>
                            <Select name='outletId'>
                                <Field.Label>Outlet</Field.Label>
                                <Select.Trigger>
                                    <Select.Value />
                                </Select.Trigger>
                                <Field.Error />
                                <Select.Content items={outlets}>
                                    {(item) => <Select.Item id={item.id}>{item.name}</Select.Item>}
                                </Select.Content>
                            </Select>
                        </div>
                    </Dialog.Body>
                    <Dialog.Footer>
                        <Button ref={closeButtonRef} slot='close' variant='outline'>
                            Batal
                        </Button>
                        <Button isPending={pending} type='submit'>
                            Mulai Shift
                        </Button>
                    </Dialog.Footer>
                </Form>
            </Dialog.Content>
        </Dialog>
    )
}
