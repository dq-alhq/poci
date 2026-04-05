import type { Metadata } from 'next'
import { Suspense } from 'react'
import Heading from '@/components/heading'
import { ItemCard, ItemGroup, ItemGroupHeader, ItemGroupSection } from '@/components/item-card'
import { Autocomplete } from '@/components/ui/autocomplete'
import { SearchField, SearchInput } from '@/components/ui/search-field'

export const metadata: Metadata = {
    title: 'Produk'
}

export default async function ProdukPage() {
    const products = await fetch('https://dummyjson.com/products?limit=5')
        .then((res) => res.json())
        .then((data) => data.products)

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
                                {products.map((item: any) => (
                                    <ItemCard item={item} key={item.id} />
                                ))}
                            </ItemGroupSection>
                            <ItemGroupSection>
                                <ItemGroupHeader>Tidak Dijual</ItemGroupHeader>
                                {products.map((item: any) => (
                                    <ItemCard item={item} key={item.id} />
                                ))}
                            </ItemGroupSection>
                        </ItemGroup>
                    </Suspense>
                </Autocomplete>
            </div>
        </div>
    )
}
