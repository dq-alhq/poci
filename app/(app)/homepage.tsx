import { IconPackageExport } from '@tabler/icons-react'
import { headers } from 'next/headers'
import Link from 'next/link'
import { EndShiftModal } from '@/app/(app)/end-shift-modal'
import { OutletStockTable } from '@/app/(app)/outlet-stock/outlet-stock-table'
import { SalesTable } from '@/app/(app)/sales/sales-table'
import { buttonVariants } from '@/components/ui/button-group'
import { Card } from '@/components/ui/card'
import { auth } from '@/lib/auth'
import { getOutletStock } from '@/server/repositories/outlet-stock.repository'
import { getSales } from '@/server/repositories/sales.repository'
import { getCurrentOpenShift, getOutlets } from '@/server/repositories/shift.repository'
import { StartShiftModal } from './start-shift-modal'

export const Homepage = async () => {
    const outlets = await getOutlets()
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session?.user?.id) {
        return null
    }

    const currentShift = await getCurrentOpenShift(session?.user?.id)

    if (!currentShift) {
        return <StartShiftModal outlets={outlets} user={session?.user} />
    }

    const stockItems = await getOutletStock(currentShift.outletId)
    const sales = await getSales(currentShift.outletId)

    return (
        <div className='grid grid-cols-1 gap-6 xl:grid-cols-2'>
            <Card>
                <Card.Header>
                    <Card.Title>Stok Keluar</Card.Title>
                    <Card.Description>Daftar stock barang di outlet</Card.Description>
                    <Card.Action>
                        <Link className={buttonVariants()} href={`/outlet-stock?outletId=${currentShift.outletId}`}>
                            <IconPackageExport /> Tambah
                        </Link>
                    </Card.Action>
                </Card.Header>
                <Card.Content>
                    <OutletStockTable items={stockItems} />
                </Card.Content>
            </Card>
            <Card>
                <Card.Header>
                    <Card.Title>Penjualan</Card.Title>
                    <Card.Description>Data penjualan</Card.Description>
                    <Card.Action>
                        <Link
                            className={buttonVariants()}
                            href={`/sales?shiftId=${currentShift.id}&outletId=${currentShift.outletId}`}
                        >
                            <IconPackageExport /> Tambah
                        </Link>
                    </Card.Action>
                </Card.Header>
                <Card.Content>
                    <SalesTable sales={sales} />
                </Card.Content>
            </Card>
            <EndShiftModal shiftId={currentShift.id} />
        </div>
    )
}
