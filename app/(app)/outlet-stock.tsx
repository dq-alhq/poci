import { IconPackageExport } from '@tabler/icons-react'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button-group'
import { Card } from '@/components/ui/card'
import { getOutletStock } from '@/server/repositories/outlet-stock.repository'
import { OutletStockTable } from './outlet-stock-table'

export const OutletStock = async ({ outletId }: { outletId: string }) => {
    const stockItems = await getOutletStock(outletId)
    return (
        <Card>
            <Card.Header>
                <Card.Title>Stok Keluar</Card.Title>
                <Card.Description>Daftar stock barang di outlet</Card.Description>
                <Card.Action>
                    <Link className={buttonVariants()} href={`/outlet-stock?outletId=${outletId}`}>
                        <IconPackageExport /> Tambah
                    </Link>
                </Card.Action>
            </Card.Header>
            <Card.Content>
                <OutletStockTable items={stockItems} />
            </Card.Content>
        </Card>
    )
}
