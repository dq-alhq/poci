import { Suspense } from 'react'
import { StokItem } from '@/app/(dashboard)/dashboard/stok/stok-item'
import Heading from '@/components/heading'
import { ItemGroup, ItemGroupSection } from '@/components/item-card'
import { Autocomplete } from '@/components/ui/autocomplete'
import { SearchField, SearchInput } from '@/components/ui/search-field'
import { getAllItems } from '@/server/repositories/items.repository'

export default async function StokPage() {
    const items = await getAllItems()
    return (
        <div className='px-6'>
            <Heading description={'Kelola Stok pada Gudang Utama'} title={'Stok'} />
            <div className='py-6'>
                <Autocomplete>
                    <div className='mb-6 flex w-full items-center gap-4'>
                        <SearchField aria-label='Search products' className='lg:max-w-sm'>
                            <SearchInput placeholder='Cari ...' />
                        </SearchField>
                    </div>
                    <Suspense fallback={<div>Loading...</div>}>
                        <ItemGroup>
                            <ItemGroupSection>
                                {items.data.map((item) => (
                                    <StokItem key={item.id} product={item} />
                                ))}
                            </ItemGroupSection>
                        </ItemGroup>
                    </Suspense>
                </Autocomplete>
            </div>
        </div>
    )
}
