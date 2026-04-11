'use client'

import type { Item } from '@/generated/prisma/client'
import Image from 'next/image'
import { Table } from '@/components/ui/table'

export const StokTable = ({ items }: { items: Item[] }) => (
    <Table bleed>
        <Table.Header>
            <Table.Column className='w-20' isRowHeader></Table.Column>
            <Table.Column>Nama Barang</Table.Column>
            <Table.Column>Qty</Table.Column>
            <Table.Column>Unit</Table.Column>
        </Table.Header>
        <Table.Body items={items}>
            {(item) => (
                <Table.Row id={item.id}>
                    <Table.Cell>
                        <Image
                            alt={item.name}
                            className='size-12 rounded-md'
                            height={64}
                            src={item.image || ''}
                            width={64}
                        />
                    </Table.Cell>
                    <Table.Cell>{item.name}</Table.Cell>
                    <Table.Cell>{item.stock}</Table.Cell>
                    <Table.Cell>{item.unit}</Table.Cell>
                </Table.Row>
            )}
        </Table.Body>
    </Table>
)
