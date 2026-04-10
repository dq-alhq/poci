import { Table } from '@/components/ui/native-table'
import { formatRupiah } from '@/lib/utils'
import { getCartItems } from '@/server/repositories/cart-repository'

export async function CartList() {
    const items = await getCartItems()
    return (
        <Table>
            <Table.Header>
                <Table.Row>
                    <Table.Head>Nama Item</Table.Head>
                    <Table.Head>Qty</Table.Head>
                    <Table.Head>Price</Table.Head>
                    <Table.Head>Total</Table.Head>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {items.map((item) => (
                    <Table.Row key={item.productId}>
                        <Table.Cell>{item.product.name}</Table.Cell>
                        <Table.Cell>{item.qty}</Table.Cell>
                        <Table.Cell className='text-right'>{formatRupiah(item.price)}</Table.Cell>
                        <Table.Cell className='text-right'>{formatRupiah(item.total)}</Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    )
}
