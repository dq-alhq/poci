import { getMaterialItems } from '@/server/repositories/items.repository'
import { getProductWithItems } from '@/server/repositories/products.repository'
import ProductForm from '../../product-form'

export const EditProductForm = async ({ id }: { id: string }) => {
    const items = await getMaterialItems()
    const product = await getProductWithItems(id)
    if (!product) {
        return null
    }
    return <ProductForm items={items} product={product} />
}
