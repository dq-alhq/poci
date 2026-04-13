import { getMaterialItems } from '@/server/repositories/items.repository'
import { OutletStockForm } from './outlet-stock-form'

export const ItemList = async ({ outletId }: { outletId: string }) => {
    const items = await getMaterialItems()
    return <OutletStockForm items={items} outletId={outletId} />
}
