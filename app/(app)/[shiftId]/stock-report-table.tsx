'use client'
import type { Item, OutletStock } from '@/generated/prisma/client'
import Image from 'next/image'
import { useState } from 'react'
import { Table } from '@/components/ui/native-table'
import { NumberField, NumberInput } from '@/components/ui/number-field'

export const StockReportTable = ({ items }: { items: (OutletStock & { item: Item })[] }) => {
    const [damagedItems, setDamagedItems] = useState<Record<string, number>>({})
    const [remainItems, setRemainItems] = useState<Record<string, number>>({})
    const [saleItems, setSaleItems] = useState<Record<string, number>>({})

    console.log(remainItems)

    return (
        <Table aria-label='Stok Outlet' className='w-full border-t'>
            <Table.Header>
                <Table.Row>
                    <Table.Head className='w-20'></Table.Head>
                    <Table.Head>Nama Barang</Table.Head>
                    <Table.Head className='text-center'>Stok</Table.Head>
                    <Table.Head className='text-center'>Sisa</Table.Head>
                    <Table.Head className='text-center'>Terjual</Table.Head>
                    <Table.Head className='text-center'>Rusak</Table.Head>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {items
                    .filter((item) => item.item.id.includes('bubuk'))
                    .map((stock) => (
                        <Table.Row key={stock.id}>
                            <Table.Cell>
                                <div className='flex size-12 items-center'>
                                    <Image
                                        alt={stock.item.name}
                                        className='size-full shrink-0 object-cover'
                                        height={64}
                                        src={stock.item.image || ''}
                                        width={64}
                                    />
                                </div>
                            </Table.Cell>
                            <Table.Cell>{stock.item.name}</Table.Cell>
                            <Table.Cell className='text-center'>{stock.stock}</Table.Cell>
                            <Table.Cell>
                                <NumberField
                                    aria-label={`Sisa ${stock.item.name}`}
                                    className='min-w-20'
                                    maxValue={stock.stock}
                                    minValue={0}
                                    onChange={(value) => setRemainItems({ ...remainItems, [stock.item.id]: value })}
                                    value={remainItems[stock.item.id]}
                                >
                                    <NumberInput />
                                </NumberField>
                            </Table.Cell>
                            <Table.Cell>
                                <NumberField
                                    aria-label={`Terjual ${stock.item.name}`}
                                    className='min-w-20'
                                    maxValue={stock.stock}
                                    minValue={0}
                                    onChange={(value) => setSaleItems({ ...saleItems, [stock.item.id]: value })}
                                    value={saleItems[stock.item.id]}
                                >
                                    <NumberInput />
                                </NumberField>
                            </Table.Cell>

                            <Table.Cell>
                                <NumberField
                                    aria-label={`Rusak ${stock.item.name}`}
                                    className='min-w-20'
                                    maxValue={stock.stock}
                                    minValue={0}
                                    onChange={(value) => setDamagedItems({ ...damagedItems, [stock.item.id]: value })}
                                    value={damagedItems[stock.item.id]}
                                >
                                    <NumberInput />
                                </NumberField>
                            </Table.Cell>
                        </Table.Row>
                    ))}
            </Table.Body>
        </Table>
    )
}
