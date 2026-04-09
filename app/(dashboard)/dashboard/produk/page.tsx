import type { Metadata } from 'next'
import { Suspense } from 'react'
import Heading from '@/components/heading'
import { ItemCard, ItemGroup, ItemGroupHeader, ItemGroupSection } from '@/components/item-card'
import { Autocomplete } from '@/components/ui/autocomplete'
import { SearchField, SearchInput } from '@/components/ui/search-field'
import { getAllMaterials, getAllProducts } from '@/server/repositories/items.repository'

export const metadata: Metadata = {
    title: 'Produk'
}

export default async function ProdukPage() {
    const products = await getAllProducts()
    const materials = await getAllMaterials()

    return (
        <div className='px-6'>
            <Heading description={'Kelola produk di Aplikasi anda'} title={'Produk'} />
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
                                <ItemGroupHeader>Dijual</ItemGroupHeader>
                                {products.data.map((item) => (
                                    <ItemCard key={item.id} product={item} />
                                ))}
                            </ItemGroupSection>
                            <ItemGroupSection>
                                <ItemGroupHeader>Tidak Dijual</ItemGroupHeader>
                                {materials.data.map((item) => (
                                    <ItemCard key={item.id} product={item} />
                                ))}
                            </ItemGroupSection>
                        </ItemGroup>
                    </Suspense>
                </Autocomplete>
            </div>
        </div>
    )
}
