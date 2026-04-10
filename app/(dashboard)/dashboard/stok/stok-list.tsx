import { Card } from '@/components/ui/card'
import { getAllMaterials } from '@/server/repositories/items.repository'
import { StokTable } from './stok-table'

export async function StokList() {
    const items = await getAllMaterials()

    return (
        <Card className='p-0'>
            <Card.Content>
                <StokTable items={items.data} />
            </Card.Content>
        </Card>
    )
}
