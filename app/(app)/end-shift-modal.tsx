'use client'

import { IconClock } from '@tabler/icons-react'
import Link from 'next/link'
import { Button, buttonVariants } from '@/components/ui/button'
import { Dialog } from '@/components/ui/dialog'
import { closeShift } from '@/server/services/shift.service'

export const EndShiftModal = ({ shiftId }: { shiftId: number }) => {
    const onCloseShift = async () => {
        await closeShift(shiftId)
    }
    return (
        <Dialog>
            <Button className='col-span-full' variant='destructive'>
                <IconClock /> Akhiri Shift
            </Button>
            <Dialog.Content>
                <Dialog.Header>
                    <Dialog.Title>Akhiri Shift</Dialog.Title>
                    <Dialog.Description>Silakan konfirmasi shift</Dialog.Description>
                </Dialog.Header>
                <Dialog.Body>Apakah anda ingin mengakhiri shift anda saja, atau sekalian tutup outlet?</Dialog.Body>
                <Dialog.Footer>
                    <Link className={buttonVariants({ variant: 'secondary' })} href={`/${shiftId}/end`}>
                        Akhiri dan Tutup Outlet
                    </Link>
                    <Button onClick={onCloseShift} variant='destructive'>
                        Akhiri Shift
                    </Button>
                </Dialog.Footer>
            </Dialog.Content>
        </Dialog>
    )
}
