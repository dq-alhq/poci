import { getPurchases } from '@/server/repositories/purchase.repository'
import { PengeluaranTable } from './pengeluaran-table'

export const PengeluaranList = async () => {
    const purchases = await getPurchases()
    return (
        <div>
            <PengeluaranTable purchases={purchases} />
        </div>
    )
}
