'use client'

import type React from 'react'
import type { Item, Purchase, PurchaseItem } from '@/generated/prisma/client'
import { IconEye } from '@tabler/icons-react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Dialog } from '@/components/ui/dialog'
import { Table } from '@/components/ui/table'
import { formatRupiah } from '@/lib/utils'

export const PembelanjaanTable = ({
    purchases
}: {
    purchases: (Purchase & { createdBy: { name: string }; items?: (PurchaseItem & { item: Item })[] })[]
}) => {
    return (
        <div>
            <Table>
                <Table.Header>
                    <Table.Column isRowHeader>ID</Table.Column>
                    <Table.Column>Judul</Table.Column>
                    <Table.Column>Tanggal</Table.Column>
                    <Table.Column>Total</Table.Column>
                    <Table.Column className='w-10' />
                </Table.Header>
                <Table.Body items={purchases}>
                    {(purchase) => (
                        <Table.Row id={purchase.id}>
                            <Table.Cell>{purchase.id}</Table.Cell>
                            <Table.Cell>{purchase.title}</Table.Cell>
                            <Table.Cell>
                                {purchase.createdAt.toLocaleDateString('id-ID')} oleh {purchase.createdBy.name}
                            </Table.Cell>
                            <Table.Cell>{formatRupiah(purchase.total)}</Table.Cell>
                            <Table.Cell className='space-x-1'>
                                {purchase.items && (
                                    <PurchaseModal purchase={purchase}>
                                        <Button size='icon-sm' variant='outline'>
                                            <IconEye />
                                        </Button>
                                    </PurchaseModal>
                                )}
                            </Table.Cell>
                        </Table.Row>
                    )}
                </Table.Body>
            </Table>
        </div>
    )
}

const PurchaseModal = ({
    purchase,
    children
}: {
    purchase: Purchase & { createdBy: { name: string }; items?: (PurchaseItem & { item: Item })[] }
    children: React.ReactNode
}) => {
    return (
        <Dialog>
            {children}
            <Dialog.Content className='sm:max-w-3xl'>
                <Dialog.Header>
                    <Dialog.Title>{purchase.title}</Dialog.Title>
                    <Dialog.Description>
                        {purchase.createdAt.toLocaleDateString('id-ID')} oleh {purchase.createdBy.name}
                    </Dialog.Description>
                </Dialog.Header>
                <Dialog.Body>
                    <Table grid>
                        <Table.Header className='**:[th]:text-center'>
                            <Table.Column className='w-20' isRowHeader />
                            <Table.Column>Nama Produk</Table.Column>
                            <Table.Column>Harga</Table.Column>
                            <Table.Column>Jumlah</Table.Column>
                            <Table.Column>Total</Table.Column>
                        </Table.Header>
                        <Table.Body>
                            {purchase?.items?.map((item) => (
                                <Table.Row key={item.id}>
                                    <Table.Cell>
                                        <Image
                                            alt={item.item.name}
                                            className='size-full object-cover'
                                            height={40}
                                            src={item.item.image || ''}
                                            width={40}
                                        />
                                    </Table.Cell>
                                    <Table.Cell>{item.item.name}</Table.Cell>
                                    <Table.Cell className='text-right font-mono'>{formatRupiah(item.price)}</Table.Cell>
                                    <Table.Cell className='text-center'>{item.qty}</Table.Cell>
                                    <Table.Cell className='text-right font-mono'>
                                        {formatRupiah(item.price * item.qty)}
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                            <Table.Row>
                                <Table.Cell className='text-center' colSpan={4}>
                                    Total
                                </Table.Cell>
                                <Table.Cell className='text-right font-mono' colSpan={1}>
                                    {formatRupiah(purchase.total)}
                                </Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    </Table>
                </Dialog.Body>
            </Dialog.Content>
        </Dialog>
    )
}
