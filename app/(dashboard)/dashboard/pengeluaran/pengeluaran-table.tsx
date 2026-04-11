'use client'

import type { Purchase } from '@/generated/prisma/client'
import { IconTrash } from '@tabler/icons-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Dialog } from '@/components/ui/dialog'
import { Table } from '@/components/ui/table'
import { formatRupiah } from '@/lib/utils'
import { deletePurchase } from '@/server/services/purchase.service'

export const PengeluaranTable = ({ purchases }: { purchases: (Purchase & { createdBy: { name: string } })[] }) => {
    const destroy = async (id: number) => {
        const { success, message } = await deletePurchase(id)
        if (success) {
            toast.success(message)
        } else {
            toast.error(message)
        }
        return message
    }

    return (
        <div>
            <Table>
                <Table.Header>
                    <Table.Column isRowHeader>Judul</Table.Column>
                    <Table.Column>Tanggal</Table.Column>
                    <Table.Column>Total</Table.Column>
                    <Table.Column className='w-10' />
                </Table.Header>
                <Table.Body items={purchases}>
                    {(purchase) => (
                        <Table.Row id={purchase.id}>
                            <Table.Cell>{purchase.title}</Table.Cell>
                            <Table.Cell>
                                {purchase.createdAt.toLocaleDateString('id-ID')} oleh {purchase.createdBy.name}
                            </Table.Cell>
                            <Table.Cell>{formatRupiah(purchase.total)}</Table.Cell>
                            <Table.Cell>
                                <Dialog>
                                    <Button size='icon-sm' variant='destructive'>
                                        <IconTrash />
                                    </Button>
                                    <Dialog.Content>
                                        <Dialog.Header>
                                            <Dialog.Title>Hapus</Dialog.Title>
                                            <Dialog.Description>
                                                Apakah anda yakin ingin menghapus pengeluaran ini?
                                            </Dialog.Description>
                                        </Dialog.Header>
                                        <Dialog.Body>
                                            <Button
                                                onPress={() => destroy(purchase.id)}
                                                size='sm'
                                                variant='destructive'
                                            >
                                                Hapus
                                            </Button>
                                        </Dialog.Body>
                                    </Dialog.Content>
                                </Dialog>
                            </Table.Cell>
                        </Table.Row>
                    )}
                </Table.Body>
            </Table>
        </div>
    )
}
