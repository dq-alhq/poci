import { IconEdit } from '@tabler/icons-react'
import Link from 'next/link'
import { AlertDialog } from '@/components/alert-dialog'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button-group'
import { Card } from '@/components/ui/card'
import { Table } from '@/components/ui/native-table'
import { ShiftStatus } from '@/generated/prisma/enums'
import { getOutlet } from '@/server/repositories/outlet.repository'
import { OutletMap } from '../outlet-map'

export async function OutletDetails({ id }: { id: string }) {
    const data = await getOutlet(id)

    if (!data) {
        return <div>Item not found</div>
    }

    const isOpen = data.shifts.some((shift) => shift.status === ShiftStatus.OPEN)

    return (
        <Card>
            <Card.Header>
                <Card.Title>{data.name}</Card.Title>
                <Card.Description>{data.location}</Card.Description>
                <Card.Action className='space-x-2'>
                    <AlertDialog data='outlet' id={id} />
                    <Link className={buttonVariants({ variant: 'outline' })} href={`/dashboard/outlet/${id}/edit`}>
                        <IconEdit />
                        Edit
                    </Link>
                </Card.Action>
            </Card.Header>
            <Card.Content className='space-y-4'>
                {isOpen ? <Badge variant='default'>Buka</Badge> : <Badge variant='destructive'>Tutup</Badge>}
            </Card.Content>
            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.Head>Barang</Table.Head>
                        <Table.Head>Jumlah</Table.Head>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {data.stocks.length > 0 ? (
                        data.stocks.map((stock) => (
                            <Table.Row key={stock.id}>
                                <Table.Cell>{stock.product?.name}</Table.Cell>
                                <Table.Cell>
                                    {stock.qty} {stock.product?.unit}
                                </Table.Cell>
                            </Table.Row>
                        ))
                    ) : (
                        <Table.Row>
                            <Table.Cell className='text-center' colSpan={2}>
                                Outlet ini tidak memiliki barang
                            </Table.Cell>
                        </Table.Row>
                    )}
                </Table.Body>
            </Table>
            <Card.Footer></Card.Footer>
        </Card>
    )
}

export async function OutletMapLocation({ id }: { id: string }) {
    const data = await getOutlet(id)

    if (!data) {
        return <div>Item not found</div>
    }
    return <OutletMap lat={parseFloat(data.latitude!)} lng={parseFloat(data.longitude!)} />
}
