import { ItemGroup, ItemGroupSection } from '@/components/item-card'
import { getAllOutlet } from '@/server/repositories/outlet.repository'
import { OutletCard } from './outlet-card'

export async function OutletList() {
    const outlets = await getAllOutlet()
    return (
        <ItemGroup>
            <ItemGroupSection className='sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3'>
                {outlets.data.map((outlet) => (
                    <OutletCard key={outlet.id} outlet={outlet} />
                ))}
            </ItemGroupSection>
        </ItemGroup>
    )
}
