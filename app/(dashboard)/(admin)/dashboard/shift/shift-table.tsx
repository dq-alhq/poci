'use client'

import type { Outlet, Shift, User } from '@/generated/prisma/client'
import { IconEye } from '@tabler/icons-react'
import { toast } from 'sonner'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Popover } from '@/components/ui/popover'
import { Table } from '@/components/ui/table'
import { closeShift, openShift } from '@/server/services/shift.service'

export const ShiftTable = ({ shifts }: { shifts: (Shift & { outlet: Outlet; user: User | null })[] }) => {
    const open = async (id: number) => {
        const { success, message } = await openShift(id)
        if (success) {
            toast.success(message)
        } else {
            toast.error(message)
        }
    }
    const close = async (id: number) => {
        const { success, message } = await closeShift(id)
        if (success) {
            toast.success(message)
        } else {
            toast.error(message)
        }
    }
    return (
        <Table>
            <Table.Header>
                <Table.Column isRowHeader>Outlet</Table.Column>
                <Table.Column>Penjaga</Table.Column>
                <Table.Column>Mulai</Table.Column>
                <Table.Column>Selesai</Table.Column>
                <Table.Column>Status</Table.Column>
                <Table.Column className='w-10' />
            </Table.Header>
            <Table.Body>
                {shifts.map((shift) => (
                    <Table.Row key={shift.id}>
                        <Table.Cell>{shift.outlet.name}</Table.Cell>
                        <Table.Cell>{shift.user?.name || '-'}</Table.Cell>
                        <Table.Cell>{shift.start.toLocaleDateString('id-ID')}</Table.Cell>
                        <Table.Cell>{shift.end ? shift.end?.toLocaleDateString('id-ID') : '-'}</Table.Cell>
                        <Table.Cell>
                            <Popover>
                                <Popover.Trigger>
                                    <Badge variant={shift.status === 'OPEN' ? 'default' : 'destructive'}>
                                        {shift.status === 'OPEN' ? 'BUKA' : 'TUTUP'}
                                    </Badge>
                                </Popover.Trigger>
                                <Popover.Content>
                                    {shift.status === 'OPEN' ? (
                                        <Button
                                            className='w-full'
                                            onPress={() => close(shift.id)}
                                            variant='destructive'
                                        >
                                            Tutup
                                        </Button>
                                    ) : (
                                        <Button className='w-full' onPress={() => open(shift.id)} variant='default'>
                                            Buka
                                        </Button>
                                    )}
                                </Popover.Content>
                            </Popover>
                        </Table.Cell>
                        <Table.Cell>
                            <Button size='icon-sm' variant='outline'>
                                <IconEye />
                            </Button>
                        </Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    )
}
