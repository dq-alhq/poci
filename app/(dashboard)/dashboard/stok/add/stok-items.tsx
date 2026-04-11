import { getItems } from '@/server/repositories/items.repository'
import { StokForm } from './stok-form'

export async function StokItems() {
    const items = await getItems()

    return <StokForm items={items} />
}
