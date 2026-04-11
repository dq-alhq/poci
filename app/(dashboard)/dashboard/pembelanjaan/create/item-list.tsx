import { getAllMaterials } from '@/server/repositories/items.repository'
import { ItemForm } from './item-form'

export const ItemList = async () => {
    const products = await getAllMaterials()
    return <ItemForm products={products.data} />
}
