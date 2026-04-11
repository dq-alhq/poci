import { getPurchases } from '@/server/repositories/purchase.repository'
import { PembelanjaanTable } from './pembelanjaan-table'

export const PembelanjaanList = async () => {
    const purchases = await getPurchases()
    return (
        <div>
            <PembelanjaanTable purchases={purchases} />
        </div>
    )
}
