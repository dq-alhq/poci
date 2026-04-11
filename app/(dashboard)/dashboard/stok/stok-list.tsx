import { Card } from '@/components/ui/card'
import { getItems } from '@/server/repositories/items.repository'
import { StokTable } from './stok-table'

export async function StokList() {
    const items = await getItems()

    return (
        <Card className='p-0'>
            <Card.Content>
                <StokTable items={items} />
            </Card.Content>
        </Card>
    )
}
