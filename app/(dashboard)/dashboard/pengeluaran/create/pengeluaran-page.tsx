import { getPurchasableItems } from '@/server/repositories/items.repository'
import { PengeluaranForm } from './pengeluaran-form'

export async function PengeluaranCreatePage() {
    const items = await getPurchasableItems()
    return <PengeluaranForm items={items} />
}
