import { headers } from 'next/headers'
import { StockReportTable } from '@/app/(app)/[shiftId]/stock-report-table'
import { Card } from '@/components/ui/card'
import { auth } from '@/lib/auth'
import { getOutletStock } from '@/server/repositories/outlet-stock.repository'
import { getSales } from '@/server/repositories/sales.repository'
import { getCurrentOpenShift } from '@/server/repositories/shift.repository'
//
// interface Props {
//     shift: Shift
//     stockItems: (OutletStock & { item: Item })[]
//     sales: {
//         name: string
//         image: string
//         productId: string
//         qty: number
//         total: number
//     }[]
// }

export default async function EndShift({ shiftId }: { shiftId: number }) {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session?.user?.id) {
        return null
    }

    const shift = await getCurrentOpenShift(session?.user?.id)

    if (!shift) {
        return <div>Shift sudah selesai</div>
    }

    const stockItems = await getOutletStock(shift?.outletId)
    const _sales = await getSales(shift?.outletId)

    return (
        <div>
            <Card>
                <Card.Header>
                    <Card.Title>Laporan Stok</Card.Title>
                    <Card.Description>Laporan stok outlet</Card.Description>
                </Card.Header>
                <StockReportTable items={stockItems} />
            </Card>
        </div>
    )
}
