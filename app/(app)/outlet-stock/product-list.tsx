import { getAllMaterials } from '@/server/repositories/items.repository'
import { OutletStockForm } from './outlet-stock-form'

export const ProductList = async ({ outletId }: { outletId: string }) => {
    const products = await getAllMaterials()
    return <OutletStockForm outletId={outletId} products={products.data} />
}
