import { getProduct } from '@/server/services/products.service'
import EditProdukForm from './edit-product-forn'

export default async function EditProductPage({ id }: { id: string }) {
    const product = await getProduct(id)
    return <EditProdukForm product={product} />
}
