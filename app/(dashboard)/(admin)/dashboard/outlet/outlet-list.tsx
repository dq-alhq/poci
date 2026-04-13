import { ItemGroup, ItemGroupSection } from '@/components/item-card'
import { getOutlets } from '@/server/repositories/outlet.repository'
import { OutletCard } from './outlet-card'

export async function OutletList() {
    const outlets = await getOutlets()
    return (
        <ItemGroup>
            <ItemGroupSection className='sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3'>
                {outlets.map((outlet) => (
                    <OutletCard key={outlet.id} outlet={outlet} />
                ))}
            </ItemGroupSection>
        </ItemGroup>
    )
}
