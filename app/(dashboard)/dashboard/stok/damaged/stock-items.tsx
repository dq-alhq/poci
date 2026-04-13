import { StokForm } from '@/app/(dashboard)/dashboard/stok/stok-form'
import { getItems } from '@/server/repositories/items.repository'

export async function StokItems() {
    const items = await getItems()

    return <StokForm items={items} type='DAMAGED' />
}
