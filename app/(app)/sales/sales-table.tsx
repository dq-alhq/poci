'use client'

import Image from 'next/image'
import { Table } from '@/components/ui/table'
import { formatRupiah } from '@/lib/utils'

interface Props {
    sales: {
        name: string
        image: string
        productId: string
        qty: number
        total: number
    }[]
}

export const SalesTable = ({ sales }: Props) => {
    return (
        <Table aria-label='Stok Outlet' bleed className='border-t'>
            <Table.Header>
                <Table.Column className='w-20' isRowHeader></Table.Column>
                <Table.Column>Nama Produk</Table.Column>
                <Table.Column className='text-center'>Terjual</Table.Column>
                <Table.Column className='text-right'>Total</Table.Column>
            </Table.Header>
            <Table.Body>
                {sales.map((item) => (
                    <Table.Row id={item.productId} key={item.productId}>
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
                        <Table.Cell className='text-center'>{item.qty}</Table.Cell>
                        <Table.Cell className='text-right font-mono'>{formatRupiah(item.total)}</Table.Cell>
                    </Table.Row>
                ))}
                <Table.Row>
                    <Table.Cell className='text-center font-bold' colSpan={3}>
                        Total
                    </Table.Cell>
                    <Table.Cell className='text-right font-bold font-mono'>
                        {formatRupiah(sales.reduce((total, item) => total + item.total, 0))}
                    </Table.Cell>
                </Table.Row>
            </Table.Body>
        </Table>
    )
}
