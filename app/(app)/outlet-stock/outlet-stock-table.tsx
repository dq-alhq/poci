'use client'
import type { Item, OutletStock } from '@/generated/prisma/client'
import Image from 'next/image'
import { Table } from '@/components/ui/table'

export const OutletStockTable = ({ items }: { items: (OutletStock & { item: Item })[] }) => {
    return (
        <Table aria-label='Stok Outlet' bleed className='border-t'>
            <Table.Header>
                <Table.Column className='w-20' isRowHeader></Table.Column>
                <Table.Column>Nama Barang</Table.Column>
                <Table.Column>Qty</Table.Column>
                <Table.Column>Unit</Table.Column>
            </Table.Header>
            <Table.Body items={items}>
                {(stock) => (
                    <Table.Row id={stock.id}>
                        <Table.Cell>
                            <Image
                                alt={stock.item.name}
                                className='size-12 rounded-md'
                                height={64}
                                src={stock.item.image || ''}
                                width={64}
                            />
                        </Table.Cell>
                        <Table.Cell>{stock.item.name}</Table.Cell>
                        <Table.Cell>{stock.stock}</Table.Cell>
                        <Table.Cell>{stock.item.unit}</Table.Cell>
                    </Table.Row>
                )}
            </Table.Body>
        </Table>
    )
}
