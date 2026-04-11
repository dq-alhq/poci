'use client'
import type { OutletStock, Product } from '@/generated/prisma/client'
import Image from 'next/image'
import { Table } from '@/components/ui/table'

export const OutletStockTable = ({ items }: { items: (OutletStock & { product: Product })[] }) => {
    return (
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
                                alt={item.product.name}
                                className='size-12 rounded-md'
                                height={64}
                                src={item.product.image || ''}
                                width={64}
                            />
                        </Table.Cell>
                        <Table.Cell>{item.product.name}</Table.Cell>
                        <Table.Cell>{item.qty}</Table.Cell>
                        <Table.Cell>{item.product.unit}</Table.Cell>
                    </Table.Row>
                )}
            </Table.Body>
        </Table>
    )
}
