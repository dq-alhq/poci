import { getMaterialItems } from '@/server/repositories/items.repository'
import ProductForm from '../product-form'

export const CreateProductForm = async () => {
    const items = await getMaterialItems()
    return <ProductForm items={items} />
}
