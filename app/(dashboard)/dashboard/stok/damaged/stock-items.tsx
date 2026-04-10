import { getAllMaterials } from '@/server/repositories/items.repository'
import { StokForm } from './stok-form'

export async function StokItems() {
    const items = await getAllMaterials()

    return <StokForm items={items.data} />
}
