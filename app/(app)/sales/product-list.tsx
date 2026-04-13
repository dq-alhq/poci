import { SalesForm } from '@/app/(app)/sales/sales-form'
import { getProducts } from '@/server/repositories/products.repository'

export const ProductList = async ({ shiftId, outletId }: { shiftId: string; outletId: string }) => {
    const products = await getProducts()
    return <SalesForm outletId={outletId} products={products} shiftId={shiftId} />
}
