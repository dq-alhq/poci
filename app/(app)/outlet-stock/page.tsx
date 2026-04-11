import { IconArrowLeft } from '@tabler/icons-react'
import Link from 'next/link'
import { Suspense } from 'react'
import Heading from '@/components/heading'
import { Autocomplete } from '@/components/ui/autocomplete'
import { buttonVariants } from '@/components/ui/button-group'
import { SearchField, SearchInput } from '@/components/ui/search-field'
import { ProductList } from './product-list'

export default async function OutletStockPage({ searchParams }: { searchParams: Promise<{ outletId: string }> }) {
    const outletId = (await searchParams).outletId
    return (
        <div className='px-6'>
            <Heading description={'Tambah Stok pada Outlet'} title={'Tambah Stok'}>
                <Link className={buttonVariants({ variant: 'outline' })} href='/'>
                    <IconArrowLeft />
                    Kembali
                </Link>
            </Heading>
            <div className='py-6'>
                <Autocomplete>
                    <div className='mb-6 flex w-full items-center gap-4'>
                        <SearchField aria-label='Search products' className='lg:max-w-sm'>
                            <SearchInput placeholder='Cari ...' />
                        </SearchField>
                    </div>
                    <Suspense fallback={<div>Loading...</div>}>
                        <ProductList outletId={outletId} />
                    </Suspense>
                </Autocomplete>
            </div>
        </div>
    )
}
